import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {ListSelectionProps, ListSize} from '../types';

export interface Mailbox {
    id: string;
    name: string;
    description: string;
    count: number;
    disabled?: boolean;
    children?: Mailbox[];
}

export const sizeCases: Cases<ListSize> = ['s', 'm', 'l', 'xl'];

export const selectionModeCases: Cases<ListSelectionProps['selectionMode']> = [
    'single',
    'multiple',
];

export const mailboxes: Mailbox[] = [
    {id: 'inbox', name: 'Inbox', description: 'Unread first', count: 24},
    {id: 'starred', name: 'Starred', description: 'Flagged by you', count: 3},
    {id: 'snoozed', name: 'Snoozed', description: 'Back later today', count: 1, disabled: true},
    {id: 'sent', name: 'Sent', description: 'Everything you answered', count: 128},
];

export const sections: Mailbox[] = [
    {
        id: 'personal',
        name: 'Personal',
        description: '',
        count: 0,
        children: mailboxes.slice(0, 2),
    },
    {
        id: 'work',
        name: 'Work',
        description: '',
        count: 0,
        children: mailboxes.slice(2),
    },
];

export const virtualizedItems: Mailbox[] = Array.from({length: 200}, (_, index) => ({
    id: `row-${index}`,
    name: `Row ${index + 1}`,
    description: '',
    count: index,
}));
