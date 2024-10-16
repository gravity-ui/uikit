import type React from 'react';

export function isUnbreakableOver(limit: number) {
    return function (value: string): boolean {
        const posibleLines = value.split(/\s+/);

        return posibleLines.some((line) => line.length > limit);
    };
}

export function getTitle(content?: React.ReactNode) {
    if (typeof content === 'string' || typeof content === 'number') {
        return String(content);
    }

    return undefined;
}
