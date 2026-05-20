<!--GITHUB_BLOCK-->

# Alert

<!--/GITHUB_BLOCK-->

```tsx
import {Alert} from '@gravity-ui/uikit';
```

### Theme

`normal`: Main theme (used by default).

`info`: Used for any kind of regular information.

`success`: Used for positive information.

`warning`: Used for information that needs attention.

`danger`: Used for critical errors.

`utility`: Used for useful tips.

`clear`: No styles, suitable for usage in other components (for example, as `content` in `Popover`)

<!--SANDBOX
import {Alert} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Alert theme="normal" title="Normal" message="Normal theme" />
            <Alert theme="info" title="Info" message="Info theme" />
            <Alert theme="success" title="Success" message="Success theme" />
            <Alert theme="warning" title="Warning" message="Warning theme" />
            <Alert theme="danger" title="Danger" message="Danger theme" />
            <Alert theme="utility" title="Utility" message="Utility theme" />
            <Alert theme="clear" title="Clear" message="Clear theme" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Alert theme="normal" title="Normal" message="Normal theme"/>
<Alert theme="info" title="Info" message="Info theme"/>
<Alert theme="success" title="Success" message="Success theme"/>
<Alert theme="warning" title="Warning" message="Warning theme"/>
<Alert theme="danger" title="Danger" message="Danger theme"/>
<Alert theme="utility" title="Utility" message="Utility theme"/>
<Alert theme="clear" title="Clear" message="Clear theme"/>
```

<!--/GITHUB_BLOCK-->

### View

`filled`: Used to adjust the background color of the alert (used by default).

`outlined`: Used to adjust the border color of the alert.

<!--SANDBOX
import {Alert} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Alert title="Filled" message="Filled view" view="filled" />
            <Alert title="Outlined" message="Outlined theme" view="outlined" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```
<Alert title="Filled" message="Filled view" view="filled" />
<Alert title="Outlined" message="Outlined theme" view="outlined" />
```

<!--/GITHUB_BLOCK-->

### Layout

`vertical`: Used to direct users to content if there is an `actions` property with buttons. It enables showing buttons below the text (used by default).

`horizontal`: Used to direct users to content if there is an `actions` property with buttons. It enables showing buttons to the right of the text.

<!--SANDBOX
import {Alert} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Alert
                layout="vertical"
                title="Vertical"
                message="Vertical direction"
                actions={<Alert.Action>button</Alert.Action>}
            />
            <Alert
                layout="horizontal"
                title="Horizontal"
                message="Horizontal direction"
                actions={<Alert.Action>button</Alert.Action>}
            />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>}/>
<Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>}/>
```

<!--/GITHUB_BLOCK-->

### Corners

`rounded`: Enables rounded corners of the alert window (used by default).

`square`: Enables squared corners of the alert window.

<!--SANDBOX
import {Alert} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Alert title="Rounded" message="Rounded corners" corners="rounded" />
            <Alert title="Square" message="Square corners" corners="square" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Alert title="Rounded" message="Rounded corners" corners="rounded"/>
<Alert title="Square" message="Square corners" corners="square"/>
```

<!--/GITHUB_BLOCK-->

## Alert title

`title`: Alert title. It has a lower priority than `Alert.Title`.

<!--SANDBOX
import {Alert} from '@gravity-ui/uikit';

export default function () {
    return <Alert title={<Alert.Title className={'some-class'} text="some text" />} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Alert title={<Alert.Title className={'some-class'} text="some text"></Alert.Title>} />
```

<!--/GITHUB_BLOCK-->

## Alert message

`message`: Alert message. It should be meaningful enough to fully explain what the alert is about.

## `onClose`

`onClose`: Callback function called when a user clicks the alert's close button. When this property is defined, the close button will visible.

<!--SANDBOX
import {Alert} from '@gravity-ui/uikit';

export default function () {
    return (
        <Alert
            onClose={() => alert('Close button pressed')}
            title="Alert has close"
            message="Alert has close"
        />
    );
}
SANDBOX-->

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

Determines how the content inside the `Alert` component is vertically aligned.

`baseline`: Default alignment.

`center`: Content is vertically centered within the `Alert` component. It may be useful if actions take up more space than text, or if the icon must be in the middle of the content.

<!--SANDBOX
import {Alert} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Alert
                align="baseline"
                theme="info"
                title="Baseline"
                message="Baseline align"
                actions={<Alert.Action>button</Alert.Action>}
            />
            <Alert
                align="center"
                theme="info"
                title="Center"
                message="Center align"
                actions={<Alert.Action>button</Alert.Action>}
            />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Alert align="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>}/>
<Alert align="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>}/>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name      | Description                                                                 |                                     Type                                     |   Default    |
| :-------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------: | :----------: |
| theme     | Alert appearance                                                            | `"normal"` `"info"` `"success"` `"warning"` `"danger"` `"utility"` `"clear"` |  `"normal"`  |
| view      | Enable/disable background color of the alert                                |                           `"filled"` `"outlined"`                            |  `"filled"`  |
| layout    | Used to direct users to content if there is property `actions` with buttons |                         `"vertical"` `"horizontal"`                          | `"vertical"` |
| corners   | Used for round/square corners of the alert window                           |                            `"rounded"` `"square"`                            | `"rounded"`  |
| title     | Title of the alert                                                          |                                   `string`                                   |              |
| message   | Message of the alert                                                        |                              `React.ReactNode`                               |              |
| onClose   | A callback function called when the user clicks the alert's close button    |                                  `Function`                                  |              |
| actions   | Array of buttons or full custom components                                  |                      `React.ReactNode` `"AlertAction"`                       |              |
| align     | Determines how content inside the Alert component is vertically aligned     |                           `"center"` `"baseline"`                            | `"baseline"` |
| style     | HTML style attribute                                                        |                            `React.CSSProperties`                             |              |
| className | Name of alert class                                                         |                                   `string`                                   |              |
| icon      | Override default icon                                                       |                              `React.ReactNode`                               |              |
| qa        | HTML `data-qa` attribute, used in tests.                                    |                                   `string`                                   |              |
