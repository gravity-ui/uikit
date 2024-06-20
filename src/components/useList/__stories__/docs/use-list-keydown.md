### useListKeydown

Keyboard support

#### Props:

| Name         | Description                                                                                   |                              Type                              | Default |
| :----------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------: | :-----: |
| list         | result of `useList` hook                                                                      |                        `UseListResult`                         |         |
| onItemClick  | callback will be called when pressing the `Enter`, `Space` keys;                              | `(payload: {id: ListItemId}, e: React.SyntheticEvent) => void` |         |
| containerRef | a reference to the DOM element of the List container inside which to search for its elements; |       `React.RefObject<HTMLDivElement \| HTMLUlElement>`       |         |
| enabled      | on/off keyboard support. Use it if you need to change the behavior in runtime;                |                           `boolean`                            |         |

#### Usage example:

```tsx
import {
    unstable_useList as useList,
    unstable_useListKeydown as useListKeydown,
    unstable_getListItemClickHandler as getListItemClickHandler,
} from '@gravity-ui/uikit/unstable';

const containerRef = React.useRef<HTMLDivElement>(null);
const list = useList(...)
const handleItemClick = getListItemClickHandler({list});

useListKeydown({
    onItemClick,
    containerRef,
    list,
})
```
