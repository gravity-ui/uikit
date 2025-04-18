import {block} from '../../utils/cn';
import type {Space} from '../types';
import {makeCssMod} from '../utils';

import './spacing.scss';

const b = block('s');

export interface SpacingProps {
    /**
     * margin-right
     */
    mr?: Space;
    /**
     * margin-left
     */
    ml?: Space;
    /**
     * margin-top
     */
    mt?: Space;
    /**
     * margin-bottom
     */
    mb?: Space;
    /**
     * margin-left
     * margin-right
     */
    mx?: Space;
    /**
     * margin-top
     * margin-bottom
     */
    my?: Space;
    /**
     * margin
     */
    m?: Space;
    /**
     * padding-right
     */
    pr?: Space;
    /**
     * padding-left
     */
    pl?: Space;
    /**
     * padding-top
     */
    pt?: Space;
    /**
     * padding-bottom
     */
    pb?: Space;
    /**
     * padding-left
     * padding-right
     */
    px?: Space;
    /**
     * padding-top
     * padding-bottom
     */
    py?: Space;
    /**
     * padding
     */
    p?: Space;
}

/**
 * Utility to generate predefined css classes to describe position between components
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#spacing-utility
 */
export const spacing = (props: SpacingProps, className?: string) => {
    const classes: string[] = [];

    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const value = props[key as keyof SpacingProps];

            if (typeof value !== 'undefined') {
                classes.push(b(`${key}_${makeCssMod(value)}`));
            }
        }
    }

    if (className) {
        classes.push(className);
    }

    return classes.join(' ');
};

// alias
export const sp = spacing;
