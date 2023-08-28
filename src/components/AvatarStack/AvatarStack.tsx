import React from 'react';

import {blockNew} from '../utils/cn';

import {AvatarStackMoreButton} from './AvatarStackMoreButton';
import type {AvatarStackProps} from './types';

import './AvatarStack.scss';

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

const AvatarStackComponent = <T extends object>({
    displayCount = 2,
    overlapSize = 's',
    className,
    items,
    renderItem,
    renderMore,
}: AvatarStackProps<T>) => {
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
                <li key={'show-more'} className={b('item', {'overlap-size': overlapSize})}>
                    {renderMore(restItems)}
                </li>
            ) : null}

            {visibleItems.map((item, index) => (
                <li key={index} className={b('item', {'overlap-size': overlapSize})}>
                    {renderItem(item, {itemClassName: b('item-children')})}
                </li>
            ))}
        </ul>
    );
};

AvatarStackComponent.displayName = 'AvatarStack';

export const AvatarStack = Object.assign(AvatarStackComponent, {MoreButton: AvatarStackMoreButton});
