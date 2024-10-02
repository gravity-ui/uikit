import React from 'react';

import {isOfType} from '../utils/isOfType';

import {DefinitionListProvider} from './components/DefinitionListContext';
import {DefinitionListItem} from './components/DefinitionListItem';
import type {DefinitionListProps} from './types';
import {b} from './utils';

import './DefinitionList.scss';

export function DefinitionList({
    responsive,
    direction = 'horizontal',
    nameMaxWidth,
    contentMaxWidth,
    className,
    children,
    qa,
}: DefinitionListProps) {
    const normalizedChildren = prepareChildren(children);
    return (
        <div
            className={b({responsive, vertical: direction === 'vertical'}, className)}
            data-qa={qa}
        >
            <DefinitionListProvider
                direction={direction}
                nameMaxWidth={nameMaxWidth}
                contentMaxWidth={contentMaxWidth}
            >
                <dl className={b('list')}>{normalizedChildren}</dl>
            </DefinitionListProvider>
        </div>
    );
}

const isDefinitionListItem = isOfType(DefinitionListItem);

function prepareChildren(children: React.ReactNode) {
    const items = React.Children.toArray(children);

    for (const item of items) {
        const isItem = isDefinitionListItem(item);
        if (!isItem) {
            throw new Error(
                'Only <DefinitionList.Item> components is allowed inside <DefinitionList>',
            );
        }
    }
    return children;
}

DefinitionList.Item = DefinitionListItem;
DefinitionList.displayName = 'DefinitionList';
