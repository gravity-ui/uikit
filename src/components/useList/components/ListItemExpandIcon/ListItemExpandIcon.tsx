import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {colorText} from '../../../Text';
import {block} from '../../../utils/cn';
import type {ListItemExpandIconRenderProps} from '../../types';

import './ListItemExpandIcon.scss';

const b = block('list-item-expand-icon');

export interface ListItemExpandIconProps extends Partial<ListItemExpandIconRenderProps> {}

export const ListItemExpandIcon = ({
    expanded,
    disableTransition,
    position = 'start',
    disabled,
}: ListItemExpandIconProps) => {
    return (
        <Icon
            className={b(
                {expanded, disableTransition, position},
                colorText({color: disabled ? 'hint' : undefined}),
            )}
            data={ChevronDown}
            size={16}
        />
    );
};

// For correct rendering inside `Button` component
ListItemExpandIcon.displayName = 'Icon';
