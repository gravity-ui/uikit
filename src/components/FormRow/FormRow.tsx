import React from 'react';

import {block} from '../utils/cn';

import {FormRowFieldDescription} from './FormRowFieldDescription';
import {i18n} from './i18n';
import type {FormRowProps} from './types';

import './FormRow.scss';

const b = block('form-row');

const FormRowComponent = ({
    className,
    label,
    labelHelpPopover,
    fieldId,
    required = false,
    children,
    direction = 'row',
}: FormRowProps) => {
    const LabelComponent = fieldId ? 'label' : 'span';

    return (
        <div className={b({direction}, className)}>
            <div className={b('left')}>
                <LabelComponent className={b('field-name')} htmlFor={fieldId ? fieldId : undefined}>
                    <span className={b('field-name-text')}>{label}</span>

                    {required ? (
                        <React.Fragment>
                            &nbsp;
                            <sup
                                className={b('required-mark')}
                                aria-label={i18n('label_required-field')}
                            >
                                *
                            </sup>
                        </React.Fragment>
                    ) : null}

                    {labelHelpPopover ? (
                        <React.Fragment>
                            &nbsp;
                            <span className={b('help-popover')}>{labelHelpPopover}</span>
                        </React.Fragment>
                    ) : null}
                </LabelComponent>
            </div>
            <div className={b('right')}>{children}</div>
        </div>
    );
};

FormRowComponent.displayName = 'FormRow';

export const FormRow = Object.assign(FormRowComponent, {FieldDescription: FormRowFieldDescription});
