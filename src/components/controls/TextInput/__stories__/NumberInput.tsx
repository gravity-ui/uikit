import React from 'react';

import {Minus, Plus} from '@gravity-ui/icons';

import {Button} from '../../../Button/Button';
import {Icon} from '../../../Icon/Icon';
import {TextInput} from '../TextInput';

import './NumberInput.scss';

export const NumberInputShowcase = () => {
    const [value, setValue] = React.useState('0');

    return (
        <TextInput
            className="g-number-input-example"
            size="m"
            type="number"
            value={value}
            leftContent={
                <Button size="s" onClick={() => setValue(String(Number(value) - 1))}>
                    <Icon data={Minus} />
                </Button>
            }
            rightContent={
                <Button size="s" onClick={() => setValue(String(Number(value) + 1))}>
                    <Icon data={Plus} />
                </Button>
            }
        />
    );
};
