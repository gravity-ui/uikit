import {Envelope, Star} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Label} from '../../Label';
import {List} from '../List';
import type {ListProps} from '../types';

import type {Mailbox} from './cases';
import {mailboxes, sections} from './cases';

/** Every state of a screenshot comes from the props: the pointer is never moved by the tests */
const commonProps = {
    'aria-label': 'Mailboxes',
    getItemContent: (mailbox: Mailbox) => mailbox.name,
} satisfies Partial<ListProps<Mailbox>>;

export const TestList = (props: Partial<ListProps<Mailbox>>) => (
    <List
        items={mailboxes}
        defaultActiveItemId="starred"
        selectionMode="single"
        defaultSelectedIds={['inbox']}
        {...commonProps}
        {...props}
    />
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
 * The indication of a drag is the only thing the list draws itself: the ghost of the dragged row
 * and the insertion line of the drop target, both from the state half of the adapter
 */
export const TestListWithDnd = (props: Partial<ListProps<Mailbox>>) => (
    <List
        items={mailboxes}
        dnd={{draggingId: 'inbox', dropTarget: {id: 'sent', position: 'before'}}}
        {...commonProps}
        {...props}
    />
);
