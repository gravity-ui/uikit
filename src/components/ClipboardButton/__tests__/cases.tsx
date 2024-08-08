import {
    sizeCases as buttonSizeCases,
    viewsCases as buttonViewsCases,
} from '../../Button/__tests__/cases';
import type {ClipboardButtonProps} from '../ClipboardButton';

export const defaultProps: ClipboardButtonProps = {
    text: 'Text',
    onCopy: () => {},
};

export const sizeCases: Array<ClipboardButtonProps['size']> = buttonSizeCases;
export const viewCases: Array<ClipboardButtonProps['view']> = buttonViewsCases;
