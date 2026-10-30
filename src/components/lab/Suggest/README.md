<!--GITHUB_BLOCK-->

# unstable_Suggest

<!--/GITHUB_BLOCK-->

> `Suggest` is experimental (`lab`) — its API may change in minor releases until it stabilizes.

```tsx
import {
  unstable_Suggest as Suggest,
  type unstable_SuggestOptionProps as SuggestOptionProps,
} from '@gravity-ui/uikit/unstable';
```

`Suggest` is a text input with a dropdown list of options. It handles keyboard navigation, ARIA attributes, and popup positioning. Data fetching, debouncing, and pagination are handled externally.

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

By default an option's `content` is rendered, falling back to `children`. Pass `renderOption` to customize the content. Its second argument contains `itemHeight`, `isItemActive`, and `selected` (always `false`, since Suggest does not manage selection). Return a React element.

<!--/GITHUB_BLOCK-->

## Async loading

Use a local `loading` flag together with `options`. While `loading` is `true`, a loading row is appended to existing options. If there are no options, a standalone spinner is shown:

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState('');
const [options, setOptions] = React.useState<SuggestOptionProps[]>([]);
const [loading, setLoading] = React.useState(false);
const lastRequestId = React.useRef(0);

const handleUpdate = async (query: string) => {
  const requestId = ++lastRequestId.current;
  setValue(query);
  setLoading(true);
  try {
    const results = await fetchPlanets(query);
    if (requestId === lastRequestId.current) {
      setOptions(results);
    }
  } finally {
    if (requestId === lastRequestId.current) {
      setLoading(false);
    }
  }
};

<Suggest
  value={value}
  onUpdate={handleUpdate}
  options={options}
  loading={loading}
  onOptionAction={(_value, option) => {
    setValue(option.value);
  }}
  placeholder="Search…"
/>;
```

<!--/GITHUB_BLOCK-->

Only the latest request updates the options and loading state; earlier requests still run, but their results are ignored. `fetchPlanets` represents your application's data-loading function; handle request errors in your application.

To reduce the number of requests, debounce fetching while updating the input value immediately. Debouncing alone does not prevent stale responses. If your data-loading function supports `AbortSignal`, you can also cancel previous requests with `AbortController`.

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
  onUpdate={(nextValue) => {
    setValue(nextValue);
    setOpen(true);
  }}
  open={open}
  onOpenChange={setOpen}
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
<Suggest
  value={value}
  onUpdate={setValue}
  options={filteredItems}
  renderEmptyOptions={({filter}) => (
    <div role="status" style={{padding: 8, color: 'gray'}}>
      Nothing matched "{filter}"
    </div>
  )}
  renderPopup={({renderList}) => (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
      <div style={{padding: 8, fontWeight: 600, flexShrink: 0}}>Results</div>
      {renderList()}
    </div>
  )}
/>
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

`onLoadMore` fires when the loading row becomes visible in a non-empty list. For pagination,
keep `loading={hasNextPage}` while more pages are available, and guard against concurrent requests.
Start the initial request yourself; the standalone loader for an empty list does not call `onLoadMore`.

```tsx
<Suggest
  options={options}
  loading={hasNextPage}
  onLoadMore={() => {
    if (!isFetching && hasNextPage) {
      loadNextPage();
    }
  }}
