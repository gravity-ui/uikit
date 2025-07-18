import * as React from 'react';

import {KeyCode} from '../../../constants';
import {Disclosure} from '../../Disclosure';
import type {DisclosureSummaryRenderFunctionProps} from '../../Disclosure/DisclosureSummary/DisclosureSummary';
import type {QAProps} from '../../types';
import {isOfType} from '../../utils/isOfType';
import {useAccordionAttributes} from '../AccordionContext';
import {accordionSummaryBlock} from '../constants';

import './AccordionSummary.scss';

type AccordionSummaryProps = QAProps & {
    children: (
        props: DisclosureSummaryRenderFunctionProps,
        defaultSummary: React.ReactElement,
    ) => React.ReactElement;
};

export function AccordionSummary(props: AccordionSummaryProps) {
    const {children, qa} = props;
    const attributes = useAccordionAttributes();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (
            e.key === KeyCode.ARROW_DOWN ||
            e.key === KeyCode.ARROW_UP ||
            e.key === KeyCode.HOME ||
            e.key === KeyCode.END
        ) {
            e.preventDefault();
            const accordionContainer = e.currentTarget.closest('.g-accordion');
            if (!accordionContainer) return;

            const headers = Array.from(
                accordionContainer.querySelectorAll<HTMLButtonElement>(
                    '.g-accordion-summary > *:first-child:not([disabled])',
                ),
            );

            if (e.key === KeyCode.HOME) {
                headers[0]?.focus();
                return;
            }

            if (e.key === KeyCode.END) {
                headers[headers.length - 1]?.focus();
                return;
            }

            const currentIndex = headers.indexOf(e.currentTarget);
            if (currentIndex === -1) return;

            const nextIndex =
                e.key === KeyCode.ARROW_DOWN
                    ? (currentIndex + 1) % headers.length
                    : (currentIndex - 1 + headers.length) % headers.length;

            headers?.[nextIndex]?.focus();
        }
    };

    return (
        <div
            role={'heading'}
            aria-level={attributes?.ariaLevel}
            className={accordionSummaryBlock({size: attributes?.size})}
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
                    };
                    return children(enhancedProps, defaultSummary);
                }}
            </Disclosure.Summary>
        </div>
    );
}

export const isAccordionSummaryComponent = isOfType(AccordionSummary);
AccordionSummary.displayName = 'DisclosureSummary';
