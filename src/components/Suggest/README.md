<!--GITHUB_BLOCK-->

# Suggest

<!--/GITHUB_BLOCK-->

```tsx
import {Suggest} from '@gravity-ui/uikit';
```

`Suggest` is a text input with a dropdown list of options. It handles keyboard navigation, ARIA attributes, and popup positioning. Data fetching, debouncing, and pagination are handled externally.

## Basic usage

Pass `items` (sync array) and update them in `onUpdate`:

<!--GITHUB_BLOCK-->

```tsx
type Planet = {value: string; content: string};

const ALL_PLANETS: Planet[] = [
  {value: 'earth', content: 'Earth'},
  {value: 'europa', content: 'Europa'},
  {value: 'jupiter', content: 'Jupiter'},
];

const [value, setValue] = React.useState('');
const items = React.useMemo(
  () => ALL_PLANETS.filter((p) => p.content.toLowerCase().includes(value.toLowerCase())),
  [value],
);

<Suggest<Planet>
  value={value}
  onUpdate={setValue}
  items={items}
  onItemClick={(item) => {
    setValue(item.content);
    return false; // close popup after selection
  }}
  renderItem={(item) => <div>{item.content}</div>}
  inputProps={{placeholder: 'Search…'}}
/>;
```

<!--/GITHUB_BLOCK-->

## Async loading

Use a local `loading` flag together with `items`. A spinner is shown automatically while `loading` is `true`:

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState('');
const [items, setItems] = React.useState<Planet[]>([]);
const [loading, setLoading] = React.useState(false);

const handleUpdate = async (query: string) => {
  setValue(query);
  setLoading(true);
  try {
    const results = await fetchPlanets(query);
    setItems(results);
  } finally {
    setLoading(false);
  }
};

<Suggest<Planet>
  value={value}
  onUpdate={handleUpdate}
  items={items}
  loading={loading}
  onItemClick={(item) => {
    setValue(item.content);
    return false;
  }}
  renderItem={(item) => <div>{item.content}</div>}
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
  items={items}
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

## Show options on empty value

Use `showOptionsOnEmptyValue` to keep the popup open even when the input is empty — useful for showing all available options on focus, or keeping a multi-select popup open after clearing the input:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  items={allItems}
  showOptionsOnEmptyValue
  inputProps={{placeholder: 'Click to browse all options…'}}
/>
```

<!--/GITHUB_BLOCK-->

## Custom popup content

Use `renderPopup` to wrap the list, add a header/footer, or render an empty state:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  items={filteredItems}
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

## Keyboard Navigation

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

| Name                        | Type                                                 | Default | Description                                                                       |
| :-------------------------- | :--------------------------------------------------- | :------ | :-------------------------------------------------------------------------------- |
| `items`                     | `ListItemData<T>[]`                                  |         | Options to display in the popup                                                   |
| `onItemClick`               | `(item: T, index?: number) => boolean \| void`       |         | Called when an option is selected. Return `true` to keep popup open               |
| `renderItem`                | `(item: ListItemData<T>) => ReactNode`               |         | Custom option renderer                                                            |
| `virtualized`               | `boolean`                                            | `false` | Enable virtualization for long lists                                              |
| `listHeight`                | `number`                                             | `300`   | Height (px) of the scrollable list viewport when `virtualized` is enabled         |
| `getOptionHeight`           | `(option: ListItemData<T>, index: number) => number` |         | Row height function (enables variable-height rows)                                |
| `getInitialActiveItemIndex` | `(items: ListItemData<T>[]) => number`               |         | Returns the index of the option that should be active when the list first appears |
| `onLoadMore`                | `() => void`                                         |         | Called when the user scrolls to the bottom (pagination)                           |

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

| Name                      | Type                                                                | Default | Description                                               |
| :------------------------ | :------------------------------------------------------------------ | :------ | :-------------------------------------------------------- |
| `loading`                 | `boolean`                                                           | `false` | Show loading spinner in popup                             |
| `showOptionsOnEmptyValue` | `boolean`                                                           | `false` | Open popup even when input is empty                       |
| `open`                    | `boolean`                                                           |         | Control popup open state externally                       |
| `defaultOpen`             | `boolean`                                                           |         | Initial open state (uncontrolled)                         |
| `onOpenChange`            | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` |         | Called when popup open state changes                      |
| `onActiveIndexChange`     | `(index: number \| undefined) => void`                              |         | Called when the keyboard-highlighted option index changes |

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
