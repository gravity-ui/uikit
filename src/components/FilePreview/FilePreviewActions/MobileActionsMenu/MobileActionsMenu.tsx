import * as React from 'react';

import {EllipsisVertical} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {List} from '../../../List';
import type {ListItemContext, ListItemHelpers, ListProps} from '../../../List';
import {Sheet} from '../../../Sheet';
import {Text} from '../../../Text';
import {block} from '../../../utils/cn';
import type {FilePreviewAction} from '../../types';

import './MobileActionsMenu.scss';

const cn = block('file-preview-actions-mobile');

export interface MobileActionsMenuProps {
    actions: FilePreviewAction[];
    fileName: string;
    isCustomImage?: boolean;
}

const getActionId = (action: FilePreviewAction) => action.id ?? action.title;

const getActionTextValue = (action: FilePreviewAction) => action.title;

const renderAction = (
    {item}: ListItemContext<FilePreviewAction>,
    {getItemProps, getItemViewProps}: ListItemHelpers,
) => (
    <List.ItemView
        {...getItemProps({className: cn('list-item')})}
        {...getItemViewProps()}
        startContent={<span className={cn('list-item-icon')}>{item.icon}</span>}
    >
        <Text variant="body-2" title={item.title} ellipsis>
            {item.title}
        </Text>
    </List.ItemView>
);

export const MobileActionsMenu = ({actions, fileName, isCustomImage}: MobileActionsMenuProps) => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    const handleMobileMenuClose = React.useCallback(() => {
        setShowMobileMenu(false);
    }, []);

    const handleItemAction = React.useCallback<
        NonNullable<ListProps<FilePreviewAction>['onItemAction']>
    >((_id, action, event) => {
        // function can be called only on a mobile device
        action.onClick?.(event as React.MouseEvent<HTMLElement>);
        setShowMobileMenu(false);
    }, []);

    const handleMobileButtonClick = () => {
        setShowMobileMenu(true);
    };

    const buttonView = isCustomImage ? 'raised' : 'flat';

    return (
        <React.Fragment>
            <Button
                view={buttonView}
                className={cn('actions-menu')}
                onClick={handleMobileButtonClick}
                size="s"
            >
                <Icon data={EllipsisVertical} height={16} width={16} />
            </Button>
            <Sheet
                className={cn('sheet')}
                visible={showMobileMenu}
                onClose={handleMobileMenuClose}
                title={fileName}
            >
                <List
                    aria-label={fileName}
                    items={actions}
                    getItemId={getActionId}
                    getItemTextValue={getActionTextValue}
                    renderItem={renderAction}
                    onItemAction={handleItemAction}
                />
            </Sheet>
        </React.Fragment>
    );
};
