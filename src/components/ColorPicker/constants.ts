import type {HsvaColor} from '@uiw/react-color';

import {block} from '../utils/cn';

import './ColorPicker.scss';

export const b = block('color-picker');
export const DEFAULT_COLOR: HsvaColor = {h: 0, s: 0, v: 68, a: 1};
