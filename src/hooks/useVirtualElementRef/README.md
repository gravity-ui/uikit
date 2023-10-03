<!--GITHUB_BLOCK-->

# useVirtualElementRef

<!--/GITHUB_BLOCK-->

```tsx
import {useVirtualElementRef} from '@gravity-ui/uikit';
```

The `useVirtualElementRef` hook helps to create virtual element for popup

## Properties

| Name           | Description                                         |                    Type                    | Default |
| :------------- | :-------------------------------------------------- | :----------------------------------------: | :-----: |
| rect           | Position of virtual element in relation to viewport | `{top, bottom, left, right}: {[x]:number}` |         |
| contextElement | DOM-context of virtual element                      |                 `Element`                  |         |

## Return

| Name | Description              |           Type           |
| :--- | :----------------------- | :----------------------: |
| ref  | Virtual element ref link | `React.MutableRefObject` |
