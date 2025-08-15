import * as React from 'react';

import type {HsvaColor} from '@uiw/react-color';

import {Modes} from './types';
import {getTextValueByMode} from './utils';

type ColorPickerState = {
    open: boolean;
    hsva: HsvaColor;
    modeState: Modes;
    inputValue: string;
};

export const useColorPickerState = (
    initialColor: HsvaColor,
    mode: Modes,
    withAlpha: boolean,
): [ColorPickerState, React.Dispatch<React.SetStateAction<ColorPickerState>>] => {
    const [state, setState] = React.useState<ColorPickerState>(() => ({
        open: false,
        hsva: initialColor,
        modeState: mode,
        inputValue: getTextValueByMode(initialColor, mode, mode === Modes.Hex ? false : withAlpha),
    }));

    return [state, setState];
};
