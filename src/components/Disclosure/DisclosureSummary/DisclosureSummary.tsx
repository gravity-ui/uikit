import type * as React from 'react';

import {ArrowToggle} from '../../ArrowToggle';
import type {QAProps} from '../../types';
import {warnOnce} from '../../utils/warn';
import type {DisclosureSize} from '../Disclosure';
import {useDisclosureAttributes, useToggleDisclosure} from '../DisclosureContext';
import {b} from '../constants';

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

interface DisclosureSummaryRenderFunctionProps extends QAProps {
    onClick: (e: React.SyntheticEvent) => void;
    ariaControls: string;
    id: string;
    expanded: boolean;
    disabled?: boolean;
}

export interface DisclosureSummaryProps extends QAProps {
    children: (
        props: DisclosureSummaryRenderFunctionProps,
        defaultSummary: React.ReactElement,
    ) => React.ReactElement;
}

export function DisclosureSummary({children: renderFunction, qa}: DisclosureSummaryProps) {
    const handleToggle = useToggleDisclosure();
    const {ariaControls, ariaLabelledby: id, expanded, disabled} = useDisclosureAttributes();
    const props = {onClick: handleToggle, ariaControls, id, expanded, disabled, qa};

    return renderFunction(props, <DefaultDisclosureSummary {...props} />);
}

export function DefaultDisclosureSummary({
    onClick,
    ariaControls,
    id,
    expanded,
    disabled,
    qa,
}: DisclosureSummaryRenderFunctionProps) {
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
            className={b('trigger', {disabled, arrow: arrowMod})}
            aria-controls={ariaControls}
            id={id}
            onClick={onClick}
            disabled={disabled}
            data-qa={qa}
        >
            <ArrowToggle
                size={ComponentSizeToIconSizeMap[size]}
                direction={expanded ? 'top' : 'bottom'}
            />
            {summary}
        </button>
    );
}

DisclosureSummary.displayName = 'DisclosureSummary';
