import {ChevronLeft, ChevronRight} from '@gravity-ui/icons';

import {Icon} from '../Icon';
import {useDirection} from '../theme';

import {b} from './utils';

type StepperSeparatorProps = {
    separator?: React.ReactNode;
};

export const StepperSeparator = ({separator}: StepperSeparatorProps) => {
    const direction = useDirection();
    return (
        <div className={b('separator')} aria-hidden={true}>
            {separator ?? <Icon data={direction === 'rtl' ? ChevronLeft : ChevronRight} />}
        </div>
    );
};
