<!--GITHUB_BLOCK-->

# unstable_Suggest

<!--/GITHUB_BLOCK-->

```tsx
import {
  unstable_Suggest as Suggest,
  type unstable_SuggestOptionProps as SuggestOptionProps,
} from '@gravity-ui/uikit/unstable';
```

`Suggest` implements the [Editable Combobox with List Autocomplete](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/) pattern.

## Basic usage

Each option follows a `Select`-like shape — `value`, `content` (rendered by default), optional `disabled`, and an optional generic `data` payload. Pass `options` (sync array) and update them in `onUpdate`:

<!--GITHUB_BLOCK-->

```tsx
const ALL_PLANETS = [
  {value: 'earth', content: 'Earth'},
  {value: 'europa', content: 'Europa'},
  {value: 'jupiter', content: 'Jupiter'},
];

const [value, setValue] = React.useState('');
const options = React.useMemo(
  () => ALL_PLANETS.filter((o) => o.value.toLowerCase().includes(value.toLowerCase())),
  [value],
);

<Suggest
  value={value}
  onUpdate={setValue}
  options={options}
  onOptionAction={(_value, option) => {
    setValue(option.value);
  }}
  placeholder="Search…"
/>;
```

By default an option's `content` is rendered, falling back to `children`. Pass `renderOption` to customize the content.

<!--/GITHUB_BLOCK-->

## Async loading

While `loading` is `true`, a loading row is appended to existing options.

For pagination, keep it visible while a request is in progress or more pages are available: `loading={isFetching || hasNextPage}`.

`onLoadMore` fires when the loading row becomes visible in a non-empty list, with or without virtualization. Start the initial request in your application; an empty list does not trigger `onLoadMore`. The example uses the application-provided `options`, `isFetching`, `hasNextPage`, and `loadNextPage`, and guards against concurrent requests.

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState('');

<Suggest
  value={value}
  onUpdate={setValue}
  options={options}
  loading={isFetching || hasNextPage}
  onLoadMore={() => {
    if (!isFetching && hasNextPage) {
      loadNextPage();
    }
  }}
  onOptionAction={(_value, option) => {
    setValue(option.value);
  }}
  placeholder="Search…"
/>;
```

<!--/GITHUB_BLOCK-->

## TextInput customization

All `TextInput` props (size, pin, hasClear, startContent, validationState, errorMessage, disabled, etc.) are passed directly to `Suggest`:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  options={items}
  size="xl"
  hasClear
  placeholder="Search…"
  validationState={hasError ? 'invalid' : undefined}
  errorMessage={hasError ? 'Invalid input' : undefined}
  startContent={<Icon data={SearchIcon} />}
/>
```

<!--/GITHUB_BLOCK-->

## Show options on empty input

By default, focus alone does not open the popup, even when the input is prefilled.
Typing a non-empty value, clicking the input, or pressing ArrowDown/ArrowUp opens it.
To open on focus or keep the popup open after clearing the input, control the open state yourself:

<!--GITHUB_BLOCK-->

```tsx
const [open, setOpen] = React.useState(false);

<Suggest
  value={value}
  onUpdate={setValue}
  open={open}
  onOpenChange={(nextOpen, _event, reason) => {
    if (!nextOpen && reason === 'input-change') {
      return;
    }
    setOpen(nextOpen);
  }}
  options={allItems}
  onFocus={() => setOpen(true)}
  placeholder="Click to browse all options…"
/>;
```

<!--/GITHUB_BLOCK-->

## Custom popup content

Use `renderPopup({renderList})` to wrap the default content or add a header/footer. Use `renderEmptyOptions({filter})` for an empty state; `filter` is the current input value. `renderList()` renders the list, initial loader, or custom empty state. Returning `null` from `renderPopup` hides the popup.
Keep wrappers around the list as flex columns with `min-height: 0` so the list can shrink
to fit the popup. Use `flex-shrink: 0` on headers and footers to preserve their height:

<!--GITHUB_BLOCK-->

```tsx
import {Flex, Text} from '@gravity-ui/uikit';

<Suggest
  value={value}
  onUpdate={setValue}
  options={filteredItems}
  renderEmptyOptions={({filter}) => (
    <div style={{padding: 'var(--g-spacing-2)', color: 'var(--g-color-text-secondary)'}}>
      Nothing matched "{filter}"
    </div>
  )}
  renderPopup={({renderList}) => (
    <Flex direction="column" style={{minHeight: 0}}>
      <Flex padding="spacing-2" style={{flexShrink: 0}}>
        <Text variant="subheader-2">Results</Text>
      </Flex>
      {renderList()}
    </Flex>
  )}
/>;
```

<!--/GITHUB_BLOCK-->

## Virtualization

Wrap `Suggest` in `ListVirtualizer`, just like `List` or `Select`:

