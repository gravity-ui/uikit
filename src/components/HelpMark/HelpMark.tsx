import * as React from 'react';

import {CircleQuestion} from '@gravity-ui/icons';

import type {IconProps} from '../Icon';
import {Icon} from '../Icon';
import {Popover} from '../Popover';
import type {PopoverProps} from '../Popover';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './HelpMark.scss';

const b = block('help-mark');

export interface HelpMarkProps extends QAProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconProps?: Omit<IconProps, 'data'>;
    popoverProps?: Omit<PopoverProps, 'children'>;
    children?: React.ReactNode;
}

export const HelpMark = React.forwardRef<HTMLButtonElement, HelpMarkProps>(function HelpMark(
    {children, qa, className, popoverProps, iconProps, ...restProps},
    ref,
) {
    return (
        <Popover
            content={<div className={b('popover')}>{children}</div>}
            hasArrow
            {...popoverProps}
        >
            <button
                {...restProps}
                ref={ref}
                type="button"
                className={b(null, className)}
                data-qa={qa}
            >
                <Icon data={CircleQuestion} className={b('icon')} {...iconProps} />
            </button>
        </Popover>
    );
});
