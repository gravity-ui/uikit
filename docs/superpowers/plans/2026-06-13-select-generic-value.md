# Select Generic Value Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `Select`'s `value`/`defaultValue`/`onUpdate`/`options[].value` generic over the value type (strings, numbers, objects) with full backward compatibility.

**Architecture:** Thread a trailing `V = string` generic parameter through `SelectProps`/`SelectOption`/`useSelect` and friends; keep SameValueZero (reference) equality at runtime; convert values to strings only at string boundaries (display fallback, hidden form inputs, React keys) via a new `serializeOptionValue` helper. Internals stay value-type-agnostic through `FlattenOption<T = any, V = any>`.

**Tech Stack:** TypeScript, React, Jest + Testing Library (`ts-jest` is transpile-only — type assertions are enforced by `npm run typecheck`, not jest).

Spec: `docs/superpowers/specs/2026-06-13-select-generic-value-design.md`
Note: the user requested **no commits** — commit steps are intentionally omitted.

---

### Task 1: Acceptance + extended runtime tests (TDD red)

**Files:**

- Create: `src/components/Select/__tests__/Select.generic-value.test.tsx`
- Modify: `src/components/Select/__stories__/Select.stories.tsx` (story from `204db3e4`)

- [ ] **Step 1: Apply the pinned acceptance commit without committing**

Run: `git cherry-pick -n 204db3e4`
Expected: clean apply (test file + story). If it conflicts, copy the contents from `git show 204db3e4` manually.

- [ ] **Step 2: Extend the test file with additional scenarios**

Append to `src/components/Select/__tests__/Select.generic-value.test.tsx` inside the describe
(adjust imports to match: add `SelectQa`, `selectControlBlock` from `../constants`):

```tsx
it('selects and updates number values in single mode', async () => {
  const onUpdate = jest.fn();

  render(
    <Select
      qa="select"
      defaultValue={[1]}
      options={[
        {value: 1, content: 'One'},
        {value: 2, content: 'Two'},
      ]}
      onUpdate={onUpdate}
    />,
  );

  await user.click(screen.getByTestId('select'));
  await user.click(screen.getByText('Two'));

  expect(onUpdate).toHaveBeenCalledWith([2]);
  expect(screen.getByTestId('select')).toHaveTextContent('Two');
});

it('clears number values with onUpdate([])', async () => {
  const onUpdate = jest.fn();

  render(
    <Select
      qa="select"
      hasClear
      value={[1]}
      options={[{value: 1, content: 'One'}]}
      onUpdate={onUpdate}
    />,
  );

  await user.click(screen.getByTestId(SelectQa.CLEAR));

  expect(onUpdate).toHaveBeenCalledWith([]);
});

it('marks object values selected by reference', async () => {
  const alice = {id: 1, name: 'Alice'};
  const bob = {id: 2, name: 'Bob'};

  render(
    <Select
      qa="select"
      multiple
      value={[bob]}
      options={[
        {value: alice, content: 'Alice'},
        {value: bob, content: 'Bob'},
      ]}
    />,
  );

  await user.click(screen.getByTestId('select'));

  expect(screen.getByRole('option', {name: 'Bob'})).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('option', {name: 'Alice'})).toHaveAttribute('aria-selected', 'false');
});

it('falls back to serialized value for trigger text', () => {
  render(<Select qa="select" value={[42]} options={[{value: 42}]} />);

  expect(screen.getByTestId('select')).toHaveTextContent('42');
});

it('filters options with number values without crashing', async () => {
  render(
    <Select qa="select" filterable options={[{value: 42}, {value: 7}]} onUpdate={jest.fn()} />,
  );

  await user.click(screen.getByTestId('select'));
  await user.keyboard('4');

  expect(screen.getByText('42')).toBeInTheDocument();
  expect(screen.queryByText('7')).not.toBeInTheDocument();
});

it('treats numeric 0 as a present value for control styling', () => {
  const {container} = render(
    <Select qa="select" value={[0]} options={[{value: 0, content: 'Zero'}]} />,
  );

  expect(
    container.querySelector(`.${selectControlBlock({'has-value': true}).split(/\s/)[0]}`),
  ).not.toBeNull();
});
```

