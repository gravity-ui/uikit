import React from 'react';

import _sumBy from 'lodash/sumBy';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Progress.scss';

const b = block('progress');

export type ProgressTheme = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'misc';
export type ProgressSize = 'xs' | 's' | 'm';
export type ProgressValue = number;

interface Stack {
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

interface ProgressDefaultProps {
    /** Text inside progress bar */
    text: string;
    /** Theme */
    theme: ProgressTheme;
    /** Size. Text of progress bar is displayed in `m` size only. */
    size: ProgressSize;
    /** Loading. Аdds loading animation */
    loading?: boolean;
}

interface ProgressWithValue extends ProgressGeneralProps, Partial<ProgressDefaultProps> {
    /** Current progress value. Available range is from 0 to 100. If `stack` property is passed `value` is not required and behaves as maxValue. */
    value: ProgressValue;
    /** ProgressTheme breakpoints. [Details](#colorstops) */
    colorStops?: ProgressColorStops[];
    /** Alternative value of `colorStops`. Available range is from 0 to 100. */
    colorStopsValue?: ProgressValue;
}

interface ProgressWithStack extends ProgressGeneralProps, Partial<ProgressDefaultProps> {
    /** Configuration of composite progress bar. Not required if a `value` property is passed. [Details](#stack) */
    stack: Stack[];
    value?: ProgressValue;
    /** ClassName of stack element */
    stackClassName?: string;
}

export type ProgressProps = ProgressWithStack | ProgressWithValue;

export class Progress extends React.Component<ProgressProps> {
    static defaultProps: ProgressDefaultProps = {
        text: '',
        theme: 'default',
        size: 'm',
        loading: false,
    };

    static isFiniteNumber(value: number): boolean {
        return isFinite(value) && !isNaN(value);
    }

    static isBetween(value: number, min: number, max: number): boolean {
        return value >= min && value <= max;
    }

    static getOffset(value: number): number {
        return value < 100 ? value - 100 : 0;
    }

    static getValueFromStack(stack: Stack[]): number {
        return _sumBy(stack, (item: Stack) => item.value);
    }

    static isProgressWithStack(props: ProgressProps): props is ProgressWithStack {
        return (props as ProgressWithStack).stack !== undefined;
    }

    render() {
        const {size, className, qa} = this.props;

        return (
            <div className={b({size}, className)} data-qa={qa}>
                {this.renderText()}
                {this.renderContent()}
            </div>
        );
    }

    private getTheme(): ProgressTheme {
        const progressProps: ProgressProps = this.props;
        if (Progress.isProgressWithStack(progressProps)) {
            throw new Error('Unexpected behavior');
        }

        const {theme, colorStops, colorStopsValue, value} = progressProps;

        if (colorStops) {
            const matchingColorStopItem: ProgressColorStops | undefined = colorStops.find(
                (item: ProgressColorStops, index: number) => {
                    const currentValue: ProgressValue =
                        typeof colorStopsValue === 'number' ? colorStopsValue : value;

                    return Progress.isBetween(
                        currentValue,
                        index > 1 ? colorStops[index - 1].stop : 0,
                        index < colorStops.length - 1 ? item.stop : 100,
                    );
                },
            );

            return matchingColorStopItem ? matchingColorStopItem.theme : (theme as ProgressTheme);
        }

        return theme as ProgressTheme;
    }

    private renderContent() {
        const progressProps: ProgressProps = this.props;
        if (Progress.isProgressWithStack(progressProps)) {
            return this.renderStack(progressProps);
        } else {
            return this.renderItem(progressProps);
        }
    }

    private renderItem(props: ProgressWithValue) {
        const {value} = props;

        const className = b('item', {theme: this.getTheme(), loading: this.props.loading});

        const offset = Progress.getOffset(value);
        const style = {transform: `translateX(calc(var(--g-flow-direction) * ${offset}%))`};

        if (Progress.isFiniteNumber(value)) {
            return (
                <div className={className} style={style}>
                    {this.renderInnerText(offset)}
                </div>
            );
        }

        return null;
    }

    private renderStack(props: ProgressWithStack) {
        const {stack, stackClassName} = props;

        const className = b('stack', stackClassName);
        const value = props.value || Progress.getValueFromStack(stack);
        const offset = Progress.getOffset(value);
        const style = {transform: `translateX(calc(var(--g-flow-direction) * ${offset}%))`};

        interface ItemStyle {
            width: string;
            backgroundColor: string;
        }
        let itemStyle: Partial<ItemStyle> = {width: `${-offset}%`};

        return (
            <div className={className} style={style}>
                <div className={b('item')} style={itemStyle} />
                {stack.map(
                    (
                        {
                            value: itemValue,
                            color,
                            title,
                            theme,
                            loading = false,
                            className: itemClassName,
                            content,
                        }: Stack,
                        index: number,
                    ) => {
                        itemStyle = {width: `${itemValue}%`, backgroundColor: color};

                        const modifiers: Record<string, string | boolean> = {
                            loading,
                        };

                        if (typeof color === 'undefined') {
                            modifiers.theme = theme || 'default';
                        }

                        if (Progress.isFiniteNumber(value)) {
                            return (
                                <div
                                    key={index}
                                    className={b('item', modifiers, itemClassName)}
                                    style={itemStyle}
                                    title={title}
                                >
                                    {content}
                                </div>
                            );
                        }

                        return null;
                    },
                )}
                {this.renderInnerText(offset)}
            </div>
        );
    }

    private renderInnerText(offset: number) {
        const {text} = this.props;
        if (!text) {
            return null;
        }

        const className = b('text-inner');
        const style = {transform: `translateX(calc(var(--g-flow-direction) * ${-offset}%))`};

        return (
            <div className={className} style={style}>
                {text}
            </div>
        );
    }

    private renderText() {
        const {text} = this.props;
        const className = b('text');

        return <div className={className}>{text}</div>;
    }
}
