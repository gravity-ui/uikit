'use client';

import * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';
import {block} from '../utils/cn';
import {isIcon, isSvg} from '../utils/common';
import {eventBroker} from '../utils/event-broker';
import {getLinkRelWithFallback} from '../utils/getLinkRelWithFallback';
import {isOfType} from '../utils/isOfType';
import type {PolymorphicOverloadProps} from '../utils/polymorphic';
import {isPolymorphicComponentProps} from '../utils/polymorphic';

import {ButtonIcon, getIconSide} from './ButtonIcon';
import {ButtonIconSizeContext} from './ButtonIconSizeContext';
import {BUTTON_ICON_SIZE_MAP} from './constants';
import type {
    ButtonButtonProps,
    ButtonComponentProps,
    ButtonCustomElementType,
    ButtonLinkProps,
    ButtonProps,
} from './types';

import './Button.scss';

function isButtonComponentProps<T extends ButtonCustomElementType>(
    p: ButtonProps<T>,
): p is ButtonComponentProps<Exclude<T, undefined>> {
    return isPolymorphicComponentProps<ButtonProps<T>, ButtonComponentProps<Exclude<T, undefined>>>(
        p,
    );
}

const b = block('button');

const _Button = React.forwardRef(function Button<T extends ButtonCustomElementType>(
    rawProps: ButtonProps<T>,
    ref:
        | React.Ref<HTMLButtonElement>
        | React.Ref<HTMLAnchorElement>
        | React.Ref<T extends string ? React.ComponentRef<T> : T>,
) {
    const props = useDefaultProps('Button', rawProps);
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
        // service prop, must not be forwarded to the rendered element via `...rest`
        component: _component,
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
    const content = (
        <ButtonIconSizeContext.Provider value={BUTTON_ICON_SIZE_MAP[size]}>
            {prepareChildren(children)}
        </ButtonIconSizeContext.Provider>
    );

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
            content,
        );
    }

    if (typeof props.href !== 'undefined') {
        return (
            <a
                {...(rest as Pick<typeof props, keyof typeof rest>)}
                {...(extraProps as (typeof props)['extraProps'])}
                {...commonProps}
                ref={ref as React.Ref<HTMLAnchorElement>}
                rel={getLinkRelWithFallback(props)}
                aria-disabled={disabled ?? undefined}
            >
                {content}
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
            {content}
        </button>
    );
}) as <T extends ButtonCustomElementType, P extends ButtonProps<T>>(
    props: PolymorphicOverloadProps<
        T,
        P,
        ButtonComponentProps<Exclude<T, undefined>>,
        ButtonLinkProps,
        ButtonButtonProps
    >,
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
