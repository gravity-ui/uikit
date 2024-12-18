import React from 'react';

import {List} from '../List';
import type {ListItemData, ListProps} from '../types';

export const TestList = <T extends string>(props: Partial<ListProps<T>>) => {
    const [activeItemIndex, setActiveItemIndex] = React.useState<number | undefined>(1);
    const [selectedItemIndex, setSelectedItemIndex] = React.useState<number | undefined>(2);

    return (
        <List
            {...props}
            activeItemIndex={activeItemIndex}
            onChangeActive={setActiveItemIndex}
            selectedItemIndex={selectedItemIndex}
            onItemClick={(_, index) => setSelectedItemIndex(index)}
        />
    );
};

export const TestFilterableList = <T extends string>(props: Partial<ListProps<T>>) => {
    const [filter, setFilter] = React.useState<string>('');

    const filterItem = (filter: string) => (item: ListItemData<T>) => {
        return item.includes(filter);
    };

    return (
        <TestList
            {...props}
            autoFocus
            filterable
            filter={filter}
            onFilterUpdate={setFilter}
            filterItem={filterItem}
        />
    );
};

export const TestListWithCustomRender = <T extends string>(props: Partial<ListProps<T>>) => {
    return (
        <TestList
            {...props}
            renderItem={(item) => <div style={{border: '1px dotted tomato'}}>{item}</div>}
        />
    );
};
