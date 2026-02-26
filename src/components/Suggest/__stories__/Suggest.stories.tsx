import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {useArgs} from 'storybook/preview-api';

import {Button} from '../../Button';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {Suggest} from '../Suggest';

const meta: Meta<typeof Suggest> = {
    title: 'Components/Inputs/Suggest',
    component: Suggest,
    argTypes: {},
    parameters: {},
};

export default meta;

type Story = StoryObj<typeof Suggest>;

type TOption = {
    value: string;
    content: string;
    description?: string;
    separator?: boolean;
};

const baseItems: TOption[] = [
    {value: 'apple', content: 'Apple', description: 'Crisp & sweet'},
    {value: 'banana', content: 'Banana', description: 'Ripe, high-potassium'},
    {value: 'strawberry', content: 'Strawberry', description: 'Seasonal berries'},
    {value: 'tomato', content: 'Tomato', description: 'Technically a fruit'},
    {value: 'cucumber', content: 'Cucumber', description: 'Fresh & crunchy'},
    {value: 'carrot', content: 'Carrot', description: 'Great for roasting'},
    {value: 'broccoli', content: 'Broccoli', description: 'Steam or stir-fry'},
    {value: 'eggplant', content: 'Eggplant', description: 'Best grilled'},
    {value: 'durian', content: 'Durian', description: 'Very polarizing aroma'},
];

export const Default: Story = {
    render: () => {
        const [{filter = ''}, setArgs] = useArgs<{filter?: string}>();
        const items = React.useMemo(() => {
            const normalizedFilter = filter.trim().toLowerCase();
            return baseItems
                .filter((item) => {
                    if (!normalizedFilter) {
                        return true;
                    }
                    return (
                        item.value.toLowerCase().includes(normalizedFilter) ||
                        item.content.toLowerCase().includes(normalizedFilter) ||
                        item.description?.toLowerCase().includes(normalizedFilter)
                    );
                })
                .map((item) => ({...item, disabled: item.value === 'durian'}));
        }, [filter]);

        return (
            <Flex gap={2}>
                <Suggest<TOption>
                    filter={filter}
                    onFilterUpdate={(nextFilter) => setArgs({filter: nextFilter})}
                    items={items}
                    popupWidth="fit"
                    fragmentProps={{
                        propsTextInput: {
                            name: 'produce',
                            placeholder: 'Search fruits & vegetables…',
                        },
                        listProps: {
                            items,
                            emptyPlaceholder: <div style={{padding: 8}}>No matches</div>,
                        },
                    }}
                    renderItem={(item, isActive) => (
                        <div
                            style={{
                                color: item.disabled ? 'gray' : 'inherit',
                                fontWeight: isActive ? 600 : undefined,
                            }}
                        >
                            <div>
                                {item.content}
                                {isActive ? ' (active)' : null}
                            </div>
                            {item.description ? (
                                <div style={{opacity: 0.7, fontSize: 12}}>{item.description}</div>
                            ) : null}
                        </div>
                    )}
                    onItemClick={(item) => {
                        setArgs({filter: item.content});
                        console.log('onItemClick', item);
                    }}
                />
            </Flex>
        );
    },
};

