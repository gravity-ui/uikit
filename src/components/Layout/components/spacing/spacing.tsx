import {block} from '../../../utils/cn';
import {Space} from '../../types';

import './spacing.scss';

const b = block('s');

export interface SpacingProps {
    mr?: Space;
    ml?: Space;
    mt?: Space;
    mb?: Space;
    mx?: Space;
    my?: Space;
    m?: Space;
    pr?: Space;
    pl?: Space;
    pt?: Space;
    pb?: Space;
    px?: Space;
    py?: Space;
    p?: Space;
}

export const spacing = (props: SpacingProps, className?: string) => {
    const classes = Object.entries(props).map(([key, value]) => b(`${key}_${value}`));

    if (className) {
        classes.push(className);
    }

    return classes.join(' ');
};
