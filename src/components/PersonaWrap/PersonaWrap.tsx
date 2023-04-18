import React, {ReactNode, MouseEvent, FC} from 'react';
import {block} from '../utils/cn';
import {PersonaButton} from './PersonaButton';

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
            {onClose && <PersonaButton onClick={onClose} />}
        </div>
    );
};

PersonaWrap.displayName = 'PersonaWrap';
