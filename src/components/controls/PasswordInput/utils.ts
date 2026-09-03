import type {ButtonSize} from '../../Button';
import type {InputControlSize} from '../types';

export const getActionButtonSize = (textInputSize: InputControlSize): ButtonSize => {
    let actionButtonSize: ButtonSize = 's';

    switch (textInputSize) {
        case 's': {
            actionButtonSize = 'xs';
            break;
        }
        case 'l': {
            actionButtonSize = 'm';
            break;
        }
        case 'xl': {
            actionButtonSize = 'l';
        }
    }

    return actionButtonSize;
};
