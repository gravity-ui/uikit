import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';
import {ListComposable, ListComposableProps} from '../ListComposable';
import {ListContainer} from '../components/ListContainer/ListContainer';
import {ListActionButton} from '../components/ListControls/ListControls';
import {ListFilter} from '../components/ListFilter/ListFilter';

import {ListResetButton} from './ListResetButton';
import {createRandomizedData} from './makeData';

export default {
    title: 'ListComposable/BaseExample',
    component: ListComposable,
} as Meta;

const data = createRandomizedData(1000);

const DefaultTemplate: StoryFn<ListComposableProps<unknown>> = () => (
    <React.StrictMode>
        <Flex gap="5" style={{width: '100%', height: '300px'}}>
            <ListComposable items={data} size="s" selectable="multiple">
                <Flex direction="column" gap="3" width={400}>
                    <ListFilter />
                    <ListContainer virtualized />
                    <Flex gap="2">
                        <ListResetButton />
                        <ListActionButton
                            actionText="Accept"
                            onActionClick={(...args) =>
                                alert(args.map((arg) => JSON.stringify(arg, null, 2)).join('\n'))
                            }
                        />
                    </Flex>
                </Flex>
            </ListComposable>
        </Flex>
    </React.StrictMode>
);
export const Examples = DefaultTemplate.bind({});
