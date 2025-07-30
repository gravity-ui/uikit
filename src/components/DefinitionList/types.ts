import type * as React from 'react';

import type {HelpMarkProps} from '../HelpMark';
import type {AriaLabelingProps, QAProps} from '../types';
export type DefinitionListItemNote = string | HelpMarkProps;

export interface DefinitionListItemProps extends QAProps {
    name: React.ReactNode;
    children?: React.ReactNode;
    copyText?: string;
    note?: DefinitionListItemNote;
}

export type DefinitionListDirection = 'vertical' | 'horizontal';
export type DefinitionListWidth = 'auto' | 'max';

export interface DefinitionListProps extends AriaLabelingProps, QAProps {
    /**
     * @deprecated Use `nameWidth="max"` instead. Will be removed in next major version.
     */
    responsive?: boolean;
    /**
     * Controls the width behavior of the name column.
     * - `auto`: Uses default 300px width (respects nameMaxWidth if provided)
     * - `max`: Names grow to fill available space
     */
    nameWidth?: DefinitionListWidth;
    /**
     * Controls the width behavior of the definition column.
     * - `auto`: Definitions size naturally based on content (default behavior)
     * - `max`: Definitions grow to fill remaining space
     */
    definitionWidth?: DefinitionListWidth;
    direction?: DefinitionListDirection;
    nameMaxWidth?: number;
    contentMaxWidth?: number;
    className?: string;
    groupLabelClassName?: string;
    children: React.ReactNode;
}
