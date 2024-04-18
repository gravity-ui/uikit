<!--GITHUB_BLOCK-->

# Sheet

<!--/GITHUB_BLOCK-->

```tsx
import {Sheet} from '@gravity-ui/uikit';
```

`Sheet` is a component designed to be used in a mobile context as an information or interactive element. You can place content of any size in it - internal scrolling and dynamic resizing are supported.

On mobile devices, you can move `Sheet` by pulling on its main part or the swipe area. To close it, swipe down or touch the area outside the `Sheet`.

## Usage

```tsx
import React from 'react';
import {Button, Sheet} from '@gravity-ui/uikit';

const [visible, setVisible] = React.useState(false);

<Button onClick={() => setVisible(true)}>Open Sheet</Button>
<Sheet visible={visible} onClose={() => setVisible(false)} title="Content Sheet">
    Content
</Sheet>
```

## Properties

| Name                     | Description                                                                                                                                                    |    Type    |   Default   |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: | :---------: |
| visible                  | Manages `Sheet` visibility                                                                                                                                     | `boolean`  |   `false`   |
| allowHideOnContentScroll | Enable the behavior of the sheet window closing by swiping down if the content is scrolled to its top (`content Node.scrollTop === 0`) or has no scroll at all | `boolean`  |   `true`    |
| hideTopBar               | Hide top bar with resize handle                                                                                                                                | `boolean`  |             |
| id                       | ID of the sheet, used as hash in URL. It's important to specify different `id` values if there can be more than one sheet on the page                          |  `string`  |   `modal`   |
| title                    | Title of the sheet window                                                                                                                                      |  `string`  | `undefined` |
| className                | HTML `class` attribute                                                                                                                                         |  `string`  | `undefined` |
| contentClassName         | HTML `class` attribute for the sheet content                                                                                                                   |  `string`  | `undefined` |
| swipeAreaClassName       | HTML `class` attribute for the swipe area                                                                                                                      |  `string`  | `undefined` |
| onClose                  | Handler for close event                                                                                                                                        | `function` | `undefined` |

## CSS API

| Name                        | Description     |
| :-------------------------- | :-------------- |
| `--g-sheet-content-padding` | Content padding |
