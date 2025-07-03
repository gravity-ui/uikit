<!--GITHUB_BLOCK-->

# TextArea

<!--/GITHUB_BLOCK-->

```tsx
import {TextArea} from '@gravity-ui/uikit';
```

`TextArea` allow users to enter text into a UI.

## Appearance

The `TextArea`'s appearance is controlled by the `view` and `pin` properties.

### View

`normal` - is the main view of the `TextArea` (used by default).

<!--LANDING_BLOCK
<ExampleBlock code={`<TextArea placeholder="Placeholder" />`}>
    <UIKit.TextArea placeholder="Placeholder" />
</ExampleBlock>
LANDING_BLOCK-->

`clear` - can be used when using a custom wrapper for the `TextArea`.

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

Allows you to control the appearance of the right and left edges of the `TextArea`'s border.

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

The state of the `TextArea` where you don't want the user to be able to interact with the component.

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

The state of the `TextArea` where you want to show incorrect user input. To change the appearance of the `TextArea`, use the `validationState` property with the "invalid" value.
An optional message text can be added via the `errorMessage` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextArea placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
<TextArea view="clear" placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
`}
>
    <UIKit.TextArea placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
    <UIKit.TextArea view="clear" placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextArea errorMessage="Error message" validationState="invalid" />
```

<!--/GITHUB_BLOCK-->

## Size

`s` – Used when standard controls are too big (tables, small cards).

`m` – The basic size, used in most components.

`l` – Used for basic controls in a page's header, modal windows, or pop-ups.

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

## Row management

The row count of the `TextArea` is controlled by the `rows`, `minRows` and `maxRows` properties. The `rows` property disables automatic height calculation.
To set the desired height of the `TextArea`, use the `className` or `style` property with the `rows` property set to 1.

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
    <div>
        height = 200px
        <UIKit.TextArea placeholder="Placeholder" rows={1} style={{height: 200px}}/>
    </div>
</ExampleBlock>
LANDING_BLOCK-->

## Resizable TextArea

You can get resizable behaviour by providing `resize` style to `controlProps` property. Be sure to specify the `rows` property if you allow the text area height to be resized, otherwise resizing will conflict with the automatic height calculation.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<TextArea
    rows={4}
    placeholder="Placeholder"
    style={{width: "auto", maxWidth: "100%"}}
    controlProps={{style: {resize: "both"}}}
/>
`}
>
    <UIKit.TextArea
        rows={4}
        placeholder="Placeholder"
        style={{width: "auto", maxWidth: "100%"}}
        controlProps={{style: {resize: "both"}}}
    />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TextArea rows={4} controlProps={{style: {resize: 'both'}}} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name            | Description                                                                                                                       |                        Type                         |     Default     |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------: | :-------------: |
| autoComplete    | The control's `autocomplete` attribute                                                                                            |                 `boolean` `string`                  |                 |
| autoFocus       | The control's `autofocus` attribute                                                                                               |                      `boolean`                      |                 |
| className       | The control's wrapper class name                                                                                                  |                      `string`                       |                 |
| controlProps    | The control's html attributes                                                                                                     | `React.TextareaHTMLAttributes<HTMLTextAreaElement>` |                 |
| controlRef      | React ref provided to the control                                                                                                 |          `React.Ref<HTMLTextAreaElement>`           |                 |
| defaultValue    | The control's default value. Used when the component is not controlled                                                            |                      `string`                       |                 |
| disabled        | Indicates that the user cannot interact with the control                                                                          |                      `boolean`                      |     `false`     |
| errorMessage    | Error text                                                                                                                        |                      `string`                       |                 |
| hasClear        | Shows the icon for clearing the control's value                                                                                   |                      `boolean`                      |     `false`     |
| id              | The control's `id` attribute                                                                                                      |                      `string`                       |                 |
| maxRows         | The maximum number of visible text lines for the control. Ignored if `rows` is specified                                          |                      `number`                       |                 |
| minRows         | The minimum number of visible text lines for the control. Ignored if `rows` is specified                                          |                      `number`                       |                 |
| name            | The control's `name` attribute. If unspecified, it will be autogenerated.                                                         |                      `string`                       |                 |
| note            | An optional element displayed under the bottom-right corner of the control and sharing space with the error container             |                  `React.ReactNode`                  |                 |
| onBlur          | Fires when the control lost focus. Provides focus event as a callback's argument                                                  |                     `function`                      |                 |
| onChange        | Fires when the input’s value is changed by the user. Provides change event as a callback's argument                               |                     `function`                      |                 |
| onFocus         | Fires when the control gets focus. Provides focus event as a callback's argument                                                  |                     `function`                      |                 |
| onKeyDown       | Fires when a key is pressed. Provides keyboard event as a callback's argument                                                     |                     `function`                      |                 |
| onKeyUp         | Fires when a key is released. Provides keyboard event as a callback's argument                                                    |                     `function`                      |                 |
| onUpdate        | Fires when the input’s value is changed by the user. Provides new value as a callback's argument                                  |                     `function`                      |                 |
| pin             | The control's border view                                                                                                         |                      `string`                       | `"round-round"` |
| placeholder     | Text that appears in the control when no value is set                                                                             |                      `string`                       |                 |
| qa              | Test id attribute (`data-qa`)                                                                                                     |                      `string`                       |                 |
| readOnly        | Indicates that the user cannot change control's value                                                                             |                      `boolean`                      |     `false`     |
| rows            | The number of visible text lines for the control. If unspecified, the hight will be calculated automatically based on the content |                      `number`                       |                 |
| size            | The control's size                                                                                                                |              `"s"` `"m"` `"l"` `"xl"`               |      `"m"`      |
| tabIndex        | The control's `tabindex` attribute                                                                                                |                      `string`                       |                 |
| type            | The control's type                                                                                                                |                      `string`                       |                 |
| validationState | Validation state                                                                                                                  |                     `"invalid"`                     |                 |
| value           | The control's value                                                                                                               |                      `string`                       |                 |
| view            | The control's view                                                                                                                |                `"normal"` `"clear"`                 |   `"normal"`    |

## CSS API

| Name                                | Description                                         |
| :---------------------------------- | :-------------------------------------------------- |
| `--g-text-area-text-color`          | Text color                                          |
| `--g-text-area-placeholder-color`   | Placeholder color                                   |
| `--g-text-area-background-color`    | Background color                                    |
| `--g-text-area-border-radius`       | Border radius                                       |
| `--g-text-area-border-width`        | Border width                                        |
| `--g-text-area-border-color`        | Border color                                        |
| `--g-text-area-border-color-hover`  | Border color if hovered                             |
| `--g-text-area-border-color-active` | Border color if active                              |
| `--g-text-area-focus-outline-color` | Outline color if focused (by default not presented) |
