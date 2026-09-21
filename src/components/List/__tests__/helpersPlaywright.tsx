import {Envelope, Star} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Label} from '../../Label';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import type {ListProps} from '../types';

import type {Mailbox} from './cases';
import {mailboxes, sections, virtualizedItems} from './cases';

/**
 * The hover of the pointer is not part of a screenshot: the states are set by the props, and a
 * row is activated by `defaultActiveItemId` instead of by the mouse
 */
const commonProps = {
    'aria-label': 'Mailboxes',
    activateOnHover: false,
    getItemContent: (mailbox: Mailbox) => mailbox.name,
} satisfies Partial<ListProps<Mailbox>>;

export const TestList = (props: Partial<ListProps<Mailbox>>) => (
    <List items={mailboxes} defaultActiveItemId="starred" {...commonProps} {...props} />
);

export const TestListWithSections = (props: Partial<ListProps<Mailbox>>) => (
    <List items={sections} {...commonProps} {...props} />
);

export const TestListWithItemView = (props: Partial<ListProps<Mailbox>>) => (
    <List
        items={mailboxes}
        defaultActiveItemId="starred"
        {...commonProps}
        renderItem={(ctx, {getItemProps, getItemViewProps}) => (
            <List.ItemView
                {...getItemProps()}
                {...getItemViewProps()}
                startContent={<Icon data={ctx.item.id === 'starred' ? Star : Envelope} size={16} />}
                description={ctx.item.description}
                endContent={<Label>{ctx.item.count}</Label>}
            >
                {ctx.item.name}
            </List.ItemView>
        )}
        {...props}
    />
);

/**
 * The whole case lives in the helper: a function prop does not survive the serialization of
 * `mount` — in the browser it becomes a callback into the test and renders nothing
 */
export const TestVirtualizedList = () => (
    <ListVirtualizer estimateItemSize={28}>
        <List {...commonProps} items={virtualizedItems} style={{height: 200}} />
    </ListVirtualizer>
);
