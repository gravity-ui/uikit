<!--GITHUB_BLOCK-->

# unstable_Suggest

<!--/GITHUB_BLOCK-->

> `Suggest` is experimental (`lab`) — its API may change in minor releases until it stabilizes.

```tsx
import {unstable_Suggest as Suggest} from '@gravity-ui/uikit/unstable';
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
  onOptionClick={(option) => {
    setValue(option.value);
    return false; // close popup after selection
  }}
  inputProps={{placeholder: 'Search…'}}
/>;
```

By default an option's `content` is rendered, falling back to `children`. Pass `renderOption` to customize the content.

<!--/GITHUB_BLOCK-->

## Async loading

Use a local `loading` flag together with `options`. A spinner is shown automatically while `loading` is `true`:

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState('');
const [options, setOptions] = React.useState([]);
const [loading, setLoading] = React.useState(false);

const handleUpdate = async (query: string) => {
  setValue(query);
  setLoading(true);
  try {
    const results = await fetchPlanets(query);
    setOptions(results);
  } finally {
    setLoading(false);
  }
};

<Suggest
  value={value}
  onUpdate={handleUpdate}
  options={options}
  loading={loading}
  onOptionClick={(option) => {
    setValue(option.value);
    return false;
  }}
  inputProps={{placeholder: 'Search…'}}
/>;
```

<!--/GITHUB_BLOCK-->

## TextInput customization

All `TextInput` props (size, pin, hasClear, startContent, error, disabled, etc.) are passed via the `inputProps` object:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  options={items}
  inputProps={{
    size: 'xl',
    hasClear: true,
    placeholder: 'Search…',
    error: hasError ? 'Invalid input' : undefined,
    startContent: <Icon data={SearchIcon} />,
  }}
/>
```

<!--/GITHUB_BLOCK-->

## Show options on empty input

By default the popup opens once the input has a value. To also show options while
the input is empty (browse-all-on-focus, or keeping a multi-select popup open after
clearing), control the open state yourself:

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
  inputProps={{
    onFocus: () => setOpen(true),
    placeholder: 'Click to browse all options…',
  }}
/>;
```

<!--/GITHUB_BLOCK-->

## Custom popup content

Use `renderPopup` to wrap the list, add a header/footer, or render an empty state:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  options={filteredItems}
  renderPopup={({list}) => (
    <div>
      <div style={{padding: 8, fontWeight: 600}}>Results</div>
      {filteredItems.length === 0 ? (
        <div style={{padding: 8, color: 'gray'}}>Nothing matched "{value}"</div>
      ) : (
        list
      )}
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
  <Suggest options={options} value={value} onUpdate={setValue} listHeight={300} />
</ListVirtualizer>;
```

Install the optional peer dependency `@tanstack/react-virtual` to use this entrypoint.
Without the wrapper, Suggest renders every option and needs no virtualization dependency.

`listHeight` limits the list height when using `ListVirtualizer` (also bounded by `40vh`).
Without virtualization, the maximum list height is `40vh`.
Rows use the List design and follow `inputProps.size`. The virtualizer measures variable-height
rows automatically. `getOptionHeight`, when provided, sets the row height and its virtualization
estimate; otherwise `ListVirtualizer.estimateItemSize` or the List size determines the estimate.

`onLoadMore` fires when the last option becomes visible, including when the list initially fits
in the viewport. Fetching and end-of-data checks remain the caller's responsibility.

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

| Name              | Type                                                                      | Default | Description                                                                                          |
| :---------------- | :------------------------------------------------------------------------ | :------ | :--------------------------------------------------------------------------------------------------- |
| `options`         | `SuggestOption<T>[]`                                                      |         | Options to display (`value`, `content`, `disabled`, `data?`). Each option must have a unique `value` |
| `onOptionClick`   | `(option: SuggestOption<T>, index?: number) => boolean \| void`           |         | Called when an option is selected. Return `true` to keep popup open                                  |
| `renderOption`    | `(option: SuggestOption<T>, active: boolean, index: number) => ReactNode` |         | Custom option content renderer (defaults to `content`, falling back to `children`)                   |
| `listHeight`      | `number`                                                                  | `300`   | Maximum virtualized list viewport height (px)                                                        |
| `getOptionHeight` | `(option: SuggestOption<T>, index: number) => number`                     |         | Row height function (enables variable-height rows)                                                   |
| `onLoadMore`      | `() => void`                                                              |         | Called when the last option becomes visible (pagination)                                             |

### Input customization

| Name         | Type             | Default | Description                                            |
| :----------- | :--------------- | :------ | :----------------------------------------------------- |
| `inputProps` | `TextInputProps` |         | All `TextInput` props spread into the underlying input |

### Popup configuration

| Name         | Type                        | Default | Description                                                                                                 |
| :----------- | :-------------------------- | :------ | :---------------------------------------------------------------------------------------------------------- |
| `popupWidth` | `'fit' \| 'auto' \| number` | `'fit'` | Popup width: match input, natural, or fixed pixels                                                          |
| `popupProps` | `PopupProps`                |         | All `Popup` props (placement, className, qa, offset, disablePortal, etc.) spread into the `Popup` component |

### Behavior

| Name                  | Type                                                                | Default | Description                                                                                                   |
| :-------------------- | :------------------------------------------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------ |
| `loading`             | `boolean`                                                           | `false` | Show loading spinner in popup                                                                                 |
| `open`                | `boolean`                                                           |         | Control popup open state externally                                                                           |
| `defaultOpen`         | `boolean`                                                           |         | Initial open state (uncontrolled)                                                                             |
| `onOpenChange`        | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` |         | Called when popup open state changes                                                                          |
| `onActiveIndexChange` | `(index: number \| undefined) => void`                              |         | Called when the highlighted option changes, with its index in `options` or `undefined` if none is highlighted |

### Rendering

| Name          | Type                                      | Default | Description                                       |
| :------------ | :---------------------------------------- | :------ | :------------------------------------------------ |
| `renderPopup` | `(props: {list: ReactNode}) => ReactNode` |         | Replace or wrap the default list inside the popup |

### Component wrapper

| Name        | Type            | Default | Description                               |
| :---------- | :-------------- | :------ | :---------------------------------------- |
| `className` | `string`        |         | CSS class for the wrapper element         |
| `style`     | `CSSProperties` |         | Inline styles for the wrapper element     |
| `id`        | `string`        |         | Component ID (auto-generated if omitted)  |
| `qa`        | `string`        |         | `data-qa` attribute for the input wrapper |
