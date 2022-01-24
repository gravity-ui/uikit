import React from 'react';
import {range} from 'lodash';
import {block} from '../../utils/cn';
import {Button} from '../../Button';
import {Select, SelectProps} from '../';

import './SelectShowcase.scss';

const b = block('select-showcase');

const getSelectValue = (counter: number) => {
    return range(0, counter).map((index) => `Value ${index + 1}`);
};

export const SelectShowcase = (props: SelectProps) => {
    const [counter, setCounter] = React.useState(2);

    return (
        <div className={b()}>
            <div className={b('value-controls')}>
                Values:
                <Button disabled={counter <= 0} onClick={() => setCounter(counter - 1)}>
                    -
                </Button>
                {counter}
                <Button onClick={() => setCounter(counter + 1)}>+</Button>
                <Button onClick={() => setCounter(0)}>Reset</Button>
            </div>
            <div className={b('container')} tabIndex={1}>
                <Select {...props} value={getSelectValue(counter)} />
            </div>
        </div>
    );
};
