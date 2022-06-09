import React from 'react';

import {block} from '../utils/cn';
import {DOMProps, QAProps} from '../types';
import {Portal} from '../Portal';
import {useBodyScrollLock} from '../utils/useBodyScrollLock';
// import {useFocusTrap} from '../utils//useFocusTrap';
import {useLayer, LayerExtendableProps, LayerCloseReason} from '../utils/useLayer';
import {usePreviousValue} from '../utils/usePreviousValue';
import {useForceUpdate} from '../utils/useForceUpdate';

import './Modal.scss';

export interface ModalProps extends DOMProps, LayerExtendableProps, QAProps {
    open?: boolean;
    keepMounted?: boolean;
    disableBodyScrollLock?: boolean;
    // disableFocusTrap?: boolean;
    children?: React.ReactNode;
    /**
     * Id of visible `<Modal/>` caption element
     */
    'aria-labelledby'?: string;
    /**
     * A11y text
     * Prefer `aria-labelledby` in case caption is visible to user
     */
    'aria-label'?: string;
}

export type ModalCloseReason = LayerCloseReason;

const b = block('modal');

export function Modal({
    open = false,
    keepMounted = false,
    disableBodyScrollLock = false,
    // disableFocusTrap = false,
    disableEscapeKeyDown,
    disableOutsideClick,
    onEscapeKeyDown,
    onEnterKeyDown,
    onOutsideClick,
    onClose,
    children,
    style,
    className,
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    qa,
}: ModalProps) {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const hasBeenOpen = React.useRef(false);
    const inTransition = React.useRef(false);
    const previousOpen = usePreviousValue(open);
    const forceUpdate = useForceUpdate();

    if (open) {
        hasBeenOpen.current = true;
    }

    if (typeof previousOpen !== 'undefined' && !inTransition.current) {
        inTransition.current = open !== previousOpen;
    }

    function handleAnimationEnd(event: React.AnimationEvent) {
        if (event.target === event.currentTarget) {
            inTransition.current = false;
            forceUpdate();
        }
    }

    useBodyScrollLock({enabled: !disableBodyScrollLock && (open || inTransition.current)});
    // useFocusTrap({
    //     enabled: !disableFocusTrap && (open || inTransition.current),
    //     rootRef: contentRef,
    // });
    useLayer({
        open,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [contentRef],
    });

    if (!keepMounted && !open && !inTransition.current) {
        return null;
    }

    return (
        <Portal>
            <div
                data-inited={hasBeenOpen.current ? '' : undefined}
                onAnimationEnd={handleAnimationEnd}
                style={style}
                className={b({open}, className)}
                data-qa={qa}
            >
                <div className={b('table')}>
                    <div className={b('cell')}>
                        <div
                            ref={contentRef}
                            tabIndex={-1}
                            role="dialog"
                            aria-modal={open}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy}
                            className={b('content')}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
