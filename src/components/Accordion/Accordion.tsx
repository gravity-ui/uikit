import * as React from 'react';

import type {QAProps} from '../types';

import {AccordionProvider} from './AccordionContext';
import {AccordionItem} from './AccordionItem/AccordionItem';
import type {AccordionItemProps} from './AccordionItem/AccordionItem';
import {AccordionSummary} from './AccordionSummary/AccordionSummary';
import {accordionBlock} from './constants';

import './Accordion.scss';

type AccordionSize = 's' | 'm' | 'l' | 'xl';
type AccordionView = 'solid' | 'top-bottom';
type AccordionArrowPosition = 'start' | 'end';

export type AccordionValue<Multiple extends boolean> = Multiple extends true
    ? string[]
    : string | undefined;

export type AccordionProps<Multiple extends boolean = false> = Partial<{
    size: AccordionSize;
    view: AccordionView;
    multiple: Multiple;
    className: string;
    arrowPosition: AccordionArrowPosition;
    defaultValue: AccordionValue<Multiple>;
    value: AccordionValue<Multiple>;
    onUpdate: (value: AccordionValue<Multiple>) => void;
    children: React.ReactElement<AccordionItemProps>[] | React.ReactElement<AccordionItemProps>;
    ariaLevel: number;
}> &
    QAProps;

export const Accordion = React.forwardRef(function Accordion<Multiple extends boolean = false>(
    props: AccordionProps<Multiple>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        size = 'm',
        view = 'solid',
        multiple = false as Multiple,
        className,
        arrowPosition = 'end',
        qa,
        defaultValue,
        onUpdate = () => {},
        children,
        ariaLevel = 3,
        value,
    } = props;

    return (
        <AccordionProvider
            size={size}
            view={view}
            multiple={multiple}
            arrowPosition={arrowPosition}
            onUpdate={onUpdate}
            defaultValue={defaultValue as AccordionValue<Multiple>}
            value={value as AccordionValue<Multiple>}
            controlled={'value' in props}
            ariaLevel={ariaLevel}
        >
            <div
                className={accordionBlock({size, view}, className)}
                data-qa={qa}
                ref={ref}
                role="region"
                aria-label="Accordion"
            >
                {children}
            </div>
        </AccordionProvider>
    );
}) as unknown as (<Multiple extends boolean = false>(
    props: AccordionProps<Multiple> & {ref?: React.Ref<HTMLDivElement>},
) => React.ReactElement) & {
    Item: typeof AccordionItem;
    Summary: typeof AccordionSummary;
    displayName: string;
};

Accordion.Item = AccordionItem;
Accordion.Summary = AccordionSummary;
Accordion.displayName = 'Accordion';
