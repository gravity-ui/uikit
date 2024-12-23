import * as React from 'react';

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
    placement?: PopupPlacement;
    className?: string;
    children?: React.ReactNode;
}

export function HelpMark({
    buttonRef,
    buttonProps = {},
    children,
    className,
    ...rest
}: HelpMarkProps) {
    return (
        <Popover {...rest} delayClosing={300} className={b(null, className)} content={children}>
            {() => (
                <button
                    ref={buttonRef}
                    type="button"
                    {...buttonProps}
                    className={b('button', buttonProps.className)}
                >
                    <Icon data={CircleQuestion} size={ICON_SIZE} />
                </button>
            )}
        </Popover>
    );
}
