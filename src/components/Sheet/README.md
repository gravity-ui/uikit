<!--GITHUB_BLOCK-->

# Sheet

<!--/GITHUB_BLOCK-->

```tsx
import {Sheet} from '@gravity-ui/uikit';
```

`Sheet` is a component designed to be used in a mobile context to replace modals or other information elements. It allows for the placement of content of any size and supports internal scrolling and dynamic resizing.
On mobile devices, you can move the sheet by touching the body of the sheet or the swipe area. You can also close it by swiping down.

## Usage

```tsx
import React from 'react';
import {Button, Sheet} from '@gravity-ui/uikit';

const [visible, setVisible] = React.useState(false);

<Button onClick={() => setVisible(true)}>Open Sheet</Button>
<Sheet visible={visible} onClose={() => setVisible(false)} title={'Content Sheet'}>
    Content
</Sheet>
```

## Hide top

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Sheet visible={true} hideTop={true}>Disabled</Sheet>
`}
>
    <UIKit.Sheet visible={true} hideTop={true}>Disabled</UIKit.Sheet>
</ExampleBlock>

LANDING_BLOCK-->

## Properties

| Name                     | Type       | Required | Default     | Description                                                                                                                                                                 |
| :----------------------- | :--------- | :------: | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible                  | `boolean`  |    ✓     |             | Show/hide sheet                                                                                                                                                             |
| allowHideOnContentScroll | `boolean`  |          | `true`      | Enable the behavior in which you can close the sheet window with a swipe down if the content is scrolled to its top (`contentNode.scrollTop === 0`) or has no scroll at all |
| hideTopBar               | `boolean`  |          |             | Hide top bar with resize handle                                                                                                                                             |
| id                       | `string`   |          | `modal`     | ID of the sheet, used as hash in URL. It's important to specify different `id` values if there can be more than one sheet on the page                                       |
| title                    | `string`   |          | `undefined` | Title of the sheet window                                                                                                                                                   |
| className                | `string`   |          | `undefined` | Class name for the sheet window                                                                                                                                             |
| contentClassName         | `string`   |          | `undefined` | Class name for the sheet content                                                                                                                                            |
| swipeAreaClassName       | `string`   |          | `undefined` | Class name for the swipe area                                                                                                                                               |
| onClose                  | `function` |          | `undefined` | Function called when the sheet is closed (when `visible` sets to `false`)                                                                                                   |

## CSS API

| Name                        | Description     |
| :-------------------------- | :-------------- |
| `--g-sheet-content-padding` | Content padding |
