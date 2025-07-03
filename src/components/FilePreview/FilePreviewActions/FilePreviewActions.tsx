import {useMobile} from '../../mobile';
import type {FilePreviewAction} from '../types';

import {DesktopActionsMenu} from './DesktopActionsMenu/DesktopActionsMenu';
import {MobileActionsMenu} from './MobileActionsMenu/MobileActionsMenu';

export interface FilePreviewActionsProps {
    hoverabelPanelClassName: string;
    fileName: string;
    isCustomImage?: boolean;
    actions: FilePreviewAction[];
}

export const FilePreviewActions = ({
    actions,
    fileName,
    hoverabelPanelClassName,
    isCustomImage,
}: FilePreviewActionsProps) => {
    const mobile = useMobile();

    if (mobile) {
        return (
            <MobileActionsMenu
                actions={actions}
                fileName={fileName}
                isCustomImage={isCustomImage}
            />
        );
    }

    return (
        <DesktopActionsMenu actions={actions} hoverabelPanelClassName={hoverabelPanelClassName} />
    );
};
