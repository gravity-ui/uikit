import React from 'react';

import type {ButtonSize, ButtonView} from '../Button';
import {Button} from '../Button';
import {block} from '../utils/cn';

import {componentClassName} from './constants';

import './PlaceholderContainer.scss';

const b = block(componentClassName);

export type PlaceholderContainerActionProps = {
    text: string;
    loading?: boolean;
    disabled?: boolean;
    view?: ButtonView;
    size?: ButtonSize;
    handler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    href?: string;
};

export const PlaceholderContainerAction = (props: PlaceholderContainerActionProps) => {
    const {text, handler, loading, disabled, view = 'normal', size = 'm', href} = props;

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
