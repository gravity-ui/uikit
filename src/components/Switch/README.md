<!--GITHUB_BLOCK-->

# Switch

<!--/GITHUB_BLOCK-->

```tsx
import {Switch} from '@gravity-ui/uikit';
```

The Switch component is used to toggle between two states, typically representing "on" and "off" or "enabled" and "disabled" states.

## States

The Switch can be in different states.

- Checked - when the switch is in the "On" state.
- Disabled - when the switch is unavailable for interaction.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Switch size="l">Unchecked</Switch>
<Switch size="l" checked>Checked</Switch>
<Switch size="l" disabled>Disabled</Switch>
`}
>
    <UIKit.Switch size="l">Unchecked</UIKit.Switch>
    <UIKit.Switch size="l" checked>Checked</UIKit.Switch>
    <UIKit.Switch size="l" disabled>Disabled</UIKit.Switch>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Switch size="l">Unchecked</Switch>
<Switch size="l" checked>Checked</Switch>
<Switch size="l" disabled>Disabled</Switch>
```

<!--/GITHUB_BLOCK-->

## Size

To control the size of the `Switch` use the `size` property. Default size is `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Switch size="m">M Size</Switch>
<Switch size="l">L Size</Switch>
`}
>
    <UIKit.Switch size="m">M Size</UIKit.Switch>
    <UIKit.Switch size="l">L Size</UIKit.Switch>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Switch size="m">M Size</Switch>
<Switch size="l">L Size</Switch>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name           | Description                                                     |                     Type                      | Default |
| :------------- | :-------------------------------------------------------------- | :-------------------------------------------: | :-----: |
| children       | The content of the switch (usually a label).                    |                  `ReactNode`                  |         |
| content        | The content of the switch (alternative to children).            |                  `ReactNode`                  |         |
| disabled       | Toggles the `disabled` state of the switch.                     |                   `boolean`                   | `false` |
| checked        | Toggles the checked state of the switch.                        |                   `boolean`                   | `false` |
| defaultChecked | Sets the initial checked state when the component is mounted.   |                   `boolean`                   | `false` |
| onUpdate       | Event handler for when the switch's value is updated.           |         `(checked: boolean) => void`          |         |
| onChange       | Event handler for when the switch's value changes.              |                  `Function`                   |         |
| onFocus        | Event handler for when the switch input element receives focus. |                  `Function`                   |         |
| onBlur         | Event handler for when the switch input element loses focus.    |                  `Function`                   |         |
| size           | Sets the size of the switch.                                    |                    `m - l`                    |  `"m"`  |
| id             | HTML `id` attribute                                             |                   `string`                    |         |
| qa             | HTML `data-qa` attribute, used in tests.                        |                   `string`                    |         |
| style          | HTML `style` attribute                                          |                `CSSProperties`                |         |
| className      | HTML `class` attribute                                          |                   `string`                    |         |
| title          | HTML `title` attribute                                          |                   `string`                    |         |
| name           | HTML `name` attribute for the input element.                    |                   `string`                    |         |
| value          | HTML `value` attribute for the input element.                   |                   `string`                    |         |
| indeterminate  | Toggles the indeterminate state of the switch.                  |                   `boolean`                   | `false` |
| controlProps   | Additional props for the underlying input element.              | `React.InputHTMLAttributes<HTMLInputElement>` |         |
| controlRef     | Ref to the underlying input element.                            |         `React.Ref<HTMLInputElement>`         |         |
