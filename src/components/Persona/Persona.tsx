import React from 'react';

import {Envelope} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {PersonaWrap} from '../PersonaWrap';

import {getTwoLetters} from './getTwoLetters';

export interface PersonaProps {
    /** Visible text */
    text: string;
    /** Image source */
    image?: string;
    /**
     * Visual appearance (with or without border)
     * @deprecated Use `hasBorder` prop instead
     */
    theme?: 'default' | 'clear';
    /** Display border */
    hasBorder?: boolean;
    /** Avatar appearance */
    type?: 'person' | 'email' | 'empty';
    /** Text size */
    size?: 's' | 'n';
    /** Handle click on button with cross */
    onClose?: (text: string) => void;
    /** Handle click on component itself */
    onClick?: (text: string) => void;
    /** Custom CSS class for root element */
    className?: string;
}

export function Persona({
    size = 's',
    theme = 'default',
    hasBorder = theme === 'default',
    type = 'person',
    onClick,
    onClose,
    text,
    image,
    className,
}: PersonaProps) {
    let avatar: React.ReactNode | null;

    switch (type) {
        case 'person':
            avatar = image ? <img alt={''} src={image} /> : <span>{getTwoLetters(text)}</span>;
            break;
        case 'email':
            avatar = <Icon data={Envelope} size={14} />;
            break;
        case 'empty':
            avatar = null;
            break;
    }

    return (
        <PersonaWrap
            size={size}
            theme={hasBorder ? 'default' : 'clear'}
            isEmpty={type === 'empty'}
            onClick={onClick && onClick.bind(null, text)}
            onClose={onClose && onClose.bind(null, text)}
            avatar={avatar}
            className={className}
        >
            {text}
        </PersonaWrap>
    );
}

Persona.displayName = 'Persona';
