'use client';

import * as React from 'react';

import {block} from '../utils/cn';
import {prepareIcon} from '../utils/prepareIcon';

import {ButtonIconSizeContext} from './ButtonIconSizeContext';

const b = block('button');

export interface ButtonIconRenderProps {
    size?: number;
}

export interface ButtonIconProps {
    className?: string;
    side?: 'start' | 'end';
    children?: React.ReactNode | ((props: ButtonIconRenderProps) => React.ReactNode);
}

export const ButtonIcon = ({side, className, children}: ButtonIconProps) => {
    const buttonIconSize = React.useContext(ButtonIconSizeContext);

    let content =
        typeof children === 'function' ? children({size: buttonIconSize ?? undefined}) : children;

    if (typeof children !== 'function') {
        content = prepareIcon(children, buttonIconSize);
    }

    return (
        <span
            className={b(
                'icon',
                {
                    side,
                },
                className,
            )}
        >
            <span className={b('icon-inner')}>{content}</span>
        </span>
    );
};

ButtonIcon.displayName = 'Button.Icon';
