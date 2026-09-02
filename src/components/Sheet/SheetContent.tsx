'use client';

import * as React from 'react';

import type {UseInteractionsReturn} from '@floating-ui/react';

import {useForkRef} from '../../hooks';
import {MobileContext} from '../mobile';
import {warnOnce} from '../utils/warn';

import {SheetContentArea, SheetSwipeArea, SheetVeil} from './components';
import {SheetQa, sheetBlock} from './constants';
import {useContentScroll} from './hooks/useContentScroll';
import type {UseSheetDismissResult} from './hooks/useSheetDismiss';
import {useSheetHash} from './hooks/useSheetHash';
import {useSwipe} from './hooks/useSwipe';
import {useVeil} from './hooks/useVeil';
import type {Status} from './types';

import './Sheet.scss';

const TRANSITION_DURATION = '0.3s';
const DEFAULT_MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT = 0.9;
const WINDOW_RESIZE_TIMEOUT = 50;

export type SheetPresenceStatus = 'unmounted' | 'initial' | 'open' | 'close';

function warnAboutOutOfRange() {
    warnOnce(
        '[Sheet] The value of the "maxContentHeightCoefficient" property must be between 0 and 1',
    );
}

interface SheetContentBaseProps {
    requestDismiss: UseSheetDismissResult['requestDismiss'];
    veilRef: React.RefObject<HTMLDivElement>;
    isAnimatingRef: React.MutableRefObject<boolean>;
    floatingRef: React.Ref<HTMLDivElement>;
    getFloatingProps: UseInteractionsReturn['getFloatingProps'];
    content: React.ReactNode;
    status: SheetPresenceStatus;
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

export function SheetContent(props: SheetContentProps) {
    const {
        content,
        contentClassName,
        swipeAreaClassName,
        hideTopBar,
        title,
        status,
        requestDismiss,
        veilRef,
        isAnimatingRef,
        floatingRef,
        getFloatingProps,
        maxContentHeightCoefficient,
        alwaysFullHeight,
        id = 'sheet',
        allowHideOnContentScroll = true,
    } = props;

    const {platform, useHistory, useLocation} = React.useContext(MobileContext);
    const history = useHistory();
    const location = useLocation();

    const sheetRef = React.useRef<HTMLDivElement>(null);
    const sheetTopRef = React.useRef<HTMLDivElement>(null);
    const sheetMarginBoxRef = React.useRef<HTMLDivElement>(null);
    const sheetScrollContainerRef = React.useRef<HTMLDivElement>(null);
    const handleSheetRef = useForkRef(sheetRef, floatingRef);

    const observerRef = React.useRef<ResizeObserver | null>(null);
    const resizeWindowTimerRef = React.useRef<number | null>(null);

    const [veilTouched, setVeilTouched] = React.useState(false);

    const prevSheetHeightRef = React.useRef(0);
    const inWindowResizeScopeRef = React.useRef(false);
    const delayedResizeRef = React.useRef(false);
    const hashSetRef = React.useRef(false);

    const prevLocationRef = React.useRef(location);

    const {setHash, removeHash, shouldClose, resetHashHistory} = useSheetHash({
        id,
        platform,
        history,
        location,
    });

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
        ({status: nextStatus, deltaHeight = 0}: {status: Status; deltaHeight?: number}) => {
            if (!sheetRef.current || !veilRef.current) {
                return;
            }

            const sheetHeight = getSheetHeight();
            const visibleHeight = sheetHeight - deltaHeight;
            const translate =
                nextStatus === 'showing'
                    ? `translate3d(0, -${visibleHeight}px, 0)`
                    : 'translate3d(0, 0, 0)';
            let opacity = 0;

            if (nextStatus === 'showing') {
                opacity = deltaHeight === 0 ? 1 : visibleHeight / sheetHeight;
            }

            veilRef.current.style.opacity = String(opacity);

            sheetRef.current.style.transform = translate;

            if (getIsPrefersReducedMotion()) {
                sheetRef.current.style.opacity = String(opacity);
                sheetRef.current.style.transform = `translate3d(0, -${visibleHeight}px, 0)`;
            }
        },
        [getSheetHeight, getIsPrefersReducedMotion, veilRef],
    );

    const getAvailableContentHeight = React.useCallback(
        (sheetHeight: number) => {
            let heightCoefficient = DEFAULT_MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT;

            if (
                typeof maxContentHeightCoefficient === 'number' &&
                maxContentHeightCoefficient >= 0 &&
                maxContentHeightCoefficient <= 1
            ) {
                heightCoefficient = maxContentHeightCoefficient;
            } else if (typeof maxContentHeightCoefficient === 'number') {
                warnAboutOutOfRange();
            }

            const availableViewportHeight =
                window.innerHeight * heightCoefficient - getSheetTopHeight();

            if (alwaysFullHeight) {
                return availableViewportHeight;
            }

            const availableContentHeight =
                sheetHeight >= availableViewportHeight ? availableViewportHeight : sheetHeight;

            return availableContentHeight;
        },
        [alwaysFullHeight, getSheetTopHeight, maxContentHeightCoefficient],
    );

    const show = React.useCallback(() => {
        isAnimatingRef.current = true;
        setStyles({status: 'showing'});

        if (!hashSetRef.current) {
            hashSetRef.current = true;
            setHash();
        }
    }, [isAnimatingRef, setStyles, setHash]);

    const hide = React.useCallback(() => {
        isAnimatingRef.current = true;
        setStyles({status: 'hiding'});

        if (hashSetRef.current) {
            hashSetRef.current = false;
            removeHash();
        }
    }, [isAnimatingRef, setStyles, removeHash]);

    const getIsExitAnimating = React.useCallback(
        () => isAnimatingRef.current && status === 'close',
        [isAnimatingRef, status],
    );

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
        getIsExitAnimating,
        requestDismiss,
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
        allowHideOnContentScroll,
        getSheetScrollTop,
        setStyles,
        getIsExitAnimating,
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
    }, [isAnimatingRef, onResize]);

    const {veilHandlers} = useVeil({
        veilRef,
        isAnimatingRef,
        delayedResizeRef,
        setVeilTouched,
        requestDismiss,
        onResizeWindow,
    });

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

        const initialHeight = getAvailableContentHeight(getSheetContentHeight());

        setInitialStyles(initialHeight);
        prevSheetHeightRef.current = initialHeight;

        return () => {
            window.removeEventListener('resize', onResizeWindow);

            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [
        getAvailableContentHeight,
        getSheetContentHeight,
        onResize,
        onResizeWindow,
        setInitialStyles,
    ]);

    React.useEffect(() => {
        if (status === 'initial') {
            show();
        } else if (status === 'close') {
            hide();
        }
    }, [status, show, hide]);

    // --- componentDidUpdate ---
    React.useEffect(() => {
        const prevLocation = prevLocationRef.current;

        const shouldCloseOnNavigation = hashSetRef.current && shouldClose(prevLocation);

        if (shouldCloseOnNavigation) {
            requestDismiss({reason: 'navigation'});
        }

        if (prevLocation.pathname !== location.pathname) {
            resetHashHistory();
        }

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
                {...veilHandlers}
            />
            <div
                ref={handleSheetRef}
                className={sheetBlock('sheet', sheetTransitionMod)}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                {...getFloatingProps()}
            >
                {!hideTopBar && (
                    <div
                        ref={sheetTopRef}
                        className={sheetBlock('sheet-top')}
                        data-qa={SheetQa.TOP}
                    >
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
