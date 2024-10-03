import React from 'react';

import {block} from '../utils/cn';

import {AvatarStackItem} from './AvatarStackItem';
import {AvatarStackMore} from './AvatarStackMore';
import {AvatarStackMoreButton} from './AvatarStackMoreButton';
import type {AvatarStackProps} from './types';

import './AvatarStack.scss';

const b = block('avatar-stack');

const AvatarStackComponent = ({
    max = 3,
    total,
    overlapSize = 's',
    size,
    children,
    className,
    renderMore,
}: AvatarStackProps) => {
    const visibleItems: React.ReactElement[] = [];
    let moreItems = 0;
    const normalizedMax = max < 1 ? 1 : max;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
            return;
        }

        const item = <AvatarStackItem key={visibleItems.length}>{child}</AvatarStackItem>;

        if (visibleItems.length <= normalizedMax) {
            visibleItems.unshift(item);
        } else {
            moreItems += 1;
        }
    });

    moreItems = Math.max(moreItems, total ? total - normalizedMax : 0);

    const hasMoreButton = moreItems > 0;
    /** Avatars + more button, or just avatars, when avatars count is equal to `max` or less */
    const normalOverflow = moreItems >= 1;

    return (
        // Safari remove role=list with some styles, applied to li items, so we need
        // to restore role manually
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul className={b({'overlap-size': overlapSize}, className)} role={'list'}>
            {hasMoreButton ? (
                <AvatarStackItem key="more-button">
                    {renderMore ? (
                        renderMore({count: moreItems})
                    ) : (
                        <AvatarStackMore count={moreItems} size={size} />
                    )}
                </AvatarStackItem>
            ) : null}
            {normalOverflow ? visibleItems.slice(0, normalizedMax) : visibleItems}
        </ul>
    );
};

AvatarStackComponent.displayName = 'AvatarStack';

export const AvatarStack = Object.assign(AvatarStackComponent, {
    More: AvatarStackMore,
    MoreButton: AvatarStackMoreButton,
});
