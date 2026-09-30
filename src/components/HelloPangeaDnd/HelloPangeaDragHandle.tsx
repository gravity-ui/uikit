'use client';

import * as React from 'react';

import {Grip} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import i18n from './i18n';

import './HelloPangeaDnd.scss';

const b = block('hello-pangea-dnd');

export interface HelloPangeaDragHandleProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'tabIndex'>,
        QAProps {
    /** default: "Drag to reorder"; none on a decorative handle (`aria-hidden`) */
    'aria-label'?: string;
    /** default: the grip icon */
    children?: React.ReactNode;
}

/**
 * The drag handle of a row: spread the `handleProps` of `getHelloPangeaRowProps` on it. Out of the
 *  tab order (grid contract, ←/→ reach it); decorative with `aria-hidden`
 */
export const HelloPangeaDragHandle = React.forwardRef<HTMLSpanElement, HelloPangeaDragHandleProps>(
    function HelloPangeaDragHandle({className, children, qa, ...props}, ref) {
        const decorative = props['aria-hidden'] === true || props['aria-hidden'] === 'true';
        return (
            <span
                {...props}
                ref={ref}
                tabIndex={decorative ? undefined : -1}
                aria-label={
                    decorative ? undefined : (props['aria-label'] ?? i18n('label_drag-handle'))
                }
                className={b('handle', className)}
                data-qa={qa}
            >
                {children ?? <Icon data={Grip} size={12} />}
            </span>
        );
    },
);
