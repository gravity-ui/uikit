import type * as React from 'react';

import {ActionTooltip} from '../ActionTooltip';
import type {ActionTooltipProps} from '../ActionTooltip';
import {Button} from '../Button';
import type {ButtonButtonProps, ButtonLinkProps} from '../Button';
import {block} from '../utils/cn';

import './FilePreview.scss';

const cn = block('file-preview');
export interface FilePreviewActionProps {
    id?: string;
    icon: React.ReactNode;
    title: string;
    href?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    extraProps?: ButtonButtonProps | ButtonLinkProps;
    tooltipExtraProps?: Omit<ActionTooltipProps, 'title' | 'children'>;
}

export function FilePreviewAction({
    id,
    icon,
    title,
    href,
    disabled,
    onClick,
    extraProps,
    tooltipExtraProps,
}: FilePreviewActionProps) {
    return (
        <ActionTooltip title={title} {...tooltipExtraProps}>
            <Button
                onClick={onClick}
                view="raised"
                pin="circle-circle"
                href={href as string}
                disabled={disabled}
                size="s"
                className={cn('action-button')}
                aria-label={title}
                aria-describedby={id}
                {...(extraProps as Omit<ButtonLinkProps, 'href'>)}
            >
                <div className={cn('action-icon-wrapper')}>{icon}</div>
            </Button>
        </ActionTooltip>
    );
}

FilePreviewAction.displayName = 'FilePreviewAction';
