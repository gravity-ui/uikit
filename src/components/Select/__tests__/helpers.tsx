import React from 'react';

import {Select} from '../Select';
import {useSelectOptions} from '../hooks-public';
import type {SelectProps} from '../types';

import {getSelectOptionTestQA} from './constants';

export const TestSelectWithFilter = (props: Partial<SelectProps<string>>) => {
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

    return (
        <Select
            value={value}
            options={options}
            filterable={filterable}
            multiple={true}
            onFilterChange={setFilter}
            onUpdate={setValue}
            {...props}
        >
            <Select.Option value="val1" content="Value1" qa={getSelectOptionTestQA('val1')} />
            <Select.Option value="val2" content="Value2" qa={getSelectOptionTestQA('val2')} />
            <Select.Option value="val3" content="Value3" qa={getSelectOptionTestQA('val3')} />
            <Select.Option
                value="val4"
                content="Value4"
                qa={getSelectOptionTestQA('val4')}
                disabled
            />
            <Select.OptionGroup label="Group 1">
                <Select.Option value="val5" content="Value5" qa={getSelectOptionTestQA('val5')} />
                <Select.Option
                    value="val6"
                    content="Value6"
                    qa={getSelectOptionTestQA('val6')}
                    disabled
                />
            </Select.OptionGroup>
        </Select>
    );
};
