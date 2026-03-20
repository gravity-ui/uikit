import type {BaseInputControlProps} from 'src/components/controls/types';
import type {FileRejection, UseDropZoneAccept} from 'src/hooks/lab/useDropZone';

import type {IconData} from '../..';
import type {QAProps} from '../../types';

export type DropZoneFileRejection = Pick<FileRejection, 'reasons'> & {
    file: File;
};

export type FileDropZoneProps = Pick<BaseInputControlProps, 'validationState'> &
    QAProps & {
        accept: UseDropZoneAccept;
        onUpdate: (files: File[]) => void;
        onReject?: (items: DropZoneFileRejection[]) => void;
        title?: string;
        description?: string;
        buttonText?: string;
        icon?: IconData | null;
        errorIcon?: IconData | null;
        className?: string;
        multiple?: boolean;
        maxFilesCount?: number;
        disabled?: boolean;
        errorMessage?: string;
        children?: React.ReactNode;
    };

export interface FileDropZoneContainerProps {
    className?: string;
    qa?: string;
    children: React.ReactNode;
}
