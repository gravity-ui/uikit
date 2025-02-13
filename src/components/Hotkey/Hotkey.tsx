'use client';

import * as React from 'react';

import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {defsByPlatform} from './definitions';
import {parseKeyGroups} from './parse';
import type {Platform} from './types';
import {isMac} from './utils';

import './Hotkey.scss';

const b = block('hotkey');

const Spaces = {
    BetweenGroups: String.fromCharCode(160), // &nbsp;
    BetweenKeys: String.fromCharCode(8239), // Narrow No-Break Space
};

export interface HotkeyProps extends AriaLabelingProps, DOMProps, QAProps {
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

export const Hotkey = React.forwardRef<HTMLElement, HotkeyProps>(function Hotkey(props, ref) {
    const {value, platform, view = 'light', qa, style, className, ...restProps} = props;

    const groups = parseHotkeys(value, {platform});
    const content: React.ReactNode[] = [];

    let hasGroups = false;
    groups.forEach((keys, groupIdx) => {
        if (keys.length === 0) return;
        if (hasGroups) {
            content.push(Spaces.BetweenGroups);
        } else {
            hasGroups = true;
        }
        keys.forEach((key, keyIdx) => {
            const isFirstKey = keyIdx === 0;
            if (!isFirstKey) {
                content.push(
                    Spaces.BetweenKeys,
                    <span key={`${key}_${groupIdx}_${keyIdx}_plus`} className={b('plus')}>
                        +
                    </span>,
                    Spaces.BetweenKeys,
                );
            }
            content.push(<kbd key={`${key}_${groupIdx}_${keyIdx}`}>{key}</kbd>);
        });
    });

    if (content.length === 0) return null;

    return (
        <kbd
            {...filterDOMProps(restProps, {labelable: true})}
            ref={ref}
            style={style}
            data-qa={qa}
            className={b({view}, className)}
        >
            {content}
        </kbd>
    );
});

export function parseHotkeys(value: string, opts: {platform?: Platform}): string[][] {
    const platform: Platform = opts.platform ?? (isMac() ? 'mac' : 'pc');
    const defs = defsByPlatform[platform];
    return parseKeyGroups(defs, value);
}
