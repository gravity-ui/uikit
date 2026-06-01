import {Button} from '../../../..';
import {useFileZoneContext} from '../FileDropZone.Provider';
import {cnFileDropZone} from '../FileDropZone.classname';
import {FileDropZoneQa} from '../constants';
import i18n from '../i18n';

type FileDropZoneButtonProps = {
    className?: string;
};

export const FileDropZoneButton = ({className}: FileDropZoneButtonProps) => {
    const {buttonText, maxFilesCount} = useFileZoneContext();

    const {t} = i18n.useTranslation();

    const multiple = maxFilesCount > 1;
    const postfix = multiple ? 'multiple' : 'single';
    const displayLabel = buttonText || t(`button_select-file-${postfix}`);

    return (
        <Button
            component="span"
            role={undefined}
            className={cnFileDropZone('button', className)}
            qa={FileDropZoneQa.BUTTON}
        >
            {displayLabel}
        </Button>
    );
};
