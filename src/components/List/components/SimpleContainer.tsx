import React from 'react';

import _range from 'lodash/range';
import type {DroppableProvided} from 'react-beautiful-dnd';

import type {ListItem} from './ListItem';

export type SimpleContainerProps = React.PropsWithChildren<{
    itemCount: number;
    provided?: DroppableProvided;
    sortable?: boolean;
}>;

type RefsList = Record<number, React.RefObject<ListItem>>;

export type SimpleContainerState = {
    refsList: RefsList;
};

function getRefs(count: number) {
    return _range(count).reduce((acc, index) => {
        acc[index] = React.createRef();
        return acc;
    }, {} as RefsList);
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
                node.scrollIntoView?.({block: 'nearest'});
            }
        }
    }

    private setRef = (node: HTMLDivElement) => {
        this.node = node;
        this.props.provided?.innerRef(node);
    };
}
