# Suggest

<!--GITHUB_BLOCK-->

<!--/GITHUB_BLOCK-->

```tsx
import {Suggest} from '@gravity-ui/uikit';
```

The `Suggest` component is a text input with a dropdown list of suggestions. It provides a flexible way to build autocomplete, search, and typeahead experiences.

## Basic Usage

The `getOptions` prop is a function that receives the current input value and returns a list of options. It can be either synchronous or asynchronous (returning a Promise).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
type Item = {value: string; content: string};

const items: Item[] = [
    {value: 'earth', content: 'Earth'},
    {value: 'mars', content: 'Mars'},
    {value: 'jupiter', content: 'Jupiter'},
];

const [value, setValue] = React.useState('');

const getOptions = (searchValue: string) =>
    items.filter((item) =>
        item.content.toLowerCase().includes(searchValue.toLowerCase()),
    );

<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    placeholder="Search planets..."
    renderOption={(item) => <div>{item.content}</div>}
/>;
`}
>
    <UIKit.Suggest
        value=""
        onUpdate={() => {}}
        placeholder="Search planets..."
        getOptions={() => [
            {value: 'earth', content: 'Earth'},
            {value: 'mars', content: 'Mars'},
            {value: 'jupiter', content: 'Jupiter'},
        ]}
        renderOption={(item) => <div>{item.content}</div>}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
type Item = {value: string; content: string};

const items: Item[] = [
  {value: 'earth', content: 'Earth'},
  {value: 'mars', content: 'Mars'},
  {value: 'jupiter', content: 'Jupiter'},
];

const [value, setValue] = React.useState('');

const getOptions = (searchValue: string) =>
  items.filter((item) => item.content.toLowerCase().includes(searchValue.toLowerCase()));

<Suggest<Item>
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  onOptionClick={(item) => setValue(item.content)}
  placeholder="Search planets..."
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

<!--/GITHUB_BLOCK-->

## Async Data Fetching

The `getOptions` prop also accepts an async function. The component handles loading states and race conditions automatically.

```tsx
const getOptions = async (searchValue: string) => {
  const response = await fetch(`/api/search?q=${searchValue}`);
  return response.json();
};

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  onOptionClick={(item) => setValue(item.content)}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

## Debouncing

Add debounce to reduce API calls while the user types:

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  debounce={500} // Wait 500ms after user stops typing
  onOptionClick={(item) => setValue(item.content)}
  renderOption={(item) => <div>{item.content}</div>}
/>
```

## Popup Width Modes

Control the popup width using the `popupWidth` prop:

- `"fit"` (default): Matches the input width
- `number`: Fixed pixel width
- `undefined`: Uses content width

```tsx
// Match input width (default)
<Suggest popupWidth="fit" {...props} />

// Auto width based on content
<Suggest {...props} />

// Fixed width in pixels
<Suggest popupWidth={400} {...props} />
```

## Error Handling

Provide custom error UI when data fetching fails:

```tsx
const ErrorFallback = ({error}) => (
  <div>
    <h4>Error loading data</h4>
    <p>{error?.message}</p>
  </div>
);

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptionsThatMightFail}
  renderFetchOptionsError={ErrorFallback}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

## Empty State

Customize the message when no options match the search:

```tsx
const EmptyFallback = ({value}) => (
  <div>
    <p>No results found for "{value}"</p>
  </div>
);

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderEmptyOptions={EmptyFallback}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

### Default fallbacks

If you do not pass `renderEmptyOptions` or `renderFetchOptionsError`, the component shows a small built-in placeholder with a localized title and description (and a retry button for the error state). **No icon is rendered by default** — the placeholder stays minimal and brand-neutral, and you stay in control of the visual style.

### Adding a small icon to the default fallback

If you just want a quick small-icon look without writing a full render-prop, pass any `IconData` from `@gravity-ui/icons` (or compatible) via the `emptyIcon` / `errorIcon` props:

```tsx
import {CircleExclamation, Magnifier} from '@gravity-ui/icons';
import {Suggest} from '@gravity-ui/uikit';

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  emptyIcon={Magnifier}
  errorIcon={CircleExclamation}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

When `emptyIcon` / `errorIcon` is omitted (the default), the icon row is not rendered at all.

### Opting in to rich illustrations

