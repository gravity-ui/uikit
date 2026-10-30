import {EllipsisVertical} from '@gravity-ui/icons';

import {ActionTooltip} from '../../../../ActionTooltip';
import {Button} from '../../../../Button';
import {Icon} from '../../../../Icon';
import {Menu, MenuItem} from '../../../../Menu';
import type {MenuItemButtonProps} from '../../../../Menu';
import {cn} from '../../../../utils/cn';

import './CompactActionsMenu.scss';

const b = cn('file-preview-actions-compact');

export interface CompactActionsMenuProps {
    actions: MenuItemButtonProps[];
}

export const CompactActionsMenu = ({actions}: CompactActionsMenuProps) => {
    return (
        <div className={b()}>
            <ActionTooltip title="Actions">
                <Menu
                    size="s"
                    trigger={
                        <Button size="s" view="raised" pin="circle-circle" aria-label="Actions">
                            <Icon data={EllipsisVertical} />
                        </Button>
                    }
                >
                    {actions.map(({children, ...props}, index) => (
                        <MenuItem key={index} {...props}>
                            {children}
                        </MenuItem>
                    ))}
                </Menu>
            </ActionTooltip>
        </div>
    );
};
