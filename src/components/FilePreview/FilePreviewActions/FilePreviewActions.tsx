import * as React from 'react';

import {EllipsisVertical} from '@gravity-ui/icons';

import {useUniqId} from '../../../hooks/useUniqId';
import {ActionTooltip} from '../../ActionTooltip';
import {Button} from '../../Button';
import type {ButtonButtonProps, ButtonLinkProps} from '../../Button';
import {Icon} from '../../Icon';
import {List} from '../../List';
import type {ListProps} from '../../List';
import {Sheet} from '../../Sheet';
import {Text} from '../../Text';
import {useMobile} from '../../mobile';
import {block} from '../../utils/cn';
import type {FilePreviewActionProps} from '../types';

import './FilePreviewActions.scss';

const cn = block('file-preview-actions');

export interface FilePreviewActionsProps {
    actions?: FilePreviewActionProps[];
    hoverabelPanelClassName: string;
    fileName: string;
    isCustomImage?: boolean;
}

const renderListItem = (item: FilePreviewActionProps) => {
    return (
        <div className={cn('mobile-list-item')}>
            {item.icon}
            <Text variant="body-2" title={item.title} ellipsis>
                {item.title}
            </Text>
        </div>
    );
};

export const FilePreviewActions = ({
    actions,
    fileName,
    hoverabelPanelClassName,
    isCustomImage,
}: FilePreviewActionsProps) => {
    const id = useUniqId();
    const mobile = useMobile();

    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    const handleMobileMenuClose = React.useCallback(() => {
        setShowMobileMenu(false);
    }, []);

    const handleItemClick = React.useCallback<
        NonNullable<ListProps<FilePreviewActionProps>['onItemClick']>
    >((item, _, __, event) => {
        if (event) {
            // function can be called only on a mobile device
            item.onClick?.(event as React.MouseEvent<HTMLDivElement, MouseEvent>);
        }
        setShowMobileMenu(false);
    }, []);

    if (!actions?.length) {
        return null;
    }

    const handleMobileButtonClick = () => {
        setShowMobileMenu(true);
    };

    if (mobile) {
        const buttonView = isCustomImage ? 'raised' : 'flat';

        return (
            <React.Fragment>
                <Button
                    view={buttonView}
                    className={cn('mobile-actions-menu')}
                    onClick={handleMobileButtonClick}
                    size="s"
                >
                    <Icon data={EllipsisVertical} height={16} width={16} />
                </Button>
                <Sheet
                    className={cn('mobile-sheet')}
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
    }

    return (
        <div className={cn('desktop-actions', hoverabelPanelClassName)}>
            {actions.map(({title, icon, onClick, disabled, tooltipExtraProps, ...props}, index) => {
                const extraProps: ButtonLinkProps | ButtonButtonProps | undefined = props.href
                    ? {...(props.extraProps as ButtonLinkProps), href: props.href}
                    : props.extraProps;
                return (
                    <ActionTooltip key={`${id}-${index}`} title={title} {...tooltipExtraProps}>
                        <Button
                            onClick={onClick}
                            aria-describedby={`${id}-${index}`}
                            view="raised"
                            pin="circle-circle"
                            disabled={disabled}
                            size="s"
                            className={cn('desktop-action-button')}
                            aria-label={title}
                            {...extraProps}
                        >
                            <div className={cn('action-icon-wrapper')}>{icon}</div>
                        </Button>
                    </ActionTooltip>
                );
            })}
        </div>
    );
};
