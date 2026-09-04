import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {
    ArrowUpRightFromSquare,
    CircleCheck,
    Clock,
    Envelope,
    Star,
    TrashBin,
    TriangleExclamation,
} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Avatar} from '../../../Avatar';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Label} from '../../../Label';
import {Text} from '../../../Text';
import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import {useListFocusOwner} from '../useListFocusOwner';

import {DragAndDropHelloPangeaExample} from './DragAndDropHelloPangeaExample';
import dragAndDropHelloPangeaCode from './DragAndDropHelloPangeaExample?raw';
import {DragAndDropHelloPangeaVirtualizedExample} from './DragAndDropHelloPangeaVirtualizedExample';
import dragAndDropHelloPangeaVirtualizedCode from './DragAndDropHelloPangeaVirtualizedExample?raw';
import {exampleSource} from './exampleSource';

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

// A sandbox: the main props and the items themselves are editable in the
// Controls panel. String items need no configuration at all — the content and
// the id of such an item are the string itself
const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Kotlin'];

interface PlaygroundArgs {
    items: string[];
    size: 's' | 'm' | 'l' | 'xl';
    activateOnHover: boolean;
    selectionMode: 'none' | 'single' | 'multiple';
    defaultSelectedIds: string[];
    role: 'listbox' | 'grid';
    defaultActiveItemId: string;
    'aria-label': string;
}

export const Default: StoryObj<PlaygroundArgs> = {
    render: function DefaultStory(args) {
        const {items, selectionMode, defaultSelectedIds, defaultActiveItemId, ...rest} = args;
        return (
            <List
                // Remount when the uncontrolled settings change: the selection
                // layer, defaultSelectedIds and defaultActiveItemId are read
                // once, on mount
                key={`${selectionMode}|${defaultActiveItemId}|${defaultSelectedIds.join()}`}
                {...rest}
                // 'none' is expressed by the absence of the prop — otherwise
                // the layer would be turned on. The selection props travel
                // together with it: alone they would be silently ignored (and
                // warned about in dev)
                {...(selectionMode === 'none' ? undefined : {selectionMode, defaultSelectedIds})}
                defaultActiveItemId={defaultActiveItemId || undefined}
                items={items}
                onItemAction={action('onItemAction')}
                onActiveItemUpdate={action('onActiveItemUpdate')}
            />
        );
    },
    args: {
        items: languages,
        size: 'm',
        activateOnHover: true,
        selectionMode: 'none',
        defaultSelectedIds: [],
        role: 'listbox',
        defaultActiveItemId: '',
        'aria-label': 'Languages',
    },
    argTypes: {
        items: {
            control: 'object',
            description: 'The data of the list — strings here, so no getters are needed',
        },
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
            description: 'The row size (the density of the list)',
        },
        activateOnHover: {
            control: 'boolean',
            description: 'Whether hovering a row makes it active',
        },
        selectionMode: {
            control: 'radio',
            options: ['none', 'single', 'multiple'],
            description: 'The selection layer: `none` means the prop is not passed at all',
        },
        defaultSelectedIds: {
            control: 'object',
            description: 'The initially selected ids (requires a selection mode)',
        },
        role: {
            control: 'radio',
            options: ['listbox', 'grid'],
            description: 'The ARIA role model: `grid` is for rows with interactive content',
        },
        defaultActiveItemId: {
            control: 'text',
            description: 'Programmatic activation: the dark cursor (keyboard modality)',
        },
        'aria-label': {
            control: 'text',
            description: 'The accessible name of the list (or use `aria-labelledby`)',
        },
    },
};

// The four row sizes. The size is passed to the row view (its height, paddings
// and typography) and is the source of the default height estimate of the
// virtualization layer
const sizes = ['s', 'm', 'l', 'xl'] as const;

export const Sizes: Story = {
    render: () => (
        <Flex gap={8}>
            {sizes.map((size) => (
                <Flex key={size} direction="column" gap={2}>
                    <Text color="secondary" variant="caption-2">
                        {size}
                    </Text>
                    <List aria-label={`Languages, size ${size}`} size={size} items={languages} />
                </Flex>
            ))}
        </Flex>
    ),
};

// A list of actions (the core, no selection layer). The semantics are listbox
// (a screen reader announces "option"); role="menu" will come with the
// migration of Menu
const commands = [
    {id: 'copy', title: 'Copy'},
    {id: 'paste', title: 'Paste'},
    {id: 'duplicate', title: 'Duplicate'},
    {id: 'delete', title: 'Delete'},
];

export const Actions: Story = {
    render: function ActionsStory() {
        const [currentId, setCurrentId] = React.useState<string>();
        return (
            <Flex direction="column" gap={2} style={{width: 240}}>
                <List
                    aria-label="Actions"
                    items={commands}
                    getItemContent={(command) => command.title}
                    onItemAction={setCurrentId}
                />
                <Text color="secondary" qa="applied-item-id">
                    You applied item ID: {currentId}
                </Text>
            </Flex>
        );
    },
};

