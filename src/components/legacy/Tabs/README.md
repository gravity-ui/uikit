<!--GITHUB_BLOCK-->

# Tabs

<!--/GITHUB_BLOCK-->

```tsx
import {Tabs} from '@gravity-ui/uikit/legacy';
```

The `Tabs` component is used to explore and organize content, as well as to switch across various views.

## Items

Use the `items` property to render `Tabs` items.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs
    activeTab="first"
    items={[
        {id: 'first', title: 'First Tab'},
        {id: 'second', title: 'Second Tab'},
        {id: 'third', title: 'Third Tab', disabled: true},
    ]}
/>
`}
>
    <UIKit.Tabs
        activeTab="first"
        items={[
            {id: 'first', title: 'First Tab'},
            {id: 'second', title: 'Second Tab'},
            {id: 'third', title: 'Third Tab', disabled: true},
        ]}
    />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const [activeTab, setActiveTab] = React.useState('second');

return (
  <Tabs
    activeTab={activeTab}
    onSelectTab={(tabId) => setActiveTab(tabId)}
    items={[
      {id: 'first', title: 'First Tab'},
      {id: 'second', title: 'Second Tab'},
      {id: 'third', title: 'Disabled Tab', disabled: true},
    ]}
  />
);
```

<!--/GITHUB_BLOCK-->

`Tabs` also has the `Tabs.Item` dedicated component for an item.

<!--GITHUB_BLOCK-->

```tsx
const [activeTab, setActiveTab] = React.useState('second');

return (
  <Tabs activeTab={activeTab}>
    <Tabs.Item id={'first'} title="Third Tab" onClick={(tabId) => setActiveTab(tabId)} />
    <Tabs.Item id={'second'} title="Active Tab" onClick={(tabId) => setActiveTab(tabId)} />
  </Tabs>
);
```

<!--/GITHUB_BLOCK-->

## Size

Use the `size` property to manage the `Tabs` size. The default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Tabs
    activeTab="second"
    size="m"
    items={[
        {id: 'first', title: 'M Size first'},
        {id: 'second', title: 'M Size second'},
    ]}
/>

<Tabs
    activeTab="second"
    size="l"
    items={[
        {id: 'first', title: 'L Size first'},
        {id: 'second', title: 'L Size second'},
    ]}
/>

<Tabs
    activeTab="second"
    size="xl"
    items={[
        {id: 'first', title: 'XL Size first'},
        {id: 'second', title: 'XL Size second'},
    ]}
/>
`}
>
    <UIKit.Tabs
        activeTab="second"
        size="m"
        items={[
            {id: 'first', title: 'M Size first'},
            {id: 'second', title: 'M Size second'},
        ]}
    />
    <UIKit.Tabs
        activeTab="second"
        size="l"
        items={[
            {id: 'first', title: 'L Size first'},
            {id: 'second', title: 'L Size second'},
        ]}
    />
    <UIKit.Tabs
        activeTab="second"
        size="xl"
        items={[
            {id: 'first', title: 'XL Size first'},
            {id: 'second', title: 'XL Size second'},
        ]}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs
    activeTab="second"
    size="m"
    items={[
        {id: 'first', title: 'M Size first'},
        {id: 'second', title: 'M Size second'},
    ]}
/>

<Tabs
    activeTab="second"
    size="l"
    items={[
        {id: 'first', title: 'L Size first'},
        {id: 'second', title: 'L Size second'},
    ]}
/>

<Tabs
    activeTab="second"
    size="xl"
    items={[
        {id: 'first', title: 'XL Size first'},
        {id: 'second', title: 'XL Size second'},
    ]}
/>
```

<!--/GITHUB_BLOCK-->

## Tabs.Item

Used to render a `Tabs` item.

### Icon

Used in case you need to display an icon for a `Tabs` item.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs activeTab="first">
    <Tabs.Item
        icon={<Icon size={16} data={GearIcon} />}
        id="first"
        title="Tab with icon"
        onClick={() => {}}
    />
    <Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
</Tabs>
`}
>
    <UIKit.Tabs activeTab="first">
        <UIKit.Tabs.Item
            icon={
                <UIKit.Icon data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
                )} size={16} />
            }
            id="first"
            title="Tab with icon"
            onClick={() => {}}
        />
        <UIKit.Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
    </UIKit.Tabs>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs activeTab="first">
  <Tabs.Item
    icon={<Icon size={16} data={GearIcon} />}
    id="first"
    title="Tab with icon"
    onClick={() => {}}
  />
  <Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
</Tabs>
```

<!--/GITHUB_BLOCK-->

### States

`Tabs` items have the `disabled` flag.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs activeTab="first">
    <Tabs.Item id="first" title="First Tab" onClick={() => {}} />
    <Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
</Tabs>
`}
>
    <UIKit.Tabs activeTab="first">
        <UIKit.Tabs.Item id="first" title="First Tab" onClick={() => {}} />
        <UIKit.Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
    </UIKit.Tabs>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs activeTab="first">
  <Tabs.Item id="first" title="First Tab" onClick={() => {}} />
  <Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
</Tabs>
```

<!--/GITHUB_BLOCK-->

### Counter

Used in case you need to display a number for a `Tabs` item.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Tabs activeTab="first">
    <Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
    <Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
</Tabs>
`}
>
    <UIKit.Tabs activeTab="first">
        <UIKit.Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
        <UIKit.Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
    </UIKit.Tabs>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Tabs activeTab="first">
  <Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
  <Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
</Tabs>
```

<!--/GITHUB_BLOCK-->

### Tabs.Item properties

| Name     | Description                    |            Type            | Default |
| :------- | ------------------------------ | :------------------------: | :-----: |
| id       | Tab ID                         |          `string`          |         |
| title    | Tab title                      | `string` `React.ReactNode` |         |
| meta     | Tab description                |          `string`          |         |
| hint     | HTML title attribute           |          `string`          |         |
| icon     | Icon displayed at the start    |     `React.ReactNode`      |         |
| counter  | Number displayed at the end    |     `number` `string`      |         |
| label    | `<Label>` displayed at the end |     `React.ReactNode`      |         |
| disabled | Inactive state                 |         `boolean`          |         |

## Properties

| Name             | Description                                                                 |                                    Type                                    |   Default    |
| :--------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------: | :----------: |
| direction        | Tab direction (deprecated)                                                  |                                  `string`                                  | `horizontal` |
| activeTab        | Active tab ID                                                               |                                  `string`                                  |              |
| allowNotSelected | Allows `activeTab` to be undefined                                          |                                 `boolean`                                  |              |
| items            | Tabs array                                                                  |                             `TabsItemProps[]`                              |     `[]`     |
| onSelectTab      | Select tab handler                                                          |                    `onSelectTab?(tabId: string): void`                     |              |
| wrapTo           | Enables wrapping `TabItem` into another component or rendering a custom tab | `wrapTo?(item: TabsItemProps, node: React.ReactNode, index: number): void` |              |
| className        | CSS class of the element                                                    |                                  `string`                                  |              |

## CSS API

| Name                             | Description                  |
| :------------------------------- | :--------------------------- |
| `--g-tabs-border-width`          | `Tabs` border width          |
| `--g-tabs-item-height`           | `Tabs` item height           |
| `--g-tabs-item-border-width`     | `Tabs` item border width     |
| `--g-tabs-item-gap`              | Distance between tabs        |
| `--g-tabs-vertical-item-height`  | `Tabs` vertical item height  |
| `--g-tabs-vertical-item-padding` | `Tabs` vertical item padding |
