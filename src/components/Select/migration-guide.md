# Migration to the list of v8

The options of `Select` are rendered by the new list core instead of the old `List`. The props of the
component are almost unchanged; what follows is everything that can break a consumer, with a pointer
to the section of the [README](./README.md) that describes the new state of things.

## Props

| Was                                          | Now                                                                                                                                                                                                                                                                                                    |
| :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `virtualizationThreshold`                    | Gone. Virtualization is asked for explicitly: wrap the `Select` in `ListVirtualizer` from `@gravity-ui/uikit/virtualizer` — [Virtualized list](./README.md#virtualized-list)                                                                                                                           |
| `SelectOption.text`                          | Gone. The text of an option comes from `getOptionText` — [The text of an option](./README.md#the-text-of-an-option)                                                                                                                                                                                    |
| `renderOption(option, props)`                | `props.isItemActive` is no longer optional — it is always passed, and `props.itemHeight` carries the new heights — [Rendering custom options](./README.md#rendering-custom-options)                                                                                                                    |
| `renderFilter({value, onChange, onKeyDown})` | `value` and `onKeyDown` are gone: both live in `inputProps`, which also carries the ARIA of the combobox. `onChange` stays and is no longer deprecated — it is the string-shaped counterpart of `inputProps.onChange` — [Rendering custom filter section](./README.md#rendering-custom-filter-section) |

```diff
- <Select options={options} virtualizationThreshold={50} />
+ <ListVirtualizer>
+     <Select options={options} />
+ </ListVirtualizer>
```

`@gravity-ui/uikit/virtualizer` needs `@tanstack/react-virtual` — it is an optional peer dependency
of the package, so it has to be installed alongside it. A `Select` without the wrapper renders every
option as a row, and above 150 of them says so in a development warning.

The width of the popup follows from the same place. A list that virtualized itself by the old
threshold was as wide as the control, and never narrower than 100px; a list that is not virtualized
is as wide as its widest option (see [Popup width](./README.md#popup-width)). So a long list left
without the wrapper can come out wider than it used to. Wrapping it in `ListVirtualizer` brings the
old rule back as it was; `popupWidth="fit"` also pins the popup to the control, but it drops the
100px floor along with it, which shows on a control narrower than that.

```diff
- <Select options={[{value: 'msk', content: <City id="msk" />, text: 'Moscow'}]} />
+ <Select
+     options={[{value: 'msk', content: <City id="msk" />, data: {name: 'Moscow'}}]}
+     getOptionText={(option) => option.data?.name ?? getSelectOptionText(option)}
+ />
```

```diff
- const renderFilter = ({value, ref, onChange, onKeyDown}) => (
-     <TextInput controlRef={ref} value={value} onUpdate={onChange} onKeyDown={onKeyDown} />
- );
+ const renderFilter = ({ref, inputProps}) => {
+     const {value, onChange, onKeyDown, ...controlProps} = inputProps;
+
+     return (
+         <TextInput
+             controlRef={ref}
+             controlProps={controlProps}
+             value={value}
+             onChange={onChange}
+             onKeyDown={onKeyDown}
+         />
+     );
+ };
```

The rest of `inputProps` has to reach the input as well, or the filter ends up a nameless field that
tells a screen reader nothing about the list. On a plain `input` that is one spread; on a component
with an API of its own it is the `...controlProps` above — everything the component does not own
belongs to the element.

`inputProps.size` is a width hint rather than ARIA: it is `1`, so that the input can shrink to the
popup instead of keeping the twenty characters an `input` asks for by default. An input of your own
that sizes itself with CSS does not need it.

## The data

- **The values of the options have to be unique**, groups included: a value identifies the row of an
  option. Two options with one value share a DOM id and all such rows show the content of the last
  one; the `Select` says so in a development warning. The old list kept rows by position and drew
  both.
- **The rows are the rows of the new design, and they are of other heights**: an option of `size="s"`
  is 24px instead of 28, an option on mobile is 36px instead of 32 (there every row is of size `xl`,
  whatever the `size` of the `Select`), the header of a group is 26px (28 in `xl`) plus 8px above it
  when it follows other rows, and a group with an empty label — a separating line — takes 9px instead
  of 5 when it follows another row, and nothing at all as the first row of the list, as before — that
  zero is the default one, and `getOptionGroupHeight` overrides it like any other. The `itemHeight` handed to `renderOption` and `renderOptionGroup` carries those numbers, and
  so does the estimate the virtualizer is given.

## The DOM and the styles

- **These class names are gone**, and styles hooked on them stop applying:
  `.g-select-list__group-label`, `.g-select-list__group-label-content`,
  `.g-select-list__group-label-custom`, `.g-select-list__tick-icon`,
  `.g-select-list__option_disabled`, `.g-select-list__option-default-label_disabled` and the
  `.g-list__item` of the old list. The names that remain are not a public contract either — the rows
  are drawn by the list and its row view. What is supported instead is described in
  [CSS API](./README.md#css-api): the colour variables of the row view, and the render props for the
  content of a row.
- **The DOM `id` of a row is derived from the value of the option** instead of its index. Selectors
  and accessibility assertions keyed on the old id have to be rewritten — read the id from
  `aria-activedescendant` of the trigger rather than building it by hand: how a value is escaped
  belongs to the list and is not a contract.
- **A group header is no longer an option**: it carries `role="presentation"` and is skipped by the
  count of `role="option"` rows — [Grouped list](./README.md#grouped-list).
- The `data-qa` hooks are unchanged: `select-list` on the list and `list-active-item` on the active
  option (`SelectQa.ACTIVE_ITEM`, which now lives in `SelectQa` rather than in the `ListQa` of the
  old list).

## The keyboard

- **The search by the first letters matches a prefix** rather than a substring, its buffer resets a
  second after the last key, and repeating one character cycles through the options that start with
  it. `Backspace` no longer edits the query — [The search by the first letters](./README.md#the-search-by-the-first-letters).
- **A space is part of the query while it is being typed** and applies nothing until the buffer is
  empty again, as the ARIA Authoring Practices Guide prescribes for a listbox.
- `PageUp`/`PageDown` move the activity by ten options.
