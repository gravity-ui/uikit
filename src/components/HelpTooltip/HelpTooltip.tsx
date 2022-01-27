import React from 'react';

import {block} from '../utils/cn';
import {Tooltip, TooltipProps} from '../Tooltip';
import {Icon} from '../Icon';
import {QuestionMarkIcon} from '../icons/QuestionMarkIcon';

import './HelpTooltip.scss';

const b = block('help-tooltip');

/**
 * @see {@link https://github.com/microsoft/TypeScript/issues/28339}
 */
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export type HelpTooltipProps = DistributiveOmit<TooltipProps, 'children'>;

export function HelpTooltip(props: HelpTooltipProps) {
    return (
        <Tooltip offset={{left: 4}} {...props} className={b(null, props.className)}>
            <Icon data={QuestionMarkIcon} size={16} />
        </Tooltip>
    );
}
