import {Text} from '../Text';
import type {TextProps} from '../Text';

import type {StepperProps} from './Stepper';
import {StepperIcon} from './StepperIcon';
import type {StepperItemView} from './types';
import {b} from './utils';

import './Stepper.scss';

export interface StepperItemProps {
    id?: string | number;
    children: React.ReactNode;
    view?: StepperItemView;
    disabled?: boolean;
    selected?: string | number;
    variant?: TextProps['variant'];
    icon?: React.ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
}

export const StepperItem = (props: StepperItemProps & Pick<StepperProps, 'size' | 'onUpdate'>) => {
    const {
        id,
        size,
        children,
        view = 'idle',
        variant = 'body-1',
        disabled = false,
        selected = false,
        className,
        onUpdate,
        icon,
    } = props;

    const onClick = (e: React.MouseEvent) => {
        props.onClick?.(e);

        onUpdate?.(id);
    };

    return (
        <button
            title={typeof children === 'string' ? children : undefined}
            className={b('item', {view, disabled, selected: id === selected, size}, className)}
            onClick={onClick}
            disabled={disabled}
        >
            <StepperIcon view={view} icon={icon} />
            <Text className={b('item__text')} variant={variant}>
                {children}
            </Text>
        </button>
    );
};
