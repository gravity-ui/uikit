<!--GITHUB_BLOCK-->

# ActionTooltip

<!--/GITHUB_BLOCK-->

This is a simple text tip that uses its child node as an anchor. To work correctly, the anchor node must be able to handle mouse events and focus or blur events.

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
| children         | Anchor element for a `Tooltip`. It must accept a `ref` that will provide a DOM element. |               `React.ReactElement`               |         |
| closeDelay       | Number of ms to delay hiding the `Tooltip` after the hover ends                         |                     `number`                     |   `0`   |
| openDelay        | Number of ms to delay showing the `Tooltip` once the hover starts                       |                     `number`                     |  `250`  |
| placement        | `Tooltip` position relative to its anchor                                               | [`PopupPlacement`](../Popup/README.md#placement) |         |
| qa               | `data-qa` HTML attribute, used for testing                                              |                     `string`                     |         |
| title            | Tooltip title text                                                                      |                     `string`                     |         |
| description      | Tooltip description text                                                                |                     `string`                     |         |
| hotkey           | Hotkeys assigned to an interface action                                                 |                     `string`                     |         |
| id               | Used for implementing the accessibility logic                                           |                     `string`                     |         |
| disablePortal    | Disables using Portal for children                                                      |                    `boolean`                     |         |
| contentClassName | HTML class attribute for the content node                                               |                     `string`                     |         |
| disabled         | Prevents the popup from opening                                                         |                    `boolean`                     | `false` |
