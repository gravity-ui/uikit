'use client';

import * as React from 'react';

import {MobileContext, Platform} from '../mobile';
import type {History, Location} from '../mobile';
import {warnOnce} from '../utils/warn';

import {SheetContentArea, SheetSwipeArea, SheetVeil} from './components';
import {sheetBlock} from './constants';
import {useContentScroll} from './hooks/useContentScroll';
import {useSwipe} from './hooks/useSwipe';
import type {Status} from './types';

import './Sheet.scss';

const TRANSITION_DURATION = '0.3s';
const DEFAULT_MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT = 0.9;
const WINDOW_RESIZE_TIMEOUT = 50;

let hashHistory: string[] = [];

function warnAboutOutOfRange() {
    warnOnce(
        '[Sheet] The value of the "maxContentHeightCoefficient" property must be between 0 and 1',
    );
}

interface SheetContentBaseProps {
    hideSheet: () => void;
    content: React.ReactNode;
    visible: boolean;
    id?: string;
    title?: string;
    contentClassName?: string;
    swipeAreaClassName?: string;
    hideTopBar?: boolean;
    maxContentHeightCoefficient?: number;
    alwaysFullHeight?: boolean;
}

interface SheetContentDefaultProps {
    id: string;
    allowHideOnContentScroll: boolean;
}

type SheetContentProps = SheetContentBaseProps & Partial<SheetContentDefaultProps>;

/**
 * Snapshot of resolved props plus values from the mobile context. Stored in a ref
 * and read inside stable callbacks/listeners to avoid stale closures.
 */
interface SheetContentLatest {
    hideSheet: () => void;
    id: string;
    allowHideOnContentScroll: boolean;
    maxContentHeightCoefficient?: number;
    alwaysFullHeight?: boolean;
    platform: Platform;
    history: History;
    location: Location;
}

