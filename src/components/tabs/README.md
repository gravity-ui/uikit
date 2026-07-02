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

### Drag and drop

`TabList` stays drag-and-drop-library agnostic. The `renderTabs` prop is a seam: `TabList` computes
the visible tabs itself (respecting `contentOverflow`, keeping the overflow **More** menu working) and
hands them to you to wrap in the DnD library of your choice. Collapsed tabs are always rendered as plain
`<Tab>` in the overflow menu and are not passed to `renderTabs`.

Example with [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd):

<!--GITHUB_BLOCK-->

```tsx
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';

// `renderTabs` receives only the visible tabs, so drag indexes are relative to them.
// Capture the visible order and reorder by value on drop (works with `contentOverflow="collapse"` too).
const shownValuesRef = React.useRef<string[]>([]);

const onDragEnd = ({destination, draggableId}) => {
  if (!destination) return;
  const toValue = shownValuesRef.current[destination.index];
  setTabs((prev) => reorder(prev, indexByValue(prev, draggableId), indexByValue(prev, toValue)));
};

<DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="tabs" direction="horizontal">
    {(droppableProvided) => (
      <TabList
        ref={droppableProvided.innerRef}
        {...droppableProvided.droppableProps}
        value={value}
        onUpdate={setValue}
        renderTabs={(shown) => {
          shownValuesRef.current = shown.map((tab) => tab.props.value);
          return (
            <>
              {shown.map((tab, index) => (
                <Draggable
                  key={tab.key}
                  draggableId={String(tab.props.value)}
                  index={index}
                  // Tab renders an interactive <button>, and dnd blocks drag start from
                  // interactive elements by default — opt out of that.
                  disableInteractiveElementBlocking
                >
                  {(dragProvided) =>
                    React.cloneElement(tab, {
                      ref: dragProvided.innerRef,
                      ...dragProvided.draggableProps,
                      ...dragProvided.dragHandleProps,
                    })
                  }
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </>
          );
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value}>
            {tab.title}
          </Tab>
        ))}
      </TabList>
    )}
  </Droppable>
</DragDropContext>;
```

<!--/GITHUB_BLOCK-->

Notes:

- `renderTabs` must return exactly one visible tab per received element, preserve each element's `key`,
  and must not add extra DOM around a tab (a `.g-tab` must stay a direct child of the list). In
  development, `TabList` warns if this contract is broken. This means only no-wrapper / render-prop DnD
  libraries are supported (e.g. `@hello-pangea/dnd`, or `@dnd-kit`'s `useSortable` attached to the tab node).
- `@hello-pangea/dnd` renders its placeholder with the same tag as the dragged item (a `<button>`), which
  picks up default button styling. Reset it: `[data-rfd-placeholder-context-id] { appearance: none; border: 0; background: transparent; }`.
- Reordering is pointer-driven; tab keyboard navigation (arrows / Home / End) is preserved. Keyboard-based
  reordering is out of scope and would be owned by the DnD library.

### Properties

`TabList` accepts any valid `div` element props in addition to these:

| Name            | Description                                                                            |                       Type                        | Default  |
| :-------------- | :------------------------------------------------------------------------------------- | :-----------------------------------------------: | :------: |
| children        | List of tabs, probably with some wrappers                                              |                 `React.ReactNode`                 |          |
| value           | Active tab value                                                                       |                     `string`                      |          |
| onUpdate        | Update tab handler                                                                     |             `(value: string) => void`             |          |
| className       | CSS-class of element                                                                   |                     `string`                      |          |
| activateOnFocus | Activate tab on focus. Use this only if panel's content can be displayed immediately   |                     `boolean`                     | `false`  |
| size            | Element size                                                                           |                `"m"` `"l"` `"xl"`                 |  `"m"`   |
| contentOverflow | How to deal with items that do not fit horizontally (wrap, scroll, or a **More** menu) |         `"wrap"` `"scroll"` `"collapse"`          | `"wrap"` |
| moreLabel       | Label for the collapse overflow trigger when the active tab is visible in the list     |                 `React.ReactNode`                 | `"More"` |
| renderTabs      | Wraps the visible tabs, e.g. to enable drag-and-drop with any library (see below)      | `(tabs: React.ReactElement[]) => React.ReactNode` |          |
| qa              | HTML `data-qa` attribute, used in tests                                                |                     `string`                      |          |

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

### Сontent overflow

Used if you need to collapse tabs item.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TabList value="first" contentOverflow="collapse" style={{maxWidth: 320}}>
    <Tab value="first">First Tab</Tab>
    <Tab value="second">Second Tab</Tab>
    <Tab value="third">Third Tab</Tab>
    <Tab value="fourth">Fourth Tab</Tab>
    <Tab value="fifth">Fifth Tab</Tab>
</TabList>
`}
>
    <UIKit.TabList value="first" contentOverflow="collapse" style={{maxWidth: 320}}>
        <UIKit.Tab value="first">First Tab</UIKit.Tab>
        <UIKit.Tab value="second">Second Tab</UIKit.Tab>
        <UIKit.Tab value="third">Third Tab</UIKit.Tab>
        <UIKit.Tab value="fourth">Fourth Tab</UIKit.Tab>
        <UIKit.Tab value="fifth">Fifth Tab</UIKit.Tab>
    </UIKit.TabList>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TabList value="first" contentOverflow="collapse" style={{maxWidth: 320}}>
  <Tab value="first">First Tab</Tab>
  <Tab value="second">Second Tab</Tab>
  <Tab value="third">Third Tab</Tab>
  <Tab value="fourth">Fourth Tab</Tab>
  <Tab value="fifth">Fifth Tab</Tab>
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
