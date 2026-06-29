'use client';

import type {SelectOption, SelectOptionGroup} from './types';

export function Option<T extends any, V = string>(
    _props: SelectOption<T, V>,
): React.ReactElement<SelectOption<T, V>> | null;
// Non-generic overload: keeps type utilities that do not go through inference
// (e.g. React.ComponentProps<typeof Select.Option>) resolving to string values
export function Option(_props: SelectOption): React.ReactElement<SelectOption> | null;
export function Option(): React.ReactElement | null {
    return null;
}

export function OptionGroup<T extends any, V = string>(
    _props: SelectOptionGroup<T, V>,
): React.ReactElement<SelectOptionGroup<T, V>> | null;
// Non-generic overload: keeps type utilities that do not go through inference
// (e.g. React.ComponentProps<typeof Select.OptionGroup>) resolving to string values
export function OptionGroup(
    _props: SelectOptionGroup,
): React.ReactElement<SelectOptionGroup> | null;
export function OptionGroup(): React.ReactElement | null {
    return null;
}
