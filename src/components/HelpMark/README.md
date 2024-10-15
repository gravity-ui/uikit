<!--GITHUB_BLOCK-->

# HelpMark

<!--/GITHUB_BLOCK-->

```tsx
import {HelpMark} from '@gravity-ui/uikit';
```

Component to display help icon with popover

## Examples

Component with rendered raw html and close on mouse leave:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<HelpMark
    placement={['right', 'bottom']}
    buttonProps={{
        onClick: () => console.log('just action happened'),
    }}
>
    <b>Lorem ipsum</b> dolor sit{' '}
    <a href="https://example.com" target="_blank" rel="noreferrer">
        amet
    </a>
    , at scelerisque suspendisse
</HelpMark>
`}
>
<UIKit.HelpMark
    placement={['right', 'bottom']}
    buttonProps={{
        onClick: () => console.log('just action happened'),
    }}
>
    <b>Lorem ipsum</b> dolor sit{' '}
    <a href="https://example.com" target="_blank" rel="noreferrer">
        amet
    </a>
    , at scelerisque suspendisse
</UIKit.HelpMark>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<HelpMark
  placement={['right', 'bottom']}
  buttonProps={{
    onClick: () => console.log('just action happened'),
  }}
>
  <b>Lorem ipsum</b> dolor sit{' '}
  <a href="https://example.com" target="_blank" rel="noreferrer">
    amet
  </a>
  , at scelerisque suspendisse
</HelpMark>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name        | Description                                     |                      Type                       |       Default       |
| :---------- | :---------------------------------------------- | :---------------------------------------------: | :-----------------: |
| className   | Control class name                              |                    `String`                     |                     |
| placement   | Allowed popover positions                       |                     `Array`                     | [`right`, `bottom`] |
| children    | Popover content                                 |                   `ReactNode`                   |                     |
| buttonProps | Set attributes to the underlying button element | `React.ButtonHTMLAttributes<HTMLButtonElement>` |                     |
| buttonRef   | Ref to the underlying button element            |      `React.RefObject<HTMLButtonElement>`       |                     |
