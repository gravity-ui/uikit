import React, {FC, ReactNode, useCallback} from 'react';
import {Icon} from '../Icon';
import {Mail} from '../icons';
import {PersonaButton, PersonaWrap} from '../PersonaWrap';
import {getTwoLetters} from './getTwoLetters';
import type {PersonaProps} from './types';

const PersonaComponent: FC<PersonaProps> = ({
    size = 's',
    theme = 'default',
    type = 'person',
    onClick,
    onClose,
    renderButton,
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

    const renderCloseButton = useCallback(
        () => (renderButton ? renderButton() : <PersonaButton onClick={() => onClose?.(text)} />),
        [onClose, renderButton, text],
    );

    return (
        <PersonaWrap
            size={size}
            theme={theme}
            isEmpty={type === 'empty'}
            onClick={onClick && onClick.bind(null, text)}
            renderButton={onClose || renderButton ? renderCloseButton : undefined}
            avatar={avatar}
            className={className}
        >
            {text}
        </PersonaWrap>
    );
};

PersonaComponent.displayName = 'Persona';

export const Persona = Object.assign(PersonaComponent, {Button: PersonaButton});
