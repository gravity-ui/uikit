<!--GITHUB_BLOCK-->

# Popover

<!--/GITHUB_BLOCK-->

```tsx
import {Popover} from '@gravity-ui/uikit';
```

Block with pop-up content

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

### With automatic closing when cursor is outside for `delayClosing`

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
| openTooltip  | Opens the tooltip `() => void`  | `Function` |         |
| closeTooltip | Closes the tooltip `() => void` | `Function` |         |

## Properties

| Name                    | Description                                                                                                                                                                                                                                                          |                       Type                       |        Default        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------: | :-------------------: |
| anchorRef               | `Popper.js` anchor element. Can also be `popper.VirtualElement`.                                                                                                                                                                                                     |  [`PopupAnchorRef`](../Popup/README.md#anchor)   |                       |
| autoclosable            | Whether the tooltip automatically closes when cursor moves outside it                                                                                                                                                                                                |                    `boolean`                     |        `true`         |
| autoFocus               | If true, focus will be transferred to the first element when the popover opens                                                                                                                                                                                       |                    `boolean`                     |                       |
| behavior                | Tooltip open/close behaviour when `openOnHover`. `"immediate"` - without any delay. `"delayed"` - with 300ms delay for opening and closing. `"delayedClosing"` - with 300ms delay only for closing. Won't be applied if `delayOpening` or `delayClosing` are passed. |   `"immediate"` `"delayed"` `"delayedClosing"`   |      `"delayed"`      |
| children                | Tooltip's trigger content over which the tooltip is shown. Can be function `(triggerProps: `[`TriggerProps`](#triggerprops))` => React.ReactNode` or `ReactNode`                                                                                                     |           `React.ReactNode` `Function`           |                       |
| className               | css class for the control                                                                                                                                                                                                                                            |                     `string`                     |                       |
| content                 | Tooltip's content                                                                                                                                                                                                                                                    |                `React.ReactNode`                 |                       |
| contentClassName        | css class for `content`                                                                                                                                                                                                                                              |                     `string`                     |                       |
| delayClosing            | Custom delay for closing if autoclosable                                                                                                                                                                                                                             |                     `number`                     |                       |
| delayOpening            | Custom delay for opening if openOnHover                                                                                                                                                                                                                              |                     `number`                     |                       |
| disabled                | Disables open state changes                                                                                                                                                                                                                                          |                    `boolean`                     |        `false`        |
| disablePortal           | Disable rendering of the popover in a portal                                                                                                                                                                                                                         |                    `boolean`                     |        `false`        |
| focusTrap               | Prevent focus from leaving the popover while open                                                                                                                                                                                                                    |                    `boolean`                     |                       |
| forceLinksAppearance    | Force styles for links                                                                                                                                                                                                                                               |                    `boolean`                     |        `false`        |
| hasArrow                | Whether the tooltip has a tail                                                                                                                                                                                                                                       |                    `boolean`                     |        `true`         |
| hasClose                | Whether the tooltip has a close button                                                                                                                                                                                                                               |                    `boolean`                     |        `false`        |
| htmlContent             | Tooltip's html content to be rendered via `dangerouslySetInnerHTML`                                                                                                                                                                                                  |                     `string`                     |                       |
| initialOpen             | Whether the tooltip initially opened                                                                                                                                                                                                                                 |                    `boolean`                     |        `false`        |
| links                   | Links under the content                                                                                                                                                                                                                                              |         `[`[`LinkProps`](#linksprops)`]`         |                       |
| offset                  | Control's offset                                                                                                                                                                                                                                                     |          `{top: number, left: number}`           |                       |
| onClick                 | Anchor click callback `(event: React.MouseEvent) => boolean \| Promise`. If the function returns `true', the tooltip will be open, otherwise it won't be opened.                                                                                                     |                    `Function`                    |                       |
| onCloseClick            | Close button click handler `(event: React.MouseEvent) => void`                                                                                                                                                                                                       |                    `Function`                    |                       |
| onOpenChange            | Open state change handler `(open: boolean) => void`. Might be useful for the delayed rendering of the tooltip's content.                                                                                                                                             |                    `Function`                    |                       |
| openOnHover             | Whether the tooltip opens when hovered                                                                                                                                                                                                                               |                    `boolean`                     |        `true`         |
| placement               | `Popper.js` placement                                                                                                                                                                                                                                                | [`PopupPlacement`](../Popup/README.md#placement) | `["right", "bottom"]` |
| qa                      | HTML `data-qa` attribute, used in tests                                                                                                                                                                                                                              |                     `string`                     |                       |
| restoreFocusRef         | Focused element when the popover closes                                                                                                                                                                                                                              |                `React.RefObject`                 |                       |
| size                    | Tooltip's size                                                                                                                                                                                                                                                       |                   `"s"` `"l"`                    |         `"s"`         |
| strategy                | `Popper.js` positioning [strategy](https://popper.js.org/docs/v2/constructors/#strategy)                                                                                                                                                                             |              `"absolute"` `"fixed"`              |     `"absolute"`      |
| title                   | Tooltip's title                                                                                                                                                                                                                                                      |                     `string`                     |                       |
| theme                   | Tooltip's theme                                                                                                                                                                                                                                                      |      `"info"` `"special"` `"announcement"`       |       `"info"`        |
| tooltipActionButton     | Action button properties. The button won't be rendered without it.                                                                                                                                                                                                   |   [`PopoverButtonProps`](#popoverbuttonprops)    |                       |
| tooltipCancelButton     | Cancel button properties. The button won't be rendered without it.                                                                                                                                                                                                   |   [`PopoverButtonProps`](#popoverbuttonprops)    |                       |
| tooltipClassName        | Tooltip's css class                                                                                                                                                                                                                                                  |                     `string`                     |                       |
| tooltipContentClassName | Tooltip's content css class                                                                                                                                                                                                                                          |                     `string`                     |                       |
| tooltipOffset           | Tooltip's offset relative to the control                                                                                                                                                                                                                             |                `[number, number]`                |                       |
| tooltipId               | The html id attribute of the popover                                                                                                                                                                                                                                 |                     `string`                     |                       |

### TriggerProps

| Name      | Description            |             Type             | Default |
| --------- | ---------------------- | :--------------------------: | :-----: |
| onClick   | Click event handler    |  `React.MouseEventHandler`   |         |
| onKeyDown | Keyboard event handler | `React.KeyboardEventHandler` |         |

### LinkProps

| Name    | Description                                                                |         Type         | Default |
| ------- | -------------------------------------------------------------------------- | :------------------: | :-----: |
| text    | Link text                                                                  |       `string`       |         |
| href    | Link href                                                                  |       `string`       |         |
| target  | Where link should be opened                                                | `"_self"` `"_blank"` |         |
| onClick | Click event handler `(event: React.MouseEvent<HTMLAnchorElement>) => void` |      `Function`      |         |

### PopoverButtonProps

| Name    | Description                                                                   |    Type    | Default |
| ------- | ----------------------------------------------------------------------------- | :--------: | :-----: |
| text    | Button's text                                                                 |  `string`  |         |
| onClick | Button's click handler `(event: React.MouseEvent<HTMLButtonElement>) => void` | `Function` |         |
