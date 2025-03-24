import * as React from 'react';

import {CircleCheck, CircleDashed, CircleExclamation} from '@gravity-ui/icons';

import {Button} from '../Button';
import type {ButtonButtonProps} from '../Button';
import {Icon} from '../Icon';
import type {SVGIconData} from '../Icon/types';

import {useStepperContext} from './context';
import type {StepperItemView} from './types';
import {b} from './utils';

export type StepperItemProps = Omit<ButtonButtonProps, 'view'> & {
    id?: string | number;
    children: React.ReactNode;
    view?: StepperItemView;
    disabled?: boolean;
    icon?: SVGIconData;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
};

export const StepperItem = React.forwardRef<HTMLButtonElement, StepperItemProps>((props, ref) => {
    const {
        id,
        children,
        view = 'idle',
        disabled = false,
        className,
        icon: customIcon,
        ...restButtonProps
    } = props;

    const {onUpdate, value, size} = useStepperContext();

    const onClick = (e: React.MouseEvent) => {
        props.onClick?.(e);

        onUpdate?.(id);
    };

    const icon = React.useMemo(() => {
        if (customIcon) {
            return customIcon;
        }

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
    }, [view, customIcon]);

    const selectedItem = id === undefined ? false : id === value;

    return (
        <Button
            ref={ref}
            title={typeof children === 'string' ? children : undefined}
            {...restButtonProps}
            width="auto"
            className={b('item', {view, disabled, selected: selectedItem, size}, className)}
            onClick={onClick}
            disabled={disabled}
            size={size}
            view="outlined"
        >
            <Icon data={icon} className={b('item-icon', {view})} />
            {children}
        </Button>
    );
});

StepperItem.displayName = 'StepperItem';
