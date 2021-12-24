import React from 'react';
import {Story} from '@storybook/react';
import _cloneDeep from 'lodash/cloneDeep';
import {Table, TableProps} from '../Table';
import {columns as defaultColumns} from './utils';

const oneColumn = _cloneDeep(defaultColumns);
oneColumn[1].width = '100%';

const twoColumns = _cloneDeep(defaultColumns);
twoColumns[1].width = '50%';
twoColumns[2].width = '50%';

const threeColumns = _cloneDeep(defaultColumns);
threeColumns[0].width = '33%';
threeColumns[1].width = '33%';
threeColumns[2].width = '33%';

export const Adaptive: Story<TableProps<any>> = (args) => {
    const data = args.data.slice(0, 2);
    return (
        <div>
            <Table {...args} data={data} columns={oneColumn} />
            <Table {...args} data={data} columns={twoColumns} />
            <Table {...args} data={data} columns={threeColumns} />
        </div>
    );
};
