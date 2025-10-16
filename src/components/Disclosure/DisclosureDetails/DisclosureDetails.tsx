'use client';

import * as React from 'react';

import {CSSTransition} from 'react-transition-group';

import type {QAProps} from '../../types';
import {getCSSTransitionClassNames} from '../../utils/transition';
import {useDisclosureAttributes} from '../DisclosureContext';
import {DisclosureQa, b} from '../constants';

export interface DisclosureDetailsProps extends QAProps {
    children: React.ReactNode;
    className?: string;
}

export function DisclosureDetails({children, qa, className}: DisclosureDetailsProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const {ariaControls, ariaLabelledby, keepMounted, expanded} = useDisclosureAttributes();

    return (
        <CSSTransition
            nodeRef={containerRef}
            in={expanded}
            addEndListener={(done) => containerRef.current?.addEventListener('animationend', done)}
            classNames={getCSSTransitionClassNames(b)}
            mountOnEnter={!keepMounted}
            unmountOnExit={!keepMounted}
            appear={true}
        >
            <div
                ref={containerRef}
                id={ariaControls}
                role="region"
                aria-labelledby={ariaLabelledby}
                className={b('content', {visible: expanded}, className)}
                data-qa={qa || DisclosureQa.DETAILS}
            >
                {children}
            </div>
        </CSSTransition>
    );
}

DisclosureDetails.displayName = 'DisclosureDetails';
