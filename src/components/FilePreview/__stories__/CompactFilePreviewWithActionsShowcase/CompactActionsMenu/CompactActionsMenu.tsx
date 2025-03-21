import {EllipsisVertical} from '@gravity-ui/icons';

import {ActionTooltip} from '../../../../ActionTooltip';
import type {DropdownMenuItem, DropdownMenuProps} from '../../../../DropdownMenu';
import {DropdownMenu} from '../../../../DropdownMenu';
import {Icon} from '../../../../Icon';
import {cn} from '../../../../utils/cn';

import './CompactActionsMenu.scss';

const b = cn('file-preview-actions-compact');

export interface CompactActionsMenuProps {
    actions: DropdownMenuItem[];
}

const actionsButtonProps: DropdownMenuProps<unknown>['defaultSwitcherProps'] = {
    size: 's',
    view: 'raised',
    pin: 'circle-circle',
    'aria-label': 'Actions',
};

const actionsButtonIcon = <Icon data={EllipsisVertical} />;

export const CompactActionsMenu = ({actions}: CompactActionsMenuProps) => {
    return (
        <div className={b()}>
            <ActionTooltip title="Actions">
                <DropdownMenu
                    items={actions}
                    size="s"
                    defaultSwitcherProps={actionsButtonProps}
                    icon={actionsButtonIcon}
                />
            </ActionTooltip>
        </div>
    );
};
