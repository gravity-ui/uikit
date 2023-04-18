import React, {FC, MouseEventHandler} from 'react';
import {Button} from '../Button';
import {Icon} from '../Icon';
import {CrossIcon} from '../icons';
import {block} from '../utils/cn';

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const b = block('persona');

export const PersonaButton: FC<Props> = ({onClick}) => {
    return (
        <Button
            view={'flat-secondary'}
            pin={'circle-circle'}
            className={b('close')}
            onClick={onClick}
        >
            <Icon data={CrossIcon} size={8} />
        </Button>
    );
};

PersonaButton.displayName = 'Persona.Button';
