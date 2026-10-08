'use client';

import type {SelectOptionGroupProps, SelectOptionProps} from './types';

// `NoInfer` before TS 5.4: the Select does not check its children, so a non-string value is named
type Named<V> = [V][V extends unknown ? 0 : never];

type OptionComponent = {
    <T = any, V = string>(
        props: SelectOptionProps<T, Named<V>>,
    ): React.ReactElement<SelectOptionProps<T, V>> | null;
    (props: SelectOptionProps): React.ReactElement<SelectOptionProps> | null;
};

type OptionGroupComponent = {
    <T = any, V = string>(
        props: SelectOptionGroupProps<T, Named<V>>,
    ): React.ReactElement<SelectOptionGroupProps<T, V>> | null;
    (props: SelectOptionGroupProps): React.ReactElement<SelectOptionGroupProps> | null;
};

export const Option: OptionComponent = () => null;

export const OptionGroup: OptionGroupComponent = () => null;
