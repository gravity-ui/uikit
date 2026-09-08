'use client';

import * as React from 'react';

import {block} from '../../../utils/cn';
import {SheetQa} from '../../constants';
import type {VeilHandlers} from '../../hooks/useVeil';

import './SheetVeil.scss';

const b = block('sheet-veil');

export interface SheetVeilProps extends VeilHandlers {
    /** Ref to the veil element (shared with the parent, which drives its opacity). */
    veilRef: React.Ref<HTMLDivElement>;
    /** Enables the opacity transition. */
    withTransition?: boolean;
    /** Class name for the veil element. */
    className?: string;
}

export function SheetVeil({
    veilRef,
    withTransition,
    className,
    onClick,
    onTransitionEnd,
}: SheetVeilProps) {
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
}
