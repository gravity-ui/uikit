<!--GITHUB_BLOCK-->

# useDropZone

<!--/GITHUB_BLOCK-->

```tsx
import {useDropZone} from '@gravity-ui/uikit';
```

The `useDropZone` hook provides props for an element to act as a drop zone and also gives access to the dragging-over state:

```tsx
const ACCEPT = ['text/plain', 'image/*'];

const ExmapleDropZone = () => {
  const handleDrop: UseDropZoneParams['onDrop'] = (items) => {
    // do something with the dropped items
  };

  const {isDraggingOver, getDroppableProps} = useDropZone({
    accept: ACCEPT,
    onDrop: handleDrop,
  });

  return (
    <div
      {...getDroppableProps()}
      style={{
        border: isDraggingOver ? '4px dashed blue' : '4px dashed black',
      }}
    >
      Drop Something Here!
    </div>
  );
};
```

Additionally, the hook supports a more imperative approach. It can accept a `ref` for cases where you don't have direct access to the HTML element you want to make a drop zone:

```tsx
const ACCEPT = ['text/plain', 'image/*'];

const ExmapleDropZoneWithRef = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleDrop: UseDropZoneParams['onDrop'] = (items) => {
    // do something with the dropped items
  };

  const {isDraggingOver} = useDropZone({
    ref,
    accept: ACCEPT,
    onDrop: handleDrop,
  });

  return (
    <SomeFancyComponent
      ref={ref}
      style={{
        border: isDraggingOver ? '4px dashed blue' : '4px dashed black',
      }}
      text=" Drop Something Here!"
    />
  );
};
```

## Properties

| Name     | Description                                                                                                                                                  |                  Type                   | Default |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------: | :-----: |
| accept   | A list of MIME types that will be accepted by the drop zone (e.g., `['text/*', 'image/png']`)                                                                |               `string[]`                |         |
| disabled | Disables the drop zone                                                                                                                                       |                `boolean`                |         |
| ref      | An optional ref object pointing to the element that will be provided with drop zone behavior                                                                 |     `React.RefObject<HTMLElement>`      |         |
| onDrop   | A callback triggered when something is successfully dropped into the drop zone. Won't be called if the item's type does not match those provided in `accept` | `(items: DataTransferItemList) => void` |         |

## Result

- `getDroppableProps` - returns props to provide an element with drop zone behavior (not returned if `ref` provided)
- `isDraggingOver` - returns `true` when an element is being dragged over the zone, and `false` otherwise
