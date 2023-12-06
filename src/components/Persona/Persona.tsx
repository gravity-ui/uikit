import React from 'react';

import {Envelope} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {PersonaWrap} from '../PersonaWrap';

import i18n from './i18n';
import type {PersonaProps} from './types';
import {extractTextValue, extractTextView, getTwoLetters} from './utils';

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
    style,
    qa,
}: PersonaProps) {
    const textValue = extractTextValue(text);
    const textView = extractTextView(text);
    const closeButtonAriaAttributes: React.AriaAttributes = {
        'aria-label': i18n('label_remove-button', {persona: textValue}),
    };
    let avatar: React.ReactNode | null;

    switch (type) {
        case 'person':
            avatar = image ? <img alt={''} src={image} /> : <span>{getTwoLetters(textValue)}</span>;
            break;
        case 'email':
            avatar = <Icon data={Envelope} size={14} />;
            break;
        case 'empty':
            avatar = null;
            break;
    }

    const handleClick = React.useCallback(() => {
        onClick?.(textValue);
    }, [textValue, onClick]);

    const handleClose = React.useCallback(() => {
        onClose?.(textValue);
    }, [textValue, onClose]);

    return (
        <PersonaWrap
            size={size}
            theme={hasBorder ? 'default' : 'clear'}
            isEmpty={type === 'empty'}
            onClick={onClick && handleClick}
            onClose={onClose && handleClose}
            avatar={avatar}
            className={className}
            style={style}
            closeButtonAriaAttributes={closeButtonAriaAttributes}
            qa={qa}
        >
            {textView}
        </PersonaWrap>
    );
}

Persona.displayName = 'Persona';
