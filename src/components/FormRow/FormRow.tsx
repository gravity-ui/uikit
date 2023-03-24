import React from 'react';
import {block} from '../utils/cn';

import './FormRow.scss';

const b = block('form-row');

export interface FormRowProps {
    className?: string;
    fieldName?: React.ReactNode;
    fieldId?: string;
    children?: React.ReactNode;
}

export function FormRow({className, fieldName, fieldId, children}: FormRowProps) {
    const LabelComponent = fieldId ? 'label' : 'span';

    return (
        <div className={b(null, className)}>
            <div className={b('left')}>
                <LabelComponent className={b('field-name')} htmlFor={fieldId ? fieldId : undefined}>
                    {fieldName}
                </LabelComponent>
            </div>
            <div className={b('right')}>{children}</div>
        </div>
    );
}
