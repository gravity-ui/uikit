import React from 'react';

import {Button} from '../../../Button';
import {TextInput} from '../../../controls';
import {cn} from '../../../utils/cn';
import type {SelectOption, SelectProps} from '../../types';

import './useSelectAllFilter.scss';

export const SELECT_ALL_QA = 'select-all-test-qa';

const b = cn('select-filter-with-all');

export type UseSelectAllFilterProps = Pick<
    SelectProps,
    'value' | 'options' | 'onUpdate' | 'filterPlaceholder'
> & {
    hasClear?: boolean;
    autoFocus?: boolean;
};

export const useSelectAllFilter = ({
    value,
    options,
    onUpdate,
    filterPlaceholder,
    hasClear,
    autoFocus,
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
                    />
                );
            }

            const optionsToSelect = options
                .filter((option): option is SelectOption => 'value' in option)
                .map((option) => option.value)
                .filter((optionValue) =>
                    optionValue.toLowerCase().includes(filterValue.toLowerCase()),
                );

            const areAllOptionsSelected = optionsToSelect.reduce(
                (prev, option) => prev && !!value?.includes(option),
                true,
            );

            return (
                <div style={style} className={b()}>
                    <TextInput
                        ref={ref}
                        value={filterValue}
                        onKeyDown={onKeyDown}
                        onChange={(event) => onChange(event.target.value)}
                        hasClear={hasClear}
                        autoFocus={autoFocus}
                        placeholder={filterPlaceholder}
                    />
                    <Button
                        onClick={() => {
                            if (areAllOptionsSelected && value) {
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
                        qa={SELECT_ALL_QA}
                    >
                        {!!optionsToSelect.length && areAllOptionsSelected
                            ? 'Remove selection'
                            : 'Select all'}
                    </Button>
                </div>
            );
        },
        [options, onUpdate, value],
    );

    return renderFunction;
};
