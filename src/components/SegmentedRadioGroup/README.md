<!--GITHUB_BLOCK-->

# SegmentedRadioGroup

<!--/GITHUB_BLOCK-->

```tsx
import {SegmentedRadioGroup} from '@gravity-ui/uikit';
```

The `SegmentedRadioGroup` component is used to create a group of radio buttons where users can select a single option from multiple choices.

### Disabled state

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<SegmentedRadioGroup name="group1" defaultValue="Value 1" disabled>
    <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
    <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
    <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
</SegmentedRadioGroup>;
`}
>
  <UIKit.SegmentedRadioGroup name="group1" defaultValue="Value 1" disabled>
    <UIKit.SegmentedRadioGroup.Option value="Value 1">Value 1</UIKit.SegmentedRadioGroup.Option>
    <UIKit.SegmentedRadioGroup.Option value="Value 2">Value 2</UIKit.SegmentedRadioGroup.Option>
    <UIKit.SegmentedRadioGroup.Option value="Value 3">Value 3</UIKit.SegmentedRadioGroup.Option>
  </UIKit.SegmentedRadioGroup>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<SegmentedRadioGroup name="group1" defaultValue="Value 1" disabled>
  <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
  <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
  <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
</SegmentedRadioGroup>
```

<!--/GITHUB_BLOCK-->

### Size

Use the `size` property to manage the `SegmentedRadioGroup` size. The default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options = [
<SegmentedRadioGroup.Option key="Value 1" value="Value 1">Value 1</SegmentedRadioGroup.Option>,
<SegmentedRadioGroup.Option key="Value 2" value="Value 2">Value 2</SegmentedRadioGroup.Option>,
<SegmentedRadioGroup.Option key="Value 3" value="Value 3">Value 3</SegmentedRadioGroup.Option>,
];

<SegmentedRadioGroup name="group1" defaultValue="Value 1" size="s">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group2" defaultValue="Value 1" size="m">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group3" defaultValue="Value 1" size="l">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group4" defaultValue="Value 1" size="xl">{options}</SegmentedRadioGroup>
`}
>
  <div style={{display: 'grid', justifyItems: 'center', gap: 10}}>
    <UIKit.SegmentedRadioGroup name="group1" defaultValue="Value 1" size="s">
      <UIKit.SegmentedRadioGroup.Option value="Value 1">Value 1</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 2">Value 2</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 3">Value 3</UIKit.SegmentedRadioGroup.Option>
    </UIKit.SegmentedRadioGroup>
    <UIKit.SegmentedRadioGroup name="group2" defaultValue="Value 1" size="m">
      <UIKit.SegmentedRadioGroup.Option value="Value 1">Value 1</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 2">Value 2</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 3">Value 3</UIKit.SegmentedRadioGroup.Option>
    </UIKit.SegmentedRadioGroup>
    <UIKit.SegmentedRadioGroup name="group3" defaultValue="Value 1" size="l">
      <UIKit.SegmentedRadioGroup.Option value="Value 1">Value 1</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 2">Value 2</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 3">Value 3</UIKit.SegmentedRadioGroup.Option>
    </UIKit.SegmentedRadioGroup>
    <UIKit.SegmentedRadioGroup name="group4" defaultValue="Value 1" size="xl">
      <UIKit.SegmentedRadioGroup.Option value="Value 1">Value 1</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 2">Value 2</UIKit.SegmentedRadioGroup.Option>
      <UIKit.SegmentedRadioGroup.Option value="Value 3">Value 3</UIKit.SegmentedRadioGroup.Option>
    </UIKit.SegmentedRadioGroup>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options = [
    <SegmentedRadioGroup.Option key="Value 1" value="Value 1">Value 1</SegmentedRadioGroup.Option>,
    <SegmentedRadioGroup.Option key="Value 2" value="Value 2">Value 2</SegmentedRadioGroup.Option>,
    <SegmentedRadioGroup.Option key="Value 3" value="Value 3">Value 3</SegmentedRadioGroup.Option>,
];

<SegmentedRadioGroup name="group1" defaultValue="Value 1" size="s">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group2" defaultValue="Value 1" size="m">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group3" defaultValue="Value 1" size="l">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group4" defaultValue="Value 1" size="xl">{options}</SegmentedRadioGroup>
```

<!--/GITHUB_BLOCK-->

### Width

Use the `width` property to manage the `SegmentedRadioGroup` width:

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<div style={{width: 140, border: '2px dashed gray'}}>
  <div style={{marginBottom: 10}}>
    <SegmentedRadioGroup>
      <SegmentedRadioGroup.Option value="1" content="none" />
      <SegmentedRadioGroup.Option value="2" content="none********" />
    </SegmentedRadioGroup>
  </div>
  <div style={{marginBottom: 10}}>
    <SegmentedRadioGroup width="auto">
      <SegmentedRadioGroup.Option value="1" content="auto" />
      <SegmentedRadioGroup.Option value="2" content="auto********" />
    </SegmentedRadioGroup>
  </div>
  <div>
    <SegmentedRadioGroup width="max">
      <SegmentedRadioGroup.Option value="1" content="max" />
      <SegmentedRadioGroup.Option value="2" content="max" />
    </SegmentedRadioGroup>
  </div>
