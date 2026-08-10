'use client';

import * as React from 'react';

import {block} from '../../../utils/cn';
import {SheetQa} from '../../constants';

import './SheetVeil.scss';

const b = block('sheet-veil');

export interface SheetVeilProps {
    /** Ref to the veil element (shared with the parent, which drives its opacity). */
    veilRef: React.RefObject<HTMLDivElement>;
    /** Enables the opacity transition. */
    withTransition?: boolean;
    /** Class name for the veil element. */
    className?: string;
    /** Guards interactions while an open/close animation is running. */
    isAnimatingRef: React.MutableRefObject<boolean>;
    /** Marks that a resize should be replayed after the closing animation finished. */
    delayedResizeRef: React.MutableRefObject<boolean>;
    /** Marks the veil as touched so transitions stay enabled during the hide. */
    setVeilTouched: (touched: boolean) => void;
    /** Starts the hiding animation. */
    hide: () => void;
    /** Unmounts the sheet once it is fully hidden. */
    hideSheet: () => void;
    /** Recomputes sizes after a delayed window resize. */
    onResizeWindow: () => void;
}

export const SheetVeil = ({
    veilRef,
    withTransition,
    className,
    isAnimatingRef,
    delayedResizeRef,
    setVeilTouched,
    hide,
    hideSheet,
    onResizeWindow,
}: SheetVeilProps) => {
    const getVeilOpacity = () => veilRef.current?.style.opacity || 0;

    const onClick = () => {
        if (isAnimatingRef.current) {
            return;
        }

        setVeilTouched(true);
        hide();
    };

    const onTransitionEnd = () => {
        isAnimatingRef.current = false;

        if (getVeilOpacity() === '0') {
            hideSheet();
            return;
        }

        if (delayedResizeRef.current) {
            onResizeWindow();
            delayedResizeRef.current = false;
        }
    };

    return (
        <div
            ref={veilRef}
            className={b({'with-transition': withTransition}, className)}
            onClick={onClick}
            onTransitionEnd={onTransitionEnd}
            role="presentation"
            data-qa={SheetQa.VEIL}
        />
    );
};
