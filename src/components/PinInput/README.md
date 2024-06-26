<!--GITHUB_BLOCK-->

# PinInput

<!--/GITHUB_BLOCK-->

```tsx
import {PinInput} from '@gravity-ui/uikit';
```

`PinInput` is a group of inputs to enter sequence of numeric or alphanumeric values quickly. The most common use case of the component
is entering OTP or confirmation codes received via SMS, email or authenticator app.

Each input collects one character at time. When value is accepted, focus is moved to the next input, until all fields are filled.

## Type

By default, inputs accept only numeric values. To allow alphanumeric values set the `type` prop to `"alphanumeric"`:

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

The component comes in four sizes: `s`, `m`, `l`, `xl`. The default is `m`.

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

If you don't want the user to interact with the component set the `disabled` prop:

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

To show an invalid state of the component use the `validationState` prop with the `"invalid"` value. Optionally set an error text
with the `errorMessage` prop:

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

By default, there is no placeholder on inputs. You can set it with the `placeholder` prop:

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

If you need to mask entered values use the `mask` prop. It's similar to `<input type="password"/>` behaviour.

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

If you want the browser to suggest "one time codes" from the outer context (e.g. SMS) set the `otp` prop.

## API

- `focus(): void` - Set focus to the current active input.

## CSS API

| Name                       | Description                                            |
| :------------------------- | :----------------------------------------------------- |
| `--g-pin-input-item-width` | Set width of each input, unless `responsive` is `true` |
| `--g-pin-input-item-gap`   | Set gap between inputs                                 |

## Properties

| Name             | Description                                                                                                                                          |             Type             |   Default   |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------: | :---------: |
| apiRef           | Ref to the [API](#api)                                                                                                                               |      `React.RefObject`       |             |
| aria-describedby | HTML `aria-describedby` attribute                                                                                                                    |           `string`           |             |
| aria-label       | HTML `aria-label` attribute                                                                                                                          |           `string`           |             |
| aria-labelledby  | HTML `aria-labelledby` attribute                                                                                                                     |           `string`           |             |
| autoFocus        | Whether or not to focus the first input on initial render                                                                                            |          `boolean`           |             |
| className        | HTML `class` attribute                                                                                                                               |           `string`           |             |
| defaultValue     | Initial value for uncontrolled component                                                                                                             |          `string[]`          |             |
| disabled         | Toggles `disabled` state                                                                                                                             |          `boolean`           |             |
| errorMessage     | Error text placed under the bottom-start corner that shares space with the note container. Only visible when `validationState` is set to `"invalid"` |      `React.ReactNode`       |             |
| id               | HTML `id` attribute prefix for inputs. Resulting id will also contain `"-${index}"` part                                                             |           `string`           |             |
| length           | Number of input fields                                                                                                                               |           `number`           |     `4`     |
| mask             | When set to `true` mask input values like password field                                                                                             |          `boolean`           |             |
| name             | HTML `name` attribute for inputs                                                                                                                     |           `string`           |             |
| note             | An element placed under the bottom-end corner that shares space with the error container                                                             |      `React.ReactNode`       |             |
| onUpdate         | Callback fired when any of inputs change                                                                                                             | `(value: string[]) => void`  |             |
| onUpdateComplete | Callback fired when any of inputs change and all of them are filled                                                                                  | `(value: string[]) => void`  |             |
| otp              | When set to `true` adds `autocomplete="one-time-code"` to inputs                                                                                     |          `boolean`           |             |
| placeholder      | Placeholder for inputs                                                                                                                               |           `string`           |             |
| qa               | HTML `data-qa` attribute, for test purposes                                                                                                          |           `string`           |             |
| responsive       | Parent's width distributed evenly between inputs                                                                                                     |          `boolean`           |             |
| size             | Size of input fields                                                                                                                                 |   `"s"` `"m"` `"l"` `"xl"`   |    `"m"`    |
| style            | HTML `style` attribute                                                                                                                               |    `React.CSSProperties`     |             |
| type             | What type of input value is allowed                                                                                                                  | `"numeric"` `"alphanumeric"` | `"numeric"` |
| validationState  | Validation state. Affect component's appearance                                                                                                      |         `"invalid"`          |             |
| value            | Current value for controlled component                                                                                                               |          `string[]`          |             |
