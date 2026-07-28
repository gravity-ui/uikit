import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {
    Camera,
    FileText,
    FileZipper,
    Folder,
    MusicNote,
    Picture,
    TrashBin,
} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Avatar} from '../../../Avatar';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import type {IconData} from '../../../Icon';
import {Label} from '../../../Label';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';

import {ComboboxExample} from './ComboboxExample';
import comboboxCode from './ComboboxExample?raw';
import {ReorderDndKitExample} from './ReorderDndKitExample';
import reorderDndKitCode from './ReorderDndKitExample?raw';
import {ReorderDndKitVirtualizedExample} from './ReorderDndKitVirtualizedExample';
import reorderDndKitVirtualizedCode from './ReorderDndKitVirtualizedExample?raw';
import {ReorderHelloPangeaExample} from './ReorderHelloPangeaExample';
import reorderHelloPangeaCode from './ReorderHelloPangeaExample?raw';
import {ReorderHelloPangeaVirtualizedExample} from './ReorderHelloPangeaVirtualizedExample';
import reorderHelloPangeaVirtualizedCode from './ReorderHelloPangeaVirtualizedExample?raw';
import {ReorderPragmaticExample} from './ReorderPragmaticExample';
import reorderPragmaticCode from './ReorderPragmaticExample?raw';
import {ReorderPragmaticVirtualizedExample} from './ReorderPragmaticVirtualizedExample';
import reorderPragmaticVirtualizedCode from './ReorderPragmaticVirtualizedExample?raw';
import useDndKitListDndCode from './useDndKitListDnd?raw';
import useHelloPangeaListDndCode from './useHelloPangeaListDnd?raw';
import usePragmaticListDndCode from './usePragmaticListDnd?raw';

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

// К0. Дефолтная стори-песочница: основные пропсы и сами опции (массив items,
// включая disabled и секции через children) редактируются в панели Controls
interface PlaygroundItem {
    id: string;
    title: string;
    disabled?: boolean;
    children?: PlaygroundItem[];
}

const playgroundItems: PlaygroundItem[] = [
    {id: 'cloud', title: 'Cloud'},
    {id: 'tracker', title: 'Tracker'},
    {id: 'wiki', title: 'Wiki', disabled: true},
    {id: 'forms', title: 'Forms'},
    {id: 'disk', title: 'Disk'},
];

interface PlaygroundArgs {
    items: PlaygroundItem[];
    size: 's' | 'm' | 'l' | 'xl';
    activateOnHover: boolean;
    selectionMode: 'none' | 'single' | 'multiple';
    role: 'listbox' | 'grid';
    defaultActiveItemId: string;
    'aria-label': string;
}

export const Default: StoryObj<PlaygroundArgs> = {
    render: function DefaultStory(args) {
        const {items, selectionMode, defaultActiveItemId, ...rest} = args;
        return (
            <List
                // Ремоунт на смену uncontrolled-настроек: слой выделения и
                // defaultActiveItemId читаются один раз при маунте
                key={`${selectionMode}|${defaultActiveItemId}`}
                {...rest}
                // 'none' выражается отсутствием пропа — иначе включился бы слой
                {...(selectionMode === 'none' ? undefined : {selectionMode})}
                defaultActiveItemId={defaultActiveItemId || undefined}
                items={items}
                getItemContent={(item) => item.title}
                onItemAction={action('onItemAction')}
                onActiveItemUpdate={action('onActiveItemUpdate')}
            />
        );
    },
    args: {
        items: playgroundItems,
        size: 'm',
        activateOnHover: true,
        selectionMode: 'none',
        role: 'listbox',
        defaultActiveItemId: '',
        'aria-label': 'Projects',
    },
    argTypes: {
        items: {control: 'object'},
        size: {control: 'select', options: ['s', 'm', 'l', 'xl']},
        activateOnHover: {control: 'boolean'},
        selectionMode: {control: 'radio', options: ['none', 'single', 'multiple']},
        role: {control: 'radio', options: ['listbox', 'grid']},
        defaultActiveItemId: {
            control: 'text',
            description: 'Программная активация: тёмный курсор (keyboard-модальность)',
        },
    },
};

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
    email: faker.internet.email(),
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

// К5. Одиночный выбор
export const SingleSelection: Story = {
    render: function SingleSelectionStory() {
        const [sel, setSel] = React.useState<string[]>(['p1']);
        return (
            <List
                aria-label="Projects"
                items={projects}
                getItemContent={(p) => p.name}
                selectionMode="single"
                selectedIds={sel}
                onSelectedUpdate={setSel}
            />
        );
    },
};

// К6. Множественный выбор, свои слоты
export const MultipleSelection: Story = {
    render: function MultipleSelectionStory() {
        const [sel, setSel] = React.useState<string[]>([]);
        return (
            <List
                aria-label="Users"
                items={users}
                getItemTextValue={(u) => u.name}
                selectionMode="multiple"
                selectedIds={sel}
                onSelectedUpdate={setSel}
                renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                    // getItemViewProps: active/selected/disabled/selectionStyle разом —
                    // забыть disabled невозможно
                    <List.ItemView
                        {...getItemProps()}
                        {...getItemViewProps()}
                        description={ctx.item.email}
                        endContent={<Label>{ctx.item.role}</Label>}
                    >
                        {ctx.item.name}
                    </List.ItemView>
                )}
            />
        );
    },
};

