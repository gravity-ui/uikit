<!--GITHUB_BLOCK-->

# Radio

<!--/GITHUB_BLOCK-->

```tsx
import {Radio} from '@gravity-ui/uikit';
```

The `Radio` component allow users to select a single option from a list of choices.

## States

The Radio can be in different states.

- Checked - when the radio is selected.
- Disabled - when the radio is unavailable for interaction.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Radio value="option 1" content="Unchecked" size="l" checked={false}/>
<Radio value="option 2" content="Checked" size="l" checked/>
<Radio value="option 3" content="Disabled" size="l" disabled/>
`}
>
    <UIKit.Radio value="option 1" content="Unchecked" size="l" checked={false}/>
    <UIKit.Radio value="option 2" content="Checked" size="l" checked/>
    <UIKit.Radio value="option 3" content="Disabled" size="l" disabled/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Radio value="option 1" content="Unchecked" size="l" checked={false}/>
<Radio value="option 2" content="Checked" size="l" checked/>
<Radio value="option 3" content="Disabled" size="l" disabled/>
```

<!--/GITHUB_BLOCK-->

## Size

To control the size of the `Radio` use the `size` property. Default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Radio value="option 1" content="M Size" size="m"/>
<Radio value="option 2" content="L Size" size="l"/>
`}
>
    <UIKit.Radio value="option 1" content="M Size" size="m"/>
    <UIKit.Radio value="option 2" content="L Size" size="l"/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Radio value="option 1" content="M Size" size="m"/>
<Radio value="option 2" content="L Size" size="l"/>
```

<!--/GITHUB_BLOCK-->

## Label

You can set a label for a `Radio` component using the `content` property or pass it as children.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<div>
  <Radio content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Radio size="l">
      <span>Content as children</span>
    </Radio>
  </div>
</div>
`}
>
<div>
  <UIKit.Radio content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <UIKit.Radio size="l">
      <span>Content as children</span>
    </UIKit.Radio>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div>
  <Radio content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Radio size="l">
      <span>Content as children</span>
    </Radio>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name           | Description                                                                                                  |                     Type                      | Default |
| :------------- | :----------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-----: |
| children       | The content of the radio (usually a label).                                                                  |                  `ReactNode`                  |         |
| content        | The content of the radio (alternative to children).                                                          |                  `ReactNode`                  |         |
| disabled       | Toggles the `disabled` state of the radio.                                                                   |                   `boolean`                   | `false` |
| checked        | Toggles the checked state of the radio.                                                                      |                   `boolean`                   | `false` |
| defaultChecked | Sets the initial checked state when the component is mounted.                                                |                   `boolean`                   | `false` |
| onUpdate       | Event handler for when the radio's value is updated( also when value changes programmatically through code). |         `(checked: boolean) => void`          |         |
| onChange       | Event handler for when the user interacts with the radio, leading to a change in its value.                  |                  `Function`                   |         |
| onFocus        | Event handler for when the radio input element receives focus.                                               |                  `Function`                   |         |
| onBlur         | Event handler for when the radio input element loses focus.                                                  |                  `Function`                   |         |
| size           | Sets the size of the radio.                                                                                  |                    `m` `l`                    |   `m`   |
| id             | HTML `id` attribute                                                                                          |                   `string`                    |         |
| qa             | HTML `data-qa` attribute, used in tests.                                                                     |                   `string`                    |         |
| style          | HTML `style` attribute                                                                                       |                `CSSProperties`                |         |
| className      | HTML `class` attribute                                                                                       |                   `string`                    |         |
| title          | HTML `title` attribute                                                                                       |                   `string`                    |         |
| name           | HTML `name` attribute for the input element.                                                                 |                   `string`                    |         |
| value          | Control value                                                                                                |                   `string`                    |         |
| indeterminate  | Toggles the indeterminate state of the radio.                                                                |                   `boolean`                   | `false` |
| controlProps   | Additional props for the underlying input element.                                                           | `React.InputHTMLAttributes<HTMLInputElement>` |         |
| controlRef     | Ref to the underlying input element.                                                                         |         `React.Ref<HTMLInputElement>`         |         |
