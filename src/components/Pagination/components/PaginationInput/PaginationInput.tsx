import React from 'react';

import {TextInput, TextInputProps} from '../../../TextInput';
import {KeyCode} from '../../../constants';
import {blockNew} from '../../../utils/cn';
import i18n from '../../i18n';
import type {PaginationProps, PaginationSize} from '../../types';

import './PaginationInput.scss';

const b = blockNew('pagination-input');

type Props = {
    numberOfPages: number;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    size: PaginationSize;
    className?: string;
};

export const PaginationInput = ({numberOfPages, size, pageSize, onUpdate, className}: Props) => {
    const [value, setValue] = React.useState('');

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

    return (
        <TextInput
            className={b({size}, className)}
            placeholder={i18n('label_input-placeholder')}
            size={size}
            value={value}
            onUpdate={setValue}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
        />
    );
};
