# useListNavigation

React hook used to navigate through the items in a list

`ArrowDown` will increase currently active item index
`ArrowUp` will reduce currently active item index
`PageDown` will increase currently active item index by pageSize (works if `pageSize` passed)
`PageUp` will reduce currently active item index by pageSize (works if `pageSize` passed)
`Home` will navigate to the start of the list if `processHomeKey` (disable if you want to move the cursor to the start of active input on `Home` key, for example)
`End` will navigate to the end of the list if `processEndKey` (disable if you want to move the cursor to the end of active input on `End` key, for example)

For skipping items you should pass `skip` function, which accepts an item and returns boolean value, representing if it's needed to skip the item

The hook returns the following:

- `activeItemIndex` - active item index
- `reset` - function, which should be called when you want to reset navigation

### Arguments

| Name            | Type                                                                 | Default | Description                                                                                           |
| :-------------- | :------------------------------------------------------------------- | :------ | :---------------------------------------------------------------------------------------------------- |
| items           | `ItemType[]`                                                         | `-`     | List items. Item can be any object. Also, it can contain `items` property, which represents sub-items |
| skip            | `(item: ItemType) => boolean`                                        | `-`     | Returns true if the item should not participate in navigation (Called for each item)                  |
| pageSize        | `number`                                                             | `-`     | Items page size, if passed, then navigates by pageSize on PageDown/PageUp                             |
| processHomeKey  | `boolean`                                                            | `false` | Navigate to the start of the list on Home key                                                         |
| processEndKey   | `boolean`                                                            | `false` | Navigate to the end of the list on End key                                                            |
| disabled        | `boolean`                                                            | `false` | Disable navigation                                                                                    |
| initialValue    | `number`                                                             | `-1`    | Initial active item index                                                                             |
| anchorRef       | `RefObject<AnchorType>`                                              | `-`     | HTMLElement reference, the hook will listen keydown event on that element                             |
| onAnchorKeyDown | `(activeItemIndex: number, event: KeyboardEvent) => boolean or void` | `-`     | Custom keydown handler, if returns false, then the hook won't process keydown                         |

### Returns

| Name               | Type                      | Description              |
| :----------------- | :------------------------ | :----------------------- |
| activeItemIndex    | `number`                  | Index of the active item |
| setActiveItemIndex | `(index: number) => void` | Active item index setter |
| reset              | `() => void`              | Resets navigation        |

### Examples

```tsx
const anchorRef = useRef<HTMLButtonElement>(null);

const items = [
  {
    id: 1,
    title: 'Item 1',
  },
  {
    id: 2,
    title: 'Item 2',
  },
];

useListNavigation({
  items,
  skip: (item) => item.disabled,
  anchorRef,
  onAnchorKeydown: (activeItemIndex: number, event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        const activeItem = items[activeItemIndex];
        if (activeItem) {
          event.preventDefault();

          console.log(`${activeItem.title} selected`);
        }

        return false;
      }
    }
  },
});
```
