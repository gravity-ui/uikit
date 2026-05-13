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
  const handleDrop = (acceptedItems: DataTransferItem[], rejectedItems: FileRejection[]) => {
    // do something with accepted and rejected items
  };

  const {isDraggingOver, isInvalidDrag, getDroppableProps} = useDropZone({
    accept: ACCEPT,
    multiple: true,
    maxFilesCount: 5,
    onDrop: handleDrop,
  });

  return (
    <div
      {...getDroppableProps()}
      style={{
        border: isInvalidDrag
          ? '4px dashed red'
          : isDraggingOver
            ? '4px dashed blue'
            : '4px dashed black',
      }}
    >
      Drop Something Here!
    </div>
  );
};
```

You can also use separate callbacks for accepted and rejected items:

```tsx
const ACCEPT = ['text/plain', 'image/*'];

const ExmapleDropZone = () => {
  const handleDropAccepted = (items: DataTransferItem[]) => {
    // do something with accepted items
  };

  const handleDropRejected = (items: FileRejection[]) => {
    // do something with rejected items
  };

  const {isDraggingOver, isInvalidDrag, getDroppableProps} = useDropZone({
    accept: ACCEPT,
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
  });

  return (
    <div
      {...getDroppableProps()}
      style={{
        border: isInvalidDrag
          ? '4px dashed red'
          : isDraggingOver
            ? '4px dashed blue'
            : '4px dashed black',
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

  const handleDropAccepted = (items: DataTransferItem[]) => {
    // do something with accepted items
  };

  const {isDraggingOver, isInvalidDrag} = useDropZone({
    ref,
    accept: ACCEPT,
    onDropAccepted: handleDropAccepted,
  });

  return (
    <SomeFancyComponent
      ref={ref}
      style={{
        border: isInvalidDrag
          ? '4px dashed red'
          : isDraggingOver
            ? '4px dashed blue'
            : '4px dashed black',
      }}
      text=" Drop Something Here!"
    />
  );
};
```

## Properties

| Name           | Description                                                                                                                                                                                              |                                      Type                                      |  Default   |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------: | :--------: |
| accept         | A list of MIME types that will be accepted by the drop zone (e.g., `['text/*', 'image/png']`)                                                                                                            |                                   `string[]`                                   |            |
| multiple       | Allows multiple files to be dropped. When `false`, only a single file is accepted                                                                                                                        |                                   `boolean`                                    |            |
| maxFilesCount  | Maximum number of files that can be accepted. Files beyond this limit will be rejected with `TOO_MANY_FILES` reason. Only effective when `multiple` is `true`                                            |                                    `number`                                    | `Infinity` |
| disabled       | Disables the drop zone                                                                                                                                                                                   |                                   `boolean`                                    |            |
| ref            | An optional ref object pointing to the element that will be provided with drop zone behavior                                                                                                             |                         `React.RefObject<HTMLElement>`                         |            |
| onDrop         | A callback triggered on drop with both accepted and rejected items. Either `onDrop` or `onDropAccepted` must be provided                                                                                 | `(acceptedFiles: DataTransferItem[], fileRejections: FileRejection[]) => void` |            |
| onDropAccepted | A callback triggered with items whose types match those provided in `accept`. Either `onDrop` or `onDropAccepted` must be provided                                                                       |                     `(items: DataTransferItem[]) => void`                      |            |
| onDropRejected | A callback triggered with items that were rejected (type mismatch or exceeding `maxFilesCount`). Can be called alongside `onDropAccepted` in a single drop if some files are accepted and others are not |                       `(items: FileRejection[]) => void`                       |            |

## Result

- `getDroppableProps` - returns props to provide an element with drop zone behavior (not returned if `ref` provided)
- `isDraggingOver` - returns `true` when an element is being dragged over the zone, and `false` otherwise
- `isInvalidDrag` - returns `true` when a dragged element does not match any of the accepted MIME types, and `false` otherwise
