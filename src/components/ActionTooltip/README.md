<!--GITHUB_BLOCK-->

# ActionTooltip

<!--/GITHUB_BLOCK-->

A simple text tip that uses its children node as an anchor. For correct functioning, the anchor node
must be able to handle mouse events and focus or blur events.

## Usage

```tsx
import {ActionTooltip} from '@gravity-ui/uikit';

<ActionTooltip title="Content">
  <div tabIndex={0}>Anchor</div>
</ActionTooltip>;
```

## Properties

| Name             | Description                                                                             |                       Type                       | Default |
| :--------------- | --------------------------------------------------------------------------------------- | :----------------------------------------------: | :-----: |
| children         | An anchor element for a `Tooltip`. Must accept a `ref` that will provide a DOM element. |               `React.ReactElement`               |         |
| closeDelay       | Number of ms to delay hiding the `Tooltip` after the hover ends                         |                     `number`                     |   `0`   |
| openDelay        | Number of ms to delay showing the `Tooltip` after the hover begins                      |                     `number`                     |  `250`  |
| placement        | `Tooltip` position relative to its anchor                                               | [`PopupPlacement`](../Popup/README.md#placement) |         |
| qa               | HTML `data-qa` attribute, used in tests                                                 |                     `string`                     |         |
| title            | Tooltip title text                                                                      |                     `string`                     |         |
| description      | Tooltip description text                                                                |                     `string`                     |         |
| hotkey           | Hot keys that are assigned to an interface action.                                      |                     `string`                     |         |
| id               | This prop is used to help implement the accessibility logic.                            |                     `string`                     |         |
| disablePortal    | Do not use Portal for children                                                          |                    `boolean`                     |         |
| contentClassName | HTML class attribute for content node                                                   |                     `string`                     |         |
| disabled         | Prevent popup from opening                                                              |                    `boolean`                     | `false` |
