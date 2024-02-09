<!--GITHUB_BLOCK-->

# Slider

<!--/GITHUB_BLOCK-->

```tsx
import {Slider} from '@gravity-ui/uikit';
```

Slider is a customizable and responsive React component that allows users to select a single value or a range of values from a specified data set.

## Properties

| Name             | Description                                                                                                                                       |                         Type                         | Default |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------: | :-----: |
| apiRef           | Ref to Slider's component props of focus and blur                                                                                                 |                `RefObject<SliderRef>`                |         |
| autoFocus        | The control's `autofocus` attribute                                                                                                               |                      `boolean`                       |         |
| availableValues  | Specifies the array of available values for the slider                                                                                            |                      `number[]`                      |         |
| className        | The control's wrapper class name                                                                                                                  |                       `string`                       |         |
| debounceDelay    | Specifies the delay (in milliseconds) before the processing function is called                                                                    |                       `number`                       |   `0`   |
| defaultValue     | The control's default value, used when the component is not controlled                                                                            |             `number` `[number, number]`              |   `0`   |
| disabled         | Indicates that the user cannot interact with the control                                                                                          |                      `boolean`                       | `false` |
| errorMessage     | Text of an error to show                                                                                                                          |                       `string`                       |         |
| hasTooltip       | Show tooltip with current value of component or not                                                                                               |                      `boolean`                       | `false` |
| marksCount       | Amount of text marks under the slider. Split whole range on equal parts. Could be set >=2. This prop will be ignored if `availablevalues` is set. |                       `number`                       |   `2`   |
| max              | The maximum value of the component.                                                                                                               |                       `number`                       |  `100`  |
| min              | The maximum value of the component.                                                                                                               |                       `number`                       |   `0`   |
| onBlur           | Fires when the control lost focus. Provides focus event as a callback's argument                                                                  | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| onChange         | Fires when the slider’s value is changed by the user. Provides change event as an callback's argument                                             |   `((value: number \| [number, number]) => void)`    |         |
| onChangeComplete | Fires when ontouchend or onmouseup is triggered. Provides change event as an callback's argument                                                  |   `((value: number \| [number, number]) => void)`    |         |
| onFocus          | Fires when the control gets focus. Provides focus event as a callback's argument                                                                  | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |         |
| size             | The size of the control                                                                                                                           |               `"s"` `"m"` `"l"` `"xl"`               |  `"m"`  |
| step             | Value to be added or subtracted on each step the slider makes. This prop will be ignored if `availablevalues` is set.                             |                       `number`                       |   `1`   |
| tabIndex         | The control's `tabIndex` attribute                                                                                                                |             `number` `[number, number]`              |         |
| validationState  | Validation state                                                                                                                                  |                     `"invalid"`                      |         |
| value            | The value of the control                                                                                                                          |             `number` `[number, number]`              |         |
