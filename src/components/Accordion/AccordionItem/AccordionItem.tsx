import * as React from 'react';

import {useUniqId} from '../../../hooks';
import {Disclosure} from '../../Disclosure';
import {DefaultDisclosureSummary} from '../../Disclosure/DisclosureSummary/DisclosureSummary';
import type {QAProps} from '../../types';
import {useAccordionAttributes, useAccordionItems} from '../AccordionContext';
import {AccordionSummary, isAccordionSummaryComponent} from '../AccordionSummary/AccordionSummary';
import {accordionItemBlock} from '../constants';

import './AccordionItem.scss';

export interface AccordionItemProps extends QAProps {
    value?: string;
    children?: React.ReactNode;
    expanded?: boolean;
    disabled?: boolean;
    keepMounted?: boolean;
    onUpdate?: (expanded: boolean) => void;
    defaultExpanded?: boolean;
    className?: string;
    summary?: React.ReactNode;
}

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
        } = props;

        const attributes = useAccordionAttributes();
        const id = useUniqId();
        const {items, updateItems} = useAccordionItems();

        const outsideExpanded = React.useMemo(() => {
            if (expanded !== undefined || defaultExpanded !== undefined) {
                return undefined;
            }
            if (Array.isArray(items)) {
                return Boolean(items) && items.includes(value ?? id);
            }
            return items === (value ?? id);
        }, [defaultExpanded, expanded, id, items, value]);

        const [preparedSummary, details] = prepareChildren(children);

        const handleUpdate = (disclosureExpanded: boolean) => {
            if (onUpdate) {
                onUpdate(disclosureExpanded);
            }
            if (defaultExpanded === undefined || expanded === undefined) {
                updateItems(value ?? id);
            }
        };

        return (
            <Disclosure
                key={value ?? id}
                arrowPosition={attributes?.arrowPosition}
                keepMounted={keepMounted}
                onUpdate={handleUpdate}
                expanded={defaultExpanded ? undefined : (expanded ?? outsideExpanded)}
                defaultExpanded={defaultExpanded}
                summary={summary}
                disabled={disabled}
                className={accordionItemBlock({
                    size: attributes?.size,
                    view: attributes?.view,
                    disabled,
                })}
            >
                {preparedSummary}
                {details}
            </Disclosure>
        );
    },
);

function prepareChildren(children: React.ReactNode) {
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

    if (!summary) {
        summary = (
            <AccordionSummary>
                {(props) => <DefaultDisclosureSummary {...props} />}
            </AccordionSummary>
        );
    }

    return [summary, details];
}
