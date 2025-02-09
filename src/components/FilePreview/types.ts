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

export type FilePreviewActionProps = {
    id?: string;
    icon: React.ReactNode;
    title: string;
    href?: string;
    disabled?: boolean;
    onClick?: (
        event:
            | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | MouseEvent>
            | React.KeyboardEvent<HTMLElement>,
    ) => void;
    extraProps?: ButtonButtonProps | ButtonLinkProps;
    tooltipExtraProps?: Omit<ActionTooltipProps, 'id' | 'title' | 'children'>;
};
