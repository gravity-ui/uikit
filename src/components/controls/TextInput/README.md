<!--GITHUB_BLOCK-->

# TextInput

<!--/GITHUB_BLOCK-->

```tsx
import {TextInput} from '@gravity-ui/uikit';
```

## Description

TextInput allow users to enter text into a UI.

## Appearance

The TextInput's appearance is controlled by the `view` and `pin` properties.

### View

`normal` - this is the main view of TextInput (used by default).

<!--LANDING_BLOCK
<ExampleBlock code={`<TextInput placeholder="Placeholder" />`}>
    <UIKit.TextInput placeholder="Placeholder" />
</ExampleBlock>
LANDING_BLOCK-->

`clear` - this view could be used in case of using custom wrapper for TextInput.

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

Allows you to control view of right and left edges of TextInput's border.

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

The state of the TextInput where you don't want the user to be able to interact with the component.

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

The state of the TextInput at which you want to show incorrect user input.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextInput placeholder="Placeholder" error="Error message" />
`}
>
    <UIKit.TextInput placeholder="Placeholder" error="Error message" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput error="Error message" />
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

- label occupies the leftmost position relative to the control. That is, the elements added via `leftContent` property will be located to the right.
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

### Left content

Allows you to add content to the left of the control. Located to the right of the label added via `label` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`<TextInput placeholder="Placeholder" label="Label" leftContent={<Label size="s">Left</Label>} />`}
>
    <UIKit.TextInput
        placeholder="Search"
        label="Label"
        leftContent={<UIKit.Label size="s">Left</UIKit.Label>}
    />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput leftContent={<Label>Left</Label>} />
```

<!--/GITHUB_BLOCK-->

### Right content

Allows you to add content to the right of the control. Located to the right of the clear button added via `hasClear` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`<TextInput placeholder="Placeholder" rightContent={<Label size="s">Right</Label>} hasClear/>`}
>
    <UIKit.TextInput
        hasClear
        placeholder="Placeholder"
        rightContent={<UIKit.Label size="s">Right</UIKit.Label>}
    />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextInput rightContent={<Label>Right</Label>} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Property     | Description                                                                                                              | Type                                          | Default         |
| :----------- | :----------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- | :-------------- |
| autoComplete | The control's `autocomplete` attribute                                                                                   | `boolean \| string`                           |                 |
| autoFocus    | The control's `autofocus` attribute                                                                                      | `boolean`                                     |                 |
| className    | The control's wrapper class name                                                                                         | `string`                                      |                 |
| controlProps | The control's html attributes                                                                                            | `React.InputHTMLAttributes<HTMLInputElement>` |                 |
| controlRef   | React ref provided to the control                                                                                        | `React.Ref<HTMLInputElement>`                 |                 |
| defaultValue | The control's default value. Use when the component is not controlled                                                    | `string`                                      |                 |
| disabled     | Indicates that the user cannot interact with the control                                                                 | `boolean`                                     | `false`         |
| error        | Shows error state and optional message if property identified as a string                                                | `boolean \| string`                           |                 |
| hasClear     | Shows icon for clearing control's value                                                                                  | `boolean`                                     | `false`         |
| id           | The control's `id` attribute                                                                                             | `string`                                      |                 |
| label        | Help text rendered to the left of the input node                                                                         | `string`                                      |                 |
| leftContent  | User`s node rendered before label and input                                                                              | `React.ReactNode`                             |                 |
| name         | The control's `name` attribute. Will be autogenerated if not specified                                                   | `string`                                      |                 |
| onBlur       | Fires when the control lost focus. Provides focus event as an callback's argument                                        | `function`                                    |                 |
| onChange     | Fires when the input’s value is changed by the user. Provides change event as an callback's argument                     | `function`                                    |                 |
| onFocus      | Fires when the control gets focus. Provides focus event as an callback's argument                                        | `function`                                    |                 |
| onKeyDown    | Fires when a key is pressed. Provides keyboard event as an callback's argument                                           | `function`                                    |                 |
| onKeyUp      | Fires when a key is released. Provides keyboard event as an callback's argument                                          | `function`                                    |                 |
| onUpdate     | Fires when the input’s value is changed by the user. Provides new value as an callback's argument                        | `function`                                    |                 |
| pin          | The control's border view. `'round-round'` by default                                                                    | `string`                                      | `'round-round'` |
| placeholder  | Text that appears in the control when it has no value set                                                                | `string`                                      |                 |
| qa           | Test id attribute (`data-qa`)                                                                                            | `string`                                      |                 |
| rightContent | User`s node rendered after input node and clear button                                                                   | `React.ReactNode`                             |                 |
| size         | The control's size. `'m'` by default                                                                                     | `'s' \| 'm' \| 'l' \| 'xl'`                   | `'m'`           |
| tabIndex     | The control's `tabindex` attribute                                                                                       | `string`                                      |                 |
| type         | The control's type                                                                                                       | `string`                                      |                 |
| value        | The control's value                                                                                                      | `string`                                      |                 |
| view         | The control's view. `'normal'` by default                                                                                | `'normal' \| 'clear'`                         | `'normal'`      |
| note         | An optional element displayed under the lower right corner of the control and sharing the place with the error container | `React.ReactNode`                             |                 |
