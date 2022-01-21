## Tabs

Табы

### TabsItem PropTypes

| Property | Type                        | Required | Default | Description                     |
| :------- | :-------------------------- | :------: | :------ | :------------------------------ |
| id       | `String`                    |  `true`  |         | Id таба                         |
| title    | `String`, `React.ReactNode` |  `true`  |         | Текст на в табе                 |
| meta     | `String`                    |          |         | Серый текст под тестом в табе   |
| hint     | `String`                    |          |         | Текст для html атрибута `title` |
| disabled | `Boolean`                   |          |         | Состояние `disabled` у таба     |

### Tabs PropTypes

| Property         | Type                                                                      | Required | Default      | Description                                                                         |
| :--------------- | :------------------------------------------------------------------------ | :------: | :----------- | :---------------------------------------------------------------------------------- |
| direction        | `String`                                                                  |          | `horizontal` | Направление табов                                                                   |
| activeTab        | `String`                                                                  |          |              | Id активного таба                                                                   |
| allowNotSelected | `Boolean`                                                                 |          |              | Позволяет не указывать `activeTab`                                                  |
| items            | `TabItemProps[]`                                                          |  `true`  | `[]`         | Массив табов                                                                        |
| onSelectTab      | `onSelectTab?(tabId: string): void`                                       |  `true`  |              | Хендлер на выбор таба                                                               |
| wrapTo           | `wrapTo?(item: TabItemProps, node: React.ReactNode, index: number): void` |          |              | Функция позволяет обернуть компонент `TabItem` в другой компонент или написать свой |
| className        | `String`                                                                  |          |              | CSS-класс элемента                                                                  |

### Examples

```jsx harmony
<Tabs
  direction="vertical"
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
