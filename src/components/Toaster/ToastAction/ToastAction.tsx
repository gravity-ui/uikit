import React from 'react';

import {Button} from '../../Button';
import {block} from '../../utils/cn';
import {useBoolean} from '../../utils/useBoolean';
import type {ToastAction as ToastActionProps} from '../types';

const b = block('toast');

export function ToastAction({
    label,
    onClick,
    view = 'outlined',
    removeAfterClick = true,
    loadingAfterClick,
    onClose,
}: ToastActionProps & {onClose: () => void}) {
    const [loading, setLoading] = useBoolean(false);
    const onActionClick = () => {
        onClick();

        if (removeAfterClick) {
            onClose();
        }

        if (loadingAfterClick) {
            setLoading();
        }
    };

    return (
        <Button
            className={b('action')}
            onClick={onActionClick}
            type="button"
            loading={loading}
            size={'l'}
            view={view}
        >
            {label}
        </Button>
    );
}
