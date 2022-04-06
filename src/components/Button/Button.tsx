import React from 'react';
import {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {Icon} from '../Icon';
import {withEventBrokerDomHandlers} from '../utils/withEventBrokerDomHandlers';
import {ButtonIcon} from './ButtonIcon';

import './Button.scss';

export type ButtonView =
    | 'normal' // С серым фоном, без рамки
    | 'action' // С брендовым фоном, без рамки
    | 'outlined' // Без фона, с серой рамкой
    | 'outlined-info' // Без фона, с info-рамкой
    | 'outlined-danger' // Без фона, с danger-рамкой
    | 'raised' // С белым фоном и с тенью
    | 'flat' // Без фона, без рамки
    | 'flat-info' // Без фона, без рамки, info-текст
    | 'flat-danger' // Без фона, без рамки, danger-текст
    | 'flat-secondary' // Без фона, без рамки, secondary-текст
    | 'normal-contrast' // normal на контрастном фоне
    | 'outlined-contrast' // outlined на контрастном фоне
    | 'flat-contrast'; // flat на контрастном фоне

export type ButtonSize = 's' | 'm' | 'l' | 'xl';

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

export interface ButtonProps extends DOMProps, QAProps {
    view?: ButtonView; // вид кнопки
    size?: ButtonSize;
    pin?: ButtonPin;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    width?: 'auto' | 'max';
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
    children?: React.ReactNode; // содержимое, можно комбинировать текст с Icon, слева, справа, или только Icon
}

const b = block('button');

const PureButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    function Button(
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
        const commonProps = {
            title,
            tabIndex,
            onClick,
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
    },
);

PureButton.displayName = 'Button';
export const Button = withEventBrokerDomHandlers(PureButton, ['onClick'], {
    componentId: 'Button',
});

function isIcon(component: React.ReactNode) {
    if (!React.isValidElement(component)) {
        return false;
    }
    const {type} = component;
    return type === Icon || (type as React.ComponentType).displayName === 'Icon';
}

function prepareChildren(children: React.ReactNode) {
    const items = React.Children.toArray(children);

    if (items.length === 1) {
        const onlyItem = items[0];

        if (isIcon(onlyItem)) {
            return <ButtonIcon key="icon">{onlyItem}</ButtonIcon>;
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
            if (isIcon(item)) {
                if (!leftIcon && content.length === 0) {
                    leftIcon = (
                        <ButtonIcon key="icon-left" side="start">
                            {item}
                        </ButtonIcon>
                    );
                } else if (!rightIcon && content.length !== 0) {
                    rightIcon = (
                        <ButtonIcon key="icon-right" side="end">
                            {item}
                        </ButtonIcon>
                    );
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
