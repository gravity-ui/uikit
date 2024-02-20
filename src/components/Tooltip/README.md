<!--GITHUB_BLOCK-->

# Tooltip &middot; [![storybook](https://img.shields.io/badge/Storybook-Tooltip-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-overlays-tooltip--default)

<!--/GITHUB_BLOCK-->

A simple text tip that uses its children node as an anchor. This component accepts only text content and may be an excellent alternative to the browser title with its small size and increased appearance delay.

Tooltip has a light and dark theme.

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
| children         | An anchor element for a `Tooltip`. Must accept a `ref` that will provide a DOM element. |               `React.ReactElement`               |         |
| closeDelay       | Number of ms to delay hiding the `Tooltip` after the hover ends                         |                     `number`                     |   `0`   |
| openDelay        | Number of ms to delay showing the `Tooltip` after the hover begins                      |                     `number`                     | `1000`  |
| placement        | `Tooltip` position relative to its anchor                                               | [`PopupPlacement`](../Popup/README.md#placement) |         |
| qa               | HTML `data-qa` attribute, used in tests                                                 |                     `string`                     |         |
| content          | Content that will be shown in the `Tooltip`                                             |                `React.ReactNode`                 |         |
| id               | This prop is used to help implement the accessibility logic.                            |                     `string`                     |         |
| disablePortal    | Do not use Portal for children                                                          |                    `boolean`                     |         |
| contentClassName | HTML class attribute for content node                                                   |                     `string`                     |         |
| className        | HTML class attribute for popup                                                          |                     `string`                     |         |
| disabled         | Prevent popup from opening                                                              |                    `boolean`                     | `false` |
