'use client';

import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useUniqId} from '../../../hooks';
import {Disclosure} from '../../Disclosure';
import type {DisclosureSummaryRenderFunctionProps} from '../../Disclosure/DisclosureSummary/DisclosureSummary';
import type {QAProps} from '../../types';
import {isOfType} from '../../utils/isOfType';
import {useAccordion} from '../AccordionContext';
import {accordionSummaryBlock} from '../constants';

import './AccordionSummary.scss';

export type AccordionSummaryProps = QAProps & {
    children: (
        props: DisclosureSummaryRenderFunctionProps,
        defaultSummary: React.ReactElement,
    ) => React.ReactElement;
};

export function AccordionSummary(props: AccordionSummaryProps) {
    const {children, qa} = props;
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

    return (
        <div
            role={'heading'}
            aria-level={ariaLevel}
            className={accordionSummaryBlock({size, arrow_position: arrowPosition})}
        >
            <Disclosure.Summary qa={qa}>
                {(disclosureProps, defaultSummary) => {
                    const enhancedProps = {
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
                    return children(enhancedProps, defaultSummary);
                }}
            </Disclosure.Summary>
        </div>
    );
}

export const isAccordionSummaryComponent = isOfType(AccordionSummary);
AccordionSummary.displayName = 'DisclosureSummary';
