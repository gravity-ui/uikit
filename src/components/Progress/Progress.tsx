import React, {Component} from 'react';
import {block} from '../utils/cn';
import _ from 'lodash';

import './Progress.scss';

const b = block('progress');

export type Theme = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'misc';
export type View = 'normal' | 'thin' | 'thinnest';
export type Value = number;

interface Stack {
    value: Value;
    color?: string;
    title?: string;
    theme?: Theme;
    className?: string;
    content?: React.ReactNode;
}

export interface ColorStops {
    theme: Theme;
    stop: number;
}

interface ProgressGeneralProps {
    /** ClassName of element */
    className?: string;
}

interface ProgressDefaultProps {
    /** Text inside progress bar */
    text: string;
    /** Theme */
    theme: Theme;
    /** View. Text of progress bar is displayed in `normal` view only. */
    view: View;
}

interface ProgressWithValue extends ProgressGeneralProps, Partial<ProgressDefaultProps> {
    /** Current progress value. Available range is from 0 to 100. If `stack` property is passed `value` is not required and behaves as maxValue. */
    value: Value;
    /** Theme breakpoints. [Details](#colorstops) */
    colorStops?: ColorStops[];
    /** Alternative value of `colorStops`. Available range is from 0 to 100. */
    colorStopsValue?: Value;
}

interface ProgressWithStack extends ProgressGeneralProps, Partial<ProgressDefaultProps> {
    /** Configuration of composite progress bar. Not required if a `value` property is passed. [Details](#stack) */
    stack: Stack[];
    value?: Value;
    /** ClassName of stack element */
    stackClassName?: string;
}

export type ProgressProps = ProgressWithStack | ProgressWithValue;

export class Progress extends Component<ProgressProps> {
    static defaultProps: ProgressDefaultProps = {
        text: '',
        theme: 'default',
        view: 'normal',
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
        return _.sumBy(stack, (item: Stack) => item.value);
    }

    static isProgressWithStack(props: ProgressProps): props is ProgressWithStack {
        return (props as ProgressWithStack).stack !== undefined;
    }

    render() {
        const {view, className} = this.props;

        return (
            <div className={b({view}, className)}>
                {this.renderText()}
                {this.renderContent()}
            </div>
        );
    }

    private get theme(): Theme {
        if (Progress.isProgressWithStack(this.props)) {
            throw new Error('Unexpected behavior');
        }

        const {theme, colorStops, colorStopsValue, value} = this.props;

        if (colorStops) {
            const matchingColorStopItem: ColorStops | undefined = _.find(
                colorStops,
                (item: ColorStops, index: number) => {
                    const currentValue: Value =
                        typeof colorStopsValue === 'number' ? colorStopsValue : value;

                    return Progress.isBetween(
                        currentValue,
                        index > 1 ? colorStops[index - 1].stop : 0,
                        index < colorStops.length - 1 ? item.stop : 100,
                    );
                },
            );

            return matchingColorStopItem ? matchingColorStopItem.theme : (theme as Theme);
        }

        return theme as Theme;
    }

    private renderContent() {
        if (Progress.isProgressWithStack(this.props)) {
            return this.renderStack(this.props);
        } else {
            return this.renderItem(this.props);
        }
    }

    private renderItem(props: ProgressWithValue) {
        const {value} = props;

        const className = b('item', {theme: this.theme});
        const offset = Progress.getOffset(value);
        const style = {transform: `translateX(${offset}%)`};

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
        const style = {transform: `translateX(${offset}%)`};

        interface ItemStyle {
            width: string;
            backgroundColor: string;
        }
        let itemStyle: Partial<ItemStyle> = {width: `${-offset}%`};

        return (
            <div className={className} style={style}>
                <div className={b('item')} style={itemStyle} />
                {_.map(
                    stack,
                    (
                        {
                            value: itemValue,
                            color,
                            title,
                            theme,
                            className: itemClassName,
                            content,
                        }: Stack,
                        index: number,
                    ) => {
                        itemStyle = {width: `${itemValue}%`, backgroundColor: color};

                        const modifiers: Record<string, string | boolean> = {};

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
        const style = {transform: `translateX(${-offset}%)`};

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
