<!--GITHUB_BLOCK-->

# TextInput

<!--/GITHUB_BLOCK-->

```tsx
import {TextInput} from '@gravity-ui/uikit';
```

TextInput allow users to enter text into a UI.

## Appearance

The appearance of `TextInput` is controlled by the `view` and `pin` properties.

### View

`normal` - the main view of `TextInput` (used by default).

<!--LANDING_BLOCK
<ExampleBlock code={`<TextInput placeholder="Placeholder" />`}>
    <UIKit.TextInput placeholder="Placeholder" />
</ExampleBlock>
LANDING_BLOCK-->

`clear` - can be used with a custom wrapper for `TextInput`.

<!--LANDING_BLOCK
<ExampleBlock code={`<TextInput view="clear" placeholder="Placeholder" />`}>
    <UIKit.TextInput view="clear" placeholder="Placeholder" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput view="normal" />
<TextInput view="clear" />
```

<!--/GITHUB_BLOCK-->

### Pin

Allows you to control view of right and left edges of `TextInput`'s border.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextInput placeholder="Placeholder" pin="round-brick" />
<TextInput placeholder="Placeholder" pin="brick-brick" />
<TextInput placeholder="Placeholder" pin="brick-round" />
`}
>
    <UIKit.TextInput placeholder="Placeholder" pin="round-brick" />
    <UIKit.TextInput placeholder="Placeholder" pin="brick-brick" />
    <UIKit.TextInput placeholder="Placeholder" pin="brick-round" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput pin="round-brick" />
<TextInput pin="brick-brick" />
<TextInput pin="brick-round" />
```

<!--/GITHUB_BLOCK-->

## States

### Disabled

The state of the `TextInput` where you don't want the user to be able to interact with the component.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextInput placeholder="Placeholder" disabled={true} />
`}
>
    <UIKit.TextInput placeholder="Placeholder" disabled={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput disabled />
```

<!--/GITHUB_BLOCK-->

### Error

The state of the `TextInput` in which you want to indicate incorrect user input. To change `TextInput` appearance, use the `validationState` property with the `"invalid"` value. An optional message text can be added via the `errorMessage` property. By default, message text is rendered outside the component.
This behaviour can be changed with the `errorPlacement` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextInput placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
<TextInput placeholder="Placeholder" errorPlacement="inside" errorMessage="Error message" validationState="invalid" />
`}
>
    <UIKit.TextInput placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
    <UIKit.TextInput placeholder="Placeholder" errorPlacement="inside" errorMessage="Error message" validationState="invalid" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput errorMessage="Error message" validationState="invalid" />
<TextInput errorPlacement="inside" errorMessage="Error message" validationState="invalid" />
```

<!--/GITHUB_BLOCK-->

## Size

`s` – Used when standard controls are too big (tables, small cards).

`m` – Basic size, used in most components.

`l` – Basic controls performed in a page's header, modal windows, or pop-ups.

`xl` – Used on promo and landing pages.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextInput placeholder="Placeholder" size="s" />
<TextInput placeholder="Placeholder" size="m" />
<TextInput placeholder="Placeholder" size="l" />
<TextInput placeholder="Placeholder" size="xl" />
`}
>
    <UIKit.TextInput placeholder="Placeholder" size="s" />
    <UIKit.TextInput placeholder="Placeholder" size="m" />
    <UIKit.TextInput placeholder="Placeholder" size="l" />
    <UIKit.TextInput placeholder="Placeholder" size="xl" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput size="s" />
<TextInput size="m" />
<TextInput size="l" />
<TextInput size="xl" />
```

<!--/GITHUB_BLOCK-->

## Label

Allows you to set the label to the left of control.

- label occupies the leftmost position relative to the control. That is, the elements added via `startContent` property will be located to the right.
- label can take up no more than half the width of the entire TextInput's space.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextInput placeholder="Placeholder" label="Label" />
<TextInput placeholder="Placeholder" label="Very long label with huge amount of symbols" />
`}
>
    <UIKit.TextInput placeholder="Placeholder" label="Label" />
    <UIKit.TextInput placeholder="Placeholder" label="Very long label with huge amount of symbols" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput label="Label" />
```

<!--/GITHUB_BLOCK-->

## Additional content

### Start content

Allows you to add content to the left of the control (or to the right in case of using [rtl](https://developer.mozilla.org/en-US/docs/Glossary/RTL)). Located to the left (or to the right in case of using rtl) of the label added via `label` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`<TextInput placeholder="Placeholder" label="Label" startContent={<Label size="s">Left</Label>} />`}
>
    <UIKit.TextInput
        placeholder="Search"
        label="Label"
        startContent={<UIKit.Label size="s">Left</UIKit.Label>}
    />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput startContent={<Label>Left</Label>} />
```

<!--/GITHUB_BLOCK-->

### End content

