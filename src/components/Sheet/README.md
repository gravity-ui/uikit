# Sheet

Sheet component for mobile devices

## PropTypes

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

| Name                | Description     |
| :------------------ | :-------------- |
| `--g-sheet-padding` | Content padding |
