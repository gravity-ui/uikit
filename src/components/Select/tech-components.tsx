'use client';

import type {SelectOption, SelectOptionGroup} from './types';

export const Option = <T extends any>(
    _props: SelectOption<T>,
): React.ReactElement<SelectOption<T>> | null => null;

export const OptionGroup = <T extends any>(
    _props: SelectOptionGroup<T>,
): React.ReactElement<SelectOptionGroup<T>> | null => null;
