import React from 'react';
import {MobileContextProps, Platform, withMobile, History, Location} from '../';
import {VelocityTracker} from './utils';
import {sheetBlock} from './constants';

import './Sheet.scss';

const DEFAULT_TRANSITION_DURATION = '0.3s';
const HIDE_THRESHOLD = 50;
const ACCELERATION_Y_MAX = 0.08;
const ACCELERATION_Y_MIN = -0.02;

let hashHistory: string[] = [];

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
    prevInnerContentHeight: number;
    swipeAreaTouched: boolean;
    contentTouched: boolean;
    veilTouched: boolean;
    isAnimating: boolean;
    inWindowResizeScope: boolean;
}

class SheetContent extends React.Component<SheetContentInnerProps, SheetContentState> {
    static defaultProps: SheetContentDefaultProps = {
        id: 'sheet',
        allowHideOnContentScroll: true,
    };

    veilRef = React.createRef<HTMLDivElement>();
    sheetRef = React.createRef<HTMLDivElement>();
    sheetTopRef = React.createRef<HTMLDivElement>();
    sheetContentRef = React.createRef<HTMLDivElement>();
    sheetInnerContentRef = React.createRef<HTMLDivElement>();
    velocityTracker = new VelocityTracker();
    observer: MutationObserver | null = null;
    transitionDuration = DEFAULT_TRANSITION_DURATION;

    state: SheetContentState = {
        startScrollTop: 0,
        startY: 0,
        deltaY: 0,
        prevInnerContentHeight: 0,
        swipeAreaTouched: false,
        contentTouched: false,
        veilTouched: false,
        isAnimating: false,
        inWindowResizeScope: false,
    };

    componentDidMount() {
        this.addListeners();
        this.show();
        this.setInitialStyles();
        this.setState({prevInnerContentHeight: this.innerContentHeight});
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

        const {
            deltaY,
            swipeAreaTouched,
            contentTouched,
            veilTouched,
            isAnimating,
            inWindowResizeScope,
        } = this.state;

        const veilTransitionMod = {
            'with-transition': !deltaY || veilTouched,
        };

        const sheetTransitionMod = {
            'with-transition': !inWindowResizeScope && veilTransitionMod['with-transition'],
        };

        const contentMod = {
            'without-scroll': (deltaY > 0 && contentTouched) || swipeAreaTouched,
        };

        return (
            <React.Fragment>
                <div
                    ref={this.veilRef}
                    className={sheetBlock('veil', veilTransitionMod)}
                    onClick={isAnimating ? undefined : this.onVeilClick}
                    onTransitionEnd={this.onVeilTransitionEnd}
                />
                <div ref={this.sheetRef} className={sheetBlock('sheet', sheetTransitionMod)}>
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
                        ref={this.sheetContentRef}
                        className={sheetBlock('sheet-content', contentMod, contentClassName)}
                        onTouchStart={this.onContentTouchStart}
                        onTouchMove={this.onContentTouchMove}
                        onTouchEnd={this.onContentTouchEnd}
                        onTransitionEnd={this.onContentTransitionEnd}
                    >
                        {title && <div className={sheetBlock('sheet-content-title')}>{title}</div>}
                        <div ref={this.sheetInnerContentRef}>{content}</div>
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

    private get innerContentHeight() {
        return this.sheetInnerContentRef.current?.getBoundingClientRect().height || 0;
    }

    private get sheetScrollTop() {
        return this.sheetContentRef.current?.scrollTop || 0;
    }

    private setInitialStyles() {
        if (this.sheetContentRef.current && this.sheetInnerContentRef.current) {
            this.transitionDuration = getComputedStyle(
                this.sheetContentRef.current,
            ).getPropertyValue('--yc-sheet-transition-duration');

            const initialHeight = this.sheetHeight - this.sheetTopHeight;
            this.sheetContentRef.current.style.height = `${initialHeight}px`;
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

        this.setState({deltaY: delta});

        if (delta <= 0) {
            return;
        }

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
        } else if (deltaY > 0) {
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
        this.setState({veilTouched: true});
        this.hide();
    };

    private onVeilTransitionEnd = () => {
        this.setState({isAnimating: false});

        if (this.veilOpacity === '0') {
            this.props.hideSheet();
        }
    };

    private onContentTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.propertyName === 'height') {
            if (this.sheetContentRef.current) {
                this.sheetContentRef.current.style.transition = 'none';
            }
        }
    };

    private onResizeWindow = () => {
        this.setState({inWindowResizeScope: true});

        this.onResize();

        setTimeout(() => this.setState({inWindowResizeScope: false}), 0);
    };

    private onResize = () => {
        const heightChanged = this.state.prevInnerContentHeight !== this.innerContentHeight;

        if (!this.sheetRef.current || !this.sheetContentRef.current || !heightChanged) {
            return;
        }

        this.sheetContentRef.current.style.transition =
            this.state.prevInnerContentHeight > this.innerContentHeight
                ? `height 0s ease ${this.transitionDuration}`
                : 'none';

        this.setState({prevInnerContentHeight: this.innerContentHeight});

        this.sheetContentRef.current.style.height = `${this.innerContentHeight}px`;
        this.sheetRef.current.style.transform = `translate3d(0, -${
            this.innerContentHeight + this.sheetTopHeight
        }px, 0)`;
    };

    private addListeners() {
        window.addEventListener('resize', this.onResizeWindow);

        if (this.sheetRef.current) {
            const config = {subtree: true, childList: true};
            this.observer = new MutationObserver(this.onResize);
            this.observer.observe(this.sheetRef.current, config);
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
