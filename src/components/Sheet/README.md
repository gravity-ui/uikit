<!--GITHUB_BLOCK-->

# Sheet

<!--/GITHUB_BLOCK-->

```tsx
import {Sheet} from '@gravity-ui/uikit';
```

`Sheet` is a component designed for using in the mobile context as an information or interactive element. You can place content of any size in it, since the internal scrolling and dynamic resizing are supported.

On mobile devices, you can move a `Sheet` by pulling its main part or the swipe area. To close it, swipe down or tap the area outside the `Sheet`.

## Usage

```tsx
import React from 'react';
import {Button, Sheet} from '@gravity-ui/uikit';

const SheetExample = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Open Sheet</Button>
      <Sheet visible={visible} onClose={() => setVisible(false)} title="Content Sheet">
        Content
      </Sheet>
    </React.Fragment>
  );
};
```

## Properties

| Name                     | Description                                                                                                                                                      |    Type    |   Default   |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: | :---------: |
| visible                  | Manages `Sheet` visibility                                                                                                                                       | `boolean`  |   `false`   |
| allowHideOnContentScroll | Enables the behavior of closing the sheet window by swiping down if the content is scrolled to its top (`content Node.scrollTop === 0`) or has no scroll at all. | `boolean`  |   `true`    |
| hideTopBar               | Hides the top bar with the resize handle.                                                                                                                        | `boolean`  |             |
| id                       | Sheet ID used as hash in a URL. Make sure to specify multiple `id` values if there can be more than one sheet on a page.                                         |  `string`  |   `modal`   |
| title                    | Sheet window title.                                                                                                                                              |  `string`  | `undefined` |
| className                | `class` HTML attribute                                                                                                                                           |  `string`  | `undefined` |
| contentClassName         | `class` HTML attribute for the sheet content.                                                                                                                    |  `string`  | `undefined` |
| swipeAreaClassName       | `class` HTML attribute for the swipe area.                                                                                                                       |  `string`  | `undefined` |
| onClose                  | Handler for close event.                                                                                                                                         | `function` | `undefined` |

## CSS API

| Name                         | Description      |
| :--------------------------- | :--------------- |
| `--g-sheet-content-padding`  | Content padding  |
| `--g-sheet-background-color` | Background color |
