import type {DropdownMenuItem} from '../../../DropdownMenu';
import {cn} from '../../../utils/cn';
import type {FilePreviewProps} from '../../FilePreview';
import {FilePreview} from '../../FilePreview';

import {CompactActionsMenu} from './CompactActionsMenu/CompactActionsMenu';

import './CompactFilePreviewWithActionsShowcase.scss';

const b = cn('compact-file-preview-with-actions');

export type CompactMenuWithActionsShowcaseProps = {
    actions: DropdownMenuItem[];
} & Omit<FilePreviewProps, 'view' | 'actions'>;

export const CompactMenuWithActionsShowcase = ({
    actions,
    ...filePreviewProps
}: CompactMenuWithActionsShowcaseProps) => {
    return (
        <div className={b()}>
            <FilePreview view="compact" {...filePreviewProps} />
            <CompactActionsMenu actions={actions} />
        </div>
    );
};
