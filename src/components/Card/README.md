<!--GITHUB_BLOCK-->

# Card

<!--/GITHUB_BLOCK-->

```tsx
import {Card} from '@gravity-ui/uikit';
```

## Description

The Card UI component is a reusable React component that represents a card-like container with customizable styles and functionality. It is used to display information or content in a visually appealing and organized manner.

## Appearance

Label can be displayed with multiple styled combination

- theme (`normal`, `info`, `positive`, `warning`, `danger`)
- type (`selection`, `action`, `container`)
- view (`outlined`, `clear`) or (`outlined`, `filled`, `raised`) depends on `type` parameter

## Theme

This parameter is used to specify the theme style of the card. It determines the color scheme and visual appearance of the card.

By specifying different theme values, you can customize the visual appearance of the Card component to match the desired style and purpose.

- `normal` - represents the normal/default theme of the card.
- `info` - represents the theme for displaying informational content.
- `positive` - represents the theme for displaying positive/affirmative content.
- `warning` - represents the theme for displaying warning or cautionary content.
- `danger` - represents the theme for displaying content related to danger or critical situations.

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

<Card style={style} theme="normal" size="l">Normal</UIKit.Card>
<Card style={style} theme="info" size="l">Info</UIKit.Card>
<Card style={style} theme="positive" size="l">Positive</UIKit.Card>
<Card style={style} theme="warning" size="l">Warning</UIKit.Card>
<Card style={style} theme="danger" size="l">Danger</UIKit.Card>
`}>

    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="normal" size="l">Normal</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="info" size="l">Info</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="positive" size="l">Positive</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="warning" size="l">Warning</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="danger" size="l">Danger</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## Type

This parameter is used to define the type of the Card component. It allows you to customize the appearance and behavior of the card.

- `container` - represents a card that acts as a container for other elements. It provides a structured layout for content.
- `action` - represents a card with an interactive element, such as a button, that triggers an action when clicked.
- `selection` - represents a card that can be selected or clicked to perform a specific action.

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

    <Card style={style} view="outlined" type="container" size="l">Container</UIKit.Card>
    <Card style={style} view="outlined" type="action" size="l">action with onClick</UIKit.Card>
    <Card style={style} view="outlined" type="selection" size="l">Selection</UIKit.Card>
`}>
    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="container" size="l">Container</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="action" onClick={() => alert(':wave: hey')} size="l">action with onClick</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="selection" size="l">Selection</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## View

This parameter is used to specify the view or layout style of the Card. It allows you to customize the appearance and arrangement of the card content.

- `clear`: no style will be applied.
- `outlined`: applies thin border to highlight card content.
- `filed`: fill in the card content.
- `raised`: applies a shadow to slightly lift the container.

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

    <Card style={style} view="clear" type="container" size="l">Container</UIKit.Card>
    <Card style={style} view="outlined" type="container" size="l">action with onClick</UIKit.Card>
    <Card style={style} view="filed" type="container" size="l">Selection</UIKit.Card>
    <Card style={style} view="raised" type="container" size="l">Selection</UIKit.Card>
`}>
    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="clear" type="container" size="l">Container</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="container" size="l">action with onClick</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="filed" type="container" size="l">Selection</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="raised" type="container" size="l">Selection</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## Properties

| Name      | Description                                                         | Type        | Default       |
| :-------- | :------------------------------------------------------------------ | ----------- | :------------ |
| children  | Card's content                                                      | `ReactNode` |               |
| type      | Card's type affects on available properties                         | `string`    | `"container"` |
| view      | Available for `type`: `"container"` and `"selection"`               | `string`    | `"outlined"`  |
| theme     | Card's base color. Available for `type`: `"container"`              | `string`    | `"normal"`    |
| size      | Card's size affects on available properties                         | `string`    | `"m"`         |
| className | CSS class                                                           | `string`    |               |
| onClick   | Card click handler. Available for `type`: `"selection"`, `"action"` | `Function`  |               |
| selected  | Selected card. Available for type: `"selection"`                    | `Boolean`   |               |
| disabled  | Disabled card. Available for type: `"selection"`, `"action"`        | `Boolean`   |               |
