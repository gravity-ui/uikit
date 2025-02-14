import {ChevronRight} from '@gravity-ui/icons';

import {Icon} from '../Icon';

import {b} from './utils';

import './Stepper.scss';

type StepperSeparatorProps = {
    separator?: React.ReactNode;
};

export const StepperSeparator = ({separator}: StepperSeparatorProps) => {
    return (
        <div className={b('separator')} aria-hidden={true}>
            {separator ?? <Icon data={ChevronRight} />}
        </div>
    );
};
