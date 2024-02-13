import React from 'react';

import {useControlledState} from '../../hooks/useControlledState/useControlledState';
import {useForkRef} from '../../hooks/useForkRef/useForkRef';
import type {ControlGroupProps, DOMProps, QAProps} from '../types';

import type {PaletteControlProps} from './PaletteControl';
import {PaletteControl} from './PaletteControl';
import {paletteClassNames} from './definitions';

import './Palette.scss';

export type PaletteValue = string | number;
export type PaletteOption = {
    value: PaletteValue;
    content?: React.ReactNode;
    title?: string; // HTML title
    disabled?: boolean;
};

export interface PaletteProps
    extends Pick<ControlGroupProps, 'aria-label' | 'aria-labelledby'>,
        Pick<PaletteControlProps, 'onFocus' | 'onBlur' | 'disabled' | 'size'>,
        DOMProps,
        QAProps {
    value?: PaletteValue[];
    defaultValue?: PaletteValue[];
    options?: PaletteOption[];
    columns?: number;
    rowClassName?: string;
    optionClassName?: string;
    iconClassName?: string;
    onUpdate?: (value: PaletteValue[]) => void;
}

interface PaletteComponent
    extends React.ForwardRefExoticComponent<PaletteProps & React.RefAttributes<HTMLDivElement>> {}

export const Palette = React.forwardRef<HTMLDivElement, PaletteProps>(function Palette(props, ref) {
    const {
        size = 's',
        defaultValue,
        value,
        options = [],
        columns = 6,
        disabled,
        style,
        className,
        rowClassName,
        optionClassName,
        iconClassName,
        qa,
        onUpdate,
        onFocus,
        onBlur,
    } = props;

    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState<number | undefined>(
        undefined,
    );
    const focusedRow =
        focusedOptionIndex === undefined ? undefined : Math.floor(focusedOptionIndex / columns);
    const focusedColumn =
        focusedOptionIndex === undefined ? undefined : focusedOptionIndex % columns;

    const innerRef = React.useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(ref, innerRef);

    const [currentValue, setCurrentValue] = useControlledState(value, defaultValue ?? [], onUpdate);

    const containerProps: React.ButtonHTMLAttributes<HTMLDivElement> = {
        'aria-disabled': disabled,
        'aria-label': props['aria-label'],
        'aria-labelledby': props['aria-labelledby'],
    };

    const rows = React.useMemo(() => getRows(options, columns), [columns, options]);

    const focusOnOptionWithIndex = React.useCallback((index: number) => {
        if (!innerRef.current) return;

        const $options: HTMLButtonElement[] = Array.from(
            innerRef.current.querySelectorAll(`.${paletteClassNames.option()}`),
        );

        $options[index].focus();

        setFocusedOptionIndex(index);
    }, []);

    const onKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (
                focusedOptionIndex === undefined ||
                focusedRow === undefined ||
                focusedColumn === undefined
            ) {
                return;
            }

            let newIndex = focusedOptionIndex;

            if (event.code === 'ArrowUp') {
                event.preventDefault();
                newIndex = focusedOptionIndex - columns;
            } else if (event.code === 'ArrowRight') {
                event.preventDefault();
                newIndex = focusedOptionIndex + 1;
            } else if (event.code === 'ArrowDown') {
                event.preventDefault();
                newIndex = focusedOptionIndex + columns;
            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();
                newIndex = focusedOptionIndex - 1;
            }

            if (newIndex === focusedOptionIndex || newIndex < 0 || newIndex >= options.length) {
                return;
            }

            focusOnOptionWithIndex(newIndex);
        },
        [
            focusedOptionIndex,
            focusedRow,
            focusedColumn,
            options.length,
            focusOnOptionWithIndex,
            columns,
        ],
    );

    React.useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    const onFocusGrid = React.useCallback(() => {
        focusOnOptionWithIndex(0);
    }, [focusOnOptionWithIndex]);

    const onBlurGrid = React.useCallback(() => {
        setFocusedOptionIndex(undefined);
    }, []);

    const onFocusOption = React.useCallback(
        (event: React.FocusEvent<HTMLButtonElement>) => {
            const newIndex = options.findIndex((option) => option.value === event.target.value);
            if (newIndex >= 0) {
                focusOnOptionWithIndex(newIndex);
            }

            onFocus?.(event);
            event.stopPropagation();
        },
        [options, focusOnOptionWithIndex, onFocus],
    );

    const onBlurOption = React.useCallback(
        (event: React.FocusEvent<HTMLButtonElement>) => {
            onBlur?.(event);
            setFocusedOptionIndex(undefined);
            event.stopPropagation();
        },
        [onBlur],
    );

    return (
        <div
            {...containerProps}
            role={'grid'}
            ref={handleRef}
            className={paletteClassNames.palette({size}, className)}
            onFocus={focusedOptionIndex === undefined ? onFocusGrid : undefined}
            onBlur={onBlurGrid}
            style={style}
            data-qa={qa}
            tabIndex={focusedOptionIndex === undefined ? 0 : -1}
        >
            {rows.map((row, rowNumber) => (
                <div
                    className={paletteClassNames.row(rowClassName)}
                    key={`row-${rowNumber}`}
                    role={'row'}
                >
                    {row.map((option) => (
                        <PaletteOptionItem
                            key={option.value}
                            value={currentValue}
                            option={option}
                            checked={currentValue?.includes(option.value) ?? false}
                            disabled={disabled}
                            size={size}
                            optionClassName={optionClassName}
                            iconClassName={iconClassName}
                            onUpdate={setCurrentValue}
                            onFocus={onFocusOption}
                            onBlur={onBlurOption}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}) as PaletteComponent;

Palette.displayName = 'Palette';

function getRows(options: PaletteOption[], columns: number): PaletteOption[][] {
    const rows: PaletteOption[][] = [];
    let row: PaletteOption[] = [];

    let column = 0;
    for (const option of options) {
        row.push(option);
        column += 1;
        if (column === columns) {
            rows.push(row);
            row = [];
            column = 0;
        }
    }

    if (row.length > 0) {
        rows.push(row);
    }

    return rows;
}

function PaletteOptionItem({
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
}: {option: PaletteOption; checked: boolean} & Pick<
    PaletteProps,
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
        <PaletteControl
            className={paletteClassNames.option(optionClassName)}
            content={getOptionIcon(option)}
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

function getOptionIcon(option: PaletteOption): React.ReactNode {
    if (option.content) return option.content;
    return typeof option.value === 'string' ? option.value : String.fromCodePoint(option.value);
}
