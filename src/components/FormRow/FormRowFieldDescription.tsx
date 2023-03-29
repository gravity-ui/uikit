import React, {FC} from 'react';
import {block} from '../utils/cn';
import type {Props} from './types';

const b = block('form-row');

export const FormRowFieldDescription: FC<Props> = ({children, className, ...elementProps}) => {
    return (
        <p {...elementProps} className={b('field-description', className)}>
            {children}
        </p>
    );
};

FormRowFieldDescription.displayName = 'FormRow.FieldDescription';
