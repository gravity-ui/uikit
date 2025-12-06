'use client';

import * as React from 'react';

import type {DOMProps} from '../../types';
import {block} from '../../utils/cn';
import {Box} from '../Box/Box';
import type {BoxProps} from '../Box/Box';
import {getSpacingValue, useStyleProps} from '../hooks/useStyleProps';
import type {StyleHandlers} from '../hooks/useStyleProps';
import type {
    AdaptiveProp,
    BoxAlignmentStyleProps,
    LayoutComponentProps,
    SpacingValue,
} from '../types';

import './Grid.scss';

const b = block('grid');

interface GridStyleProps extends BoxAlignmentStyleProps {
    /** Defines named grid areas. */
    areas?: AdaptiveProp<string[]>;
    /** Defines the sizes of each row in the grid. */
    rows?: AdaptiveProp<string | SpacingValue[]>;
    /** Defines the sizes of each column in the grid. */
    columns?: AdaptiveProp<string | SpacingValue[]>;
    /** Defines the size of implicitly generated columns. */
    autoColumns?: AdaptiveProp<SpacingValue>;
    /** Defines the size of implicitly generated rows. */
    autoRows?: AdaptiveProp<SpacingValue>;
    /** Controls how auto-placed items are flowed into the grid. */
    autoFlow?: AdaptiveProp<React.CSSProperties['gridAutoFlow']>;
}

const gridStyleHandlers: StyleHandlers<keyof GridStyleProps> = {
    areas: [
        'gridArea',
        (value: unknown) =>
            Array.isArray(value) ? value.map((v) => `"${v}"`).join('\n') : undefined,
    ],
    rows: ['gridTemplateRows', gridTemplateValue],
    columns: ['gridTemplateColumns', gridTemplateValue],
    autoColumns: ['gridAutoColumns', getSpacingValue],
    autoRows: ['gridAutoRows', getSpacingValue],
    autoFlow: ['gridAutoFlow'],

    justifyContent: ['justifyContent'],
    justifyItems: ['justifyItems'],
    alignItems: ['alignItems'],
    alignContent: ['alignContent'],
    placeContent: ['placeContent'],
    placeItems: ['placeItems'],
    gap: ['gap', getSpacingValue],
    columnGap: ['columnGap', getSpacingValue],
    rowGap: ['rowGap', getSpacingValue],
};

function gridTemplateValue(value: unknown) {
    if (Array.isArray(value)) {
        return value.map(getSpacingValue).join(' ');
    }
    return getSpacingValue(value);
}
/**
 * Can be used to make a repeating fragment of the columns or rows list.
 * @param count - The number of times to repeat the fragment.
 * @param fragment - The fragment to repeat.
 */
export function repeat(
    count: number | 'auto-fill' | 'auto-fit',
    fragment: SpacingValue | SpacingValue[],
): string {
    return `repeat(${count}, ${gridTemplateValue(fragment)})`;
}

/**
 * Defines a size range greater than or equal to min and less than or equal to max.
 * @param min - The minimum size.
 * @param max - The maximum size.
 */
export function minmax(min: SpacingValue, max: SpacingValue): string {
    return `minmax(${getSpacingValue(min)}, ${getSpacingValue(max)})`;
}

/**
 * Clamps a given size to an available size.
 * @param dimension - The size to clamp.
 */
export function fitContent(dimension: SpacingValue): string {
    return `fit-content(${getSpacingValue(dimension)})`;
}

export interface GridProps<T extends React.ElementType<DOMProps> = 'div'>
    extends BoxProps<T>,
        GridStyleProps {}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(props, ref) {
    const boxProps = useStyleProps(props, gridStyleHandlers);
    return <Box {...boxProps} className={b(null, boxProps.className)} ref={ref} />;
}) as (<C extends React.ElementType = 'div'>(
    props: LayoutComponentProps<C, GridProps<C>>,
) => React.ReactElement) & {displayName: string};
