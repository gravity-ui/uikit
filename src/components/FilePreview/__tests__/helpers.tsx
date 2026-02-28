import {Link, Xmark} from '@gravity-ui/icons';

import {FilePreview} from '../FilePreview';
import type {FilePreviewProps} from '../FilePreview';

export const FilePreviewWithAllActions = (
    props: Partial<Omit<FilePreviewProps, 'actions' | 'onClose'>>,
) => {
    return (
        <FilePreview
            qa="file-preview"
            file={{name: 'File', type: 'text/docs'} as File}
            onClick={() => {
                // nothing
            }}
            actions={[
                {
                    icon: null,
                    title: 'Without icon action',
                    onClick: () => {
                        // nothing
                    },
                },
                {
                    icon: <Link width={14} height={14} />,
                    disabled: true,
                    title: 'Disabled action',
                    onClick: () => {
                        // nothing
                    },
                },
                {
                    icon: <Link width={14} height={14} />,
                    href: '#',
                    title: 'Link action',
                    onClick: () => {
                        // nothing
                    },
                },
                {
                    icon: <Xmark width={14} height={14} />,
                    title: 'Close',
                    onClick: () => {
                        // nothing
                    },
                    tooltipExtraProps: {
                        qa: 'action-1-tooltip',
                    },
                },
            ]}
            {...props}
        />
    );
};
