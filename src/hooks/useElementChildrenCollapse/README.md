<!--GITHUB_BLOCK-->

# useElementChildrenCollapse

<!--/GITHUB_BLOCK-->

```tsx
import {useElementChildrenCollapse} from '@gravity-ui/uikit';
```

The `useElementChildrenCollapse` hook is used to calculate the number of visible children in an wrapper element with collapsing.

## Properties

| Name                                 | Description                                                      |                Type                 |  Default   |
| :----------------------------------- | :--------------------------------------------------------------- | :---------------------------------: | :--------: |
| children                             | children of wrapper component                                    |          `React.ReactNode`          |            |
| elementRef                           | ref of wrapper element                                           |   `React.RefObject<HTMLElement>`    |            |
| options.maxItems                     | non-collapsible children max count                               |              `number`               | `Infinity` |
| options.recalculateDeps              | dependencies for recalculation collapsing                        |       `React.DependencyList`        |    `[]`    |
| options.isChildDOMElementCollapsible | function for determining whether an DOM element can be collapsed | `(element: HTMLElement) => boolean` |            |
| options.getChildDOMElementWidth      | function for determining the width of an DOM element             | `(element: HTMLElement) => number`  |            |

## Result

```ts
{
  visibleChildrenCount: number;   // non-collapsed children count
  calculated: boolean;            // is collapsing calculated
  recalculate: () => void;        // function for recalculating collapsing
}
```
