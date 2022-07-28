## Popover

Popover component.

### PropTypes

Наследует свойства [`QAProps`](../types.ts).

| Property            | Type               | Required | Values            | Default             | Description                                                                                                                                                               |
| :------------------ | :----------------- | :------- | :---------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children            | `ReactNode`        |          |                   |                     | Component that will trigger popover display                                                                                                                               |
| theme               | `String`           |          | `info`, `special` | `info`              | Popover appearance                                                                                                                                                        |
| placement           | `Array`            |          |                   | [`right`, `bottom`] | Popover placement relative to `children`                                                                                                                                  |
| hasArrow            | `Boolean`          |          |                   | `true`              | Display popover arrow                                                                                                                                                     |
| openOnHover         | `Boolean`          |          |                   | `true`              | Open popover on hover over `children`                                                                                                                                     |
| autoclosable        | `Boolean`          |          |                   | `true`              | Close popover when pointer moves out of component                                                                                                                         |
| behavior            | `TooltipBehavior`  |          |                   | `DelayedClosing`    | Defines timings for open/close popover when `openOnHover` enabled (without delay, with delay, with delay before close). Ignored when `delayOpening` or `delayClosing` set |
| delayOpening        | `Number`           |          |                   | `0`                 | Customize delay before popover open, ignored without `openOnHover`. It is recommended to use `behavior` instead                                                           |
| delayClosing        | `Number`           |          |                   | `300`               | Customize delay before popover close, ignored without `autoclosable`. It is recommended to use `behavior` instead                                                         |
| title               | `String`           |          |                   |                     | Popover title                                                                                                                                                             |
| content             | `ReactNode`        |          |                   |                     | Popover content                                                                                                                                                           |
| contentClassName    | `String`           |          |                   |                     | Class name for popover `content`                                                                                                                                          |
| htmlContent         | `String`           |          |                   |                     | Render raw HTML via `dangerouslySetInnerHTML`                                                                                                                             |
| links               | `Array`            |          |                   | []                  | Links above content, could be <br/> `{ text: 'Link 1', href: 'https://example.com'}` or <br/> `{ text: 'Link 2', onClick: () => onLinkClick() }`                          |
| tooltipActionButton | `Object`           |          |                   |                     | Render button when value is <br/> `{ text: 'Button', onClick: () => onClick() }`                                                                                          |
| tooltipOffset       | `[Number, Number]` |          |                   |                     | Popover offset relative to `children`                                                                                                                                     |
| onClick             | `Function`         |          |                   |                     | Handler for popover `anchor`. Returned boolean value controls popover open state.                                                                                         |
| className           | `String`           |          |                   |                     | Control class name                                                                                                                                                        |
| offset              | `Object`           |          |                   |                     | Control offset <br/> `{ top: 0, left: 0 }`                                                                                                                                |
| anchorRef           | `React.RefObject`  |          |                   |                     | Ref to custom anchor for popover. Disables `openByHover` and `onClick`                                                                                                    |
| onOpenChange        | `Function`         |          |                   |                     | Could be helpful for deffered popover content render                                                                                                                      |

### Examples

Component with rendered raw html (use `content` for plain text) and close on mouse leave after timeout set by `delayClosing`:

```jsx
<Popover
  delayClosing={500}
  offset={{
    top: 2,
  }}
  links={[
    {
      text: 'Lorem ipsum href',
      href: 'https://example.com',
    },
    {
      text: 'Lorem ipsum onClick',
      onClick: () => alert('Lorem ipsum onClick'),
    },
  ]}
  placement={['right', 'bottom']}
  title="Simple tooltip"
  htmlContent={
    '<b>Lorem ipsum</b> dolor sit <a href="https://example.com" target="_blank">amet</a>, at scelerisque suspendisse'
  }
  tooltipActionButton={{
    text: 'Actions',
    onClick: () => console.log('just action happened'),
  }}
>
  <div>click me</div>
</Popover>
```

Popover with JSX component as content:

```js
<Popover icon={{data: iconQuestionMark}} content={<Loader size="s" />}>
  Tooltip
</Popover>
```
