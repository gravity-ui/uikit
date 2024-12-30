'use client';

import * as React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';
import {isIcon, isSvg} from '../utils/common';
import {eventBroker} from '../utils/event-broker';
import {isOfType} from '../utils/isOfType';

import {ButtonIcon, getIconSide} from './ButtonIcon';
import type {BUTTON_VIEWS} from './constants';

import './Button.scss';

export type ButtonView = (typeof BUTTON_VIEWS)[number];

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

interface ButtonCommonProps extends QAProps {
    view?: ButtonView;
    size?: ButtonSize;
    pin?: ButtonPin;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    width?: ButtonWidth;
    children?: React.ReactNode;
}

export interface ButtonButtonProps
    extends ButtonCommonProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
    component?: never;
    href?: never;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonLinkProps
    extends ButtonCommonProps,
        React.AnchorHTMLAttributes<HTMLAnchorElement> {
    component?: never;
    href: string;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export type ButtonComponentProps<T extends React.ElementType = 'button'> = ButtonCommonProps &
    React.ComponentPropsWithoutRef<T> & {
        component: T;
        /**
         * @deprecated Use additional props at the root
         */
        extraProps?: React.ComponentPropsWithoutRef<T>;
    };

export type ButtonProps<T extends React.ElementType = 'button'> =
    | ButtonLinkProps
    | ButtonButtonProps
    | ButtonComponentProps<T>;

const b = block('button');

const _Button = React.forwardRef(function Button(
    {
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        selected,
        disabled = false,
        loading = false,
        width,
        children,
        extraProps,
        qa,
        ...props
    }: ButtonProps,
    ref,
) {
    const handleClickCapture = React.useCallback(
        (event: React.MouseEvent<any>) => {
            eventBroker.publish({
                componentId: 'Button',
                eventId: 'click',
                domEvent: event,
                meta: {
                    content: event.currentTarget.textContent,
                    view: view,
                },
            });

            if (props.onClickCapture) {
                props.onClickCapture(event);
            }
        },
        [view, props.onClickCapture],
    );

    const commonProps = {
        onClickCapture: handleClickCapture,
        className: b(
            {
                view: view,
                size: size,
                pin: pin,
                selected: selected,
                disabled: disabled || loading,
                loading: loading,
                width: width,
            },
            props.className,
        ),
        'data-qa': qa,
    };

    if (props.component) {
        return React.createElement(
            props.component,
            {
                ...props,
                ...extraProps,
                ...commonProps,
                ref: ref,
                'aria-disabled': disabled ?? undefined,
            },
            prepareChildren(children),
        );
    }

    if (typeof props.href !== 'undefined') {
        return (
            <a
                {...props}
                {...(extraProps as ButtonLinkProps['extraProps'])}
                {...commonProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                rel={props.target === '_blank' && !props.rel ? 'noopener noreferrer' : props.rel}
                aria-disabled={disabled ?? undefined}
            >
                {prepareChildren(children)}
            </a>
        );
    }

    return (
        <button
            {...props}
            {...(extraProps as ButtonButtonProps['extraProps'])}
            {...commonProps}
            ref={ref as React.Ref<HTMLButtonElement>}
            type={props.type || 'button'}
            disabled={disabled || loading}
            aria-pressed={selected}
        >
            {prepareChildren(children)}
        </button>
    );
}) as <T extends React.ElementType, P extends ButtonProps<T>>(
    props: P extends {component: T}
        ? ButtonComponentProps<T> & {ref?: any} // TODO: Add ref inference
        : P extends {href: string}
          ? ButtonLinkProps & {ref?: React.Ref<HTMLAnchorElement>}
          : ButtonButtonProps & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement;

export const Button = Object.assign(_Button, {Icon: ButtonIcon});

const isButtonIconComponent = isOfType(ButtonIcon);
const isSpan = isOfType<{className?: string}>('span');
const buttonIconClassRe = RegExp(`^${b('icon')}($|\\s+\\w)`);

function prepareChildren(children: React.ReactNode) {
    const items = React.Children.toArray(children);

    if (items.length === 1) {
        const onlyItem = items[0];
        const isButtonIconElement =
            isButtonIconComponent(onlyItem) ||
            (isSpan(onlyItem) && buttonIconClassRe.test(onlyItem.props.className || ''));

        if (isButtonIconElement) {
            return onlyItem;
        } else if (isIcon(onlyItem) || isSvg(onlyItem)) {
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
            const isIconElement = isIcon(item) || isSvg(item);
            const isButtonIconElement = isButtonIconComponent(item);
            const isRenderedButtonIconElement =
                isSpan(item) && buttonIconClassRe.test(item.props.className || '');

            if (isIconElement || isButtonIconElement || isRenderedButtonIconElement) {
                if (!startIcon && content.length === 0) {
                    const key = 'icon-start';
                    const side = 'start';
                    if (isIconElement) {
                        startIcon = (
                            <Button.Icon key={key} side={side}>
                                {item}
                            </Button.Icon>
                        );
                    } else if (isButtonIconElement) {
                        startIcon = React.cloneElement(item, {
                            side,
                        });
                    } else {
                        startIcon = React.cloneElement(item, {
                            className: b('icon', {side: getIconSide(side)}, item.props.className),
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
                    } else if (isButtonIconElement) {
                        endIcon = React.cloneElement(item, {
                            side,
                        });
                    } else {
                        endIcon = React.cloneElement(item, {
                            className: b('icon', {side: getIconSide(side)}, item.props.className),
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
