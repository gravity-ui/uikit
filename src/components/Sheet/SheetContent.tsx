'use client';

import * as React from 'react';

import type {UseInteractionsReturn} from '@floating-ui/react';
import {useMergeRefs} from '@floating-ui/react';

import type {UseFloatingTransitionResult} from '../../hooks/private/useFloatingTransition';
import {MobileContext} from '../mobile';
import {warnOnce} from '../utils/warn';

import {SheetContentArea, SheetSwipeArea, SheetVeil} from './components';
import {SheetQa, sheetBlock} from './constants';
import {useContentScroll} from './hooks/useContentScroll';
import type {UseSheetDismissResult} from './hooks/useSheetDismiss';
import {useSheetHash} from './hooks/useSheetHash';
import {useSwipe} from './hooks/useSwipe';
import type {CancelSwipeOptions} from './hooks/useSwipe';
import {useVeil} from './hooks/useVeil';
import type {Status} from './types';

import './Sheet.scss';

const DEFAULT_MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT = 0.9;

export type SheetPresenceStatus = UseFloatingTransitionResult['status'];

let fullViewportSize = {width: 0, height: 0};

function getFullViewportHeight(width: number, height: number) {
    if (width !== fullViewportSize.width || height > fullViewportSize.height) {
        fullViewportSize = {width, height};
    }

    return fullViewportSize.height;
}

function warnAboutOutOfRange() {
    warnOnce(
        '[Sheet] The value of the "maxContentHeightCoefficient" property must be between 0 and 1',
    );
}

interface SheetContentBaseProps {
    requestDismiss: UseSheetDismissResult['requestDismiss'];
    floatingRef: React.Ref<HTMLDivElement>;
    getFloatingProps: UseInteractionsReturn['getFloatingProps'];
    content: React.ReactNode;
    presenceStatus: SheetPresenceStatus;
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
        presenceStatus,
        requestDismiss,
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
    const veilRef = React.useRef<HTMLDivElement>(null);
    const isAnimatingRef = React.useRef(false);
    const sheetTopRef = React.useRef<HTMLDivElement>(null);
    const sheetMarginBoxRef = React.useRef<HTMLDivElement>(null);
    const sheetScrollContainerRef = React.useRef<HTMLDivElement>(null);
    const handleSheetRef = useMergeRefs([sheetRef, floatingRef]);

    const observerRef = React.useRef<ResizeObserver | null>(null);

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

