import React from 'react';

import {SelectQa} from '../../..';
import {Button, ButtonProps} from '../../../Button';
import {TextInput, TextInputProps} from '../../../controls';
import {cn} from '../../../utils/cn';
import type {SelectOption, SelectProps} from '../../types';

import i18n from './i18n';

import './useSelectAllFilter.scss';

const b = cn('select-filter-with-all');

enum SelectedOptionStatus {
    All = 'all',
    Nothing = 'nothing',
    Part = 'part',
}

export type UseSelectAllFilterProps = Pick<
    SelectProps,
    'value' | 'options' | 'onUpdate' | 'filterPlaceholder'
> & {
    textInputProps?: TextInputProps;
    buttonProps?: ButtonProps;
    buttonPosition?: 'up' | 'down' | 'start' | 'end';
    containerClassName?: string;
    renderButton?: (props: SelecAllButtonProps) => React.ReactNode;
};

export const useSelectAllFilter = ({
    value,
    options,
    onUpdate,
    filterPlaceholder,
    textInputProps = {hasClear: true},
    buttonProps,
    buttonPosition = 'end',
    containerClassName,
    renderButton,
}: UseSelectAllFilterProps) => {
    const renderFunction = React.useCallback<Exclude<SelectProps['renderFilter'], undefined>>(
        ({onChange, value: filterValue, ref, style, onKeyDown}) => {
            if (!options) {
                return (
                    <TextInput
                        controlRef={ref}
                        value={filterValue}
                        style={style}
                        className={b('no-options')}
                        onKeyDown={onKeyDown}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder={filterPlaceholder}
                        {...textInputProps}
                    />
                );
            }

            const filteredOptions = options
                .filter((option): option is SelectOption => 'value' in option)
                .map((option) => option.value)
                .filter((optionValue) =>
                    optionValue.toLowerCase().includes(filterValue.toLowerCase()),
                );

            const selectedOptionsNumber = filteredOptions.reduce(
                (prev, option) => prev + (value?.includes(option) ? 1 : 0),
                0,
            );

            let selectedOptionStatus: SelectedOptionStatus;

            switch (selectedOptionsNumber) {
                case filteredOptions.length: {
                    selectedOptionStatus = SelectedOptionStatus.All;
                    break;
                }
                case 0: {
                    selectedOptionStatus = SelectedOptionStatus.Nothing;
                    break;
                }
                default: {
                    selectedOptionStatus = SelectedOptionStatus.Part;
                }
            }

            const isLayoutReversed = buttonPosition === 'start' || buttonPosition === 'up';
            const isLayoutVertical = buttonPosition === 'up' || buttonPosition === 'down';

            return (
                <div
                    style={style}
                    className={`${b({
                        'is-reversed': isLayoutReversed,
                        'is-vertical': isLayoutVertical,
                    })} ${containerClassName}`}
                >
                    <TextInput
                        controlRef={ref}
                        value={filterValue}
                        onKeyDown={onKeyDown}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder={filterPlaceholder}
                        {...textInputProps}
                    />
                    {renderButton ? (
                        renderButton({
                            selectedOptionStatus,
                            value,
                            onUpdate,
                            buttonProps,
                            filteredOptions,
                        })
                    ) : (
                        <DefaultButton
                            selectedOptionStatus={selectedOptionStatus}
                            value={value}
                            onUpdate={onUpdate}
                            buttonProps={buttonProps}
                            filteredOptions={filteredOptions}
                        />
                    )}
                </div>
            );
        },
        [
            value,
            options,
            onUpdate,
            filterPlaceholder,
            textInputProps,
            buttonProps,
            buttonPosition,
            containerClassName,
            renderButton,
        ],
    );

    return {renderFilter: renderFunction};
};

export type SelecAllButtonProps = {
    selectedOptionStatus: SelectedOptionStatus;
    value: SelectProps['value'];
    onUpdate: SelectProps['onUpdate'];
    buttonProps?: ButtonProps;
    filteredOptions: string[];
};

const DefaultButton = ({
    selectedOptionStatus,
    value,
    onUpdate,
    buttonProps,
    filteredOptions,
}: SelecAllButtonProps) => {
    let buttonContent: string;

    switch (selectedOptionStatus) {
        case SelectedOptionStatus.All: {
            buttonContent = i18n('label_remove_selection');
            break;
        }
        case SelectedOptionStatus.Nothing: {
            buttonContent = i18n('label_select_all');
            break;
        }
        case SelectedOptionStatus.Part: {
            buttonContent = i18n('label_select_all');
            break;
        }
    }

    return (
        <Button
            onClick={() => {
                if (selectedOptionStatus === SelectedOptionStatus.All && value) {
                    // deselects elements
                    onUpdate?.(value?.filter((element) => !filteredOptions.includes(element)));
                } else if (value) {
                    onUpdate?.([...new Set([...filteredOptions, ...value])]);
                } else {
                    onUpdate?.(filteredOptions);
                }
            }}
            disabled={!filteredOptions.length}
            qa={SelectQa.SELECT_ALL}
            {...buttonProps}
        >
            {buttonContent}
        </Button>
    );
};
