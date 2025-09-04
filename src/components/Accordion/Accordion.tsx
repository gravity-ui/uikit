'use client';

import * as React from 'react';

import {AccordionProvider} from './AccordionContext';
import {AccordionItem} from './AccordionItem/AccordionItem';
import {AccordionSummary} from './AccordionSummary/AccordionSummary';
import {accordionBlock} from './constants';
import i18n from './i18n';
import type {AccordionProps, AccordionValue} from './types';

import './Accordion.scss';

export const Accordion = React.forwardRef(function Accordion<Multiple extends boolean = false>(
    props: AccordionProps<Multiple>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {t} = i18n.useTranslation();
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
        ariaLabel = t('label'),
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
            ariaLevel={ariaLevel}
        >
            <div
                className={accordionBlock({size, view}, className)}
                data-qa={qa}
                ref={ref}
                role="region"
                aria-label={ariaLabel}
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
