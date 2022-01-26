import React from 'react';
import {range} from 'lodash';
import {block} from '../../utils/cn';
import {Select, SelectProps, SelectOption, SelectOptgroup} from '../';

import './SelectShowcase.scss';

const b = block('select-showcase');

const generateItems = (count: number): SelectOption[] => {
    return range(0, count).map((i) => ({
        value: `val${i + 1}`,
        label: `Value ${i + 1}`,
    }));
};

const OPTIONS_1: (SelectOption | SelectOptgroup)[] = [
    {
        label: 'Group 1',
        options: [
            {value: 'val1', label: 'Value 1'},
            {value: 'val2', label: 'Vaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalue 2'},
        ],
    },
    {
        label: 'Group 2',
        options: [
            {value: 'val3', label: 'Value 3'},
            {value: 'val4', label: 'Value 4'},
            {value: 'val5', label: 'Value 5'},
        ],
    },
    {
        label: 'Group 3',
        options: [
            {value: 'val6', label: 'Value 6'},
            {value: 'val7', label: 'Value 7'},
            {value: 'val8', label: 'Value 8'},
        ],
    },
];
const VALUE_1 = ['val2'];

const OPTIONS_2: (SelectOption<{color: string}> | SelectOptgroup<{color: string}>)[] = [
    {value: 'val1', label: 'Value 1', color: 'green'},
    {value: 'val2', label: 'Value 2', color: 'red'},
    {value: 'val3', label: 'Value 3', color: 'yellow'},
];
const VALUE_2 = ['val2'];

const OPTIONS_3 = generateItems(49);
const VALUE_3 = ['val10'];

const OPTIONS_4 = generateItems(100);
const VALUE_4 = ['val10'];

export const SelectShowcase = (props: SelectProps) => {
    const renderOption2 = (option: SelectOption<{color: string}>) => {
        return (
            <div style={{color: option.color, height: 22, lineHeight: '22px'}}>{option.label}</div>
        );
    };
    return (
        <div className={b()}>
            <span>Select with groups</span>
            <Select {...props} className={b('select')} value={VALUE_1} options={OPTIONS_1} />
            <span>Select with custom items</span>
            <Select
                {...props}
                className={b('select')}
                value={VALUE_2}
                options={OPTIONS_2}
                renderOption={renderOption2}
                getOptionHeight={() => 22}
            />
            <span>Regular select</span>
            <Select {...props} className={b('select')} value={VALUE_3} options={OPTIONS_3} />
            <span>Select with virtualize</span>
            <Select {...props} className={b('select')} value={VALUE_4} options={OPTIONS_4} />
        </div>
    );
};