(While implementing, verify assertion details against existing suites — e.g. how
`Select.filter.test.tsx` types into the filter and how `cases.tsx`/`Select.single.test.tsx`
assert selected state — and adapt mechanically if a query differs.)

- [ ] **Step 3: Run the new suite to capture red**

Run: `npx jest src/components/Select/__tests__/Select.generic-value.test.tsx`
Expected: object form serialization FAILS (`[object Object]` is not JSON); filterable-numbers
FAILS (TypeError: `getOptionText(...).toLocaleLowerCase is not a function`); trigger-text
fallback and has-value-0 FAIL. Reference/number tests may already pass at runtime (JS is
untyped) — that is fine; the type system is the other half of red, captured next.

- [ ] **Step 4: Capture the type-level red**

Run: `npm run typecheck`
Expected: errors in `Select.generic-value.test.tsx` (number/object not assignable to `string`).

---

### Task 2: Public type plumbing

**Files:**

- Modify: `src/components/Select/types.ts`
- Modify: `src/components/Select/tech-components.tsx`
- Modify: `src/hooks/useSelect/types.ts`
- Modify: `src/hooks/useSelect/useSelect.ts`
- Modify: `src/components/Select/hooks-public/useSelectOptions/index.ts`
- Modify: `src/components/Select/Select.tsx`

- [ ] **Step 1: `types.ts` — add trailing `V = string` everywhere the value type appears**

```ts
export type SelectRenderControlOptions<V = string> = {
  value: SelectProps<any, V>['value'];
};
export type SelectRenderControl<T extends HTMLElement = HTMLElement, V = string> = (
  props: SelectRenderControlProps<T>,
  options: SelectRenderControlOptions<V>,
) => React.ReactElement;

export type SelectRenderOption<T, V = string> = (
  option: SelectOption<T, V>,
  options: SelectRenderOptionViewParams,
) => React.ReactElement;

export type SelectRenderOptionGroup<T, V = string> = (
  option: Pick<SelectOptionGroup<T, V>, 'label'>,
  options: SelectRenderOptionViewParams,
) => React.ReactElement;
```

`SelectProps<T = any, V = string>` — change these members (everything else untouched):

```ts
        onUpdate?: (value: V[]) => void;
        renderControl?: SelectRenderControl<HTMLElement, V>;
        renderOption?: SelectRenderOption<T, V>;
        renderOptionGroup?: SelectRenderOptionGroup<T, V>;
        renderSelectedOption?: (option: SelectOption<T, V>, index: number) => React.ReactElement;
        getOptionHeight?: (option: SelectOption<T, V>, index: number) => number;
        getOptionGroupHeight?: (option: SelectOptionGroup<T, V>, index: number) => number;
        filterOption?: (option: SelectOption<T, V>, filter: string) => boolean;
        value?: V[];
        defaultValue?: V[];
        options?: (SelectOption<T, V> | SelectOptionGroup<T, V>)[];
        children?:
            | React.ReactElement<SelectOption<T, V>, typeof Option>
            | React.ReactElement<SelectOption<T, V>, typeof Option>[]
            | React.ReactElement<SelectOptionGroup<T, V>, typeof OptionGroup>
            | React.ReactElement<SelectOptionGroup<T, V>, typeof OptionGroup>[];
```

`SelectOption` decouples from `ControlGroupOption`'s `extends string` constraint:

