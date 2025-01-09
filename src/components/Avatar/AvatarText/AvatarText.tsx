import type {AvatarTextProps} from './types';
import {getAvatarDisplayText} from './utils';

export const AvatarText = ({text, color, className, size}: AvatarTextProps) => {
    const style = {color};
    const displayText = size === '3xs' ? text[0].toUpperCase() : getAvatarDisplayText(text);

    return (
        <div style={style} className={className}>
            {displayText}
        </div>
    );
};
