import * as React from 'react';

import {cn} from '../../utils/cn';
import {List} from '../List';
import type {ListProps} from '../types';

import './ListWithLoader.scss';

const b = cn('list-with-loader');

export const ListWithLoader = (args: ListProps<string>) => {
    const [items, setItems] = React.useState(args.items);

    const onLoadMore = () => {
        // delay for fetching new real items
        setTimeout(() => {
            setItems([...items, ...args.items]);
        }, 300);
    };

    return (
        <div className={b()}>
            <List {...args} items={items} onLoadMore={onLoadMore} />
        </div>
    );
};
