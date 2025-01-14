import * as React from 'react';

import {Button} from '../../Button';
import {TextInput} from '../../controls';
import {Select, getSelectFilteredOptions, isSelectGroupTitle, useSelectOptions} from '../index';
import type {SelectOption, SelectProps} from '../index';

const title = 'Select example with useSelectOptions hook';

export const UseSelectOptionsShowcase = () => {
    const [value, setValue] = React.useState<string[]>([]);
    const [filter, setFilter] = React.useState('');
    const filterable = true;
    const options = useSelectOptions({
        options: [
            {
                label: 'Group 1',
                options: [
                    {value: 'val1', content: 'Value 1'},
                    {value: 'val2', content: 'Value 2'},
                    {value: 'val3', content: 'Value 3'},
                    {value: 'val4', content: 'Value 4'},
                ],
            },
            {
                label: 'Group 2',
                options: [
                    {value: 'val5', content: 'Value 5'},
                    {value: 'val6', content: 'Value 6'},
                    {value: 'val7', content: 'Value 7'},
                    {value: 'val8', content: 'Value 8'},
                ],
            },
        ],
        filter,
        filterable,
    });
    const filteredOptions = getSelectFilteredOptions(options);

    const renderFilter: SelectProps['renderFilter'] = ({
        value: filterValue,
        ref,
        onChange,
        onKeyDown,
    }) => {
        const optionsWithoutGroupLabels = options.filter(
            (option) => !isSelectGroupTitle(option),
        ) as SelectOption[];
        const filteredOptionsWithoutGroupLabels = filteredOptions.filter(
            (option) => !isSelectGroupTitle(option),
        ) as SelectOption[];
        const allOptionsSelected = Boolean(
            value.length && optionsWithoutGroupLabels.length === value.length,
        );
        const allVisibleOptionsSelected = Boolean(
            value.length &&
                filteredOptionsWithoutGroupLabels
                    .map((o) => o.value)
                    .every((o) => value.includes(o)),
        );

        const handleAllOptionsButtonClick = () => {
            const nextValue = allOptionsSelected
                ? []
                : optionsWithoutGroupLabels.map((option) => option.value);
            setValue(nextValue);
        };

        const handleAllVisibleOptionsButtonClick = () => {
            const filteredValue = filteredOptionsWithoutGroupLabels.map((o) => o.value);
            const nextValue = allVisibleOptionsSelected
                ? value.filter((v) => !filteredValue.includes(v))
                : filteredOptionsWithoutGroupLabels.map((o) => o.value);
            setValue(nextValue);
        };

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 4,
                    padding: '4px 4px 0 4px',
                }}
            >
                <TextInput
                    controlRef={ref}
                    controlProps={{size: 1}}
                    value={filterValue}
                    onUpdate={onChange}
                    onKeyDown={onKeyDown}
                />
                <Button
                    disabled={!filteredOptionsWithoutGroupLabels.length}
                    onClick={handleAllVisibleOptionsButtonClick}
                >
                    {allVisibleOptionsSelected ? 'Deselect all visible' : 'Select all visible'}
                </Button>
                <Button onClick={handleAllOptionsButtonClick}>
                    {allOptionsSelected ? 'Deselect all' : 'Select all'}
                </Button>
            </div>
        );
    };

    return (
        <Select
            value={value}
            options={options}
            filterable={filterable}
            multiple={true}
            renderFilter={renderFilter}
            onFilterChange={setFilter}
            onUpdate={setValue}
            title={title}
        />
    );
};
