import React from 'react';

import {Modal} from '../Modal';
import type {ModalCloseReason, ModalProps} from '../Modal';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {ButtonClose} from './ButtonClose/ButtonClose';
import {DialogBody} from './DialogBody/DialogBody';
import {DialogDivider} from './DialogDivider/DialogDivider';
import {DialogFooter} from './DialogFooter/DialogFooter';
import {DialogHeader} from './DialogHeader/DialogHeader';

import './Dialog.scss';

const b = block('dialog');

interface DialogOwnProps {
    open: boolean;
    children: React.ReactNode;
    onEscapeKeyDown?: ModalProps['onEscapeKeyDown'];
    onEnterKeyDown?: ModalProps['onEnterKeyDown'];
    onOutsideClick?: ModalProps['onOutsideClick'];
    onClose: (
        event: MouseEvent | KeyboardEvent,
        reason: ModalCloseReason | 'closeButtonClick',
    ) => void;
    onTransitionEnter?: ModalProps['onTransitionEnter'];
    onTransitionEntered?: ModalProps['onTransitionEntered'];
    onTransitionExit?: ModalProps['onTransitionExit'];
    onTransitionExited?: ModalProps['onTransitionExited'];
    className?: string;
    modalClassName?: string;
    size?: 's' | 'm' | 'l';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    container?: HTMLElement;
    disableFocusTrap?: boolean;
    disableAutoFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    scroll?: 'inner' | 'outer';
}

interface DialogDefaultProps {
    disableBodyScrollLock: boolean;
    disableEscapeKeyDown: boolean;
    disableOutsideClick: boolean;
    keepMounted: boolean;
    hasCloseButton: boolean;
}

export type DialogProps = DialogOwnProps & Partial<DialogDefaultProps>;
type DialogInnerProps = DialogOwnProps & DialogDefaultProps & QAProps;

export class Dialog extends React.Component<DialogInnerProps> {
    static defaultProps: DialogDefaultProps = {
        disableBodyScrollLock: false,
        disableEscapeKeyDown: false,
        disableOutsideClick: false,
        keepMounted: false,
        hasCloseButton: true,
    };

    static Footer = DialogFooter;
    static Header = DialogHeader;
    static Body = DialogBody;
    static Divider = DialogDivider;

    render() {
        const {
            container,
            children,
            open,
            disableBodyScrollLock,
            disableEscapeKeyDown,
            disableOutsideClick,
            disableFocusTrap,
            disableAutoFocus,
            restoreFocusRef,
            keepMounted,
            size,
            scroll = 'outer',
            className,
            modalClassName,
            hasCloseButton,
            onEscapeKeyDown,
            onEnterKeyDown,
            onOutsideClick,
            onClose,
            onTransitionEnter,
            onTransitionEntered,
            onTransitionExit,
            onTransitionExited,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            qa,
        } = this.props;

        return (
            <Modal
                open={open}
                scroll={scroll}
                disableBodyScrollLock={disableBodyScrollLock}
                disableEscapeKeyDown={disableEscapeKeyDown}
                disableOutsideClick={disableOutsideClick}
                disableFocusTrap={disableFocusTrap}
                disableAutoFocus={disableAutoFocus}
                restoreFocusRef={restoreFocusRef}
                keepMounted={keepMounted}
                onEscapeKeyDown={onEscapeKeyDown}
                onEnterKeyDown={onEnterKeyDown}
                onOutsideClick={onOutsideClick}
                onClose={onClose}
                onTransitionEnter={onTransitionEnter}
                onTransitionEntered={onTransitionEntered}
                onTransitionExit={onTransitionExit}
                onTransitionExited={onTransitionExited}
                className={b('modal', modalClassName)}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                container={container}
                qa={qa}
            >
                <div className={b({size, 'has-close': hasCloseButton, scroll}, className)}>
                    {children}
                    {hasCloseButton && <ButtonClose onClose={this.handleCloseButtonClick} />}
                </div>
            </Modal>
        );
    }

    private handleCloseButtonClick = (event: React.MouseEvent) => {
        const {onClose} = this.props;
        onClose(event.nativeEvent, 'closeButtonClick');
    };
}
