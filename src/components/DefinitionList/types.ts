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

export interface DefinitionListProps extends AriaLabelingProps, QAProps {
    responsive?: boolean;
    direction?: DefinitionListDirection;
    nameMaxWidth?: number;
    contentMaxWidth?: number;
    className?: string;
    groupLabelClassName?: string;
    children: React.ReactNode;
}