            // iOS WebViews update innerHeight a few frames before the overlay the sheet hangs from.
            const overlay = sheetRef.current?.parentElement;
            const viewportHeight = overlay?.clientHeight || window.innerHeight;
            const fullViewportHeight = getFullViewportHeight(
                overlay?.clientWidth || window.innerWidth,
                viewportHeight,
            );
            // Use the keyboard-less viewport for the top gap so the keyboard keeps the top edge.
            const availableViewportHeight =
                viewportHeight - fullViewportHeight * (1 - heightCoefficient) - getSheetTopHeight();

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
    }, [setStyles, setHash]);

    const hide = React.useCallback(() => {
        isAnimatingRef.current = true;
        setStyles({status: 'hiding'});

        if (hashSetRef.current) {
            hashSetRef.current = false;
            removeHash();
        }
    }, [setStyles, removeHash]);

    const getIsExitAnimating = React.useCallback(
        () => presenceStatus === 'close',
        [presenceStatus],
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
        cancelSwipe,
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

    const {contentTouched, resetContentTouch, contentAreaHandlers} = useContentScroll({
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

    const cancelDrag = React.useCallback(
        (options: CancelSwipeOptions) => {
            resetContentTouch();
            cancelSwipe(options);
        },
        [cancelSwipe, resetContentTouch],
    );

    const onTouchCancel = React.useCallback(() => {
        cancelDrag({restoreOpenPosition: veilRef.current?.style.opacity !== '1'});
    }, [cancelDrag]);

    const dragging = deltaY !== 0;
    const activeGesture = dragging || swipeAreaTouched || contentTouched;

    const onResize = React.useCallback(() => {
        if (!sheetRef.current || !sheetScrollContainerRef.current) {
            return;
        }

        const sheetContentHeight = getSheetContentHeight();

        if (sheetContentHeight === prevSheetHeightRef.current && !inWindowResizeScopeRef.current) {
            return;
        }

        const availableContentHeight = getAvailableContentHeight(sheetContentHeight);
        const withTransition = isAnimatingRef.current;

        sheetScrollContainerRef.current.style.transition =
            withTransition && prevSheetHeightRef.current > sheetContentHeight
                ? 'height 0s ease var(--_--transition-duration)'
                : 'none';

        if (!withTransition) {
            sheetRef.current.style.transition = 'none';
        }

        sheetScrollContainerRef.current.style.height = `${availableContentHeight}px`;
        sheetRef.current.style.transform = `translate3d(0, -${availableContentHeight + getSheetTopHeight()}px, 0)`;

        if (!withTransition) {
            // Commit the position before restoring the transition.
            sheetRef.current.getBoundingClientRect();
            sheetRef.current.style.transition = '';
        }

        prevSheetHeightRef.current = sheetContentHeight;
        inWindowResizeScopeRef.current = false;
    }, [getSheetContentHeight, getAvailableContentHeight, getSheetTopHeight]);

    const onResizeWindow = React.useCallback(() => {
        if (isAnimatingRef.current) {
            delayedResizeRef.current = true;
            return;
        }

        inWindowResizeScopeRef.current = true;
        onResize();
    }, [onResize]);

    const {veilHandlers} = useVeil({
        veilRef,
        isAnimatingRef,
        delayedResizeRef,
        requestDismiss,
        onResizeWindow,
    });

    // --- componentDidMount / componentWillUnmount ---
    React.useEffect(() => {
        const overlay = sheetRef.current?.parentElement;
        const overlayObserver = overlay ? new ResizeObserver(() => onResizeWindow()) : null;

        if (overlay && overlayObserver) {
            overlayObserver.observe(overlay);
        }

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
            overlayObserver?.disconnect();

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
        if (presenceStatus === 'initial') {
            show();
        }
    }, [presenceStatus, show]);

    React.useEffect(() => {
        if (presenceStatus === 'close') {
            cancelDrag({restoreOpenPosition: false});
        }
    }, [cancelDrag, presenceStatus]);

    React.useEffect(() => {
        if (presenceStatus === 'close' && !activeGesture) {
            hide();
        }
    }, [activeGesture, hide, presenceStatus]);

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

    const withTransition = presenceStatus === 'close' || !dragging;

    const contentWithoutScroll = (deltaY > 0 && contentTouched) || swipeAreaTouched;

    return (
        <React.Fragment>
            <SheetVeil veilRef={veilRef} withTransition={withTransition} {...veilHandlers} />
            <div
                ref={handleSheetRef}
                className={sheetBlock('sheet', {'with-transition': withTransition})}
                aria-modal="true"
                {...getFloatingProps({'aria-label': title})}
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
                <SheetSwipeArea
                    className={swipeAreaClassName}
                    {...swipeAreaHandlers}
                    onTouchCancel={onTouchCancel}
                />
                <SheetContentArea
                    scrollContainerRef={sheetScrollContainerRef}
                    marginBoxRef={sheetMarginBoxRef}
                    contentClassName={contentClassName}
                    title={title}
                    withoutScroll={contentWithoutScroll}
                    alwaysFullHeight={alwaysFullHeight}
                    {...contentAreaHandlers}
                    onTouchCancel={onTouchCancel}
                >
                    {content}
                </SheetContentArea>
            </div>
        </React.Fragment>
    );
}

export const SheetContentContainer = SheetContent;
