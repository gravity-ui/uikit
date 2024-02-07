import React from 'react';

import type {ButtonSize} from '../Button';
import {Button} from '../Button';
import type {ControlProps, DOMProps, QAProps} from '../types';

export interface EmojiControlProps extends Pick<ControlProps, 'disabled'>, DOMProps, QAProps {
    icon: React.ReactNode;
    value?: string;
    size?: ButtonSize;
    title?: string;
    iconClassName?: string;
    checked?: boolean;

    onUpdate?: (updated: boolean) => void;
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

export const EmojiControl = React.forwardRef<HTMLButtonElement, EmojiControlProps>(
    function EmojiControl(props, ref) {
        const {
            value,
            size = 's',
            disabled = false,
            title,
            icon,
            style,
            className,
            iconClassName,
            qa,
            checked,

            onUpdate,
            onFocus,
            onBlur,
        } = props;

        const extraProps: React.ButtonHTMLAttributes<HTMLButtonElement> = React.useMemo(
            () => ({value}),
            [value],
        );

        const onClick = React.useCallback(() => onUpdate?.(!checked), [checked, onUpdate]);

        return (
            <Button
                className={className}
                style={style}
                disabled={disabled}
                title={title}
                ref={ref}
                qa={qa}
                view={checked ? 'normal' : 'flat'}
                selected={checked}
                extraProps={extraProps}
                size={size}
                onClick={onClick}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <Button.Icon className={iconClassName}>{icon}</Button.Icon>
            </Button>
        );
    },
);

EmojiControl.displayName = 'EmojiControl';
