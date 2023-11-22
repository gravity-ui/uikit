<!--GITHUB_BLOCK-->

# Checkbox

<!--/GITHUB_BLOCK-->

```tsx
import {Checkbox} from '@gravity-ui/uikit';
```

The `Checkbox` component allows the user to select or deselect a specific value.

## States

The Checkbox can be in different states.

- Checked - when the checkbox is selected.
- Disabled - when the checkbox is unavailable for interaction.
- Indeterminate - when the checkbox is in an intermediate state between being selected and unselected.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Checkbox size="l" checked={false}>Unchecked</Checkbox>
<Checkbox size="l" checked>Checked</Checkbox>
<Checkbox size="l" disabled>Disabled</Checkbox>
<Checkbox size="l" indeterminate>Indeterminate</Checkbox>
`}
>
    <UIKit.Checkbox size="l" checked={false}>Unchecked</UIKit.Checkbox>
    <UIKit.Checkbox size="l" checked>Checked</UIKit.Checkbox>
    <UIKit.Checkbox size="l" disabled>Disabled</UIKit.Checkbox>
    <UIKit.Checkbox size="l" indeterminate>Indeterminate</UIKit.Checkbox>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Checkbox size="l" checked={false}>Unchecked</Checkbox>
<Checkbox size="l" checked>Checked</Checkbox>
<Checkbox size="l" disabled>Disabled</Checkbox>
<Checkbox size="l" indeterminate>Indeterminate</Checkbox>
```

<!--/GITHUB_BLOCK-->

## Size

To control the size of the `Checkbox`, use the `size` property. The default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Checkbox size="m">M Size</Checkbox>
<Checkbox size="l">L Size</Checkbox>
`}
>
    <UIKit.Checkbox size="m">M Size</UIKit.Checkbox>
    <UIKit.Checkbox size="l">L Size</UIKit.Checkbox>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Checkbox size="m">M Size</Checkbox>
<Checkbox size="l">L Size</Checkbox>
```

<!--/GITHUB_BLOCK-->

## Label

You can set a label for a `Checkbox` component using the `content` property or pass it as children.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
 <div>
  <Checkbox content="Content" size="l" />
  <div
      style={{
          marginTop: 10,
      }}
  >
      <Checkbox size="l">
          <span>Content as children</span>
      </Checkbox>
  </div>
</div>
`}
>
 <div>
  <UIKit.Checkbox content="Content" size="l" />
  <div
      style={{
          marginTop: 10,
      }}
  >
      <UIKit.Checkbox size="l">
          <span>Content as children</span>
      </UIKit.Checkbox>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div>
  <Checkbox content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Checkbox size="l">
      <span>Content as children</span>
    </Checkbox>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name           | Description                                                                                          |                     Type                      | Default |
| :------------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-----: |
| children       | The content of the checkbox (usually a label).                                                       |                  `ReactNode`                  |         |
| content        | The content of the checkbox (alternative to children).                                               |                  `ReactNode`                  |         |
| disabled       | Toggles the `disabled` state of the checkbox.                                                        |                   `boolean`                   | `false` |
| checked        | Toggles the checked state of the checkbox.                                                           |                   `boolean`                   | `false` |
| defaultChecked | Sets the initial checked state when the component is mounted.                                        |                   `boolean`                   | `false` |
| onUpdate       | Fires when the user changes the checkbox state. Provides the checked value as a callback's argument. |         `(checked: boolean) => void`          |         |
| onChange       | Fires when the user changes the checkbox state. Provides the change event as a callback's argument.  |                  `Function`                   |         |
| onFocus        | Event handler for when the checkbox input element receives focus.                                    |                  `Function`                   |         |
| onBlur         | Event handler for when the checkbox input element loses focus.                                       |                  `Function`                   |         |
| size           | Sets the size of the checkbox.                                                                       |                    `m` `l`                    |   `m`   |
| id             | HTML `id` attribute                                                                                  |                   `string`                    |         |
| qa             | HTML `data-qa` attribute, used in tests.                                                             |                   `string`                    |         |
| style          | HTML `style` attribute                                                                               |             `React.CSSProperties`             |         |
| className      | HTML `class` attribute                                                                               |                   `string`                    |         |
| title          | HTML `title` attribute                                                                               |                   `string`                    |         |
| name           | HTML `name` attribute for the input element.                                                         |                   `string`                    |         |
| value          | HTML `value` attribute for the input element.                                                        |                   `string`                    |         |
| indeterminate  | Toggles the indeterminate state of the checkbox.                                                     |                   `boolean`                   | `false` |
| controlProps   | Additional props for the underlying input element.                                                   | `React.InputHTMLAttributes<HTMLInputElement>` |         |
| controlRef     | Ref to the underlying input element.                                                                 |         `React.Ref<HTMLInputElement>`         |         |
