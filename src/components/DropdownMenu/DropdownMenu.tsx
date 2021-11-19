import React from 'react';
import noop from 'lodash/noop';

import {block} from '../utils/cn';
import {PopupPlacement} from '../Popup';
import {Button, ButtonProps} from '../Button';
import {Icon} from '../Icon';
import {DropdownMenuItemMixed, DropdownMenuItemAction, DropdownMenuItem} from './types';
import {DropdownMenuPopup} from './DropdownMenuPopup';

import dotsIcon from '../../../assets/icons/dots.svg';
import './DropdownMenu.scss';

const b = block('dropdown-menu');

interface DropdownMenuGeneralProps<T> {
    /**
     * Some context for this dropdown menu, it will be passed to any action called from this menu.
     * Useful when rendering lists with context menus.
     */
    data?: T;
    /** If true, disables switcher button and prevents menu from being opened */
    disabled?: boolean;
    /** Custom switcher */
    switcher?: React.ReactNode;
    switcherWrapperClassName?: string;
    /** Allows to override some props for a default switcher Button */
    defaultSwitcherProps?: ButtonProps;
    defaultSwitcherClassName?: string;
    /** Invoked whenever the switcher was clicked (if DropdownMenu is not disabled) */
    onSwitcherClick?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

    popupClassName?: string;
    popupPlacement?: PopupPlacement;

    /** Allows to render custom menu inside the popup block */
    children?: React.ReactNode;
}
interface DropdownMenuDefaultProps<T> {
    /** Array of items or arrays of items (the latter allows to define item groups) */
    items: DropdownMenuItemMixed<T>[];
    /** Custom icon for switcher */
    icon: React.ReactNode;
    onMenuToggle: () => void;
    hideOnScroll: boolean;
}
interface DropdownMenuInnerProps<T>
    extends DropdownMenuGeneralProps<T>,
        DropdownMenuDefaultProps<T> {}
export interface DropdownMenuProps<T>
    extends DropdownMenuGeneralProps<T>,
        Partial<DropdownMenuDefaultProps<T>> {}

interface DropdownMenuState {
    popupIsShowed: boolean;
}

export class DropdownMenu<T> extends React.PureComponent<
    DropdownMenuInnerProps<T>,
    DropdownMenuState
> {
    // eslint-disable-next-line react/sort-comp
    static defaultProps: DropdownMenuDefaultProps<unknown> = {
        items: [],
        icon: <Icon data={dotsIcon} />,
        onMenuToggle: noop,
        hideOnScroll: true,
    };

    state: Readonly<DropdownMenuState> = {
        popupIsShowed: false,
    };

    private anchorRef = React.createRef<HTMLDivElement>();

    componentWillUnmount() {
        if (this.props.hideOnScroll) {
            document.removeEventListener('scroll', this.onScroll, true);
        }
    }

    render() {
        const {
            items,
            switcher,
            popupClassName,
            switcherWrapperClassName,
            popupPlacement,
            children,
        } = this.props;

        const switcherButton = switcher || this.renderDefaultSwitcher();

        return (
            <React.Fragment>
                <div
                    ref={this.anchorRef}
                    className={b('switcher-wrapper', switcherWrapperClassName)}
                    onClick={this.onSwitcherClick}
                >
                    {switcherButton}
                </div>
                <DropdownMenuPopup
                    open={this.state.popupIsShowed}
                    anchorRef={this.anchorRef}
                    items={items}
                    onMenuItemClick={this.onMenuItemClick}
                    onClose={this.handleClose}
                    popupClassName={popupClassName}
                    placement={popupPlacement}
                >
                    {children}
                </DropdownMenuPopup>
            </React.Fragment>
        );
    }

    private renderDefaultSwitcher() {
        const {defaultSwitcherClassName, defaultSwitcherProps, icon} = this.props;

        return (
            <Button
                view="flat"
                size="s"
                {...defaultSwitcherProps}
                className={b('switcher-button', defaultSwitcherClassName)}
                disabled={this.props.disabled}
            >
                {icon}
            </Button>
        );
    }

    private onMenuItemClick = (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        action: DropdownMenuItemAction<T>,
    ) => {
        action(event, this.props.data);
        this.props.onMenuToggle();
        this.hidePopup();
    };

    private onSwitcherClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (this.props.disabled) {
            return;
        }

        this.props.onMenuToggle();

        if (this.props.onSwitcherClick) {
            this.props.onSwitcherClick(e);
        }

        if (this.state.popupIsShowed) {
            this.hidePopup();
        } else {
            this.showPopup();
        }
    };

    private onScroll = (event: Event) => {
        let element: null | (Node & ParentNode) = this.anchorRef.current;

        while (element && element !== event.target) {
            element = element.parentNode;
        }

        if (element === event.target) {
            this.props.onMenuToggle();
            this.hidePopup();
        }
    };

    private showPopup() {
        this.setState({popupIsShowed: true});

        if (this.props.hideOnScroll) {
            document.addEventListener('scroll', this.onScroll, true);
        }
    }

    private hidePopup() {
        this.setState({popupIsShowed: false});

        if (this.props.hideOnScroll) {
            document.removeEventListener('scroll', this.onScroll, true);
        }
    }

    private handleClose = () => {
        this.hidePopup();
        this.props.onMenuToggle();
    };
}

export type {DropdownMenuItemMixed, DropdownMenuItemAction, DropdownMenuItem};
