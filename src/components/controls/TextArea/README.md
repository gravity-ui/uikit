<!--GITHUB_BLOCK-->

# TextArea

<!--/GITHUB_BLOCK-->

```tsx
import {TextArea} from '@gravity-ui/uikit';
```

## Description

TextArea allow users to enter text into a UI.

## Appearance

The TextArea's appearance is controlled by the `view` and `pin` properties.

### View

`normal` - this is the main view of TextArea (used by default).

<!--LANDING_BLOCK
<ExampleBlock code={`<TextArea placeholder="Placeholder" />`}>
    <UIKit.TextArea placeholder="Placeholder" />
</ExampleBlock>
LANDING_BLOCK-->

`clear` - this view could be used in case of using custom wrapper for TextArea.

<!--LANDING_BLOCK
<ExampleBlock code={`<TextArea view="clear" placeholder="Placeholder" />`}>
    <UIKit.TextArea view="clear" placeholder="Placeholder" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextArea view="normal" />
<TextArea view="clear" />
```

<!--/GITHUB_BLOCK-->

### Pin

Allows you to control view of right and left edges of TextArea's border.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextArea placeholder="Placeholder" pin="round-brick" />
<TextArea placeholder="Placeholder" pin="brick-brick" />
<TextArea placeholder="Placeholder" pin="brick-round" />
`}
>
    <UIKit.TextArea placeholder="Placeholder" pin="round-brick" />
    <UIKit.TextArea placeholder="Placeholder" pin="brick-brick" />
    <UIKit.TextArea placeholder="Placeholder" pin="brick-round" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextArea pin="round-brick" />
<TextArea pin="brick-brick" />
<TextArea pin="brick-round" />
```

<!--/GITHUB_BLOCK-->

## States

### Disabled

The state of the TextArea where you don't want the user to be able to interact with the component.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextArea placeholder="Placeholder" disabled={true} />
`}
>
    <UIKit.TextArea placeholder="Placeholder" disabled={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextArea disabled />
```

<!--/GITHUB_BLOCK-->

### Error

The state of the TextArea at which you want to show incorrect user input.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextArea placeholder="Placeholder" error="Error message" />
<TextArea view="clear" placeholder="Placeholder" error="Error message" />
`}
>
    <UIKit.TextArea placeholder="Placeholder" error="Error message" />
    <UIKit.TextArea view="clear" placeholder="Placeholder" error="Error message" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextArea error="Error message" />
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
<TextArea placeholder="Placeholder" size="s" />
<TextArea placeholder="Placeholder" size="m" />
<TextArea placeholder="Placeholder" size="l" />
<TextArea placeholder="Placeholder" size="xl" />
`}
>
    <UIKit.TextArea placeholder="Placeholder" size="s" />
    <UIKit.TextArea placeholder="Placeholder" size="m" />
    <UIKit.TextArea placeholder="Placeholder" size="l" />
    <UIKit.TextArea placeholder="Placeholder" size="xl" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextArea size="s" />
<TextArea size="m" />
<TextArea size="l" />
<TextArea size="xl" />
```

<!--/GITHUB_BLOCK-->

## Rows management

The TextArea's rows count is controlled by the `rows`, `minRows` and `maxRows` properties.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextArea placeholder="Placeholder" size="s" />
`}
>
    <div>
        rows = 2
        <UIKit.TextArea placeholder="Placeholder" rows={2} />
    </div>
    <div>
        minRows = 2
        <UIKit.TextArea placeholder="Placeholder" minRows={2} />
    </div>
    <div>
        maxRows = 2
        <UIKit.TextArea placeholder="Placeholder" maxRows={2} />
    </div>
</ExampleBlock>
LANDING_BLOCK-->

## Properties

| Property     | Description                                                                                                                         | Type                                                | Default         |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- | :-------------- |
| autoComplete | The control's `autocomplete` attribute                                                                                              | `boolean \| string`                                 |                 |
| autoFocus    | The control's `autofocus` attribute                                                                                                 | `boolean`                                           |                 |
| className    | The control's wrapper class name                                                                                                    | `string`                                            |                 |
| controlProps | The control's html attributes                                                                                                       | `React.TextareaHTMLAttributes<HTMLTextAreaElement>` |                 |
| controlRef   | React ref provided to the control                                                                                                   | `React.Ref<HTMLTextAreaElement>`                    |                 |
| defaultValue | The control's default value. Use when the component is not controlled                                                               | `string`                                            |                 |
| disabled     | Indicates that the user cannot interact with the control                                                                            | `boolean`                                           | `false`         |
| error        | Shows error state and optional message if property identified as a string                                                           | `boolean \| string`                                 |                 |
| hasClear     | Shows icon for clearing control's value                                                                                             | `boolean`                                           | `false`         |
| id           | The control's `id` attribute                                                                                                        | `string`                                            |                 |
| maxRows      | The number of maximum visible text lines for the control. Ignored if `rows` is specified                                            | `number`                                            |                 |
| minRows      | The number of minimum visible text lines for the control. Ignored if `rows` is specified                                            | `number`                                            |                 |
| name         | The control's `name` attribute. Will be autogenerated if not specified                                                              | `string`                                            |                 |
| note         | An optional element displayed under the lower right corner of the control and sharing the place with the error container            | `React.ReactNode`                                   |                 |
| onBlur       | Fires when the control lost focus. Provides focus event as an callback's argument                                                   | `function`                                          |                 |
| onChange     | Fires when the input’s value is changed by the user. Provides change event as an callback's argument                                | `function`                                          |                 |
| onFocus      | Fires when the control gets focus. Provides focus event as an callback's argument                                                   | `function`                                          |                 |
| onKeyDown    | Fires when a key is pressed. Provides keyboard event as an callback's argument                                                      | `function`                                          |                 |
| onKeyUp      | Fires when a key is released. Provides keyboard event as an callback's argument                                                     | `function`                                          |                 |
| onUpdate     | Fires when the input’s value is changed by the user. Provides new value as an callback's argument                                   | `function`                                          |                 |
| pin          | The control's border view. `'round-round'` by default                                                                               | `string`                                            | `'round-round'` |
| placeholder  | Text that appears in the control when it has no value set                                                                           | `string`                                            |                 |
| qa           | Test id attribute (`data-qa`)                                                                                                       | `string`                                            |                 |
| rows         | The number of visible text lines for the control. If not specified, the hight will be automatically calculated based on the content | `number`                                            |                 |
| size         | The control's size. `'m'` by default                                                                                                | `'s' \| 'm' \| 'l' \| 'xl'`                         | `'m'`           |
| tabIndex     | The control's `tabindex` attribute                                                                                                  | `string`                                            |                 |
| type         | The control's type                                                                                                                  | `string`                                            |                 |
| value        | The control's value                                                                                                                 | `string`                                            |                 |
| view         | The control's view. `'normal'` by default                                                                                           | `'normal' \| 'clear'`                               | `'normal'`      |
