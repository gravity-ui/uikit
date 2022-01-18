import React from 'react';
import _range from 'lodash/range';
import {ListItem} from './ListItem';

export interface SimpleContainerProps {
    itemCount: number;
}

export type SimpleContainerState = Record<number, React.RefObject<ListItem>>;

function getRefs(count: number) {
    return _range(count).reduce((acc, index) => {
        acc[index] = React.createRef();
        return acc;
    }, {} as SimpleContainerState);
}

export class SimpleContainer extends React.Component<SimpleContainerProps, SimpleContainerState> {
    static getDerivedStateFromProps(
        {itemCount}: SimpleContainerProps,
        prevState: SimpleContainerState,
    ) {
        const refsCount = Object.keys(prevState).length;
        if (itemCount === refsCount) {
            return prevState;
        } else {
            return getRefs(itemCount);
        }
    }

    constructor(props: SimpleContainerProps) {
        super(props);
        this.state = getRefs(props.itemCount);
    }

    render() {
        const children = React.Children.map(this.props.children, (child, index) =>
            React.cloneElement(child as React.ReactElement, {ref: this.state[index]}),
        );
        return <div>{children}</div>;
    }

    scrollToItem(index: number) {
        const listItem = this.state[index]?.current;

        if (listItem && typeof listItem.getRef === 'function') {
            const ref = listItem.getRef();
            if (ref.current) {
                ref.current.scrollIntoView({
                    block: 'nearest',
                });
            }
        }
    }
}
