import React from 'react';

import {Avatar} from '../Avatar';
import {block} from '../utils/cn';

import {AvatarStackItem} from './AvatarStackItem';
import {AvatarStackMoreButton} from './AvatarStackMoreButton';
import i18n from './i18n';
import type {AvatarStackProps} from './types';

import './AvatarStack.scss';

const b = block('avatar-stack');

const AvatarStackComponent = ({
    max = 3,
    overlapSize = 's',
    size,
    children,
    className,
    renderMoreButton,
}: AvatarStackProps) => {
    const visibleItems: React.ReactElement[] = [];
    let moreItems = 0;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
            return;
        }

        const item = <AvatarStackItem key={visibleItems.length}>{child}</AvatarStackItem>;

        if (visibleItems.length <= max) {
            visibleItems.unshift(item);
        } else {
            moreItems += 1;
        }
    });

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
                    {renderMoreButton ? (
                        renderMoreButton({count: moreItems})
                    ) : (
                        <Avatar
                            text={`+${moreItems}`}
                            aria-label={i18n('more', {count: moreItems})}
                            size={size}
                        />
                    )}
                </AvatarStackItem>
            ) : null}
            {normalOverflow ? visibleItems.slice(0, max) : visibleItems}
        </ul>
    );
};

AvatarStackComponent.displayName = 'AvatarStack';

export const AvatarStack = Object.assign(AvatarStackComponent, {MoreButton: AvatarStackMoreButton});
