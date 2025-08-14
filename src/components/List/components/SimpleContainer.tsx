'use client';

import * as React from 'react';

import type {DroppableProvided} from '@hello-pangea/dnd';

import type {ListItem} from './ListItem';

export type SimpleContainerProps = React.PropsWithChildren<{
    itemCount: number;
    provided?: DroppableProvided;
    onScrollToItem?: (node: HTMLElement) => boolean;
}>;

type RefsList = Record<number, React.RefObject<ListItem>>;

export type SimpleContainerState = {
    refsList: RefsList;
};

function getRefs(count: number) {
    return Array.from({length: count}).reduce<RefsList>((acc, _, index) => {
        acc[index] = React.createRef();
        return acc;
    }, {});
}

export class SimpleContainer extends React.Component<SimpleContainerProps, SimpleContainerState> {
    static getDerivedStateFromProps(
        {itemCount}: SimpleContainerProps,
        prevState: SimpleContainerState,
    ) {
        const refsCount = Object.keys(prevState.refsList).length;
        if (itemCount === refsCount) {
            return prevState;
        } else {
            return {
                refsList: getRefs(itemCount),
            };
        }
    }

    node: HTMLDivElement | null = null;

    constructor(props: SimpleContainerProps) {
        super(props);
        this.state = {
            refsList: getRefs(props.itemCount),
        };
    }

    render() {
        const children = React.Children.map(this.props.children, (child, index) =>
            React.cloneElement(child as React.ReactElement, {ref: this.state.refsList[index]}),
        );

        return <div ref={this.setRef}>{children}</div>;
    }

    scrollToItem(index: number) {
        const listItem = this.state.refsList[index]?.current;

        if (listItem && typeof listItem.getNode === 'function') {
            const node = listItem.getNode();

            if (node) {
                if (!this.props.onScrollToItem?.(node)) {
                    node.scrollIntoView?.({block: 'nearest'});
                }
            }
        }
    }

    private setRef = (node: HTMLDivElement) => {
        this.node = node;
        this.props.provided?.innerRef(node);
    };
}