export function SheetContent(props: SheetContentProps) {
    const {
        content,
        contentClassName,
        swipeAreaClassName,
        hideTopBar,
        title,
        visible,
        hideSheet,
        maxContentHeightCoefficient,
        alwaysFullHeight,
        id = 'sheet',
        allowHideOnContentScroll = true,
    } = props;

    const {platform, useHistory, useLocation} = React.useContext(MobileContext);
    const history = useHistory();
    const location = useLocation();

    // --- DOM refs ---
    const veilRef = React.useRef<HTMLDivElement>(null);
    const sheetRef = React.useRef<HTMLDivElement>(null);
    const sheetTopRef = React.useRef<HTMLDivElement>(null);
    const sheetMarginBoxRef = React.useRef<HTMLDivElement>(null);
    const sheetScrollContainerRef = React.useRef<HTMLDivElement>(null);

    // --- Non-state mutable fields ---
    const observerRef = React.useRef<ResizeObserver | null>(null);
    const resizeWindowTimerRef = React.useRef<number | null>(null);

    // --- Render-affecting state ---
    const [veilTouched, setVeilTouched] = React.useState(false);

    // --- Service state kept out of render ---
    const prevSheetHeightRef = React.useRef(0);
    const isAnimatingRef = React.useRef(false);
    const inWindowResizeScopeRef = React.useRef(false);
    const delayedResizeRef = React.useRef(false);

    // --- Previous props snapshots for componentDidUpdate emulation ---
    const prevVisibleRef = React.useRef(visible);
    const prevLocationRef = React.useRef(location);

    // --- Latest resolved props / context for stable callbacks ---
    const latest: SheetContentLatest = {
        hideSheet,
        id,
        allowHideOnContentScroll,
        maxContentHeightCoefficient,
        alwaysFullHeight,
        platform,
        history,
        location,
    };
    const latestRef = React.useRef<SheetContentLatest>(latest);
    latestRef.current = latest;

    // --- Getters ---
    const getSheetTopHeight = React.useCallback(
        () => sheetTopRef.current?.getBoundingClientRect().height || 0,
        [],
    );

    const getSheetHeight = React.useCallback(
        () => sheetRef.current?.getBoundingClientRect().height || 0,
        [],
    );

    const getSheetScrollTop = React.useCallback(
        () => sheetScrollContainerRef.current?.scrollTop || 0,
        [],
    );

    const getSheetContentHeight = React.useCallback(
        () => sheetMarginBoxRef.current?.getBoundingClientRect().height || 0,
        [],
    );

    const getIsPrefersReducedMotion = React.useCallback(
        () => Boolean(window?.matchMedia('(prefers-reduced-motion: reduce)').matches),
        [],
    );

    const setInitialStyles = React.useCallback((initialHeight: number) => {
        if (sheetScrollContainerRef.current && sheetMarginBoxRef.current) {
            sheetScrollContainerRef.current.style.height = `${initialHeight}px`;
        }
    }, []);

    const setStyles = React.useCallback(
        ({status, deltaHeight = 0}: {status: Status; deltaHeight?: number}) => {
            if (!sheetRef.current || !veilRef.current) {
                return;
            }

            const sheetHeight = getSheetHeight();
            const visibleHeight = sheetHeight - deltaHeight;
            const translate =
                status === 'showing'
                    ? `translate3d(0, -${visibleHeight}px, 0)`
                    : 'translate3d(0, 0, 0)';
            let opacity = 0;

            if (status === 'showing') {
                opacity = deltaHeight === 0 ? 1 : visibleHeight / sheetHeight;
            }

            veilRef.current.style.opacity = String(opacity);

            sheetRef.current.style.transform = translate;

            if (getIsPrefersReducedMotion()) {
                sheetRef.current.style.opacity = String(opacity);
                sheetRef.current.style.transform = `translate3d(0, -${visibleHeight}px, 0)`;
            }
        },
        [getSheetHeight, getIsPrefersReducedMotion],
    );

    const getAvailableContentHeight = React.useCallback(
        (sheetHeight: number) => {
            const {maxContentHeightCoefficient: coefficient, alwaysFullHeight: fullHeight} =
                latestRef.current;
            let heightCoefficient = DEFAULT_MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT;

            if (typeof coefficient === 'number' && coefficient >= 0 && coefficient <= 1) {
                heightCoefficient = coefficient;
            } else if (typeof coefficient === 'number') {
                warnAboutOutOfRange();
            }

            const availableViewportHeight =
                window.innerHeight * heightCoefficient - getSheetTopHeight();

            if (fullHeight) {
                return availableViewportHeight;
            }

            const availableContentHeight =
                sheetHeight >= availableViewportHeight ? availableViewportHeight : sheetHeight;

            return availableContentHeight;
        },
        [getSheetTopHeight],
    );

    const setHash = React.useCallback(() => {
        const {
            id: currentId,
            platform: currentPlatform,
            history: currentHistory,
            location: currentLocation,
        } = latestRef.current;

        if (currentPlatform === Platform.BROWSER) {
            return;
        }

        const newLocation = {...currentLocation, hash: currentId};

        switch (currentPlatform) {
            case Platform.IOS:
                if (currentLocation.hash) {
                    hashHistory.push(currentLocation.hash);
                }
                currentHistory.replace(newLocation);
                break;
            case Platform.ANDROID:
                currentHistory.push(newLocation);
                break;
        }
    }, []);

    const removeHash = React.useCallback(() => {
        const {
            id: currentId,
            platform: currentPlatform,
            history: currentHistory,
            location: currentLocation,
        } = latestRef.current;

        if (currentPlatform === Platform.BROWSER || currentLocation.hash !== `#${currentId}`) {
            return;
        }

        switch (currentPlatform) {
            case Platform.IOS:
                currentHistory.replace({...currentLocation, hash: hashHistory.pop() ?? ''});
                break;
            case Platform.ANDROID:
                currentHistory.goBack();
                break;
        }
    }, []);

    const hideSheetStable = React.useCallback(() => latestRef.current.hideSheet(), []);

    const show = React.useCallback(() => {
        isAnimatingRef.current = true;
        setStyles({status: 'showing'});
        setHash();
    }, [setStyles, setHash]);

    const hide = React.useCallback(() => {
        isAnimatingRef.current = true;
        setStyles({status: 'hiding'});
        removeHash();
    }, [setStyles, removeHash]);

    const {
        deltaY,
        swipeAreaTouched,
        velocityTrackerRef,
        startYRef,
        deltaYRef,
        swipeAreaTouchedRef,
        setDeltaY,
        onTouchEndAction,
        swipeAreaHandlers,
    } = useSwipe({
        setStyles,
        getSheetHeight,
        show,
        hide,
        hideSheet: hideSheetStable,
    });

    const resetScrollTransition = React.useCallback(() => {
        if (sheetScrollContainerRef.current) {
            sheetScrollContainerRef.current.style.transition = 'none';
        }
    }, []);

    const {contentTouched, contentAreaHandlers} = useContentScroll({
        velocityTrackerRef,
        startYRef,
        deltaYRef,
        swipeAreaTouchedRef,
        setDeltaY,
        onTouchEndAction,
        getAllowHideOnContentScroll: React.useCallback(
            () => latestRef.current.allowHideOnContentScroll,
            [],
        ),
        getSheetScrollTop,
        setStyles,
        resetScrollTransition,
    });

    const onResize = React.useCallback(() => {
        if (!sheetRef.current || !sheetScrollContainerRef.current) {
            return;
        }

        const sheetContentHeight = getSheetContentHeight();

        if (sheetContentHeight === prevSheetHeightRef.current && !inWindowResizeScopeRef.current) {
            return;
        }

        const availableContentHeight = getAvailableContentHeight(sheetContentHeight);

        sheetScrollContainerRef.current.style.transition =
            prevSheetHeightRef.current > sheetContentHeight
                ? `height 0s ease ${TRANSITION_DURATION}`
                : 'none';

        sheetScrollContainerRef.current.style.height = `${availableContentHeight}px`;
        sheetRef.current.style.transform = `translate3d(0, -${availableContentHeight + getSheetTopHeight()}px, 0)`;

        prevSheetHeightRef.current = sheetContentHeight;
        inWindowResizeScopeRef.current = false;
    }, [getSheetContentHeight, getAvailableContentHeight, getSheetTopHeight]);

    const onResizeWindow = React.useCallback(() => {
        if (isAnimatingRef.current) {
            delayedResizeRef.current = true;
            return;
        }

        inWindowResizeScopeRef.current = true;

        if (resizeWindowTimerRef.current) {
            window.clearTimeout(resizeWindowTimerRef.current);
        }

        resizeWindowTimerRef.current = window.setTimeout(() => {
            onResize();
        }, WINDOW_RESIZE_TIMEOUT);
    }, [onResize]);

    const shouldClose = React.useCallback((prevLocation: Location) => {
        const {
            id: currentId,
            platform: currentPlatform,
            history: currentHistory,
            location: currentLocation,
        } = latestRef.current;

        return (
            currentPlatform !== Platform.BROWSER &&
            currentHistory.action === 'POP' &&
            prevLocation.hash !== currentLocation.hash &&
            currentLocation.hash !== `#${currentId}`
        );
    }, []);

    // --- componentDidMount / componentWillUnmount ---
    React.useEffect(() => {
        window.addEventListener('resize', onResizeWindow);

        if (sheetMarginBoxRef.current) {
            observerRef.current = new ResizeObserver(() => {
                if (!inWindowResizeScopeRef.current) {
                    onResize();
                }
            });
            observerRef.current.observe(sheetMarginBoxRef.current);
        }

        show();

        const initialHeight = getAvailableContentHeight(getSheetContentHeight());

        setInitialStyles(initialHeight);
        prevSheetHeightRef.current = initialHeight;

        return () => {
            window.removeEventListener('resize', onResizeWindow);

            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
        // Mount/unmount only: callbacks are stable and read fresh data via refs.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- componentDidUpdate ---
    React.useEffect(() => {
        const prevVisible = prevVisibleRef.current;
        const prevLocation = prevLocationRef.current;

        if (!prevVisible && visible) {
            show();
        }

        if ((prevVisible && !visible) || shouldClose(prevLocation)) {
            hide();
        }

        if (prevLocation.pathname !== location.pathname) {
            hashHistory = [];
        }

        prevVisibleRef.current = visible;
        prevLocationRef.current = location;
    });

    const veilTransitionMod = {
        'with-transition': !deltaY || veilTouched,
    };

    const sheetTransitionMod = {
        'with-transition': veilTransitionMod['with-transition'],
    };

    const contentWithoutScroll = (deltaY > 0 && contentTouched) || swipeAreaTouched;

    return (
        <React.Fragment>
            <SheetVeil
                veilRef={veilRef}
                withTransition={veilTransitionMod['with-transition']}
                isAnimatingRef={isAnimatingRef}
                delayedResizeRef={delayedResizeRef}
                setVeilTouched={setVeilTouched}
                hide={hide}
                hideSheet={hideSheetStable}
                onResizeWindow={onResizeWindow}
            />
            <div
                ref={sheetRef}
                className={sheetBlock('sheet', sheetTransitionMod)}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                {!hideTopBar && (
                    <div ref={sheetTopRef} className={sheetBlock('sheet-top')}>
                        <div className={sheetBlock('sheet-top-resizer')} />
                    </div>
                )}
                <SheetSwipeArea className={swipeAreaClassName} {...swipeAreaHandlers} />
                <SheetContentArea
                    scrollContainerRef={sheetScrollContainerRef}
                    marginBoxRef={sheetMarginBoxRef}
                    contentClassName={contentClassName}
                    title={title}
                    withoutScroll={contentWithoutScroll}
                    alwaysFullHeight={alwaysFullHeight}
                    {...contentAreaHandlers}
                >
                    {content}
                </SheetContentArea>
            </div>
        </React.Fragment>
    );
}

export const SheetContentContainer = SheetContent;