// Фаза 7: диапазонное выделение (файл-менеджер). Shift+клик и Shift+↑/↓
// заменяют диапазон от якоря — цели последнего обычного жеста выделения
// (клик/Space пере-якоряют), Shift+Space выбирает диапазон от якоря до
// активной строки, Ctrl/Cmd+A — все опции. Диапазон считается по данным:
// заголовки секций пропускаются, disabled-строки не выбираются; в single
// Shift игнорируется
interface FileEntry {
    id: string;
    name: string;
    description?: string;
    icon?: IconData;
    disabled?: boolean;
    children?: FileEntry[];
}

const fileEntries: FileEntry[] = [
    {
        id: 'folders',
        name: 'Folders',
        children: [
            {id: 'docs', name: 'Documents', description: '128 items', icon: Folder},
            {id: 'music', name: 'Music', description: '52 items', icon: Folder},
            {
                id: 'trash',
                name: 'Trash',
                description: 'System folder',
                icon: TrashBin,
                disabled: true,
            },
        ],
    },
    {
        id: 'files',
        name: 'Files',
        children: [
            {
                id: 'annual-report',
                name: 'annual-report.pdf',
                description: '2.4 MB · Jul 21',
                icon: FileText,
            },
            {id: 'archive', name: 'assets.zip', description: '58 MB · Jul 18', icon: FileZipper},
            {id: 'cover', name: 'cover.png', description: '1.2 MB · Jul 12', icon: Picture},
            {id: 'demo', name: 'demo-track.mp3', description: '6.8 MB · Jul 27', icon: MusicNote},
            {id: 'photo', name: 'photo-2026.jpg', description: '3.1 MB · Jul 05', icon: Camera},
            {
                id: 'presentation',
                name: 'presentation.pdf',
                description: '9.7 MB · Jun 30',
                icon: FileText,
            },
        ],
    },
];

export const RangeSelection: Story = {
    render: function RangeSelectionStory() {
        const [sel, setSel] = React.useState<string[]>([]);
        return (
            <Flex direction="column" gap={2}>
                <Text color="secondary" qa="range-selection-count">
                    {sel.length} selected
                </Text>
                <List
                    aria-label="Files"
                    items={fileEntries}
                    style={{width: 320}}
                    getItemContent={(entry) => entry.name}
                    selectionMode="multiple"
                    selectedIds={sel}
                    onSelectedUpdate={setSel}
                    renderItem={(ctx, {getItemProps, getItemViewProps}) =>
                        ctx.kind === 'section' ? (
                            <List.SectionHeader {...getItemProps()}>
                                {ctx.item.name}
                            </List.SectionHeader>
                        ) : (
                            <List.ItemView
                                {...getItemProps()}
                                {...getItemViewProps()}
                                startContent={
                                    ctx.item.icon ? (
                                        <Icon data={ctx.item.icon} size={16} />
                                    ) : undefined
                                }
                                description={ctx.item.description}
                            >
                                {ctx.item.name}
                            </List.ItemView>
                        )
                    }
                />
            </Flex>
        );
    },
};

// К7. Десятки тысяч строк: слой виртуализации + слой выделения (независимы).
// ListVirtualizer пока не экспортируется из пакета (обкатка в лабе);
// наружу слой уедет отдельным энтрипоинтом
interface LogRecord {
    id: string;
    message: string;
    description?: string;
}

const logRecords: LogRecord[] = Array.from({length: 10_000}, (_, index) => ({
    id: `log-${index}`,
    message: `${String(index).padStart(5, '0')} · ${faker.hacker.phrase()}`,
    // строки переменной высоты: у каждой пятой — description
    description: index % 5 === 0 ? faker.hacker.ingverb() : undefined,
}));

// Полный исходник примера для панели Code: по умолчанию сторибук показывает
// только тело render — примеры вынесены в самодостаточные файлы-компоненты,
// и Code собирается из их сырцов (компонент + адаптер-хук), копируется как есть
const exampleSource = (files: Array<[name: string, code: string]>) =>
    files.map(([name, code]) => `// ─────────── ${name} ───────────\n\n${code}`).join('\n');

// К8. Реордер (dnd-либа потребителя). Референс №1 — pragmatic-drag-and-drop:
// «полная» форма адаптера §8 (props через ref-регистрацию строк + состояние
// одним пропом dnd)
export const Reorder: Story = {
    render: () => <ReorderPragmaticExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['ReorderPragmaticExample.tsx', reorderPragmaticCode],
                    ['usePragmaticListDnd.ts', usePragmaticListDndCode],
                ]),
            },
        },
    },
};

