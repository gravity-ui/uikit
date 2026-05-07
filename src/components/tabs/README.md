<!--GITHUB_BLOCK-->

# Tabs components

<!--/GITHUB_BLOCK-->

```tsx
import {TabProvider, TabList, Tab, TabPanel} from '@gravity-ui/uikit';
```

Tabs components is used to explore, organize content and switch between different views.

<!--SANDBOX
import {useState} from 'react';
import {Tab, TabList, TabPanel, TabProvider} from '@gravity-ui/uikit';

export default function () {
    const [activeTab, setActiveTab] = useState('second');

    return (
        <TabProvider value={activeTab} onUpdate={setActiveTab}>
            <TabList>
                <Tab value="first">First Tab</Tab>
                <Tab value="second">Active Tab</Tab>
                <Tab value="third" disabled>
                    Disabled Tab
                </Tab>
            </TabList>
            <div>
                <TabPanel value="first">First Panel</TabPanel>
                <TabPanel value="second">Second Panel</TabPanel>
                <TabPanel value="third">Third Panel</TabPanel>
            </div>
        </TabProvider>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const [activeTab, setActiveTab] = React.useState('second');

return (
  <TabProvider value={activeTab} onUpdate={setActiveTab}>
    <TabList>
      <Tab value="first">First Tab</Tab>
      <Tab value="second">Active Tab</Tab>
      <Tab value="third" disabled>
        Disabled Tab
      </Tab>
    </TabList>
    <div>
      <TabPanel value="first">First Panel</TabPanel>
      <TabPanel value="second">Second Panel</TabPanel>
      <TabPanel value="third">Third Panel</TabPanel>
    </div>
  </TabProvider>
);
```

<!--/GITHUB_BLOCK-->

### Components

- [TabProvider](#tabprovider)
- [TabList](#tablist)
- [Tab](#tab)
- [TabPanel](#tabpanel)

## TabProvider

A component that provides the tab selection functionality

### Properties

| Name     | Description                                              |           Type            | Default |
| :------- | :------------------------------------------------------- | :-----------------------: | :-----: |
| children | List of tabs and tab panels, probably with some wrappers |     `React.ReactNode`     |         |
| value    | Active tab value                                         |         `string`          |         |
| onUpdate | Update tab handler                                       | `(value: string) => void` |         |

## TabList

Component that serves as the container for a set of `tabs`

### Size

To control the size of the `tabs` use the `size` property. Default size is `m`.

<!--SANDBOX
import {Tab, TabList} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <TabList value="second" size="m">
                <Tab value="first">M Size first</Tab>
                <Tab value="second">M Size second</Tab>
            </TabList>
            <TabList value="second" size="l">
                <Tab value="first">L Size first</Tab>
                <Tab value="second">L Size second</Tab>
            </TabList>
            <TabList value="second" size="xl">
                <Tab value="first">XL Size first</Tab>
                <Tab value="second">v Size second</Tab>
            </TabList>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<TabList value="second" size="m">
    <Tab value="first">M Size first</Tab>
    <Tab value="second">M Size second</Tab>
</TabList>
<TabList value="second" size="l">
    <Tab value="first">L Size first</Tab>
    <Tab value="second">L Size second</Tab>
</TabList>
<TabList value="second" size="xl">
    <Tab value="first">XL Size first</Tab>
    <Tab value="second">v Size second</Tab>
</TabList>
```

<!--/GITHUB_BLOCK-->

### Properties

`TabList` accepts any valid `div` element props in addition to these:

| Name            | Description                                                                          |           Type            | Default |
| :-------------- | :----------------------------------------------------------------------------------- | :-----------------------: | :-----: |
| children        | List of tabs, probably with some wrappers                                            |     `React.ReactNode`     |         |
| value           | Active tab value                                                                     |         `string`          |         |
| onUpdate        | Update tab handler                                                                   | `(value: string) => void` |         |
| className       | CSS-class of element                                                                 |         `string`          |         |
| activateOnFocus | Activate tab on focus. Use this only if panel's content can be displayed immediately |         `boolean`         | `false` |
| size            | Element size                                                                         |    `"m"` `"l"` `"xl"`     |  `"m"`  |
| qa              | HTML `data-qa` attribute, used in tests                                              |         `string`          |         |

## Tab

This component is used to render tab items.

### Icon

Used if you need to display an icon for a tab item.

<!--SANDBOX
import {Gear} from '@gravity-ui/icons';
import {Icon, Tab, TabList} from '@gravity-ui/uikit';

export default function () {
    return (
        <TabList value="first">
            <Tab value="first" icon={<Icon size={16} data={Gear} />}>
                Tab with icon
            </Tab>
            <Tab value="second">Tab without icon</Tab>
        </TabList>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<TabList value="first">
  <Tab value="first" icon={<Icon size={16} data={GearIcon} />}>
    Tab with icon
  </Tab>
  <Tab value="second">Tab without icon</Tab>
</TabList>
```

<!--/GITHUB_BLOCK-->

### States

Tab item has disabled flag.

<!--SANDBOX
import {Tab, TabList} from '@gravity-ui/uikit';

export default function () {
    return (
        <TabList value="first">
            <Tab value="first">First Tab</Tab>
            <Tab value="second" disabled>
                Disabled Tab
            </Tab>
        </TabList>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<TabList value="first">
  <Tab value="first">First Tab</Tab>
  <Tab value="second" disabled>
    Disabled Tab
  </Tab>
</TabList>
```

<!--/GITHUB_BLOCK-->

### Counter

Used if you need to display a number for a tabs item.

<!--SANDBOX
import {Tab, TabList} from '@gravity-ui/uikit';

export default function () {
    return (
        <TabList value="first">
            <Tab value="first" counter={13}>
                First Tab
            </Tab>
            <Tab value="second" counter={3}>
                Second Tab
            </Tab>
        </TabList>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<TabList value="first">
  <Tab value="first" counter={13}>
    First Tab
  </Tab>
  <Tab value="second" counter={3}>
    Second Tab
  </Tab>
</TabList>
```

<!--/GITHUB_BLOCK-->

### Label

Used if you need to display a label for a tabs item.

<!--SANDBOX
import {Tab, TabList} from '@gravity-ui/uikit';

export default function () {
    return (
        <TabList value="first">
            <Tab value="first" label={{content: 'Label 1'}}>
                First Tab
            </Tab>
            <Tab value="second" label={{content: 'Label 2'}}>
                Second Tab
            </Tab>
        </TabList>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<TabList value="first">
  <Tab value="first" label={{content: 'Label 1'}}>
    First Tab
  </Tab>
  <Tab value="second" label={{content: 'Label 2'}}>
    Second Tab
  </Tab>
</TabList>
```

<!--/GITHUB_BLOCK-->

### Properties

`Tab` accepts any valid `button` or `a` element props in addition to these:

| Name      | Description                             |        Type         | Default |
| :-------- | --------------------------------------- | :-----------------: | :-----: |
| value     | Tab value                               |      `string`       |         |
| title     | Tab title                               |      `string`       |         |
| icon      | Icon displayed at the start             |  `React.ReactNode`  |         |
| counter   | Content displayed at the end            |  `number` `string`  |         |
| href      | A URL to link to.                       |      `string `      |         |
| label     | `<Label>` displayed at the end          |  `React.ReactNode`  |         |
| disabled  | Inactive state                          |      `boolean`      |         |
| component | Overrides the root component            | `React.ElementType` |         |
| children  | Tab's content                           |  `React.ReactNode`  |         |
| qa        | HTML `data-qa` attribute, used in tests |      `string`       |         |

## TabPanel

Is a container element for content associated with a tab

### Properties

`TabPanel` accepts any valid `div` element props in addition to these:

| Name     | Description                             |       Type        | Default |
| :------- | :-------------------------------------- | :---------------: | :-----: |
| children | Content of panel                        | `React.ReactNode` |         |
| value    | Active tab value                        |     `string`      |         |
| qa       | HTML `data-qa` attribute, used in tests |     `string`      |         |

## CSS API

| Name                             | Description                |
| :------------------------------- | :------------------------- |
| `--g-tabs-border-width`          | Tabs border width          |
| `--g-tabs-item-height`           | Tabs item height           |
| `--g-tabs-item-border-width`     | Tabs item border width     |
| `--g-tabs-item-gap`              | Distance between tabs      |
| `--g-tabs-vertical-item-height`  | Tabs vertical item height  |
| `--g-tabs-vertical-item-padding` | Tabs vertical item padding |
