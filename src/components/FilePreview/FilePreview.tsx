import React from 'react';

import {
    FileZipper as ArchiveIcon,
    Code as CodeIcon,
    FileQuestion as DefaultIcon,
    Picture as ImageIcon,
    MusicNote as MusicIcon,
    LogoAcrobat as PdfIcon,
    LayoutHeaderCellsLarge as TableIcon,
    TextAlignLeft as TextIcon,
    Filmstrip as VideoIcon,
} from '@gravity-ui/icons';

import {useActionHandlers, useUniqId} from '../../hooks';
import {Icon} from '../Icon';
import type {IconData} from '../Icon';
import {Text} from '../Text';
import {useMobile} from '../mobile';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {FilePreviewAction} from './FilePreviewAction';
import type {FilePreviewActionProps} from './FilePreviewAction';
import {MobileImagePreview} from './MobileImagePreview/MobileImagePreview';
import type {FileType} from './types';
import {getFileType} from './utils';

import './FilePreview.scss';

const cn = block('file-preview');

const FILE_ICON: Record<FileType, IconData> = {
    default: DefaultIcon,
    image: ImageIcon,
    video: VideoIcon,
    code: CodeIcon,
    archive: ArchiveIcon,
    music: MusicIcon,
    text: TextIcon,
    pdf: PdfIcon,
    table: TableIcon,
};

export interface FilePreviewProps extends QAProps {
    className?: string;

    file: File;
    imageSrc?: string;
    description?: string;

    onClick?: React.MouseEventHandler<HTMLDivElement>;
    actions?: FilePreviewActionProps[];
}

export function FilePreview({
    className,
    qa,
    file,
    imageSrc,
    description,
    onClick,
    actions,
}: FilePreviewProps) {
    const id = useUniqId();

    const [previewSrc, setPreviewSrc] = React.useState<string | undefined>(imageSrc);
    const [showPreviewSheet, setShowPreviewSheet] = React.useState(false);
    const mobile = useMobile();
    const type = getFileType(file);

    const {onKeyDown} = useActionHandlers(onClick);

    React.useEffect(() => {
        if (imageSrc) return undefined;

        try {
            const createdUrl = URL.createObjectURL(file);

            setPreviewSrc(createdUrl);

            return () => {
                URL.revokeObjectURL(createdUrl);
            };
        } catch (error: unknown) {
            return undefined;
        }
    }, [file, imageSrc]);

    const clickable = Boolean(onClick);
    const withActions = Boolean(actions?.length);

    const isPreviewString = typeof previewSrc === 'string';
    const hideActions = isPreviewString && mobile;

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (mobile && isPreviewString && !onClick) {
            setShowPreviewSheet(true);
        } else {
            onClick?.(e);
        }
    };

    const handleSheetClose = () => {
        setShowPreviewSheet(false);
    };

    return (
        <div className={cn(null, className)} data-qa={qa}>
            <div
                className={cn('card', {clickable, hoverable: clickable || withActions})}
                role={clickable ? 'button' : undefined}
                onKeyDown={clickable ? onKeyDown : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={handleClick}
            >
                {isPreviewString ? (
                    <div className={cn('image')}>
                        <img className={cn('image-img')} src={previewSrc} alt={file.name} />
                    </div>
                ) : (
                    <div className={cn('icon', {type})}>
                        <Icon className={cn('icon-svg')} data={FILE_ICON[type]} size={20} />
                    </div>
                )}
                <Text className={cn('name')} color="secondary" ellipsis title={file.name}>
                    {file.name}
                </Text>
                {Boolean(description) && (
                    <Text
                        className={cn('description')}
                        color="secondary"
                        ellipsis
                        title={description}
                    >
                        {description}
                    </Text>
                )}
            </div>
            {actions?.length ? (
                <div className={cn('actions', {hide: hideActions})}>
                    {actions.map((action, index) => (
                        <FilePreviewAction
                            key={`${id}-${index}`}
                            id={`${id}-${index}`}
                            {...action}
                        />
                    ))}
                </div>
            ) : null}

            <MobileImagePreview
                visible={showPreviewSheet}
                onClose={handleSheetClose}
                actions={actions}
                previewSrc={previewSrc}
                fileName={file.name}
            />
        </div>
    );
}

FilePreview.displayName = 'FilePreview';