// Референс №2 — dnd-kit: «state-only» адаптер + per-item хук useSortable
// в компоненте строки потребителя через renderItem
export const ReorderDndKit: Story = {
    render: () => <ReorderDndKitExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['ReorderDndKitExample.tsx', reorderDndKitCode],
                    ['useDndKitListDnd.ts', useDndKitListDndCode],
                ]),
            },
        },
    },
};

// dnd-kit × виртуализация — штатный рецепт dnd-kit для virtual-списков:
// DragOverlay летит за курсором, оригинал на время drag прячется (соседи
// закрывают его слот превью-сдвигом) и переживает выгрузку из окна
// (детали — в шапке примера)
export const ReorderDndKitVirtualized: Story = {
    render: () => <ReorderDndKitVirtualizedExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['ReorderDndKitVirtualizedExample.tsx', reorderDndKitVirtualizedCode],
                    ['useDndKitListDnd.ts', useDndKitListDndCode],
                ]),
            },
        },
    },
};

// Целевой кейс миграции со старого List — @hello-pangea/dnd: композиционная
// интеграция по образцу старого List (детали и цена — в шапке примера)
export const ReorderHelloPangea: Story = {
    render: () => <ReorderHelloPangeaExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['ReorderHelloPangeaExample.tsx', reorderHelloPangeaCode],
                    ['useHelloPangeaListDnd.ts', useHelloPangeaListDndCode],
                ]),
            },
        },
    },
};

// hello-pangea × виртуализация — модель virtual-режима старого List
// (mode="virtual" + renderClone; детали — в шапке примера)
export const ReorderHelloPangeaVirtualized: Story = {
    render: () => <ReorderHelloPangeaVirtualizedExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['ReorderHelloPangeaVirtualizedExample.tsx', reorderHelloPangeaVirtualizedCode],
                    ['useHelloPangeaListDnd.ts', useHelloPangeaListDndCode],
                ]),
            },
        },
    },
};

// pragmatic × виртуализация: та же интеграция одним пропом dnd поверх окна строк
export const ReorderVirtualized: Story = {
    render: () => <ReorderPragmaticVirtualizedExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['ReorderPragmaticVirtualizedExample.tsx', reorderPragmaticVirtualizedCode],
                    ['usePragmaticListDnd.ts', usePragmaticListDndCode],
                ]),
            },
        },
    },
};

// Ось роль-модели (§15 плана): в строках есть интерактив — список
// переключается на grid-роли, где кнопка внутри строки валидна и достижима
// с клавиатуры (`←`/`→` — вход в интерактив ячейки и возврат на строку)
export const InteractiveRows: Story = {
    render: function InteractiveRowsStory() {
        const [tasks, setTasks] = React.useState(commands);
        return (
            <List
                role="grid"
                aria-label="Tasks"
                items={tasks}
                style={{width: 280}}
                getItemContent={(task) => task.title}
                renderItem={(ctx, {getItemProps, getItemViewProps, getCellProps}) => (
                    <List.ItemView
                        {...getItemProps()}
                        {...getItemViewProps()}
                        endContent={
                            // Интерактив живёт в ячейке: role="row" обязан
                            // владеть ячейками, а внутри gridcell кнопка
                            // валидна (в role="option" — нет)
                            <span {...getCellProps()}>
                                <Button
                                    view="flat"
                                    size="s"
                                    // Grid — один tab-stop: кнопка ячейки
                                    // достижима ←/→, а не Tab'ом
                                    tabIndex={-1}
                                    aria-label={`Delete ${ctx.item.title}`}
                                    onClick={() =>
                                        setTasks((prev) =>
                                            prev.filter((task) => task.id !== ctx.id),
                                        )
                                    }
                                >
                                    <Icon data={TrashBin} size={14} />
                                </Button>
                            </span>
                        }
                    >
                        <span {...getCellProps()}>{ctx.content}</span>
                    </List.ItemView>
                )}
            />
        );
    },
};

// Ось стратегии фокуса (§15 плана): DOM-фокус остаётся в инпуте, активную
// строку показывает aria-activedescendant (детали — в шапке примера)
export const Combobox: Story = {
    render: () => <ComboboxExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([['ComboboxExample.tsx', comboboxCode]]),
            },
        },
    },
};

export const Virtualized: Story = {
    render: function VirtualizedStory() {
        const [sel, setSel] = React.useState<string[]>([]);
        return (
            <ListVirtualizer<LogRecord>
                estimateItemSize={(ctx) => (ctx.item.description ? 56 : 36)}
                measure
            >
                {/* корень List — скролл-контейнер: потребитель ОБЯЗАН ограничить высоту */}
                <List
                    aria-label="Logs"
                    style={{height: 480, width: 500}}
                    items={logRecords}
                    getItemTextValue={(record) => record.message}
                    selectionMode="single"
                    selectedIds={sel}
                    onSelectedUpdate={setSel}
                    renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                        <List.ItemView
                            {...getItemProps()}
                            {...getItemViewProps()}
                            description={ctx.item.description}
                        >
                            {ctx.item.message}
                        </List.ItemView>
                    )}
                />
            </ListVirtualizer>
        );
    },
};
