import React from 'react';

import {block} from '../utils/cn';
import {isOfType} from '../utils/isOfType';

import {AvatarStackItem} from './AvatarStackItem';
import {AvatarStackMoreButton} from './AvatarStackMoreButton';
import i18n from './i18n';
import type {AvatarStackProps} from './types';

import './AvatarStack.scss';

const b = block('avatar-stack');

const isMoreButton = isOfType(AvatarStackMoreButton);

const AvatarStackComponent = ({
    max = 3,
    overlapSize = 's',
    children,
    className,
}: AvatarStackProps) => {
    const moreButton: React.ReactElement[] = [];
    const visibleItems: React.ReactElement[] = [];
    let moreItems = 0;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
            return;
        }

        const isButton = isMoreButton(child);
        const item = (
            <AvatarStackItem
                key={isButton ? `more-button-${moreButton.length}` : visibleItems.length}
            >
                {child}
            </AvatarStackItem>
        );

        if (isButton) {
            moreButton.push(item);
        } else if (visibleItems.length <= max) {
            visibleItems.unshift(item);
        } else {
            moreItems += 1;
        }
    });

    const hasMoreButton = moreItems > 0;
    /** Avatars + more button, or just avatars, when avatars count is equal to `max` or less */
    const normalOverflow = moreItems >= 1;

    if (!moreButton.length && hasMoreButton) {
        const guessedSize = visibleItems[0]?.props.children.props.size;
        moreButton.push(
            <AvatarStackMoreButton
                key="more-button"
                size={guessedSize}
                count={moreItems + 1}
                aria-label={i18n('more')}
            />,
        );
    }

    return (
        // Safari remove role=list with some styles, applied to li items, so we need
        // to restore role manually
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul className={b({'overlap-size': overlapSize}, className)} role={'list'}>
            {hasMoreButton ? moreButton : null}
            {normalOverflow ? visibleItems.slice(0, max) : visibleItems}
        </ul>
    );
};

AvatarStackComponent.displayName = 'AvatarStack';

export const AvatarStack = Object.assign(AvatarStackComponent, {MoreButton: AvatarStackMoreButton});
