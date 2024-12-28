<!--GITHUB_BLOCK-->

# Popover

<!--/GITHUB_BLOCK-->

```tsx
import {Popover} from '@gravity-ui/uikit';
```

This component allows you to add a section with some pop-up content.

### Simple usage

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover content="Tooltip">Open a tooltip</Popover>
`}
>
    <UIKit.Popover content="Tooltip">Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover content="Tooltip">Open a tooltip</Popover>
```

<!--/GITHUB_BLOCK-->

### With jsx content

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover content={<Loader size="s" />}>Open a tooltip</Popover>
`}
>
    <UIKit.Popover content={<UIKit.Loader size="s" />}>Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover content={<Loader size="s" />}>Open a tooltip</Popover>
```

<!--/GITHUB_BLOCK-->

### With html content

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover
  htmlContent={
    'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>'
  }
>
  Open a tooltip
</Popover>
`}
>
    <UIKit.Popover
      htmlContent={
        'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>'
      }
    >Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  htmlContent={
    'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>'
  }
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

### With links

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover
  links={[
    {
      text: 'Link with a href',
      href: 'https://ya.ru',
    },
    {
      text: 'Link with an onClick handler',
      onClick: () => alert('The link is clicked'),
    },
  ]}
>
  Open a tooltip
</Popover>
`}
>
    <UIKit.Popover
      links={[{text: 'Link with a href', href: 'https://ya.ru',},{text: 'Link with an onClick handler', onClick: () => alert('The link is clicked'),},]}
    >Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  links={[
    {
      text: 'Link with a href',
      href: 'https://ya.ru',
    },
    {
      text: 'Link with an onClick handler',
      onClick: () => alert('The link is clicked'),
    },
  ]}
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

### With action button

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover
  tooltipActionButton={{
    text: 'Action',
    onClick: () => console.log('Action button was clicked'),
  }}
>
  Open a tooltip
</Popover>
`}
>
    <UIKit.Popover
      tooltipActionButton={{
        text: 'Action',
        onClick: () => console.log('Action button was clicked'),
      }}
    >Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  tooltipActionButton={{
    text: 'Action',
    onClick: () => console.log('Action button was clicked'),
  }}
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

### With automatic closing when the cursor is outside for `delayClosing`

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover delayClosing={500}>Open a tooltip</Popover>
`}
>
    <UIKit.Popover delayClosing={500}>Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  tooltipActionButton={{
    text: 'Action',
    onClick: () => console.log('Action button was clicked'),
  }}
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

## Instance usage

```tsx
import {Popover, PopoverInstanceProps} from '@gravity-ui/uikit';

const popoverRef = useRef<PopoverInstanceProps>();

const open = () => {
  popoverRef.current?.openTooltip();
};

const close = () => {
  popoverRef.current?.closeTooltip();
};

<>
  <Popover content="Tooltip" ref={popoverRef} />
  <button onClick={open}>Open a tooltip</button>
  <button onClick={close}>Close a tooltip</button>
</>;
```

### Instance properties

| Name         | Description                     |    Type    | Default |
| ------------ | ------------------------------- | :--------: | :-----: |
| openTooltip  | Opens the `() => void` tooltip  | `Function` |         |
| closeTooltip | Closes the `() => void` tooltip | `Function` |         |

## Properties

