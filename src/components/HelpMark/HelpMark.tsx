import React from 'react';

import {CircleQuestion} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import type {PopoverProps} from '../Popover';
import {Popover} from '../Popover';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './HelpMark.scss';

const b = block('help-mark');
const ICON_SIZE = 16;

export interface HelpMarkProps extends Omit<PopoverProps, 'children'>, QAProps {
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}

export function HelpMark(props: HelpMarkProps) {
    return (
        <Popover {...props} className={b(null, props.className)}>
            <button
                ref={props.buttonRef}
                type="button"
                {...props.buttonProps}
                className={b('button', props.buttonProps?.className)}
            >
                <Icon data={CircleQuestion} size={ICON_SIZE} />
            </button>
        </Popover>
    );
}
