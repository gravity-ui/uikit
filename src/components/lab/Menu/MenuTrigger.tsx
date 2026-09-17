import * as React from 'react';

import {Ellipsis, EllipsisVertical} from '@gravity-ui/icons';

import {Button} from '../../Button';
import type {ButtonButtonProps} from '../../Button';
import {Icon} from '../../Icon';
import {useDefaultProps} from '../../theme/useDefaultProps';

export interface MenuTriggerProps extends ButtonButtonProps {
    icon?: 'horizontal' | 'vertical';
}

export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
    (rawProps, ref) => {
        const {
            size = 'm',
            children,
            icon = 'horizontal',
            ...restProps
        } = useDefaultProps('unstable_MenuTrigger', rawProps);

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
