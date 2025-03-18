<!--GITHUB_BLOCK-->

# Checkbox

<!--/GITHUB_BLOCK-->

```tsx
import {Checkbox} from '@gravity-ui/uikit';
```

The `Checkbox` component allows the user to select or deselect a specific value.

## States

A `Checkbox` can have different states:

- Checked: The checkbox is ticked.
- Disabled: The checkbox is unavailable.
- Indeterminate: The checkbox is in an intermediate state between being ticked and unticked.

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

Use the `size` property to manage the `Checkbox` size. The default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Checkbox size="m">M Size</Checkbox>
<Checkbox size="l">L Size</Checkbox>
<Checkbox size="xl">XL Size</Checkbox>
`}
>
    <UIKit.Checkbox size="m">M Size</UIKit.Checkbox>
    <UIKit.Checkbox size="l">L Size</UIKit.Checkbox>
    <UIKit.Checkbox size="xl">XL Size</UIKit.Checkbox>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Checkbox size="m">M Size</Checkbox>
<Checkbox size="l">L Size</Checkbox>
<Checkbox size="xl">XL Size</Checkbox>
```

<!--/GITHUB_BLOCK-->

## Label

You can assign a label to a `Checkbox` using the `content` property or provide it as a child property.

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

| Name           | Description                                                                                           |                     Type                      | Default |
| :------------- | :---------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-----: |
| children       | Checkbox content (usually, a label).                                                                  |                  `ReactNode`                  |         |
| content        | Checkbox content (alternative to children).                                                           |                  `ReactNode`                  |         |
| disabled       | Toggles the `disabled` state of the checkbox.                                                         |                   `boolean`                   | `false` |
| checked        | Toggles the `checked` state of the checkbox.                                                          |                   `boolean`                   | `false` |
| defaultChecked | Sets the initial checked state when the component is mounted.                                         |                   `boolean`                   | `false` |
| onUpdate       | Fires when the user changes the checkbox state and provides the checked value as a callback argument. |         `(checked: boolean) => void`          |         |
| onChange       | Fires when the user changes the checkbox state and provides the change event as a callback argument.  |                  `Function`                   |         |
| onFocus        | Event handler to use when the checkbox input element receives focus.                                  |                  `Function`                   |         |
| onBlur         | Event handler to use when the checkbox input element loses focus.                                     |                  `Function`                   |         |
| size           | Determines the checkbox size.                                                                         |                    `m` `l`                    |   `m`   |
| id             | `id` HTML attribute                                                                                   |                   `string`                    |         |
| qa             | `data-qa` HTML attribute, used for testing                                                            |                   `string`                    |         |
| style          | `style` HTML attribute                                                                                |             `React.CSSProperties`             |         |
| className      | `class` HTML attribute                                                                                |                   `string`                    |         |
| title          | `title` HTML attribute                                                                                |                   `string`                    |         |
| name           | `name` HTML attribute for the input element.                                                          |                   `string`                    |         |
| value          | `value` HTML attribute for the input element.                                                         |                   `string`                    |         |
| indeterminate  | Toggles the `indeterminate` state of the checkbox.                                                    |                   `boolean`                   | `false` |
| controlProps   | Additional propeties for the underlying input element.                                                | `React.InputHTMLAttributes<HTMLInputElement>` |         |
| controlRef     | Ref to the underlying input element.                                                                  |         `React.Ref<HTMLInputElement>`         |         |
