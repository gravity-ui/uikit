'use client';

import * as React from 'react';

import {Platform, withMobile} from '../mobile';
import type {History, Location, MobileContextProps} from '../mobile';
import {warnOnce} from '../utils/warn';

import {SheetQa, sheetBlock} from './constants';
import {VelocityTracker} from './utils';

import './Sheet.scss';

const TRANSITION_DURATION = '0.3s';
const HIDE_THRESHOLD = 50;
const ACCELERATION_Y_MAX = 0.08;
const ACCELERATION_Y_MIN = -0.02;
const DEFAULT_MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT = 0.9;
const WINDOW_RESIZE_TIMEOUT = 50;

let hashHistory: string[] = [];

function warnAboutOutOfRange() {
    warnOnce(
        '[Sheet] The value of the "maxContentHeightCoefficient" property must be between 0 and 1',
    );
}

type Status = 'showing' | 'hiding';

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

interface RouteComponentProps {
    history: History;
    location: Location;
}

type SheetContentInnerProps = SheetContentProps &
    RouteComponentProps &
    Omit<MobileContextProps, 'useHistory' | 'useLocation'>;

interface SheetContentState {
    startScrollTop: number;
    startY: number;
    deltaY: number;
    prevSheetHeight: number;
    swipeAreaTouched: boolean;
    contentTouched: boolean;
    veilTouched: boolean;
    isAnimating: boolean;
    inWindowResizeScope: boolean;
    delayedResize: boolean;
}

class SheetContent extends React.Component<SheetContentInnerProps, SheetContentState> {
    static defaultProps: SheetContentDefaultProps = {
        id: 'sheet',
        allowHideOnContentScroll: true,
    };

    veilRef = React.createRef<HTMLDivElement>();
    sheetRef = React.createRef<HTMLDivElement>();
    sheetTopRef = React.createRef<HTMLDivElement>();
    sheetMarginBoxRef = React.createRef<HTMLDivElement>();
    sheetScrollContainerRef = React.createRef<HTMLDivElement>();
    velocityTracker = new VelocityTracker();
    observer: ResizeObserver | null = null;
    resizeWindowTimer: number | null = null;

    state: SheetContentState = {
        startScrollTop: 0,
        startY: 0,
        deltaY: 0,
        prevSheetHeight: 0,
        swipeAreaTouched: false,
        contentTouched: false,
        veilTouched: false,
        isAnimating: false,
        inWindowResizeScope: false,
        delayedResize: false,
    };

    componentDidMount() {
        this.addListeners();
        this.show();

        const initialHeight = this.getAvailableContentHeight(this.sheetContentHeight);

        this.setInitialStyles(initialHeight);
        this.setState({
            prevSheetHeight: initialHeight,
        });
    }

