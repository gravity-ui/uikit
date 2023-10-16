<!--GITHUB_BLOCK-->

# useIntersection

<!--/GITHUB_BLOCK-->

```tsx
import {useIntersection} from '@gravity-ui/uikit';
```

The `useIntersection` hook works with the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and calls a callback at the 'isIntersected' event of the observed element

## Properties

| Name        | Description                                   |            Type            | Default |
| :---------- | :-------------------------------------------- | :------------------------: | :-----: |
| element     | The observed element                          |     `React.RefObject`      |         |
| options     | Intersection observer options                 | `IntersectionObserverInit` |         |
| onIntersect | Callback when observed element is intersected |        `() => void`        |         |
