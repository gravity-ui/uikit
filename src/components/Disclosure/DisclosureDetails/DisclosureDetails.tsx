import React from 'react';

import {CSSTransition} from 'react-transition-group';

import {getCSSTransitionClassNames} from '../../utils/transition';
import {b} from '../Disclosure';
import {useDisclosureAttributes} from '../DisclosureContext';

export interface DisclosureDetailsProps {
    children: React.ReactNode;
}

export function DisclosureDetails({children}: DisclosureDetailsProps) {
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
                className={b('content', {visible: expanded})}
            >
                {children}
            </div>
        </CSSTransition>
    );
}
