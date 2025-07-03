import {HexColorInput} from 'react-colorful';

import {block} from '../../utils/cn';
import type {ColorInputProps} from '../types';
import {ColorPickerMode} from '../types';

import {RgbInput} from './RgbInput/RgbInput';

import './ColorInput.scss';

const b = block('color-input');

export const ColorInput = ({value, mode, withAlpha, onChange, onBlur}: ColorInputProps) => {
    if (mode === ColorPickerMode.HEX) {
        return (
            <HexColorInput
                className={b('control')}
                color={value}
                alpha={withAlpha}
                prefixed
                onChange={onChange}
                onBlur={onBlur}
            />
        );
    } else if (mode === ColorPickerMode.RGB) {
        return <RgbInput value={value} onChange={onChange} />;
    }
    return null;
};