export const RenderItemPlayground: Story = {
    render: () => {
        type RenderMode = 'compact' | 'rich' | 'value-only';
        const [mode, setMode] = React.useState<RenderMode>('rich');
        const [uppercaseSeparators, setUppercaseSeparators] = React.useState(true);
        const [filter, setFilter] = React.useState('');

        const allItems = React.useMemo(
            () => [
                {value: 'sep-fruits', content: 'Fruits', separator: true, disabled: true},
                {value: 'apple', content: 'Apple', description: 'Crisp & sweet'},
                {value: 'banana', content: 'Banana', description: 'Ripe, high-potassium'},
                {value: 'strawberry', content: 'Strawberry', description: 'Seasonal berries'},
                {
                    value: 'durian',
                    content: 'Durian',
                    description: 'Very polarizing aroma',
                    disabled: true,
                },
                {value: 'sep-vegetables', content: 'Vegetables', separator: true, disabled: true},
                {value: 'carrot', content: 'Carrot', description: 'Great for roasting'},
                {value: 'broccoli', content: 'Broccoli', description: 'Steam or stir-fry'},
                {value: 'eggplant', content: 'Eggplant', description: 'Best grilled'},
                {value: 'sep-herbs', content: 'Herbs', separator: true, disabled: true},
                {value: 'basil', content: 'Basil', description: 'Pairs with tomato'},
                {value: 'mint', content: 'Mint', description: 'Cold drinks, desserts'},
            ],
            [],
        );

        const items = React.useMemo(() => {
            const normalizedFilter = filter.trim().toLowerCase();
            if (!normalizedFilter) {
                return allItems;
            }

            return allItems.filter((item) => {
                if (item.separator) {
                    return true;
                }
                return (
                    item.value.toLowerCase().includes(normalizedFilter) ||
                    item.content.toLowerCase().includes(normalizedFilter) ||
                    item.description?.toLowerCase().includes(normalizedFilter)
                );
            });
        }, [allItems, filter]);

        return (
            <Flex direction="column" gap={3}>
                <Flex gap={2} wrap="wrap">
                    <Button selected={mode === 'rich'} onClick={() => setMode('rich')} size="s">
                        Rich
                    </Button>
                    <Button
                        selected={mode === 'compact'}
                        onClick={() => setMode('compact')}
                        size="s"
                    >
                        Compact
                    </Button>
                    <Button
                        selected={mode === 'value-only'}
                        onClick={() => setMode('value-only')}
                        size="s"
                    >
                        Value only
                    </Button>
                    <Button
                        selected={uppercaseSeparators}
                        onClick={() => setUppercaseSeparators((v) => !v)}
                        size="s"
                    >
                        Uppercase separators
                    </Button>
                </Flex>

                <Suggest<TOption>
                    filter={filter}
                    onFilterUpdate={setFilter}
                    items={items}
                    popupWidth="fit"
                    fragmentProps={{
                        propsTextInput: {
                            name: 'produce-playground',
                            placeholder: 'Try: “apple”, “mint”, “broc”…',
                        },
                        listProps: {
                            items,
                            itemHeight: (item) => (item.separator ? 32 : 44),
                        },
                    }}
                    renderItem={(item, isActive) => {
                        if (item.separator) {
                            return (
                                <div
                                    style={{
                                        fontSize: 12,
                                        opacity: 0.7,
                                        fontWeight: 600,
                                        letterSpacing: uppercaseSeparators ? 0.6 : undefined,
                                        textTransform: uppercaseSeparators
                                            ? 'uppercase'
                                            : undefined,
                                        paddingBlock: 6,
                                    }}
                                >
                                    {item.content}
                                </div>
                            );
                        }

                        const baseStyle: React.CSSProperties = {
                            color: item.disabled ? 'gray' : 'inherit',
                            fontWeight: isActive ? 600 : undefined,
                        };

                        if (mode === 'value-only') {
                            return <div style={baseStyle}>{item.value}</div>;
                        }

                        if (mode === 'compact') {
                            return (
                                <div style={baseStyle}>
                                    {item.content}
                                    {isActive ? ' (active)' : null}
                                </div>
                            );
                        }

                        return (
                            <div style={baseStyle}>
                                <div>
                                    {item.content}
                                    {isActive ? ' (active)' : null}
                                </div>
                                {item.description ? (
                                    <div style={{opacity: 0.7, fontSize: 12}}>
                                        {item.description}
                                    </div>
                                ) : null}
                            </div>
                        );
                    }}
                    onItemClick={(item) => {
                        if (!item.separator) {
                            setFilter(item.content);
                        }
                        console.log('onItemClick', item);
                    }}
                />
            </Flex>
        );
    },
};

export const CustomPopupContent: Story = {
    render: () => {
        const [filter, setFilter] = React.useState('');
        const items = React.useMemo(
            () => baseItems.map((item) => ({...item, disabled: item.value === 'durian'})),
            [],
        );

        return (
            <Suggest<TOption>
                filter={filter}
                onFilterUpdate={setFilter}
                items={items}
                popupWidth="fit"
                fragmentProps={{
                    propsTextInput: {
                        name: 'produce-custom-popup',
                        placeholder: 'Popup with header & footer',
                    },
                    listProps: {items},
                }}
                renderItem={(item) => <div>{item.content}</div>}
                onItemClick={(item) => setFilter(item.content)}
                renderPopupContent={({list}) => {
                    return (
                        <div style={{padding: 8, minWidth: 280}}>
                            <Text as="div" variant="subheader-2">
                                Before list
                            </Text>
                            <Text as="div" variant="body-1" style={{opacity: 0.7}}>
                                Filter: {filter ? `"${filter}"` : '—'}
                            </Text>

                            <div style={{marginBlock: 8}}>{list}</div>

                            <Text as="div" variant="subheader-2">
                                After list
                            </Text>
                            <Text as="div" variant="body-1" style={{opacity: 0.7}}>
                                Tip: press Enter / arrows when popup is open
                            </Text>
                        </div>
                    );
                }}
            />
        );
    },
};

export const PopupWidth: Story = {
    render: () => (
        <Flex direction="column" gap={4}>
            <Text as="div" variant="subheader-2">
                popupWidth=&quot;fit&quot;
            </Text>
            <Suggest<TOption>
                filter=""
                onFilterUpdate={() => {}}
                items={baseItems.map((item) => ({...item, disabled: item.value === '4'}))}
                popupWidth="fit"
                fragmentProps={{propsTextInput: {placeholder: 'Open to see items'}}}
                renderItem={(item) => <div>{item.content}</div>}
            />

            <Text as="div" variant="subheader-2">
                popupWidth=&quot;auto&quot;
            </Text>
            <Suggest<TOption>
                filter=""
                onFilterUpdate={() => {}}
                items={baseItems.map((item) => ({...item, disabled: item.value === '4'}))}
                popupWidth="auto"
                fragmentProps={{propsTextInput: {placeholder: 'Open to see items'}}}
                renderItem={(item) => <div>{item.content}</div>}
            />

            <Text as="div" variant="subheader-2">
                popupWidth=240
            </Text>
            <Suggest<TOption>
                filter=""
                onFilterUpdate={() => {}}
                items={baseItems.map((item) => ({...item, disabled: item.value === '4'}))}
                popupWidth={240}
                fragmentProps={{propsTextInput: {placeholder: 'Open to see items'}}}
                renderItem={(item) => <div>{item.content}</div>}
            />
        </Flex>
    ),
};
