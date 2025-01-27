import type {CnMods} from '../utils/cn';

import {progressBlock} from './constants';
import type {Stack} from './types';

export interface ProgressStackItemProps {
    item: Stack;
}

export function ProgressStackItem({item}: ProgressStackItemProps) {
    const {value, color, className, theme, title, content, loading} = item;
    const modifiers: CnMods = {
        loading,
    };

    if (typeof color === 'undefined') {
        modifiers.theme = theme || 'default';
    }

    if (Number.isFinite(value)) {
        return (
            <div
                className={progressBlock('item', modifiers, className)}
                style={{width: `${value}%`, backgroundColor: color}}
                title={title}
            >
                {content}
            </div>
        );
    }

    return null;
}
