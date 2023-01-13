import React, {ReactNode} from 'react';
import {block} from '../utils/cn';
import {Hotkey, HotkeyProps} from '../Hotkey';
import {Tooltip, TooltipProps} from '../Tooltip';

import './ActionTooltip.scss';

const b = block('action-tooltip');

export interface ActionTooltipProps
    extends Pick<
        TooltipProps,
        'children' | 'disabled' | 'placement' | 'openDelay' | 'closeDelay' | 'className'
    > {
    title: string;
    hotkey?: HotkeyProps['value'];
    description?: ReactNode;
}

export const ActionTooltip: React.FC<ActionTooltipProps> = function TooltipLayout(props) {
    const {title, hotkey, description, children, ...tooltipProps} = props;

    return (
        <Tooltip
            {...tooltipProps}
            className={b(null, tooltipProps.className)}
            contentClassName={b('layout')}
            content={
                <>
                    <div className={b('heading')}>
                        <div className={b('title')}>{title}</div>
                        {hotkey && <Hotkey view="dark" value={hotkey} className={b('hotkey')} />}
                    </div>
                    {description && <div className={b('description')}>{description}</div>}
                </>
            }
        >
            {children}
        </Tooltip>
    );
};
