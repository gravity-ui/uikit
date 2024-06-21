### computeItemSize;

Utility to compute list item height:

#### Usage example:

```tsx
<VirtualizedListContainer // custom implementation
  items={visibleFlattenIds}
  itemSize={(index) =>
    computeItemSize(
      // list size
      size,
      // has subrows
      Boolean(get(itemsById[visibleFlattenIds[index]], 'subtitle')),
    )
  }
/>
```
