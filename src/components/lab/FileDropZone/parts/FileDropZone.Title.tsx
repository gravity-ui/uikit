import {Text} from '../../../';
import {useFileZoneContext} from '../FileDropZone.Provider';
import i18n from '../i18n';

type FileDropZoneTitleProps = {
    className?: string;
};

export const FileDropZoneTitle = ({className}: FileDropZoneTitleProps) => {
    const {title, multiple, errorMessage} = useFileZoneContext();

    const {t} = i18n.useTranslation();

    const postfix = multiple ? 'multiple' : 'single';
    const defaultTitle = title || t(`label_title-${postfix}`);
    const isError = Boolean(errorMessage);
    const displayTitle = isError ? errorMessage : defaultTitle;

    return (
        <Text variant="subheader-1" className={className}>
            {displayTitle}
        </Text>
    );
};
