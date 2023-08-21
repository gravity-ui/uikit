import React from 'react';

import {blockNew} from '../utils/cn';

import {ImageStackMoreButton} from './ImageStackMoreButton';

import './ImageStack.scss';

export interface Props<T extends {pk: string}> {
    items: T[];
    renderItem(item: T, options: {itemClassName: string}): React.ReactNode;
    renderMore(items: T[]): React.ReactNode;
    /** Amount of items that should be visible */
    displayCount?: number;
    className?: string;
}

const b = blockNew('image-stack');

function getSplitIndex<T>(items: T[], displayCount: number) {
    return displayCount + 1 < items.length ? displayCount : items.length;
}

function getVisibleItems<T>(items: T[], displayCount: number) {
    return items.slice(0, getSplitIndex(items, displayCount)).reverse();
}

function getRestItems<T>(items: T[], displayCount: number) {
    return items.slice(getSplitIndex(items, displayCount));
}

const ImageStackComponent = <T extends {pk: string}>({
    displayCount = 2,
    className,
    items,
    renderItem,
    renderMore,
}: Props<T>) => {
    const [visibleItems, setVisibleItems] = React.useState(() =>
        getVisibleItems(items, displayCount),
    );
    const [restItems, setRestItems] = React.useState(() => getRestItems(items, displayCount));

    React.useEffect(() => {
        setVisibleItems(getVisibleItems(items, displayCount));
        setRestItems(getRestItems(items, displayCount));
    }, [displayCount, items]);

    if (!items.length) {
        return null;
    }

    return (
        <ul className={b(null, className)}>
            {restItems.length > 0 ? (
                <li key={'show-more'} className={b('item')}>
                    {renderMore(restItems)}
                </li>
            ) : null}

            {visibleItems.map((item) => (
                <li key={item.pk} className={b('item')}>
                    {renderItem(item, {itemClassName: b('item-children')})}
                </li>
            ))}
        </ul>
    );
};

ImageStackComponent.displayName = 'ImageStack';

export const ImageStack = Object.assign(ImageStackComponent, {MoreButton: ImageStackMoreButton});
