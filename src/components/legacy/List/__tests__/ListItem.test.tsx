import type * as React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {ListItem} from '../components';
import type {ListItemData, ListItemProps} from '../types';

function ListWrapper({children}: React.PropsWithChildren) {
    return <div role="list">{children}</div>;
}

function setup<T extends unknown>(props: Partial<ListItemProps<T>> = {}) {
    const defaultProps: ListItemProps<T> = {
        item: 'List Item' as unknown as ListItemData<T>,
        itemIndex: 0,
        active: false,
        selected: false,
        onActivate() {},
    };

    render(<ListItem<T> {...defaultProps} {...props} />, {wrapper: ListWrapper});
}

test('should render', () => {
    setup();

    expect(screen.getByRole('listitem')).toHaveTextContent('List Item');
});
