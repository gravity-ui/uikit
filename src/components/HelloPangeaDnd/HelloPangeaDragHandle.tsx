'use client';

import * as React from 'react';

import {Grip} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {block} from '../utils/cn';

import i18n from './i18n';

import './HelloPangeaDnd.scss';

const b = block('hello-pangea-dnd');

export interface HelloPangeaDragHandleProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * The accessible name of the handle. default: `aria-label` of the props, then "Drag to
     *  reorder"; none on a decorative handle (`aria-hidden`)
     */
    label?: string;
    /** default: the grip icon */
    children?: React.ReactNode;
}

/**
 * The drag handle of a row: spread `dragHandleProps` (or the `handleProps` of
 *  `getHelloPangeaRowProps`) on it. `tabIndex={-1}` is the grid contract — the list stays one tab
 *  stop and the handle is reached with ←/→; the library focuses it by its own data attribute
 */
export const HelloPangeaDragHandle = React.forwardRef<HTMLSpanElement, HelloPangeaDragHandleProps>(
    function HelloPangeaDragHandle({label, className, children, ...props}, ref) {
        return (
            <span
                {...props}
                ref={ref}
                tabIndex={-1}
                aria-label={
                    props['aria-hidden']
                        ? undefined
                        : (label ?? props['aria-label'] ?? i18n('label_drag-handle'))
                }
                className={b('handle', className)}
            >
                {children ?? <Icon data={Grip} size={12} />}
            </span>
        );
    },
);
