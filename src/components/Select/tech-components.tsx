'use client';

import type {SelectOption, SelectOptionGroup} from './types';

export function Option<T extends any, V = string>(
    _props: SelectOption<T, V>,
): React.ReactElement<SelectOption<T, V>> | null;
// React.ComponentProps ignores the V = string default; it resolves to the last overload.
export function Option(_props: SelectOption): React.ReactElement<SelectOption> | null;
export function Option(): React.ReactElement | null {
    return null;
}

export function OptionGroup<T extends any, V = string>(
    _props: SelectOptionGroup<T, V>,
): React.ReactElement<SelectOptionGroup<T, V>> | null;
// React.ComponentProps ignores the V = string default; it resolves to the last overload.
export function OptionGroup(
    _props: SelectOptionGroup,
): React.ReactElement<SelectOptionGroup> | null;
export function OptionGroup(): React.ReactElement | null {
    return null;
}
