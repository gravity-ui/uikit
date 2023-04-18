import React, {FC} from 'react';
import {Button} from '../Button';
import {Icon} from '../Icon';
import {CrossIcon} from '../icons';
import {block} from '../utils/cn';
import {PersonaButtonProps} from './types';

const b = block('persona');

export const PersonaButton: FC<PersonaButtonProps> = ({className, ...props}) => {
    return (
        <Button
            {...props}
            view={'flat-secondary'}
            pin={'circle-circle'}
            className={b('close', className)}
        >
            <Icon data={CrossIcon} size={8} />
        </Button>
    );
};

PersonaButton.displayName = 'Persona.Button';
