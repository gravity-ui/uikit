import React from 'react';

import type {QAProps} from '../types';
import {isOfType} from '../utils/isOfType';

import {DisclosureProvider} from './DisclosureContext';
import {DisclosureDetails} from './DisclosureDetails/DisclosureDetails';
import {DefaultDisclosureSummary, DisclosureSummary} from './DisclosureSummary/DisclosureSummary';
import {b} from './cn';

import './Disclosure.scss';

export type DisclosureSize = 'm' | 'l' | 'xl';
export type DisclosureArrowPosition = 'left' | 'right' | 'start' | 'end';

export interface DisclosureComposition {
    Summary: typeof DisclosureSummary;
}

export interface DisclosureProps extends QAProps {
    /** Disclosure size */
    size?: DisclosureSize;
    /** Disabled state */
    disabled?: boolean;
    /** Default opening state */
    defaultExpanded?: boolean;
    /** Controlled opening state */
    expanded?: boolean;
    /** Control position */
    arrowPosition?: DisclosureArrowPosition;
    /** Content summary */
    summary?: string;
    /** Class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Keep content in DOM */
    keepMounted?: boolean;
    /** Callback fired when the expand/collapse state is changed  */
    onUpdate?: (expanded: boolean) => void;
}

const isDisclosureSummaryComponent = isOfType(DisclosureSummary);

// @ts-ignore this ts-error is appears when forwarding ref. It complains that DisclosureComposition props is not provided initially
export const Disclosure: React.FunctionComponent<DisclosureProps> & DisclosureComposition =
    React.forwardRef<HTMLDivElement, DisclosureProps>(function Disclosure(props, ref) {
        const {
            size = 'm',
            disabled = false,
            defaultExpanded = false,
            arrowPosition = 'start',
            summary = '',
            className,
            keepMounted = true,
            children,
            onUpdate = () => {},
            expanded,
            qa,
        } = props;

        const [summaryContent, detailsContent] = prepareChildren(children);
        return (
            <DisclosureProvider
                disabled={disabled}
                defaultExpanded={defaultExpanded}
                expanded={expanded}
                keepMounted={keepMounted}
                size={size}
                summary={summary}
                arrowPosition={arrowPosition}
                onUpdate={onUpdate}
            >
                <section ref={ref} className={b({size}, className)} data-qa={qa}>
                    {summaryContent}
                    {detailsContent}
                </section>
            </DisclosureProvider>
        );
    });

function prepareChildren(children: React.ReactNode) {
    const items = React.Children.toArray(children);

    let summary, details;

    const content = [];

    for (const item of items) {
        const isDisclosureSummary = isDisclosureSummaryComponent(item);
        if (isDisclosureSummary) {
            if (summary) {
                throw new Error('Only one <Disclosure.Summary> component is allowed');
            }
            summary = item;
            continue;
        }
        content.push(item);
    }
    if (content.length > 0) {
        details = <DisclosureDetails>{content}</DisclosureDetails>;
    }
    if (!summary) {
        summary = (
            <DisclosureSummary>
                {(props) => <DefaultDisclosureSummary {...props} />}
            </DisclosureSummary>
        );
    }

    return [summary, details];
}

Disclosure.Summary = DisclosureSummary;
Disclosure.displayName = 'Disclosure';