If you want the larger `@gravity-ui/illustrations` look (for example, the `NotFound` / `InternalError` 400×400 SVGs), install the package separately in your application and pass it through the render-prop API:

```bash
npm install @gravity-ui/illustrations
```

You will also need to import the illustration colour tokens once at the root of your app:

```ts
import '@gravity-ui/illustrations/styles/styles.scss';
```

Then use the render-props:

```tsx
import {InternalError, NotFound} from '@gravity-ui/illustrations';
import {Icon, PlaceholderContainer, Suggest} from '@gravity-ui/uikit';

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderOption={(item) => <div>{item.content}</div>}
  renderEmptyOptions={({value}) => (
    <PlaceholderContainer
      title="Nothing found"
      description={`No matches for "${value}"`}
      direction="row"
      size="s"
      align="center"
      image={<Icon data={NotFound} size={100} />}
    />
  )}
  renderFetchOptionsError={({error}) => (
    <PlaceholderContainer
      title="Error occurred"
      description={error?.message || 'Unable to load data. Please try again'}
      direction="row"
      size="s"
      align="center"
      image={<Icon data={InternalError} size={100} />}
    />
  )}
/>;
```

> `@gravity-ui/illustrations` is **not** a dependency of `@gravity-ui/uikit` (neither in `dependencies` nor `devDependencies`). uikit ships no illustrations of its own so the package stays small and consumers stay in control of their visual style. Install `@gravity-ui/illustrations` in your application only if you want the richer look.

## Custom Popup Content

Use `renderPopup` to add custom content before/after the list:

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderOption={(item) => <div>{item.content}</div>}
  renderPopup={({list, loading, error}) => (
    <div>
      <div style={{padding: 8, borderBottom: '1px solid #ddd'}}>
        {loading ? 'Loading...' : 'Results'}
      </div>
      {list}
      <div style={{padding: 8, borderTop: '1px solid #ddd'}}>Press ↑↓ to navigate</div>
    </div>
  )}
/>
```

## Behavior Flags

### Show Options on Empty Input

By default, the popup is hidden when the input is empty. Use `showOptionsOnEmptyValue` to display options even with an empty input value.

> **Note:** This flag only controls **visibility**. To actually show options on mount or when the input is empty, you also need to **prefetch** the options. The most common approach is to combine it with `getOptionsOnMount` to fetch options when the component mounts:

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions} // Will be called with an empty string on mount
  showOptionsOnEmptyValue // Allow the popup to show with an empty input
  getOptionsOnMount // Prefetch options when component mounts
  renderOption={(item) => <div>{item.content}</div>}
/>
```

Without `getOptionsOnMount`, options will only be fetched after the user starts typing — meaning the popup with the empty value will appear **only after** the user clears the input following an initial fetch.

### Fetch Options on Mount

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={fetchOptions}
  getOptionsOnMount // Fetch options immediately when component mounts
  renderOption={(item) => <div>{item.content}</div>}
/>
```

### Applicable Input Value

Allow users to submit arbitrary values (not just from the list):

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  applicableInputValue
  onInputEnterKeyDown={(value) => {
    console.log('User submitted:', value);
  }}
  renderOption={(item) => <div>{item.content}</div>}
/>
```

## Keyboard Navigation

The component provides full keyboard support:

| Windows / Linux                | macOS              | Action                                                                                |
| ------------------------------ | ------------------ | ------------------------------------------------------------------------------------- |
| `↓` (Arrow Down)               | `↓`                | Move to next option (or reopen popup, see note¹)                                      |
| `↑` (Arrow Up)                 | `↑`                | Move to previous option (or reopen popup, see note¹)                                  |
| `Page Down`                    | `Fn + ↓`           | Move active option down by one page                                                   |
| `Page Up`                      | `Fn + ↑`           | Move active option up by one page                                                     |
| `Home`                         | `Fn + ←`           | Move text cursor to start of input                                                    |
| `End`                          | `Fn + →`           | Move text cursor to end of input                                                      |
| `Shift + Home` / `Shift + End` | `Shift + Fn + ←/→` | Same as `Home`/`End`, but extends the text selection from the current cursor position |
| `Enter`                        | `Enter`            | Select active option and close popup                                                  |
| `Escape`                       | `Escape`           | Close popup (input keeps focus)                                                       |
| `Tab`                          | `Tab`              | Custom handling via `onTabKeyDown`                                                    |