// Sections come from the data: an item that has children is rendered as a
// header followed by its options
const documents = [
    {
        id: 'recent',
        name: 'Recent',
        children: [
            {id: 'report', name: 'Annual report'},
            {id: 'plan', name: 'Marketing plan'},
        ],
    },
    {
        id: 'all',
        name: 'All',
        children: [
            {id: 'backlog', name: 'Backlog'},
            {id: 'sync', name: 'Team sync'},
        ],
    },
];

export const Sections: Story = {
    render: () => (
        <List
            aria-label="Documents"
            items={documents}
            style={{width: 240}}
            getItemContent={(item) => item.name}
        />
    ),
};

// The content of a row is a node, not only text — but whatever the getter
// returns lands in the children of the row, and a non-string content leaves
// typeahead without a query, so it comes with getItemTextValue
const services = [
    {id: 'api', name: 'API gateway', healthy: true},
    {id: 'database', name: 'Database', healthy: false},
    {id: 'cdn', name: 'CDN', healthy: true},
];

export const ItemContent: Story = {
    render: () => (
        <List
            aria-label="Services"
            items={services}
            style={{width: 240}}
            getItemContent={(service) => (
                <Flex gap={2} alignItems="center">
                    <Icon
                        data={service.healthy ? CircleCheck : TriangleExclamation}
                        size={14}
                        style={{
                            color: service.healthy
                                ? 'var(--g-color-text-positive)'
                                : 'var(--g-color-text-warning)',
                        }}
                    />
                    {service.name}
                </Flex>
            )}
            getItemTextValue={(service) => service.name}
        />
    ),
};

// Level 2 of the content: the slots of the row view. `renderItem` plus
// `List.ItemView` gives the standard anatomy of a row (a leading icon, a
// description, trailing content) without writing any markup — the DOM and a11y
// props still come from `getItemProps`, and the state of the row from
// `getItemViewProps`
const mailboxes = [
    {id: 'inbox', name: 'Inbox', description: 'Unread first', icon: Envelope, count: 24},
    {id: 'starred', name: 'Starred', description: 'Flagged by you', icon: Star, count: 3},
    {id: 'snoozed', name: 'Snoozed', description: 'Back later today', icon: Clock, count: 1},
    {id: 'trash', name: 'Trash', description: 'Cleared every 30 days', icon: TrashBin, count: 0},
];

export const ItemSlots: Story = {
    render: () => (
        <List
            aria-label="Mailboxes"
            items={mailboxes}
            style={{width: 300}}
            getItemTextValue={(box) => box.name}
            renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                <List.ItemView
                    {...getItemProps()}
                    {...getItemViewProps()}
                    startContent={<Icon data={ctx.item.icon} size={16} />}
                    description={ctx.item.description}
                    endContent={<Label theme="normal">{ctx.item.count}</Label>}
                >
                    {ctx.item.name}
                </List.ItemView>
            )}
        />
    ),
};

// Level 3 of the content: markup of your own. Nothing of the row view is
// inherited — the row looks the way you draw it, and the states of the row are
// yours to show as well: here the active one is an outline rather than a
// background
const users = [
    {id: 'ada', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Engineer'},
    {id: 'alan', name: 'Alan Turing', email: 'alan@example.com', role: 'Researcher'},
    {id: 'grace', name: 'Grace Hopper', email: 'grace@example.com', role: 'Manager'},
];

export const CustomMarkup: Story = {
    render: function CustomMarkupStory() {
        const [hoveredId, setHoveredId] = React.useState<string | null>(null);
        return (
            <List
                aria-label="Teammates"
                items={users}
                style={{gap: 8, width: 260}}
                getItemTextValue={(user) => user.name}
                renderItem={(ctx, {getItemProps}) => (
                    <div
                        {...getItemProps({
                            onPointerEnter: () => setHoveredId(ctx.id),
                            onPointerLeave: () => setHoveredId(null),
                        })}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: 12,
                            borderRadius: 12,
                            cursor: 'pointer',
                            // The keyboard cursor is drawn the way the
                            // default row draws it: under the mouse, and once
                            // the list has lost the focus, the outline does
                            // not stay behind
                            outline: `2px solid var(${
                                ctx.state.active && ctx.state.cursorVisible
                                    ? '--g-color-line-brand'
                                    : '--g-color-line-generic'
                            })`,
                            // The hover of your own markup is yours: an app
                            // usually leaves it to the CSS `:hover`
                            backgroundColor:
                                hoveredId === ctx.id
                                    ? 'var(--g-color-base-simple-hover)'
                                    : undefined,
                        }}
                    >
                        <Avatar text={ctx.item.name} size="l" />
                        <Flex direction="column">
                            <Text variant="subheader-1">{ctx.item.name}</Text>
                            <Text color="secondary" variant="caption-2">
                                {ctx.item.role}
                            </Text>
                        </Flex>
                    </div>
                )}
            />
        );
    },
};

