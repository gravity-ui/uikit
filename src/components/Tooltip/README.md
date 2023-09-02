<!--GITHUB_BLOCK-->

# Tooltip

<!--/GITHUB_BLOCK-->

A simple text tip that uses its children node as an anchor. Anchor node must be able to handle mouse
events and focus/blur events in order to work correctly.

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
| content    | A content that will be shown in `Tooltip`                                               |                `React.ReactNode`                 |         |
| closeDelay | Delay in ms before hiding the `Tooltip` after the hover ends                            |                     `number`                     |   `0`   |
| openDelay  | Delay in ms before showing the `Tooltip` after hovering                                 |                     `number`                     |  `250`  |
| placement  | `Tooltip` position relative to it's anchor                                              | [`PopupPlacement`](../Popup/README.md#placement) |         |
