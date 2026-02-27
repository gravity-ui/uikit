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
        const [value, setValue] = React.useState('');
        const items = React.useMemo(() => baseFilter(value), [value]);
        const handelItemClick = React.useCallback((item: TItem) => {
            setValue(item.content);
            console.log('onItemClick', item);
        }, []);

        return (
            <Flex gap={2}>
                <Suggest<TItem>
                    items={items}
                    onItemClick={handelItemClick}
                    onUpdate={setValue}
                    placeholder="Search astronomical bodies…"
                    value={value}
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
                />
            </Flex>
        );
    },
};

export const PopupWidth: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        return (
            <Flex direction="column" gap={4}>
                <Text variant="subheader-2">{`popupWidth="fit"`}</Text>
                <Suggest<TItem>
                    items={baseItems}
                    onItemClick={(item) => setValue(item.content)}
                    onUpdate={setValue}
                    placeholder="Search..."
                    popupPlacement="auto-start"
                    popupWidth="fit"
                    renderItem={(item) => <div>{item.content}</div>}
                    value={value}
                />

                <Text variant="subheader-2">{`popupWidth="auto"`}</Text>
                <Suggest<TItem>
                    value={value}
                    items={baseItems}
                    onUpdate={setValue}
                    onItemClick={(item) => setValue(item.content)}
                    popupWidth="auto"
                    renderItem={(item) => <div>{item.content}</div>}
                    popupPlacement="auto-start"
                    placeholder="Search..."
                />

                <Text variant="subheader-2">{`popupWidth="512px"`}</Text>
                <Suggest<TItem>
                    value={value}
                    items={baseItems}
                    onUpdate={setValue}
                    onItemClick={(item) => setValue(item.content)}
                    popupWidth={240}
                    renderItem={(item) => <div>{item.content}</div>}
                    popupPlacement="auto-start"
                    placeholder="Search..."
                />
            </Flex>
        );
    },
};

export const CustomPopupContent: Story = {
    render: () => {
        const [value, setValue] = React.useState('');

        return (
            <Suggest<TItem>
                items={baseItems}
                onItemClick={(item) => setValue(item.content)}
                onUpdate={setValue}
                placeholder="Search..."
                renderItem={(item) => <div>{item.content}</div>}
                value={value}
                renderPopupContent={({list}) => {
                    return (
                        <Flex maxHeight="300px" direction="column" gap={1} spacing={{p: 1}}>
                            <Text as="div" variant="subheader-2">
                                Before list
                            </Text>
                            <Text as="div" variant="body-1">
                                Filter: {value ? `"${value}"` : '—'}
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
