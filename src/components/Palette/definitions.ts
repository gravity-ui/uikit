import type {ButtonSize} from '../Button/Button';
import {block} from '../utils/cn';

const b = block('palette');

export const paletteClassNames = {
    row: (className?: string) => b('row', className),
    palette: ({size}: {size: ButtonSize}, className?: string) => b({size}, className),
    option: (className?: string) => b('option', className),
};