> **Note¹ — Reopening with arrows:** After dismissing the popup with `Escape`, the input retains focus. Pressing `↓` or `↑` will reopen the popup under the same conditions (non-empty `value` or `showOptionsOnEmptyValue` enabled).

## Accessibility

- `role="combobox"` on the input
- `aria-expanded` indicates popup state
- `aria-controls` links input to popup
- `aria-autocomplete` describes the behavior
- `aria-activedescendant` indicates the active option
- `role="listbox"` on the list
- Keyboard navigation fully supported

## Properties

### Options Configuration

| Name                        | Type                                                                   | Default | Description                                                       |
| :-------------------------- | :--------------------------------------------------------------------- | :------ | :---------------------------------------------------------------- |
| `getOptions`                | `(value: string) => ListItemData<T>[] \| Promise<ListItemData<T>[]>`   |         | **Required.** Function to fetch options (sync or async)           |
| `onOptionClick`             | `(item: T, index?: number, fromKeyboard?: boolean) => boolean \| void` |         | Callback when option is clicked. Return `true` to keep popup open |
| `renderOption`              | `(item: ListItemData<T>) => ReactNode`                                 |         | Custom option renderer                                            |
| `virtualized`               | `boolean`                                                              | `false` | Enable virtualization for long lists                              |
| `itemHeight`                | `number \| ((item: ListItemData<T>) => number)`                        |         | Option height (required for virtualization)                       |
| `getOptionHeight`           | `(option: ListItemData<T>, index: number) => number`                   |         | Get height for a specific option                                  |
| `getInitialActiveItemIndex` | `(options: ListItemData<T>[]) => number`                               |         | Determine which option is active after fetching                   |

### TextInput Props

| Name              | Type                        | Default | Description                        |
| :---------------- | :-------------------------- | :------ | :--------------------------------- |
| `value`           | `string`                    | `''`    | Input value (controlled)           |
| `defaultValue`    | `string`                    |         | Default input value (uncontrolled) |
| `onUpdate`        | `(value: string) => void`   |         | Callback when value changes        |
| `placeholder`     | `string`                    |         | Input placeholder                  |
| `size`            | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'`   | Input size                         |
| `pin`             | `TextInputPin`              |         | Input pin style                    |
| `disabled`        | `boolean`                   | `false` | Disable input                      |
| `readOnly`        | `boolean`                   | `false` | Make input read-only               |
| `autoComplete`    | `boolean \| string`         | `false` | Autocomplete attribute             |
| `autoFocus`       | `boolean`                   | `false` | Auto focus on mount                |
| `hasClear`        | `boolean`                   | `false` | Show clear button                  |
| `error`           | `string \| boolean`         |         | Error state                        |
| `errorMessage`    | `ReactNode`                 |         | Error message content              |
| `errorPlacement`  | `'inside' \| 'outside'`     |         | Error message placement            |
| `validationState` | `'invalid'`                 |         | Validation state                   |
| `className`       | `string`                    |         | CSS class name                     |
| `inputClassName`  | `string`                    |         | CSS class name for input element   |
| `id`              | `string`                    |         | Component ID (auto-generated)      |
| `name`            | `string`                    |         | Form input name attribute          |
| `controlProps`    | `InputHTMLAttributes`       |         | Additional input props             |
| `controlRef`      | `Ref<HTMLInputElement>`     |         | Ref to the underlying `<input>`    |
| `startContent`    | `ReactNode`                 |         | Content before input               |
| `endContent`      | `ReactNode`                 |         | Content after input                |

### Popup Configuration

| Name                 | Type                  | Default   | Description                                                                                                                          |
| :------------------- | :-------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `popupClassName`     | `string`              |           | CSS class for popup                                                                                                                  |
| `popupPlacement`     | `PopupPlacement`      |           | Popup placement                                                                                                                      |
| `popupQa`            | `string`              |           | QA attribute for popup                                                                                                               |
| `popupWidth`         | `'fit' \| number`     | `'fit'`   | Popup width mode                                                                                                                     |
| `popupOffset`        | `[number, number]`    |           | Popup offset [x, y]                                                                                                                  |
| `popupDisablePortal` | `boolean`             | `false`   | Disable popup portal                                                                                                                 |
| `syncPopupOnResize`  | `boolean`             | `false`   | Re-measure popup width on `window` resize so it stays in sync with input                                                             |
| `renderStyle`        | `'popup' \| 'inline'` | `'popup'` | Render mode for the options. `'inline'` renders options below the input (no portal) and keeps them visible regardless of focus state |
| `open`               | `boolean`             |           | Control popup open state (controlled mode)                                                                                           |
| `defaultOpen`        | `boolean`             |           | Initial open state (uncontrolled mode)                                                                                               |

