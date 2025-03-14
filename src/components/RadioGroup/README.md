<!--GITHUB_BLOCK-->

# RadioGroup

<!--/GITHUB_BLOCK-->

```tsx
import {RadioGroup} from '@gravity-ui/uikit';
```

The `RadioGroup` component is used to create a group where users can select a single option from multiple choices.

### Disabled state

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group2" defaultValue={options[0].value} options={options} disabled/>
`}
>
  <UIKit.RadioGroup name="group2" defaultValue="Value 1" options={
    [
      {value: 'Value 1', content: 'Value 1'},
      {value: 'Value 2', content: 'Value 2'},
      {value: 'Value 3', content: 'Value 3'},
    ]
  } disabled/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group2" defaultValue={options[0].value} options={options} disabled />;
```

<!--/GITHUB_BLOCK-->

### Size

Use the `size` property to manage the `RadioGroup` size. The default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group1" defaultValue={options[0].value} options={options} size="m"/>
<RadioGroup name="group2" defaultValue={options[0].value} options={options} size="l"/>
<RadioGroup name="group3" defaultValue={options[0].value} options={options} size="xl"/>
`}
>
  <UIKit.RadioGroup name="group1" defaultValue="Value 1" options={
    [
      {value: 'Value 1', content: 'Value 1'},
      {value: 'Value 2', content: 'Value 2'},
      {value: 'Value 3', content: 'Value 3'},
    ]
  } size="m"/>
  <UIKit.RadioGroup name="group2" defaultValue="Value 1" options={
    [
      {value: 'Value 1', content: 'Value 1'},
      {value: 'Value 2', content: 'Value 2'},
      {value: 'Value 3', content: 'Value 3'},
    ]
  } size="l"/>
  <UIKit.RadioGroup name="group3" defaultValue="Value 1" options={
    [
      {value: 'Value 1', content: 'Value 1'},
      {value: 'Value 2', content: 'Value 2'},
      {value: 'Value 3', content: 'Value 3'},
    ]
  } size="xl"/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
  const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
  ];
  <RadioGroup name="group1" defaultValue={options[0].value} options={options} size="m"/>
  <RadioGroup name="group2" defaultValue={options[0].value} options={options} size="l"/>
  <RadioGroup name="group3" defaultValue={options[0].value} options={options} size="xl"/>
```

<!--/GITHUB_BLOCK-->

### Direction

Use the `direction` property to manage the `RadioGroup` direction. The default direction is `horizontal`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group1" defaultValue={options[0].value} options={options} direction="horizontal"/>
<RadioGroup name="group2" defaultValue={options[0].value} options={options} direction="vertical"/>
`}
>
  <UIKit.RadioGroup name="group1" defaultValue="Value 1" options={
    [
      {value: 'Value 1', content: 'Value 1'},
      {value: 'Value 2', content: 'Value 2'},
      {value: 'Value 3', content: 'Value 3'},
    ]
  } direction="horizontal"/>
  <UIKit.RadioGroup name="group2" defaultValue="Value 1" options={
    [
      {value: 'Value 1', content: 'Value 1'},
      {value: 'Value 2', content: 'Value 2'},
      {value: 'Value 3', content: 'Value 3'},
    ]
  } direction="vertical"/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
  const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
  ];
  <RadioGroup name="group1" defaultValue={options[0].value} options={options} direction="horizontal"/>
  <RadioGroup name="group2" defaultValue={options[0].value} options={options} direction="vertical"/>
```

<!--/GITHUB_BLOCK-->

### Properties

| Name            | Description                                                                                       |           Type            |    Default     |
| :-------------- | :------------------------------------------------------------------------------------------------ | :-----------------------: | :------------: |
| children        | The content of the radio group.                                                                   |        `ReactNode`        |                |
| disabled        | Toggles the `disabled` state of the radio group.                                                  |         `boolean`         |    `false`     |
| options         | Options for radio group.                                                                          |   `RadioGroupOption[]`    |                |
| optionClassName | `class` HTML attribute for the radio children.                                                    |         `string`          |                |
| direction       | Determines the direction of the radio group.                                                      |  `horizontal - vertical`  | `"horizontal"` |
| defaultValue    | Sets the initial value state when the component is mounted.                                       |         `string`          |                |
| onUpdate        | Fires when the user changes the radio state and provides the new value as a callback argument.    | `(value: string) => void` |                |
| onChange        | Fires when the user changes the radio state and provides the change event as a callback argument. |        `Function`         |                |
| size            | Determines the size of the radio group.                                                           |          `m` `l`          |      `m`       |
| qa              | `data-qa` HTML attribute, used for testing                                                        |         `string`          |                |
| style           | `style` HTML attribute                                                                            |   `React.CSSProperties`   |                |
| className       | `class` HTML attribute                                                                            |         `string`          |                |

## RadioGroup.Option

The `RadioGroup` component also exports a nested `Option` component equivalent to `Radio`, which can be used to create radio options within the `RadioGroup`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group1" defaultValue={options[0].value}>
  <RadioGroup.Option content={options[0].content} value={options[0].value} />
  <RadioGroup.Option content={options[1].content} value={options[1].value} />
  <RadioGroup.Option content={options[2].content} value={options[2].value} />
</RadioGroup>
`}
>
<UIKit.RadioGroup name="group1" defaultValue="Value 1">
  <UIKit.RadioGroup.Option content="Value 1" value="Value 1" />
  <UIKit.RadioGroup.Option content="Value 2" value="Value 2" />
  <UIKit.RadioGroup.Option content="Value 3" value="Value 3" />
</UIKit.RadioGroup>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group1" defaultValue={options[0].value}>
  <RadioGroup.Option content={options[0].content} value={options[0].value} />
  <RadioGroup.Option content={options[1].content} value={options[1].value} />
  <RadioGroup.Option content={options[2].content} value={options[2].value} />
</RadioGroup>;
```

<!--/GITHUB_BLOCK-->

### Properties

| Name     | Description                                         |    Type     | Default |
| :------- | :-------------------------------------------------- | :---------: | :-----: |
| children | The content of the radio (usually, a label).        | `ReactNode` |         |
| content  | The content of the radio (alternative to children). | `ReactNode` |         |
| disabled | Toggles the `disabled` state of the radio.          |  `boolean`  | `false` |
| value    | Control value                                       |  `string`   |         |
