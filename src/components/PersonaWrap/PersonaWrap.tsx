import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {block} from '../utils/cn';

import './PersonaWrap.scss';

const b = block('persona');

export interface PersonaWrapProps {
    avatar: React.ReactNode;
    children?: React.ReactNode;
    isEmpty?: boolean;
    theme?: 'default' | 'clear';
    size?: 's' | 'n';
    onClose?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    closeButtonAriaAttributes?: React.AriaAttributes;
}

export function PersonaWrap({
    size = 's',
    theme = 'default',
    isEmpty,
    onClick,
    onClose,
    className,
    avatar,
    children,
    style,
    closeButtonAriaAttributes,
}: PersonaWrapProps) {
    const clickable = Boolean(onClick);
    const closeable = Boolean(onClose);
    return (
        <div
            className={b({size, theme, clickable, closeable, empty: isEmpty}, className)}
            style={style}
        >
            {React.createElement(
                clickable ? 'button' : 'div',
                {onClick, className: b('main')},
                <React.Fragment>
                    {avatar && <div className={b('avatar')}>{avatar}</div>}
                    <div className={b('text')}>{children}</div>
                </React.Fragment>,
            )}
            {onClose && (
                <button className={b('close')} onClick={onClose} {...closeButtonAriaAttributes}>
                    <Icon data={Xmark} size={12} />
                </button>
            )}
        </div>
    );
}

PersonaWrap.displayName = 'PersonaWrap';
