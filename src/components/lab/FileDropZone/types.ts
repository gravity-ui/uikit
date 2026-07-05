import type {IconData} from '../..';
import type {BaseInputControlProps} from '../../controls/types';
import type {QAProps} from '../../types';

import type {FileDropZoneAccept, FileRejection} from './utils';

export type DropZoneFileRejection = Pick<FileRejection, 'reasons'> & {
    file: File;
};

export type FileDropZoneProps = Pick<BaseInputControlProps, 'validationState'> &
    QAProps & {
        accept?: FileDropZoneAccept;
        onUpdate?: (acceptedItems: File[], rejectedItems: DropZoneFileRejection[]) => void;
        onUpdateAccepted?: (items: File[]) => void;
        onUpdateRejected?: (items: DropZoneFileRejection[]) => void;
        title?: string;
        description?: string;
        buttonText?: string;
        icon?: IconData | null;
        errorIcon?: IconData | null;
        className?: string;
        multiple?: boolean;
        disabled?: boolean;
        errorMessage?: string;
        children?: React.ReactNode;
    };

export interface FileDropZoneContainerProps {
    className?: string;
    qa?: string;
    children: React.ReactNode;
}
