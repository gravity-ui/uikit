import type {PopoverTheme} from '../../../types';

export const getButtonView = (theme: PopoverTheme, isAction = false) => {
    switch (theme) {
        case 'special':
            return isAction ? 'normal-contrast' : 'flat-contrast';
        case 'announcement':
            return isAction ? 'normal-contrast' : 'outlined';
        default:
            return isAction ? 'normal' : 'flat';
    }
};
