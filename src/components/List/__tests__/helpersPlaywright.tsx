import {Envelope, Star} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Label} from '../../Label';
import {List} from '../List';
import type {ListProps} from '../types';

import type {Mailbox} from './cases';
import {mailboxes, sections} from './cases';

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
