<!--GITHUB_BLOCK-->

# Slider

<!--/GITHUB_BLOCK-->

```tsx
import {Slider} from '@gravity-ui/uikit';
```

The slider is a customizable and responsive React component that allows users to select a single value or a range of values from a specified data set.

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

The `marks` property is utilized in `Slider` component to specify visual markers along the slider that help to indicate various points between the minimum and maximum value. This property enhances the usability and visual interface of the slider, especially for denoting specific intervals. By default it is 2 (`min` and `max` values). You can use it in 2 different ways:

- the amount of visual markers along the slider
<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={11} />
`}
>
    <UIKitExamples.SliderExample marks={11} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={11} />
```

<!--/GITHUB_BLOCK-->

- the array of marker values along the slider

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={[0, 50, 100]} />
`}
>
    <UIKitExamples.SliderExample marks={[0, 50, 100]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={[0, 50, 100]} />
```

<!--/GITHUB_BLOCK-->

`0` or empty array `[]` value in `marks` property hide all marks from `Slider`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={0} />
`}
>
    <UIKitExamples.SliderExample marks={0} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={0} />
```

<!--/GITHUB_BLOCK-->

> The mark value is available for selection, even if it does not match the `step` value condition

You are able to change display format of marks values by using `marksFormat` property.

#### Define available values

You can set `step` property to `null` to define a set of specific values that the slider can handle, as opposed to a continuous range. This is particularly useful when only certain discrete values are valid for selection. In that case properties `min`, `max` and `marks` allows specifying an array of numbers representing the exact values that users are allowed to select using the `Slider`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={[10, 20, 50, 55, 65, 80]} step={null}/>
`}
>
    <UIKitExamples.SliderExample marks={[10, 20, 50, 55, 65, 80]} step={null}/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={[10, 20, 50, 55, 65, 80]} step={null} />
```

<!--/GITHUB_BLOCK-->

## Start point

The `startPoint` property allows you to set the start point of the track. It uses the minimal `Slider` value by default. It will be ignored if you use `Slider` with range values or if you set `inverted` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider startPoint={50} />
`}
>
    <UIKitExamples.SliderExample startPoint={50} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider startPoint={50} />
```

<!--/GITHUB_BLOCK-->

## Inverted

The `inverted` property allows you to set the inverted view of the `Slider`'s track.
By default (of `false`) `Slider` shows interval from `min` to handle.
If `true` then it indicates interval from pin to `max`.
Only for single `Slider`. Property `startPoint` will be ignored.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider inverted />
`}
>
    <UIKitExamples.SliderExample inverted />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider inverted />
```

<!--/GITHUB_BLOCK-->

## Tooltip

The `tooltipDisplay` property is used in `Slider` component to control the display behaviour of a tooltip that shows the current value as the user interacts with the slider. `auto` value shows tooltip only when `Slider`'s handle are hovered by cursor or focused.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider tooltipDisplay="on" />
`}
>
    <UIKitExamples.SliderExample tooltipDisplay="on" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider tooltipDisplay="on" />
```

<!--/GITHUB_BLOCK-->

You are able to change display format of tooltip value by using `tooltipFormat` property. If you don't specify `tooltipformat` then will be used `marksFormat` to display the value in tooltip.

## Properties

| Name                             | Description                                                                                                                                                                              |                         Type                         | Default |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------: | :-----: |
| apiRef                           | Ref to Slider's component props of focus and blur                                                                                                                                        |                `RefObject<SliderRef>`                |         |
| autoFocus                        | The control's `autofocus` attribute                                                                                                                                                      |                      `boolean`                       |         |
| className                        | The control's wrapper class name                                                                                                                                                         |                       `string`                       |         |
| [defaultValue](#slider-variants) | The control's default value, used when the component is not controlled. It uses the minimal `Slider` value by default.                                                                   |             `number` `[number, number]`              |         |
| [disabled](#disabled)            | Indicates that the user cannot interact with the control                                                                                                                                 |                      `boolean`                       | `false` |
| [errorMessage](#error)           | Text of an error to show                                                                                                                                                                 |                       `string`                       |         |
| [marks](#marks)                  | Text marks under the slider. Could be set to the amount of the slider's marks, or could be set to the array of values which should have marks. `0` or empty array value hides all marks. |                 `number` `number[]`                  |   `2`   |
| [marksFormat](#marks)            | Formatter for the mark's displayed value                                                                                                                                                 |             `(value: number) => string`              |         |
| [max](#min-and-max-value)        | The maximum value of the component.                                                                                                                                                      |                       `number`                       |  `100`  |
| [min](#min-and-max-value)        | The minimum value of the component.                                                                                                                                                      |                       `number`                       |   `0`   |
| onBlur                           | Fires when the control lost focus. Provides focus event as a callback's argument                                                                                                         | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| onUpdate                         | Fires when the slider’s value is changed by the user. Provides change event as an callback's argument                                                                                    |   `((value: number \| [number, number]) => void)`    |         |
| onUpdateComplete                 | Fires when ontouchend or onmouseup is triggered. Provides change event as an callback's argument                                                                                         |   `((value: number \| [number, number]) => void)`    |         |
| onFocus                          | Fires when the control gets focus. Provides focus event as a callback's argument                                                                                                         | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| [size](#size)                    | The size of the control                                                                                                                                                                  |               `"s"` `"m"` `"l"` `"xl"`               |  `"m"`  |
| [step](#step)                    | Value to be added or subtracted on each step the slider makes. Can be set to `null` to make `marks` as steps.                                                                            |                   `number` `null`                    |   `1`   |
| [startPoint](#start-point)       | Start point of the track. Ignored for range slider and for inverted slider.                                                                                                              |                       `number`                       |         |
| [inverted](#inverted)            | Slider with inverted track (from handle to `max`).                                                                                                                                       |                      `boolean`                       |         |
| tabIndex                         | The control's `tabIndex` attribute                                                                                                                                                       |             `number` `[number, number]`              |         |
| [tooltipDisplay](#tooltip)       | The tooltip's display behaviour                                                                                                                                                          |                  `off` `on` `auto`                   |  `off`  |
| [tooltipFormat](#tooltip)        | Formatter for the tooltip's displayed value. Uses `marksFormat` if not set                                                                                                               |             `(value: number) => string`              |         |
| [validationState](#error)        | Validation state                                                                                                                                                                         |                     `"invalid"`                      |         |
| [value](#slider-variants)        | The value of the control                                                                                                                                                                 |             `number` `[number, number]`              |         |
