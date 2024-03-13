import React from 'react';

import type {ButtonProps, DialogProps} from '..';
import {Dialog} from '..';
import {block} from '../utils/cn';

import './Confirm.scss';

const b = block('confirm');

export type ConfirmProps = {
    title?: string;
    message?: string;
    content?: React.ReactNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    onClose?: DialogProps['onClose'];
} & Omit<DialogProps, 'children' | 'onClose'>;

export const Confirm = ({
    title,
    message = '',
    content,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onCancel,
    confirmButtonProps,
    cancelButtonProps,
    onClose,
    ...dialogProps
}: ConfirmProps) => {
    return (
        <Dialog {...dialogProps} onClose={onClose ?? onCancel}>
            <Dialog.Header caption={title} />
            <Dialog.Body>
                {content}
                {message && !content && <p className={b('message')}>{message}</p>}
            </Dialog.Body>
            <Dialog.Footer
                preset="default"
                showError={false}
                listenKeyEnter
                textButtonApply={confirmButtonText}
                textButtonCancel={cancelButtonText}
                onClickButtonApply={onConfirm}
                onClickButtonCancel={onCancel}
                propsButtonCancel={cancelButtonProps}
                propsButtonApply={confirmButtonProps}
            />
        </Dialog>
    );
};
