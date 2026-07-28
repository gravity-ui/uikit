<!--GITHUB_BLOCK-->

# Tabs

<!--/GITHUB_BLOCK-->

```tsx
import {Tabs} from '@gravity-ui/uikit/legacy';
```

The `Tabs` component is used to explore and organize content, as well as to switch across various views.

## Items

Use the `items` property to render `Tabs` items.

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs
            activeTab="first"
            items={[
                {id: 'first', title: 'First Tab'},
                {id: 'second', title: 'Second Tab'},
                {id: 'third', title: 'Third Tab', disabled: true},
            ]}
        />
    );
}
SANDBOX-->

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

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <>
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
        </>
    );
}
SANDBOX-->

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

<!--SANDBOX
import {Gear} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs activeTab="first">
            <Tabs.Item
                icon={<Icon size={16} data={Gear} />}
                id="first"
                title="Tab with icon"
                onClick={() => {}}
            />
            <Tabs.Item id="second" title="Tab without icon" onClick={() => {}} />
        </Tabs>
    );
}
SANDBOX-->

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

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs activeTab="first">
            <Tabs.Item id="first" title="First Tab" onClick={() => {}} />
            <Tabs.Item disabled id="second" title="Disabled Tab" onClick={() => {}} />
        </Tabs>
    );
}
SANDBOX-->

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

<!--SANDBOX
import {Tabs} from '@gravity-ui/uikit/legacy';

export default function () {
    return (
        <Tabs activeTab="first">
            <Tabs.Item id="first" title="First Tab" onClick={() => {}} counter={13} />
            <Tabs.Item id="second" title="Second Tab" onClick={() => {}} counter={3} />
        </Tabs>
    );
}
SANDBOX-->

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
