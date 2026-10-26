<!--GITHUB_BLOCK-->

# useCollapseChildren

<!--/GITHUB_BLOCK-->

```tsx
import {useCollapseChildren} from '@gravity-ui/uikit';
```

The `useCollapseChildren` hook calculates visible children count for a specified container element.

## Properties

| Name          | Description                                                         |               Type               |  Default   |
| :------------ | :------------------------------------------------------------------ | :------------------------------: | :--------: |
| enabled       | Whether the hook is enabled.                                        |            `boolean`             |   `true`   |
| containerRef  | React ref for the container element.                                |        `React.RefObject`         |            |
| preservedRefs | React refs for elements that should not participate in calculation. |       `React.RefObject[]`        |            |
| minCount      | The minimum count of items to be visible.                           |             `number`             |    `0`     |
| maxCount      | The maximum count of items to be visible.                           |             `number`             | `Infinity` |
| direction     | Collapse direction of items.                                        |        `"start"` `"end"`         |  `"end"`   |
| gap           | The distance between items.                                         |             `number`             |    `0`     |
| childSelector | CSS-selector to pick child items in the container.                  |             `string`             |   `"*"`    |
| getChildWidth | Custom measure function of item's width.                            | `(child: HTMLElement) => number` |            |

## Result

```ts
interface UseCollapseChildrenResult {
  /**
   * Whether calculation is complete.
   * Your items should be in measurable state when it's not calculated.
   */
  calculated: boolean;
  /**
   * Trigger recalculation manually.
   */
  recalculate: () => void;
  /**
   * Number of items that can be visible in the container, excluding preserved items.
   */
  visibleCount: number;
}
```
