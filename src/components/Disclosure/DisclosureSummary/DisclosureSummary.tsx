import React from 'react';

import {ArrowToggle} from '../../ArrowToggle';
import {DisclosureSize, b} from '../Disclosure';
import {useDisclosureAttributes, useToggleDisclosure} from '../DisclosureContext';

const ComponentSizeToIconSizeMap: Record<DisclosureSize, number> = {
    m: 14,
    l: 16,
    xl: 20,
};

interface DisclosureSummaryRenderFunctionProps {
    onClick: (e: React.SyntheticEvent) => void;
    ariaControls: string;
    id: string;
    expanded: boolean;
    disabled?: boolean;
}

export interface DisclosureSummaryProps {
    children: (props: DisclosureSummaryRenderFunctionProps) => React.ReactElement;
}

export function DisclosureSummary({children: renderFunction}: DisclosureSummaryProps) {
    const handleToggle = useToggleDisclosure();
    const {ariaControls, ariaLabelledby: id, expanded, disabled} = useDisclosureAttributes();

    return renderFunction({onClick: handleToggle, ariaControls, id, expanded, disabled});
}

export function DefaultDisclosureSummary({
    onClick,
    ariaControls,
    id,
    expanded,
    disabled,
}: DisclosureSummaryRenderFunctionProps) {
    const {size, summary, arrowPosition} = useDisclosureAttributes();
    return (
        <button
            type="button"
            aria-expanded={expanded}
            className={b('trigger', {disabled})}
            aria-controls={ariaControls}
            id={id}
            onClick={onClick}
            disabled={disabled}
        >
            <ArrowToggle
                size={ComponentSizeToIconSizeMap[size]}
                direction={expanded ? 'top' : 'bottom'}
                className={b('toggler', {arrow: arrowPosition})}
            />
            {summary}
        </button>
    );
}
