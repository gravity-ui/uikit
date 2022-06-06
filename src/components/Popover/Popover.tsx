import React from 'react';
import {block} from '../utils/cn';

import {Popup, PopupPlacement} from '../Popup';
import {Button} from '../Button';
import {Link} from '../Link';
import {Icon} from '../Icon';
import {QAProps} from '../types';

import {PreviewCloseIcon} from '../icons/PreviewCloseIcon';

import './Popover.scss';

export interface PopoverButtonProps {
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface PopoverExternalProps {
    /** content over which the tooltip is shown */
    children?: React.ReactNode;
    /** tooltip's title */
    title?: string;
    /** tooltip's content */
    content?: React.ReactNode;
    /** tooltip's html content to be rendered via `dangerouslySetInnerHTML` */
    htmlContent?: string;
    /** css class for `content` */
    contentClassName?: string;
    /** the button will be rendered if the following object is passed <br/>
     * ```{ text: 'Button', onClick: () => callbackOnClick() }``` */
    tooltipActionButton?: PopoverButtonProps;
    /** the same as `tooltipActionButton` */
    tooltipCancelButton?: PopoverButtonProps;
    /** tooltip's offset relative to the control */
    tooltipOffset?: [number, number];
    tooltipClassName?: string;
    /** css className for the control */
    className?: string;
    /** Allows to use custom anchor and disables `openByHover` и `onClick` for the component */
    anchorRef?: React.RefObject<HTMLElement>;
    /** If specified, will be called when the anchor is clicked. If function
     * returns `true', the tooltip is opened. If it returns `false', the tooltip won't be opened. */
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => boolean | Promise<boolean>;
    /** Might be useful for the delayed rendering of the tooltip's content. */
    onOpenChange?: (open: boolean) => void;
    /** Custom handler for the close icon's click. */
    onCloseClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export enum PopoverBehavior {
    Immediate = 'immediate',
    Delayed = 'delayed',
    DelayedClosing = 'delayedClosing',
}

interface PopoverWithBehavior {
    /** How the tooltip opens/closes when `openOnHover` is enabled (without
     * delay / with delay / delay only on close). Will not be applied if
     * `delayOpening` or `delayClosing` are passed. */
    behavior: PopoverBehavior;
    delayOpening?: never;
    delayClosing?: never;
}

type PopoverWithDelays = {
    behavior?: never;
    /** Tune how much tooltip's opening is delayed when `openOnHover` is enabled.
     * It is recommended to use `behavior` */
    delayOpening?: number;
    /** Tune how much tooltip's closing is delayed when `autoclosable` is enabled.
     * It is recommended to use `behavior` */
    delayClosing?: number;
};

type PopoverBehaviorProps = PopoverWithBehavior | PopoverWithDelays;

interface PopoverDefaultProps {
    /** Set the control's offset <br/> ```{ top: 0, left: 0 }``` */
    offset: {
        top?: number;
        left?: number;
    };
    /** Links under the content, expects objects like <br/>
     * ```{ text: 'Link 1', href: 'https://yandex.ru'}``` or  <br/>
     * ```{ text: 'Link 2', onClick: () => callbackOnLinkClick() }``` */
    links: Array<{
        text: string;
        href?: string;
        target?: '_self' | '_blank';
        onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    }>;
    /** the directions for opening the tooltip */
    placement: PopupPlacement;
    /** whether the tooltip has tail */
    hasArrow: boolean;
    /** whether the tooltip opens when hovered */
    openOnHover: boolean;
    /** whether the tooltip automatically closes when cursor moves outside it */
    autoclosable: boolean;
    /** tooltip's theme */
    theme: 'info' | 'special' | 'announcement';
    /** tooltip's size */
    size: 's' | 'l';
    /** Whether the tooltip has close icon */
    hasClose: boolean;
    /** Whether the tooltip should render initially open */
    initialOpen: boolean;
    /** Whether the tooltip should render disabled */
    disabled: boolean;
}

export type PopoverProps = PopoverExternalProps &
    PopoverBehaviorProps &
    Partial<PopoverDefaultProps>;

interface PopoverState {
    open: boolean;
}

const b = block('popover');

export class Popover extends React.Component<
    PopoverExternalProps & PopoverBehaviorProps & PopoverDefaultProps & QAProps,
    PopoverState
> {
    static defaultProps: PopoverDefaultProps = {
        offset: {},
        links: [],
        placement: ['right', 'bottom'],
        hasArrow: true,
        openOnHover: true,
        autoclosable: true,
        theme: 'info',
        size: 's',
        hasClose: false,
        initialOpen: false,
        disabled: false,
    };

    state: PopoverState = {
        open: this.props.initialOpen,
    };

    private controlRef = React.createRef<HTMLDivElement>();
    private delayOpening: ReturnType<typeof setTimeout> | null = null;
    private delayClosing: ReturnType<typeof setTimeout> | null = null;
    private closedManually = false;
    private delayByBehavior = {
        [PopoverBehavior.Immediate]: [0, 0],
        [PopoverBehavior.Delayed]: [300, 300],
        [PopoverBehavior.DelayedClosing]: [0, 300],
    };

    componentDidUpdate(prevProps: PopoverProps) {
        if (prevProps.disabled !== this.props.disabled && this.props.disabled) {
            this.closeTooltip();
        }
    }

    componentWillUnmount() {
        this.unsetOpeningTimeout();
        this.unsetClosingTimeout();
    }

    render() {
        const {openOnHover, className, children, offset, anchorRef, disabled, qa} = this.props;

        if (anchorRef) {
            return this.renderTooltip();
        }

        return (
            <div
                ref={this.controlRef}
                className={b({disabled}, className)}
                onMouseEnter={openOnHover ? this.onMouseEnter : undefined}
                onMouseLeave={openOnHover ? this.onMouseLeave : undefined}
                style={{
                    top: offset.top,
                    left: offset.left,
                }}
                data-qa={qa}
            >
                <span onClick={this.onClick}>{children}</span>
                {this.renderTooltip()}
            </div>
        );
    }

    openTooltip = () => {
        this.unsetOpeningTimeout();
        this.setTooltipOpen(true);
    };

    closeTooltip = () => {
        this.unsetClosingTimeout();
        this.setTooltipOpen(false);
    };

    private setTooltipOpen(open: boolean) {
        this.setState({open});

        const {onOpenChange} = this.props;
        if (onOpenChange) {
            onOpenChange(open);
        }
    }

    private get delay() {
        const [defaultDelayOpening, defaultDelayClosing] =
            this.delayByBehavior[this.props.behavior ?? PopoverBehavior.DelayedClosing];
        const {delayOpening = defaultDelayOpening, delayClosing = defaultDelayClosing} = this.props;

        return [delayOpening, delayClosing];
    }

    private openTooltipDelayed = () => {
        this.delayOpening = null;
        this.openTooltip();
    };

    private closeTooltipDelayed = () => {
        this.delayClosing = null;
        this.closeTooltip();
    };

    private unsetOpeningTimeout() {
        if (this.delayOpening) {
            clearTimeout(this.delayOpening);
            this.delayOpening = null;
        }
    }

    private unsetClosingTimeout() {
        if (this.delayClosing) {
            clearTimeout(this.delayClosing);
            this.delayClosing = null;
        }
    }

    private renderTooltip() {
        const {open} = this.state;
        const {
            placement,
            hasArrow,
            tooltipOffset,
            tooltipClassName,
            theme,
            size,
            anchorRef,
            hasClose,
        } = this.props;

        return (
            <Popup
                anchorRef={anchorRef || this.controlRef}
                className={b('tooltip', {theme, size, ['with-close']: hasClose}, tooltipClassName)}
                open={open}
                placement={placement}
                hasArrow={hasArrow}
                offset={tooltipOffset}
                onClose={anchorRef ? undefined : this.closeTooltip}
            >
                <React.Fragment>
                    {this.renderTitle()}
                    {this.renderContent()}
                    {this.renderLinks()}
                    {this.renderButtons()}
                    {this.renderClose()}
                </React.Fragment>
            </Popup>
        );
    }

    private renderTitle() {
        const {title} = this.props;

        if (!title) {
            return null;
        }

        return <h3 className={b('tooltip-title')}>{title}</h3>;
    }

    private renderContent() {
        const {title, theme, content, htmlContent, contentClassName} = this.props;
        const secondary = title && theme !== 'announcement';

        if (!htmlContent && !content) {
            return null;
        }

        if (htmlContent) {
            return (
                <div
                    className={b('tooltip-content', {secondary})}
                    dangerouslySetInnerHTML={{
                        __html: htmlContent,
                    }}
                />
            );
        }

        if (content) {
            return (
                <div className={b('tooltip-content', {secondary}, contentClassName)}>{content}</div>
            );
        }

        return null;
    }

    private renderLinks() {
        const {links} = this.props;

        if (!links.length) {
            return null;
        }

        return (
            <div className={b('tooltip-links')}>
                {links.map((link, index) => {
                    const {text, href, target = '_blank', onClick} = link;

                    return (
                        <React.Fragment key={`link-${index}`}>
                            <Link
                                href={href}
                                target={target}
                                onClick={onClick}
                                className={b('tooltip-link')}
                            >
                                {text}
                            </Link>
                            <br />
                        </React.Fragment>
                    );
                })}
            </div>
        );
    }

    private renderButtons() {
        const {tooltipActionButton, tooltipCancelButton} = this.props;

        if (!tooltipActionButton && !tooltipCancelButton) {
            return null;
        }

        return (
            <div className={b('tooltip-buttons')}>
                {this.renderButton(tooltipActionButton, true)}
                {this.renderButton(tooltipCancelButton)}
            </div>
        );
    }

    private renderButton(buttonProps?: PopoverButtonProps, isAction = false) {
        if (!buttonProps) {
            return null;
        }

        const {text, onClick} = buttonProps;

        return (
            <Button
                view={this.getButtonView(isAction)}
                width="max"
                onClick={onClick}
                className={b('tooltip-button')}
            >
                {text}
            </Button>
        );
    }

    private renderClose() {
        const {hasClose} = this.props;

        if (!hasClose) {
            return null;
        }

        return (
            <div className={b('tooltip-close')}>
                <Button size="s" view="flat-secondary" onClick={this.onCloseClick}>
                    <Icon data={PreviewCloseIcon} size={24} />
                </Button>
            </div>
        );
    }

    private getButtonView = (isAction = false) => {
        const {theme} = this.props;

        switch (theme) {
            case 'special':
                return isAction ? 'normal-contrast' : 'flat-contrast';
            case 'announcement':
                return isAction ? 'normal-contrast' : 'outlined';
            default:
                return isAction ? 'normal' : 'flat';
        }
    };

    private toggleTooltip = () => {
        const nextOpen = !this.state.open;

        if (nextOpen) {
            this.openTooltip();
            this.closedManually = false;
        } else {
            this.closeTooltip();
            this.closedManually = true;
        }
    };

    private onMouseEnter = () => {
        const {disabled} = this.props;
        const [delayOpening] = this.delay;
        const {open} = this.state;

        this.unsetClosingTimeout();

        if (!open && !disabled && !this.closedManually) {
            this.delayOpening = setTimeout(this.openTooltipDelayed, delayOpening);
        }
    };

    private onMouseLeave = () => {
        const {autoclosable} = this.props;
        const [, delayClosing] = this.delay;

        if (autoclosable && !this.closedManually && !this.delayClosing) {
            this.unsetOpeningTimeout();
            this.delayClosing = setTimeout(this.closeTooltipDelayed, delayClosing);
        }

        this.closedManually = false;
    };

    private onClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        const {onClick, disabled} = this.props;

        if (!disabled && (!onClick || (await onClick(event)))) {
            this.toggleTooltip();
        }
    };

    private onCloseClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const {onCloseClick} = this.props;

        this.closeTooltip();
        onCloseClick?.(event);
    };
}
