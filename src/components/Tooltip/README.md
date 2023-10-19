<!--GITHUB_BLOCK-->

# Tooltip

<!--/GITHUB_BLOCK-->

A simple text tip that uses its children node as an anchor. To function correctly, the anchor node
must be able to handle mouse events and focus or blur events.

## Usage

```tsx
import {Tooltip} from '@gravity-ui/uikit';

<Tooltip content="Content">
  <div tabIndex={0}>Anchor</div>
</Tooltip>;
```

## Properties

| Name       | Description                                                                             |                       Type                       | Default |
| :--------- | --------------------------------------------------------------------------------------- | :----------------------------------------------: | :-----: |
| children   | An anchor element for a `Tooltip`. Must accept a `ref` that will provide a DOM element. |               `React.ReactElement`               |         |
| content    | Content that will be shown in the `Tooltip`                                             |                `React.ReactNode`                 |         |
| closeDelay | Number of ms to delay hiding the `Tooltip` after the hover ends                         |                     `number`                     |   `0`   |
| openDelay  | Number of ms to delay showing the `Tooltip` after the hover begins                      |                     `number`                     |  `250`  |
| placement  | `Tooltip` position relative to its anchor                                               | [`PopupPlacement`](../Popup/README.md#placement) |         |
