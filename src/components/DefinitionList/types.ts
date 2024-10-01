import type React from 'react';

import type {HelpMarkProps} from '../HelpMark';
import type {QAProps} from '../types';
export type DefinitionListItemNote = string | HelpMarkProps;

export interface DefinitionListItem {
    name: React.ReactNode;
    content?: React.ReactNode;
    contentTitle?: string;
    nameTitle?: string;
    copyText?: string;
    note?: DefinitionListItemNote;
    multilineName?: boolean;
}

export type DefinitionListDirection = 'vertical' | 'horizontal';

export interface DefinitionListProps extends QAProps {
    items: DefinitionListItem[];
    responsive?: boolean;
    direction?: DefinitionListDirection;
    nameMaxWidth?: number;
    contentMaxWidth?: number;
    className?: string;
    itemClassName?: string;
    groupLabelClassName?: string;
}
