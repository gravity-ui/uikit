import * as React from 'react';

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

import {useActionHandlers} from '../../hooks';
import {Icon} from '../Icon';
import type {IconData} from '../Icon';
import {Text} from '../Text';
import {useMobile} from '../mobile';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {FilePreviewActions} from './FilePreviewActions/FilePreviewActions';
import type {FilePreviewAction, FileType} from './types';
import {getFileType} from './utils';

import './FilePreview.scss';

const cn = block('file-preview');

const FILE_ICON: Record<FileType, IconData> = {
    default: DefaultIcon,
    image: ImageIcon,
    video: VideoIcon,
    code: CodeIcon,
    archive: ArchiveIcon,
    audio: MusicIcon,
    music: MusicIcon,
    text: TextIcon,
    pdf: PdfIcon,
    table: TableIcon,
};

interface FilePreviewBaseProps extends QAProps {
    className?: string;

    file: File;
    imageSrc?: string;
    description?: string;

    onClick?: React.MouseEventHandler<HTMLDivElement>;
    selected?: boolean;
}

interface DefaultFilePreviewProps extends FilePreviewBaseProps {
    actions?: FilePreviewAction[];
    view?: 'default';
}

interface CompactFilePreviewProps extends FilePreviewBaseProps {
    actions?: never;
    view: 'compact';
}

export type FilePreviewProps = DefaultFilePreviewProps | CompactFilePreviewProps;

export function FilePreview(props: FilePreviewProps) {
    const {className, qa, file, imageSrc, description, onClick, view = 'default', selected} = props;

    const actions = view === 'default' && 'actions' in props ? props.actions : undefined;

    const [previewSrc, setPreviewSrc] = React.useState<string | undefined>(imageSrc);
    const type = getFileType(file);

    const mobile = useMobile();

    const {onKeyDown} = useActionHandlers(onClick);

    React.useEffect(() => {
        if (imageSrc || type !== 'image') return undefined;

        try {
            const createdUrl = URL.createObjectURL(file);

            setPreviewSrc(createdUrl);

            return () => {
                URL.revokeObjectURL(createdUrl);
            };
        } catch {
            return undefined;
        }
    }, [file, imageSrc, type]);

    const clickable = Boolean(onClick);
    const withActions = Boolean(actions?.length);

    const isPreviewString = typeof previewSrc === 'string';

    const compact = view === 'compact';

    return (
        <div className={cn({mobile, view}, className)} data-qa={qa}>
            <div
                className={cn('card', {
                    clickable,
                    hoverable: !selected && (clickable || withActions),
                    selected,
                })}
                role={clickable ? 'button' : undefined}
                onKeyDown={clickable ? onKeyDown : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={onClick}
            >
                {isPreviewString ? (
                    <div className={cn('image-container')}>
                        <img className={cn('image')} src={previewSrc} alt={file.name} />
                    </div>
                ) : (
                    <div className={cn('icon-container')}>
                        <div className={cn('icon', {type})}>
                            <Icon className={cn('icon-svg')} data={FILE_ICON[type]} size={20} />
                        </div>
                    </div>
                )}
                {!compact && (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </div>
            {actions?.length && (
                <FilePreviewActions
                    hoverabelPanelClassName={cn('actions-panel')}
                    fileName={file.name}
                    isCustomImage={isPreviewString}
                    actions={actions}
                />
            )}
        </div>
    );
}

FilePreview.displayName = 'FilePreview';