```tsx
import {unstable_Suggest as Suggest} from '@gravity-ui/uikit/unstable';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

<ListVirtualizer>
  <Suggest options={options} value={value} onUpdate={setValue} />
</ListVirtualizer>;
```

Install the optional peer dependency `@tanstack/react-virtual` to use this entrypoint.
Without the wrapper, Suggest renders every option and needs no virtualization dependency.

The popup has a maximum height of `40vh`. Override `max-height` using `popupClassName`
to customize it, with or without virtualization. Only the list scrolls within the popup.
Rows use the List design and follow `size`. The virtualizer measures variable-height
rows automatically. `getOptionHeight`, when provided, sets the row height and its virtualization
estimate; otherwise the List size determines the estimate. `ListVirtualizer.estimateItemSize`
is ignored with a development warning. The loading row uses the standard height for the input size.

## Keyboard Navigation

List navigation follows the [List keyboard behavior](https://preview.gravity-ui.com/uikit/?path=/docs/components-data-display-list--docs#keyboard). Suggest adds the following popup actions:

| Key       | Action                                      |
| :-------- | :------------------------------------------ |
| `↑` / `↓` | Open the popup if closed                    |
| `Enter`   | Apply the active option and close the popup |
| `Escape`  | Close the popup, keeping focus in the input |

No option is highlighted automatically when the popup opens.

## Properties

| Name                 | Description                                                                                          | Type                                                                                                                       | Default          |
| :------------------- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :--------------- |
| className            | CSS class for the TextInput root                                                                     | `string`                                                                                                                   |                  |
| controlRef           | Ref to the native input control (see TextInput)                                                      | `TextInputProps["controlRef"]`                                                                                             |                  |
| defaultOpen          | Initial open state (uncontrolled)                                                                    | `boolean`                                                                                                                  |                  |
| defaultValue         | Initial value (uncontrolled)                                                                         | `string`                                                                                                                   |                  |
| disablePortal        | Render the popup without a portal                                                                    | `boolean`                                                                                                                  | `false`          |
| getOptionHeight      | Row height function (enables variable-height rows)                                                   | `(option: SuggestOptionProps<T>, index: number) => number`                                                                 |                  |
| id                   | Native input ID (auto-generated if omitted)                                                          | `string`                                                                                                                   |                  |
| loading              | Show a loading indicator                                                                             | `boolean`                                                                                                                  | `false`          |
| onActiveOptionUpdate | Forwards List requests to update the active option by its value or `null`                            | `(value: string \| null) => void`                                                                                          |                  |
| onLoadMore           | Called when the loading row becomes visible in a non-empty list (pagination)                         | `() => void`                                                                                                               |                  |
| onOpenChange         | Called when popup open state changes                                                                 | `(open: boolean, event?: Event, reason?: SuggestOpenChangeReason) => void`                                                 |                  |
| onOptionAction       | Called when an option is selected by mouse or keyboard                                               | `(value: string, option: SuggestOptionProps<T>, event: ListItemActionEvent) => void`                                       |                  |
| onUpdate             | Called when the input value changes                                                                  | `(value: string) => void`                                                                                                  |                  |
| open                 | Control popup open state externally                                                                  | `boolean`                                                                                                                  |                  |
| options              | Options to display (`value`, `content`, `disabled`, `data?`). Each option must have a unique `value` | `SuggestOptionProps<T>[]`                                                                                                  |                  |
| popupClassName       | CSS class for the popup                                                                              | `string`                                                                                                                   |                  |
| popupPlacement       | Popup placement relative to the input                                                                | `PopupPlacement`                                                                                                           | `'bottom-start'` |
| popupWidth           | Popup width                                                                                          | `'fit' \| number`                                                                                                          |                  |
| qa                   | `data-qa` on the field root (TextInput or custom control)                                            | `string`                                                                                                                   |                  |
| ref                  | Ref to the field root (TextInput or custom control)                                                  | `React.Ref<HTMLSpanElement>`                                                                                               |                  |
| renderEmptyOptions   | Custom empty content when not loading                                                                | `(props: {filter: string}) => ReactElement \| null`                                                                        |                  |
| renderInput          | Custom input renderer; see Custom input                                                              | `(props) => ReactElement`                                                                                                  |                  |
| renderOption         | Custom option content renderer (defaults to `content`, falling back to `children`)                   | `(option: SuggestOptionProps<T>, options: {itemHeight: number; isItemActive: boolean; selected: boolean}) => ReactElement` |                  |
| renderPopup          | Replace or wrap the default list inside the popup                                                    | `(props: {renderList: () => ReactElement \| null}) => ReactElement \| null`                                                |                  |
| size                 | Size of the input and list rows                                                                      | `'s' \| 'm' \| 'l' \| 'xl'`                                                                                                | `'m'`            |
| style                | Inline styles for the TextInput root                                                                 | `CSSProperties`                                                                                                            |                  |
| value                | Input value (controlled)                                                                             | `string`                                                                                                                   |                  |

Without `renderInput`, Suggest accepts all [TextInput props](../../controls/TextInput/README.md) directly, plus `aria-label`, `aria-labelledby`, `aria-describedby`, and `aria-details`. `ref` points to the TextInput root; `controlRef` points to the native input.

Suggest manages `role`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete`, and `aria-busy`; these attributes cannot be overridden through `controlProps`.

After an option action, an uncontrolled popup closes. With controlled `open`, Suggest requests closing through `onOpenChange(false, event, 'option-action')`; the parent may ignore that request to keep the popup open. `onOptionAction` does not control the popup through its return value.

`SuggestOpenChangeReason` extends Floating UI's `OpenChangeReason` with `input-change` (typing or clearing the input) and `option-action` (selecting an option).

`onActiveOptionUpdate` reports List requests from keyboard or pointer interaction. Reordering or removing options and closing the popup do not emit additional updates. Each opening starts without an active option. Text for List uses string or numeric `content`/`children`, falling back to the option value.

## Accessibility

The input is marked `aria-busy` only while loading with no options. During pagination, the status announces the available option count instead of loading. A visually hidden polite status announces loading, the available option count, or no results while opening is requested. `aria-expanded` and `aria-controls` describe the mounted List, so a popup showing only a loader or custom empty content does not mark the list as expanded.

Suggest announces when no results are available, including when `renderEmptyOptions` or `renderPopup` provides custom content. Custom empty content controls the visual presentation and does not need its own live region.

## Custom input

Use `renderInput` to replace TextInput, for example with TextArea. The callback receives `SuggestRenderInputProps`, including `open`, `id`, `value`, `onUpdate`, `onFocus`, `onBlur`, `controlRef`, `ref`, `controlProps`, and optional interaction handlers `onKeyDown` and `onClick`.

> **Required wiring:** Forward `ref`, `controlRef`, `id`, `value`, `onUpdate`, `onFocus`, `onBlur`, and the ARIA attributes in `controlProps` to the appropriate elements of your custom control. For built-in keyboard navigation, call the supplied `onKeyDown` for the keys Suggest should handle. Without that call, built-in keyboard navigation will not work.

Forward `controlRef` to the native input/textarea and `ref` to the control root. The popup is anchored to the native control's parent; attach `anchorRef` to another element to use a different anchor. Forward `id`, `value`, `onUpdate`, the focus handlers, and the ARIA attributes in `controlProps`. Shared control props (`disabled`, `readOnly`, `placeholder`, `name`, `autoComplete`, `autoFocus`, `tabIndex`, `size`, `view`, `pin`, `hasClear`, validation props, `note`, `className`, `style`, and `qa`) are forwarded. Before spreading props onto a UIKit TextInput or TextArea, separate `open` and `anchorRef`: use `open` in your interaction logic and attach `anchorRef` only to a custom popup anchor if needed. Then override individual props or handlers as needed, as shown in the **CustomInput** story. For a native input/textarea or another component, explicitly map the supplied props to its API; do not spread the entire callback argument onto a DOM element. `onFocus` and `onBlur` on Suggest are forwarded through the supplied focus handlers; their event target is `HTMLInputElement | HTMLTextAreaElement`. Other native callbacks (`onChange`, `onKeyDown`, `onKeyUp`) and `controlRef` on Suggest remain specific to the default TextInput; attach them directly to the custom control. TypeScript rejects these default-input props when `renderInput` is provided, including `controlProps`; use the top-level ARIA labeling props on Suggest and configure native attributes inside the renderer. TextInput-only props such as `type`, `label`, `startContent`, and `endContent` are not forwarded. The callback supplies managed ARIA attributes in its `controlProps`.

Call the supplied `onKeyDown` or `onClick` only when Suggest should handle that interaction. To keep the browser's caret movement or line breaks, do not call `onKeyDown` for those keys; no `preventDefault()` is needed. Use controlled `open` and `onOpenChange` to implement custom opening shortcuts or ignore automatic `input-change` requests. Popup dismissal still requests closing through `onOpenChange`. The renderer receives the requested `open` state; the popup also needs content to appear. When implementing shortcuts, ignore events while `event.nativeEvent.isComposing` or `event.keyCode === 229`, so IME confirmation does not open the popup or select an option.

For a multiline TextArea, preserve textbox semantics: omit `role` (override the supplied value with `undefined`) and `aria-expanded` from its `controlProps`, while preserving the list relationship and active descendant.

Suggest displays the supplied `options` without filtering them. Use `onUpdate` to update the query and supply locally filtered options or async results. Use `onOptionAction` to update the field value: replace the entire text or insert the selected option at the caret. Insertion, selection replacement, and caret restoration are handled by the consumer.

Screen-reader behavior when switching from list navigation back to text editing still needs manual verification; an active option remains referenced while the popup is open.

Long option content can wrap through `renderOption`. With virtualization, supply `getOptionHeight` matching the rendered row heights.
