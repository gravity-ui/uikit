import React from 'react';

import {ArrowLeft as ArrowLeftIcon} from '@gravity-ui/icons';

import {useUniqId} from '../../../hooks/useUniqId';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Sheet} from '../../Sheet';
import {block} from '../../utils/cn';
import i18n from '../i18n';
import type {FilePreviewActionProps} from '../types';

import './MobileImagePreview.scss';

const cn = block('mobile-image-preview');

export interface FilePreviewProps {
    fileName?: string;
    previewSrc?: string;
    visible: boolean;
    onClose: () => void;
    actions?: FilePreviewActionProps[];
}

export function MobileImagePreview({
    previewSrc,
    visible,
    onClose,
    actions,
    fileName,
}: FilePreviewProps) {
    const id = useUniqId();

    const [showError, setShowError] = React.useState(false);
    const showSheet = Boolean(previewSrc && visible);

    const handleImagesError = () => {
        setShowError(true);
    };

    return (
        <Sheet visible={showSheet} onClose={onClose} contentClassName={cn('sheet-content')}>
            <div className={cn('container')} style={{}}>
                {showError ? (
                    <div className={cn('error-label')}>{i18n('label_image-preview-error')}</div>
                ) : (
                    <img
                        className={cn('image')}
                        src={previewSrc}
                        alt={fileName}
                        onError={handleImagesError}
                    />
                )}
                <Button view="raised" size="xl" className={cn('back-button')} onClick={onClose}>
                    <Icon data={ArrowLeftIcon} size={20} />
                </Button>
                <div className={cn('action-buttons')}>
                    {actions?.map((action, index) => (
                        <Button
                            size="xl"
                            key={`${id}-${index}`}
                            onClick={action.onClick}
                            view="raised"
                        >
                            action.icon
                        </Button>
                    ))}
                </div>
            </div>
        </Sheet>
    );
}

MobileImagePreview.displayName = 'MobileImagePreview';
