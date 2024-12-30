'use client';

import * as React from 'react';

import {useSelect} from '../../hooks';
import {useForkRef} from '../../hooks/useForkRef/useForkRef';
import type {ButtonProps} from '../Button';
import {Button} from '../Button';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {usePaletteGrid} from './hooks';
import {getPaletteRows} from './utils';

import './Palette.scss';

const b = block('palette');

export type PaletteOption = Pick<ButtonProps, 'disabled' | 'title'> & {
    /**
     * Option value, which you can use in state or send to back-end and so on.
     */
    value: string;
    /**
     * Content inside the option (emoji/image/GIF/symbol etc).
     *
     * Uses `value` as default, if `value` is a number, then it is treated as a unicode symbol (emoji for example).
     *
     * @default props.value
     */
    content?: React.ReactNode;
};

export interface PaletteProps
    extends AriaLabelingProps,
        Pick<ButtonProps, 'disabled' | 'size'>,
        DOMProps,
        QAProps {
    /**
     * Allows selecting multiple options.
     *
     * @default true
     */
    multiple?: boolean;
    /**
     * Current value (which options are selected).
     */
    value?: string[];
    /**
     * The control's default value. Use when the component is not controlled.
     */
    defaultValue?: string[];
    /**
     * List of Palette options (the grid).
     */
    options?: PaletteOption[];
    /**
     * How many options are there per row.
     *
     * @default 6
     */
    columns?: number;
    /**
     * HTML class attribute for a grid row.
     */
    rowClassName?: string;
    /**
     * HTML class attribute for a grid option.
     */
    optionClassName?: string;
    /**
     * Fires when a user (un)selects an option.
     */
    onUpdate?: (value: string[]) => void;
    /**
     * Fires when a user focuses on the Palette.
     */
    onFocus?: (event: React.FocusEvent) => void;
    /**
     * Fires when a user blurs from the Palette.
     */
    onBlur?: (event: React.FocusEvent) => void;
}

interface PaletteComponent
    extends React.ForwardRefExoticComponent<PaletteProps & React.RefAttributes<HTMLDivElement>> {}

export const Palette = React.forwardRef<HTMLDivElement, PaletteProps>(function Palette(props, ref) {
    const {
        size = 'm',
        multiple = true,
        options = [],
        columns = 6,
        disabled,
        style,
        className,
        rowClassName,
        optionClassName,
        qa,
        onFocus,
        onBlur,
    } = props;

    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState<number | undefined>(
        undefined,
    );
    const focusedOption =
        focusedOptionIndex === undefined ? undefined : options[focusedOptionIndex];

    const innerRef = React.useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(ref, innerRef);

    const {value, handleSelection} = useSelect({
        value: props.value,
        defaultValue: props.defaultValue,
        multiple,
        onUpdate: props.onUpdate,
    });

    const rows = React.useMemo(() => getPaletteRows(options, columns), [columns, options]);

    const focusOnOptionWithIndex = React.useCallback((index: number) => {
        if (!innerRef.current) return;

        const $options = Array.from(
            innerRef.current.querySelectorAll(`.${b('option')}`),
        ) as HTMLButtonElement[];

        if (!$options[index]) return;

        $options[index].focus();

        setFocusedOptionIndex(index);
    }, []);

    const tryToFocus = (newIndex: number) => {
        if (newIndex === focusedOptionIndex || newIndex < 0 || newIndex >= options.length) {
            return;
        }

        focusOnOptionWithIndex(newIndex);
    };

    const gridProps = usePaletteGrid({
        disabled,
        onFocus: (event) => {
            focusOnOptionWithIndex(0);
            onFocus?.(event);
        },
        onBlur: (event) => {
            setFocusedOptionIndex(undefined);
            onBlur?.(event);
        },
        whenFocused:
            focusedOptionIndex !== undefined && focusedOption
                ? {
                      selectItem: () => handleSelection(focusedOption),
                      nextItem: () => tryToFocus(focusedOptionIndex + 1),
                      previousItem: () => tryToFocus(focusedOptionIndex - 1),
                      nextRow: () => tryToFocus(focusedOptionIndex + columns),
                      previousRow: () => tryToFocus(focusedOptionIndex - columns),
                  }
                : undefined,
    });

    return (
        <div
            {...filterDOMProps(props, {labelable: true})}
            {...gridProps}
            ref={handleRef}
            className={b({size}, className)}
            style={style}
            data-qa={qa}
        >
            {rows.map((row, rowNumber) => (
                <div className={b('row', rowClassName)} key={`row-${rowNumber}`} role="row">
                    {row.map((option) => {
                        const isSelected = Boolean(value.includes(option.value));
                        const focused = option === focusedOption;

                        return (
                            <div
                                key={option.value}
                                role="gridcell"
                                aria-selected={focused ? 'true' : undefined}
                                aria-readonly={option.disabled}
                            >
                                <Button
                                    className={b('option', optionClassName)}
                                    tabIndex={-1}
                                    style={style}
                                    disabled={disabled || option.disabled}
                                    title={option.title}
                                    view={isSelected ? 'normal' : 'flat'}
                                    selected={isSelected}
                                    value={option.value}
                                    size={size}
                                    onClick={() => handleSelection(option)}
                                >
                                    <Button.Icon>{option.content ?? option.value}</Button.Icon>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}) as PaletteComponent;

Palette.displayName = 'Palette';
