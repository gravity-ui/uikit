import type * as React from 'react';

import type {LabelProps} from '../Label';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';

export type TabSize = 'm' | 'l' | 'xl';

export interface TabProviderProps {
    value?: string;
    onUpdate?: (value: string) => void;
    children?: React.ReactNode;
}

export interface TabListProps extends AriaLabelingProps, DOMProps, QAProps {
    onUpdate?: (value: string) => void;
    value?: string;
    size?: TabSize;
    // contentOverflow?: 'wrap';
    activateOnFocus?: boolean;
    children?: React.ReactNode;
}

export interface TabProps extends AriaLabelingProps, DOMProps, QAProps {
    value: string;
    title?: string;
    icon?: React.ReactNode;
    counter?: number | string;
    href?: string;
    label?: {
        content: React.ReactNode;
        theme?: LabelProps['theme'];
    };
    disabled?: boolean;
    children?: React.ReactNode;
}

export interface TabPanelProps extends AriaLabelingProps, DOMProps, QAProps {
    value: string;
    children?: React.ReactNode;
}
