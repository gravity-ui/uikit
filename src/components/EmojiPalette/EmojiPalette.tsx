import React from 'react';

import {useForkRef} from '../../hooks/useForkRef/useForkRef';
import type {ControlGroupProps, DOMProps, QAProps} from '../types';

import type {EmojiControlProps} from './EmojiControl';
import {EmojiControl} from './EmojiControl';
import {emojiPaletteClassNames} from './definitions';
import {useEmojiPaletteColumns} from './hooks';

import './EmojiPalette.scss';

export type EmojiValue = string | number;
export type EmojiOption = {
    value: EmojiValue;
    icon?: React.ReactNode;
    title?: string;
    disabled?: boolean;
};

export interface EmojiPaletteProps
    extends Pick<ControlGroupProps, 'aria-label' | 'aria-labelledby'>,
        Pick<EmojiControlProps, 'onFocus' | 'onBlur' | 'disabled' | 'size'>,
        DOMProps,
        QAProps {
    value?: EmojiValue[];
    defaultValue?: EmojiValue[];

    options?: EmojiOption[];
    columns?: number;
    optionClassName?: string;
    iconClassName?: string;

    onUpdate?: (value: EmojiValue[]) => void;
}

interface EmojiPaletteComponent
    extends React.ForwardRefExoticComponent<
        EmojiPaletteProps & React.RefAttributes<HTMLDivElement>
    > {}

export const EmojiPalette = React.forwardRef<HTMLDivElement, EmojiPaletteProps>(
    function EmojiPalette(props, ref) {
        const {
            size = 's',
            defaultValue,
            value,
            options = [],
            columns = 6,
            disabled,
            style,
            className,
            optionClassName,
            iconClassName,
            qa,

            onUpdate,
            onFocus,
            onBlur,
        } = props;

        const innerRef = React.useRef<HTMLDivElement>(null);
        const handleRef = useForkRef(ref, innerRef);

        const [valueState, setValueState] = React.useState(defaultValue);
        const isControlled = value !== undefined;
        const currentValue = isControlled ? value : valueState;

        const containerProps: React.ButtonHTMLAttributes<HTMLDivElement> = {
            role: 'group',
            'aria-disabled': disabled,
            'aria-label': props['aria-label'],
            'aria-labelledby': props['aria-labelledby'],
        };

        const onUpdateOptions = React.useCallback(
            (newValue: EmojiValue[]) => {
                if (!isControlled) {
                    setValueState(newValue);
                }

                if (onUpdate) {
                    onUpdate(newValue);
                }
            },
            [isControlled, onUpdate],
        );

        const finalStyles = useEmojiPaletteColumns(innerRef, style, columns);

        return (
            <div
                {...containerProps}
                ref={handleRef}
                className={emojiPaletteClassNames.palette({size}, className)}
                style={finalStyles}
                data-qa={qa}
            >
                {options.map((option) => (
                    <EmojiOptionItem
                        key={option.value}
                        value={currentValue}
                        option={option}
                        checked={currentValue?.includes(option.value) ?? false}
                        disabled={disabled}
                        size={size}
                        optionClassName={optionClassName}
                        iconClassName={iconClassName}
                        onUpdate={onUpdateOptions}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                ))}
            </div>
        );
    },
) as EmojiPaletteComponent;

EmojiPalette.displayName = 'EmojiPalette';

function EmojiOptionItem({
    value,
    option,
    checked,
    disabled,
    size,
    optionClassName,
    iconClassName,

    onUpdate,
    onFocus,
    onBlur,
}: {option: EmojiOption; checked: boolean} & Pick<
    EmojiPaletteProps,
    | 'value'
    | 'disabled'
    | 'size'
    | 'optionClassName'
    | 'iconClassName'
    | 'onUpdate'
    | 'onFocus'
    | 'onBlur'
>) {
    const onUpdateOption = React.useCallback(() => {
        if (!onUpdate) return;

        if (value) {
            const newValue = value.includes(option.value)
                ? value.filter((v) => v !== option.value)
                : [...value, option.value];

            onUpdate(newValue);
        } else {
            onUpdate([option.value]);
        }
    }, [onUpdate, option.value, value]);

    return (
        <EmojiControl
            className={emojiPaletteClassNames.option(optionClassName)}
            icon={getOptionIcon(option)}
            title={option.title}
            value={String(option.value)}
            disabled={disabled || option.disabled}
            iconClassName={iconClassName}
            size={size}
            checked={checked}
            onUpdate={onUpdateOption}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}

function getOptionIcon(option: EmojiOption): React.ReactNode {
    if (option.icon) return option.icon;
    return typeof option.value === 'string' ? option.value : String.fromCodePoint(option.value);
}
