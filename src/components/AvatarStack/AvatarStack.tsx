import * as React from 'react';

import {block} from '../utils/cn';

import {AvatarStackItem} from './AvatarStackItem';
import {AvatarStackMore} from './AvatarStackMore';
import {AvatarStackMoreButton} from './AvatarStackMoreButton';
import {AVATAR_STACK_DEFAULT_MAX} from './constants';
import type {AvatarStackProps} from './types';

import './AvatarStack.scss';

const b = block('avatar-stack');

// Default style for more button item
const DEFAULT_MORE_BUTTON_STYLE = {zIndex: 0};

const AvatarStackComponent = React.forwardRef<HTMLUListElement, AvatarStackProps>(
    (
        {
            max = AVATAR_STACK_DEFAULT_MAX,
            total,
            overlapSize = 's',
            size,
            children,
            className,
            renderMore,
        },
        ref,
    ) => {
        const visibleItems: React.ReactElement[] = [];

        /** All avatars amount */
        const normalizedTotal = total ? Math.max(total, max) : React.Children.count(children);

        /** Amount avatars to be visible (doesn't include badge with remaining avatars) */
        let normalizedMax = max < 1 ? 1 : max;
        // Skip rendering badge with +1, just show avatar instead
        normalizedMax = normalizedTotal - normalizedMax > 1 ? normalizedMax : normalizedTotal;

        /** Remaining avatars */
        const moreItems = normalizedTotal - normalizedMax;

        React.Children.forEach(children, (child) => {
            if (!React.isValidElement(child)) {
                return;
            }

            const item = (
                <AvatarStackItem
                    key={visibleItems.length}
                    style={{zIndex: normalizedMax - visibleItems.length}}
                >
                    {child}
                </AvatarStackItem>
            );

            if (visibleItems.length < normalizedMax) {
                visibleItems.push(item);
            }
        });

        const hasMoreButton = moreItems > 0;

        return (
            // Safari remove role=list with some styles, applied to li items, so we need
            // to restore role manually
            // eslint-disable-next-line jsx-a11y/no-redundant-roles
            <ul className={b({'overlap-size': overlapSize}, className)} role={'list'} ref={ref}>
                {visibleItems}
                {hasMoreButton ? (
                    <AvatarStackItem key="more-button" style={DEFAULT_MORE_BUTTON_STYLE}>
                        {renderMore ? (
                            renderMore({count: moreItems})
                        ) : (
                            <AvatarStackMore count={moreItems} size={size} />
                        )}
                    </AvatarStackItem>
                ) : null}
            </ul>
        );
    },
);

AvatarStackComponent.displayName = 'AvatarStack';

export const AvatarStack = Object.assign(AvatarStackComponent, {
    More: AvatarStackMore,
    MoreButton: AvatarStackMoreButton,
});
