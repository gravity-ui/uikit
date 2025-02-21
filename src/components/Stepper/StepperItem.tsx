import * as React from 'react';

import {CircleCheck, CircleDashed, CircleExclamation} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Icon} from '../Icon';
import type {SVGIconData} from '../Icon/types';
import {Text} from '../Text';

import type {StepperProps} from './Stepper';
import type {StepperItemView} from './types';
import {b} from './utils';

import './Stepper.scss';

export interface StepperItemProps {
    id?: string | number;
    children: React.ReactNode;
    view?: StepperItemView;
    disabled?: boolean;
    icon?: SVGIconData;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
}

type ComponentProps = StepperItemProps &
    Pick<StepperProps, 'size' | 'onUpdate'> & {selected?: string | number};

export const StepperItem = (props: ComponentProps) => {
    const {
        id,
        size,
        children,
        view = 'idle',
        disabled = false,
        selected = false,
        className,
        onUpdate,
        icon: customIcon,
    } = props;

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

    const selectedItem = id === selected;

    return (
        <Button
            width="auto"
            title={typeof children === 'string' ? children : undefined}
            className={b('item', {view, disabled, selected: selectedItem, size}, className)}
            onClick={onClick}
            disabled={disabled}
            size={size}
            view={selectedItem ? 'outlined-info' : 'outlined'}
        >
            <Icon data={icon} className={b('item-icon', {view})} />
            <Text className={b('item-text')}>{children}</Text>
        </Button>
    );
};
