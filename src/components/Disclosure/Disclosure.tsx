'use client';

import * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';
import type {QAProps} from '../types';
import {isOfType} from '../utils/isOfType';

import {DisclosureCollapsedDetails} from './DisclosureCollapsedDetails/DisclosureCollapsedDetails';
import {DisclosureProvider} from './DisclosureContext';
import {DisclosureDetails} from './DisclosureDetails/DisclosureDetails';
import {DefaultDisclosureSummary, DisclosureSummary} from './DisclosureSummary/DisclosureSummary';
import {b} from './constants';

import './Disclosure.scss';

export type DisclosureSize = 'm' | 'l' | 'xl';
export type DisclosureArrowPosition = 'left' | 'right' | 'start' | 'end';

export interface DisclosureComposition {
    Summary: typeof DisclosureSummary;
    Details: typeof DisclosureDetails;
    CollapsedDetails: typeof DisclosureCollapsedDetails;
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
    summary?: React.ReactNode;
    /** Class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Keep content in DOM */
    keepMounted?: boolean;
    /** Callback fired when the expand/collapse state is changed  */
    onUpdate?: (expanded: boolean) => void;
    /** Callback fires on keyboard events when summary is focused */
    onSummaryKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const isDisclosureSummaryComponent = isOfType(DisclosureSummary);
const isDisclosureCollapsedDetailsComponent = isOfType(DisclosureCollapsedDetails);

// @ts-expect-error this ts-error is appears when forwarding ref. It complains that DisclosureComposition props is not provided initially
export const Disclosure: React.FunctionComponent<DisclosureProps> & DisclosureComposition =
    React.forwardRef<HTMLDivElement, DisclosureProps>(function Disclosure(rawProps, ref) {
        const props = useDefaultProps('Disclosure', rawProps);
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
            onSummaryKeyDown,
            expanded,
            qa,
        } = props;

        const [summaryContent, detailsContent, collapsedDetailsContent] = prepareChildren(
            children,
            {
                disclosureQa: qa,
            },
        );

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
                onSummaryKeyDown={onSummaryKeyDown}
            >
                <section ref={ref} className={b({size}, className)} data-qa={qa}>
                    {summaryContent}
                    {collapsedDetailsContent ? (
                        <div className={b('body')}>
                            {detailsContent}
                            {collapsedDetailsContent}
                        </div>
                    ) : (
                        detailsContent
                    )}
                </section>
            </DisclosureProvider>
        );
    });

interface PrepareParams {
    disclosureQa?: string;
}

function prepareChildren(children: React.ReactNode, {disclosureQa}: PrepareParams) {
    const items = React.Children.toArray(children);

    let summary, details, collapsedDetails;

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
        const isDisclosureCollapsedDetails = isDisclosureCollapsedDetailsComponent(item);
        if (isDisclosureCollapsedDetails) {
            if (collapsedDetails) {
                throw new Error('Only one <Disclosure.CollapsedDetails> component is allowed');
            }
            collapsedDetails = item;
            continue;
        }
        content.push(item);
    }
    if (content.length > 0) {
        details = (
            <DisclosureDetails qa={disclosureQa && `${disclosureQa}-details`}>
                {content}
            </DisclosureDetails>
        );
    }
    if (!summary) {
        summary = (
            <DisclosureSummary qa={disclosureQa && `${disclosureQa}-summary`}>
                {(props) => <DefaultDisclosureSummary {...props} />}
            </DisclosureSummary>
        );
    }

    return [summary, details, collapsedDetails];
}

Disclosure.Summary = DisclosureSummary;
Disclosure.Details = DisclosureDetails;
Disclosure.CollapsedDetails = DisclosureCollapsedDetails;
Disclosure.displayName = 'Disclosure';
