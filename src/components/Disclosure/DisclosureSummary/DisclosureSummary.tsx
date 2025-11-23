'use client';

import * as React from 'react';

import {ArrowToggle} from '../../ArrowToggle';
import type {QAProps} from '../../types';
import {warnOnce} from '../../utils/warn';
import type {DisclosureSize} from '../Disclosure';
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

export interface DisclosureSummaryRenderFunctionProps extends QAProps {
    onClick: (e: React.SyntheticEvent) => void;
    ariaControls: string;
    id: string;
    expanded: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
}

export interface DisclosureSummaryProps extends QAProps {
    children: (
        props: DisclosureSummaryRenderFunctionProps,
        defaultSummary: React.ReactElement,
    ) => React.ReactElement;
}

export function DisclosureSummary({children: renderFunction, qa}: DisclosureSummaryProps) {
    const handleToggle = useToggleDisclosure();
    const {
        ariaControls,
        ariaLabelledby: id,
        expanded,
        disabled,
        onSummaryKeyDown: onKeyDown,
    } = useDisclosureAttributes();
    const props = {onClick: handleToggle, ariaControls, id, expanded, disabled, qa, onKeyDown};

    return renderFunction(props, <DefaultDisclosureSummary {...props} />);
}

export const DefaultDisclosureSummary = React.forwardRef<
    HTMLButtonElement,
    DisclosureSummaryRenderFunctionProps
>(function DefaultDisclosureSummary(
    {onClick, ariaControls, id, expanded, disabled, qa, onKeyDown, className},
    ref,
) {
    const {size, summary, arrowPosition} = useDisclosureAttributes();
    let arrowMod = arrowPosition;

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
            className={b('trigger', {disabled, arrow: arrowMod}, className)}
            aria-controls={ariaControls}
            id={id}
            onClick={onClick}
            disabled={disabled}
            data-qa={qa || DisclosureQa.SUMMARY}
            onKeyDown={onKeyDown}
            ref={ref}
        >
            <ArrowToggle
                size={ComponentSizeToIconSizeMap[size]}
                direction={expanded ? 'top' : 'bottom'}
            />
            {summary}
        </button>
    );
});

DisclosureSummary.displayName = 'DisclosureSummary';
