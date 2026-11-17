<!--GITHUB_BLOCK-->

# SliderInput

<!--/GITHUB_BLOCK-->

```tsx
import {SliderInput} from '@gravity-ui/uikit';
```

`SliderInput` is a numeric control that combines a text field with a slider attached to its bottom edge: the user can either type an exact value or pick it by dragging the slider handle.

The slider and form value use the canonical value. The field may temporarily show an off-grid or invalid draft; an allowed number is published immediately, while `Enter` or blur aligns a numeric draft to the nearest allowed value and restores invalid text to the canonical value.

## Usage

By default `SliderInput` is uncontrolled, use `defaultValue` to set the initial value:

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput defaultValue={50} aria-label="Value" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput defaultValue={50} aria-label="Value" />
```

<!--/GITHUB_BLOCK-->

To use it as a controlled component, pass `value` and update it in `onUpdate`:

```tsx
const [value, setValue] = React.useState(50);

<SliderInput value={value} onUpdate={setValue} aria-label="Value" />;
```

In a controlled component, `value` remains authoritative. If the parent does not accept a requested value, the component restores the supplied `value` and does not call `onUpdateComplete`. An asynchronous acceptance that arrives after an interaction has completed does not cause a retroactive completion; a different external value cancels the active interaction.

`onUpdate` fires for each valid numeric value while the user interacts: on slider movement and on typing an allowed value. `onUpdateComplete` fires once when an accepted interaction ends with a changed value: on slider release, `Enter`, field blur, or keyup after a numeric keyboard step. It does not fire for a no-op, a value returned to its starting value, or the blur that follows `Enter`.

## Value domain

`min`, `max`, `step` and `marks` work the same way as in [Slider](https://github.com/gravity-ui/uikit/tree/main/src/components/Slider):

- `step={null}` restricts the allowed values to the marks and the domain edges only;
- `marks` accepts either the number of evenly distributed marks or an array of values;
- values outside the domain (including `value` and `defaultValue`) are aligned to the nearest allowed value.

`markFormat` affects presentation only. Returning an empty string still keeps the corresponding mark selectable. Like the underlying `Slider` version, `SliderInput` does not guarantee support for steps of `1e-7` or smaller.

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput min={0} max={100} step={null} marks={[0, 25, 50, 75, 100]} defaultValue={50} aria-label="Value" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput min={0} max={100} step={null} marks={[0, 25, 50, 75, 100]} defaultValue={50} />
```

<!--/GITHUB_BLOCK-->

## Keyboard interaction

The component renders two tab stops: the text field and the slider handle. If `min` equals `max`, only the text field is a tab stop.

When the text field is focused:

- `ArrowUp`/`ArrowDown` move the value to the adjacent allowed value. When the field contains an unfinished draft that is a number, the step is taken from the typed number;
- `Home`/`End` move it to `min`/`max`;
- `Enter` commits the current draft, resolving it to the nearest allowed value.

The slider handle supports the regular `Slider` keyboard interaction.

## Size

Use the `size` property to manage the `SliderInput` size. The default size is `m`.

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput size="s" defaultValue={25} aria-label="Small" />
            <SliderInput size="m" defaultValue={50} aria-label="Medium" />
            <SliderInput size="l" defaultValue={75} aria-label="Large" />
            <SliderInput size="xl" defaultValue={100} aria-label="Extra large" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput size="s" />
<SliderInput size="m" />
<SliderInput size="l" />
<SliderInput size="xl" />
```

<!--/GITHUB_BLOCK-->

## States

Use `disabled` to prevent any interaction and `validationState="invalid"` with an optional `errorMessage` to render the error state. Additional description can be provided with `note`.

The external `aria-describedby`, `note`, and `errorMessage` descriptions are applied to both the field and slider handle; the wrapping group has no description. Use `controlProps` only for additional attributes and handlers of the visible text field.

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput defaultValue={50} disabled aria-label="Disabled" />
            <SliderInput defaultValue={70} validationState="invalid" errorMessage="Invalid value" aria-label="Invalid" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput defaultValue={50} disabled />
<SliderInput defaultValue={70} validationState="invalid" errorMessage="Invalid value" />
```

<!--/GITHUB_BLOCK-->

## Usage in forms

