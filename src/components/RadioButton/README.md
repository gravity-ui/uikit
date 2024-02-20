<!--GITHUB_BLOCK-->

# RadioButton

<!--/GITHUB_BLOCK-->

```tsx
import {RadioButton} from '@gravity-ui/uikit';
```

The `RadioButton` component is used to create a group of radio buttons where users can select a single option from multiple choices.

### Disabled state

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value} options={options} disabled/>
`}
>
  <UIKit.RadioButton name="group1" defaultValue="Value 1" options={
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
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value} options={options} disabled />;
```

<!--/GITHUB_BLOCK-->

### Size

To control the size of the `RadioButton`, use the `size` property. The default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 's'},
  {value: 'Value 2', content: 'm'},
  {value: 'Value 3', content: 'l'},
  {value: 'Value 4', content: 'xl'},
];
<RadioButton name="group1" defaultValue={options[0].value} options={options} size="s"/>
<RadioButton name="group2" defaultValue={options[1].value} options={options} size="m"/>
<RadioButton name="group3" defaultValue={options[2].value} options={options} size="l"/>
<RadioButton name="group4" defaultValue={options[3].value} options={options} size="xl"/>
`}
>
  <div style={{display: 'grid', justifyItems: 'center', gap: 10}}>
    <UIKit.RadioButton name="group1" defaultValue="Value 1" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="s"/>
    <UIKit.RadioButton name="group2" defaultValue="Value 2" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="m"/>
    <UIKit.RadioButton name="group3" defaultValue="Value 3" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="l"/>
    <UIKit.RadioButton name="group4" defaultValue="Value 4" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="xl"/>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
  const options: RadioButtonOption[] = [
    {value: 'Value 1', content: 's'},
    {value: 'Value 2', content: 'm'},
    {value: 'Value 3', content: 'l'},
    {value: 'Value 4', content: 'xl'},
  ];
  <RadioButton name="group1" defaultValue={options[0].value} options={options} size="s"/>
  <RadioButton name="group2" defaultValue={options[1].value} options={options} size="m"/>
  <RadioButton name="group3" defaultValue={options[2].value} options={options} size="l"/>
  <RadioButton name="group4" defaultValue={options[3].value} options={options} size="xl"/>
```

<!--/GITHUB_BLOCK-->

### Width

To control the width of the `RadioButton`, use the `width` property.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<div style={{width: 140, border: '2px dashed gray'}}>
  <div style={{marginBottom: 10}}>
    <RadioButton>
      <RadioButton.Option value="1" content="none" />
      <RadioButton.Option value="2" content="none********" />
    </RadioButton>
  </div>
  <div style={{marginBottom: 10}}>
    <RadioButton width="auto">
      <RadioButton.Option value="1" content="auto" />
      <RadioButton.Option value="2" content="auto********" />
    </RadioButton>
  </div>
  <div>
    <RadioButton width="max">
      <RadioButton.Option value="1" content="max" />
      <RadioButton.Option value="2" content="max" />
    </RadioButton>
  </div>
</div>
`}
>
<div style={{width: 140, border: '2px dashed gray'}}>
 <div style={{marginBottom: 10}}>
    <UIKit.RadioButton>
      <UIKit.RadioButton.Option value="1" content="none" />
      <UIKit.RadioButton.Option value="2" content="none********" />
    </UIKit.RadioButton>
  </div>
  <div style={{marginBottom: 10}}>
    <UIKit.RadioButton width="auto">
      <UIKit.RadioButton.Option value="1" content="auto" />
      <UIKit.RadioButton.Option value="2" content="auto********" />
    </UIKit.RadioButton>
  </div>
  <div>
    <UIKit.RadioButton width="max">
      <UIKit.RadioButton.Option value="1" content="max" />
      <UIKit.RadioButton.Option value="2" content="max" />
    </UIKit.RadioButton>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div style={{width: 140, border: '2px dashed gray'}}>
  <div style={{marginBottom: 10}}>
    <RadioButton>
      <RadioButton.Option value="1" content="none" />
      <RadioButton.Option value="2" content="none********" />
    </RadioButton>
  </div>
  <div style={{marginBottom: 10}}>
    <RadioButton width="auto">
      <RadioButton.Option value="1" content="auto" />
      <RadioButton.Option value="2" content="auto********" />
    </RadioButton>
  </div>
  <div>
    <RadioButton width="max">
      <RadioButton.Option value="1" content="max" />
      <RadioButton.Option value="2" content="max" />
    </RadioButton>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

### Properties

| Name         | Description                                                                                          |           Type            | Default |
| :----------- | :--------------------------------------------------------------------------------------------------- | :-----------------------: | :-----: |
| children     | The content of the radio button.                                                                     |        `ReactNode`        |         |
| disabled     | Toggles the `disabled` state of the radio button.                                                    |         `boolean`         | `false` |
| options      | Options for radio button.                                                                            |   `RadioButtonOption[]`   |         |
| defaultValue | Sets the initial value state when the component is mounted.                                          |         `string`          |         |
| onUpdate     | Fires when the user changes the radio button state. Provides the new value as a callback's argument. | `(value: string) => void` |         |
| onChange     | Fires when the user changes the radio button state. Provides change event as a callback's argument.  |        `Function`         |         |
| onFocus      | Event handler for when the radio input element receives focus.                                       |        `Function`         |         |
| onBlur       | Event handler for when the radio input element loses focus.                                          |        `Function`         |         |
| width        | Sets the width of the radio button.                                                                  |       `auto - max`        |         |
| size         | Sets the size of the radio button.                                                                   |     `s` `m` `l` `xl`      |   `m`   |
| name         | HTML `name` attribute for the input element.                                                         |         `string`          |         |
| qa           | HTML `data-qa` attribute, used in tests.                                                             |         `string`          |         |
| style        | HTML `style` attribute                                                                               |   `React.CSSProperties`   |         |
| className    | HTML `class` attribute                                                                               |         `string`          |         |

## RadioButton.Option

The `RadioButton` component also exports a nested `Option` component. You can use it to create radio button options within the `RadioButton`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value}>
  <RadioButton.Option content={options[0].content} value={options[0].value} />
  <RadioButton.Option content={options[1].content} value={options[1].value} />
  <RadioButton.Option content={options[2].content} value={options[2].value} />
</RadioGroup>
`}
>
<UIKit.RadioButton name="group1" defaultValue="Value 1">
  <UIKit.RadioButton.Option content="Value 1" value="Value 1" />
  <UIKit.RadioButton.Option content="Value 2" value="Value 2" />
  <UIKit.RadioButton.Option content="Value 3" value="Value 3" />
</UIKit.RadioButton>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value}>
  <RadioButton.Option content={options[0].content} value={options[0].value} />
  <RadioButton.Option content={options[1].content} value={options[1].value} />
  <RadioButton.Option content={options[2].content} value={options[2].value} />
</RadioButton>;
```

<!--/GITHUB_BLOCK-->

### Properties

| Name     | Description                                         |    Type     | Default |
| :------- | :-------------------------------------------------- | :---------: | :-----: |
| children | The content of the radio (usually a label).         | `ReactNode` |         |
| content  | The content of the radio (alternative to children). | `ReactNode` |         |
| disabled | Toggles the `disabled` state of the radio.          |  `boolean`  | `false` |
| value    | Control value                                       |  `string`   |         |
