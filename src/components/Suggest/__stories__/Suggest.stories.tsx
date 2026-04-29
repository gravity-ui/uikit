import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Suggest} from '..';
import {Button} from '../../Button';
import {Card} from '../../Card';
import {Divider} from '../../Divider';
import type {SelectOption, SelectOptions} from '../../Select/types';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {block} from '../../utils/cn';

import './Suggest.stories.scss';

const b = block('suggest-story');

const defaultStoryItems = [
    'Apple',
    'Apricot',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Fig',
    'Grape',
    'Grapefruit',
    'Kiwi',
    'Lemon',
    'Lime',
    'Mango',
    'Melon',
    'Orange',
    'Papaya',
    'Peach',
    'Pear',
    'Persimmon',
    'Pineapple',
    'Plum',
    'Pomegranate',
    'Raspberry',
    'Strawberry',
    'Watermelon',
];

/**
 * Group labels use a `Section · Subgroup` pattern. Options use the same shape as `Select` groups
 * (one `SelectOptionGroup` level; finer splits are expressed in the label text).
 */
const groupedOptionsWithSubgroups: SelectOptions = [
    {
        label: 'Produce · Fruit',
        options: [
            {value: 'apple', content: 'Apple'},
            {value: 'banana', content: 'Banana'},
            {value: 'orange', content: 'Orange'},
            {value: 'grape', content: 'Grape'},
        ],
    },
    {
        label: 'Produce · Vegetables',
        options: [
            {value: 'carrot', content: 'Carrot'},
            {value: 'broccoli', content: 'Broccoli'},
            {value: 'spinach', content: 'Spinach'},
            {value: 'pepper', content: 'Bell pepper'},
        ],
    },
    {
        label: 'Pantry · Dry goods',
        options: [
            {value: 'rice', content: 'Rice'},
            {value: 'pasta', content: 'Pasta'},
            {value: 'flour', content: 'Flour'},
            {value: 'sugar', content: 'Sugar'},
        ],
    },
    {
        label: 'Pantry · Canned',
        options: [
            {value: 'beans', content: 'Black beans'},
            {value: 'tomatoes', content: 'Diced tomatoes'},
            {value: 'corn', content: 'Sweet corn'},
        ],
    },
];

const ASYNC_CATALOG: SelectOption[] = [
    {value: 'auth-login', content: 'POST /v1/auth/login'},
    {value: 'auth-logout', content: 'POST /v1/auth/logout'},
    {value: 'users-list', content: 'GET /v1/users'},
    {value: 'users-create', content: 'POST /v1/users'},
    {value: 'users-get', content: 'GET /v1/users/{id}'},
    {value: 'users-patch', content: 'PATCH /v1/users/{id}'},
    {value: 'projects-list', content: 'GET /v1/projects'},
    {value: 'projects-create', content: 'POST /v1/projects'},
    {value: 'billing-invoice', content: 'GET /v1/billing/invoices/{id}'},
    {value: 'billing-refund', content: 'POST /v1/billing/refunds'},
    {value: 'webhooks-list', content: 'GET /v1/webhooks'},
    {value: 'webhooks-register', content: 'POST /v1/webhooks'},
    {value: 'search-query', content: 'GET /v1/search?q='},
    {value: 'files-upload', content: 'POST /v1/files/upload'},
    {value: 'files-delete', content: 'DELETE /v1/files/{id}'},
    {value: 'metrics-query', content: 'POST /v1/metrics/query'},
    {value: 'alerts-list', content: 'GET /v1/alerts'},
    {value: 'alerts-ack', content: 'POST /v1/alerts/{id}/ack'},
    {value: 'orgs-tree', content: 'GET /v1/orgs/tree'},
    {value: 'tokens-create', content: 'POST /v1/tokens'},
    {value: 'tokens-revoke', content: 'DELETE /v1/tokens/{id}'},
    {value: 'export-job', content: 'POST /v1/export/jobs'},
    {value: 'import-job', content: 'POST /v1/import/jobs'},
    {value: 'health', content: 'GET /health'},
];

function delay(ms: number) {
    return new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
    });
}

function getOptionSearchText(option: SelectOption) {
    if (typeof option.content === 'string') {
        return option.content;
    }
    return option.value;
}

function filterCatalog(query: string): SelectOption[] {
    const q = query.trim().toLowerCase();
    if (!q) {
        return ASYNC_CATALOG.slice(0, 10);
    }
    return ASYNC_CATALOG.filter((option) => getOptionSearchText(option).toLowerCase().includes(q));
}

