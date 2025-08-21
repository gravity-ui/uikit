import * as React from 'react';

import {filterDOMProps} from '../utils/filterDOMProps';
import {isOfType} from '../utils/isOfType';
import {warnOnce} from '../utils/warn';

import {DefinitionListProvider} from './components/DefinitionListContext';
import {DefinitionListItem} from './components/DefinitionListItem';
import {b} from './constants';
import type {DefinitionListProps} from './types';

import './DefinitionList.scss';

export function DefinitionList({
    responsive,
    direction = 'horizontal',
    nameMaxWidth,
    contentMaxWidth,
    className,
    children,
    qa,
    ...restProps
}: DefinitionListProps) {
    const normalizedChildren = prepareChildren(children);
    const withCopy = normalizedChildren.some((item) => item.props.copyText);

    return (
        <DefinitionListProvider
            direction={direction}
            nameMaxWidth={nameMaxWidth}
            contentMaxWidth={contentMaxWidth}
        >
            <dl
                {...filterDOMProps(restProps, {labelable: true})}
                className={b(
                    {responsive, vertical: direction === 'vertical', 'with-copy': withCopy},
                    className,
                )}
                data-qa={qa}
            >
                {normalizedChildren}
            </dl>
        </DefinitionListProvider>
    );
}

const isDefinitionListItem = isOfType(DefinitionListItem);

function prepareChildren(children: React.ReactNode) {
    const items = React.Children.toArray(children);

    const normalizedItems = [];
    for (const item of items) {
        const isItem = isDefinitionListItem(item);
        if (isItem) {
            normalizedItems.push(item);
        } else {
            warnOnce(
                '[DefinitionList] Only <DefinitionList.Item> components is allowed as children',
            );
        }
    }
    return normalizedItems;
}

DefinitionList.Item = DefinitionListItem;
DefinitionList.displayName = 'DefinitionList';
