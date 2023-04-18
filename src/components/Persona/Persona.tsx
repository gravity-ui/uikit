import React, {FC, ReactNode, useCallback} from 'react';
import {Icon} from '../Icon';
import {Mail} from '../icons';
import {PersonaButton, PersonaWrap} from '../PersonaWrap';
import {getTwoLetters} from './getTwoLetters';

export interface PersonaProps {
    /** Visible text */
    text: string;
    /** Image source */
    image?: string;
    /** Visual appearance (with or without border) */
    theme?: 'default' | 'clear';
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

const PersonaComponent: FC<PersonaProps> = ({
    size = 's',
    theme = 'default',
    type = 'person',
    onClick,
    onClose,
    text,
    image,
    className,
}) => {
    let avatar: ReactNode | null;

    switch (type) {
        case 'person':
            avatar = image ? <img alt={''} src={image} /> : <span>{getTwoLetters(text)}</span>;
            break;
        case 'email':
            avatar = <Icon data={Mail} size={14} />;
            break;
        case 'empty':
            avatar = null;
            break;
    }

    const renderButton = useCallback(
        () => <PersonaButton onClick={() => onClose?.(text)} />,
        [onClose, text],
    );

    return (
        <PersonaWrap
            size={size}
            theme={theme}
            isEmpty={type === 'empty'}
            onClick={onClick && onClick.bind(null, text)}
            renderButton={onClose ? renderButton : undefined}
            avatar={avatar}
            className={className}
        >
            {text}
        </PersonaWrap>
    );
};

PersonaComponent.displayName = 'Persona';

export const Persona = Object.assign(PersonaComponent, {Button: PersonaButton});