```ts
export type SelectOption<T = any, V = string> = QAProps &
  Omit<ControlGroupOption, 'value'> & {
    value: V;
    text?: string;
    data?: T;
  };

export type SelectOptionGroup<T = any, V = string> = {
  /**
   * Label is a string which displayed above the options group.
   * If label is empty string, group item height will be 0 and only border will be displayed
   */
  label: string;
  data?: T;
  options?: SelectOption<T, V>[];
  children?:
    | React.ReactElement<SelectOption<any, V>, typeof Option>
    | React.ReactElement<SelectOption<any, V>, typeof Option>[];
};

export type SelectOptions<T = any, V = string> = NonNullable<SelectProps<T, V>['options']>;
```

- [ ] **Step 2: `tech-components.tsx` — add `V`**

```ts
export const Option = <T extends any, V = string>(
  _props: SelectOption<T, V>,
): React.ReactElement<SelectOption<T, V>> | null => null;

export const OptionGroup = <T extends any, V = string>(
  _props: SelectOptionGroup<T, V>,
): React.ReactElement<SelectOptionGroup<T, V>> | null => null;
```

- [ ] **Step 3: `src/hooks/useSelect/types.ts` — generify value type**

```ts
export type UseSelectOption<T = unknown, V = string> = T & {value: V};

export type UseSelectProps<V = string> = {
  value?: V[];
  defaultValue?: V[];
  multiple?: boolean;
  onUpdate?: (value: V[]) => void;
  disabled?: boolean;
} & UseOpenProps;

export type UseSelectResult<T, V = string> = {
  open: boolean;
  value: V[];
  activeIndex: number | undefined;
  handleSelection: (option: UseSelectOption<T, V>) => void;
  handleClearValue: () => void;
  setValue: (value: V[]) => void;
  toggleOpen: (val?: boolean | undefined) => void;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};
```

- [ ] **Step 4: `src/hooks/useSelect/useSelect.ts` — signature only; the body is already SameValueZero**

```ts
export const useSelect = <T extends unknown, V = string>({
    defaultOpen,
    onClose,
    onOpenChange,
    open,
    value: valueProps,
    defaultValue = [],
    multiple,
    onUpdate,
    disabled,
}: UseSelectProps<V>): UseSelectResult<T, V> => {
```

and the two annotated callbacks:

```ts
    const setValue = React.useCallback(
        (v: V[]) => {
```

(`handleSingleSelection`/`handleMultipleSelection` parameters become
`option: UseSelectOption<T, V>`; bodies unchanged.)

- [ ] **Step 5: `hooks-public/useSelectOptions/index.ts` — generify the public hook**

```ts
export interface UseSelectOptionsProps<T = any, V = string> {
    /** [Select options](https://gravity-ui.com/components/uikit/select#options). */
    options: SelectOptions<T, V>;
    /** Value to filter options. Used with `filterable: true` only. */
    filter?: string;
    /** Indicates that `filter` and `filterOption` properties can be used. */
    filterable?: boolean;
    /** Used to compare option with filter. Used with `filterable: true` only. */
    filterOption?: SelectProps<T, V>['filterOption'];
}

function isFlattenOptions(
    options: UseSelectOptionsProps<any, any>['options'],
): options is FlattenOptions {
```

```ts
export function getSelectFilteredOptions<T, V = string>(
    options: SelectOptions<T, V>,
): SelectOptions<T, V> {
```

```ts
export function useSelectOptions<T extends any, V = string>(
    props: UseSelectOptionsProps<T, V>,
): SelectOptions<T, V> {
```

(If `tsc` complains about returning `FlattenOptions`, the internal `getFlattenOptions`
signature widening in Task 3 resolves it.)

- [ ] **Step 6: `Select.tsx` — public call signature + internal `any` boundary**

```ts
//https://stackoverflow.com/a/58473012
type SelectComponent = (<T = any, V = string>(
  p: SelectProps<T, V> & {ref?: React.Ref<HTMLButtonElement>},
) => React.ReactElement) & {Option: typeof Option} & {OptionGroup: typeof OptionGroup};
```

```ts
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select<T = any>(
    props: SelectProps<T, any>,
    ref: React.Ref<HTMLButtonElement>,
) {
```

---

