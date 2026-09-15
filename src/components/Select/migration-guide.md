# Migration to the list of v8

The options of `Select` are rendered by the new list core instead of the old `List`. The props of the
component are almost unchanged; what follows is everything that can break a consumer, with a pointer
to the section of the [README](./README.md) that describes the new state of things.

## Props

| Was                                          | Now                                                                                                                                                                          |
| :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `virtualizationThreshold`                    | Gone. Virtualization is asked for explicitly: wrap the `Select` in `ListVirtualizer` from `@gravity-ui/uikit/virtualizer` — [Virtualized list](./README.md#virtualized-list) |
| `SelectOption.text`                          | Gone. The text of an option comes from `getOptionText` — [The text of an option](./README.md#the-text-of-an-option)                                                          |
| `renderOption(option, props)`                | `props.isItemActive` is no longer optional — it is always passed                                                                                                             |
| `renderFilter({value, onChange, onKeyDown})` | Deprecated in favour of `inputProps`, which also carries the combobox ARIA wiring — [Rendering custom filter section](./README.md#rendering-custom-filter-section)           |

```diff
- <Select options={options} virtualizationThreshold={50} />
+ <ListVirtualizer>
+     <Select options={options} />
+ </ListVirtualizer>
```

`@gravity-ui/uikit/virtualizer` needs `@tanstack/react-virtual` — it is an optional peer dependency
of the package, so it has to be installed alongside it. A `Select` without the wrapper renders every
option as a row, and above 150 of them says so in a development warning.

```diff
- <Select options={[{value: 'msk', content: <City id="msk" />, text: 'Moscow'}]} />
+ <Select
+     options={[{value: 'msk', content: <City id="msk" />, data: {name: 'Moscow'}}]}
+     getOptionText={(option) => option.data?.name ?? getSelectOptionText(option)}
+ />
```

## The data

- **The values of the options have to be unique**, groups included: a value identifies the row of an
  option. Two options with one value share a DOM id and all such rows show the content of the last
  one; the `Select` says so in a development warning. The old list kept rows by position and drew
  both.
- **The rows are the rows of the new design, and they are of other heights**: an option of `size="s"`
  is 24px instead of 28, the header of a group is 26px (28 in `xl`) plus 8px above it when it follows
  other rows, and a group with an empty label — a separating line — takes 9px instead of nothing. The
  `itemHeight` handed to `renderOption` and `renderOptionGroup` carries those numbers.

## The DOM and the styles

- **The class names of the rows are gone**, and the ones that remain are not a public contract:
  `.g-select-list__group-label`, `.g-select-list__group-label-content`,
  `.g-select-list__group-label-custom`, `.g-select-list__tick-icon`,
  `.g-select-list__option_disabled`, `.g-select-list__option-default-label_disabled`, and the
  `.g-list__item` of the old list. Styles hooked on them stop applying. What is supported instead is
  described in [CSS API](./README.md#css-api): the CSS variables of the row view, and the render
  props for the content of a row.
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