    componentDidUpdate(prevProps: SheetContentInnerProps) {
        const {visible, location} = this.props;

        if (!prevProps.visible && visible) {
            this.show();
        }

        if ((prevProps.visible && !visible) || this.shouldClose(prevProps)) {
            this.hide();
        }

        if (prevProps.location.pathname !== location.pathname) {
            hashHistory = [];
        }
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    render() {
        const {content, contentClassName, swipeAreaClassName, hideTopBar, title} = this.props;

        const {deltaY, swipeAreaTouched, contentTouched, veilTouched} = this.state;

        const veilTransitionMod = {
            'with-transition': !deltaY || veilTouched,
        };

        const sheetTransitionMod = {
            'with-transition': veilTransitionMod['with-transition'],
        };

        const contentMod = {
            'without-scroll': (deltaY > 0 && contentTouched) || swipeAreaTouched,
        };

        const marginBoxMod = {
            'always-full-height': this.props.alwaysFullHeight,
        };

        return (
            <React.Fragment>
                <div
                    ref={this.veilRef}
                    className={sheetBlock('veil', veilTransitionMod)}
                    onClick={this.onVeilClick}
                    onTransitionEnd={this.onVeilTransitionEnd}
                    role="presentation"
                    data-qa={SheetQa.VEIL}
                />
                <div
                    ref={this.sheetRef}
                    className={sheetBlock('sheet', sheetTransitionMod)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                >
                    {!hideTopBar && (
                        <div ref={this.sheetTopRef} className={sheetBlock('sheet-top')}>
                            <div className={sheetBlock('sheet-top-resizer')} />
                        </div>
                    )}
                    {/* TODO: extract to external component SwipeArea */}
                    <div
                        className={sheetBlock('sheet-swipe-area', swipeAreaClassName)}
                        onTouchStart={this.onSwipeAreaTouchStart}
                        onTouchMove={this.onSwipeAriaTouchMove}
                        onTouchEnd={this.onSwipeAriaTouchEnd}
                    />
                    {/* TODO: extract to external component ContentArea */}
                    <div
                        ref={this.sheetScrollContainerRef}
                        className={sheetBlock('sheet-scroll-container', contentMod)}
                        onTouchStart={this.onContentTouchStart}
                        onTouchMove={this.onContentTouchMove}
                        onTouchEnd={this.onContentTouchEnd}
                        onTransitionEnd={this.onContentTransitionEnd}
                    >
                        <div
                            ref={this.sheetMarginBoxRef}
                            className={sheetBlock('sheet-margin-box', marginBoxMod)}
                        >
                            <div className={sheetBlock('sheet-margin-box-border-compensation')}>
                                <div className={sheetBlock('sheet-content', contentClassName)}>
                                    {title && (
                                        <div className={sheetBlock('sheet-content-title')}>
                                            {title}
                                        </div>
                                    )}
                                    {content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private get veilOpacity() {
        return this.veilRef.current?.style.opacity || 0;
    }

    private get sheetTopHeight() {
        return this.sheetTopRef.current?.getBoundingClientRect().height || 0;
    }

    private get sheetHeight() {
        return this.sheetRef.current?.getBoundingClientRect().height || 0;
    }

    private get sheetScrollTop() {
        return this.sheetScrollContainerRef.current?.scrollTop || 0;
    }

    private get sheetContentHeight() {
        return this.sheetMarginBoxRef.current?.getBoundingClientRect().height || 0;
    }

    private setInitialStyles(initialHeight: number) {
        if (this.sheetScrollContainerRef.current && this.sheetMarginBoxRef.current) {
            this.sheetScrollContainerRef.current.style.height = `${initialHeight}px`;
        }
    }

    private setStyles = ({status, deltaHeight = 0}: {status: Status; deltaHeight?: number}) => {
        if (!this.sheetRef.current || !this.veilRef.current) {
            return;
        }

        const visibleHeight = this.sheetHeight - deltaHeight;
        const translate =
            status === 'showing'
                ? `translate3d(0, -${visibleHeight}px, 0)`
                : 'translate3d(0, 0, 0)';
        let opacity = 0;

        if (status === 'showing') {
            opacity = deltaHeight === 0 ? 1 : visibleHeight / this.sheetHeight;
        }

        this.veilRef.current.style.opacity = String(opacity);

        this.sheetRef.current.style.transform = translate;

        if (this.isPrefersReducedMotion) {
            this.sheetRef.current.style.opacity = String(opacity);
            this.sheetRef.current.style.transform = `translate3d(0, -${visibleHeight}px, 0)`;
        }
    };

    private getAvailableContentHeight = (sheetHeight: number) => {
        let heightCoefficient = DEFAULT_MAX_CONTENT_HEIGHT_FROM_VIEWPORT_COEFFICIENT;

        if (
            typeof this.props.maxContentHeightCoefficient === 'number' &&
            this.props.maxContentHeightCoefficient >= 0 &&
            this.props.maxContentHeightCoefficient <= 1
        ) {
            heightCoefficient = this.props.maxContentHeightCoefficient;
        } else if (typeof this.props.maxContentHeightCoefficient === 'number') {
            warnAboutOutOfRange();
        }

        const availableViewportHeight =
            window.innerHeight * heightCoefficient - this.sheetTopHeight;

        if (this.props.alwaysFullHeight) {
            return availableViewportHeight;
        }

        const availableContentHeight =
            sheetHeight >= availableViewportHeight ? availableViewportHeight : sheetHeight;

        return availableContentHeight;
    };

    private show = () => {
        this.setState({isAnimating: true}, () => {
            this.setStyles({status: 'showing'});
            this.setHash();
        });
    };

    private hide = () => {
        this.setState({isAnimating: true}, () => {
            this.setStyles({status: 'hiding'});
            this.removeHash();
        });
    };

    private onSwipeAreaTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        this.velocityTracker.clear();

        this.setState({
            startY: e.nativeEvent.touches[0].clientY,
            swipeAreaTouched: true,
        });
    };

    private onContentTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!this.props.allowHideOnContentScroll || this.state.swipeAreaTouched) {
            return;
        }

        this.velocityTracker.clear();

        this.setState({
            startY: e.nativeEvent.touches[0].clientY,
            startScrollTop: this.sheetScrollTop,
            contentTouched: true,
        });
    };

    private onSwipeAriaTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const delta = e.nativeEvent.touches[0].clientY - this.state.startY;

        this.velocityTracker.addMovement({
            x: e.nativeEvent.touches[0].clientX,
            y: e.nativeEvent.touches[0].clientY,
        });

        this.setState({deltaY: delta});

        if (delta <= 0) {
            return;
        }

        this.setStyles({status: 'showing', deltaHeight: delta});
    };

    private onContentTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!this.props.allowHideOnContentScroll) {
            return;
        }

