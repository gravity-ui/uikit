import * as React from 'react';

import {block} from '../utils/cn';
import {isIcon} from '../utils/common';
import {warnOnce} from '../utils/warn';

import {ButtonIconSizeContext} from './ButtonIconSizeContext';

const b = block('button');

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

    const content =
        buttonIconSize && isIcon(children)
            ? React.cloneElement(children, {
                  size:
                      children.props.size ??
                      (children.props.width === undefined && children.props.height === undefined
                          ? buttonIconSize
                          : undefined),
              })
            : children;

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
