'use client';

import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useUniqId} from '../../../hooks';
import type {DisclosureSummaryRenderFunctionProps} from '../../Disclosure/DisclosureSummary/DisclosureSummary';
import type {QAProps} from '../../types';
import {isOfType} from '../../utils/isOfType';
import {useAccordion} from '../AccordionContext';
import {accordionSummaryBlock} from '../constants';

import './AccordionSummary.scss';

export type AccordionSummaryRenderProps = DisclosureSummaryRenderFunctionProps & {
    ref: (element: HTMLButtonElement | null) => void;
};

export type AccordionSummaryProps = QAProps & {
    children: (
        props: DisclosureSummaryRenderFunctionProps,
        defaultSummary: React.ReactElement,
    ) => React.ReactElement;
};

/**
 * Marker component for detecting AccordionSummary in AccordionItem.
 * The actual rendering is done by AccordionSummaryContent inside Disclosure.Summary.
 */
export function AccordionSummary(_props: AccordionSummaryProps): React.ReactNode {
    return null;
}

export type AccordionSummaryContentProps = QAProps & {
    children: (
        props: AccordionSummaryRenderProps,
        defaultSummary: React.ReactElement,
    ) => React.ReactElement;
    disclosureProps: DisclosureSummaryRenderFunctionProps;
    defaultSummary: React.ReactElement;
};

export function AccordionSummaryContent(props: AccordionSummaryContentProps) {
    const {children, disclosureProps, defaultSummary} = props;
    const {registerSummary, unregisterSummary, getSummaryRefs, arrowPosition, size, ariaLevel} =
        useAccordion();

    const summaryId = useUniqId();
    const [buttonElement, setButtonElement] = React.useState<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        if (buttonElement) {
            const summaryRef = {
                element: buttonElement,
                disabled: buttonElement.disabled,
            };
            registerSummary(summaryId, summaryRef);
        }

        return () => {
            unregisterSummary(summaryId);
        };
    }, [summaryId, buttonElement, registerSummary, unregisterSummary]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (
            e.key === KeyCode.ARROW_DOWN ||
            e.key === KeyCode.ARROW_UP ||
            e.key === KeyCode.HOME ||
            e.key === KeyCode.END
        ) {
            e.preventDefault();

            const summaryRefs = getSummaryRefs();

            if (summaryRefs.length === 0) {
                return;
            }

            if (e.key === KeyCode.HOME) {
                summaryRefs[0]?.element.focus();
                return;
            }

            if (e.key === KeyCode.END) {
                summaryRefs[summaryRefs.length - 1]?.element.focus();
                return;
            }

            const currentIndex = summaryRefs.findIndex((ref) => ref.element === e.currentTarget);
            if (currentIndex === -1) {
                return;
            }

            const nextIndex =
                e.key === KeyCode.ARROW_DOWN
                    ? (currentIndex + 1) % summaryRefs.length
                    : (currentIndex - 1 + summaryRefs.length) % summaryRefs.length;

            summaryRefs?.[nextIndex]?.element.focus();
        }
    };

    const enhancedProps: AccordionSummaryRenderProps = {
        ...disclosureProps,
        onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
            handleKeyDown(e);
            if (disclosureProps.onKeyDown) {
                disclosureProps.onKeyDown(e);
            }
        },
        ref: (element: HTMLButtonElement | null) => {
            setButtonElement(element);
        },
    };

    return (
        <div
            role={'heading'}
            aria-level={ariaLevel}
            className={accordionSummaryBlock({size, arrow_position: arrowPosition})}
        >
            {children(enhancedProps, defaultSummary)}
        </div>
    );
}

export const isAccordionSummaryComponent = isOfType(AccordionSummary);
AccordionSummary.displayName = 'AccordionSummary';
