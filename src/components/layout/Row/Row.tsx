'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {Grid, minmax, repeat} from '../Grid/Grid';
import type {GridProps} from '../Grid/Grid';
import type {LayoutComponentProps} from '../types';

import './Row.scss';

const b = block('row');

export interface RowProps<T extends React.ElementType = 'div'>
    extends Omit<GridProps<T>, 'columns'> {}

/** A 12-track CSS Grid. Use gap, rowGap, and columnGap for spacing. */
export const Row = React.forwardRef<HTMLDivElement, RowProps>(function Row(
    {className, ...props},
    ref,
) {
    return (
        <Grid
            {...props}
            className={b(null, className)}
            columns={repeat(12, minmax(0, '1fr'))}
            ref={ref}
        />
    );
}) as (<C extends React.ElementType = 'div'>(
    props: LayoutComponentProps<C, RowProps<C>>,
) => React.ReactElement) & {displayName: string};
