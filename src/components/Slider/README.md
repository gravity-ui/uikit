<!--GITHUB_BLOCK-->

# Slider

<!--/GITHUB_BLOCK-->

```tsx
import {Slider} from '@gravity-ui/uikit';
```

Slider is a customizable and responsive React component that allows users to select a single value or a range of values from a specified data set.

## Slider variants

### Single slider

Slider with one handle to select single value. This Slider is used by default.

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

Slider with two handles to select range. To use this slider you should set `defaultValue` (for uncontrolled) or `value` (for controlled) to array.

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

The state of the `Slider` where you don't want the user to be able to interact with the component.

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

The state of the `Slider` in which you want to indicate incorrect user input. To change `Slider` appearance, use the `validationState` property with the `"invalid"` value. An optional message text can be added via the `errorMessage` property. Error message text will be rendered under the component.

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

To control the size of the `Slider` use the `size` property. Default size is `m`.

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

### Min and max value

The `min` and `max` properties define the limits of the range that the `Slider` component can handle. These properties are essential for setting the boundaries of the selectable values.

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

The `step` property for `Slider` component determines the incremental steps between the min and max value range. It controls how much the value should increase or decrease as the slider is moved.

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

| Name                                        | Description                                                                                                                                                                                     |                         Type                         | Default |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------: | :-----: |
| apiRef                                      | Ref to Slider's component props of focus and blur                                                                                                                                               |                `RefObject<SliderRef>`                |         |
| autoFocus                                   | The control's `autofocus` attribute                                                                                                                                                             |                      `boolean`                       |         |
| [availableValues](#define-available-values) | (deprecated) use `marks` and `step` === null instead. Specifies the array of available values for the slider                                                                                    |                      `number[]`                      |         |
| className                                   | The control's wrapper class name                                                                                                                                                                |                       `string`                       |         |
| debounceDelay                               | (deprecated) use external debouncing. Specifies the delay (in milliseconds) before the processing function is called                                                                            |                       `number`                       |   `0`   |
| [defaultValue](#slider-variants)            | The control's default value, used when the component is not controlled                                                                                                                          |             `number` `[number, number]`              |   `0`   |
| [disabled](#disabled)                       | Indicates that the user cannot interact with the control                                                                                                                                        |                      `boolean`                       | `false` |
| [errorMessage](#error)                      | Text of an error to show                                                                                                                                                                        |                       `string`                       |         |
| [hasTooltip](#tooltip)                      | (deprecated) use `tooltipDisplay` instead. Show tooltip with current value of component or not                                                                                                  |                      `boolean`                       | `false` |
| [marks](#marks)                             | Text marks under the slider. Could be set to the amount of the slider's marks, or could be set to the array of values which should have marks. `0` or empty array value hides all marks.        |                 `number` `number[]`                  |   `2`   |
| [marksCount](#marks)                        | (deprecated) use `marks` instead. Amount of text marks under the slider. Split whole range on equal parts. Could be set >=2. This prop will be ignored if `availablevalues`(deprecated) is set. |                       `number`                       |   `2`   |
| [marksFormat](#marks)                       | Formatter for the mark's displayed value                                                                                                                                                        |             `(value: number) => string`              |         |
| [max](#min-and-max-value)                   | The maximum value of the component.                                                                                                                                                             |                       `number`                       |  `100`  |
| [min](#min-and-max-value)                   | The minimum value of the component.                                                                                                                                                             |                       `number`                       |   `0`   |
| onBlur                                      | Fires when the control lost focus. Provides focus event as a callback's argument                                                                                                                | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| onUpdate                                    | Fires when the slider’s value is changed by the user. Provides change event as an callback's argument                                                                                           |   `((value: number \| [number, number]) => void)`    |         |
| onUpdateComplete                            | Fires when ontouchend or onmouseup is triggered. Provides change event as an callback's argument                                                                                                |   `((value: number \| [number, number]) => void)`    |         |
| onFocus                                     | Fires when the control gets focus. Provides focus event as a callback's argument                                                                                                                | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| [size](#size)                               | The size of the control                                                                                                                                                                         |               `"s"` `"m"` `"l"` `"xl"`               |  `"m"`  |
| [step](#step)                               | Value to be added or subtracted on each step the slider makes. Can be set to `null` to make `marks` as steps. This prop will be ignored if `availablevalues`(deprecated) is set.                |                   `number` `null`                    |   `1`   |
| tabIndex                                    | The control's `tabIndex` attribute                                                                                                                                                              |             `number` `[number, number]`              |         |
| [tooltipDisplay](#tooltip)                  | The tooltip's display behaviour                                                                                                                                                                 |                  `off` `on` `auto`                   |  `off`  |
| [tooltipFormat](#tooltip)                   | Formatter for the tooltip's displayed value. Uses `marksFormat` if not set                                                                                                                      |             `(value: number) => string`              |         |
| [validationState](#error)                   | Validation state                                                                                                                                                                                |                     `"invalid"`                      |         |
| [value](#slider-variants)                   | The value of the control                                                                                                                                                                        |             `number` `[number, number]`              |         |
