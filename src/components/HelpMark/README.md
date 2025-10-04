<!--GITHUB_BLOCK-->

# HelpMark

<!--/GITHUB_BLOCK-->

```tsx
import {HelpMark} from '@gravity-ui/uikit';
```

A help icon that reveals contextual information in a popover on hover or click. Ideal for showing tips, explanations, or supporting content without taking up extra space in the interface.

## Examples


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

| Name         | Description                         |           Type           | Default |
| :----------- | :---------------------------------  | :----------------------: | :-----: |
| iconSize     | Sets icon size                      | `"s"` `"m"` `"l"` `"xl"` |  `"m"`  |
| popoverProps | Override `Popover` props            |      `PopoverProps`      |         |
| children     | Content displayed inside the popover | `React.ReactNode`        |         |
