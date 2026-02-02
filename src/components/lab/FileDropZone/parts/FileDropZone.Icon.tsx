import * as React from 'react';

import {
    CircleExclamation as DefaultErrorIcon,
    CloudArrowUpIn as DefaultIcon,
} from '@gravity-ui/icons';

import {Icon} from '../../../';
import {useFileZoneContext} from '../FileDropZone.Provider';
import {cnFileDropZone} from '../FileDropZone.classname';

type FileDropZoneIconProps = {
    className?: string;
};

export const FileDropZoneIcon = ({className}: FileDropZoneIconProps) => {
    const {errorMessage, validationState, icon, errorIcon} = useFileZoneContext();
    const isError = Boolean(errorMessage) || validationState === 'invalid';

    const DisplayIcon = React.useMemo(() => {
        if (isError) {
            if (errorIcon === null) {
                return null;
            }

            return errorIcon || DefaultErrorIcon;
        }

        if (icon === null) {
            return null;
        }

        return icon || DefaultIcon;
    }, [errorIcon, icon, isError]);

    if (DisplayIcon === null) {
        return null;
    }

    return (
        <Icon className={cnFileDropZone('icon', {error: isError}, className)} data={DisplayIcon} />
    );
};
