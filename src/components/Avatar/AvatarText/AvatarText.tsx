import type {AvatarTextProps} from './types';
import {getAvatarDisplayText} from './utils';

export const AvatarText = ({text, color, size, className}: AvatarTextProps) => {
    const style = {color};
    const displayText = getAvatarDisplayText(text, size);

    return (
        <div style={style} className={className}>
            {displayText}
        </div>
    );
};
