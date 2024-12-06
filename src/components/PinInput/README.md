<!--GITHUB_BLOCK-->

# PinInput

<!--/GITHUB_BLOCK-->

```tsx
import {PinInput} from '@gravity-ui/uikit';
```

`PinInput` is a group of inputs to enter sequence of numeric or alphanumeric values quickly. Its most common use case is entering OTP or confirmation codes received through text messages (SMS), emails, or authenticator apps.

Each input collects one character at a time. When a value is accepted, the focus is moved to the next input, until all fields are filled.

## Type

By default, the inputs only accept numeric values. To allow alphanumeric values, set the `type` property to `"alphanumeric"`:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<PinInput type="alphanumeric" />
`}
>
    <UIKit.PinInput type="alphanumeric" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput type="alphanumeric" />
```

<!--/GITHUB_BLOCK-->

## Size

This component comes in four sizes: `s`, `m`, `l`, and `xl`. The default size is `m`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<PinInput size="s" />
<PinInput size="m" />
<PinInput size="l" />
<PinInput size="xl" />
`}
>
    <UIKit.PinInput size="s" />
    <UIKit.PinInput size="m" />
    <UIKit.PinInput size="l" />
    <UIKit.PinInput size="xl" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput size="s" />
<PinInput size="m" />
<PinInput size="l" />
<PinInput size="xl" />
```

<!--/GITHUB_BLOCK-->

## State

If you do not want the user to interact with the component, set the `disabled` property:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<PinInput disabled />
`}
>
    <UIKit.PinInput disabled />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput disabled />
```

<!--/GITHUB_BLOCK-->

To show an invalid state of the component, use the `validationState` property with the `"invalid"` value. Optionally, you can set an error message text with the `errorMessage` property:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<PinInput validationState="invalid" errorMessage="Incorrect PIN" />
`}
>
    <UIKit.PinInput validationState="invalid" errorMessage="Incorrect PIN" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput validationState="invalid" errorMessage="Incorrect PIN" />
```

<!--/GITHUB_BLOCK-->

## Placeholder

By default, there is no placeholder for inputs. You can set it with the `placeholder` property:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<PinInput placeholder="😎" />
`}
>
    <UIKit.PinInput placeholder="😎" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput placeholder="😎" />
```

<!--/GITHUB_BLOCK-->

## Mask

If you need to mask entered values, use the `mask` property. It is similar to the `<input type="password"/>` behavior.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<PinInput mask />
`}
>
    <UIKit.PinInput mask />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput mask />
```

<!--/GITHUB_BLOCK-->

## OTP

If you want the browser to suggest one-time codes from the outer context (e.g., SMS) set the `otp` property.

## API

- `focus(): void`: Sets focus to the current active input.

## CSS API

| Name                       | Description                                                  |
| :------------------------- | :----------------------------------------------------------- |
| `--g-pin-input-item-width` | Sets the width of each input, unless `responsive` is `true`. |
| `--g-pin-input-item-gap`   | Sets a gap between inputs.                                   |

## Properties

| Name             | Description                                                                                                                                           |                     Type                     |   Default   |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------: | :---------: |
| apiRef           | Ref to the [API](#api).                                                                                                                               |              `React.RefObject`               |             |
| aria-describedby | `aria-describedby` HTML attribute                                                                                                                     |                   `string`                   |             |
| aria-label       | `aria-label` HTML attribute                                                                                                                           |                   `string`                   |             |
| aria-labelledby  | `aria-labelledby` HTML attribute                                                                                                                      |                   `string`                   |             |
| autoFocus        | Enables or disables focusing on the first input on the initial render.                                                                                |                  `boolean`                   |             |
| className        | `class` HTML attribute                                                                                                                                |                   `string`                   |             |
| defaultValue     | Initial value for an uncontrolled component.                                                                                                          |                  `string[]`                  |             |
| disabled         | Toggles the `disabled` state                                                                                                                          |                  `boolean`                   |             |
| errorMessage     | Error text placed under the bottom-start corner that shares space with the note container. Only visible when `validationState` is set to `"invalid"`. |              `React.ReactNode`               |             |
| id               | `id` HTML attribute prefix for inputs. The resulting ID will also contain the `"-${index}"` part.                                                     |                   `string`                   |             |
| length           | Number of input fields.                                                                                                                               |                   `number`                   |     `4`     |
| mask             | When set to `true`, the input values will be masked as the password field.                                                                            |                  `boolean`                   |             |
| name             | `name` HTML attribute for input.                                                                                                                      |                   `string`                   |             |
| form             | The associate form of the underlying input element.                                                                                                   |                   `string`                   |             |
| note             | An element placed under the bottom-end corner that shares space with the error container.                                                             |              `React.ReactNode`               |             |
| onUpdate         | Callback fired when any of inputs changes.                                                                                                            |         `(value: string[]) => void`          |             |
| onUpdateComplete | Callback fired when any of inputs changes and all of them are filled.                                                                                 |         `(value: string[]) => void`          |             |
| otp              | When set to `true`, adds `autocomplete="one-time-code"` to inputs.                                                                                    |                  `boolean`                   |             |
| placeholder      | Placeholder for inputs                                                                                                                                |                   `string`                   |             |
| qa               | `data-qa` HTML attribute used for testing purposes.                                                                                                   |                   `string`                   |             |
| responsive       | Parent's width distributed evenly between inputs.                                                                                                     |                  `boolean`                   |             |
| size             | Input field size.                                                                                                                                     |           `"s"` `"m"` `"l"` `"xl"`           |    `"m"`    |
| style            | `style` HTML attribute                                                                                                                                |            `React.CSSProperties`             |             |
| type             | Determines which input value types are allowed.                                                                                                       |         `"numeric"` `"alphanumeric"`         | `"numeric"` |
| validationState  | Validation state that affects the component appearance.                                                                                               |                 `"invalid"`                  |             |
| value            | Current value for the controlled component.                                                                                                           |                  `string[]`                  |             |
| `onFocus`        | Callback fired when the component receives focus.                                                                                                     | `(event: React.FocusEvent<Element>) => void` |             |
| `onBlur`         | Callback fired when the component loses focus.                                                                                                        | `(event: React.FocusEvent<Element>) => void` |             |
