'use client';

import * as React from 'react';

import {KeyCode} from '../../../../constants';
import {TextInput} from '../../../controls';
import type {TextInputProps} from '../../../controls';
import {block} from '../../../utils/cn';
import {PaginationQa} from '../../constants';
import i18n from '../../i18n';
import type {PaginationProps, PaginationSize} from '../../types';

import './PaginationInput.scss';

const b = block('pagination-input');

type Props = {
    numberOfPages: number;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    size: PaginationSize;
    className?: string;
};

export const PaginationInput = ({numberOfPages, size, pageSize, onUpdate, className}: Props) => {
    const [value, setValue] = React.useState('');

    const handleUpdateValue = (inputValue: string) => {
        if (inputValue === '' || /^[1-9][0-9]*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    const handleUpdate = (inputValue: string) => {
        if (!inputValue) {
            return;
        }
        let numValue = Number(inputValue);
        if (!Number.isInteger(numValue)) {
            setValue('');
            return;
        }

        const hasUpperLimit = numberOfPages > 0;

        if (numValue > numberOfPages) {
            numValue = hasUpperLimit ? numberOfPages : numValue;
        } else if (numValue < 1) {
            numValue = 1;
        }

        setValue('');
        onUpdate(numValue, pageSize);
    };

    const handleBlur: TextInputProps['onBlur'] = (event) => handleUpdate(event.currentTarget.value);

    const handleKeyUp: TextInputProps['onKeyUp'] = (event) => {
        if (event.key === KeyCode.ENTER) {
            handleUpdate(event.currentTarget.value);
        }
    };

    const {t} = i18n.useTranslation();

    return (
        <TextInput
            className={b({size}, className)}
            placeholder={t('label_input-placeholder')}
            size={size}
            value={value}
            onUpdate={handleUpdateValue}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            qa={PaginationQa.PaginationInput}
        />
    );
};
