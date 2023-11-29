import React from 'react';

import {Hotkey} from '../Hotkey';
import type {HotkeyProps} from '../Hotkey';
import {Tooltip} from '../Tooltip';
import type {TooltipProps} from '../Tooltip';
import {block} from '../utils/cn';

import './ActionTooltip.scss';

const b = block('action-tooltip');

export interface ActionTooltipProps
    extends Pick<
        TooltipProps,
        'children' | 'disabled' | 'placement' | 'openDelay' | 'closeDelay' | 'className' | 'qa'
    > {
    title: string;
    hotkey?: HotkeyProps['value'];
    description?: React.ReactNode;
}

export function ActionTooltip(props: ActionTooltipProps) {
    const {title, hotkey, description, children, ...tooltipProps} = props;

    return (
        <Tooltip
            {...tooltipProps}
            className={b(null, tooltipProps.className)}
            contentClassName={b('layout')}
            content={
                <React.Fragment>
                    <div className={b('heading')}>
                        <div className={b('title')}>{title}</div>
                        {hotkey && <Hotkey view="dark" value={hotkey} className={b('hotkey')} />}
                    </div>
                    {description && <div className={b('description')}>{description}</div>}
                </React.Fragment>
            }
        >
            {children}
        </Tooltip>
    );
}
