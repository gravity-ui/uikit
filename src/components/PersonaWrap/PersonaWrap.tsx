import React, {FC, MouseEvent, ReactNode} from 'react';

import {Icon} from '../Icon';
import {CrossIcon} from '../icons';
import {block} from '../utils/cn';

import './PersonaWrap.scss';

const b = block('persona');

export interface PersonaWrapProps {
    avatar: ReactNode;
    children?: ReactNode;
    isEmpty?: boolean;
    theme?: 'default' | 'clear';
    size?: 's' | 'n';
    onClose?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
    className?: string;
}

export const PersonaWrap: FC<PersonaWrapProps> = ({
    size = 's',
    theme = 'default',
    isEmpty,
    onClick,
    onClose,
    className,
    avatar,
    children,
}) => {
    const clickable = Boolean(onClick);
    const closeable = Boolean(onClose);
    return (
        <div className={b({size, theme, clickable, closeable, empty: isEmpty}, className)}>
            <div className={b('main')} onClick={onClick}>
                {avatar && <div className={b('avatar')}>{avatar}</div>}
                <div className={b('text')}>{children}</div>
            </div>
            {onClose && (
                <div className={b('close')} onClick={onClose}>
                    <Icon data={CrossIcon} size={8} />
                </div>
            )}
        </div>
    );
};

PersonaWrap.displayName = 'PersonaWrap';
