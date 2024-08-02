import type React from 'react';

import {block} from '../utils/cn';

import type {DefinitionListGroup, DefinitionListItem, DefinitionListSingleItem} from './types';

export const b = block('definition-list');

export function isUnbreakableOver(limit: number) {
    return function (value: string): boolean {
        const posibleLines = value.split(/\s+/);

        return posibleLines.some((line) => line.length > limit);
    };
}

export const isGroup = (item: DefinitionListItem): item is DefinitionListGroup =>
    'label' in item && !('name' in item);

export const onlySingleItems = (items: DefinitionListItem[]): items is DefinitionListSingleItem[] =>
    !items.some((el) => isGroup(el));

export function getAllItemsAsGroups(
    items: (DefinitionListSingleItem | DefinitionListGroup)[],
): DefinitionListGroup[] {
    const result: DefinitionListGroup[] = [];
    let temporaryList: DefinitionListSingleItem[] = [];
    for (const item of items) {
        if (isGroup(item)) {
            if (temporaryList.length) {
                result.push({items: temporaryList, label: null});
                temporaryList = [];
            }

            result.push(item);
        } else {
            temporaryList.push(item);
        }
    }
    if (temporaryList.length) {
        result.push({items: temporaryList, label: null});
        temporaryList = [];
    }
    return result;
}

export function getTitle(title?: string, content?: React.ReactNode) {
    if (title) {
        return title;
    }

    if (typeof content === 'string' || typeof content === 'number') {
        return String(content);
    }

    return undefined;
}
