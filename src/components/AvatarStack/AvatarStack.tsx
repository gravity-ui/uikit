import React from 'react';

import {block} from '../utils/cn';
import {isOfType} from '../utils/isOfType';

import {AvatarStackItem} from './AvatarStackItem';
import {AvatarStackMoreButton} from './AvatarStackMoreButton';
import type {AvatarStackProps} from './types';

import './AvatarStack.scss';

const b = block('avatar-stack');

const isMoreButton = isOfType(AvatarStackMoreButton);

const AvatarStackComponent = ({overlapSize = 's', children, className}: AvatarStackProps) => {
    const moreButton: React.ReactElement[] = [];
    const visibleItems: React.ReactElement[] = [];

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
        } else {
            visibleItems.unshift(item);
        }
    });

    return (
        // Safari remove role=list with some styles, applied to li items, so we need
        // to restore role manually
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul className={b({'overlap-size': overlapSize}, className)} role={'list'}>
            {moreButton}
            {visibleItems}
        </ul>
    );
};

AvatarStackComponent.displayName = 'AvatarStack';

export const AvatarStack = Object.assign(AvatarStackComponent, {MoreButton: AvatarStackMoreButton});
