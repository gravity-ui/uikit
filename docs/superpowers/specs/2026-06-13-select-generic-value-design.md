# Select: generic `value` support — design spec

Date: 2026-06-13
Status: approved (autonomous mode — user requested automatic completion of design/spec/implementation)
Branch: `feat/ass-select-generic-value`

## Problem

`Select` only supports `string` for `value`, `defaultValue`, `onUpdate` and `options[].value`
(`SelectOption` inherits `value: string` from `ControlGroupOption`). Consumers that work with
numeric ids or domain objects must maintain string mappings on both sides of the component.

## Goal / Definition of done

- TypeScript interfaces support generic value types (strings, numbers, objects) for `value`,
  `defaultValue`, `onUpdate`, `options[].value`.
- Backward compatible: no breaking change for existing string-based usage (type-level and runtime).
- Tests added for the new scenarios; documentation updated with examples.

## Acceptance contract (pinned)

Commit `204db3e4` on sibling branch `feat/add-select-value-generic` (same author) contains
acceptance tests and a story for this feature with no implementation. They pin the semantics:

1. `onUpdate` preserves the value type: selecting option `{value: 2}` calls `onUpdate([2])`
   with a `number`.
2. Object values are compared **by reference** (SameValueZero); deselecting in `multiple` mode
   returns the remaining original references.
3. Form submission (`name` prop → `HiddenSelect`) serializes: strings as-is, numbers via
   `String` (`42` → `"42"`), objects via `JSON.stringify`.

## Approaches considered

### A. Generic `V` parameter + SameValueZero equality (chosen)

Thread a second generic parameter `V = string` through the public types. Keep all runtime
membership checks as they are (`Array.includes`, `Set.has`, `Map.get` — all SameValueZero).
Convert values to strings only at the boundaries that require strings: display-text fallback,
hidden form inputs, React keys.

- Pros: smallest diff; zero behavior change for string users; satisfies the pinned contract
  exactly; predictable `===`-like semantics; no new public API surface. A structural
  comparator/key-extractor prop can be added later without breaking changes.
- Cons: structurally-equal-but-distinct object instances do not match (the value passed to
  `value` must be the same reference as `options[].value`). Documented limitation.

### B. Generic `V` + structural equality (internal JSON key derivation)

Compare values via derived `JSON.stringify` keys so re-created objects still match.

- Rejected: contradicts the pinned "compared by reference" contract; collides number `1` with
  string `'1'`; sensitive to object key order; per-render serialization cost; much larger diff
  (every membership site changes).

### C. Keep strings internally + `getOptionValue`-style extractor (react-select pattern)

- Rejected: `onUpdate` could no longer return the original typed values without an inverse
  mapping; adds mandatory API surface; fails the pinned tests.

## Design (approach A)

### Equality semantics

Membership ("is this option selected") uses SameValueZero everywhere: `value.includes(...)`,
`new Set(value).has(...)`, `Map.get(...)`. For strings and numbers this is value equality
(NaN included); for objects it is reference equality. One inconsistency is fixed:
`OptionWrap` used `indexOf` (strict equality, misses NaN) where every other site uses
SameValueZero — it switches to `includes`.

### String boundaries

New internal helper in `src/components/Select/utils.tsx`:

```ts
serializeOptionValue(value: unknown): string
// string → as-is; otherwise JSON.stringify(value) ?? String(value), with a try/catch
// fallback to String(value) for non-serializable values (circular refs, BigInt)
```

Used at every place that needs a string from a value:

- `getOptionText` fallback (was `return option.value`) — this is load-bearing: the default
  `filterable` path calls `getOptionText(option).toLocaleLowerCase()` and would throw a
  `TypeError` for non-string values without `content`/`text`; quick search uses the same path.
- `HiddenSelect` input `value` and React `key` (was raw value for both). The empty branch
  passes `""` instead of the raw array (same rendered result).
- `getSelectedOptionsContent` React `key` in the `renderSelectedOption` path.

For strings, `serializeOptionValue` is the identity function — exact behavior parity.

### Type plumbing — public surface

`src/components/Select/types.ts` (all new parameters default to `string`; existing positional
parameter `T` for option `data` keeps its position — fully source-compatible):

- `SelectOption<T = any, V = string>` — decoupled from `ControlGroupOption`'s
  `ValueType extends string` constraint via `Omit<ControlGroupOption, 'value'> & {value: V}`.
  `ControlGroupOption` itself is untouched (RadioGroup/SegmentedRadioGroup unaffected).
- `SelectOptionGroup<T = any, V = string>`, `SelectOptions<T = any, V = string>`.
- `SelectProps<T = any, V = string>`: `value?: V[]`, `defaultValue?: V[]`,
  `onUpdate?: (value: V[]) => void`, options/render/get-height/filter callbacks take
  `SelectOption<T, V>`; `renderControl?: SelectRenderControl<HTMLElement, V>`.
- `SelectRenderOption<T, V = string>`, `SelectRenderOptionGroup<T, V = string>`,
  `SelectRenderControlOptions<V = string>`, `SelectRenderControl<T extends HTMLElement, V = string>`.