### Behavior Control

| Name                      | Type         | Default | Description                                       |
| :------------------------ | :----------- | :------ | :------------------------------------------------ |
| `debounce`                | `number`     | `0`     | Debounce delay (ms) for `getOptions` calls        |
| `loading`                 | `boolean`    |         | Override loading state (for controlled options)   |
| `showOptionsOnEmptyValue` | `boolean`    | `false` | Show options when input is empty                  |
| `getOptionsOnMount`       | `boolean`    | `false` | Fetch options on mount                            |
| `applicableInputValue`    | `boolean`    | `false` | Allow arbitrary input values (not just from list) |
| `showNoOptionsMessage`    | `boolean`    | `true`  | Show "no options" message when list is empty      |
| `onLoadMore`              | `() => void` |         | Callback to load more options (infinite scroll)   |

### Event Handlers

| Name                  | Type                                                                  | Description                                             |
| :-------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------ |
| `onBlur`              | `() => void`                                                          | Callback when input loses focus                         |
| `onOpenChange`        | `(isOpen: boolean) => void`                                           | Callback when popup open state changes                  |
| `onInputKeyDown`      | `(value: string, event: KeyboardEvent) => void`                       | Callback for key press (when no option is active)       |
| `onInputEnterKeyDown` | `(value: string, event: KeyboardEvent) => void`                       | Callback for Enter key with `applicableInputValue=true` |
| `onTabKeyDown`        | `(value, event, extra: {items, activeIndex}) => boolean \| undefined` | Callback for Tab key. Return boolean to control popup   |

### Fallback Content

| Name                      | Type                                                | Description                                                                                                                |
| :------------------------ | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `emptyIcon`               | `IconData`                                          | Optional small icon (from `@gravity-ui/icons` or compatible) shown in the default empty placeholder. Omit to hide the icon |
| `errorIcon`               | `IconData`                                          | Optional small icon (from `@gravity-ui/icons` or compatible) shown in the default error placeholder. Omit to hide the icon |
| `renderEmptyOptions`      | `(props: {value, loading}) => ReactElement \| null` | Custom component for empty state                                                                                           |
| `renderFetchOptionsError` | `(props: {value, error}) => ReactElement \| null`   | Custom component for error state                                                                                           |
| `renderPopup`             | `({list, loading, error}) => ReactNode`             | Custom popup content renderer                                                                                              |

### Custom Layout

| Name       | Type                                                                            | Description                                                                       |
| :--------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------- |
| `children` | `(input: ReactNode, options: ListItemData<T>[], loading: boolean) => ReactNode` | Render-prop for fully custom layouts (replaces the default popup-based rendering) |

#### Inline render mode

Useful when you want options to expand the document flow instead of floating above other content (e.g. inside a card, sidebar, or step-by-step form).

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderStyle="inline"
  renderOption={(item) => <div>{item.content}</div>}
/>
```

#### Render-prop layout (`children`)

For more advanced layouts (e.g. side-by-side input and options panel), provide a `children` render-prop. You receive the rendered input element, the current option list, and the loading flag, and return any JSX you want.

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderOption={(item) => <div>{item.content}</div>}
>
  {(input, options, loading) => (
    <div className="my-layout">
      <div className="my-layout__input">{input}</div>
      <div className="my-layout__results">
        {loading ? <Spinner /> : options.map((opt) => <Card key={opt.value} item={opt} />)}
      </div>
    </div>
  )}
</Suggest>
```

#### Resyncing popup width on resize (`syncPopupOnResize`)

By default the popup measures the input width once when opened. If your layout can resize without the input being re-mounted (e.g. a responsive sidebar), enable `syncPopupOnResize` to keep the popup width matched to the input.

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  syncPopupOnResize
  renderOption={(item) => <div>{item.content}</div>}
/>
```
