import React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';
import {isIcon} from '../utils/common';
import {eventBroker} from '../utils/event-broker';
import {isOfType} from '../utils/isOfType';

import {ButtonIcon} from './ButtonIcon';

import './Button.scss';

export type ButtonView =
    | 'normal' // Grey background, no border
    | 'action' // Branded background, no border
    | 'outlined' // No background, grey border
    | 'outlined-info' // No background, with info-type border color
    | 'outlined-success' // No background, with success-type border color
    | 'outlined-warning' // No background, with warning-type border color
    | 'outlined-danger' // No background, with danger-type border color
    | 'outlined-utility' // No background, with utility-type border color
    | 'outlined-action' // No background, with branded border color
    | 'raised' // With white background and shadow
    | 'flat' // No background, no border
    | 'flat-secondary' // No background, no border, secondary-type text color
    | 'flat-info' // No background, no border, info-type text color
    | 'flat-success' // No background, no border, success-type text color
    | 'flat-warning' // No background, no border, warning-type text color
    | 'flat-danger' // No background, no border, danger-type text color
    | 'flat-utility' // No background, no border, utility-type text color
    | 'flat-action' // No background, no border, branded text color
    | 'normal-contrast' // normal button appearance with contrast background
    | 'outlined-contrast' // outlined button appearance with contrast background
    | 'flat-contrast'; // flat button appearance with contrast background

export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type ButtonPin =
    | 'round-round'
    | 'brick-brick'
    | 'clear-clear'
    | 'circle-circle'
    | 'round-brick'
    | 'brick-round'
    | 'round-clear'
    | 'clear-round'
    | 'brick-clear'
    | 'clear-brick'
    | 'circle-brick'
    | 'brick-circle'
    | 'circle-clear'
    | 'clear-circle';

export type ButtonWidth = 'auto' | 'max';

interface ButtonBaseProps extends QAProps {
    /** Button appearance */
    view?: ButtonView;
    size?: ButtonSize;
    pin?: ButtonPin;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    width?: ButtonWidth;
    component?: React.ElementType;
    /**
     * @deprecated
     */
    extraProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    /** Button content. You can mix button text with `<Icon/>` component */
    children?: React.ReactNode;
}

type AnchorOnlyHTMLAttributes = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export type ButtonButtonProps = ButtonBaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        [K in keyof AnchorOnlyHTMLAttributes]: never;
    } & {
        type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    };

export type ButtonLinkProps = ButtonBaseProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

export type ButtonProps = ButtonButtonProps | ButtonLinkProps;

const b = block('button');

const ButtonWithHandlers = React.forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
    const {
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        selected,
        disabled: disabledProp = false,
        loading = false,
        width,
        children,
        qa,
        onClickCapture,
        className,
        component,
        extraProps,
        ...restProps
    } = props;
    const handleClickCapture = React.useCallback(
        (event: React.MouseEvent) => {
            eventBroker.publish({
                componentId: 'Button',
                eventId: 'click',
                domEvent: event,
                meta: {
                    content: event.currentTarget.textContent,
                    view,
                },
            });

            if (onClickCapture) {
                onClickCapture(event as any);
            }
        },
        [view, onClickCapture],
    );

    const disabled = disabledProp || loading;
    const commonProps = {
        onClickCapture: handleClickCapture,
        className: b(
            {
                view,
                size,
                pin,
                selected,
                disabled,
                loading,
                width,
            },
            className,
        ),
        'data-qa': qa,
    };
    const content = prepareChildren(children);

    if (component) {
        return React.createElement(
            component,
            {
                ...commonProps,
                ref,
                tabIndex: disabled ? undefined : 0,
                role: 'button',
                'aria-disabled': disabled,
                'aria-pressed': selected,
                ...restProps,
                ...extraProps,
            },
            content,
        );
    } else if (restProps.href) {
        const linkProps = restProps as ButtonLinkProps;

        return (
            <a
                {...commonProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                rel={
                    linkProps.target === '_blank' && !linkProps.rel
                        ? 'noopener noreferrer'
                        : linkProps.rel
                }
                aria-disabled={disabled}
                {...linkProps}
                {...(extraProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    } else {
        const buttonProps = restProps as ButtonButtonProps;

        return (
            <button
                {...commonProps}
                ref={ref as React.Ref<HTMLButtonElement>}
                type={buttonProps.type ?? 'button'}
                disabled={disabled}
                aria-pressed={selected}
                {...buttonProps}
                {...(extraProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            >
                {content}
            </button>
        );
    }
});

ButtonWithHandlers.displayName = 'Button';

export const Button = Object.assign(ButtonWithHandlers, {Icon: ButtonIcon});

const isButtonIconComponent = isOfType(ButtonIcon);

function prepareChildren(children: React.ReactNode) {
    const items = React.Children.toArray(children);

    if (items.length === 1) {
        const onlyItem = items[0];

        if (isButtonIconComponent(onlyItem)) {
            return onlyItem;
        } else if (isIcon(onlyItem)) {
            return <Button.Icon key="icon">{onlyItem}</Button.Icon>;
        } else {
            return (
                <span key="text" className={b('text')}>
                    {onlyItem}
                </span>
            );
        }
    } else {
        let startIcon, endIcon, text;
        const content = [];

        for (const item of items) {
            const isIconElement = isIcon(item);
            const isButtonIconElement = isButtonIconComponent(item);

            if (isIconElement || isButtonIconElement) {
                if (!startIcon && content.length === 0) {
                    const key = 'icon-start';
                    const side = 'start';
                    if (isIconElement) {
                        startIcon = (
                            <Button.Icon key={key} side={side}>
                                {item}
                            </Button.Icon>
                        );
                    } else {
                        startIcon = React.cloneElement(item, {
                            side,
                        });
                    }
                } else if (!endIcon && content.length !== 0) {
                    const key = 'icon-end';
                    const side = 'end';
                    if (isIconElement) {
                        endIcon = (
                            <Button.Icon key={key} side={side}>
                                {item}
                            </Button.Icon>
                        );
                    } else {
                        endIcon = React.cloneElement(item, {
                            side,
                        });
                    }
                }
            } else {
                content.push(item);
            }
        }

        if (content.length > 0) {
            text = (
                <span key="text" className={b('text')}>
                    {content}
                </span>
            );
        }

        return [startIcon, endIcon, text];
    }
}
