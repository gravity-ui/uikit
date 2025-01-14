import type * as React from 'react';

import {ActionTooltip} from '../ActionTooltip';
import type {ActionTooltipProps} from '../ActionTooltip';
import {Button} from '../Button';

export interface FilePreviewActionProps {
    id?: string;
    icon: React.ReactNode;
    title: string;
    href?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    extraProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    tooltipExtraProps?: Omit<ActionTooltipProps, 'id' | 'title' | 'children'>;
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
        <ActionTooltip id={id} title={title} {...tooltipExtraProps}>
            <Button
                onClick={onClick}
                aria-describedby={id}
                view="raised"
                pin="circle-circle"
                href={href}
                disabled={disabled}
                size="s"
                extraProps={{'aria-label': title, 'aria-describedby': id, ...extraProps}}
            >
                {icon}
            </Button>
        </ActionTooltip>
    );
}

FilePreviewAction.displayName = 'FilePreviewAction';
