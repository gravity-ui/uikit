# Tooltip

A simple text popup tip.

## Usage

```tsx
import {Tooltip} from '@yandex-cloud/uikit';

<Tooltip text="Hello world!">
  <div>Hover me too see tooltip</div>
</Tooltip>;
```

## Props

| Parameter | Type                 | Required | Default | Description                                                                           |
| :-------- | :------------------- | :------- | :------ | ------------------------------------------------------------------------------------- |
| text      | `React.ReactNode`    | yes      | -       | A text that will be shown in tooltip                                                  |
| placement | `PopupPlacement`     | no       | -       | A tooltip position relative to it's anchor                                            |
| children  | `React.ReactElement` | yes      | -       | An anchor element for a tooltip. Must accept a `ref` that will provide a DOM element. |