### Task 3: Runtime string boundaries + internal widening

**Files:**

- Modify: `src/components/Select/utils.tsx`
- Modify: `src/components/Select/components/HiddenSelect/HiddenSelect.tsx`
- Modify: `src/components/Select/components/SelectList/SelectList.tsx`
- Modify: `src/components/Select/components/SelectList/OptionWrap.tsx`
- Modify: `src/components/Select/components/SelectControl/SelectControl.tsx`
- Modify: `src/components/Select/hooks/useActiveItemIndex.ts`

- [ ] **Step 1: `utils.tsx` — helper, generic boundary, string fallbacks**

```ts
// "disable" property needs to deactivate group title item in List
export type GroupTitleItem<T = any> = {label: string; disabled: true; data?: T};

export type FlattenOption<T = any, V = any> = SelectOption<T, V> | GroupTitleItem<T>;
```

```ts
export const isSelectGroupTitle = (
    option?: SelectOption<any, any> | SelectOptionGroup<any, any>,
): option is GroupTitleItem => {
```

```ts
export const getFlattenOptions = (options: SelectOptions<any, any>): FlattenOptions => {
```

New helper (place right above `getOptionText`):

```ts
export const serializeOptionValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
};
```

```ts
const getOptionText = (option: SelectOption<any, any>): string => {
  if (typeof option.content === 'string') {
    return option.content;
  }

  if (typeof option.children === 'string') {
    return option.children;
  }

  if (option.text) {
    return option.text;
  }

  return serializeOptionValue(option.value);
};
```

```ts
export const getSelectedOptionsContent = (
    options: SelectOptions<any, any>,
    value: unknown[],
    renderSelectedOption?: SelectProps<any, any>['renderSelectedOption'],
): React.ReactNode => {
    if (value.length === 0) {
        return null;
    }

    const flattenSimpleOptions = options.filter(
        (opt) => !isSelectGroupTitle(opt),
    ) as SelectOption<any, any>[];

    const optionsMap = new Map<unknown, SelectOption<any, any>>(
        flattenSimpleOptions.map((opt) => [opt.value, opt]),
    );

    const selectedOptions = value.map((val) => {
        return optionsMap.get(val) || {value: val};
    });

    if (renderSelectedOption) {
        return selectedOptions.map((option, index) => {
            return (
                <React.Fragment key={serializeOptionValue(option.value)}>
                    {renderSelectedOption(option, index)}
                </React.Fragment>
            );
        });
    } else {
        ...unchanged...
    }
};
```

```ts
export const getFilteredFlattenOptions = (args: {
    options: FlattenOption[];
    filter: string;
    filterOption?: SelectProps<any, any>['filterOption'];
}) => {
```

- [ ] **Step 2: `HiddenSelect.tsx` — generic + serialized inputs**

```tsx
import {serializeOptionValue} from '../../utils';

interface HiddenSelectProps<V> {
  name?: string;
  value: V[];
  disabled?: boolean;
  form?: string;
  onReset: (value: V[]) => void;
}
//FIXME: current implementation is not accessible to screen readers and does not support browser autofill and
// form validation
export function HiddenSelect<V>(props: HiddenSelectProps<V>) {
  const {name, value, disabled, form, onReset} = props;

  const ref = useFormResetHandler({onReset, initialValue: value});

  if (!name || disabled) {
    return null;
  }

  if (value.length === 0) {
    return <input ref={ref} type="hidden" name={name} value="" form={form} disabled={disabled} />;
  }

  return (
    <React.Fragment>
      {value.map((v, i) => {
        const serializedValue = serializeOptionValue(v);

        return (
          <input
            key={serializedValue}
            ref={i === 0 ? ref : undefined}
            value={serializedValue}
            type="hidden"
            name={name}
            form={form}
            disabled={disabled}
          />
        );
      })}
    </React.Fragment>
  );
}
```

- [ ] **Step 3: `SelectList.tsx` — widen value, identity-check the loading sentinel**

