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

    const [renderContent, setRenderContent] = React.useState(expanded);
    const [animVisible, setAnimVisible] = React.useState(expanded);

    React.useEffect(() => {
        if (keepMounted) return;

        if (expanded) {
            setRenderContent(true);
        } else {
            setAnimVisible(false);
        }
    }, [expanded, keepMounted]);

    React.useEffect(() => {
        if (keepMounted || !expanded || !renderContent) return;
        setAnimVisible(true);
    }, [keepMounted, expanded, renderContent]);

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (!keepMounted && !expanded && e.target === e.currentTarget) {
            setRenderContent(false);
        }
    };

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
    }, [renderContent]);

    const shouldRender = keepMounted || renderContent;

    if (!shouldRender) {
        return null;
    }

    const visible = keepMounted ? expanded : animVisible;
    const style = height ? {'--_--disclosure-content-height': `${height}px`} : undefined;
    const hiddenAttributes = expanded ? {} : {inert: ''};

    return (
        <div
            {...hiddenAttributes}
            aria-hidden={expanded ? undefined : true}
            id={ariaControls}
            role="region"
            aria-labelledby={ariaLabelledby}
            className={b('content', {visible})}
            data-qa={qa || DisclosureQa.DETAILS}
            style={style as React.CSSProperties}
            onTransitionEnd={handleTransitionEnd}
        >
            <div ref={innerRef} className={className}>
                {children}
            </div>
        </div>
    );
}

DisclosureDetails.displayName = 'DisclosureDetails';
