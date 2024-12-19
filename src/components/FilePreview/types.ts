import type {ActionTooltipProps} from '../ActionTooltip';

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

export interface FilePreviewActionProps {
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
    extraProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    tooltipExtraProps?: Omit<ActionTooltipProps, 'id' | 'title' | 'children'>;
}
