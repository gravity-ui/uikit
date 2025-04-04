<!--GITHUB_BLOCK-->

# Tabs components

<!--/GITHUB_BLOCK-->

```tsx
import {TabProvider, TabList, Tab, TabPanel} from '@gravity-ui/uikit';
```

Tabs components is used to explore, organize content and switch between different views.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<TabProvider value={activeTab} onUpdate={setActiveTab}>
    <TabList>
        <Tab value="first">First Tab</Tab>
        <Tab value="second">Active Tab</Tab>
        <Tab value="third" disabled>Disabled Tab</Tab>
    </TabList>
    <div>
        <TabPanel value="first">First Panel</TabPanel>
        <TabPanel value="second">Second Panel</TabPanel>
        <TabPanel value="third">Third Panel</TabPanel>
    </div>
</TabProvider>
`}
>
    <UIKit.TabProvider value="first">
        <UIKit.TabList>
            <UIKit.Tab value="first">First Tab</UIKit.Tab>
            <UIKit.Tab value="second">Active Tab</UIKit.Tab>
            <UIKit.Tab value="third" disabled>Disabled Tab</UIKit.Tab>
        </UIKit.TabList>
        <div>
            <UIKit.TabPanel value="first">First Panel</UIKit.TabPanel>
            <UIKit.TabPanel value="second">Second Panel</UIKit.TabPanel>
            <UIKit.TabPanel value="third">Third Panel</UIKit.TabPanel>
        </div>
    </UIKit.TabProvider>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.TabList value="second" size="m">
        <UIKit.Tab value="first">M Size first</UIKit.Tab>
        <UIKit.Tab value="second">M Size second</UIKit.Tab>
    </UIKit.TabList>

    <UIKit.TabList value="second" size="l">
        <UIKit.Tab value="first">L Size first</UIKit.Tab>
        <UIKit.Tab value="second">L Size second</UIKit.Tab>
    </UIKit.TabList>

    <UIKit.TabList value="second" size="xl">
        <UIKit.Tab value="first">XL Size first</UIKit.Tab>
        <UIKit.Tab value="second">v Size second</UIKit.Tab>
    </UIKit.TabList>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TabList value="first">
    <Tab value="first" icon={<Icon size={16} data={GearIcon} />}>Tab with icon</Tab>
    <Tab value="second">Tab without icon</Tab>
</TabList>
`}
>
    <UIKit.TabList value="first">
        <UIKit.Tab
            icon={
                <UIKit.Icon data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
                )} size={16} />
            }
            value="first"
        >
            Tab with icon
        </UIKit.Tab>
        <UIKit.Tab value="second">Tab without icon</UIKit.Tab>
    </UIKit.TabList>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TabList value="first">
    <Tab value="first" >First Tab</Tab>
    <Tab value="second" disabled>Disabled Tab</Tab>
</TabList>
`}
>
    <UIKit.TabList value="first">
        <UIKit.Tab value="first">First Tab</UIKit.Tab>
        <UIKit.Tab disabled value="second">Disabled Tab</UIKit.Tab>
    </UIKit.TabList>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TabList value="first">
    <Tab value="first" counter={13}>First Tab</Tab>
    <Tab value="second" counter={3}>Second Tab</Tab>
</TabList>
`}
>
    <UIKit.TabList value="first">
        <UIKit.Tab value="first" counter={13}>First Tab</UIKit.Tab>
        <UIKit.Tab value="second" counter={3}>Second Tab</UIKit.Tab>
    </UIKit.TabList>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TabList value="first">
    <Tab value="first" label={{content: 'Label 1'}}>First Tab</Tab>
    <Tab value="second" label={{content: 'Label 2'}}>Second Tab</Tab>
</TabList>
`}
>
    <UIKit.TabList value="first">
        <UIKit.Tab value="first" label={{content: 'Label 1'}}>First Tab</UIKit.Tab>
        <UIKit.Tab value="second" label={{content: 'Label 2'}}>Second Tab</UIKit.Tab>
    </UIKit.TabList>
</ExampleBlock>
LANDING_BLOCK-->

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
