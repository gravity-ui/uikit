import React from 'react';
import {block} from '../utils/cn';
import i18n from './i18n';

import './FormRow.scss';

const b = block('form-row');

export interface FormRowProps {
    className?: string;
    fieldName?: React.ReactNode;
    fieldId?: string;
    fieldRequired?: boolean;
    children?: React.ReactNode;
}

export function FormRow({
    className,
    fieldName,
    fieldId,
    fieldRequired = false,
    children,
}: FormRowProps) {
    const LabelComponent = fieldId ? 'label' : 'span';

    return (
        <div className={b(null, className)}>
            <div className={b('left')}>
                <LabelComponent className={b('field-name')} htmlFor={fieldId ? fieldId : undefined}>
                    {fieldName}
                    {fieldRequired ? (
                        <sup
                            className={b('required-mark')}
                            aria-label={i18n('label_required-field')}
                        >
                            *
                        </sup>
                    ) : null}
                </LabelComponent>
            </div>
            <div className={b('right')}>{children}</div>
        </div>
    );
}
