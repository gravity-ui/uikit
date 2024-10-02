import React from 'react';

import {CircleQuestion} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {Popover} from '../Popover';
import type {PopupPlacement} from '../Popup';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './HelpMark.scss';

const b = block('help-mark');
const ICON_SIZE = 16;

export interface HelpMarkProps extends QAProps {
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    delayClosing?: number;
    placement?: PopupPlacement;
    className?: string;
    children?: React.ReactNode;
}

export function HelpMark({
    buttonRef,
    buttonProps = {},
    children,
    className,
    delayClosing = 300,
    ...rest
}: HelpMarkProps) {
    return (
        <Popover
            {...rest}
            delayClosing={delayClosing}
            className={b(null, className)}
            content={children}
        >
            <button
                ref={buttonRef}
                type="button"
                {...buttonProps}
                className={b('button', buttonProps.className)}
            >
                <Icon data={CircleQuestion} size={ICON_SIZE} />
            </button>
        </Popover>
    );
}
