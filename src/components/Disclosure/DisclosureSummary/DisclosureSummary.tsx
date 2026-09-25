'use client';

import * as React from 'react';

import {ArrowToggle} from '../../ArrowToggle';
import type {QAProps} from '../../types';
import {warnOnce} from '../../utils/warn';
import type {DisclosureArrowPosition, DisclosureSize} from '../Disclosure';
import {useDisclosureAttributes, useToggleDisclosure} from '../DisclosureContext';
import {DisclosureQa, b} from '../constants';

const ComponentSizeToIconSizeMap: Record<DisclosureSize, number> = {
    m: 14,
    l: 16,
    xl: 20,
};

function warnAboutPhysicalValues() {
    warnOnce(
        '[Disclosure] Physical values (left, right) of "arrowPosition" property are deprecated. Use logical values (start, end) instead.',
    );
}

export type DisclosureSummaryWidth = 'auto' | 'max';
export type DisclosureSummaryJustifyContent = 'start' | 'space-between';

export interface DisclosureSummaryRenderFunctionProps extends QAProps {
    onClick: (e: React.SyntheticEvent) => void;
    ariaControls: string;
    id: string;
    expanded: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    width?: DisclosureSummaryWidth;
    justifyContent?: DisclosureSummaryJustifyContent;
    size?: DisclosureSize;
    summary?: React.ReactNode;
    arrowPosition?: DisclosureArrowPosition;
}

export interface DisclosureSummaryProps extends QAProps {
    width?: DisclosureSummaryWidth;
    justifyContent?: DisclosureSummaryJustifyContent;
    size?: DisclosureSize;
    summary?: React.ReactNode;
    arrowPosition?: DisclosureArrowPosition;
    children?: (
        props: DisclosureSummaryRenderFunctionProps,
        defaultSummary: React.ReactElement,
    ) => React.ReactElement;
}

export function DisclosureSummary({
    children: renderFunction,
    qa,
    justifyContent = 'start',
    width = 'auto',
    size,
    summary,
    arrowPosition,
}: DisclosureSummaryProps) {
    const handleToggle = useToggleDisclosure();
    const {
        ariaControls,
        ariaLabelledby: id,
        expanded,
        disabled,
        onSummaryKeyDown: onKeyDown,
        size: disclosureSize,
        summary: disclosureSummary,
        arrowPosition: disclosureArrowPosition,
    } = useDisclosureAttributes();
    const props: DisclosureSummaryRenderFunctionProps = {
        onClick: handleToggle,
        ariaControls,
        id,
        expanded,
        disabled,
        qa,
        onKeyDown,
        justifyContent,
        width,
        size: size ?? disclosureSize,
        summary: summary === undefined ? disclosureSummary : summary,
        arrowPosition: arrowPosition ?? disclosureArrowPosition,
    };

    const defaultDisclosureSummaryJsx = <DefaultDisclosureSummary {...props} />;

    if (renderFunction) {
        return renderFunction(props, defaultDisclosureSummaryJsx);
    }

    return defaultDisclosureSummaryJsx;
}

export const DefaultDisclosureSummary = React.forwardRef<
    HTMLButtonElement,
    DisclosureSummaryRenderFunctionProps
>(function DefaultDisclosureSummary(
    {
        onClick,
        ariaControls,
        id,
        expanded,
        disabled,
        qa,
        onKeyDown,
        className,
        width,
        justifyContent,
        size: sizeProp,
        summary: summaryProp,
        arrowPosition: arrowPositionProp,
    },
    ref,
) {
    const {size, summary, arrowPosition} = useDisclosureAttributes();
    const mergedSize = sizeProp ?? size;
    const mergedSummary = summaryProp === undefined ? summary : summaryProp;
    let arrowMod = arrowPositionProp ?? arrowPosition;

    if (arrowMod === 'left') {
        warnAboutPhysicalValues();
        arrowMod = 'start';
    }
    if (arrowMod === 'right') {
        warnAboutPhysicalValues();
        arrowMod = 'end';
    }

    return (
        <button
            type="button"
            aria-expanded={expanded}
            className={b(
                'trigger',
                {disabled, arrow: arrowMod, width, 'justify-content': justifyContent},
                className,
            )}
            aria-controls={ariaControls}
            id={id}
            onClick={onClick}
            disabled={disabled}
            data-qa={qa || DisclosureQa.SUMMARY}
            onKeyDown={onKeyDown}
            ref={ref}
        >
            <ArrowToggle
                size={ComponentSizeToIconSizeMap[mergedSize]}
                direction={expanded ? 'top' : 'bottom'}
            />
            {mergedSummary}
        </button>
    );
});

DisclosureSummary.Default = DefaultDisclosureSummary;
DisclosureSummary.displayName = 'DisclosureSummary';
