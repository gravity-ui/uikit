<!--GITHUB_BLOCK-->

# Slider

<!--/GITHUB_BLOCK-->

```tsx
import {Slider} from '@gravity-ui/uikit';
```

A slider is a customizable and responsive React component that allows users to select a single value or a range of values from a specified data set.

## Slider variations

### Single slider

This is a slider with one handle to select a single value. It is used by default.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider />
`}
>
    <UIKitExamples.SliderExample />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider />
```

<!--/GITHUB_BLOCK-->

### Range slider

This is slider with two handles to select a range. To use it, set `defaultValue` (for an uncontrolled slider) or `value` (for a controlled one) for the array.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider defaultValue={[20, 40]} />
`}
>
    <UIKitExamples.SliderExample defaultValue={[20, 40]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider defaultValue={[20, 40]} />
```

<!--/GITHUB_BLOCK-->

## States

### Disabled

This is a state of a `Slider` where you do not want to allow the user to work with this component.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider disabled={true} />
`}
>
    <UIKitExamples.SliderExample disabled={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider disabled={true} />
```

<!--/GITHUB_BLOCK-->

### Error

This `Slider` state is for incorrect user input. To change the `Slider` appearance, use the `validationState` property with the `"invalid"` value. Optionally, you can provide an error message through the `errorMessage` property. This message text will be rendered under the slider.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider validationState={"invalid"} />
<Slider validationState={"invalid"} errorMessage="Error message" />
`}
>
    <UIKitExamples.SliderExample validationState={"invalid"} />
    <UIKitExamples.SliderExample validationState={"invalid"} errorMessage="Error message" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider validationState={"invalid"} />
<Slider validationState={"invalid"} errorMessage="Error message" />
```

<!--/GITHUB_BLOCK-->

## Size

Use the `size` property to manage the `Slider` size. The default size is `m`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider size="s" />
<Slider size="m" />
<Slider size="l" />
<Slider size="xl" />
`}
>
    <UIKitExamples.SliderExample size="s" />
    <UIKitExamples.SliderExample size="m" />
    <UIKitExamples.SliderExample size="l" />
    <UIKitExamples.SliderExample size="xl" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider size="s" />
<Slider size="m" />
<Slider size="l" />
<Slider size="xl" />
```

<!--/GITHUB_BLOCK-->

## Value

### Minimum and maximum value

The `min` and `max` properties define the limits of the range the `Slider` can handle. These properties are essential for setting the boundaries of the selectable values.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider min={10} />
<Slider max={50} />
<Slider min={20} max={60} />
`}
>
    <UIKitExamples.SliderExample min={10} />
    <UIKitExamples.SliderExample max={50} />
    <UIKitExamples.SliderExample min={20} max={60} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider min={10} />
<Slider max={50} />
<Slider min={20} max={60} />
```

<!--/GITHUB_BLOCK-->

### Step

The `step` property determines the increments within the minimum and maximum value range. This means how much the value changes with a single slider move.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider step={10} />
`}
>
    <UIKitExamples.SliderExample step={10} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider step={10} />
```

<!--/GITHUB_BLOCK-->

### Marks

The `marksCount` property is used to specify the number of visual marks along the slider that indicate various points between the minimum and maximum value. This property enhances the usability and visual interface of the slider, especially for denoting specific intervals. By default, `marksCount` is 2 (minimum and maximum values); you can set a higher value, if required.

> The mark value is available for selection, even when it does not match the `step` value condition.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marksCount={11} />
`}
>
    <UIKitExamples.SliderExample marksCount={11} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marksCount={11} />
```

<!--/GITHUB_BLOCK-->

### Available values

The `availableValues` property is used to define specific values the slider can handle, as opposed to a continuous range. This is particularly useful when only certain discrete values are valid for selection. `availableValues` enables specifying an array of numbers which are the exact values that the users are allowed to select when working with the `Slider`.

> The `availableValues` property overrides `min`, `max`, `marksCount` and `step` (when those are used all at the same time); in this case, the slider will directly use the provided array values rather than a continuous range.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider availableValues={[10, 20, 50, 55, 65, 80]} />
`}
>
    <UIKitExamples.SliderExample availableValues={[10, 20, 50, 55, 65, 80]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider availableValues={[10, 20, 50, 55, 65, 80]} />
```

<!--/GITHUB_BLOCK-->

## Tooltip

The `hasTooltip` property is a boolean attribute. It toggles displaying the tooltip that shows the current value as the user is moving with the slider.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider hasTooltip={true} />
`}
>
    <UIKitExamples.SliderExample hasTooltip={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider hasTooltip={true} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name                                 | Description                                                                                                                                                                   |                         Type                         | Default |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------: | :-----: |
| apiRef                               | Ref to the `Slider` focus and blur properties                                                                                                                                 |                `RefObject<SliderRef>`                |         |
| autoFocus                            | The control's `autofocus` attribute                                                                                                                                           |                      `boolean`                       |         |
| [availableValues](#available-values) | Specifies the array of available values for the slider                                                                                                                        |                      `number[]`                      |         |
| className                            | The control's wrapper class name                                                                                                                                              |                       `string`                       |         |
| debounceDelay                        | Specifies the delay (in milliseconds) before the processing function is called                                                                                                |                       `number`                       |   `0`   |
| [defaultValue](#slider-variants)     | The control's default value, used when the component is uncontrolled                                                                                                          |             `number` `[number, number]`              |   `0`   |
| [disabled](#disabled)                | Shows that the user cannot work with the control                                                                                                                              |                      `boolean`                       | `false` |
| [errorMessage](#error)               | Error message to display                                                                                                                                                      |                       `string`                       |         |
| [hasTooltip](#tooltip)               | Toggles displaying a tooltip with the current value                                                                                                                           |                      `boolean`                       | `false` |
| [marksCount](#marks)                 | Number of text marks under the slider that split the range into equal parts. The available values are 2 or higher. This property will be ignored if `availablevalues` is set. |                       `number`                       |   `2`   |
| [max](#min-and-max-value)            | The maximum value of the component                                                                                                                                            |                       `number`                       |  `100`  |
| [min](#min-and-max-value)            | The minimum value of the component                                                                                                                                            |                       `number`                       |   `0`   |
| onBlur                               | Fires when the control loses focus. Provides a focus event as a callback argument                                                                                             | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| onUpdate                             | Fires when the user changes the slider value. Provides a change event as a callback argument                                                                                  |   `((value: number \| [number, number]) => void)`    |         |
| onUpdateComplete                     | Fires when `ontouchend` or `onmouseup` is triggered. Provides a change event as a callback argument                                                                           |   `((value: number \| [number, number]) => void)`    |         |
| onFocus                              | Fires when the control gets focus. Provides a focus event as a callback argument                                                                                              | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| [size](#size)                        | The size of the control                                                                                                                                                       |               `"s"` `"m"` `"l"` `"xl"`               |  `"m"`  |
| [step](#step)                        | Increment to add or subtract on each slider's move. This property will be ignored if `availablevalues` is set.                                                                |                       `number`                       |   `1`   |
| tabIndex                             | The control's `tabIndex` attribute                                                                                                                                            |             `number` `[number, number]`              |         |
| [validationState](#error)            | Validation state                                                                                                                                                              |                     `"invalid"`                      |         |
| [value](#slider-variants)            | The value of the control                                                                                                                                                      |             `number` `[number, number]`              |         |
