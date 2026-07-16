import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Avatar} from '../../../Avatar';
import {Flex} from '../../../layout';
import {List} from '../List';

import './ListStories.scss';

const meta: Meta = {
    title: 'Lab/List',
    component: List,
    parameters: {
        layout: 'centered',
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// К1. Минимальный список
const projects = [
    {id: 'p1', name: 'Cloud'},
    {id: 'p2', name: 'Tracker'},
    {id: 'p3', name: 'Wiki', disabled: true},
    {id: 'p4', name: 'Forms'},
];

export const Minimal: Story = {
    render: () => (
        <Flex gap={10}>
            <List aria-label="Fruits" items={['Apple', 'Pear', 'Plum']} />
            <List aria-label="Projects" items={projects} getItemContent={(p) => p.name} />
        </Flex>
    ),
};

// К2. Секции — структура из данных
interface GroupedItem {
    id: string;
    label?: string;
    name?: string;
    children?: GroupedItem[];
}

const groupedItems: GroupedItem[] = [
    {
        id: 'recent',
        label: 'Recent',
        children: [
            {id: 'r1', name: 'Annual report'},
            {id: 'r2', name: 'Marketing plan'},
        ],
    },
    {
        id: 'all',
        label: 'All',
        children: [
            {id: 'a1', name: 'Backlog'},
            {id: 'a2', name: 'Design review'},
            {id: 'a3', name: 'Team sync'},
        ],
    },
];

export const Sections: Story = {
    render: () => (
        <List aria-label="Groups" items={groupedItems} getItemContent={(i) => i.label ?? i.name} />
    ),
};

// К3. Список действий (ядро, без выделения)
const commands = [
    {id: 'copy', title: 'Copy'},
    {id: 'paste', title: 'Paste'},
    {id: 'duplicate', title: 'Duplicate'},
    {id: 'delete', title: 'Delete', disabled: true},
];

const runCommand = action('runCommand');

export const Actions: Story = {
    render: () => (
        // семантика — listbox (SR объявит «option»); role="menu" — с переездом Menu
        <List
            aria-label="Actions"
            items={commands}
            getItemContent={(c) => c.title}
            onItemAction={(_id, command) => runCommand(command)}
        />
    ),
};

// К4. Полностью свой маркап
const users = Array.from({length: 5}, (_, index) => ({
    id: `user-${index}`,
    name: faker.person.fullName(),
    role: faker.person.jobTitle(),
    avatar: faker.image.urlLoremFlickr({category: 'people', width: 64, height: 64}),
}));

const card = ({active}: {active: boolean}) =>
    ['list-stories-card', active ? 'list-stories-card_active' : ''].filter(Boolean).join(' ');

const track = action('track');

export const CustomMarkup: Story = {
    render: () => (
        <List
            aria-label="Cards"
            items={users}
            getItemTextValue={(u) => u.name}
            renderItem={(ctx, {getItemProps}) => (
                <div
                    {...getItemProps({onClick: () => track(ctx.id)})}
                    className={card({active: ctx.state.active})}
                >
                    <Avatar imgUrl={ctx.item.avatar} size="l" />
                    <div>
                        {ctx.item.name}
                        <span>{ctx.item.role}</span>
                    </div>
                </div>
            )}
        />
    ),
};
