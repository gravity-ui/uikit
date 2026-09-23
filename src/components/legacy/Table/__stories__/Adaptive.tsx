import type {StoryFn} from '@storybook/react-webpack5';
import cloneDeep from 'lodash/cloneDeep';

import {Table} from '../Table';
import type {TableProps} from '../Table';

import {columns as defaultColumns} from './utils';

const oneColumn = cloneDeep(defaultColumns);
oneColumn[1].width = '100%';

const twoColumns = cloneDeep(defaultColumns);
twoColumns[1].width = '50%';
twoColumns[2].width = '50%';

const threeColumns = cloneDeep(defaultColumns);
threeColumns[0].width = '33%';
threeColumns[1].width = '33%';
threeColumns[2].width = '33%';

export const Adaptive: StoryFn<TableProps<any>> = (args) => {
    const data = args.data.slice(0, 2);
    return (
        <div>
            <Table {...args} data={data} columns={oneColumn} />
            <Table {...args} data={data} columns={twoColumns} />
            <Table {...args} data={data} columns={threeColumns} />
        </div>
    );
};
