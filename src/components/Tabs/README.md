## Tabs

### TabsItem PropTypes

| Property | Type                        | Required | Default | Description                      |
| :------- | :-------------------------- | :------: | :------ | :------------------------------- |
| id       | `String`                    |  `true`  |         | Tab ID                           |
| title    | `String`, `React.ReactNode` |  `true`  |         | Tab title                        |
| meta     | `String`                    |          |         | Tab description                  |
| hint     | `String`                    |          |         | HTML title attribute             |
| icon     | `React.ReactNode`           |          |         | Icon displayed at the left       |
| counter  | `React.ReactNode`           |          |         | Number displayed at the right    |
| label    | `React.ReactNode`           |          |         | `<Label>` displayed at the right |
| disabled | `Boolean`                   |          |         | Inactive state                   |

### Tabs PropTypes

| Property         | Type                                                                      | Required | Default      | Description                                                          |
| :--------------- | :------------------------------------------------------------------------ | :------: | :----------- | :------------------------------------------------------------------- |
| direction        | `String`                                                                  |          | `horizontal` | Tab direction (deprecated)                                           |
| activeTab        | `String`                                                                  |          |              | Active tab ID                                                        |
| allowNotSelected | `Boolean`                                                                 |          |              | Allows `activeTab` to be undefined                                   |
| items            | `TabItemProps[]`                                                          |  `true`  | `[]`         | Tabs array                                                           |
| onSelectTab      | `onSelectTab?(tabId: string): void`                                       |  `true`  |              | Select tab handler                                                   |
| wrapTo           | `wrapTo?(item: TabItemProps, node: React.ReactNode, index: number): void` |          |              | Allows to wrap `TabItem` into another component or render custom tab |
| className        | `String`                                                                  |          |              | CSS-class of element                                                 |

### Examples

```jsx harmony
<Tabs
  items={[
    {
      id: 'firstTab',
    },
    {
      id: 'secondTab',
      title: 'Second Tab',
      meta: 'Second tab meta data',
      hint: 'The Second One',
    },
    {
      id: 'thirdTab',
      title: 'Third Tab',
      meta: 'Third tab meta data',
    },
    {
      id: 'disabledTab',
      title: 'This tab is disabled',
      meta: 'Disabled tab meta data',
      disabled: true,
    },
  ]}
  activeTab={activeTab}
  onSelectTab={(tabId) => setActiveTab(tabId)}
/>
```
