import React from 'react';

import type {ButtonSize, ButtonView} from '../Button';
import {Button} from '../Button';
import {block} from '../utils/cn';

import {componentClassName} from './constants';

import './PlaceholderContainer.scss';

const b = block(componentClassName);

export interface Action {
    text: string;
    loading?: boolean;
    disabled?: boolean;
    view?: ButtonView;
    size?: ButtonSize;
    handler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    href?: string;
}

interface PlaceholderContainerActionProps {
    action: Action;
}

export const PlaceholderContainerAction = ({action}: PlaceholderContainerActionProps) => {
    const {text, handler, loading, disabled, view = 'normal', size = 'm', href} = action;

    return (
        <div className={b('action')}>
            <Button
                className={b('action-btn')}
                view={view}
                size={size}
                loading={loading}
                disabled={disabled}
                onClick={handler}
                href={href}
            >
                {text}
            </Button>
        </div>
    );
};
