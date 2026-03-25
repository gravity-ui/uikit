import {Text} from '../../../';
import {useFileZoneContext} from '../FileDropZone.Provider';
import {FileDropZoneQa} from '../constants';
import i18n from '../i18n';

type FileDropZoneTitleProps = {
    className?: string;
};

export const FileDropZoneTitle = ({className}: FileDropZoneTitleProps) => {
    const {title, maxFilesCount, errorMessage} = useFileZoneContext();

    const {t} = i18n.useTranslation();

    const multiple = maxFilesCount > 1;
    const postfix = multiple ? 'multiple' : 'single';
    const defaultTitle = title || t(`label_title-${postfix}`);
    const isError = Boolean(errorMessage);
    const displayTitle = isError ? errorMessage : defaultTitle;

    return (
        <Text variant="subheader-1" className={className} qa={FileDropZoneQa.TITLE}>
            {displayTitle}
        </Text>
    );
};
