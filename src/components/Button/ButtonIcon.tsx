'use client';

import * as React from 'react';

import {Icon} from '../Icon';
import {block} from '../utils/cn';
import {isSvg} from '../utils/common';
import {isOfType} from '../utils/isOfType';
import {warnOnce} from '../utils/warn';

import {ButtonIconSizeContext} from './ButtonIconSizeContext';

const b = block('button');
const isIcon = isOfType(Icon, {matchDisplayName: false});

type Props = React.PropsWithChildren<{
    className?: string;
    side?: 'left' | 'right' | 'start' | 'end';
}>;

function warnAboutPhysicalValues() {
    warnOnce(
        '[Button.Icon] Physical values (left, right) of "side" property are deprecated. Use logical values (start, end) instead.',
    );
}

export const ButtonIcon = ({side, className, children}: Props) => {
    const buttonIconSize = React.useContext(ButtonIconSizeContext);

    let content = children;

    if (buttonIconSize !== null) {
        if (
            isIcon(children) &&
            children.props.size === undefined &&
            (children.props.width === undefined || children.props.height === undefined)
        ) {
            content = React.cloneElement(children, {size: buttonIconSize});
        } else if (isSvg(children)) {
            const width = children.props.width ?? buttonIconSize;
            const height = children.props.height ?? buttonIconSize;

            if (width !== children.props.width || height !== children.props.height) {
                content = React.cloneElement(children, {width, height});
            }
        }
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