Pass `name` to use the component inside a form. Its hidden input is the only named field; it submits the last canonical value, even if `requestSubmit()` happens before blur. Pressing `Enter` commits the draft before native form submission. A disabled component is omitted from form data, while a component with `min === max` still submits its fixed value.

On native reset, the mount-time committed snapshot is normalized to the current domain and restored. If it differs from the current value, `onUpdate` fires, but `onUpdateComplete` does not. Reset cancellation via `event.preventDefault()` is not supported by the shared reset hook.

```tsx
<form>
  <SliderInput name="amount" defaultValue={35} aria-label="Amount" />
</form>
```

## Properties

| Name             | Description                                                                                                   |             Type              | Default |
| :--------------- | :------------------------------------------------------------------------------------------------------------ | :---------------------------: | :-----: |
| autoComplete     | The control's `autocomplete` attribute                                                                        |      `boolean` `string`       |         |
| autoFocus        | The control's `autofocus` attribute                                                                           |           `boolean`           |         |
| className        | The control's wrapper class name                                                                              |           `string`            |         |
| aria-describedby | IDs of elements that describe both the field and slider handle                                                |           `string`            |         |
| aria-label       | Accessible label applied to both the field and slider handle                                                  |           `string`            |         |
| aria-labelledby  | IDs of elements that label both the field and slider handle                                                   |           `string`            |         |
| controlProps     | Additional HTML attributes and handlers of the visible field                                                  |   `SliderInputControlProps`   |         |
| controlRef       | React ref provided to the visible input element                                                               | `React.Ref<HTMLInputElement>` |         |
| defaultValue     | The control's default value, used when the component is not controlled                                        |           `number`            |  `min`  |
| disabled         | Indicates that the user cannot interact with the control                                                      |           `boolean`           | `false` |
| endContent       | The user's node rendered after the input node                                                                 |       `React.ReactNode`       |         |
| errorMessage     | Error content shown under the control when `validationState` is `"invalid"`                                   |       `React.ReactNode`       |         |
| form             | The associated form element                                                                                   |           `string`            |         |
| id               | The control's `id` attribute                                                                                  |           `string`            |         |
| label            | Help text rendered to the left of the input node                                                              |           `string`            |         |
| marks            | Text marks under the slider: the amount of marks or an array of values. `0` or an empty array hides all marks |      `number` `number[]`      |   `2`   |
| markFormat       | Formatter for the mark's displayed value                                                                      |  `(value: number) => string`  |         |
| max              | The maximum value of the component                                                                            |           `number`            |  `100`  |
| min              | The minimum value of the component                                                                            |           `number`            |   `0`   |
| name             | The name of the form field, a single canonical value is submitted                                             |           `string`            |         |
| note             | An optional element rendered under the control                                                                |       `React.ReactNode`       |         |
| onBlur           | Fires when focus leaves the whole control (both the field and the slider)                                     |   `(e: FocusEvent) => void`   |         |
| onFocus          | Fires when focus enters the control                                                                           |   `(e: FocusEvent) => void`   |         |
| onUpdate         | Fires when the committed value is changed by the user                                                         |   `(value: number) => void`   |         |
| onUpdateComplete | Fires when an interaction ends with a changed value: slider release, `Enter`, field blur, keyboard steps      |   `(value: number) => void`   |         |
| placeholder      | The text that appears in the control when it has no value set                                                 |           `string`            |         |
| qa               | `data-qa` HTML attribute, used for testing                                                                    |           `string`            |         |
| ref              | React ref provided to the wrapper element                                                                     |  `React.Ref<HTMLDivElement>`  |         |
| size             | The size of the control                                                                                       |   `"s"` `"m"` `"l"` `"xl"`    |  `"m"`  |
| startContent     | The user's node rendered before the input node                                                                |       `React.ReactNode`       |         |
| step             | Value to be added or subtracted on each step. Can be set to `null` to make `marks` act as steps               |        `number` `null`        |   `1`   |
| style            | The control's wrapper style                                                                                   |     `React.CSSProperties`     |         |
| tabIndex         | The control's `tabIndex` attribute, applied to both the field and the slider handle                           |           `number`            |         |
| validationState  | Validation state                                                                                              |          `"invalid"`          |         |
| value            | The value of the control, makes the component controlled                                                      |           `number`            |         |
