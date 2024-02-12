import {faker} from '@faker-js/faker/locale/en';

import type {ListTreeItemType} from '../../types';

const RANDOM_WORDS = Array(50)
    .fill(null)
    .map(() => faker.person.fullName());

function base<T>(title: string): T {
    return {title} as T;
}

export function createRandomizedData<T = {title: string}>({
    num,
    depth = 3,
    getData,
}: {
    num: number;
    depth?: number;
    getData?: (title: string) => T;
}): ListTreeItemType<T>[] {
    const data = [];

    for (let i = 0; i < num; i++) {
        data.push(createRandomizedItem<T>(depth, getData));
    }

    return data;
}

function createRandomizedItem<T>(
    depth: number,
    getData: (title: string) => T = base,
): ListTreeItemType<T> {
    const item: ListTreeItemType<T> = {
        data: getData(RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)]),
    };

    const numChildren = depth > 0 ? Math.floor(Math.random() * 5) : 0;

    if (numChildren > 0) {
        item.children = [];
    }

    for (let i = 0; i < numChildren; i++) {
        if (item.children) {
            item.children.push(createRandomizedItem(depth - 1, getData));
        }
    }

    return item;
}
