<!--GITHUB_BLOCK-->

# Switch

<!--/GITHUB_BLOCK-->

```tsx
import {Switch} from '@gravity-ui/uikit';
```

The `Switch` component is used to toggle between two states: typically, between **on** and **off**, or **enabled** and **disabled**.

## States

A `Switch` can have different states:

- Checked: When the switch has the **On** state.
- Disabled: When the switch is unavailable.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Switch size="l" checked={false}>Unchecked</Switch>
<Switch size="l" checked>Checked</Switch>
<Switch size="l" disabled>Disabled</Switch>
`}
>
    <UIKit.Switch size="l" checked={false}>Unchecked</UIKit.Switch>
    <UIKit.Switch size="l" checked>Checked</UIKit.Switch>
    <UIKit.Switch size="l" disabled>Disabled</UIKit.Switch>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Switch size="l" checked={false}>Unchecked</Switch>
<Switch size="l" checked>Checked</Switch>
<Switch size="l" disabled>Disabled</Switch>
```

<!--/GITHUB_BLOCK-->

## Size

Use the `size` property to manage the `Switch` size. The default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Switch size="s">S Size</Switch>
<Switch size="m">M Size</Switch>
<Switch size="l">L Size</Switch>
`}
>
    <UIKit.Switch size="s">S Size</UIKit.Switch>
    <UIKit.Switch size="m">M Size</UIKit.Switch>
    <UIKit.Switch size="l">L Size</UIKit.Switch>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Switch size="s">S Size</Switch>
<Switch size="m">M Size</Switch>
<Switch size="l">L Size</Switch>
```

<!--/GITHUB_BLOCK-->

## Label

You can assign a label to a `Switch` using the `content` property or provide it as a child property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<div>
  <Switch content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Switch size="l">
      <span>Content as children</span>
    </Switch>
  </div>
</div>
`}
>
<div>
  <UIKit.Switch content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <UIKit.Switch size="l">
      <span>Content as children</span>
    </UIKit.Switch>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div>
  <Switch content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Switch size="l">
      <span>Content as children</span>
    </Switch>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name           | Description                                                                                              |                     Type                      | Default |
| :------------- | :------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-----: |
| children       | The content of the switch (usually, a label)                                                             |                  `ReactNode`                  |         |
| content        | The content of the switch (alternative to children)                                                      |                  `ReactNode`                  |         |
| disabled       | Toggles the `disabled` state of the switch                                                               |                   `boolean`                   | `false` |
| loading        | Toggles the `loading` state of the switch                                                                |                   `boolean`                   | `false` |
| checked        | Toggles the `checked` state of the switch                                                                |                   `boolean`                   | `false` |
| defaultChecked | Sets the initial checked state when the component is mounted                                             |                   `boolean`                   | `false` |
| onUpdate       | Fires when the switch state is changed by the user and provides the checked value as a callback argument |         `(checked: boolean) => void`          |         |
| onChange       | Fires when the switch state is changed by the user and provides the change event as a callback argument  |                  `Function`                   |         |
| onFocus        | Event handler to use when the switch input element receives focus                                        |                  `Function`                   |         |
| onBlur         | Event handler to use when the switch input element loses focus                                           |                  `Function`                   |         |
| size           | Sets the size of the switch                                                                              |                  `s` `m` `l`                  |   `m`   |
| id             | `id` HTML attribute                                                                                      |                   `string`                    |         |
| qa             | `data-qa` HTML attribute, used for testing                                                               |                   `string`                    |         |
| style          | `style` HTML attribute                                                                                   |             `React.CSSProperties`             |         |
| className      | `class` HTML attribute                                                                                   |                   `string`                    |         |
| title          | `title` HTML attribute                                                                                   |                   `string`                    |         |
| name           | `name` HTML attribute for the input element                                                              |                   `string`                    |         |
| value          | `value` HTML attribute for the input element                                                             |                   `string`                    |         |
| indeterminate  | Toggles the indeterminate state of the switch                                                            |                   `boolean`                   | `false` |
| controlProps   | Additional propeties for the underlying input element                                                    | `React.InputHTMLAttributes<HTMLInputElement>` |         |
| controlRef     | Ref to the underlying input element                                                                      |         `React.Ref<HTMLInputElement>`         |         |
