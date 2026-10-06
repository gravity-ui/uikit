'use client';

import type {SelectOption, SelectOptionGroup} from './types';

// `NoInfer` before TS 5.4: the Select does not check its children, so a non-string value is named
type Named<V> = [V][V extends unknown ? 0 : never];

type OptionComponent = {
    <T = any, V = string>(
        props: SelectOption<T, Named<V>>,
    ): React.ReactElement<SelectOption<T, V>> | null;
    (props: SelectOption): React.ReactElement<SelectOption> | null;
};

type OptionGroupComponent = {
    <T = any, V = string>(
        props: SelectOptionGroup<T, Named<V>>,
    ): React.ReactElement<SelectOptionGroup<T, V>> | null;
    (props: SelectOptionGroup): React.ReactElement<SelectOptionGroup> | null;
};

export const Option: OptionComponent = () => null;

export const OptionGroup: OptionGroupComponent = () => null;
