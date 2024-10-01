import type React from 'react';

import {block} from '../utils/cn';

export const b = block('definition-list');

export function isUnbreakableOver(limit: number) {
    return function (value: string): boolean {
        const posibleLines = value.split(/\s+/);

        return posibleLines.some((line) => line.length > limit);
    };
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
