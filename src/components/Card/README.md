<!--GITHUB_BLOCK-->

# Card

<!--/GITHUB_BLOCK-->

```tsx
import {Card} from '@gravity-ui/uikit';
```

## Description

`Card` is a reusable React component that basically is a card-like container with customizable styles and features. It is used to display information or content in a visually appealing and well-organized manner.

## Appearance

`Card` can be displayed with multiple style combinations:

- `theme`: `normal`, `info`, `success`, `warning`, `danger`, or `utility`.
- `type`: `selection`, `action`, or `container`.
- `view`:`outlined` or `clear`, or `outlined`, `filled`, or `raised` (depending on the `type` parameter).

## Theme

This parameter is used to specify the card's theme style. It determines the card's color scheme and appearance.

By specifying different theme values, you can customize the `Card` visual appearance to match your purpose and the style you need.

- `normal`: Normal/default theme of the card.
- `info`: Theme for displaying neutral information.
- `success`: Theme for displaying positive or affirmative content.
- `warning`: Theme for displaying warnings.
- `danger`: Theme for displaying the content related to critical issues or errors.
- `utility`: Theme for displaying useful tips.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
const style = {
    width: '120px';
    height: '120px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
}

<Card style={style} theme="normal" size="l">Normal</Card>
<Card style={style} theme="info" size="l">Info</Card>
<Card style={style} theme="success" size="l">Success</Card>
<Card style={style} theme="warning" size="l">Warning</Card>
<Card style={style} theme="danger" size="l">Danger</Card>
<Card style={style} theme="utility" size="l">Utility</Card>
`}>

    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="normal" size="l">Normal</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="info" size="l">Info</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="success" size="l">Success</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="warning" size="l">Warning</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="danger" size="l">Danger</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="utility" size="l">Utility</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## Type

This parameter is used to define the type of the `Card` component. It allows you to customize the appearance and behavior of the card.

- `container`: Card that acts as a container for other elements. It provides a structured layout for content.
- `action`: Card with an interactive element, such as a button, that triggers an action when clicked.
- `selection`: Card that can be selected or clicked to perform a specific action.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
const style = {
    width: '120px';
    height: '120px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
}

    <Card style={style} view="outlined" type="container" size="l">Container</Card>
    <Card style={style} view="outlined" type="action" size="l">action with onClick</Card>
    <Card style={style} view="outlined" type="selection" size="l">Selection</Card>
`}>
    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="container" size="l">Container</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="action" onClick={() => alert(':wave: hey')} size="l">action with onClick</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="selection" size="l">Selection</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## View

This parameter is used to specify the `Card` view or layout style. It allows you to customize the appearance and arrangement of the card content.

- `clear`: No style.
- `outlined`: Applies a thin border to highlight the card content.
- `filled`: Fills in the card content.
- `raised`: Applies a shadow to slightly lift the container.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
const style = {
    width: '120px';
    height: '120px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
}

    <Card style={style} view="clear" type="container" size="l">Clear</Card>
    <Card style={style} view="outlined" type="container" size="l">Outlined</Card>
    <Card style={style} view="filled" type="container" size="l">Filled</Card>
    <Card style={style} view="raised" type="container" size="l">Raised</Card>
`}>
    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="clear" type="container" size="l">Clear</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="container" size="l">Outlined</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="filled" type="container" size="l">Filled</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="raised" type="container" size="l">Raised</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## Properties

| Name      | Description                                                                                       |    Type     |    Default    |
| :-------- | :------------------------------------------------------------------------------------------------ | :---------: | :-----------: |
| children  | Card content                                                                                      | `ReactNode` |               |
| type      | The `Card` type determines which properties are available.                                        |  `string`   | `"container"` |
| view      | This property is only available for the `"container"` and `"selection"` `type`s.                  |  `string`   | `"outlined"`  |
| theme     | Card's base color. This property is only available for the `"container"` `type`.                  |  `string`   |  `"normal"`   |
| size      | The `Card` size determines which properties are available.                                        |  `string`   |     `"m"`     |
| className | CSS class                                                                                         |  `string`   |               |
| onClick   | Card click handler. This property is only available for the `"selection"` and `"action"` `type`s. | `Function`  |               |
| selected  | Selected card. This property is only available for the `"selection"` `type`.                      |  `Boolean`  |               |
| disabled  | Disabled card. This property is only available for the `"selection"` and `"action"` `type`s.      |  `Boolean`  |               |
| qa        | `data-qa` HTML attribute, used for testing                                                        |  `string`   |               |

## CSS API

| Name                        | Description      |
| :-------------------------- | :--------------- |
| `--g-card-background-color` | Background color |
| `--g-card-border-width`     | Border width     |
| `--g-card-border-color`     | Border color     |
| `--g-card-border-radius`    | Border radius    |
| `--g-card-box-shadow`       | Shadow           |
