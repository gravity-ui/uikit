## Popover

Block with pop-up content

### PropTypes

Extends [`QAProps`](../types.ts).

| Property             | Type               | Required | Values                                   | Default             | Description                                                                                                                                                                    |
| :------------------- | :----------------- | :------- | :--------------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initialOpen          | `boolean`          |          |                                          | false               | Whether the tooltip initially opened                                                                                                                                           |
| disabled             | `boolean`          |          |                                          | false               | Disables open state changes                                                                                                                                                    |
| autoclosable         | `Boolean`          |          |                                          | `true`              | Whether tooltip should automatically close when the cursor is outside                                                                                                          |
| openOnHover          | `Boolean`          |          |                                          | `true`              | Whether tooltip should open on hover                                                                                                                                           |
| offset               | `Object`           |          |                                          |                     | Control's offset <br/> `{ top: 0, left: 0 }`                                                                                                                                   |
| placement            | `Array`            |          |                                          | [`right`, `bottom`] | Tooltip's placement                                                                                                                                                            |
| hasArrow             | `Boolean`          |          |                                          | `true`              | Whether tooltip has a tail                                                                                                                                                     |
| hasClose             | `Boolean`          |          |                                          | `false`             | Whether tooltip has a close button                                                                                                                                             |
| theme                | `String`           |          | `info`, `special`, `announcement`        | `info`              | Tooltip's theme                                                                                                                                                                |
| size                 | `String`           |          | `s`, `l`                                 | `s`                 | Tooltip's size                                                                                                                                                                |
| behavior             | `TooltipBehavior`  |          | `Immediate`, `Delayed`, `DelayedClosing` | `DelayedClosing`    | Tooltip open/close behaviour when `openOnHover` (without a delay, with delay, with delay only when closing). Won't be applied if `delayOpening` or `delayClosing` are provided |
| delayOpening         | `Number`           |          |                                          | `0`                 | Tooltip's opening delay if `openOnHover`. We recommend to use `behavior`                                                                                                       |
| delayClosing         | `Number`           |          |                                          | `300`               | Tooltip's closing delay if `autoclosable`. We recommend to use `behavior`                                                                                                      |
| anchorRef            | `React.RefObject`  |          |                                          |                     | Custom anchor. Disables `openByHover` and `onClick`.                                                                                                                           |
| children             | `ReactNode`        |          |                                          |                     | Content, over which tooltip is rendered                                                                                                                                        |
| title                | `String`           |          |                                          |                     | Tooltip's title                                                                                                                                                                |
| content              | `ReactNode`        |          |                                          |                     | Tooltip's content                                                                                                                                                              |
| htmlContent          | `String`           |          |                                          |                     | Tooltip's html content (`dangerouslySetInnerHTML` will be used for rendering)                                                                                                  |
| contentClassName     | `String`           |          |                                          |                     | Tooltip's content css class                                                                                                                                                    |
| links                | `Array`            |          |                                          | []                  | Links under the content <br/> `{ text: 'Link 1', href: 'https://yandex.ru'}` or <br/> `{ text: 'Link 2', onClick: () => callbackOnLinkClick() }`                               |
| forceLinksAppearance | `boolean`          |          |                                          | true                | Force styles for links                                                                                                                                                         |
| tooltipActionButton  | `Object`           |          |                                          |                     | Action button properties (the button won't be rendered without it) <br/> `{ text: 'Button', onClick: () => callbackOnClick() }`                                                |
| tooltipCancelButton  | `Object`           |          |                                          |                     | Cancel button properties (the button won't be rendered without it) <br/> `{ text: 'Button', onClick: () => callbackOnClick() }`                                                |
| tooltipOffset        | `[Number, Number]` |          |                                          |                     | Tooltip's offset related to the control                                                                                                                                        |
| tooltipClassName     | `String`           |          |                                          |                     | Tooltip's css class                                                                                                                                                            |
| className            | `String`           |          |                                          |                     | Control's css class                                                                                                                                                            |
| onClick              | `Function`         |          |                                          |                     | Anchor click callback. If the function returns `true', the tooltip will be open, otherwise it won't be opened.                                                                 |
| onOpenChange         | `Function`         |          |                                          |                     | Open state change callback. Can be useful for delayed tooltip's content rendering.                                                                                             |
| onCloseClick         | `Function`         |          |                                          |                     | Close button click handler                                                                                                                                                     |

### Instance properties

| Property     | Type       | Description        |
| :----------- | :--------- | :----------------- |
| openTooltip  | `Function` | Opens the tooltip  |
| closeTooltip | `Function` | Closes the tooltip |

Usage:

```jsx
const popoverRef = useRef<PopoverInstanceProps>();

const open = () => {
    popoverRef.current?.openTooltip();
}

const close = () => {
    popoverRef.current?.closeTooltip();
}

<>
    <Popover content="Tooltip" ref={popoverRef} />
    <button onClick={open}>Open a tooltip</button>
    <button onClick={close}>Close a tooltip</button>
</>
```

### Examples

Simple tooltip

```js
<Popover content="Tooltip">Open a tooltip</Popover>
```

Tooltip with jsx content:

```js
<Popover content={<Loader size="s" />}>Open a tooltip</Popover>
```

Tooltip with html content, links, action button and automatic closing when cursor is outside for `delayClosing`:

```jsx
<Popover
  delayClosing={500}
  offset={{
    top: 2,
  }}
  links={[
    {
      text: 'Link with a href',
      href: 'https://yandex.ru',
    },
    {
      text: 'Link with an onClick handler',
      onClick: () => alert('The link is clicked'),
    },
  ]}
  placement={['right', 'bottom']}
  title="Simple tooltip"
  htmlContent={
    'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>'
  }
  tooltipActionButton={{
    text: 'Action',
    onClick: () => console.log('Action button was clicked'),
  }}
>
  <div>Click me</div>
</Popover>
```

| Note, that it's better to use `content` for simple text
