'use client';

import * as React from 'react';

import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {filterDOMProps} from '../utils/filterDOMProps';

import {StepperItem} from './StepperItem';
import {StepperSeparator} from './StepperSeparator';
import {StepperContext} from './context';
import type {StepperSize} from './types';
import {b} from './utils';

import './Stepper.scss';

export interface StepperProps extends DOMProps, AriaLabelingProps, QAProps {
    children: React.ReactElement | React.ReactElement[];
    value?: number | string;
    onUpdate?: (id?: number | string) => void;
    size?: StepperSize;
    separator?: React.ReactNode;
}

export const Stepper = (props: StepperProps) => {
    const {children, value, size = 's', className, onUpdate, separator} = props;

    const stepItems = React.useMemo(() => {
        return React.Children.map(children, (child, index) => {
            const itemId = child.props?.id || index;
            const clonedChild = React.cloneElement(child, {id: itemId});

            return (
                <li key={itemId} className={b('list-item')}>
                    {clonedChild}
                    {Boolean(index !== React.Children.count(children) - 1) && (
                        <StepperSeparator separator={separator} />
                    )}
                </li>
            );
        });
    }, [children, separator]);

    return (
        <StepperContext.Provider value={{size, onUpdate, value}}>
            <ol
                {...filterDOMProps(props, {labelable: true})}
                className={b(null, className)}
                style={props.style}
                data-qa={props.qa}
            >
                {stepItems}
            </ol>
        </StepperContext.Provider>
    );
};

Stepper.Item = StepperItem;
Stepper.displayName = 'Stepper';
