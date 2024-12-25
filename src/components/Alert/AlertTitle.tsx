import {Text} from '../Text';

import {bAlert} from './constants';
import type {AlertTitleProps} from './types';

export const AlertTitle = ({text, className}: AlertTitleProps) => {
    return (
        <Text variant="subheader-2" className={bAlert('title', className)}>
            {text}
        </Text>
    );
};
