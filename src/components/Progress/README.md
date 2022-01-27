[readme](#readme)

Progress
---------------
Progress bar component

### PropTypes
| Property | Type | Required | Default | Description |
|:---|:---|:---:|:---|:---|
| value | `Number` | ✓ |  | Current progress value. Available range is from 0 to 100. If `stack` property is passed `value` is not required and behaves as maxValue. |
| text | `String` |  | `''` | Text inside progress bar |
| theme | `String` |  | `'default'` | Theme is one of `default`, `success`, `warning`, `danger`, `misc` |
| view | `String` |  | `'normal'` | View is one of `normal`, `thin`, `thinnest`. Text of progress bar is displayed in `normal` view only. |
| stack | `Array` | ✓ |  | Configuration of composite progress bar. Not required if a `value` passed.[Details](#stack) |
| colorStops | `Array` |  |  | Theme breakpoints. [Details](#colorstops) |
| colorStopsValue | `Number` |  | value of property `value` | Alternative value of `colorStops`. Available range is from 0 to 100. |
| className    | `String`   |  |  | ClassName of element |
| stackClassName    | `String`   |  |  | ClassName of stack element |


#### stack
Array of objects:

```js
{
    value: number,
    color?: string,
    theme?: string,
    title?: string,
    className?: string,
    content?: ReactNode
}
```

#### colorStops
Array of objects:

```js
{
    theme: string,
    stop?: number = 100
}
```

### Examples

```js
const progress1 = <Progress value={40} text="Completed 80 of 200" theme="success"/>;
const progress2 = <Progress value={20} theme="info" view="thin"/>;
const progress3 = <Progress stack={[{ value: 40, color: 'red' }, { value: 10, color: 'blue' }]}/>
```
