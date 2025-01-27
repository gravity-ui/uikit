import type * as React from 'react';

import type {QAProps} from '../types';

export type ProgressTheme = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'misc';
export type ProgressSize = 'xs' | 's' | 'm';
export type ProgressValue = number;

export interface Stack {
    value: ProgressValue;
    color?: string;
    title?: string;
    theme?: ProgressTheme;
    loading?: boolean;
    className?: string;
    content?: React.ReactNode;
}

export interface ProgressColorStops {
    theme: ProgressTheme;
    stop: number;
}

interface ProgressGeneralProps extends QAProps {
    /** ClassName of element */
    className?: string;
}

export interface ProgressDefaultProps {
    /** Text inside progress bar */
    text: React.ReactNode;
    /** Theme */
    theme: ProgressTheme;
    /** Size. Text of progress bar is displayed in `m` size only. */
    size: ProgressSize;
    /** Loading. Аdds loading animation */
    loading?: boolean;
}

export interface ProgressWithValueProps
    extends ProgressGeneralProps,
        Partial<ProgressDefaultProps> {
    /** Current progress value. Available range is from 0 to 100. If `stack` property is passed `value` is not required and behaves as maxValue. */
    value: ProgressValue;
    /** ProgressTheme breakpoints. [Details](#colorstops) */
    colorStops?: ProgressColorStops[];
    /** Alternative value of `colorStops`. Available range is from 0 to 100. */
    colorStopsValue?: ProgressValue;
}

export interface ProgressWithStackProps
    extends ProgressGeneralProps,
        Partial<ProgressDefaultProps> {
    /** Configuration of composite progress bar. Not required if a `value` property is passed. [Details](#stack) */
    stack: Stack[];
    value?: ProgressValue;
    /** ClassName of stack element */
    stackClassName?: string;
}

export type ProgressProps = ProgressWithStackProps | ProgressWithValueProps;

export function isProgressWithStack(props: ProgressProps): props is ProgressWithStackProps {
    return (props as ProgressWithStackProps).stack !== undefined;
}
