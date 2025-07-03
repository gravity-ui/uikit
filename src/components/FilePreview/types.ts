import type {ActionTooltipProps} from '../ActionTooltip';
import type {ButtonButtonProps, ButtonLinkProps} from '../Button';

export const FILE_TYPES = [
    'default',
    'image',
    'video',
    'code',
    'archive',
    'music',
    'audio',
    'text',
    'pdf',
    'table',
] as const;

export type FileType = (typeof FILE_TYPES)[number];

export type FilePreviewAction = {
    id?: string;
    icon: React.ReactNode;
    title: string;
    href?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    extraProps?: ButtonButtonProps | ButtonLinkProps;
    tooltipExtraProps?: Omit<ActionTooltipProps, 'title' | 'children'>;
};
