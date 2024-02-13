import React from 'react';

import type {ButtonSize} from '../Button';
import {Button} from '../Button';
import type {ControlProps, DOMProps, QAProps} from '../types';

export interface PaletteControlProps extends Pick<ControlProps, 'disabled'>, DOMProps, QAProps {
    content: React.ReactNode;
    value?: string;
    size?: ButtonSize;
    title?: string;
    iconClassName?: string;
    checked?: boolean;
    focused?: boolean;

    onUpdate?: (updated: boolean) => void;
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

export const PaletteControl = React.forwardRef<HTMLButtonElement, PaletteControlProps>(
    function PaletteControl(props, ref) {
        const {
            value,
            size = 's',
            disabled = false,
            title,
            content,
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
            () => ({value, role: 'checkbox', 'aria-checked': checked ? 'true' : 'false'}),
            [value, checked],
        );

        const onClick = React.useCallback(() => onUpdate?.(!checked), [checked, onUpdate]);

        return (
            <Button
                className={className}
                tabIndex={-1}
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
                <Button.Icon className={iconClassName}>{content}</Button.Icon>
            </Button>
        );
    },
);

PaletteControl.displayName = 'PaletteControl';
