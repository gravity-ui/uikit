import type {ButtonSize} from '../Button/Button';
import {block} from '../utils/cn';

const b = block('emoji-palette');

export const emojiPaletteClassNames = {
    palette: ({size}: {size: ButtonSize}, className?: string) => b({size}, className),
    option: (className?: string) => b('option', className),
};
