<!--GITHUB_BLOCK-->

# Tooltip

<!--/GITHUB_BLOCK-->

This is a simple text tip that uses its child node as an anchor. This component accepts only text content and may be an excellent alternative to the browser title with its small size and increased appearance delay.

A tooltip may have a light or dark theme.

## Usage

```tsx
import {Tooltip} from '@gravity-ui/uikit';

<Tooltip content="Content">
  <div tabIndex={0}>Anchor</div>
</Tooltip>;
```

## Properties

| Name             | Description                                                                             |                       Type                       | Default |
| :--------------- | --------------------------------------------------------------------------------------- | :----------------------------------------------: | :-----: |
| children         | Anchor element for a `Tooltip`. It must accept a `ref` that will provide a DOM element. |               `React.ReactElement`               |         |
| closeDelay       | Number of ms to delay hiding the `Tooltip` after the hover ends                         |                     `number`                     |   `0`   |
| openDelay        | Number of ms to delay showing the `Tooltip` once the hover starts                       |                     `number`                     | `1000`  |
| placement        | `Tooltip` position relative to its anchor                                               | [`PopupPlacement`](../Popup/README.md#placement) |         |
| qa               | `data-qa` HTML attribute, used for testing                                              |                     `string`                     |         |
| content          | The content that will be shown in the `Tooltip`                                         |                `React.ReactNode`                 |         |
| id               | Used for implementing the accessibility logic                                           |                     `string`                     |         |
| disablePortal    | Disables using Portal for children                                                      |                    `boolean`                     |         |
| contentClassName | `class` HTML attribute for the content node                                             |                     `string`                     |         |
| className        | `class` HTML attribute for popup                                                        |                     `string`                     |         |
| disabled         | Prevents the popup from opening                                                         |                    `boolean`                     | `false` |
