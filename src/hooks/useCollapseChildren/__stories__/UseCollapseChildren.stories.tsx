import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Popover} from '../../../components';
import {cn} from '../../../components/utils/cn';
import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import type {UseCollapseChildrenProps} from '../useCollapseChildren';
import {useCollapseChildren} from '../useCollapseChildren';

import './UseCollapseChildren.stories.scss';

const b = cn('use-collapse-children-story');

const meta: Meta<UseCollapseChildrenProps> = {
    title: 'Hooks/useCollapseChildren',
    argTypes: {
        enabled: {
            type: 'boolean',
        },
        minCount: {
            type: 'number',
        },
        maxCount: {
            type: 'number',
        },
        direction: {
            control: 'radio',
            options: ['start', 'end'],
        },
        gap: {
            type: 'number',
        },
        childSelector: {
            type: 'string',
        },
    },
    args: {
        enabled: true,
        minCount: 1,
        direction: 'end',
        gap: 0,
        childSelector: '*',
    },
};

export default meta;

type Story = StoryObj<UseCollapseChildrenProps>;

const EXAMPLE_ITEMS = [
    {
        width: 100,
    },
    {
        width: 120,
    },
    {
        width: 160,
    },
    {
        width: 40,
    },
    {
        width: 100,
    },
    {
        width: 180,
        text: 'Long Long Long Long Long Long Long Text',
    },
];

export const Default: Story = {
    render: (args) => {
        const listRef = React.useRef<HTMLDivElement>(null);

        const {visibleCount} = useCollapseChildren({
            ...args,
            containerRef: listRef,
        });

        const items = EXAMPLE_ITEMS.map(({width, text}, i) => (
            <div key={i} className={b('item')} style={text ? undefined : {width}}>
                {text || width}
            </div>
        ));

        return (
            <div>
                <div ref={listRef} className={b('list')} style={{gap: `${args.gap}px`}}>
                    {args.direction === 'start'
                        ? items.slice(EXAMPLE_ITEMS.length - visibleCount)
                        : items.slice(0, visibleCount)}
                </div>
            </div>
        );
    },
};

function BreadcrumbsShowcase({args}: {args: UseCollapseChildrenProps}) {
    const listRef = React.useRef<HTMLDivElement>(null);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const moreRef = React.useRef<HTMLDivElement>(null);
    const currentRef = React.useRef<HTMLDivElement>(null);

    const {visibleCount, calculated} = useCollapseChildren({
        ...args,
        minCount: 1,
        containerRef: listRef,
        preservedRefs: [rootRef, moreRef],
        getChildWidth: (child) => {
            const width = child.getBoundingClientRect().width;
            return child === currentRef.current ? Math.min(width, 200) : width;
        },
    });

    let items = EXAMPLE_ITEMS.map(({width, text}, i) => (
        <div
            ref={i === EXAMPLE_ITEMS.length - 1 ? currentRef : undefined}
            key={i}
            className={b('item', {
                current: i === EXAMPLE_ITEMS.length - 1,
                calculating: i === EXAMPLE_ITEMS.length - 1 && !calculated,
            })}
            style={text ? undefined : {width}}
        >
            {text || width}
        </div>
    ));

    if (visibleCount < EXAMPLE_ITEMS.length) {
        const moreItems = EXAMPLE_ITEMS.slice(0, -visibleCount);
        const moreContent = (
            <div>
                {moreItems.map(({width}, i) => (
                    <div key={i} className={b('item')}>
                        {width}
                    </div>
                ))}
            </div>
        );

        items = items.slice(-visibleCount);
        items.unshift(
            <Popover key="more" content={moreContent} trigger="click">
                <div ref={moreRef} className={b('item', {more: true})}>
                    {moreItems.length} more
                </div>
            </Popover>,
        );
    }

    items.unshift(
        <div
            ref={rootRef}
            key="root"
            className={b('item', {
                root: true,
            })}
        >
            Root
        </div>,
    );

    return (
        <ShowcaseItem title="Breadcrumbs" className={b('showcase')}>
            <div ref={listRef} className={b('list')} style={{gap: `${args.gap}px`}}>
                {items}
            </div>
        </ShowcaseItem>
    );
}

function TabsShowcase({args}: {args: UseCollapseChildrenProps}) {
    const listRef = React.useRef<HTMLDivElement>(null);
    const moreRef = React.useRef<HTMLDivElement>(null);
    const activeRef = React.useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = React.useState(3);

    const {visibleCount, recalculate} = useCollapseChildren({
        ...args,
        minCount: 0,
        direction: 'end',
        containerRef: listRef,
        preservedRefs: [activeRef, moreRef],
        childSelector: `.${b('item')}`,
    });
    const visibleCountIncludingActive = visibleCount + 1;

    let content = EXAMPLE_ITEMS.map(({width}, i) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            ref={i === activeIndex ? activeRef : undefined}
            key={i}
            className={b('item', {active: i === activeIndex})}
            style={{width}}
            onClick={() => setActiveIndex(i)}
        >
            {width}
        </div>
    ));
    if (visibleCountIncludingActive < EXAMPLE_ITEMS.length) {
        const activeItem = content[activeIndex];
        content = content.slice(0, visibleCountIncludingActive);

        if (!content.includes(activeItem)) {
            content.splice(-1, 1, activeItem);
        }

        const moreItems = [];

        for (let i = EXAMPLE_ITEMS.length - 1; i >= 0; i--) {
            if (i !== activeIndex) {
                moreItems.push([EXAMPLE_ITEMS[i], i] as const);
            }

            if (moreItems.length === EXAMPLE_ITEMS.length - visibleCountIncludingActive) {
                break;
            }
        }

        moreItems.reverse();

        const moreContent = (
            <div>
                {moreItems.map(([{width}, i]) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div key={i} className={b('item')} onClick={() => setActiveIndex(i)}>
                        {width}
                    </div>
                ))}
            </div>
        );

        content.push(
            <Popover key="more" content={moreContent} trigger="click">
                <div ref={moreRef} className={b('item', {more: true})}>
                    {moreItems.length} more
                </div>
            </Popover>,
        );
    }

    React.useEffect(() => {
        recalculate();
    }, [recalculate, activeIndex]);

    return (
        <ShowcaseItem title="Tabs" className={b('showcase')}>
            <div ref={listRef} className={b('list')} style={{gap: `${args.gap}px`}}>
                {content}
            </div>
        </ShowcaseItem>
    );
}

export const ShowcaseStory: Story = {
    name: 'Showcase',
    render(args) {
        return (
            <Showcase className={b()} direction="column">
                <BreadcrumbsShowcase args={args} />
                <TabsShowcase args={args} />
            </Showcase>
        );
    },
};
