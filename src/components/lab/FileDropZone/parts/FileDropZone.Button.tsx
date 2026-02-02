import * as React from 'react';

import {Button} from '../../../../';
import {useFileZoneContext} from '../FileDropZone.Provider';
import {cnFileDropZone} from '../FileDropZone.classname';
import i18n from '../i18n';

type FileDropZoneButtonProps = {
    className?: string;
};

export const FileDropZoneButton = ({className}: FileDropZoneButtonProps) => {
    const {buttonText, triggerProps, controlProps, multiple} = useFileZoneContext();

    const {t} = i18n.useTranslation();

    const postfix = multiple ? 'multiple' : 'single';
    const displayLabel = buttonText || t(`button_select-file-${postfix}`);

    return (
        <React.Fragment>
            <Button {...triggerProps} className={cnFileDropZone('button', className)}>
                {displayLabel}
            </Button>
            <input {...controlProps} multiple={multiple} />
        </React.Fragment>
    );
};
