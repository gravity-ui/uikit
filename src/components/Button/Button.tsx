import React, {cloneElement} from 'react';
import {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {isOfType} from '../utils/isOfType';
import {eventBroker} from '../utils/event-broker';
import {ButtonIcon} from './ButtonIcon';
import {isIcon} from '../utils/common';

import './Button.scss';

export type ButtonView =
    | 'normal' // Grey background, no border
    | 'action' // Branded background, no border
    | 'outlined' // No background, grey border
    | 'outlined-info' // No background, with info-type border color
    | 'outlined-danger' // No background, with danger-type border color
    | 'raised' // With white background and shadow
    | 'flat' // No background, no border
    | 'flat-info' // No background, no border, info-type text color
    | 'flat-danger' // No background, no border, danger-type text color
    | 'flat-secondary' // No background, no border, secondary-type text color
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

export interface ButtonProps extends DOMProps, QAProps {
    /** Button appearance */
    view?: ButtonView;
    size?: ButtonSize;
    pin?: ButtonPin;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    width?: ButtonWidth;
    title?: string;
    tabIndex?: number;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    component?: React.ElementType;
    href?: string;
    target?: string;
    rel?: string;
    extraProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onFocus?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /** Button content. You can mix button text with `<Icon/>` component */
    children?: React.ReactNode;
}

const b = block('button');

const ButtonWithHandlers = React.forwardRef<HTMLElement, ButtonProps>(function Button(
    {
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        selected = false,
        disabled = false,
        loading = false,
        width,
        title,
        tabIndex,
        type = 'button',
        component,
        href,
        target,
        rel,
        extraProps,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        children,
        id,
        style,
        className,
        qa,
    },
    ref,
) {
    const handleClickCapture = React.useCallback(
        (event: React.SyntheticEvent) => {
            eventBroker.publish({
                componentId: 'Button',
                eventId: 'click',
                domEvent: event,
                meta: {
                    content: event.currentTarget.textContent,
                    view,
                },
            });
        },
        [view],
    );

    const commonProps = {
        title,
        tabIndex,
        onClick,
        onClickCapture: handleClickCapture,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        id,
        style,
        className: b(
            {
                view,
                size,
                pin,
                selected,
                disabled: disabled || loading,
                loading,
                width,
            },
            className,
        ),
        'data-qa': qa,
    };

    if (typeof href === 'string' || component) {
        const linkProps = {
            href,
            target,
            rel: target === '_blank' && !rel ? 'noopener noreferrer' : rel,
        };
        return React.createElement(
            component || 'a',
            {
                ...extraProps,
                ...commonProps,
                ...(component ? {} : linkProps),
                ref: ref as React.Ref<HTMLAnchorElement>,
                'aria-disabled': disabled || loading,
            },
            prepareChildren(children),
        );
    } else {
        return (
            <button
                {...(extraProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                {...commonProps}
                ref={ref as React.Ref<HTMLButtonElement>}
                type={type}
                disabled={disabled || loading}
            >
                {prepareChildren(children)}
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
        let leftIcon, rightIcon, text;
        const content = [];

        for (const item of items) {
            const isIconElement = isIcon(item);
            const isButtonIconElement = isButtonIconComponent(item);

            if (isIconElement || isButtonIconElement) {
                if (!leftIcon && content.length === 0) {
                    const key = 'icon-left';
                    const side = 'left';
                    if (isIconElement) {
                        leftIcon = (
                            <Button.Icon key={key} side={side}>
                                {item}
                            </Button.Icon>
                        );
                    } else {
                        leftIcon = cloneElement(item, {
                            side,
                        });
                    }
                } else if (!rightIcon && content.length !== 0) {
                    const key = 'icon-right';
                    const side = 'right';
                    if (isIconElement) {
                        rightIcon = (
                            <Button.Icon key={key} side={side}>
                                {item}
                            </Button.Icon>
                        );
                    } else {
                        rightIcon = cloneElement(item, {
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

        return [leftIcon, rightIcon, text];
    }
}
