'use client';

import * as React from 'react';

import {useUniqId} from '../../../hooks';
import {Disclosure} from '../../Disclosure';
import {DefaultDisclosureSummary} from '../../Disclosure/DisclosureSummary/DisclosureSummary';
import type {QAProps} from '../../types';
import {useAccordion} from '../AccordionContext';
import {
    AccordionSummaryContent,
    isAccordionSummaryComponent,
} from '../AccordionSummary/AccordionSummary';
import type {AccordionSummaryProps} from '../AccordionSummary/AccordionSummary';
import {
    accordionDetailsBlock,
    accordionItemBlock,
    accordionSummaryTriggerBlock,
} from '../constants';

import './AccordionItem.scss';

export type AccordionItemProps = {
    value?: string;
    children?: React.ReactNode;
    expanded?: boolean;
    disabled?: boolean;
    keepMounted?: boolean;
    onUpdate?: (expanded: boolean) => void;
    defaultExpanded?: boolean;
    className?: string;
    summary?: React.ReactNode;
} & QAProps;

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    function AccordionItem(props, _ref) {
        const {
            children,
            expanded,
            defaultExpanded,
            disabled,
            keepMounted,
            value,
            summary,
            onUpdate,
            qa,
            className,
        } = props;

        const attributes = useAccordion();
        const {id, isExpanded, handleUpdate} = useAccordionItemState({
            expanded,
            defaultExpanded,
            value,
            onUpdate,
        });
        const disclosureExpanded = isExpanded;

        const [preparedSummary, details] = React.useMemo(() => {
            return prepareChildren(children, qa);
        }, [children, qa]);

        return (
            <Disclosure
                key={value ?? id}
                arrowPosition={attributes?.arrowPosition}
                keepMounted={keepMounted}
                onUpdate={handleUpdate}
                expanded={disclosureExpanded}
                summary={summary}
                disabled={disabled}
                qa={qa}
                className={accordionItemBlock(
                    {
                        size: attributes?.size,
                        view: attributes?.view,
                        disabled,
                    },
                    className,
                )}
            >
                {preparedSummary}
                <Disclosure.Details className={accordionDetailsBlock}>{details}</Disclosure.Details>
            </Disclosure>
        );
    },
);

function useAccordionItemState({
    expanded,
    defaultExpanded,
    value,
    onUpdate,
}: {
    expanded?: boolean;
    defaultExpanded?: boolean;
    value?: string;
    onUpdate?: (next: boolean) => void;
}) {
    const id = useUniqId();
    const {items, updateItems} = useAccordion();
    const isControlledItem = expanded !== undefined;
    const itemValue = value ?? id;
    const seededDefaultExpanded = React.useRef(false);

    // Seed defaultExpanded=true into shared accordion state so the item stays
    // in sync with exclusive open/close (Disclosure alone cannot do that).
    React.useLayoutEffect(() => {
        if (seededDefaultExpanded.current || isControlledItem || defaultExpanded !== true) {
            return;
        }
        seededDefaultExpanded.current = true;
        const alreadyOpen = Array.isArray(items)
            ? items.includes(itemValue)
            : items === itemValue;
        if (!alreadyOpen) {
            updateItems(itemValue);
        }
    }, [isControlledItem, defaultExpanded, itemValue, items, updateItems]);

    const isExpanded = React.useMemo(() => {
        if (isControlledItem) {
            return expanded;
        }

        if (Array.isArray(items)) {
            return items.includes(itemValue);
        }

        if (items === itemValue) {
            return true;
        }

        // Honor defaultExpanded on the first paint before the seed effect runs.
        if (defaultExpanded === true && !seededDefaultExpanded.current) {
            return true;
        }

        return false;
    }, [isControlledItem, expanded, items, itemValue, defaultExpanded]);

    const handleUpdate = React.useCallback(
        (next: boolean) => {
            onUpdate?.(next);
            if (!isControlledItem) {
                updateItems(itemValue);
            }
        },
        [onUpdate, isControlledItem, updateItems, itemValue],
    );
    return {id, isExpanded, handleUpdate};
}

function prepareChildren(children: React.ReactNode, qa?: string) {
    const items = React.Children.toArray(children);
    let accordionSummaryElement: React.ReactElement<AccordionSummaryProps> | undefined;
    let details: React.ReactNode;

    const content: React.ReactNode[] = [];
    for (const item of items) {
        const isAccordionSummary = isAccordionSummaryComponent(item);
        if (isAccordionSummary) {
            if (accordionSummaryElement) {
                throw new Error('Only one <Accordion.Summary> component is allowed');
            }
            accordionSummaryElement = item;
            continue;
        }
        content.push(item);
    }

    if (content.length > 0) {
        details = <React.Fragment>{content}</React.Fragment>;
    }

    const summaryQa = qa ? `${qa}-summary` : undefined;

    const summaryChildren =
        accordionSummaryElement?.props?.children ??
        ((props) => (
            <DefaultDisclosureSummary
                {...props}
                qa={summaryQa}
                className={accordionSummaryTriggerBlock}
            />
        ));

    const summary = (
        <Disclosure.Summary qa={accordionSummaryElement?.props?.qa ?? summaryQa}>
            {(disclosureProps, defaultSummary) => (
                <AccordionSummaryContent
                    disclosureProps={disclosureProps}
                    defaultSummary={defaultSummary}
                >
                    {summaryChildren}
                </AccordionSummaryContent>
            )}
        </Disclosure.Summary>
    );

    return [summary, details];
}
