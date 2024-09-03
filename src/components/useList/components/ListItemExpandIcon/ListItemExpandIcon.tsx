import React from 'react';

import type {ArrowToggleProps} from '../../../ArrowToggle';
import {ArrowToggle} from '../../../ArrowToggle';
import {colorText} from '../../../Text';
import {block} from '../../../utils/cn';
import type {ListItemExpandIconRenderProps} from '../../types';

import './ListItemExpandIcon.scss';

const b = block('list-item-expand-icon');

export interface ListItemExpandIconProps extends ListItemExpandIconRenderProps {}

export const ListItemExpandIcon = ({
    expanded,
    disableTransition,
    kind = 'action',
    disabled,
}: ListItemExpandIconProps) => {
    return (
        <ArrowToggle
            direction={getIconDirection({kind, expanded})}
            className={b({disableTransition}, colorText({color: disabled ? 'hint' : undefined}))}
            size={16}
        />
    );
};

function getIconDirection({
    kind,
    expanded,
}: Pick<ListItemExpandIconRenderProps, 'expanded' | 'kind'>): ArrowToggleProps['direction'] {
    if (expanded && kind === 'action') {
        return 'top';
    } else if (expanded && kind === 'state') {
        return 'bottom';
    } else if (expanded && kind === 'state-inverse') {
        return 'bottom';
    } else if (kind === 'action') {
        return 'bottom';
    } else if (kind === 'state') {
        return 'right';
    } else if (kind === 'state-inverse') {
        return 'left';
    }

    return 'bottom';
}
