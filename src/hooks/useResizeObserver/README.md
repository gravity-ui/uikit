<!--GITHUB_BLOCK-->

# useResizeObserver

<!--/GITHUB_BLOCK-->

```tsx
import {useResizeObserver} from '@gravity-ui/uikit';
```

Custom hook that observes the change of the size of an element using the [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Properties

| Name    | Description                                               |             Type             | Default |
| :------ | :-------------------------------------------------------- | :--------------------------: | :-----: |
| ref     | Ref-link to target of observation                         |      `React.RefObject`       |         |
| handler | Callback when a size of the observation target is changed | `(info: ResizeInfo) => void` |         |
