import * as React from 'react';

import {Ellipsis, EllipsisVertical} from '@gravity-ui/icons';

import {Button} from '../../Button';
import type {ButtonButtonProps} from '../../Button';
import {Icon} from '../../Icon';

export interface MenuTriggerProps extends ButtonButtonProps {
    icon?: 'horizontal' | 'vertical';
}

export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
    ({size = 'm', children, icon = 'horizontal', ...restProps}, ref) => {
        return (
            <Button ref={ref} size={size} {...restProps}>
                {children ? (
                    children
                ) : (
                    <Icon data={icon === 'vertical' ? EllipsisVertical : Ellipsis} />
                )}
            </Button>
        );
    },
);

MenuTrigger.displayName = 'Menu.Trigger';
