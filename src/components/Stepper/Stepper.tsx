'use client';

import * as React from 'react';

import type {AriaLabelingProps, DOMProps, QAProps} from '../types';

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

function Item(_props: StepperItemProps): React.ReactElement | null {
    return null;
}

export const Stepper = (props: StepperProps) => {
    const {children, value = 0, size = 's', className, onUpdate, separator} = props;

    const stepItems = React.useMemo(() => {
        const items: React.ReactElement<StepperItemProps>[] = [];

        React.Children.forEach(children, (child, index) => {
            if (React.isValidElement(child)) {
                if (child.key === undefined || child.key === null) {
                    child = React.cloneElement(child, {key: child.props.id || index});
                }
                items.push(child);
            }
        });

        return items.map((item, index) => {
            const id = item.props.id || index;

            return (
                <li key={id} className={b('list-item')}>
                    <StepperItem
                        {...item.props}
                        id={id}
                        size={size}
                        selected={value}
                        onUpdate={onUpdate}
                    />
                    {Boolean(index !== items.length - 1) && (
                        <StepperSeparator separator={separator} />
                    )}
                </li>
            );
        });
    }, [children, value, size, onUpdate, separator]);

    return (
        <ol className={b(null, className)} style={props.style} data-qa={props.qa}>
            {stepItems}
        </ol>
    );
};

Stepper.Item = Item;
Stepper.displayName = 'Stepper';

export default Stepper;

export {Item as StepperItem};
