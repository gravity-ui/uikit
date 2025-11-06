<!--GITHUB_BLOCK-->

# useDropZone

<!--/GITHUB_BLOCK-->

```tsx
import {useDropZone} from '@gravity-ui/uikit';
```

The `useDropZone` hook provides props for an element to act as a drop zone and also gives access to the dragging-over state.
Additionally, the hook supports a more imperative approach: it can accept a `ref` for cases where you don't have direct access to the HTML element you want to make a drop zone.

## Properties

| Name     | Description                                                                                                                                                  |                  Type                   | Default |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------: | :-----: |
| accept   | A list of MIME types that will be accepted by the drop zone (e.g., `['text/*', 'image/png']`)                                                                |               `string[]`                |         |
| disabled | Disables the drop zone                                                                                                                                       |                `boolean`                |         |
| ref      | A ref object pointing to the element that will be provided with drop zone behavior                                                                           |     `React.RefObject<HTMLElement>`      |         |
| onDrop   | A callback triggered when something is successfully dropped into the drop zone. Won't be called if the item's type does not match those provided in `accept` | `(items: DataTransferItemList) => void` |         |

## Result

- `getDroppableProps` - returns props to provide an element with drop zone behavior
- `isDraggingOver` - returns `true` when an element is being dragged over the zone, and `false` otherwise