```ts
value: NonNullable<SelectProps<any, any>['value']>;
```

```ts
            if (option === loadingOption) {
```

(replaces `option.value === loadingOption.value`)

- [ ] **Step 4: `OptionWrap.tsx` — widen + SameValueZero**

```ts
type DefaultOptionProps = {
  option: SelectOption<any, any>;
};

type OptionWrapProps = {
  renderOption?: (option: SelectOption<any, any>) => React.ReactElement;
  value: NonNullable<SelectProps<any, any>['value']>;
  option: SelectOption<any, any>;
  multiple?: boolean;
};
```

```ts
const selected = value.includes(option.value);
```

- [ ] **Step 5: `SelectControl.tsx` — widen + numeric-0 fix**

```ts
    renderControl?: SelectRenderControl<HTMLElement, any>;
    ...
    value: NonNullable<SelectProps<any, any>['value']>;
```

```ts
const hasValue = Array.isArray(value) && value.some((v) => Boolean(v) || v === 0);
```

- [ ] **Step 6: `useActiveItemIndex.ts` — widen**

`value: string[]` → `value: unknown[]` in both the hook props and
`getInitialActiveItemIndex(options: FlattenOption[], value: unknown[])`.

- [ ] **Step 7: Run the generic-value suite**

Run: `npx jest src/components/Select/__tests__/Select.generic-value.test.tsx`
Expected: ALL PASS.

- [ ] **Step 8: Run the entire Select suite + useSelect-adjacent suites**

Run: `npx jest src/components/Select src/hooks`
Expected: ALL PASS (string behavior unchanged).

- [ ] **Step 9: Typecheck**

Run: `npm run typecheck`
Expected: clean.

---

### Task 4: Unit tests for `getSelectedOptionsContent` + type-level tests

**Files:**

- Modify: `src/components/Select/__tests__/getSelectedOptionsContent.test.ts`
- Create: `src/components/Select/__tests__/Select.types.test.tsx`

- [ ] **Step 1: Extend `getSelectedOptionsContent.test.ts`**

Add cases following the file's existing style (read it first; `options` must come from
`useSelectOptions`-flattened arrays if that is what existing cases do):

```ts
test('should return serialized text for number values without content', () => {
  expect(getSelectedOptionsContent(generateFlattenOptions([{value: 42}]), [42])).toBe('42');
});

test('should resolve object values by reference', () => {
  const userValue = {id: 1, name: 'Alice'};
  expect(
    getSelectedOptionsContent(generateFlattenOptions([{value: userValue, content: 'Alice'}]), [
      userValue,
    ]),
  ).toBe('Alice');
});

test('should fall back to JSON for unknown object values', () => {
  expect(getSelectedOptionsContent(generateFlattenOptions([]), [{id: 1}])).toBe('{"id":1}');
});
```

- [ ] **Step 2: Create `Select.types.test.tsx`**