// Rows as links: the row itself is the anchor, which is what gives the browser
// affordances — the URL in the status bar, "Open in new tab" in the context
// menu, a middle click. Activation stays with the list: Enter is intercepted by
// the keyboard machinery, so navigation lives in `onItemAction` — the same
// place a router `navigate()` would go.
//
// A screen reader announces such a row as an option, not as a link:
// `role="option"` overrides the role of the anchor. Everything the user has to
// know therefore belongs to the accessible name of the row — here it carries
// the warning that the link opens a new tab, which the icon only shows visually
const specs = [
    {
        id: 'listbox',
        name: 'ARIA listbox pattern',
        description: 'w3.org',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
    },
    {
        id: 'grid',
        name: 'ARIA grid pattern',
        description: 'w3.org',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
    },
    {
        id: 'components',
        name: 'Gravity UI components',
        description: 'gravity-ui.com',
        href: 'https://gravity-ui.com/components',
    },
];

export const Links: Story = {
    render: () => (
        <List
            aria-label="Specifications"
            items={specs}
            style={{width: 300}}
            getItemTextValue={(spec) => spec.name}
            onItemAction={(_id, spec, event) => {
                // A click is navigated by the browser itself, the modifiers
                // included (Ctrl/Cmd+click opens a background tab, Shift+click
                // a window); Enter is intercepted by the list, so the keyboard
                // navigates through the callback
                if ('key' in event) {
                    window.open(spec.href, '_blank', 'noopener,noreferrer');
                }
            }}
            renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                <List.ItemView
                    component="a"
                    href={ctx.item.href}
                    // The anchor says the same thing the callback does — every
                    // route out of the row (a click, Enter, the context menu, a
                    // middle click) opens the same new tab
                    target="_blank"
                    rel="noopener noreferrer"
                    {...getItemProps({
                        'aria-label': `${ctx.item.name}, opens in a new tab`,
                    })}
                    {...getItemViewProps()}
                    description={ctx.item.description}
                    endContent={<Icon data={ArrowUpRightFromSquare} size={14} />}
                >
                    {ctx.item.name}
                </List.ItemView>
            )}
        />
    ),
};

// Controlled activation: the active row is state of the consumer. `null` means
// "no active row" (`undefined` would mean uncontrolled), and programmatic
// activation is shown as the dark keyboard cursor — the modality of a fresh
// list is keyboard
export const ControlledActivation: Story = {
    render: function ControlledActivationStory() {
        const [activeItemId, setActiveItemId] = React.useState<string | null>(languages[1]);
        return (
            <Flex direction="column" gap={2} style={{width: 240}}>
                <Flex gap={2}>
                    <Button onClick={() => setActiveItemId(languages[0])}>First</Button>
                    <Button onClick={() => setActiveItemId(languages[languages.length - 1])}>
                        Last
                    </Button>
                    <Button onClick={() => setActiveItemId(null)}>None</Button>
                </Flex>
                <Text color="secondary" qa="controlled-active-id">
                    activeItemId: {String(activeItemId)}
                </Text>
                <List
                    aria-label="Languages"
                    items={languages}
                    activeItemId={activeItemId}
                    // Every gesture asks the consumer for the update instead of
                    // applying it: the list draws the value that came back, so
                    // a rejected update leaves the cursor where it was
                    onActiveItemUpdate={setActiveItemId}
                />
            </Flex>
        );
    },
};

// The selection layer: `single` replaces the selection, `multiple` toggles the
// item and adds the range gestures (Shift+click, Shift+arrows, Ctrl/Cmd+A)
export const SingleSelection: Story = {
    render: function SingleSelectionStory() {
        const [selectedIds, setSelectedIds] = React.useState<string[]>([languages[0]]);
        return (
            <List
                aria-label="Languages"
                items={languages}
                selectionMode="single"
                selectedIds={selectedIds}
                onSelectedUpdate={setSelectedIds}
            />
        );
    },
};

export const MultipleSelection: Story = {
    render: function MultipleSelectionStory() {
        const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
        return (
            <Flex direction="column" gap={2} style={{width: 240}}>
                <List
                    aria-label="Languages"
                    items={languages}
                    selectionMode="multiple"
                    selectedIds={selectedIds}
                    onSelectedUpdate={setSelectedIds}
                />
                {/* The range gestures are easier to follow with the value in
                    sight: Shift+click, Shift+↑/↓ and Ctrl/Cmd+A change it in
                    bulk */}
                <Text color="secondary" qa="selected-ids">
                    Selected: {selectedIds.join(', ') || 'nothing'}
                </Text>
            </Flex>
        );
    },
};

