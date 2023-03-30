import React, {FC} from 'react';
import {block} from '../utils/cn';

import {FormRowFieldDescription} from './FormRowFieldDescription';
import i18n from './i18n';
import {FormRowProps} from './types';

import './FormRow.scss';

const b = block('form-row');

const FormRowComponent: FC<FormRowProps> = ({
    className,
    fieldName,
    fieldHelpPopover,
    fieldId,
    fieldRequired = false,
    children,
}) => {
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

                    {fieldHelpPopover ? (
                        <span className={b('help-popover')}>{fieldHelpPopover}</span>
                    ) : null}
                </LabelComponent>
            </div>
            <div className={b('right')}>{children}</div>
        </div>
    );
};

FormRowComponent.displayName = 'FormRow';

export const FormRow = Object.assign(FormRowComponent, {FieldDescription: FormRowFieldDescription});
