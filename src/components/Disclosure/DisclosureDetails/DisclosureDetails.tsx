'use client';

import * as React from 'react';

import {useResizeObserver} from '../../../hooks';
import type {QAProps} from '../../types';
import {useDisclosureAttributes} from '../DisclosureContext';
import {DisclosureQa, b} from '../constants';

export interface DisclosureDetailsProps extends QAProps {
    children: React.ReactNode;
    className?: string;
}

type Visibility = 'hidden' | 'entering' | 'visible' | 'exiting';

export function DisclosureDetails({children, qa, className}: DisclosureDetailsProps) {
    const {ariaControls, ariaLabelledby, keepMounted, expanded} = useDisclosureAttributes();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number | null>(null);

    const [visibility, setVisibility] = React.useState<Visibility>(expanded ? 'visible' : 'hidden');

    React.useEffect(() => {
        setVisibility((prev) => {
            if (expanded) {
                if (prev === 'visible') {
                    return 'visible';
                }

                return keepMounted ? 'visible' : 'entering';
            }

            if (keepMounted) {
                return prev === 'hidden' ? 'hidden' : 'exiting';
            }

            return prev === 'hidden' ? 'hidden' : 'exiting';
        });
    }, [expanded, keepMounted]);

    React.useEffect(() => {
        if (expanded && !keepMounted && visibility === 'entering') {
            setVisibility('visible');
        }
    }, [expanded, keepMounted, visibility]);

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) {
            return;
        }

        setVisibility((prev) => {
            if (prev === 'entering') {
                return 'visible';
            }

            if (prev === 'exiting') {
                return 'hidden';
            }

            return prev;
        });
    };

    const shouldRender = keepMounted || visibility !== 'hidden';

    const updateHeight = React.useCallback(() => {
        const element = innerRef.current;
        if (!element) {
            return;
        }

        setHeight(element.offsetHeight);
    }, []);

    React.useEffect(() => {
        if (shouldRender) {
            updateHeight();
        }
    }, [shouldRender, updateHeight]);

    useResizeObserver({ref: shouldRender ? innerRef : undefined, onResize: updateHeight});

    if (!shouldRender) {
        return null;
    }

    const visible = visibility === 'visible';
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
