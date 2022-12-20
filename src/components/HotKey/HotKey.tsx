import React, {ReactNode} from 'react';
import {block} from '../utils/cn';
import type {DOMProps, QAProps} from '../types';

import {Platform} from './types';
import {defsByPlatform} from './definitions';
import {parseKeyGroups} from './parse';
import {isMac} from './utils';

import './HotKey.scss';

const b = block('hotkey');

const Spaces = {
    NoBreakSpace: String.fromCharCode(160), // &nbsp;
    WordJoiner: String.fromCharCode(8288), // &NoBreak;
};

export interface HotKeyProps extends DOMProps, QAProps {
    /**
     * @example
     * 'mod+a mod+c mod+v'
     */
    value: string;
    /**
     * @default light
     */
    view?: 'light' | 'dark';
    platform?: Platform;
}

export const HotKey = React.forwardRef<HTMLElement, HotKeyProps>(function HotKey(props, ref) {
    const {value, platform, view = 'light', qa, style, className} = props;

    const groups = parseHotkeys(value, {platform});
    const content: ReactNode[] = [];

    let hasGroups = false;
    groups.forEach((keys, groupIdx) => {
        if (keys.length === 0) return;
        if (hasGroups) {
            content.push(Spaces.NoBreakSpace);
        } else {
            hasGroups = true;
        }
        keys.forEach((key, keyIdx) => {
            const isFirstKey = keyIdx === 0;
            if (!isFirstKey) {
                content.push(
                    Spaces.WordJoiner,
                    <span className={b('plus')}>+</span>,
                    Spaces.WordJoiner,
                );
            }
            content.push(<kbd key={`${key}_${groupIdx}_${keyIdx}`}>{key}</kbd>);
        });
    });

    if (content.length === 0) return null;

    return (
        <kbd ref={ref} style={style} data-qa={qa} className={b({view}, className)}>
            {content}
        </kbd>
    );
});

export function parseHotkeys(value: string, opts: {platform?: Platform}): string[][] {
    const platform: Platform = opts.platform ?? (isMac() ? 'mac' : 'pc');
    const defs = defsByPlatform[platform];
    return parseKeyGroups(defs, value);
}