function AsyncSuggestDemo() {
    const [query, setQuery] = React.useState('');
    const [options, setOptions] = React.useState<SelectOptions>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        let cancelled = false;
        const timer = window.setTimeout(async () => {
            setLoading(true);
            await delay(420);
            if (cancelled) {
                return;
            }
            setOptions(filterCatalog(query));
            setLoading(false);
        }, 300);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [query]);

    const showListLoader = loading && options.length === 0;
    const showStaleBlur = loading && options.length > 0;

    return (
        <div className={b('async-wrap')}>
            <Card theme="normal" type="container" size="l">
                <Flex direction="column" gap={5} className={b('async-card-inner')}>
                    <Flex direction="column" gap={2}>
                        <Text variant="header-1">API directory</Text>
                        <Text variant="body-2" color="secondary">
                            Async suggest: debounced fetch replaces options after a short delay.
                            While new results load, the list keeps showing the previous matches with
                            an animated blur; the inline loader appears only when there is nothing
                            to show yet (initial load or empty result set).
                        </Text>
                    </Flex>
                    <div
                        className={b('async-field-wrap', {
                            refreshing: showStaleBlur,
                        })}
                    >
                        <Suggest
                            inlineSuggest
                            width="max"
                            size="l"
                            label="Search endpoints"
                            placeholder="Try “auth”, “billing”, or “webhook”…"
                            value={query}
                            onUpdate={setQuery}
                            options={options}
                            loading={showListLoader}
                        />
                    </div>
                </Flex>
            </Card>
        </div>
    );
}

const meta: Meta<typeof Suggest> = {
    title: 'Components/Inputs/Suggest',
    component: Suggest,
    argTypes: {
        onUpdate: {
            action: 'onUpdate',
        },
        onOpenChange: {
            action: 'onOpenChange',
        },
        onFilterChange: {
            action: 'onFilterChange',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Suggest>;

export const Default = {
    render: (args) => (
        <Flex gap={2}>
            <Suggest
                {...args}
                inlineSuggest
                width="max"
                items={defaultStoryItems}
                placeholder="Type to filter fruits"
            />
        </Flex>
    ),
} satisfies Story;

export const WithGroupsAndSubgroups = {
    render: (args) => (
        <div className={b('grouped-wrap')}>
            <Suggest
                {...args}
                options={groupedOptionsWithSubgroups}
                placeholder="Search produce or pantry…"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Uses `options` with several `SelectOptionGroup` entries. Labels such as `Produce · Fruit` emulate subgroups; the data model matches `Select` (one group level in options, nested sections via naming).',
            },
        },
    },
} satisfies Story;

export const InlineSuggest = {
    render: (args) => (
        <div className={b('layout')}>
            <Card theme="normal" type="container" size="l">
                <Flex direction="column" gap={7} className={b('inline-card-inner')}>
                    <Flex justifyContent="space-between" alignItems="flex-start" gap={4}>
                        <Flex direction="column" gap={3}>
                            <Text variant="display-1">Tonight&apos;s menu</Text>
                            <Text variant="body-2" color="secondary">
                                The suggestion list sits in the page flow under the field—scroll the
                                page and you&apos;ll see content continue below the results (no
                                floating layer).
                            </Text>
                        </Flex>
                        <Text variant="caption-2" color="hint">
                            Inline layout
                        </Text>
                    </Flex>
                    <Divider />
                    <section className={b('inline-field-block')}>
                        <Flex direction="column" gap={4} style={{minWidth: 0}}>
                            <Flex direction="column" gap={2}>
                                <Text variant="subheader-2">Find a dish</Text>
                                <Text variant="body-2" color="secondary">
                                    Shrink the Storybook viewport—the field and the list track the
                                    card width.
                                </Text>
                            </Flex>
                            <Suggest
                                {...args}
                                inlineSuggest
                                width="max"
                                size="l"
                                view="normal"
                                pin="round-round"
                                label="Search"
                                placeholder="Try “salmon”, “risotto”, or “tart”…"
                                items={[
                                    'Seared salmon with dill butter',
                                    'Wild mushroom risotto',
                                    'Lemon tart with toasted meringue',
                                    'Heritage tomato burrata salad',
                                    'Slow-roasted lamb shoulder',
                                    'Chocolate fondant, salted caramel',
                                    'Charred octopus, smoked paprika',
                                    'Truffle potato purée side',
                                ]}
                            />
                        </Flex>
                    </section>
                    <Divider />
                    <section className={b('inline-below')} aria-label="Content after suggestions">
                        <Flex direction="column" gap={4}>
                            <Flex direction="column" gap={2}>
                                <Text variant="subheader-2">This block proves inline layout</Text>
                                <Text variant="body-2">
                                    If results were a popup anchored to the viewport, this section
                                    would stay tucked under the input while the list hovered above
                                    it. Here the list grows inline and pushes this reservation panel
                                    down—exactly like normal block layout.
                                </Text>
                            </Flex>
                            <Flex gap={3} style={{flexWrap: 'wrap'}}>
                                <Button view="action" size="l">
                                    Reserve a table
                                </Button>
                                <Button view="outlined" size="l">
                                    Email the menu
                                </Button>
                            </Flex>
                        </Flex>
                    </section>
                </Flex>
            </Card>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '`inlineSuggest` stacks the option list **below** the input in document flow (no `SelectPopup`). Combine with `width="max"` so the list spans the container.',
            },
        },
    },
} satisfies Story;

export const AsyncSuggest = {
    render: () => <AsyncSuggestDemo />,
    parameters: {
        controls: {
            disable: true,
        },
        docs: {
            description: {
                story: 'Controlled `value`, debounced `useEffect` that sets `loading` and replaces `options` after `delay`. `onFilterChange` mirrors the query for logging or analytics.',
            },
        },
    },
} satisfies Story;
