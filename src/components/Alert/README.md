<!--GITHUB_BLOCK-->

# Alert &middot; [![storybook](https://img.shields.io/badge/Storybook-Alert-3bc935)](https://preview.gravity-ui.com/uikit/?path=/docs/components-feedback-alert--docs)

<!--/GITHUB_BLOCK-->

```tsx
import {Alert} from '@gravity-ui/uikit';
```

### Theme

`normal` - main theme (used by default).

`info` - used for any kind of regular information.

`success` - used for positive information.

`warning` - used for information which needs attention.

`danger` - used for hazard information.

`utility` - used for utility information.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert theme="normal" title="Normal" message="Normal theme" />
<Alert theme="info" title="Info" message="Info theme" />
<Alert theme="success" title="Success" message="Success theme" />
<Alert theme="warning" title="Warning" message="Warning theme" />
<Alert theme="danger" title="Danger" message="Danger theme" />
<Alert theme="utility" title="utility" message="Utility theme" />
`}>
    <UIKit.Alert theme="normal" title="Normal" message="Normal theme" />
    <UIKit.Alert theme="info" title="Info" message="Info theme" />
    <UIKit.Alert theme="success" title="Success" message="Success theme" />
    <UIKit.Alert theme="warning" title="Warning" message="Warning theme" />
    <UIKit.Alert theme="danger" title="Danger" message="Danger theme" />
    <UIKit.Alert theme="utility" title="Utility" message="Utility theme" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert theme="normal" title="Normal" message="Normal theme"/>
<Alert theme="info" title="Info" message="Info theme"/>
<Alert theme="success" title="Success" message="Success theme"/>
<Alert theme="warning" title="Warning" message="Warning theme"/>
<Alert theme="danger" title="Danger" message="Danger theme"/>
<Alert theme="utility" title="Utility" message="Utility theme"/>
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

`vertical` - used to direct users to content if there is property `actions` with buttons. For showing buttons below text (
used
by default).

`horizontal` - used to direct users to content if there is property `actions` with buttons. For showing buttons to the right
of text.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>} />
<Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>} />
`}>
    <UIKit.Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} />
    <UIKit.Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>}/>
<Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>}/>
```

<!--/GITHUB_BLOCK-->

### Corners

`rounded` - used for round corners of alert window (used by default).

`square` - used for squared corners of alert window.

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

`title` - the title of the alert. It has a lower priority than Alert.Title.

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

`message` - message of the alert. It should fully explain the content of the alert.

## Alert onClose

`onClose` - callback function called when a user clicks the alert's close button. When this property is defined, a close button is visible.

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

Determines how content inside the Alert component is vertically aligned.

`baseline` - align used by default.

`center` - content is vertically centered within the Alert component. Useful if actions take up
more space than text,
or if the icon must be in the middle of the card.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert align="baseline" theme="info" title="Baseline" message="Baseline align" actions={<Alert.Action>button</Alert.Action>} />
<Alert align="center" theme="info" title="Center" message="Center align" actions={<Alert.Action>button</Alert.Action>} align="center"/>
`}>
    <UIKit.Alert align="baseline" theme="info" title="Baseline" message="Baseline align" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} />
    <UIKit.Alert align="center" theme="info" title="Center" message="Center align" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} align="center"/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert align="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>}/>
<Alert align="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>}/>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name      | Description                                                                 |                                Type                                |   Default    |
| :-------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------: | :----------: |
| theme     | Alert appearance                                                            | `"normal"` `"info"` `"success"` `"warning"` `"danger"` `"utility"` |  `"normal"`  |
| view      | Enable/disable background color of the alert                                |                      `"filled"` `"outlined"`                       |  `"filled"`  |
| layout    | Used to direct users to content if there is property `actions` with buttons |                    `"vertical"` `"horizontal"`                     | `"vertical"` |
| corners   | Used for round/square corners of the alert window                           |                       `"rounded"` `"square"`                       | `"rounded"`  |
| title     | Title of the alert                                                          |                              `string`                              |              |
| message   | Message of the alert                                                        |                              `string`                              |              |
| onClose   | A callback function called when the user clicks the alert's close button    |                             `Function`                             |              |
| actions   | Array of buttons or full custom components                                  |                 `React.ReactNode` `"AlertAction"`                  |              |
| align     | Determines how content inside the Alert component is vertically aligned     |                      `"center"` `"baseline"`                       | `"baseline"` |
| style     | HTML style attribute                                                        |                       `React.CSSProperties`                        |              |
| className | Name of alert class                                                         |                              `string`                              |              |
| icon      | Override default icon                                                       |                         `React.ReactNode`                          |              |
| qa        | HTML `data-qa` attribute, used in tests.                                    |                              `string`                              |              |
