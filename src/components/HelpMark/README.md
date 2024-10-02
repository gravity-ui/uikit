<!--GITHUB_BLOCK-->

# HelpMark

<!--/GITHUB_BLOCK-->

```tsx
import {HelpMark} from '@gravity-ui/uikit';
```

Component to display help icon with popover

## Examples

Component with rendered raw html (use `content` for plain text) and close on mouse leave after timeout set by `delayClosing`:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<HelpMark
    delayClosing={500}
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
    delayClosing={500}
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
  delayClosing={500}
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

Popover with JSX component as content:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
      <HelpMark content={<Spin size="s" view="default" tone="default" progress />} />
`}
>
    <UIKit.HelpMark content={<Spin size="s" view="default" tone="default" progress />} />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<HelpMark content={<Spin size="s" view="default" tone="default" progress />} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Property     | Type                                            | Required | Default             | Description                                     |
| :----------- | :---------------------------------------------- | :------- | :------------------ | :---------------------------------------------- |
| className    | `String`                                        |          |                     | Control class name                              |
| placement    | `Array`                                         |          | [`right`, `bottom`] | Allowed popover positions                       |
| delayClosing | `Number`                                        |          | `300`               | Timeout before closing popover                  |
| children     | `ReactNode`                                     |          |                     | Popover content                                 |
| buttonProps  | `React.ButtonHTMLAttributes<HTMLButtonElement>` |          |                     | Set attributes to the underlying button element |
| buttonRef    | `React.RefObject<HTMLButtonElement>`            |          |                     | Ref to the underlying button element            |
