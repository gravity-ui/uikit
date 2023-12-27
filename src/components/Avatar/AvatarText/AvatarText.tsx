import React from 'react';

import type {AvatarTextProps} from './types';
import {getAvatarDisplayText} from './utils';

export const AvatarText = ({text, color, className}: AvatarTextProps) => {
    const style = React.useMemo(() => ({color}), [color]);
    const displayText = React.useMemo(() => getAvatarDisplayText(text), [text]);

    return (
        <div style={style} className={className}>
            {displayText}
        </div>
    );
};
