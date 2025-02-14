'use client';

import * as React from 'react';

import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {filterDOMProps} from '../utils/filterDOMProps';

import {StepperItem} from './StepperItem';
import type {StepperItemProps} from './StepperItem';
import {StepperSeparator} from './StepperSeparator';
import type {StepperSize} from './types';
import {b} from './utils';

import './Stepper.scss';

export interface StepperProps extends DOMProps, AriaLabelingProps, QAProps {
    children: React.ReactElement<StepperItemProps> | React.ReactElement<StepperItemProps>[];
    value?: number | string;
    onUpdate: (id?: number | string) => void;
    size?: StepperSize;
    separator?: React.ReactNode;
}

export const Stepper = (props: StepperProps) => {
    const {children, value, size = 's', className, onUpdate, separator} = props;

    const stepItems = React.useMemo(() => {
        return React.Children.map(children, (child, index) => {
            const id = child.props.id ?? index;

            return (
                <li key={id} className={b('list-item')}>
                    <StepperItem
                        {...child.props}
                        id={id}
                        size={size}
                        selected={value}
                        onUpdate={onUpdate}
                    />
                    {Boolean(index !== React.Children.count(children) - 1) && (
                        <StepperSeparator separator={separator} />
                    )}
                </li>
            );
        });
    }, [children, value, size, onUpdate, separator]);

    return (
        <ol
            {...filterDOMProps(props, {labelable: true})}
            className={b(null, className)}
            style={props.style}
            data-qa={props.qa}
        >
            {stepItems}
        </ol>
    );
};

function Item(_props: StepperItemProps): React.ReactElement | null {
    return null;
}

Stepper.Item = Item;
Stepper.displayName = 'Stepper';

export default Stepper;
