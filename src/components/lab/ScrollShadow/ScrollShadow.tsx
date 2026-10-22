'use client';

import * as React from 'react';

import {useForkRef} from '../../../hooks';
import type {DOMProps, QAProps} from '../../types';

import {useScrollShadow} from './useScrollShadow';

export type ScrollShadowAxis = 'block' | 'inline' | 'both';
export type ScrollShadowPosition = 'start' | 'end' | 'both';

export interface ScrollShadowProps
    extends DOMProps,
        QAProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
    /**
     * Logical axis whose scroll state controls the fade.
     * @default 'block'
     */
    axis?: ScrollShadowAxis;
    /**
     * Logical edge on the selected axis where a fade can appear.
     * @default 'both'
     */
    position?: ScrollShadowPosition;
    /**
     * Hides the fades without disabling native scrolling.
     * @default false
     */
    disabled?: boolean;
}

export const ScrollShadow = React.forwardRef<HTMLDivElement, ScrollShadowProps>(
    function ScrollShadow(
        {
            axis = 'block',
            position = 'both',
            disabled = false,
            className,
            children,
            onScroll,
            qa,
            tabIndex,
            ...restProps
        },
        forwardedRef,
    ) {
        const innerRef = React.useRef<HTMLDivElement>(null);
        const ref = useForkRef(innerRef, forwardedRef);
        const shadow = useScrollShadow({ref: innerRef, axis, position, disabled});

        const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
            shadow.onScroll();
            onScroll?.(event);
        };

        return (
            <div
                data-qa={qa}
                {...restProps}
                ref={ref}
                className={`${shadow.className}${className ? ` ${className}` : ''}`}
                tabIndex={tabIndex === undefined && shadow.state.hasOverflow ? 0 : tabIndex}
                onScroll={handleScroll}
            >
                {children}
            </div>
        );
    },
);

ScrollShadow.displayName = 'ScrollShadow';
