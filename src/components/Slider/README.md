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
    <UIKit.Slider/>
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
    <UIKit.Slider defaultValue={[20, 40]} />
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
    <UIKit.Slider disabled={true} />
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
    <UIKit.Slider validationState={"invalid"} />
    <UIKit.Slider validationState={"invalid"} errorMessage="Error message" />
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
    <UIKit.Slider size="s" />
    <UIKit.Slider size="m" />
    <UIKit.Slider size="l" />
    <UIKit.Slider size="xl" />
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
    <UIKit.Slider min={10} />
    <UIKit.Slider max={50} />
    <UIKit.Slider min={20} max={60} />
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
    <UIKit.Slider step={10} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider step={10} />
```

<!--/GITHUB_BLOCK-->

### Marks

`marksCount` property is utilized in `Slider` component to specify the number of visual markers along the slider that help to indicate various points between the minimum and maximum value. This property enhances the usability and visual interface of the slider, especially for denoting specific intervals. By default it is 2 (min and max values) but you can set the higher value.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marksCount={11} />
`}
>
    <UIKit.Slider marksCount={11} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marksCount={11} />
```

<!--/GITHUB_BLOCK-->

### Available values

The `availableValues` property is used in `Slider` component to define a set of specific values that the slider can handle, as opposed to a continuous range. This property is particularly useful when only certain discrete values are valid for selection. This property allows specifying an array of numbers representing the exact values that users are allowed to select using the `Slider`.

> The `availableValues` property overrides `min`, `max`, `marksCount` and `step` properties if used in conjunction, as the slider directly uses the provided array values instead of a continuous range.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider availableValues={[10, 20, 50, 55, 65, 80]} />
`}
>
    <UIKit.Slider availableValues={[10, 20, 50, 55, 65, 80]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider availableValues={[10, 20, 50, 55, 65, 80]} />
```

<!--/GITHUB_BLOCK-->

## Tooltip

The `hasTooltip` property is a boolean attribute used in `Slider` component to control the display of a tooltip that shows the current value as the user interacts with the slider.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider hasTooltip={true} />
`}
>
    <UIKit.Slider hasTooltip={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider hasTooltip={true} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name                                 | Description                                                                                                                                       |                         Type                         | Default |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------: | :-----: |
| apiRef                               | Ref to Slider's component props of focus and blur                                                                                                 |                `RefObject<SliderRef>`                |         |
| autoFocus                            | The control's `autofocus` attribute                                                                                                               |                      `boolean`                       |         |
| [availableValues](#available-values) | Specifies the array of available values for the slider                                                                                            |                      `number[]`                      |         |
| className                            | The control's wrapper class name                                                                                                                  |                       `string`                       |         |
| debounceDelay                        | Specifies the delay (in milliseconds) before the processing function is called                                                                    |                       `number`                       |   `0`   |
| [defaultValue](#slider-variants)     | The control's default value, used when the component is not controlled                                                                            |             `number` `[number, number]`              |   `0`   |
| [disabled](#disabled)                | Indicates that the user cannot interact with the control                                                                                          |                      `boolean`                       | `false` |
| [errorMessage](#error)               | Text of an error to show                                                                                                                          |                       `string`                       |         |
| [hasTooltip](#tooltip)               | Show tooltip with current value of component or not                                                                                               |                      `boolean`                       | `false` |
| [marksCount](#marks)                 | Amount of text marks under the slider. Split whole range on equal parts. Could be set >=2. This prop will be ignored if `availablevalues` is set. |                       `number`                       |   `2`   |
| [max](#min-and-max-value)            | The maximum value of the component.                                                                                                               |                       `number`                       |  `100`  |
| [min](#min-and-max-value)            | The maximum value of the component.                                                                                                               |                       `number`                       |   `0`   |
| onBlur                               | Fires when the control lost focus. Provides focus event as a callback's argument                                                                  | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| onUpdate                             | Fires when the slider’s value is changed by the user. Provides change event as an callback's argument                                             |   `((value: number \| [number, number]) => void)`    |         |
| onUpdateComplete                     | Fires when ontouchend or onmouseup is triggered. Provides change event as an callback's argument                                                  |   `((value: number \| [number, number]) => void)`    |         |
| onFocus                              | Fires when the control gets focus. Provides focus event as a callback's argument                                                                  | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| [size](#size)                        | The size of the control                                                                                                                           |               `"s"` `"m"` `"l"` `"xl"`               |  `"m"`  |
| [step](#step)                        | Value to be added or subtracted on each step the slider makes. This prop will be ignored if `availablevalues` is set.                             |                       `number`                       |   `1`   |
| tabIndex                             | The control's `tabIndex` attribute                                                                                                                |             `number` `[number, number]`              |         |
| [validationState](#error)            | Validation state                                                                                                                                  |                     `"invalid"`                      |         |
| [value](#slider-variants)            | The value of the control                                                                                                                          |             `number` `[number, number]`              |         |
