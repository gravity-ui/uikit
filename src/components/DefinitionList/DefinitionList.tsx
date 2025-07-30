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
    nameWidth,
    definitionWidth,
    direction = 'horizontal',
    nameMaxWidth,
    contentMaxWidth,
    className,
    children,
    qa,
    ...restProps
}: DefinitionListProps) {
    const normalizedChildren = prepareChildren(children);

    // Deprecation warning
    if (responsive) {
        warnOnce(
            '[DefinitionList] The "responsive" prop is deprecated. Use nameWidth="max" instead.',
        );
    }

    // Handle backward compatibility: responsive maps to nameWidth="max"
    const effectiveNameWidth = nameWidth || (responsive ? 'max' : undefined);

    return (
        <DefinitionListProvider
            direction={direction}
            nameMaxWidth={nameMaxWidth}
            contentMaxWidth={contentMaxWidth}
        >
            <dl
                {...filterDOMProps(restProps, {labelable: true})}
                className={b(
                    {
                        responsive,
                        'name-width': effectiveNameWidth,
                        'definition-width': definitionWidth,
                        vertical: direction === 'vertical',
                    },
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
