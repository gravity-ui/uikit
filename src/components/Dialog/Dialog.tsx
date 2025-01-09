'use client';

import * as React from 'react';

import {Modal} from '../Modal';
import type {ModalCloseReason, ModalProps} from '../Modal';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {ButtonClose} from './ButtonClose/ButtonClose';
import {DialogBody} from './DialogBody/DialogBody';
import {DialogDivider} from './DialogDivider/DialogDivider';
import {DialogFooter} from './DialogFooter/DialogFooter';
import {DialogHeader} from './DialogHeader/DialogHeader';
import {DialogPrivateContext} from './DialogPrivateContext';
import type {DialogPrivateContextProps} from './DialogPrivateContext';

import './Dialog.scss';

const b = block('dialog');

export interface DialogProps extends QAProps {
    open: boolean;
    children: React.ReactNode;
    onOpenChange?: ModalProps['onOpenChange'];
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    onEscapeKeyDown?: ModalProps['onEscapeKeyDown'];
    onOutsideClick?: ModalProps['onOutsideClick'];
    onClose: (
        event: MouseEvent | KeyboardEvent,
        reason: ModalCloseReason | 'closeButtonClick',
    ) => void;
    onTransitionIn?: ModalProps['onTransitionIn'];
    onTransitionInComplete?: ModalProps['onTransitionInComplete'];
    onTransitionOut?: ModalProps['onTransitionOut'];
    onTransitionOutComplete?: ModalProps['onTransitionOutComplete'];
    className?: string;
    modalClassName?: string;
    size?: 's' | 'm' | 'l';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    container?: HTMLElement;
    // TODO: Remove from readme disableFocusTrap disableAutoFocus
    initialFocus?: ModalProps['initialFocus'] | 'cancel' | 'apply';
    returnFocus?: ModalProps['returnFocus'];
    contentOverflow?: 'visible' | 'auto';
    disableBodyScrollLock?: boolean;
    disableEscapeKeyDown?: boolean;
    disableOutsideClick?: boolean;
    keepMounted?: boolean;
    hasCloseButton?: boolean;
}

export function Dialog({
    container,
    children,
    open,
    disableBodyScrollLock = false,
    disableEscapeKeyDown = false,
    disableOutsideClick = false,
    initialFocus,
    returnFocus,
    keepMounted = false,
    size,
    contentOverflow = 'visible',
    className,
    modalClassName,
    hasCloseButton = true,
    onEscapeKeyDown,
    onEnterKeyDown,
    onOpenChange,
    onOutsideClick,
    onClose,
    onTransitionIn,
    onTransitionInComplete,
    onTransitionOut,
    onTransitionOutComplete,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    qa,
}: DialogProps) {
    const handleCloseButtonClick = React.useCallback(
        (event: React.MouseEvent) => {
            onClose(event.nativeEvent, 'closeButtonClick');
        },
        [onClose],
    );

    const footerAutoFocusRef = React.useRef<HTMLElement | null>(null);

    const privateContextProps = React.useMemo(() => {
        const result: DialogPrivateContextProps = {
            onTooltipEscapeKeyDown: (event: KeyboardEvent) => {
                onOpenChange?.(false, event, 'escape-key');
                onEscapeKeyDown?.(event);
                onClose?.(event, 'escapeKeyDown');
            },
        };

        if (typeof initialFocus === 'string') {
            result.initialFocusRef = footerAutoFocusRef;
            result.initialFocusAction = initialFocus;
        }

        return result;
    }, [initialFocus, onEscapeKeyDown, onClose, onOpenChange]);

    let initialFocusValue: ModalProps['initialFocus'];
    if (typeof initialFocus === 'string') {
        initialFocusValue = footerAutoFocusRef;
    } else {
        initialFocusValue = initialFocus;
    }

    return (
        <Modal
            open={open}
            contentOverflow={contentOverflow}
            disableBodyScrollLock={disableBodyScrollLock}
            disableEscapeKeyDown={disableEscapeKeyDown}
            disableOutsideClick={disableOutsideClick}
            disableFocusVisuallyHiddenDismiss={hasCloseButton}
            initialFocus={initialFocusValue}
            returnFocus={returnFocus}
            keepMounted={keepMounted}
            onEscapeKeyDown={onEscapeKeyDown}
            onOutsideClick={onOutsideClick}
            onClose={onClose}
            onEnterKeyDown={onEnterKeyDown}
            onTransitionIn={onTransitionIn}
            onTransitionInComplete={onTransitionInComplete}
            onTransitionOut={onTransitionOut}
            onTransitionOutComplete={onTransitionOutComplete}
            className={b('modal', modalClassName)}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            container={container}
            qa={qa}
        >
            <div
                className={b(
                    {
                        size,
                        'has-close': hasCloseButton,
                        'has-scroll': contentOverflow === 'auto',
                    },
                    className,
                )}
            >
                <DialogPrivateContext.Provider value={privateContextProps}>
                    {children}
                </DialogPrivateContext.Provider>

                {hasCloseButton && <ButtonClose onClose={handleCloseButtonClick} />}
            </div>
        </Modal>
    );
}

Dialog.Footer = DialogFooter;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Divider = DialogDivider;
