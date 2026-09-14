# 8.0

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

```diff
- <Select options={[{value: 'msk', content: <City id="msk" />, text: 'Moscow'}]} />
+ <Select
+     options={[{value: 'msk', content: <City id="msk" />, data: {name: 'Moscow'}}]}
+     getOptionText={(option) => option.data?.name ?? getSelectOptionText(option)}
+ />
```

## The DOM and the styles

- **The class names of the rows are gone**, and the ones that remain are not a public contract:
  `.g-select-list__group-label`, `.g-select-list__group-label-content`,
  `.g-select-list__group-label-custom`, `.g-select-list__tick-icon`,
  `.g-select-list__option_disabled`, `.g-select-list__option-default-label_disabled`, and the
  `.g-list__item` of the old list. Styles hooked on them stop applying. What is supported instead is
  described in [CSS API](./README.md#css-api): the CSS variables of the row view, and the render
  props for the content of a row.
- **The DOM `id` of a row is built from the value of the option** — `${popupId}-item-${encodeURIComponent(value)}`
  instead of the index it used to be. Selectors and accessibility assertions keyed on the old id
  have to be rewritten; `aria-activedescendant` of the trigger points at the new one.
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
