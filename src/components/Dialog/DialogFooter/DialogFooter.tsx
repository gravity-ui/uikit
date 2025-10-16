'use client';

import * as React from 'react';

import type {UseFloatingOptions} from '@floating-ui/react';

import {useForkRef} from '../../../hooks';
import {Button} from '../../Button';
import type {ButtonButtonProps, ButtonLinkProps, ButtonView} from '../../Button';
import {Popup} from '../../Popup';
import {block} from '../../utils/cn';
import {DialogPrivateContext} from '../DialogPrivateContext';

import './DialogFooter.scss';

const b = block('dialog-footer');

type ButtonPreset = 'default' | 'success' | 'danger';

interface DialogFooterOwnProps {
    onClickButtonApply?: (event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
    onClickButtonCancel?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    textButtonCancel?: string;
    textButtonApply?: string;
    propsButtonCancel?: ButtonButtonProps | ButtonLinkProps;
    propsButtonApply?: ButtonButtonProps | ButtonLinkProps;
    loading?: boolean;
    children?: React.ReactNode;
    errorText?: string;
    renderButtons?: (
        buttonApply: React.ReactNode,
        buttonCancel: React.ReactNode,
    ) => React.ReactNode;
    className?: string;
}

interface DialogFooterDefaultProps {
    preset: ButtonPreset;
    showError: boolean;
}

// TODO: Оно точно нужно?
function getButtonView(preset: ButtonPreset): ButtonView {
    switch (preset) {
        case 'default':
            return 'action';
        case 'success':
            return 'action';
        case 'danger':
            return 'action';
        default:
            return 'action';
    }
}

export type DialogFooterProps = DialogFooterOwnProps & Partial<DialogFooterDefaultProps>;

export function DialogFooter(props: DialogFooterProps) {
    const {
        onClickButtonCancel,
        onClickButtonApply,
        loading,
        textButtonCancel,
        textButtonApply,
        propsButtonCancel,
        propsButtonApply,
        preset = 'default',
        children,
        errorText,
        showError = false,
        renderButtons,
        className,
    } = props;

    const {initialFocusRef, initialFocusAction, onTooltipEscapeKeyDown} =
        React.useContext(DialogPrivateContext);

    const errorTooltipRef = React.useRef<HTMLButtonElement>(null);
    const apllyBtnRef = useForkRef(
        errorTooltipRef,
        initialFocusAction === 'apply' ? initialFocusRef : null,
    );
    const cancelBtnRef = useForkRef(initialFocusAction === 'cancel' ? initialFocusRef : null);

    const buttonCancel = (
        <div className={b('button', {action: 'cancel'})}>
            <Button
                ref={cancelBtnRef}
                view={textButtonApply ? 'flat' : 'normal'}
                size="l"
                width="max"
                onClick={onClickButtonCancel}
                disabled={loading}
                {...propsButtonCancel}
            >
                {textButtonCancel}
            </Button>
        </div>
    );

    const handleOpenChange = React.useCallback<NonNullable<UseFloatingOptions['onOpenChange']>>(
        (isOpen, event, reason) => {
            if (!isOpen && event && reason === 'escape-key') {
                onTooltipEscapeKeyDown?.(event as KeyboardEvent);
            }
        },
        [onTooltipEscapeKeyDown],
    );

    const buttonApply = (
        <div className={b('button', {action: 'apply'})}>
            <Button
                ref={apllyBtnRef}
                type="submit"
                view={getButtonView(preset)}
                size="l"
                width="max"
                onClick={onClickButtonApply}
                loading={loading}
                className={b('button-apply', {preset})}
                {...propsButtonApply}
            >
                {textButtonApply}
            </Button>
            {errorText && (
                <Popup
                    open={showError}
                    onOpenChange={handleOpenChange}
                    anchorRef={errorTooltipRef}
                    placement="top"
                    disablePortal
                    hasArrow
                >
                    <div className={b('error')}>{errorText}</div>
                </Popup>
            )}
        </div>
    );

    return (
        <div className={b(null, className)}>
            <div className={b('children')}>{children}</div>
            <div className={b('bts-wrapper')}>
                {renderButtons ? (
                    renderButtons(buttonApply, buttonCancel)
                ) : (
                    <React.Fragment>
                        {textButtonCancel && buttonCancel}
                        {textButtonApply && buttonApply}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
