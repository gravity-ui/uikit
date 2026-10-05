'use client';

import type {SelectOption, SelectOptionGroup} from './types';

type OptionComponent = {
    <T = any, V = string>(props: SelectOption<T, V>): React.ReactElement<SelectOption<T, V>> | null;
    (props: SelectOption): React.ReactElement<SelectOption> | null;
};

type OptionGroupComponent = {
    <T = any, V = string>(
        props: SelectOptionGroup<T, V>,
    ): React.ReactElement<SelectOptionGroup<T, V>> | null;
    (props: SelectOptionGroup): React.ReactElement<SelectOptionGroup> | null;
};

export const Option: OptionComponent = () => null;

export const OptionGroup: OptionGroupComponent = () => null;
