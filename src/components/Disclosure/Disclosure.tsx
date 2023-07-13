import React from 'react';

import {blockNew} from '../utils/cn';
import {isOfType} from '../utils/isOfType';

import {DisclosureProvider} from './DisclosureContext';
import {DisclosureDetails} from './DisclosureDetails/DisclosureDetails';
import {DefaultDisclosureSummary, DisclosureSummary} from './DisclosureSummary/DisclosureSummary';

import './Disclosure.scss';

export const b = blockNew('disclosure');

export type DisclosureSize = 'm' | 'l' | 'xl';
export type DisclosureArrowPosition = 'left' | 'right';

export interface DisclosureComposition {
    Summary: typeof DisclosureSummary;
}

export interface DisclosureProps {
    /** Disclosure size */
    size: DisclosureSize;
    /** Disabled state */
    disabled?: boolean;
    /** Default opening state */
    defaultExpanded?: boolean;
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
    onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
}

const isDisclosureSummaryComponent = isOfType(DisclosureSummary);

// @ts-ignore this ts-error is appears when forwarding ref. It complains that DisclosureComposition props is not provided initially
export const Disclosure: React.FunctionComponent<DisclosureProps> & DisclosureComposition =
    React.forwardRef<HTMLDivElement, DisclosureProps>(function Disclosure(props, ref) {
        const {
            size = 'xl',
            disabled = false,
            defaultExpanded = false,
            arrowPosition = 'left',
            summary = '',
            className,
            keepMounted = true,
            children,
            onChange = () => {},
        } = props;

        const [summaryContent, detailsContent] = prepareChildren(children);
        return (
            <DisclosureProvider
                disabled={disabled}
                defaultExpanded={defaultExpanded}
                keepMounted={keepMounted}
                size={size}
                summary={summary}
                arrowPosition={arrowPosition}
                onChange={onChange}
            >
                <section ref={ref} className={b({size}, className)}>
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
