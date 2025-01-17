import * as React from 'react';

import {CircleQuestion} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {Popover} from '../Popover';
import type {PopoverProps} from '../Popover';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './HelpMark.scss';

const b = block('help-mark');
const ICON_SIZE = 16;

export interface HelpMarkProps extends QAProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    popoverProps?: Omit<PopoverProps, 'children'>;
    children?: React.ReactNode;
}

export const HelpMark = React.forwardRef<HTMLButtonElement, HelpMarkProps>(function HelpMark(
    {children, qa, className, popoverProps, ...restProps},
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
                <Icon data={CircleQuestion} size={ICON_SIZE} />
            </button>
        </Popover>
    );
});
