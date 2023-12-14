import React from 'react';

import {SelectQa} from '../../components';
import {Button, ButtonProps} from '../../components/Button';
import type {SelectOption, SelectProps} from '../../components/Select/types';
import {TextInput, TextInputProps} from '../../components/controls';
import {cn} from '../../components/utils/cn';

import i18n from './i18n';

import './useSelectAllFilter.scss';

const b = cn('select-filter-with-all');

enum SelectedOptionStatus {
    all = 'all',
    nothing = 'nothing',
    part = 'part',
}

export type UseSelectAllFilterProps = Pick<
    SelectProps,
    'value' | 'options' | 'onUpdate' | 'filterPlaceholder'
> & {
    textInputProps?: TextInputProps;
    buttonProps?: ButtonProps;
    buttonPosition?: 'up' | 'down' | 'right' | 'left';
    containerClassname?: string;
    selectAllButtonContent?: React.ReactNode;
    deselectAllButtonContent?: React.ReactNode;
    selectPartButtonContent?: React.ReactNode;
};

export const useSelectAllFilter = ({
    value,
    options,
    onUpdate,
    filterPlaceholder,
    textInputProps = {hasClear: true},
    buttonProps,
    buttonPosition = 'right',
    containerClassname,
    selectAllButtonContent = i18n('label_select_all'),
    deselectAllButtonContent = i18n('label_remove_selection'),
    selectPartButtonContent = i18n('label_select_all'),
}: UseSelectAllFilterProps) => {
    const renderFunction = React.useCallback<Exclude<SelectProps['renderFilter'], undefined>>(
        ({onChange, value: filterValue, ref, style, onKeyDown}) => {
            if (!options) {
                return (
                    <TextInput
                        ref={ref}
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

            const optionsToSelect = options
                .filter((option): option is SelectOption => 'value' in option)
                .map((option) => option.value)
                .filter((optionValue) =>
                    optionValue.toLowerCase().includes(filterValue.toLowerCase()),
                );

            const selectedOptionsNumber = optionsToSelect.reduce(
                (prev, option) => prev + (value?.includes(option) ? 1 : 0),
                0,
            );

            const selectedOptionStatus: SelectedOptionStatus =
                selectedOptionsNumber === optionsToSelect.length
                    ? SelectedOptionStatus.all
                    : selectedOptionsNumber === 0
                    ? SelectedOptionStatus.nothing
                    : SelectedOptionStatus.part;

            const isLayoutReversed = buttonPosition === 'left' || buttonPosition === 'up';
            const isLayoutVertical = buttonPosition === 'up' || buttonPosition === 'down';

            let buttonContent: React.ReactNode;

            switch (selectedOptionStatus) {
                case SelectedOptionStatus.all: {
                    buttonContent = deselectAllButtonContent;
                    break;
                }
                case SelectedOptionStatus.nothing: {
                    buttonContent = selectAllButtonContent;
                    break;
                }
                case SelectedOptionStatus.part: {
                    buttonContent = selectPartButtonContent;
                    break;
                }
            }

            return (
                <div
                    style={style}
                    className={`${b({
                        'is-reversed': isLayoutReversed,
                        'is-vertical': isLayoutVertical,
                    })} ${containerClassname}`}
                >
                    <TextInput
                        ref={ref}
                        value={filterValue}
                        onKeyDown={onKeyDown}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder={filterPlaceholder}
                        {...textInputProps}
                    />
                    <Button
                        onClick={() => {
                            if (selectedOptionStatus === SelectedOptionStatus.all && value) {
                                // deselects elements
                                onUpdate?.(
                                    value?.filter((element) => !optionsToSelect.includes(element)),
                                );
                            } else {
                                if (value) {
                                    onUpdate?.([...new Set([...optionsToSelect, ...value])]);
                                } else {
                                    onUpdate?.(optionsToSelect);
                                }
                            }
                        }}
                        disabled={!optionsToSelect.length}
                        qa={SelectQa.SELECT_ALL}
                        {...buttonProps}
                    >
                        {buttonContent}
                    </Button>
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
            containerClassname,
            selectAllButtonContent,
            deselectAllButtonContent,
            selectPartButtonContent,
        ],
    );

    return {renderFilter: renderFunction};
};