        if (!this.state.startY) {
            this.onContentTouchStart(e);
            return;
        }

        const {startScrollTop, swipeAreaTouched} = this.state;

        if (
            swipeAreaTouched ||
            this.sheetScrollTop > 0 ||
            (startScrollTop > 0 && startScrollTop !== this.sheetScrollTop)
        ) {
            return;
        }

        const delta = e.nativeEvent.touches[0].clientY - this.state.startY;

        this.velocityTracker.addMovement({
            x: e.nativeEvent.touches[0].clientX,
            y: e.nativeEvent.touches[0].clientY,
        });

        // if allowHideOnContentScroll is true and delta <= 0, it's a content scroll
        // animation is not needed
        if (delta <= 0) {
            this.setState({deltaY: 0});
            return;
        }

        this.setState({deltaY: delta});
        this.setStyles({status: 'showing', deltaHeight: delta});
    };

    private onTouchEndAction = (deltaY: number) => {
        const accelerationY = this.velocityTracker.getYAcceleration();

        if (this.sheetHeight <= deltaY) {
            this.props.hideSheet();
        } else if (
            (deltaY > HIDE_THRESHOLD &&
                accelerationY <= ACCELERATION_Y_MAX &&
                accelerationY >= ACCELERATION_Y_MIN) ||
            accelerationY > ACCELERATION_Y_MAX
        ) {
            this.hide();
        } else if (deltaY !== 0) {
            this.show();
        }
    };

    private onSwipeAriaTouchEnd = () => {
        const {deltaY} = this.state;

        this.onTouchEndAction(deltaY);

        this.setState({
            startY: 0,
            deltaY: 0,
            swipeAreaTouched: false,
        });
    };

    private onContentTouchEnd = () => {
        const {deltaY, swipeAreaTouched} = this.state;

        if (!this.props.allowHideOnContentScroll || swipeAreaTouched) {
            return;
        }

        this.onTouchEndAction(deltaY);

        this.setState({
            startY: 0,
            deltaY: 0,
            contentTouched: false,
        });
    };

    private onVeilClick = () => {
        if (this.state.isAnimating) {
            return;
        }

        this.setState({veilTouched: true});
        this.hide();
    };

    private onVeilTransitionEnd = () => {
        this.setState({isAnimating: false});

        if (this.veilOpacity === '0') {
            this.props.hideSheet();
            return;
        }

        if (this.state.delayedResize) {
            this.onResizeWindow();
            this.setState({delayedResize: false});
        }
    };

    private onContentTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.propertyName === 'height') {
            if (this.sheetScrollContainerRef.current) {
                this.sheetScrollContainerRef.current.style.transition = 'none';
            }
        }
    };

    private onResizeWindow = () => {
        if (this.state.isAnimating) {
            this.setState({delayedResize: true});
            return;
        }

        this.setState({inWindowResizeScope: true});

        if (this.resizeWindowTimer) {
            window.clearTimeout(this.resizeWindowTimer);
        }

        this.resizeWindowTimer = window.setTimeout(() => {
            this.onResize();
        }, WINDOW_RESIZE_TIMEOUT);
    };

    private onResize = () => {
        if (!this.sheetRef.current || !this.sheetScrollContainerRef.current) {
            return;
        }

        const sheetContentHeight = this.sheetContentHeight;

        if (sheetContentHeight === this.state.prevSheetHeight && !this.state.inWindowResizeScope) {
            return;
        }

        const availableContentHeight = this.getAvailableContentHeight(sheetContentHeight);

        this.sheetScrollContainerRef.current.style.transition =
            this.state.prevSheetHeight > sheetContentHeight
                ? `height 0s ease ${TRANSITION_DURATION}`
                : 'none';

        this.sheetScrollContainerRef.current.style.height = `${availableContentHeight}px`;
        this.sheetRef.current.style.transform = `translate3d(0, -${availableContentHeight + this.sheetTopHeight}px, 0)`;
        this.setState({prevSheetHeight: sheetContentHeight, inWindowResizeScope: false});
    };

    private addListeners() {
        window.addEventListener('resize', this.onResizeWindow);

        if (this.sheetMarginBoxRef.current) {
            this.observer = new ResizeObserver(() => {
                if (!this.state.inWindowResizeScope) {
                    this.onResize();
                }
            });
            this.observer.observe(this.sheetMarginBoxRef.current);
        }
    }

    private removeListeners() {
        window.removeEventListener('resize', this.onResizeWindow);

        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private setHash() {
        const {id, platform, location, history} = this.props;

        if (platform === Platform.BROWSER) {
            return;
        }

        const newLocation = {...location, hash: id};

        switch (platform) {
            case Platform.IOS:
                if (location.hash) {
                    hashHistory.push(location.hash);
                }
                history.replace(newLocation);
                break;
            case Platform.ANDROID:
                history.push(newLocation);
                break;
        }
    }

    private removeHash() {
        const {id, platform, location, history} = this.props;

        if (platform === Platform.BROWSER || location.hash !== `#${id}`) {
            return;
        }

        switch (platform) {
            case Platform.IOS:
                history.replace({...location, hash: hashHistory.pop() ?? ''});
                break;
            case Platform.ANDROID:
                history.goBack();
                break;
        }
    }

    private shouldClose(prevProps: SheetContentInnerProps) {
        const {id, platform, location, history} = this.props;

        return (
            platform !== Platform.BROWSER &&
            history.action === 'POP' &&
            prevProps.location.hash !== location.hash &&
            location.hash !== `#${id}`
        );
    }

    private get isPrefersReducedMotion() {
        return Boolean(window?.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
}

function withRouterWrapper(Component: React.ComponentType<SheetContentInnerProps>) {
    const ComponentWithRouter = (props: MobileContextProps & SheetContentProps) => {
        const {useHistory, useLocation, ...remainingProps} = props;
        return <Component {...remainingProps} history={useHistory()} location={useLocation()} />;
    };
    const componentName = Component.displayName || Component.name || 'Component';

    ComponentWithRouter.displayName = `withRouterWrapper(${componentName})`;
    return ComponentWithRouter;
}
export const SheetContentContainer = withMobile(withRouterWrapper(SheetContent));
