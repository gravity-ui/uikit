import React from 'react';

import identity from 'lodash/identity';

import {Button} from '../../../Button';
import {Text} from '../../../Text';
import {TextInput} from '../../../controls';
import {Flex, spacing} from '../../../layout';
import {useListFilter} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

import {RenderVirtualizedContainer} from './RenderVirtualizedContainer';

export interface WithFiltrationAndControlsExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'getItemContent'
    > {
    itemsCount?: number;
}

export const WithFiltrationAndControlsExample = ({
    itemsCount = 5,
    ...props
}: WithFiltrationAndControlsExampleProps) => {
    const items = React.useMemo(() => createRandomizedData({num: itemsCount}), [itemsCount]);
    const [open, onOpenChange] = React.useState(true);
    const [value, setValue] = React.useState<string[]>([]);
    const filterState = useListFilter({items});

    return (
        <Flex>
            <TreeSelect
                {...props}
                multiple
                open={open}
                onOpenChange={onOpenChange}
                slotBeforeListBody={
                    <TextInput
                        autoFocus
                        hasClear
                        placeholder="Type for search..."
                        className={spacing({p: 2})}
                        style={{boxSizing: 'border-box'}}
                        autoComplete="off"
                        value={filterState.filter}
                        onUpdate={filterState.onChange}
                        ref={filterState.filterRef}
                    />
                }
                renderContainer={(props) => {
                    if (props.items.length === 0 && items.length > 0) {
                        return (
                            <Flex centerContent className={spacing({p: 2})} height="300px">
                                <Text variant="subheader-1">Nothing found</Text>
                            </Flex>
                        );
                    }

                    return <RenderVirtualizedContainer {...props} />;
                }}
                slotAfterListBody={
                    <Flex gap="2" className={spacing({p: 2})}>
                        <Button
                            width="max"
                            onClick={() => {
                                setValue([]);
                                filterState.reset();
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            disabled={!value.length}
                            width="max"
                            view="action"
                            onClick={() => {
                                onOpenChange(false);
                                alert(JSON.stringify(value));
                            }}
                        >
                            Accept
                        </Button>
                    </Flex>
                }
                value={value}
                renderControlContent={identity}
                items={filterState.items}
                onUpdate={setValue}
            />
        </Flex>
    );
};
