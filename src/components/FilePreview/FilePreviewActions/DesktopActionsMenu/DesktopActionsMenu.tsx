import {useUniqId} from '../../../../hooks/useUniqId';
import {ActionTooltip} from '../../../ActionTooltip';
import {Button} from '../../../Button';
import type {ButtonButtonProps, ButtonLinkProps} from '../../../Button';
import {block} from '../../../utils/cn';
import type {FilePreviewAction} from '../../types';

import './DesktopActionsMenu.scss';

const cn = block('file-preview-actions-desktop');

export interface DesktopActionsMenuProps {
    actions: FilePreviewAction[];
    hoverabelPanelClassName: string;
}

export const DesktopActionsMenu = ({actions, hoverabelPanelClassName}: DesktopActionsMenuProps) => {
    const id = useUniqId();

    return (
        <div className={cn(null, hoverabelPanelClassName)}>
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
                            className={cn('action-button')}
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
