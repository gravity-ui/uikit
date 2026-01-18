'use client';

import * as React from 'react';

import type {QAProps} from '../../types';
import {useDisclosureAttributes} from '../DisclosureContext';
import {DisclosureQa, b} from '../constants';

export interface DisclosureDetailsProps extends QAProps {
    children: React.ReactNode;
    className?: string;
}

export function DisclosureDetails({children, qa, className}: DisclosureDetailsProps) {
    const {ariaControls, ariaLabelledby, keepMounted, expanded} = useDisclosureAttributes();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number | null>(null);

    React.useEffect(() => {
        const element = innerRef.current;
        if (!element) {
            return undefined;
        }

        const updateHeight = () => {
            setHeight(element.offsetHeight);
        };

        updateHeight();

        const observer = new ResizeObserver(updateHeight);
        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const shouldRender = keepMounted || expanded;

    if (!shouldRender) {
        return null;
    }

    const style = height ? {'--_--disclosure-content-height': `${height}px`} : undefined;

    return (
        <div
            id={ariaControls}
            role="region"
            aria-labelledby={ariaLabelledby}
            className={b('content', {visible: expanded})}
            data-qa={qa || DisclosureQa.DETAILS}
            style={style as React.CSSProperties}
        >
            <div ref={innerRef} className={className}>
                {children}
            </div>
        </div>
    );
}

DisclosureDetails.displayName = 'DisclosureDetails';