Allows you to add content to the right (or to the left in case of using [rtl](https://developer.mozilla.org/en-US/docs/Glossary/RTL)) of the control. Located to the right (or to the left in case of using rtl) of the clear button added via `hasClear` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`<TextInput placeholder="Placeholder" endContent={<Label size="s">Right</Label>} hasClear/>`}
>
    <UIKit.TextInput
        hasClear
        placeholder="Placeholder"
        endContent={<UIKit.Label size="s">Right</UIKit.Label>}
    />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput endContent={<Label>Right</Label>} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name            | Description                                                                                                             |                                 Type                                  |     Default     |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------: | :-------------: |
| autoComplete    | The control's `autocomplete` attribute                                                                                  |                          `boolean` `string`                           |                 |
| autoFocus       | The control's `autofocus` attribute                                                                                     |                               `boolean`                               |                 |
| className       | The control's wrapper class name                                                                                        |                               `string`                                |                 |
| controlProps    | The control's html attributes                                                                                           |             `React.InputHTMLAttributes<HTMLInputElement>`             |                 |
| controlRef      | React ref provided to the control                                                                                       |                     `React.Ref<HTMLInputElement>`                     |                 |
| defaultValue    | The control's default value, used when the component is not controlled                                                  |                               `string`                                |                 |
| disabled        | Indicates that the user cannot interact with the control                                                                |                           `React.ReactNode`                           |                 |
| endContent      | User`s node rendered after input node, clear button and error icon                                                      |                               `string`                                |                 |
| errorMessage    | Error text                                                                                                              |                               `string`                                |                 |
| errorPlacement  | Error placement                                                                                                         |                          `outside` `inside`                           |    `outside`    |
| hasClear        | Shows the icon for clearing control's value                                                                             |                               `boolean`                               |     `false`     |
| id              | The control's `id` attribute                                                                                            |                               `string`                                |                 |
| label           | Help text rendered to the left of the input node                                                                        |                               `string`                                |                 |
| name            | The `name` attribute of the control. If unspecified, it will be autogenerated if not specified                          |                               `string`                                |                 |
| note            | An optional element displayed under the bottom-right corner of the control that shares a space with the error container |                           `React.ReactNode`                           |                 |
| onBlur          | Fires when the control lost focus. Provides focus event as a callback's argument                                        |                              `function`                               |                 |
| onChange        | Fires when the input’s value is changed by the user. Provides change event as an callback's argument                    |                              `function`                               |                 |
| onFocus         | Fires when the control gets focus. Provides focus event as a callback's argument                                        |                              `function`                               |                 |
| onKeyDown       | Fires when a key is pressed. Provides keyboard event as a callback's argument                                           |                              `function`                               |                 |
| onKeyUp         | Fires when a key is released. Provides keyboard event as a callback's argument                                          |                              `function`                               |                 |
| onUpdate        | Fires when the input’s value is changed by the user. Provides new value as an callback's argument                       |                              `function`                               |                 |
| pin             | The control's border view                                                                                               |                               `string`                                | `'round-round'` |
| placeholder     | Text that appears in the control when it has no value set                                                               |                               `string`                                |                 |
| qa              | Test ID attribute (`data-qa`)                                                                                           |                               `string`                                |
| readOnly        | Indicates that the user cannot change control's value                                                                   |                               `boolean`                               |     `false`     |
| size            | The size of the control                                                                                                 |                       `"s"` `"m"` `"l"` `"xl"`                        |      `"m"`      |
| startContent    | User`s node rendered before label and input node                                                                        |                           `React.ReactNode`                           |                 |
| tabIndex        | The `tabindex` attribute of the control                                                                                 |                               `string`                                |                 |
| type            | The type of the control                                                                                                 | `"email"` `"number"` `"password"` `"search"` `"tel"` `"text"` `"url"` |                 |
| validationState | Validation state                                                                                                        |                              `"invalid"`                              |                 |
| value           | The value of the control                                                                                                |                               `string`                                |                 |
| view            | The view of the control                                                                                                 |                         `"normal"` `"clear"`                          |   `"normal"`    |

## CSS API

| Name                                 | Description                                         |
| :----------------------------------- | :-------------------------------------------------- |
| `--g-text-input-text-color`          | Text color                                          |
| `--g-text-input-label-color`         | Label color                                         |
| `--g-text-input-placeholder-color`   | Placeholder color                                   |
| `--g-text-input-background-color`    | Background color                                    |
| `--g-text-input-border-radius`       | Border radius                                       |
| `--g-text-input-border-width`        | Border width                                        |
| `--g-text-input-border-color`        | Border color                                        |
| `--g-text-input-border-color-hover`  | Border color if hovered                             |
| `--g-text-input-border-color-active` | Border color if active                              |
| `--g-text-input-focus-outline-color` | Outline color if focused (by default not presented) |
