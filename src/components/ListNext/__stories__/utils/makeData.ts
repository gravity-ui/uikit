import {faker} from '@faker-js/faker/locale/en';

import type {ListItemType} from '../../types';

const RANDOM_WORDS = Array(50)
    .fill(null)
    .map(() => faker.person.fullName());

export function createRandomizedData<T = {title: string}>(
    num = 1000,
    hasDepth = true,
    getData?: (title: string) => T,
): ListItemType<T>[] {
    const data = [];

    for (let i = 0; i < num; i++) {
        data.push(createRandomizedItem<T>(hasDepth ? 0 : 3, getData));
    }

    return data;
}

function base<T>(title: string): T {
    return {title} as T;
}

function createRandomizedItem<T>(
    depth: number,
    getData: (title: string) => T = base,
): ListItemType<T> {
    const item: ListItemType<T> = {
        data: getData(RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)]),
    };

    const numChildren = depth < 3 ? Math.floor(Math.random() * 5) : 0;

    if (numChildren > 0) {
        item.children = [];
    }

    for (let i = 0; i < numChildren; i++) {
        if (item.children) {
            item.children.push(createRandomizedItem(depth + 1, getData));
        }
    }

    return item;
}