</div>
`}
>
<div style={{width: 140, border: '2px dashed gray'}}>
 <div style={{marginBottom: 10}}>
    <UIKit.SegmentedRadioGroup>
      <UIKit.SegmentedRadioGroup.Option value="1" content="none" />
      <UIKit.SegmentedRadioGroup.Option value="2" content="none********" />
    </UIKit.SegmentedRadioGroup>
  </div>
  <div style={{marginBottom: 10}}>
    <UIKit.SegmentedRadioGroup width="auto">
      <UIKit.SegmentedRadioGroup.Option value="1" content="auto" />
      <UIKit.SegmentedRadioGroup.Option value="2" content="auto********" />
    </UIKit.SegmentedRadioGroup>
  </div>
  <div>
    <UIKit.SegmentedRadioGroup width="max">
      <UIKit.SegmentedRadioGroup.Option value="1" content="max" />
      <UIKit.SegmentedRadioGroup.Option value="2" content="max" />
    </UIKit.SegmentedRadioGroup>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div style={{width: 140, border: '2px dashed gray'}}>
  <div style={{marginBottom: 10}}>
    <SegmentedRadioGroup>
      <SegmentedRadioGroup.Option value="1" content="none" />
      <SegmentedRadioGroup.Option value="2" content="none********" />
    </SegmentedRadioGroup>
  </div>
  <div style={{marginBottom: 10}}>
    <SegmentedRadioGroup width="auto">
      <SegmentedRadioGroup.Option value="1" content="auto" />
      <SegmentedRadioGroup.Option value="2" content="auto********" />
    </SegmentedRadioGroup>
  </div>
  <div>
    <SegmentedRadioGroup width="max">
      <SegmentedRadioGroup.Option value="1" content="max" />
      <SegmentedRadioGroup.Option value="2" content="max" />
    </SegmentedRadioGroup>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

### Properties

| Name         | Description                                                                                              |                Type                | Default |
| :----------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------: | :-----: |
| children     | Content of the radio button.                                                                             |            `ReactNode`             |         |
| disabled     | Toggles the `disabled` state of the radio button.                                                        |             `boolean`              | `false` |
| options      | Options for radio button.                                                                                | `SegmentedRadioGroupOptionProps[]` |         |
| defaultValue | Sets the initial value state when the component is mounted.                                              |              `string`              |         |
| onUpdate     | Fires when the user changes the radio button state and provides the new value as a callback argument.    |     `(value: string) => void`      |         |
| onChange     | Fires when the user changes the radio button state and provides the change event as a callback argument. |             `Function`             |         |
| onFocus      | Event handler to use when the radio input element receives focus.                                        |             `Function`             |         |
| onBlur       | Event handler to use when the radio input element loses focus.                                           |             `Function`             |         |
| width        | Sets the width of the radio button.                                                                      |            `auto - max`            |         |
| size         | Sets the size of the radio button.                                                                       |          `s` `m` `l` `xl`          |   `m`   |
| name         | `name` HTML attribute for the input element.                                                             |              `string`              |         |
| qa           | `data-qa` HTML attribute, used for testing                                                               |              `string`              |         |
| style        | `style` HTML attribute                                                                                   |       `React.CSSProperties`        |         |
| className    | `class` HTML attribute                                                                                   |              `string`              |         |

## SegmentedRadioGroup.Option

The `SegmentedRadioGroup` component also exports a nested `Option` component. You can use it to create radio button options within a `SegmentedRadioGroup`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: SegmentedRadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<SegmentedRadioGroup name="group1" defaultValue={options[0].value}>
  <SegmentedRadioGroup.Option content={options[0].content} value={options[0].value} />
  <SegmentedRadioGroup.Option content={options[1].content} value={options[1].value} />
  <SegmentedRadioGroup.Option content={options[2].content} value={options[2].value} />
</RadioGroup>
`}
>
<UIKit.SegmentedRadioGroup name="group1" defaultValue="Value 1">
  <UIKit.SegmentedRadioGroup.Option content="Value 1" value="Value 1" />
  <UIKit.SegmentedRadioGroup.Option content="Value 2" value="Value 2" />
  <UIKit.SegmentedRadioGroup.Option content="Value 3" value="Value 3" />
</UIKit.SegmentedRadioGroup>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: SegmentedRadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<SegmentedRadioGroup name="group1" defaultValue={options[0].value}>
  <SegmentedRadioGroup.Option content={options[0].content} value={options[0].value} />
  <SegmentedRadioGroup.Option content={options[1].content} value={options[1].value} />
  <SegmentedRadioGroup.Option content={options[2].content} value={options[2].value} />
</SegmentedRadioGroup>;
```

<!--/GITHUB_BLOCK-->

### Properties

| Name     | Description                                         |    Type     | Default |
| :------- | :-------------------------------------------------- | :---------: | :-----: |
| children | The content of the radio (usually, a label).        | `ReactNode` |         |
| content  | The content of the radio (alternative to children). | `ReactNode` |         |
| disabled | Toggles the `disabled` state of the radio.          |  `boolean`  | `false` |
| value    | Control value                                       |  `string`   |         |
