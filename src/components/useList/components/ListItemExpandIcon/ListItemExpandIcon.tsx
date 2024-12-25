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
    behavior = 'action',
    disabled,
}: ListItemExpandIconProps) => {
    return (
        <ArrowToggle
            direction={getIconDirection({behavior, expanded})}
            className={b(null, colorText({color: disabled ? 'hint' : undefined}))}
            size={16}
        />
    );
};

function getIconDirection({
    behavior,
    expanded,
}: Pick<ListItemExpandIconRenderProps, 'expanded' | 'behavior'>): ArrowToggleProps['direction'] {
    if (expanded && behavior === 'action') {
        return 'top';
    } else if (expanded && behavior === 'state') {
        return 'bottom';
    } else if (expanded && behavior === 'state-inverse') {
        return 'bottom';
    } else if (behavior === 'action') {
        return 'bottom';
    } else if (behavior === 'state') {
        return 'right';
    } else if (behavior === 'state-inverse') {
        return 'left';
    }

    return 'bottom';
}
