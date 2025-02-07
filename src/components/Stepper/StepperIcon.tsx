import * as React from 'react';

import {CircleCheck, CircleDashed, CircleExclamation} from '@gravity-ui/icons';

import {Icon} from '../Icon';

import type {StepperItemProps} from './StepperItem';
import {b} from './utils';

import './Stepper.scss';

type StepperIconProps = {
    view: StepperItemProps['view'];
    icon?: React.ReactNode;
};

export const StepperIcon = (props: StepperIconProps) => {
    const {view, icon: customIcon} = props;

    const icon = React.useMemo(() => {
        switch (view) {
            case 'idle': {
                return CircleDashed;
            }
            case 'error': {
                return CircleExclamation;
            }
            case 'success': {
                return CircleCheck;
            }
            default: {
                return CircleDashed;
            }
        }
    }, [view]);

    return (
        <div className={b('item__icon', {view})}>
            {customIcon ? customIcon : <Icon data={icon} />}
        </div>
    );
};
