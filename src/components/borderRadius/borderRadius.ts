import {block} from '../utils/cn';

import './BorderRadius.scss';

export type BorderRadiusType = 'xs' | 's' | 'm' | 'l' | 'xl';

const bBorderRadius = block('border-radius');

export const borderRadius = ({size}: {size: BorderRadiusType}, className?: string) =>
    bBorderRadius({[size]: true}, className);
