import {Text} from '../../../';
import {useFileZoneContext} from '../FileDropZone.Provider';

type FileDropZoneDescriptionProps = {
    className?: string;
};

export const FileDropZoneDescription = ({className}: FileDropZoneDescriptionProps) => {
    const {description} = useFileZoneContext();

    if (!description) {
        return null;
    }

    return (
        <Text variant="body-1" color="secondary" className={className}>
            {description}
        </Text>
    );
};
