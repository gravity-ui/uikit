'use client';

import * as React from 'react';

import type {DOMProps, QAProps} from '../types';
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

interface ButtonCommonProps extends QAProps, DOMProps {
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
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'style'> {
    component?: never;
    href?: never;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonLinkProps
    extends ButtonCommonProps,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> {
    component?: never;
    href: string;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export type ButtonComponentProps<T extends Exclude<ButtonCustomElementType, undefined>> =
    ButtonCommonProps &
        React.ComponentPropsWithoutRef<T> & {
            component: T;
            /**
             * @deprecated Use additional props at the root
             */
            extraProps?: React.ComponentPropsWithoutRef<T>;
        };

function isButtonComponentProps<T extends ButtonCustomElementType>(
    p: ButtonProps<T>,
): p is ButtonComponentProps<Exclude<T, undefined>> {
    return p.component !== undefined;
}

export type ButtonCustomElementType = Exclude<React.ElementType, 'a' | 'button'> | undefined;

export type ButtonProps<T extends ButtonCustomElementType = undefined> =
    | ButtonLinkProps
    | ButtonButtonProps
    | ButtonComponentProps<Exclude<T, undefined>>;

const b = block('button');

const _Button = React.forwardRef(function Button<T extends ButtonCustomElementType>(
    props: ButtonProps<T>,
    ref:
        | React.Ref<HTMLButtonElement>
        | React.Ref<HTMLAnchorElement>
        | React.Ref<T extends string ? React.ComponentRef<T> : T>,
) {
    const {
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
        onClickCapture,
        ...rest
    } = props;

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

            if (onClickCapture) {
                onClickCapture(event);
            }
        },
        [view, onClickCapture],
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
            rest.className,
        ),
        'data-qa': qa,
        // Always set a tabIndex so that Safari allows focusing native buttons
        tabIndex: rest.tabIndex ?? extraProps?.tabIndex ?? (disabled ? undefined : 0),
    };

    if (isButtonComponentProps(props)) {
        return React.createElement(
            props.component,
            {
                role: 'button',
                ...rest,
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
                {...(rest as Pick<typeof props, keyof typeof rest>)}
                {...(extraProps as (typeof props)['extraProps'])}
                {...commonProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                rel={props.target === '_blank' && !rest.rel ? 'noopener noreferrer' : rest.rel}
                aria-disabled={disabled ?? undefined}
            >
                {prepareChildren(children)}
            </a>
        );
    }

    return (
        <button
            {...(rest as Pick<typeof props, keyof typeof rest>)}
            {...(extraProps as (typeof props)['extraProps'])}
            {...commonProps}
            ref={ref as React.Ref<HTMLButtonElement>}
            type={props.type || 'button'}
            disabled={disabled || loading}
            aria-pressed={selected}
        >
            {prepareChildren(children)}
        </button>
    );
}) as <T extends ButtonCustomElementType, P extends ButtonProps<T>>(
    props: P extends {component: Exclude<T, undefined>}
        ? ButtonComponentProps<Exclude<T, undefined>> & {
              ref?: React.Ref<T extends string ? React.ComponentRef<T> : T>;
          }
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
