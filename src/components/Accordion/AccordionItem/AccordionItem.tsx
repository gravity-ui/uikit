import * as React from 'react';

import {useUniqId} from '../../../hooks';
import {Disclosure} from '../../Disclosure';
import {DefaultDisclosureSummary} from '../../Disclosure/DisclosureSummary/DisclosureSummary';
import type {QAProps} from '../../types';
import {useAccordionAttributes, useAccordionItems} from '../AccordionContext';
import {AccordionSummary, isAccordionSummaryComponent} from '../AccordionSummary/AccordionSummary';
import {
    accordionDetailsBlock,
    accordionItemBlock,
    accordionSummaryTriggerBlock,
} from '../constants';

import './AccordionItem.scss';

export type AccordionItemProps = Partial<{
    value: string;
    children: React.ReactNode;
    expanded: boolean;
    disabled: boolean;
    keepMounted: boolean;
    onUpdate: (expanded: boolean) => void;
    defaultExpanded: boolean;
    className: string;
    summary: React.ReactNode;
}> &
    QAProps;

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
        } = props;

        const attributes = useAccordionAttributes();
        const {id, isExpanded, handleUpdate} = useAccordionItemState({
            expanded,
            defaultExpanded,
            value,
            onUpdate,
        });

        const [preparedSummary, details] = React.useMemo(() => {
            return prepareChildren(children, qa);
        }, [children, qa]);

        return (
            <Disclosure
                key={value ?? id}
                arrowPosition={attributes?.arrowPosition}
                keepMounted={keepMounted}
                onUpdate={handleUpdate}
                expanded={defaultExpanded ? undefined : isExpanded}
                defaultExpanded={defaultExpanded}
                summary={summary}
                disabled={disabled}
                qa={qa}
                className={accordionItemBlock({
                    size: attributes?.size,
                    view: attributes?.view,
                    disabled,
                })}
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
    const {items, updateItems} = useAccordionItems();
    const isControlled = expanded !== undefined;
    const isDefault = defaultExpanded !== undefined;

    const isExpanded = React.useMemo(() => {
        if (isControlled) return expanded;
        if (isDefault) return false;
        if (Array.isArray(items)) return items.includes(value ?? id);
        return items === (value ?? id);
    }, [isControlled, isDefault, expanded, items, value, id]);

    const handleUpdate = React.useCallback(
        (next: boolean) => {
            onUpdate?.(next);
            if (!isControlled && !isDefault) {
                updateItems(value ?? id);
            }
        },
        [isControlled, isDefault, onUpdate, updateItems, value, id],
    );
    return {id, isExpanded, handleUpdate};
}

function prepareChildren(children: React.ReactNode, qa?: string) {
    const items = React.Children.toArray(children);
    let summary, details;

    const content = [];
    for (const item of items) {
        const isAccordionSummary = isAccordionSummaryComponent(item);
        if (isAccordionSummary) {
            if (summary) {
                throw new Error('Only one <Accordion.Summary> component is allowed');
            }
            summary = item;
            continue;
        }
        content.push(item);
    }
    if (content.length > 0) {
        details = <React.Fragment>{content}</React.Fragment>;
    }

    const summaryQa = qa ? `${qa}-summary` : undefined;

    if (!summary) {
        summary = (
            <AccordionSummary>
                {(props) => (
                    <DefaultDisclosureSummary
                        {...props}
                        qa={summaryQa}
                        className={accordionSummaryTriggerBlock}
                    />
                )}
            </AccordionSummary>
        );
    }

    return [summary, details];
}
