import {bAvatar} from '../constants';

import type {AvatarTextProps} from './types';
import {getAvatarDisplayText} from './utils';

export const AvatarText = ({text, color, size}: AvatarTextProps) => {
    const style = {color};
    const displayText = getAvatarDisplayText(text, size);

    return (
        <div className={bAvatar('text')} style={style}>
            {displayText}
        </div>
    );
};
