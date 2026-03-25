import * as React from 'react';

import {Button} from '../../../../';
import {useFileZoneContext} from '../FileDropZone.Provider';
import {cnFileDropZone} from '../FileDropZone.classname';
import {FileDropZoneQa} from '../constants';
import i18n from '../i18n';

type FileDropZoneButtonProps = {
    className?: string;
};

export const FileDropZoneButton = ({className}: FileDropZoneButtonProps) => {
    const {accept, buttonText, triggerProps, controlProps, maxFilesCount} = useFileZoneContext();

    const {t} = i18n.useTranslation();

    const multiple = maxFilesCount > 1;
    const postfix = multiple ? 'multiple' : 'single';
    const displayLabel = buttonText || t(`button_select-file-${postfix}`);

    return (
        <React.Fragment>
            <Button
                {...triggerProps}
                className={cnFileDropZone('button', className)}
                qa={FileDropZoneQa.BUTTON}
            >
                {displayLabel}
            </Button>
            <input
                {...controlProps}
                multiple={multiple}
                accept={accept.join(',')}
                data-qa={FileDropZoneQa.FILE_INPUT}
            />
        </React.Fragment>
    );
};
