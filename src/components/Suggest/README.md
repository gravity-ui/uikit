<!--GITHUB_BLOCK-->

# Suggest

<!--/GITHUB_BLOCK-->

```tsx
import {Suggest} from '@gravity-ui/uikit';
```

`Suggest` is a lightweight building block for “type to filter + popup list” scenarios. It renders a `TextInput` and a
`Popup` with a `List`.

## Basic usage

`Suggest` supports all `TextInput` props (like `value`, `onUpdate`, `placeholder`, `size`, `pin`, etc.) and adds a popup
with a list of items.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
type Item = {value: string; content: string};

const items: Item[] = [
    {value: 'earth', content: 'Earth'},
    {value: 'europa', content: 'Europa'},
    {value: 'jupiter', content: 'Jupiter'},
];

const [value, setValue] = React.useState('');

<Suggest<Item>
    items={items}
    value={value}
    onUpdate={setValue}
    placeholder="Search…"
    onItemClick={(item) => setValue(item.content)}
    renderItem={(item) => <div>{item.content}</div>}
/>;
`}
>
    <UIKit.Suggest
        value=""
        onUpdate={() => {}}
        placeholder="Search…"
        items={[
            {value: 'earth', content: 'Earth'},
            {value: 'europa', content: 'Europa'},
            {value: 'jupiter', content: 'Jupiter'},
        ]}
        renderItem={(item) => <div>{item.content}</div>}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
type Item = {value: string; content: string};

const items: Item[] = [
  {value: 'earth', content: 'Earth'},
  {value: 'europa', content: 'Europa'},
  {value: 'jupiter', content: 'Jupiter'},
];

const [value, setValue] = React.useState('');

<Suggest<Item>
  items={items}
  value={value}
  onUpdate={setValue}
  placeholder="Search…"
  onItemClick={(item) => setValue(item.content)}
  renderItem={(item) => <div>{item.content}</div>}
/>;
```

<!--/GITHUB_BLOCK-->

## Popup width

Use `popupWidth` to control the popup width:

- `number`: width in pixels (applied only for finite positive numbers)
- `'fit'`: match the input wrapper width
- `'auto'`: use `width: auto`

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Suggest
  items={[
    {value: 'earth', content: 'Earth'},
    {value: 'europa', content: 'Europa'},
    {value: 'jupiter', content: 'Jupiter'},
  ]}
  value=""
  onUpdate={() => {}}
  popupWidth="fit"
  placeholder='Search...'
  renderItem={(item) => <div>{item.content}</div>}
/>
`}
>
  <UIKit.Suggest
    items={[
        {value: 'earth', content: 'Earth'},
        {value: 'europa', content: 'Europa'},
        {value: 'jupiter', content: 'Jupiter'},
    ]}
    value=""
    onUpdate={() => {}}
    popupWidth="fit"
    placeholder='Search...'
    renderItem={(item) => <div>{item.content}</div>}
  />
</ExampleBlock>

LANDING_BLOCK-->

## Customizing input / popup / list

You can customize:

- **`TextInput`**: by passing regular `TextInput` props (`className`, `disabled`, `hasClear`, `controlProps`, etc.)
- **`Popup`**: with `popupClassName`, `popupPlacement`, `popupQa`
- **`List`**: with `renderItem`, `items`, `onItemClick`

## Custom popup content

Use `renderPopupContent` to render custom content around the list (before/after) while still reusing the default list
node.

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  items={items}
  value={value}
  onUpdate={setValue}
  onItemClick={(item) => setValue(item.content)}
  renderItem={(item) => <div>{item.content}</div>}
  renderPopupContent={({list}) => {
    return (
      <div style={{padding: 8}}>
        <div style={{marginBottom: 8}}>Before list</div>
        {list}
        <div style={{marginTop: 8}}>After list</div>
      </div>
    );
  }}
/>
```

<!--/GITHUB_BLOCK-->

## Properties

`Suggest` supports all `TextInput` props. The table below lists the props specific to `Suggest`:

| Name               | Description                                         | Default | Type                                                   |
| :----------------- | :-------------------------------------------------- | :------ | :----------------------------------------------------- |
| items              | Items rendered by `List`                            |         | `Array<ListItemData<T>>`                               |
| onItemClick        | Fires when list item is clicked                     |         | `ListProps<T>['onItemClick']`                          |
| popupClassName     | Popup `className`                                   |         | `PopupProps['className']`                              |
| popupPlacement     | Popup placement                                     |         | `PopupProps['placement']`                              |
| popupQa            | Test id attribute (`data-qa`) for popup content     |         | `PopupProps['qa']`                                     |
| popupWidth         | Popup width mode                                    | `'fit'` | `'fit' \| 'auto' \| number`                            |
| renderItem         | Item renderer                                       |         | `ListProps<T>['renderItem']`                           |
| renderPopupContent | Custom popup content renderer (wraps the list node) |         | `({list}: {list: React.ReactNode}) => React.ReactNode` |
