<!--GITHUB_BLOCK-->

# HelpMark

<!--/GITHUB_BLOCK-->

A help icon that reveals contextual information in a popover on desktop and in a sheet on mobile. Ideal for showing tips, explanations, or supporting content without taking up extra space in the interface.

```tsx
import {HelpMark} from '@gravity-ui/uikit';
```

## Examples

Component with rendered raw html and close on mouse leave:

<!--SANDBOX
import {HelpMark} from '@gravity-ui/uikit';

export default function () {
    return (
        <HelpMark onClick={() => console.log('just action happened')}>
            <b>Lorem ipsum</b> dolor sit{' '}
            <a href="https://example.com" target="_blank" rel="noreferrer">
                amet
            </a>
            , at scelerisque suspendisse
        </HelpMark>
    );
}
SANDBOX-->

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

On desktop, hovering previews the content without moving focus. Activating the help button with
a click, Enter, or Space opens modal help: focus moves into the popover and stays inside until it
is dismissed. Escape closes it and returns focus to the help button. Pass `popoverProps.modal`
to override this behavior, or `popoverProps.trigger="click"` to disable hover previews.
Provide an accessible name for the button, for example `aria-label="Show help"`.

`HelpMark` accepts any valid `button` element props in addition to these:

| Name         | Description                                   |           Type           | Default |
| :----------- | :-------------------------------------------- | :----------------------: | :-----: |
| size         | Sets icon size                                | `"s"` `"m"` `"l"` `"xl"` |  `"m"`  |
| popoverProps | Override desktop `Popover` props              |      `PopoverProps`      |         |
| sheetProps   | Override mobile `Sheet` props                 |       `SheetProps`       |         |
| children     | Content displayed inside the popover or sheet |    `React.ReactNode`     |         |

## CSS API

| Name                 | Description     |
| :------------------- | :-------------- |
| `--g-help-mark-size` | Icon size in px |
