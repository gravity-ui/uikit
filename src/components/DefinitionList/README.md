## DefinitionList

The component to display definition list with term and definition separated by dots.

### PropTypes

| Property        | Type                           | Required  | Default      | Description                                                                                         |
| :-------------- | :----------------------------- | :-------: | :----------- | :-------------------------------------------------------------------------------------------------- |
| [items](#items) | `DefinitionListItem[]`         |    yes    |              | Items of the list                                                                                   |
| responsive      | `boolean`                      |           |              | If set to `true` list will take 100% width of its parent                                            |
| direction       | `'horizontal'` \| `'vertical'` |           | 'horizontal' | If set to `vertical` content will be located under name and list will take 100% width of its parent |
| nameMaxWidth    | `number`                       |           |              | Maximum width of term                                                                               |
| contentMaxWidth | `number \| 'auto'`             |           | 'auto'       | Maximum width of definition                                                                         |
| className       | `string`                       |           |              | Class name for the list container                                                                   |
| itemClassName   | `string`                       |           |              | Class name for the list item                                                                        |
| copyPosition    | `'inside' \| 'outside'`        | 'outside' |              | If set to `inside`, copy icon will be placed over definition                                        |

#### Items

Configuration for list items

| Property      | Type                      | Required | Default | Description                                                    |
| ------------- | ------------------------- | -------- | ------- | -------------------------------------------------------------- |
| name          | `ReactNode`               | true     |         | Term                                                           |
| multilineName | `boolean`                 |          |         | If set, term will be multiline                                 |
| content       | `ReactNode`               |          |         | Definition                                                     |
| contentTitle  | `string`                  |          |         | Title for definition. If not set, `content` value will be used |
| nameTitle     | `string`                  |          |         | Title for term. If not set, `name` value will be used          |
| copyText      | `string`                  |          |         | If set, it will be shown icon for copy this text               |
| note          | `string \| HelpMarkProps` |          |         | If set, HelpMark will be shown next to term                    |

```jsx
<DefinitionList
  items={[
    {
      name: 'Node value with copy',
      content: <strong>value with copy</strong>,
      copyText: 'value',
    },
    {name: 'Empty value with copy', copyText: 'nothing to copy'},
  ]}
  nameMaxWidth="100"
  contentMaxWidth="100"
/>
```
