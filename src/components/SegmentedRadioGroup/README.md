<!--GITHUB_BLOCK-->

# SegmentedRadioGroup

<!--/GITHUB_BLOCK-->

```tsx
import {SegmentedRadioGroup} from '@gravity-ui/uikit';
```

The `SegmentedRadioGroup` component is used to create a group of radio buttons where users can select a single option from multiple choices.

### Disabled state

<!--SANDBOX
import {Box, Flex, SegmentedRadioGroup} from '@gravity-ui/uikit';

export default function () {
    return (
        <SegmentedRadioGroup name="group1" defaultValue="Value 1" disabled>
            <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
            <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
            <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
        </SegmentedRadioGroup>
    );
}
SANDBOX-->

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

<!--SANDBOX
import {Flex, SegmentedRadioGroup} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex direction="column" alignItems="center" gap={2}>
            <SegmentedRadioGroup name="group1" defaultValue="Value 1" size="s">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
            <SegmentedRadioGroup name="group2" defaultValue="Value 1" size="m">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
            <SegmentedRadioGroup name="group3" defaultValue="Value 1" size="l">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
            <SegmentedRadioGroup name="group4" defaultValue="Value 1" size="xl">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
        </Flex>
    );
}
SANDBOX-->

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

<!--SANDBOX
import {SegmentedRadioGroup} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width={140} style={{border: '2px dashed gray'}}>
            <Flex direction="column" gap={2}>
                <SegmentedRadioGroup>
                    <SegmentedRadioGroup.Option value="1" content="none" />
                    <SegmentedRadioGroup.Option value="2" content="none********" />
                </SegmentedRadioGroup>
                <SegmentedRadioGroup width="auto">
                    <SegmentedRadioGroup.Option value="1" content="auto" />
                    <SegmentedRadioGroup.Option value="2" content="auto********" />
                </SegmentedRadioGroup>
                <SegmentedRadioGroup width="max">
                    <SegmentedRadioGroup.Option value="1" content="max" />
                    <SegmentedRadioGroup.Option value="2" content="max" />
                </SegmentedRadioGroup>
            </Flex>
        </Box>
    );
}
SANDBOX-->

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

<!--SANDBOX
import type {SegmentedRadioGroupOptionProps} from '@gravity-ui/uikit';
import {SegmentedRadioGroup} from '@gravity-ui/uikit';

const options: SegmentedRadioGroupOptionProps[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

export default function () {
    return (
        <SegmentedRadioGroup name="group1" defaultValue={options[0].value}>
            <SegmentedRadioGroup.Option content={options[0].content} value={options[0].value} />
            <SegmentedRadioGroup.Option content={options[1].content} value={options[1].value} />
            <SegmentedRadioGroup.Option content={options[2].content} value={options[2].value} />
        </SegmentedRadioGroup>
    );
}
SANDBOX-->

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
