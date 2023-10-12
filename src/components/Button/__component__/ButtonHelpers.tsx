import React from 'react';

import {Gear} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Button} from '../Button';

export const ButtonWitchIcon = () => {
    return (
        <Button>
            <Icon data={Gear} />
            Left
        </Button>
    );
};

export const ButtonIcon = () => {
    return (
        <Button>
            <Button.Icon>
                <Gear width={20} height={20} />
            </Button.Icon>
            Left
        </Button>
    );
};
