# Tooltip

A simple text popup tip.

## Usage

```tsx
import {Tooltip} from '@yandex-cloud/uikit';

<Tooltip content="Hello world!">
  <div>Hover me too see tooltip</div>
</Tooltip>;
```

## Props

| Parameter  | Type                 | Required | Default | Description                                                                           |
| :--------- | :------------------- | :------- | :------ | ------------------------------------------------------------------------------------- |
| content    | `React.ReactNode`    | yes      | -       | A content that will be shown in tooltip                                               |
| placement  | `PopupPlacement`     | no       | -       | A tooltip position relative to it's anchor                                            |
| children   | `React.ReactElement` | yes      | -       | An anchor element for a tooltip. Must accept a `ref` that will provide a DOM element. |
| openDelay  | `number`             | no       | -       | Delay in ms before showing the popup after hovering                                   |
| closeDelay | `number`             | no       | -       | Delay in ms before hiding the popup after the hover ends                              |
