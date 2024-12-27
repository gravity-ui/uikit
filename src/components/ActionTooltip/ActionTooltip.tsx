'use client';

import * as React from 'react';

import {Hotkey} from '../Hotkey';
import type {HotkeyProps} from '../Hotkey';
import {Tooltip} from '../Tooltip';
import type {TooltipProps} from '../Tooltip';
import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './ActionTooltip.scss';

export interface ActionTooltipProps
    extends QAProps,
        DOMProps,
        Omit<TooltipProps, 'content' | 'role'> {
    /** Floating element title */
    title: string;
    /** Floating element description */
    description?: React.ReactNode;
    /** Floating element hotkey label */
    hotkey?: HotkeyProps['value'];
}

const b = block('action-tooltip');
const DEFAULT_OPEN_DELAY = 500;
const DEFAULT_CLOSE_DELAY = 0;

export function ActionTooltip({
    title,
    description,
    hotkey,
    openDelay = DEFAULT_OPEN_DELAY,
    closeDelay = DEFAULT_CLOSE_DELAY,
    className,
    ...restProps
}: ActionTooltipProps) {
    const content = React.useMemo(
        () => (
            <React.Fragment>
                <div className={b('heading')}>
                    <div className={b('title')}>{title}</div>
                    {hotkey && <Hotkey view="dark" value={hotkey} className={b('hotkey')} />}
                </div>
                {description && <div className={b('description')}>{description}</div>}
            </React.Fragment>
        ),
        [title, description, hotkey],
    );

    return (
        <Tooltip
            {...restProps}
            // eslint-disable-next-line jsx-a11y/aria-role
            role="label"
            content={content}
            openDelay={openDelay}
            closeDelay={closeDelay}
            className={b(null, className)}
        />
    );
}
