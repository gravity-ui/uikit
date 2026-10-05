'use client';

import * as React from 'react';

import type {ModalProps} from '../Modal';
import {Modal} from '../Modal';
import {MobileContext, useMobile} from '../mobile';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {AriaLabelingProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {ButtonClose} from './ButtonClose/ButtonClose';
import {DialogBody} from './DialogBody/DialogBody';
import {DialogDivider} from './DialogDivider/DialogDivider';
import {DialogFooter} from './DialogFooter/DialogFooter';
import {DialogHeader} from './DialogHeader/DialogHeader';
import type {DialogPrivateContextProps} from './DialogPrivateContext';
import {DialogPrivateContext} from './DialogPrivateContext';

import './Dialog.scss';

const b = block('dialog');

export interface DialogProps extends AriaLabelingProps, QAProps {
    open: boolean;
    children: React.ReactNode;
    onOpenChange?: ModalProps['onOpenChange'];
    onTransitionIn?: ModalProps['onTransitionIn'];
    onTransitionInComplete?: ModalProps['onTransitionInComplete'];
    onTransitionOut?: ModalProps['onTransitionOut'];
    onTransitionOutComplete?: ModalProps['onTransitionOutComplete'];
    className?: string;
    modalClassName?: string;
    maxWidth?: 's' | 'm' | 'l';
    fullWidth?: boolean;
    container?: HTMLElement;
    initialFocus?: ModalProps['initialFocus'] | 'cancel' | 'apply';
    returnFocus?: ModalProps['returnFocus'];
    contentOverflow?: 'visible' | 'auto';
    disableBodyScrollLock?: boolean;
    disableEscapeKeyDown?: boolean;
    disableOutsideClick?: boolean;
    keepMounted?: boolean;
    hasCloseButton?: boolean;
    /** Skip opening and closing animations. */
    disableTransition?: boolean;
}

export function Dialog(rawProps: DialogProps) {
    const {
        container,
        children,
        open,
        disableBodyScrollLock = false,
        disableEscapeKeyDown = false,
        disableOutsideClick = false,
        initialFocus,
        returnFocus,
        keepMounted = false,
        maxWidth,
        fullWidth,
        contentOverflow = 'visible',
        className,
        modalClassName,
        hasCloseButton = true,
        disableTransition,
        onOpenChange,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
        qa,
        ...restProps
    } = useDefaultProps('Dialog', rawProps);
    const mobileModals = React.useContext(MobileContext).__experimentalMobileModals ?? false;
    const mobile = useMobile() && mobileModals;
    const handleCloseButtonClick = React.useCallback(
        (event: React.MouseEvent) => {
            onOpenChange?.(false, event.nativeEvent, 'click');
        },
        [onOpenChange],
    );

    const footerAutoFocusRef = React.useRef<HTMLElement | null>(null);

    const privateContextProps = React.useMemo(() => {
        const result: DialogPrivateContextProps = {
            onTooltipEscapeKeyDown: (event: KeyboardEvent) => {
                onOpenChange?.(false, event, 'escape-key');
            },
            mobile,
        };

        if (typeof initialFocus === 'string') {
            result.initialFocusRef = footerAutoFocusRef;
            result.initialFocusAction = initialFocus;
        }

        return result;
    }, [initialFocus, onOpenChange, mobile]);

    let initialFocusValue: ModalProps['initialFocus'];
    if (typeof initialFocus === 'string') {
        initialFocusValue = footerAutoFocusRef;
    } else {
        initialFocusValue = initialFocus;
    }

    return (
        <Modal
            {...filterDOMProps(restProps, {labelable: true})}
            open={open}
            contentOverflow={mobile ? 'auto' : contentOverflow}
            disableBodyScrollLock={disableBodyScrollLock}
            disableEscapeKeyDown={disableEscapeKeyDown}
            disableOutsideClick={disableOutsideClick}
            disableVisuallyHiddenDismiss={hasCloseButton}
            initialFocus={initialFocusValue}
            returnFocus={returnFocus}
            keepMounted={keepMounted}
            onOpenChange={onOpenChange}
            onTransitionIn={onTransitionIn}
            onTransitionInComplete={onTransitionInComplete}
            onTransitionOut={onTransitionOut}
            onTransitionOutComplete={onTransitionOutComplete}
            className={b('modal', {mobile}, modalClassName)}
            container={container}
            qa={qa}
            disableTransition={disableTransition}
        >
            <div
                className={b(
                    {
                        mobile,
                        'max-width': maxWidth,
                        'full-width': mobile ? true : fullWidth,
                        'has-scroll': mobile ? true : contentOverflow === 'auto',
                    },
                    className,
                )}
            >
                {hasCloseButton && <ButtonClose mobile={mobile} onClose={handleCloseButtonClick} />}

                <DialogPrivateContext.Provider value={privateContextProps}>
                    {children}
                </DialogPrivateContext.Provider>
            </div>
        </Modal>
    );
}

Dialog.Footer = DialogFooter;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Divider = DialogDivider;
