import React from 'react';

import {ColorsGrid, ColorsGridProps} from '../ColorsGrid';
import type {Color} from '../utils';

export const ColorsGridShowcase = (props: ColorsGridProps) => {
    const [value, onUpdate] = React.useState<Color>();

    return <ColorsGrid {...props} value={value} onUpdate={onUpdate} />;
};
