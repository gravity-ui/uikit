import * as React from 'react';

import {CircleQuestion} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {Popover} from '../Popover';
import type {PopoverProps} from '../Popover';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {ICON_SIZE_MAP} from './constants';

import './HelpMark.scss';

const b = block('help-mark');

type IconSize = keyof typeof ICON_SIZE_MAP;

export interface HelpMarkProps extends QAProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: IconSize;
    popoverProps?: Omit<PopoverProps, 'children'>;
    children?: React.ReactNode;
}

export const HelpMark = React.forwardRef<HTMLButtonElement, HelpMarkProps>(
    function HelpMark(rawProps, ref) {
        const {
            children,
            qa,
            className,
            size = 'm',
            popoverProps,
            ...restProps
        } = useDefaultProps('HelpMark', rawProps);
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
                    className={b({size}, className)}
                    data-qa={qa}
                >
                    <Icon data={CircleQuestion} size={ICON_SIZE_MAP[size]} className={b('icon')} />
                </button>
            </Popover>
        );
    },
);
