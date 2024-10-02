<!--GITHUB_BLOCK-->

# DefinitionList

<!--/GITHUB_BLOCK-->

The component to display definition list with term and definition separated by dots.

## Examples

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<DefinitionList nameMaxWidth={100} contentMaxWidth={100}>
    <DefinitionList.Item name="Node value with copy" copyText="value">
        <strong>value with copy</strong>
    </DefinitionList.Item>
    <DefinitionList.Item name="Empty value with copy" copyText="nothing to copy" />
</DefinitionList>
`}
>
<UIKit.DefinitionList nameMaxWidth={100} contentMaxWidth={100}>
    <UIKit.DefinitionList.Item name="Node value with copy" copyText="value">
        <strong>value with copy</strong>
    </UIKit.DefinitionList.Item>
    <UIKit.DefinitionList.Item name="Empty value with copy" copyText="nothing to copy" />
</UIKit.DefinitionList>;
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<DefinitionList nameMaxWidth={100} contentMaxWidth={100}>
  <DefinitionList.Item name="Node value with copy" copyText="value">
    <strong>value with copy</strong>
  </DefinitionList.Item>
  <DefinitionList.Item name="Empty value with copy" copyText="nothing to copy" />
</DefinitionList>
```

<!--/GITHUB_BLOCK-->

## Properties

| Property           | Type                           | Required | Default      | Description                                                                                         |
| :----------------- | :----------------------------- | :------: | :----------- | :-------------------------------------------------------------------------------------------------- |
| [children](#items) | `React.ReactNode`              |   yes    |              | Items of the list                                                                                   |
| responsive         | `boolean`                      |          |              | If set to `true` list will take 100% width of its parent                                            |
| direction          | `'horizontal'` \| `'vertical'` |          | 'horizontal' | If set to `vertical` content will be located under name and list will take 100% width of its parent |
| nameMaxWidth       | `number`                       |          |              | Maximum width of term                                                                               |
| contentMaxWidth    | `number`                       |          |              | Maximum width of definition                                                                         |
| className          | `string`                       |          |              | Class name for the definition list                                                                  |

### Items

DefinitionList children should be components of type `DefinitionList.Item` with following properties:

| Property | Type                      | Required | Default | Description                                      |
| -------- | ------------------------- | -------- | ------- | ------------------------------------------------ |
| name     | `ReactNode`               | true     |         | Term                                             |
| children | `ReactNode`               |          |         | Definition                                       |
| copyText | `string`                  |          |         | If set, it will be shown icon for copy this text |
| note     | `string \| HelpMarkProps` |          |         | If set, HelpMark will be shown next to term      |

## CSS API

| Name                           | Description                         |
| :----------------------------- | :---------------------------------- |
| `--g-definition-list-item-gap` | Space between definition list items |
