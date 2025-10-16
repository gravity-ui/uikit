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
<HelpMark onClick={() => console.log('just action happened')}>
    <b>Lorem ipsum</b> dolor sit{' '}
    <a href="https://example.com" target="_blank" rel="noreferrer">
        amet
    </a>
    , at scelerisque suspendisse
</HelpMark>
`}
>
<UIKit.HelpMark onClick={() => console.log('just action happened')}>
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
<HelpMark onClick={() => console.log('just action happened')}>
  <b>Lorem ipsum</b> dolor sit{' '}
  <a href="https://example.com" target="_blank" rel="noreferrer">
    amet
  </a>
  , at scelerisque suspendisse
</HelpMark>
```

<!--/GITHUB_BLOCK-->

## Properties

`HelpMark` accepts any valid `button` element props in addition to these:

| Name         | Description              |           Type           | Default |
| :----------- | :----------------------- | :----------------------: | :-----: |
| iconSize     | Sets icon size           | `"s"` `"m"` `"l"` `"xl"` |  `"m"`  |
| popoverProps | Override `Popover` props |      `PopoverProps`      |         |
