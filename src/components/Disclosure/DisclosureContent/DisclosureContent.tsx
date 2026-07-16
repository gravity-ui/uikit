'use client';

import * as React from 'react';

import {CSSTransition} from 'react-transition-group';

import {getCSSTransitionClassNames} from '../../utils/transition';
import {b} from '../constants';

export interface DisclosureContentProps extends React.HTMLAttributes<HTMLDivElement> {
    name: 'content' | 'collapsed-content';
    visible: boolean;
    keepMounted?: boolean;
    children: React.ReactNode;
    'data-qa'?: string;
}

export function DisclosureContent({
    name,
    visible,
    keepMounted = true,
    className,
    children,
    ...htmlProps
}: DisclosureContentProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <CSSTransition
            nodeRef={containerRef}
            in={visible}
            addEndListener={(done) => containerRef.current?.addEventListener('animationend', done)}
            classNames={getCSSTransitionClassNames(b)}
            mountOnEnter={!keepMounted}
            unmountOnExit={!keepMounted}
            appear={true}
        >
            <div {...htmlProps} ref={containerRef} className={b(name, {visible}, className)}>
                {children}
            </div>
        </CSSTransition>
    );
}

DisclosureContent.displayName = 'DisclosureContent';
