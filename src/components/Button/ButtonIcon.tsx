'use client';

import * as React from 'react';

import {block} from '../utils/cn';
import {prepareIcon} from '../utils/prepareIcon';
import {warnOnce} from '../utils/warn';

import {ButtonIconSizeContext} from './ButtonIconSizeContext';

const b = block('button');

export interface ButtonIconRenderProps {
    size?: number;
}

export interface ButtonIconProps {
    className?: string;
    side?: 'left' | 'right' | 'start' | 'end';
    children?: React.ReactNode | ((props: ButtonIconRenderProps) => React.ReactNode);
}

function warnAboutPhysicalValues() {
    warnOnce(
        '[Button.Icon] Physical values (left, right) of "side" property are deprecated. Use logical values (start, end) instead.',
    );
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
                    side: getIconSide(side),
                },
                className,
            )}
        >
            <span className={b('icon-inner')}>{content}</span>
        </span>
    );
};

ButtonIcon.displayName = 'Button.Icon';

export function getIconSide(side?: 'left' | 'right' | 'start' | 'end') {
    let sideMod = side;

    if (sideMod === 'left') {
        warnAboutPhysicalValues();
        sideMod = 'start';
    }
    if (sideMod === 'right') {
        warnAboutPhysicalValues();
        sideMod = 'end';
    }

    return sideMod;
}
