import {bAlert} from './constants';
import type {AlertTitleProps} from './types';

export const AlertTitle = ({text, className}: AlertTitleProps) => {
    return <div className={bAlert('title', className)}>{text}</div>;
};
