## HelpPopover

Component to display popover with tips

### PropTypes

| Property      | Type        | Required | Values            | Default             | Description                                                                                                                                      |
| :------------ | :---------- | :------- | :---------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| theme         | `String`    |          | `info`, `special` | `info`              | Appearance                                                                                                                                       |
| className     | `String`    |          |                   |                     | Control class name                                                                                                                               |
| placement     | `Array`     |          |                   | [`right`, `bottom`] | Allowed popover positions                                                                                                                        |
| autoclosable  | `Boolean`   |          |                   | `true`              | Close popover when pointer is outside of control                                                                                                 |
| delayClosing  | `Number`    |          |                   | `300`               | Timeout before closing popover (see `autoclosable`)                                                                                              |
| title         | `String`    |          |                   |                     | Popover title                                                                                                                                    |
| content       | `ReactNode` |          |                   |                     | Popover content                                                                                                                                  |
| htmlContent   | `String`    |          |                   |                     | Render HTML via `dangerouslySetInnerHTML`                                                                                                        |
| links         | `Array`     |          |                   | []                  | Links below content, could be <br/> `{ text: 'Link 1', href: 'https://example.com'}` or <br/> `{ text: 'Link 2', onClick: () => onLinkClick() }` |
| tooltipButton | `Object`    |          |                   |                     | Render button with this value <br/> `{ text: 'Button', onClick: () => onClick() }`                                                               |
| offset        | `Object`    |          |                   | `{ left: 4 }`       | Control popup toggle position offset <br/> `{ top: 0, left: 0 }`                                                                                 |

### Examples

Component with rendered raw html (use `content` for plain text) and close on mouse leave after timeout set by `delayClosing`:

```js
<HelpPopover
  autoclosable
  delayClosing={500}
  offset={{
    top: 2,
  }}
  links={[
    {
      text: 'Lorem ipsum href',
      url: 'https://example.com',
    },
    {
      text: 'Lorem ipsum onClick',
      onClick: () => alert('Lorem ipsum onClick'),
    },
  ]}
  to={['right', 'bottom']}
  title="Simple tooltip"
  htmlContent={
    '<b>Lorem ipsum</b> dolor sit <a href="https://example.com" target="_blank">amet</a>, at scelerisque suspendisse'
  }
  tooltipButton={{
    text: 'Actions',
    onClick: () => console.log('just action happened'),
  }}
/>
```

Popover with JSX component as content:

```js
<HelpPopover content={<Spin size="s" view="default" tone="default" progress />} />
```
