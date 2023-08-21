<!--GITHUB_BLOCK-->

# Alert

<!--/GITHUB_BLOCK-->

```tsx
import {Alert} from '@gravity-ui/uikit';
```

## Description

A component that allows you to display some text notification block.

### Theme

`normal` - the main theme (used by default).

`info` - the theme used for any kind of regular information.

`positive` - the theme used for positive information.

`warning` - the theme used for information which needs attention.

`danger` - the theme used for hazard information.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert theme="normal" title="Normal" message="Normal theme" />
<Alert theme="info" title="Info" message="Info theme" />
<Alert theme="positive" title="Positive" message="Positive theme" />
<Alert theme="warning" title="Warning" message="Warning theme" />
<Alert theme="danger" title="Danger" message="Danger theme" />
`}>
    <UIKit.Alert theme="normal" title="Normal" message="Normal theme" />
    <UIKit.Alert theme="info" title="Info" message="Info theme" />
    <UIKit.Alert theme="positive" title="Positive" message="Positive theme" />
    <UIKit.Alert theme="warning" title="Warning" message="Warning theme" />
    <UIKit.Alert theme="danger" title="Danger" message="Danger theme" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert theme="normal" title="Normal" message="Normal theme"/>
<Alert theme="info" title="Info" message="Info theme"/>
<Alert theme="positive" title="Positive" message="Positive theme"/>
<Alert theme="warning" title="Warning" message="Warning theme"/>
<Alert theme="danger" title="Danger" message="Danger theme"/>
```

<!--/GITHUB_BLOCK-->

### View

`filled` - used to adjust the background color of the alert (used by default).

`outlined` - used to adjust the border color of the alert.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert title="Filled" message="Filled view" view="filled" />
<Alert title="Outlined" message="Outlined theme" view="outlined" />
`}
>
    <UIKit.Alert title="Filled" message="Filled view" view="filled" />
    <UIKit.Alert title="Outlined" message="Outlined theme" view="outlined" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Alert title="Filled" message="Filled view" view="filled" />
<Alert title="Outlined" message="Outlined theme" view="outlined" />
```

<!--/GITHUB_BLOCK-->

### Layout

`vertical` - used for direction of content if there is property `actions` with buttons. It shows buttons below text (
used
by default).

`horizontal` - Used for direction of content if there is property `actions` with buttons. It shows buttons on the right
side of text.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<Button>button</Button>} />
<Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<Button>button</Button>} />
`}>
    <UIKit.Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<UIKit.Button>button</UIKit.Button>} />
    <UIKit.Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<UIKit.Button>button</UIKit.Button>} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<Button>button</Button>}/>
<Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<Button>button</Button>}/>
```

<!--/GITHUB_BLOCK-->

### Corners

`rounded` - used fot round corners of alert window (used by default)

`square` - used for square corners of alert window.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert title="Rounded" message="Rounded corners" corners="rounded"  />
<Alert title="Square" message="Square corners" corners="square" />
`}
>
    <UIKit.Alert title="Rounded" message="Rounded corners" corners="rounded"  />
    <UIKit.Alert title="Square" message="Square corners" corners="square" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert title="Rounded" message="Rounded corners" corners="rounded"/>
<Alert title="Square" message="Square corners" corners="square"/>
```

<!--/GITHUB_BLOCK-->

## Alert title

`title` - title of an alert. Override if by Alert.Title component.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert title={<Alert.Title className={'some-class'} text="some text"></Alert.Title>} />
`}
>
    <UIKit.Alert title={<UIKit.Alert.Title className={'some-class'} text="some text"></UIKit.Alert.Title>} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert title={<Alert.Title className={'some-class'} text="some text"></Alert.Title>} />
```

<!--/GITHUB_BLOCK-->

## Alert message

`message` - The message of an alert should completely explain the alert's content.

## Alert onClose

`onClose` - enabled close button and defined function in click to this button.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert onClose={() => alert('Close button pressed')} title="Alert has close" message="Alert has close" />
`}
>
    <UIKit.Alert onClose={() => alert('Close button pressed')} title="Alert has close" message="Alert has close" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert
  onClose={() => alert('Close button pressed')}
  title="Alert has close"
  message="Alert has close"
/>
```

<!--/GITHUB_BLOCK-->

### Align

`baseline` - align used bu default.

`center` - centered all content in vertical direction, useful if for some reason your actions take more space than text
or
needed icon to be in the middle of the card.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert align="baseline" theme="info" title="Baseline" message="Baseline align" actions={<Button>button</Button>} />
<Alert align="center" theme="info" title="Center" message="Center align" actions={<Button>button</Button>} align="center"/>
`}>
    <UIKit.Alert align="baseline" theme="info" title="Baseline" message="Baseline align" actions={<UIKit.Button>button</UIKit.Button>} />
    <UIKit.Alert align="center" theme="info" title="Center" message="Center align" actions={<UIKit.Button>button</UIKit.Button>} align="center"/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert align="vertical" title="Vertical" message="Vertical direction" actions={<Button>button</Button>}/>
<Alert align="horizontal" title="Horizontal" message="Horizontal direction" actions={<Button>button</Button>}/>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name          | Description                                                                  |   Default    |
| :------------ | :--------------------------------------------------------------------------- | :----------: |
| **theme**     | Alert appearance: `"normal"` `"info"` `"positive"` `"warning"` `"dangerous"` |  `"normal"`  |
| **view**      | `"filled"` `"outlined"`                                                      |  `"filled"`  |
| **layout**    | `"vertical"` `"horizontal"`                                                  | `"vertical"` |
| **corners**   | `"rounded"` `"square"`                                                       | `"rounded"`  |
| **title**     | `string`                                                                     |      -       |
| **message**   | `string`                                                                     |      -       |
| **onClose**   | Define function and close button will be appear. `"() => void"`              |              |
| **actions**   | Array of buttons or full custom components. `"ReactNode"` `"AlertAction"`    |      -       |
| **align**     | `"center"` `"baseline"`                                                      | `"baseline"` |
| **style**     | CSSProperties                                                                |      -       |
| **className** | `string`                                                                     |      -       |
| **icon**      | Slot to override default icon. `"ReactNode"`                                 |      -       |
