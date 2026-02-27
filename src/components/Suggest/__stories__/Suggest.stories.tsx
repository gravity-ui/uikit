import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

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

type TItem = {
    value: string;
    content: string;
    description?: string;
};

const baseItems: TItem[] = [
    {value: 'earth', content: 'Earth', description: 'Our home planet'},
    {value: 'europa', content: 'Europa', description: 'Icy moon of Jupiter'},
    {value: 'jupiter', content: 'Jupiter', description: 'Largest planet'},
    {value: 'mars', content: 'Mars', description: 'The red planet'},
    {value: 'mercury', content: 'Mercury', description: 'Innermost planet'},
    {value: 'moon', content: 'Moon', description: 'Earth’s natural satellite'},
    {value: 'pluto', content: 'Pluto', description: 'Dwarf planet'},
    {value: 'saturn', content: 'Saturn', description: 'Prominent ring system'},
    {value: 'sun', content: 'Sun', description: 'G-type main-sequence star'},
    {value: 'venus', content: 'Venus', description: 'Thick atmosphere, very hot'},
];

const baseFilter = (filter: string) => {
    const normalizedFilter = filter.trim().toLowerCase();
    if (normalizedFilter) {
        return baseItems.filter((item) => {
            return (
                item.value.toLowerCase().includes(normalizedFilter) ||
                item.content.toLowerCase().includes(normalizedFilter) ||
                item.description?.toLowerCase().includes(normalizedFilter)
            );
        });
    }
    return baseItems;
};

export const Default: Story = {
    render: () => {
        const [filter, setFilter] = React.useState('');
        const items = React.useMemo(() => baseFilter(filter), [filter]);
        const handelItemClick = React.useCallback((item: TItem) => {
            setFilter(item.content);
            console.log('onItemClick', item);
        }, []);

        return (
            <Flex gap={2}>
                <Suggest<TItem>
                    items={items}
                    filter={filter}
                    onFilterUpdate={setFilter}
                    onItemClick={handelItemClick}
                    renderItem={(item, isActive) => (
                        <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                            <Text color={item.disabled ? 'hint' : 'primary'}>
                                <Flex justifyContent="space-between">
                                    {item.content}
                                    {isActive ? <span>(active)</span> : null}
                                </Flex>
                            </Text>
                            {item.description ? (
                                <Text color="secondary">{item.description}</Text>
                            ) : null}
                        </Flex>
                    )}
                    fragmentProps={{
                        propsTextInput: {
                            placeholder: 'Search astronomical bodies…',
                        },
                        listProps: {
                            emptyPlaceholder: <div style={{padding: 8}}>No matches</div>,
                        },
                    }}
                />
            </Flex>
        );
    },
};

export const PopupWidth: Story = {
    render: () => {
        const [filter, setFilter] = React.useState('');
        return (
            <Flex direction="column" gap={4}>
                <Text variant="subheader-2">{`popupWidth="fit"`}</Text>
                <Suggest<TItem>
                    filter={filter}
                    items={baseItems.map((item) => ({...item, disabled: item.value === 'pluto'}))}
                    onFilterUpdate={setFilter}
                    onItemClick={(item) => setFilter(item.content)}
                    popupWidth="fit"
                    renderItem={(item) => <div>{item.content}</div>}
                    fragmentProps={{
                        propsTextInput: {placeholder: 'Open to see items'},
                        popupProps: {placement: 'auto-start'},
                    }}
                />

                <Text variant="subheader-2">{`popupWidth="auto"`}</Text>
                <Suggest<TItem>
                    filter={filter}
                    items={baseItems.map((item) => ({...item, disabled: item.value === 'pluto'}))}
                    onFilterUpdate={setFilter}
                    onItemClick={(item) => setFilter(item.content)}
                    popupWidth="auto"
                    renderItem={(item) => <div>{item.content}</div>}
                    fragmentProps={{
                        propsTextInput: {placeholder: 'Open to see items'},
                        popupProps: {placement: 'auto-start'},
                    }}
                />

                <Text variant="subheader-2">{`popupWidth="512px"`}</Text>
                <Suggest<TItem>
                    filter={filter}
                    items={baseItems.map((item) => ({...item, disabled: item.value === 'pluto'}))}
                    onFilterUpdate={setFilter}
                    onItemClick={(item) => setFilter(item.content)}
                    popupWidth={240}
                    renderItem={(item) => <div>{item.content}</div>}
                    fragmentProps={{
                        propsTextInput: {placeholder: 'Open to see items'},
                        popupProps: {placement: 'auto-start'},
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
            () => baseItems.map((item) => ({...item, disabled: item.value === 'pluto'})),
            [],
        );

        return (
            <Suggest<TItem>
                items={items}
                filter={filter}
                onFilterUpdate={setFilter}
                onItemClick={(item) => setFilter(item.content)}
                renderItem={(item) => <div>{item.content}</div>}
                fragmentProps={{propsTextInput: {placeholder: 'Popup with header & footer'}}}
                renderPopupContent={({list}) => {
                    return (
                        <Flex maxHeight="300px" direction="column" gap={1} spacing={{p: 1}}>
                            <Text as="div" variant="subheader-2">
                                Before list
                            </Text>
                            <Text as="div" variant="body-1">
                                Filter: {filter ? `"${filter}"` : '—'}
                            </Text>

                            {list}

                            <Text as="div" variant="subheader-2">
                                After list
                            </Text>
                            <Text as="div" variant="body-1" color="secondary">
                                Tip: press Enter / arrows when popup is open
                            </Text>
                        </Flex>
                    );
                }}
            />
        );
    },
};