```tsx
import {render, screen} from '../../../../test-utils/utils';
import type {UseSelectProps} from '../../../hooks';
import {Select} from '../Select';
import type {SelectOption, SelectProps} from '../types';

/**
 * Type-level tests. The exported functions below are never called: they only have to compile.
 * `npm run typecheck` enforces them — ts-jest transpiles without type checking, so failures
 * surface in CI's typecheck, not in jest.
 */

type Equal<A, B> =
  (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;

type User = {id: number; name: string};

export function valueDefaultsToString(props: SelectProps) {
  const assertion: Equal<typeof props.value, string[] | undefined> = true;
  return assertion;
}

export function dataGenericKeepsItsPositionAndStringValues(props: SelectProps<User>) {
  const assertion: Equal<typeof props.value, string[] | undefined> = true;
  return assertion;
}

export function optionCarriesBothGenerics(option: SelectOption<{meta: string}, User>) {
  const dataAssertion: Equal<typeof option.data, {meta: string} | undefined> = true;
  const valueAssertion: Equal<typeof option.value, User> = true;
  return [dataAssertion, valueAssertion];
}

export function useSelectPropsDefaultToString(props: UseSelectProps) {
  const assertion: Equal<typeof props.value, string[] | undefined> = true;
  return assertion;
}

export function useSelectPropsAcceptGenericValue(props: UseSelectProps<User>) {
  const assertion: Equal<typeof props.value, User[] | undefined> = true;
  return assertion;
}

export function valueTypeIsInferredFromOptions() {
  return (
    <Select
      options={[{value: 1, content: 'One'}]}
      onUpdate={(value) => {
        const assertion: Equal<typeof value, number[]> = true;
        return assertion;
      }}
    />
  );
}

export function renderSelectedOptionReceivesTypedValue() {
  return (
    <Select<unknown, User>
      options={[]}
      renderSelectedOption={(option) => {
        const assertion: Equal<typeof option.value, User> = true;
        return <span>{String(assertion)}</span>;
      }}
    />
  );
}

export function mismatchedValueTypeIsRejected() {
  return (
    <Select<any, number>
      options={[{value: 1, content: 'One'}]}
      // @ts-expect-error string values are not assignable when V is number
      value={['1']}
    />
  );
}

describe('Select generic value types (smoke)', () => {
  it('renders with inferred number values', () => {
    render(<Select qa="select" options={[{value: 1, content: 'One'}]} value={[1]} />);
    expect(screen.getByTestId('select')).toHaveTextContent('One');
  });
});
```

(Adjust the `UseSelectProps` import path to wherever it is publicly exported —
check `src/hooks/index.ts`.)

- [ ] **Step 3: Run them**

Run: `npx jest src/components/Select/__tests__/getSelectedOptionsContent.test.ts src/components/Select/__tests__/Select.types.test.tsx && npm run typecheck`
Expected: PASS + clean typecheck.

---

### Task 5: Documentation

**Files:**

- Modify: `src/components/Select/README.md`
- Modify: `src/components/Select/README-ru.md`

- [ ] **Step 1: README.md — new section after "Options data" + table updates**

New section:

````md
## Generic value types

By default option values are strings, but `Select` is generic over the value type: numbers and
objects can be used directly, and the type is inferred from `options`, `value` and `onUpdate`.

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState<number[]>([]);

<Select
  options={[
    {value: 1, content: 'One'},
    {value: 2, content: 'Two'},
  ]}
  value={value}
  onUpdate={setValue}
/>;
```
````

<!--/GITHUB_BLOCK-->

Values are compared using SameValueZero equality (the algorithm behind
`Array.prototype.includes`): numbers match by value, objects match **by reference** — entries of
`value` must be the same instances as the corresponding `options[].value`.

Additional notes for non-string values:

- In forms (the `name` property), values are serialized for submission: numbers via
  `String(value)`, objects via `JSON.stringify(value)`.
- If an option has no `content`/`children`/`text`, the displayed and filtered text falls back to
  the serialized value.
- The `<Select.Option>` children API cannot infer non-string value types; pass explicit type
  arguments (for example, `<Select<any, MyValue>>`) in that case.

```

Table updates (`value`, `defaultValue` rows): type `string[]` → `ValueType[]` and mention the
default. Keep formatting/prettier happy (`npm run lint:prettier:fix` if needed).

- [ ] **Step 2: README-ru.md — mirrored Russian section + table updates**

- [ ] **Step 3: Prettier check**

Run: `npx prettier --check src/components/Select/README.md src/components/Select/README-ru.md`
Expected: clean (run `--write` otherwise).

---

### Task 6: Full verification

- [ ] **Step 1:** `npm run typecheck` — clean
- [ ] **Step 2:** `npx eslint src/components/Select src/hooks/useSelect` — clean
- [ ] **Step 3:** `npx jest` (full unit suite) — all pass
- [ ] **Step 4:** Adversarial review workflow over the final diff; fix confirmed findings.
```