// Tens of thousands of rows. The rows are the ones the dnd examples use — every
// fourth title is long enough to wrap, so the window holds rows of different
// heights and the estimate is corrected by the measurement
interface TrackRecord {
    id: string;
    title: string;
}

const archive: TrackRecord[] = Array.from({length: 10_000}, (_, index) => ({
    id: `track-${index + 1}`,
    title: `${String(index + 1).padStart(5, '0')} · ${faker.music.songName()}${
        index % 4 === 0 ? ` (${faker.music.genre()} remaster — ${faker.company.catchPhrase()})` : ''
    }`,
}));

const getTrackContent = (record: TrackRecord) => record.title;

export const Virtualized: Story = {
    render: () => (
        <ListVirtualizer estimateItemSize={28}>
            {/* The List root is the scroll container: the consumer MUST limit its height */}
            <List
                aria-label="Archive"
                style={{height: 480, width: 400}}
                items={archive}
                getItemContent={getTrackContent}
            />
        </ListVirtualizer>
    ),
};

// The role model axis: the rows contain interactive content, so the list
// switches to the grid roles, where a button inside a row is valid and
// reachable with the keyboard (`←`/`→` enter the interactive content of a cell
// and return to the row)
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
                            // Interactive content lives in a cell: role="row"
                            // must own cells, and inside a gridcell a button
                            // is valid (inside role="option" it is not)
                            <span {...getCellProps()}>
                                <Button
                                    view="flat"
                                    size="s"
                                    // A grid is a single tab stop: the button
                                    // of a cell is reached with ←/→, not Tab
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

// Drag and drop with @hello-pangea/dnd — the recommended library: the
// integration is compositional (DragDropContext/Droppable around the list,
// Draggable inside renderItem), the state of the drag comes from
// useListHelloPangeaDnd, exported next to the list. The Code panel holds the
// complete source of the example. The same on top of other libraries lives in
// the "Drag and drop with other libraries" stories
export const DragAndDrop: Story = {
    render: () => <DragAndDropHelloPangeaExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    ['DragAndDropHelloPangeaExample.tsx', dragAndDropHelloPangeaCode],
                ]),
            },
        },
    },
};

// hello-pangea × virtualization — the model of the virtual mode of the old
// List (mode="virtual" plus renderClone; see the header of the example for the
// details)
export const DragAndDropVirtualized: Story = {
    render: () => <DragAndDropHelloPangeaVirtualizedExample />,
    parameters: {
        docs: {
            source: {
                language: 'tsx',
                code: exampleSource([
                    [
                        'DragAndDropHelloPangeaVirtualizedExample.tsx',
                        dragAndDropHelloPangeaVirtualizedCode,
                    ],
                ]),
            },
        },
    },
};

// The smallest example of `useListFocusOwner()`: the input owns the focus and
// the list below is driven from it — the arrows move the active row, Enter
// applies it, and typing filters the items. DOM focus never leaves the input;
// the active row is exposed through `aria-activedescendant`
const frameworks = ['React', 'Vue', 'Svelte', 'Solid', 'Angular', 'Qwik', 'Preact'];

const filterFrameworks = (query: string) => {
    const normalized = query.trim().toLowerCase();
    return frameworks.filter((name) => name.toLowerCase().includes(normalized));
};

export const FocusOwner: Story = {
    render: function FocusOwnerStory() {
        const [query, setQuery] = React.useState('');
        // The activity is controlled: null means "nothing is active"
        const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
        const focusOwner = useListFocusOwner();
        const {onKeyDown, ...inputProps} = focusOwner.getInputProps({'aria-label': 'Framework'});

        const handleQueryUpdate = (value: string) => {
            setQuery(value);
            // Typing is filtering rather than typeahead: the activity moves to
            // the first match, so Enter always applies what is visible
            setActiveItemId(filterFrameworks(value)[0] ?? null);
        };

        return (
            <Flex direction="column" gap={2} style={{width: 240}}>
                <TextInput
                    value={query}
                    onUpdate={handleQueryUpdate}
                    placeholder="Filter the frameworks"
                    controlProps={inputProps}
                    // TextInput sets its own onKeyDown AFTER spreading
                    // controlProps (it would overwrite the handler of the list
                    // with undefined) — so the keyboard is handed to it through
                    // a separate prop
                    onKeyDown={onKeyDown}
                />
                <List
                    focusOwner={focusOwner}
                    aria-label="Frameworks"
                    items={filterFrameworks(query)}
                    activeItemId={activeItemId}
                    onActiveItemUpdate={setActiveItemId}
                    onItemAction={(id) => setQuery(id)}
                />
            </Flex>
        );
    },
};