- `Select.tsx` public call signature: `<T = any, V = string>(p: SelectProps<T, V> & {ref?: ...})`
  via the existing `as unknown as SelectComponent` cast, so `V` is inferred from
  `options`/`value`/`onUpdate` at call sites.
- Non-generic trailing overloads on `SelectComponent`, `Option`/`OptionGroup`, and `useSelect`
  (added after adversarial review): type utilities that do not go through inference —
  `React.ComponentProps<typeof Select>`, `ReturnType<typeof useSelect>`, Storybook `Meta` —
  erase generic parameters to their constraints (`unknown`), ignoring defaults. The trailing
  non-generic overload keeps them resolving to string values, exactly as before the change.
  Pinned by `componentPropsResolveToStringValues`/`useSelectReturnTypeResolvesToStringValues`
  in `Select.types.test.tsx`.
- `tech-components.tsx`: `Option`/`OptionGroup` gain the `V` parameter. Note: the
  children-based JSX API cannot infer `V` (ReactElement erases generics) — children users get
  `V = string` unless they pass explicit type arguments; documented.

`src/hooks/useSelect/types.ts` (public via root exports):

- `UseSelectOption<T = unknown, V = string> = T & {value: V}`
- `UseSelectProps<V = string>` (`value`, `defaultValue`, `onUpdate`)
- `UseSelectResult<T, V = string>` (`value`, `setValue`, `handleSelection`)
- `useSelect<T, V = string>` — runtime body unchanged.

`src/components/Select/hooks-public/useSelectOptions`:
`UseSelectOptionsProps<T = any, V = string>`, `useSelectOptions<T, V>`,
`getSelectFilteredOptions<T, V>`.

### Type plumbing — internal boundary

Internal modules keep working through `FlattenOption`, which becomes
`FlattenOption<T = any, V = any>` — the generic boundary ends at the public types; internals
are value-type-agnostic (their logic already is). Internal props widen from
`NonNullable<SelectProps['value']>` (string[]) to the `any`-valued equivalent:
`SelectList`, `OptionWrap`, `SelectControl`, `useActiveItemIndex`, `HiddenSelect` (generic
`<V>` because `onReset` must round-trip the original `V[]` for form reset),
`getSelectedOptionsContent` (`value: unknown[]`, `Map<unknown, ...>`).

### Behavior fixes required by generic values

- `SelectList` loading sentinel: `option.value === loadingOption.value` becomes an identity
  check `option === loadingOption` (type-safe under generics; removes the theoretical string
  collision with the `'__SELECT_LIST_ITEM_LOADING__'` sentinel).
- `SelectControl` `has-value` mod: `value.filter(Boolean)` would treat numeric `0` as "empty".
  Becomes `Boolean(v) || v === 0`. String behavior (`''` excluded) preserved.

### Explicit non-goals (YAGNI)

- No comparator / key-extractor prop (`isOptionEqualToValue`, `getOptionValueKey`) — can be
  added later, non-breaking.
- No changes to `ControlGroupOption` or radio/checkbox groups.
- No changes to TreeSelect (it only shares `useOpenState`/`SelectPopup`).
- `UseSelectResult` stays unexported (as today).

## Backward compatibility audit

- All new generic parameters are trailing with `= string` defaults: `SelectProps<MyData>`,
  `SelectOption<MyData>`, `UseSelectProps` annotations keep meaning exactly what they meant.
- Runtime paths for string values are bit-for-bit identical except the two documented fixes
  (loading sentinel identity check — same observable behavior; `has-value` with numeric 0 —
  unreachable for strings).
- In-repo canaries: `ColorPicker` (lab) relies on `onUpdate` inferring `string[]`;
  `Palette` calls `useSelect` with string values; form test pins empty submit as `['']`.
  All must pass unchanged.

## Testing

1. Adopt `Select.generic-value.test.tsx` from `204db3e4` verbatim (acceptance).
2. Extend runtime coverage: single-select numbers (select + reselect), clear with numbers
   (`onUpdate([])`), object values shown as selected by reference (`aria-selected`),
   filterable Select with number values (regression for the `toLocaleLowerCase` crash),
   trigger text fallback for number values without `content`, `getSelectedOptionsContent`
   unit tests for numbers/objects, `has-value` class with `0`.
3. Type-level tests in `__tests__/Select.types.test.tsx`: default `V = string`; inference of
   number/object `V` from `options`; `@ts-expect-error` on mixed value/options types;
   `UseSelectProps` defaults. Enforced by `npm run typecheck` (ts-jest is transpile-only, so
   type assertions live in non-executed declarations; the file also runs trivial renders).
4. Adopt the `WithGenericValues` story from `204db3e4`.
5. Full existing Select suite + repo-wide typecheck/lint must pass.

## Documentation

- README.md / README-ru.md: properties table types for `value`/`defaultValue`/`onUpdate`,
  plus a "Generic values" section with number and object examples documenting reference
  equality and form serialization.
