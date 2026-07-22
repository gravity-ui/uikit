import * as React from 'react';

import {ChartColumn, Folder, FolderOpen} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {ListContainer} from '../components/ListContainer';
import {ListItemExpandIcon} from '../components/ListItemExpandIcon';
import {ListItemView} from '../components/ListItemView';
import {useList} from '../hooks/useList';
import {useListKeydown} from '../hooks/useListKeydown';
import type {ListTreeItemType} from '../types';
import {getItemRenderState} from '../utils/getItemRenderState';
import {getListItemClickHandler} from '../utils/getListItemClickHandler';

/*
 * A folder tree assembled from the `useList` primitives, matching the Platform
 * navigation tree in Figma. Anatomy of a single row (height 28, internal gap 4):
 *
 *   [ indent ][ chevron 16 ][ entity icon 24 ][ label ]
 *
 * - indent: 8px per nesting level (Figma "Basics/Indent", Level 0..7 = 0/8/16/24...);
 * - chevron: a fixed 16px box placed BEFORE the icon (Figma "Basics/Arrow").
 *   Expanded folders point the chevron down, collapsed ones point right. Leaf
 *   rows keep the empty 16px box so every entity icon stays aligned;
 * - entity icon: a 24px box with a 16px glyph — Folder / FolderOpen for folders,
 *   ChartColumn for leaves;
 * - label: Text/Body 1.
 */

// px added to the indent per nesting level (Figma "Basics/Indent" step).
const INDENT_STEP = 8;
// Figma tree item height.
const ROW_HEIGHT = 28;

type TreeItemData = {
    title: string;
};

const treeItems: ListTreeItemType<TreeItemData>[] = [
    {
        data: {title: 'Sales analytics'},
        expanded: true,
        children: [
            {data: {title: 'Revenue overview'}},
            {data: {title: 'Regional breakdown'}},
            {
                data: {title: 'Forecasts'},
                expanded: true,
                children: [{data: {title: 'Demand forecast'}}, {data: {title: 'Seasonality'}}],
            },
        ],
    },
    {
        data: {title: 'Marketing'},
        expanded: false,
        children: [{data: {title: 'Campaign performance'}}, {data: {title: 'Conversion funnel'}}],
    },
    {
        data: {title: 'Operations'},
        expanded: true,
        children: [
            {
                data: {title: 'Logistics'},
                expanded: false,
                children: [
                    {data: {title: 'Delivery times'}},
                    {data: {title: 'Route optimization'}},
                ],
            },
            {data: {title: 'Inventory levels'}},
        ],
    },
    {data: {title: 'Executive summary'}},
];

interface TreeItemContentProps {
    title: string;
    /** 0-based nesting depth */
    level: number;
    /** whether the item is a folder (has children) */
    expandable: boolean;
    expanded?: boolean;
}

const TreeItemContent = ({title, level, expandable, expanded}: TreeItemContentProps) => {
    let icon = ChartColumn;
    if (expandable) {
        icon = expanded ? FolderOpen : Folder;
    }

    return (
        <Flex alignItems="center" gap="1" grow style={{minWidth: 0}}>
            {/* Indent grows 8px per level; kept as a real 0-width node at root so
                the gap before the chevron is constant across all levels. */}
            <span aria-hidden style={{flexShrink: 0, width: level * INDENT_STEP}} />

            {/* Chevron slot — always 16px wide so folder/leaf icons stay aligned. */}
            <Flex width={16} height={16} justifyContent="center" alignItems="center" shrink="0">
                {expandable ? <ListItemExpandIcon behavior="state" expanded={expanded} /> : null}
            </Flex>

            {/* Entity icon — 24px box with a 16px glyph. */}
            <Flex width={24} height={24} justifyContent="center" alignItems="center" shrink="0">
                <Icon data={icon} size={16} />
            </Flex>

            <Flex grow alignItems="center" style={{minWidth: 0}}>
                <Text variant="body-1" ellipsis>
                    {title}
                </Text>
            </Flex>
        </Flex>
    );
};

const FolderTree = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const list = useList({items: treeItems});
    const onItemClick = getListItemClickHandler({list});

    useListKeydown({containerRef, onItemClick, list});

    return (
        <Flex width={320} direction="column">
            <ListContainer
                list={list}
                containerRef={containerRef}
                extraProps={{'aria-label': 'Analytics navigation'}}
                renderItem={(id) => {
                    const {data, props, context} = getItemRenderState({
                        id,
                        onItemClick,
                        list,
                        mapItemDataToContentProps: (item) => ({title: item.title}),
                    });

                    const expandable = Boolean(context.childrenIds);

                    return (
                        <ListItemView
                            {...props}
                            height={ROW_HEIGHT}
                            selectionViewType="single"
                            content={
                                <TreeItemContent
                                    title={data.title}
                                    level={context.indentation}
                                    expandable={expandable}
                                    expanded={list.state.expandedById?.[id]}
                                />
                            }
                        />
                    );
                }}
            />
        </Flex>
    );
};

export default {
    title: 'Lab/useList/TreeWithFolders',
    component: FolderTree,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'label',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<typeof FolderTree>;

const Template: StoryFn = () => <FolderTree />;

export const TreeWithFolders = Template.bind({});
