import {Percent} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {NumberInput} from '../../NumberInput';
import {block} from '../../utils/cn';
import type {AlphaInputProps} from '../types';

import './AlphaInput.scss';

const b = block('alpha-input');

export const AlphaInput = ({value, onChange, onBlur}: AlphaInputProps) => {
    return (
        <NumberInput
            className={b()}
            value={value}
            onUpdate={onChange}
            onBlur={onBlur}
            hiddenControls
            endContent={
                <Icon className={b('percent')} width={12} height={12} data={Percent}></Icon>
            }
        />
    );
};
