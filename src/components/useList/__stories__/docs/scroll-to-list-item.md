### scrollToListItem;

Utility to scroll into list item view by id and ref on container DOM element:

#### Usage example:

```tsx
import {
  unstable_ListContainerView as ListContainerView,
  unstable_scrollToListItem as scrollToListItem,
} from '@gravity-ui/uikit/unstable';

const containerRef = React.useRef<HTMLDivElement>(null);
// restoring focus when popup opens
React.useLayoutEffect(() => {
  if (open) {
    containerRef.current?.focus();
    list.state.setActiveItemId(selectedId ?? list.structure.visibleFlattenIds[0]);

    if (selectedId) {
      scrollToListItem(selectedId, containerRef.current);
    }
  }
}, [open]);
// ...
<ListContainerView ref={containerRef} />;
```
