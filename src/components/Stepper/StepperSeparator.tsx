import {ChevronRight} from '@gravity-ui/icons';

import {Icon} from '../Icon';

import {b} from './utils';

import './Stepper.scss';

type StepperSeparatorProps = {
    separator?: React.ReactNode;
};

export const StepperSeparator = ({separator}: StepperSeparatorProps) => {
    if (separator) {
        return separator;
    }

    return <Icon data={ChevronRight} className={b('separator')} />;
};
