import React from 'react';

import {Button} from '../../../Button';
import {Flex} from '../../../layout/Flex/Flex';
import type {SelectOption, SelectProps} from '../../types';

import './CustomOption.scss';

export type UseSelectRenderOptionProps<T = any> = {options: SelectOption<T>[]} & Pick<
    SelectProps,
    'options' | 'multiple' | 'onUpdate' | 'value'
>;

type OptionProps<T = any> = {
    opt: SelectOption<T>;
    options: SelectOption<T>[];
} & Pick<SelectProps, 'multiple' | 'onUpdate'>;

const Option = ({options, onUpdate, opt}: OptionProps) => {
    const [mode, setMode] = React.useState<'only' | 'exclude'>('only');

    const handleClick = React.useCallback(
        (val: string) => {
            if (mode === 'only') {
                onUpdate?.([val]);
                setMode('exclude');
            } else {
                onUpdate?.(options?.map(({value}) => value).filter((value) => value !== val));
                setMode('only');
            }
        },
        [onUpdate, mode, options],
    );

    return (
        <Flex className="select-option" alignItems={'center'} justifyContent={'space-between'}>
            <div className="select-option__text">{opt.content}</div>
            <Button
                size="s"
                className="select-option__action-button"
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(opt.value);
                }}
            >
                {mode}
            </Button>
        </Flex>
    );
};

export const useSelectRenderOption = (props: UseSelectRenderOptionProps) => {
    const renderOption = React.useCallback((opt: any) => <Option {...props} opt={opt} />, [props]);
    return {renderOption: props.multiple ? renderOption : undefined};
};
