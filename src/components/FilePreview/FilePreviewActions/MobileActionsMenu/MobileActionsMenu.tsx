import * as React from 'react';

import {EllipsisVertical} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {List} from '../../../List';
import type {ListProps} from '../../../List';
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

const renderListItem = (item: FilePreviewAction) => {
    return (
        <div className={cn('list-item')}>
            {item.icon}
            <Text variant="body-2" title={item.title} ellipsis>
                {item.title}
            </Text>
        </div>
    );
};

export const MobileActionsMenu = ({actions, fileName, isCustomImage}: MobileActionsMenuProps) => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    const handleMobileMenuClose = React.useCallback(() => {
        setShowMobileMenu(false);
    }, []);

    const handleItemClick = React.useCallback<
        NonNullable<ListProps<FilePreviewAction>['onItemClick']>
    >((item, _, __, event) => {
        if (event) {
            // function can be called only on a mobile device
            item.onClick?.(event as React.MouseEvent<HTMLDivElement, MouseEvent>);
        }
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
                    items={actions}
                    filterable={false}
                    renderItem={renderListItem}
                    itemHeight={44}
                    virtualized={false}
                    onItemClick={handleItemClick}
                />
            </Sheet>
        </React.Fragment>
    );
};
