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
}: PersonaWrapProps) {
    const clickable = Boolean(onClick);
    const closeable = Boolean(onClose);
    return (
        <div
            className={b({size, theme, clickable, closeable, empty: isEmpty}, className)}
            style={style}
        >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className={b('main')} onClick={onClick}>
                {avatar && <div className={b('avatar')}>{avatar}</div>}
                <div className={b('text')}>{children}</div>
            </div>
            {onClose && (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div className={b('close')} onClick={onClose}>
                    <Icon data={Xmark} size={12} />
                </div>
            )}
        </div>
    );
}

PersonaWrap.displayName = 'PersonaWrap';
