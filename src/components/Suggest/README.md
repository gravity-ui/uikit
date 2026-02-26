<!--GITHUB_BLOCK-->

# Suggest

<!--/GITHUB_BLOCK-->

```tsx
import {Suggest} from '@gravity-ui/uikit';
```

`Suggest` is a lightweight building block for “type to filter + popup list” scenarios. It renders a `TextInput` and a `Popup` with a `List`.

## Basic usage

The component is controlled via `filter` + `onFilterUpdate`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
type Item = {value: string; content: string};

const items: Item[] = [
  {value: 'apple', content: 'Apple'},
  {value: 'banana', content: 'Banana'},
  {value: 'carrot', content: 'Carrot'},
];

const [filter, setFilter] = React.useState('');

<Suggest<Item>
  filter={filter}
  onFilterUpdate={setFilter}
  items={items}
  renderItem={(item) => <div>{item.content}</div>}
  onItemClick={(item) => setFilter(item.content)}
  fragmentProps={{
    propsTextInput: {placeholder: 'Search…'},
  }}
/>;
`}
>
  <UIKit.Suggest
    filter={''}
    onFilterUpdate={() => {}}
    items={[
      {value: 'apple', content: 'Apple'},
      {value: 'banana', content: 'Banana'},
      {value: 'carrot', content: 'Carrot'},
    ]}
    renderItem={(item) => <div>{item.content}</div>}
    fragmentProps={{
      propsTextInput: {placeholder: 'Search…'},
    }}
  />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
type Item = {value: string; content: string};

const items: Item[] = [
  {value: 'apple', content: 'Apple'},
  {value: 'banana', content: 'Banana'},
  {value: 'carrot', content: 'Carrot'},
];

const [filter, setFilter] = React.useState('');

<Suggest<Item>
  filter={filter}
  onFilterUpdate={setFilter}
  items={items}
  renderItem={(item) => <div>{item.content}</div>}
  onItemClick={(item) => setFilter(item.content)}
  fragmentProps={{propsTextInput: {placeholder: 'Search…'}}}
/>;
```

<!--/GITHUB_BLOCK-->

## Popup width

Use `popupWidth` to control the popup width:

- `'fit'`: match the input wrapper width
- `'auto'`: use `width: auto`
- `number`: width in pixels (applied only for finite positive numbers)

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Suggest
  filter=""
  onFilterUpdate={() => {}}
  items={[
    {value: 'apple', content: 'Apple'},
    {value: 'banana', content: 'Banana'},
    {value: 'carrot', content: 'Carrot'},
  ]}
  popupWidth="fit"
  renderItem={(item) => <div>{item.content}</div>}
  fragmentProps={{propsTextInput: {placeholder: 'popupWidth="fit"'}}}
/>
`}
>
  <UIKit.Suggest
    filter=""
    onFilterUpdate={() => {}}
    items={[
      {value: 'apple', content: 'Apple'},
      {value: 'banana', content: 'Banana'},
      {value: 'carrot', content: 'Carrot'},
    ]}
    popupWidth="fit"
    renderItem={(item) => <div>{item.content}</div>}
    fragmentProps={{propsTextInput: {placeholder: 'popupWidth="fit"'}}}
  />
</ExampleBlock>

LANDING_BLOCK-->

## Customizing input / popup / list

Use `fragmentProps` to pass props down to the underlying components:

- `fragmentProps.propsTextInput`: forwarded to `TextInput`
- `fragmentProps.popupProps`: forwarded to `Popup`
- `fragmentProps.listProps`: forwarded to `List`

## Custom popup content

Use `renderPopupContent` to render custom content around the list (before/after) while still reusing the default list node.

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  filter={filter}
  onFilterUpdate={setFilter}
  items={items}
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

| Name               | Description                                         | Type                                             | Default |
| :----------------- | :-------------------------------------------------- | :----------------------------------------------- | :------ |
| filter             | Controlled input value                              | `string`                                         |         |
| onFilterUpdate     | Fires when the input value changes                  | `(filter: string) => void`                       |         |
| items              | Items rendered by `List`                            | `Array<ListItemData<T>>`                         |         |
| onItemClick        | Fires when list item is clicked                     | `ListProps<T>['onItemClick']`                    |         |
| popupWidth         | Popup width mode                                    | `'fit' \| 'auto' \| number`                      |         |
| renderItem         | Item renderer                                       | `ListProps<T>['renderItem']`                     |         |
| renderPopupContent | Custom popup content renderer (wraps the list node) | `({list}: {list: React.ReactNode}) => ReactNode` |         |
| fragmentProps      | Props for underlying `TextInput` / `Popup` / `List` | `FragmentProps<T>`                               |         |
