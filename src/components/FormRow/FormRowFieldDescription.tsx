import React from 'react';

import {block} from '../utils/cn';

import type {FormRowFieldDescriptionProps} from './types';

const b = block('form-row');

export const FormRowFieldDescription = ({
    children,
    className,
    ...elementProps
}: FormRowFieldDescriptionProps) => {
    return (
        <p {...elementProps} className={b('field-description', className)}>
            {children}
        </p>
    );
};

FormRowFieldDescription.displayName = 'FormRow.FieldDescription';
