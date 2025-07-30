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
    <UIKit.DefinitionListItem name="Node value with copy" copyText="value">
        <strong>value with copy</strong>
    </UIKit.DefinitionListItem>
    <UIKit.DefinitionListItem name="Empty value with copy" copyText="nothing to copy" />
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

| Name               | Description                                                                                                                          |              Type              |   Default    |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :----------------------------: | :----------: |
| [children](#items) | Items of the list                                                                                                                    |       `React.ReactNode`        |              |
| nameWidth          | Controls the width behavior of the name column: `auto` - use default 300px width, `max` - grow to fill available space               |      `'auto'` \| `'max'`       |              |
| definitionWidth    | Controls the width behavior of the definition column: `auto` - size naturally based on content, `max` - grow to fill remaining space |      `'auto'` \| `'max'`       |              |
| ~~responsive~~     | **⚠️ Deprecated**: Use `nameWidth="max"` instead. Will be removed in next major version                                              |           `boolean`            |              |
| direction          | If set to `vertical` content will be located under name and list will take 100% width of its parent                                  | `'horizontal'` \| `'vertical'` | 'horizontal' |
| nameMaxWidth       | Maximum width of name                                                                                                                |            `number`            |              |
| contentMaxWidth    | Maximum width of definition                                                                                                          |            `number`            |              |
| className          | Class name for the definition list                                                                                                   |            `string`            |              |

### Width Control

The `nameWidth` and `definitionWidth` props allow fine-grained control over how space is distributed:

- **`auto`**: Uses default sizing behavior
  - For names: 300px fixed width (respects `nameMaxWidth` if provided)
  - For definitions: Natural content size
- **`max`**: Element grows to fill available space

**Common usage patterns:**

```tsx
// Default: Fixed 300px names, definitions take remaining space
<DefinitionList />

// Names grow to fill space (equivalent to deprecated responsive={true})
<DefinitionList nameWidth="max" />

// Definitions fill remaining space (recommended for long content)
<DefinitionList definitionWidth="max" />

// Custom name width with definitions filling space
<DefinitionList nameMaxWidth={200} definitionWidth="max" />
```

### Items

DefinitionList children should be components of type `DefinitionList.Item` with following properties:

| Name     | Description                                      |           Type            | Default |
| -------- | ------------------------------------------------ | :-----------------------: | :-----: |
| name     | Term                                             |        `ReactNode`        |         |
| children | Definition                                       |        `ReactNode`        |         |
| copyText | If set, it will be shown icon for copy this text |         `string`          |         |
| note     | If set, HelpMark will be shown next to term      | `string \| HelpMarkProps` |         |

## CSS API

| Name                           | Description                         |
| :----------------------------- | :---------------------------------- |
| `--g-definition-list-item-gap` | Space between definition list items |
