<!--GITHUB_BLOCK-->

# useFileInput

<!--/GITHUB_BLOCK-->

```tsx
import {useFileInput} from '@gravity-ui/uikit';
```

The `useFileInput` hook used to shape props for input with type "file"

## Properties

| Name     | Description          |                 Type                 | Default |
| :------- | :------------------- | :----------------------------------: | :-----: |
| onUpdate | Update file callback |      `(files: File[]) => void`       |         |
| onChange | On change callback   | `(event: React.ChangeEvent) => void` |         |

## Result

- controlProps - props for the input with type 'file' `React.DetailedHTMLProps`.
- triggerProps - props for the interactive element that, when interacted with, should open a dialog window for file selection `{onClick: () => void;}`.
