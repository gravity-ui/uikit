<!--GITHUB_BLOCK-->

# useDropZone

<!--/GITHUB_BLOCK-->

```tsx
import {unstable_useDropZone as useDropZone} from '@gravity-ui/uikit/unstable';
```

The `useDropZone` hook provides props for an element to act as a drop zone and gives access to the dragging-over state. It does not validate MIME types or file counts; handle validation in `onDrop` or use `FileDropZone` if you need built-in file validation.

```tsx
const ExampleDropZone = () => {
  const handleDrop = (event: DragEvent) => {
    const items = Array.from(event.dataTransfer?.items ?? []);

    // Do something with dropped items.
    console.log(items);
  };

  const {isDraggingOver, getDroppableProps} = useDropZone({
    onDrop: handleDrop,
  });

  return (
    <div
      {...getDroppableProps()}
      style={{
        border: isDraggingOver ? '4px dashed blue' : '4px dashed black',
      }}
    >
      Drop something here
    </div>
  );
};
```

You can also subscribe to the drag lifecycle events:

```tsx
const ExampleDropZone = () => {
  const {isDraggingOver, getDroppableProps} = useDropZone({
    onDragEnter: (event) => console.log('dragenter', event.dataTransfer?.items),
    onDragOver: (event) => console.log('dragover', event.dataTransfer?.items),
    onDragLeave: (event) => console.log('dragleave', event.dataTransfer?.items),
    onDrop: (event) => console.log('drop', event.dataTransfer?.items),
  });

  return (
    <div
      {...getDroppableProps()}
      style={{
        border: isDraggingOver ? '4px dashed blue' : '4px dashed black',
      }}
    >
      Drop something here
    </div>
  );
};
```

Additionally, the hook supports a more imperative approach. It can accept a `ref` for cases where you don't have direct access to the HTML element you want to make a drop zone:

```tsx
const ExampleDropZoneWithRef = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleDrop = (event: DragEvent) => {
    const items = Array.from(event.dataTransfer?.items ?? []);

    // Do something with dropped items.
    console.log(items);
  };

  const {isDraggingOver} = useDropZone({
    ref,
    onDrop: handleDrop,
  });

  return (
    <SomeFancyComponent
      ref={ref}
      style={{
        border: isDraggingOver ? '4px dashed blue' : '4px dashed black',
      }}
      text="Drop something here"
    />
  );
};
```

## Properties

| Name        | Description                                                                                  |              Type              | Default |
| :---------- | :------------------------------------------------------------------------------------------- | :----------------------------: | :-----: |
| disabled    | Disables the drop zone                                                                       |           `boolean`            |         |
| ref         | An optional ref object pointing to the element that will be provided with drop zone behavior | `React.RefObject<HTMLElement>` |         |
| onDragEnter | A callback triggered on drag enter with the native drag event                                |  `(event: DragEvent) => void`  |         |
| onDragOver  | A callback triggered on drag over with the native drag event                                 |  `(event: DragEvent) => void`  |         |
| onDragLeave | A callback triggered on drag leave with the native drag event                                |  `(event: DragEvent) => void`  |         |
| onDrop      | A callback triggered on drop with the native drag event                                      |  `(event: DragEvent) => void`  |         |

## Result

- `isDraggingOver` - returns `true` when an element is being dragged over the zone, and `false` otherwise
- `getDroppableProps` - returns props to provide an element with drop zone behavior (not returned if `ref` is provided). The returned props include `aria-dropeffect="copy"`, `tabIndex={0}`, `role="button"`, and drag event handlers.
