### useListFilter

Basic tree like structure list filtration logic and utilities. To avoid implementing custom filtering logic from scratch, first use this hook

```tsx
import {unstable_useListKeydown as useListFilter} from '@gravity-ui/uikit/unstable';
```

#### Props:

| Name               | Description                                                                                                                                                                               |                               Type                               | Default |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------: | :-----: |
| items              | Original array of list items, same us used in the `useList` hook                                                                                                                          |                       `listItemType<T>[]`                        |         |
| initialFilterValue | The initial value of the filter;                                                                                                                                                          |                             `string`                             |         |
| filterItem         | The predicate function determines the principle of leaving elements in the original array. It works recursively, there is no need to implement custom logic to bypass the tree structure; |               `(value: string, item: T): boolean;`               |         |
| filterItems        | Completely redefine the filtering logic;                                                                                                                                                  | `(value: string, items: ListItemType<T>[]) => ListItemType<T>[]` |         |
| debounceTimeout    | With what delay to apply the filtering result                                                                                                                                             |                             `number`                             |  `300`  |

#### Returns:

| Name           | Description                                       |                Type                 |
| :------------- | :------------------------------------------------ | :---------------------------------: |
| filterRef      | Ref to the DOM element of the filtering component | `React.RefObject<HTMLInputElement>` |
| filter         | Current filter value                              |              `string`               |
| reset          | Method for resetting filter value                 |            `() => void`             |
| items          | List of filtered list elements                    |         `listItemType<T>[]`         |
| onFilterUpdate | Callback on changing filter value                 |     `(filter: string) => void`      |

#### Usage example:

```tsx
import {
    unstable_useList as useList,
    unstable_useListKeydown as useListFilter,
} from '@gravity-ui/uikit/unstable';

const List = () => {
    const {items, filter, onFilterUpdate, filterRef} = useListFilter({
        items: [...]
    })

    const list = useList({items})

    return (
        <>
            <TextField
                value={filter}
                onUpdate={onFilterUpdate}
                ref={filterRef}
            />
        </>
    )
}
```