/>
```

## Keyboard Navigation

No option is highlighted automatically when the popup opens.

| Windows / Linux      | macOS                | Action                                            |
| :------------------- | :------------------- | :------------------------------------------------ |
| `↓` Arrow Down       | `↓`                  | Open popup (if closed) or move to next option     |
| `↑` Arrow Up         | `↑`                  | Open popup (if closed) or move to previous option |
| `Page Down`          | `Fn + ↓`             | Move active option down one page                  |
| `Page Up`            | `Fn + ↑`             | Move active option up one page                    |
| `Home`               | `Fn + ←`             | Move text cursor to start of input                |
| `End`                | `Fn + →`             | Move text cursor to end of input                  |
| `Shift + Home / End` | `Shift + Fn + ← / →` | Extend text selection to start / end              |
| `Enter`              | `Enter`              | Select active option and close popup              |
| `Escape`             | `Escape`             | Close popup (input keeps focus)                   |

## Properties

### Core

| Name           | Type                      | Default | Description                  |
| :------------- | :------------------------ | :------ | :--------------------------- |
| `value`        | `string`                  |         | Input value (controlled)     |
| `defaultValue` | `string`                  |         | Initial value (uncontrolled) |
| `onUpdate`     | `(value: string) => void` |         | Called on every keystroke    |

### Options

| Name              | Type                                                                                                                       | Default | Description                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------- | :------ | :--------------------------------------------------------------------------------------------------- |
| `options`         | `SuggestOptionProps<T>[]`                                                                                                  |         | Options to display (`value`, `content`, `disabled`, `data?`). Each option must have a unique `value` |
| `onOptionAction`  | `(value: string, option: SuggestOptionProps<T>, event: ListItemActionEvent) => void`                                       |         | Called when an option is selected by mouse or keyboard                                               |
| `renderOption`    | `(option: SuggestOptionProps<T>, options: {itemHeight: number; isItemActive: boolean; selected: boolean}) => ReactElement` |         | Custom option content renderer (defaults to `content`, falling back to `children`)                   |
| `getOptionHeight` | `(option: SuggestOptionProps<T>, index: number) => number`                                                                 |         | Row height function (enables variable-height rows)                                                   |
| `onLoadMore`      | `() => void`                                                                                                               |         | Called when the loading row becomes visible in a non-empty list (pagination)                         |

### Input customization

Suggest accepts all [TextInput props](../../controls/TextInput/README.md) directly, plus `aria-label`, `aria-labelledby`, `aria-describedby`, and `aria-details`. `ref` points to the TextInput root; `controlRef` points to the native input.

Suggest manages `role`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete`, and `aria-busy`; these attributes cannot be overridden through `controlProps`.

### Popup configuration

| Name             | Type                        | Default        | Description                                        |
| :--------------- | :-------------------------- | :------------- | :------------------------------------------------- |
| `popupWidth`     | `'fit' \| 'auto' \| number` | `'fit'`        | Popup width: match input, natural, or fixed pixels |
| `popupClassName` | `string`                    |                | CSS class for the popup                            |
| `popupPlacement` | `PopupPlacement`            | `bottom-start` | Popup placement relative to the input              |
| `disablePortal`  | `boolean`                   | `false`        | Render the popup without a portal                  |

### Behavior

After an option action, an uncontrolled popup closes. With controlled `open`, Suggest requests closing through `onOpenChange(false, event, 'option-action')`; the parent may ignore that request to keep the popup open. `onOptionAction` does not control the popup through its return value.

`SuggestOpenChangeReason` extends Floating UI's `OpenChangeReason` with `input-change` (typing or clearing the input) and `option-action` (selecting an option).

| Name                   | Type                                                                       | Default | Description                                                               |
| :--------------------- | :------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------ |
| `loading`              | `boolean`                                                                  | `false` | Append a loading row; show a standalone spinner when options are empty    |
| `open`                 | `boolean`                                                                  |         | Control popup open state externally                                       |
| `defaultOpen`          | `boolean`                                                                  |         | Initial open state (uncontrolled)                                         |
| `onOpenChange`         | `(open: boolean, event?: Event, reason?: SuggestOpenChangeReason) => void` |         | Called when popup open state changes                                      |
| `onActiveOptionUpdate` | `(value: string \| null) => void`                                          |         | Forwards List requests to update the active option by its value or `null` |

`onActiveOptionUpdate` reports List requests from keyboard or pointer interaction. Reordering or removing options and closing the popup do not emit additional updates. Each opening starts without an active option. Text for List uses string or numeric `content`/`children`, falling back to the option value.

### Rendering

| Name                 | Type                                                                        | Default | Description                                       |
| :------------------- | :-------------------------------------------------------------------------- | :------ | :------------------------------------------------ |
| `renderEmptyOptions` | `(props: {filter: string}) => ReactElement \| null`                         |         | Custom empty content when not loading             |
| `renderPopup`        | `(props: {renderList: () => ReactElement \| null}) => ReactElement \| null` |         | Replace or wrap the default list inside the popup |

### Input element

| Name        | Type            | Default | Description                                 |
| :---------- | :-------------- | :------ | :------------------------------------------ |
| `className` | `string`        |         | CSS class for the TextInput root            |
| `style`     | `CSSProperties` |         | Inline styles for the TextInput root        |
| `id`        | `string`        |         | Native input ID (auto-generated if omitted) |
| `qa`        | `string`        |         | `data-qa` attribute for the input wrapper   |

## Accessibility

The input is marked `aria-busy` while loading. A visually hidden polite status announces loading, the available option count, or no results while opening is requested. `aria-expanded` and `aria-controls` describe the mounted List, so a popup showing only a loader or custom empty content does not mark the list as expanded.

For custom empty or error content in `renderEmptyOptions` or `renderPopup`, provide its own `role="status"` (or an appropriate live region). Suggest does not announce a generic empty result over custom content.