| Name                    | Description                                                                                                                                                                                                                                                                            |                       Type                       |        Default        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------: | :-------------------: |
| anchorRef               | `Popup` anchor element that can also be `VirtualElement`                                                                                                                                                                                                                               |  [`PopupAnchorRef`](../Popup/README.md#anchor)   |                       |
| autoclosable            | Enables or disables closing the tooltip automatically when the cursor moves outside it                                                                                                                                                                                                 |                    `boolean`                     |        `true`         |
| autoFocus               | If true, the focus will be transferred to the first element when the popover opens                                                                                                                                                                                                     |                    `boolean`                     |                       |
| behavior                | Tooltip open or close behavior with `openOnHover`. `"immediate"`: without any delay, `"delayed"`: with 300ms delay for opening and closing, `"delayedClosing"`: with 300ms delay only for closing. This property will not apply in case `delayOpening` or `delayClosing` are provided. |   `"immediate"` `"delayed"` `"delayedClosing"`   |      `"delayed"`      |
| children                | Tooltip's trigger content over which the tooltip is shown. It can either be the `(triggerProps: `[`TriggerProps`](#triggerprops))` => React.ReactNode` function or `ReactNode`.                                                                                                        |           `React.ReactNode` `Function`           |                       |
| className               | CSS class for the control                                                                                                                                                                                                                                                              |                     `string`                     |                       |
| content                 | Tooltip content                                                                                                                                                                                                                                                                        |                `React.ReactNode`                 |                       |
| contentClassName        | CSS class for `content`                                                                                                                                                                                                                                                                |                     `string`                     |                       |
| delayClosing            | Custom delay for closing if `autoclosable`                                                                                                                                                                                                                                             |                     `number`                     |                       |
| delayOpening            | Custom delay for opening if `openOnHover`                                                                                                                                                                                                                                              |                     `number`                     |                       |
| disabled                | Disables open state changes                                                                                                                                                                                                                                                            |                    `boolean`                     |        `false`        |
| disablePortal           | Disable rendering of the popover in a portal                                                                                                                                                                                                                                           |                    `boolean`                     |        `false`        |
| focusTrap               | Prevents focus from leaving the popover while open                                                                                                                                                                                                                                     |                    `boolean`                     |                       |
| forceLinksAppearance    | Forces styles for links                                                                                                                                                                                                                                                                |                    `boolean`                     |        `false`        |
| hasArrow                | Enables or disables a tooltip arrow                                                                                                                                                                                                                                                    |                    `boolean`                     |        `true`         |
| hasClose                | Enables or disables a close button for a tooltip                                                                                                                                                                                                                                       |                    `boolean`                     |        `false`        |
| htmlContent             | Tooltip's HTML content to render via `dangerouslySetInnerHTML`                                                                                                                                                                                                                         |                     `string`                     |                       |
| initialOpen             | Enables or disables the tooltip initial opening                                                                                                                                                                                                                                        |                    `boolean`                     |        `false`        |
| links                   | Links under the content                                                                                                                                                                                                                                                                |         `[`[`LinkProps`](#linksprops)`]`         |                       |
| offset                  | Control's offset                                                                                                                                                                                                                                                                       |          `{top: number, left: number}`           |                       |
| onClick                 | Anchor click callback: `(event: React.MouseEvent) => boolean \| Promise`. If the function returns `true, the tooltip will be open; otherwise, it won't open.                                                                                                                           |                    `Function`                    |                       |
| onCloseClick            | Close button click handler: `(event: React.MouseEvent) => void`                                                                                                                                                                                                                        |                    `Function`                    |                       |
| onOpenChange            | Open state change handler: `(open: boolean) => void`. Might be useful for the delayed rendering of the tooltip content.                                                                                                                                                                |                    `Function`                    |                       |
| openOnHover             | Enables or disables opening the tooltip when hovered                                                                                                                                                                                                                                   |                    `boolean`                     |        `true`         |
| placement               | `Popup` placement                                                                                                                                                                                                                                                                      | [`PopupPlacement`](../Popup/README.md#placement) | `["right", "bottom"]` |
| qa                      | `data-qa` HTML attribute, used for testing                                                                                                                                                                                                                                             |                     `string`                     |                       |
| restoreFocusRef         | Focused element when the popover closes                                                                                                                                                                                                                                                |                `React.RefObject`                 |                       |
| size                    | Tooltip size                                                                                                                                                                                                                                                                           |                   `"s"` `"l"`                    |         `"s"`         |
| strategy                | `Floating UI` positioning [strategy](https://floating-ui.com/docs/computePosition#strategy)                                                                                                                                                                                            |              `"absolute"` `"fixed"`              |     `"absolute"`      |
| title                   | Tooltip title                                                                                                                                                                                                                                                                          |                     `string`                     |                       |
| theme                   | Tooltip theme                                                                                                                                                                                                                                                                          |      `"info"` `"special"` `"announcement"`       |       `"info"`        |
| tooltipActionButton     | Action button properties. The button won't be rendered without it.                                                                                                                                                                                                                     |   [`PopoverButtonProps`](#popoverbuttonprops)    |                       |
| tooltipCancelButton     | Cancel button properties. The button won't be rendered without it.                                                                                                                                                                                                                     |   [`PopoverButtonProps`](#popoverbuttonprops)    |                       |
| tooltipClassName        | Tooltip CSS class                                                                                                                                                                                                                                                                      |                     `string`                     |                       |
| tooltipContentClassName | Tooltip content CSS class                                                                                                                                                                                                                                                              |                     `string`                     |                       |
| tooltipOffset           | Tooltip offset relative to the control                                                                                                                                                                                                                                                 |                `[number, number]`                |                       |
| tooltipId               | `id` HTML attribute of the popover                                                                                                                                                                                                                                                     |                     `string`                     |                       |

### TriggerProps

| Name      | Description            |             Type             | Default |
| --------- | ---------------------- | :--------------------------: | :-----: |
| onClick   | Click event handler    |  `React.MouseEventHandler`   |         |
| onKeyDown | Keyboard event handler | `React.KeyboardEventHandler` |         |

### LinkProps

| Name    | Description                                                                 |         Type         | Default |
| ------- | --------------------------------------------------------------------------- | :------------------: | :-----: |
| text    | Link text                                                                   |       `string`       |         |
| href    | Link href                                                                   |       `string`       |         |
| target  | Where link should be opened                                                 | `"_self"` `"_blank"` |         |
| onClick | Click event handler: `(event: React.MouseEvent<HTMLAnchorElement>) => void` |      `Function`      |         |

### PopoverButtonProps

| Name    | Description                                                                  |    Type    | Default |
| ------- | ---------------------------------------------------------------------------- | :--------: | :-----: |
| text    | Button text                                                                  |  `string`  |         |
| onClick | Button click handler: `(event: React.MouseEvent<HTMLButtonElement>) => void` | `Function` |         |

| Name                    | Description       |
| :---------------------- | :---------------- |
| `--g-popover-padding`   | Content padding   |
| `--g-popover-max-width` | Content max width |
