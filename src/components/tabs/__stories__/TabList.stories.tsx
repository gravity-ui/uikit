import * as React from 'react';

import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {DropResult} from '@hello-pangea/dnd';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Tooltip} from '../../Tooltip';
import {Tab} from '../Tab';
import {TabList} from '../TabList';
import {TabPanel} from '../TabPanel';
import {TabProvider} from '../TabProvider';
import type {TabListProps, TabProps} from '../types';

import {getTabsMock} from './getTabsMock';

export default {
    title: 'Components/Navigation/TabList',
    component: TabList,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-required-children',
                        enabled: false,
                        selector: '[id^="wrapped"]',
                    },
                    {
                        id: 'aria-required-parent',
                        enabled: false,
                        selector: '[id^="wrapped"]',
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof TabList>;

const DefaultRender = (args: TabListProps) => {
    const [tab, setTab] = React.useState(getTabsMock({})[0].value);
    return <TabList {...args} value={tab} onUpdate={setTab} />;
};

export const Default: Story = {
    render: DefaultRender,
    args: {
        children: getTabsMock({})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const ActivateOnFocus: Story = {
    ...Default,
    args: {
        ...Default.args,
        activateOnFocus: true,
        children: getTabsMock({})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const Icon: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withIcon: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const Counter: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withCounter: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const Label: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withLabel: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const CustomWidth: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({})?.map((props, i) => (
            <Tab key={i} {...props} style={{width: '50px'}} />
        )),
    },
};

export const Link: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withLink: true})?.map((props, i) => <Tab key={i} {...props} />),
    },
};

export const CustomChildren: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withCustomChildren: true})?.map((props, i) => (
            <Tab key={i} {...props} />
        )),
    },
};

export const TooltipWrap: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: getTabsMock({withTitle: false})?.map(({value, ...props}, i) => (
            <Tooltip key={i} content={`I'm a tooltip for ${value}!`}>
                <Tab value={value} {...props} />
            </Tooltip>
        )),
    },
};

const contentOverflowValues: Array<TabListProps['contentOverflow']> = [
    'wrap',
    'collapse',
    'scroll',
];

export const ContentOverflow: Story = {
    ...Default,
    render: (args) => (
        <Showcase direction="column">
            {contentOverflowValues.map((value) => (
                <ShowcaseItem key={value} title={`Content Overflow: ${value}`}>
                    <DefaultRender style={{maxWidth: 600}} {...args} contentOverflow={value} />
                </ShowcaseItem>
            ))}
        </Showcase>
    ),
};

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

/**
 * `renderTabs` is a library-agnostic seam: `TabList` computes the visible tabs (respecting
 * `contentOverflow`) and hands them here to be wrapped in the DnD library of your choice.
 * The collapsed tabs are still rendered as plain `<Tab>` in the overflow menu.
 */
const DragAndDropRender = (args: TabListProps) => {
    const [tabs, setTabs] = React.useState<TabProps[]>(() => getTabsMock({}));
    const [value, setValue] = React.useState(tabs[0].value);

    // `renderTabs` receives only the visible tabs, so drag indexes are relative to them.
    // Capture the visible order here and reorder by value on drop (works with `collapse` too).
    const shownValuesRef = React.useRef<string[]>([]);

    const onDragEnd = ({destination, draggableId}: DropResult) => {
        if (!destination) {
            return;
        }
        const toValue = shownValuesRef.current[destination.index];
        setTabs((prev) => {
            const from = prev.findIndex((tab) => tab.value === draggableId);
            const to = prev.findIndex((tab) => tab.value === toValue);
            return from === -1 || to === -1 ? prev : reorder(prev, from, to);
        });
    };

    return (
        <div className="tabs-dnd-story">
            {/*
              dnd renders `provided.placeholder` with the same tag as the dragged item.
              Tab is a button, so the placeholder is a button too and picks up the
              browser's default button styling (grey box + border) — reset it.
            */}
            <style>{`
                .tabs-dnd-story [data-rfd-placeholder-context-id] {
                    -webkit-appearance: none;
                    appearance: none;
                    border: 0;
                    background: transparent;
                    padding: 0;
                }
            `}</style>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tab-list" direction="horizontal">
                    {(droppableProvided) => (
                        <TabList
                            {...args}
                            ref={droppableProvided.innerRef}
                            value={value}
                            onUpdate={setValue}
                            {...droppableProvided.droppableProps}
                            renderTabs={(shown) => {
                                shownValuesRef.current = shown.map(
                                    (tab) => (tab.props as TabProps).value,
                                );
                                return (
                                    <React.Fragment>
                                        {shown.map((tab, index) => (
                                            <Draggable
                                                key={tab.key ?? index}
                                                draggableId={String((tab.props as TabProps).value)}
                                                index={index}
                                                // Tab renders an interactive button/link, and dnd
                                                // blocks drag start from interactive elements.
                                                disableInteractiveElementBlocking
                                            >
                                                {(draggableProvided) =>
                                                    React.cloneElement(tab, {
                                                        ref: draggableProvided.innerRef,
                                                        ...draggableProvided.draggableProps,
                                                        ...draggableProvided.dragHandleProps,
                                                    } as Partial<TabProps> & React.Attributes)
                                                }
                                            </Draggable>
                                        ))}
                                        {droppableProvided.placeholder}
                                    </React.Fragment>
                                );
                            }}
                        >
                            {tabs.map((tab) => (
                                <Tab key={tab.value} {...tab} />
                            ))}
                        </TabList>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export const DragAndDrop: Story = {
    render: DragAndDropRender,
};

export const DragAndDropCollapse: Story = {
    render: DragAndDropRender,
    args: {
        contentOverflow: 'collapse',
        style: {maxWidth: 400},
    },
};

export const Panels: Story = {
    render: (args) => {
        const tabs = getTabsMock({});

        const [tab, setTab] = React.useState(tabs[0].value);

        const panels = React.useMemo(
            () =>
                tabs.map((props, i) => (
                    <TabPanel key={i} value={props.value}>
                        <div
                            style={{marginTop: '10px'}}
                        >{`Content of ${props.value} tab panel`}</div>
                    </TabPanel>
                )),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [],
        );

        return (
            <TabProvider value={tab} onUpdate={setTab}>
                <TabList {...args}>
                    {tabs.map((props, i) => (
                        <Tab key={i} {...props} />
                    ))}
                </TabList>
                <div>{panels}</div>
            </TabProvider>
        );
    },
};
