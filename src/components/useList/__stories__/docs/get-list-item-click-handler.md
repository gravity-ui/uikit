### getListItemClickHandler

Basic click logic implemented for you

```tsx
import {unstable_getListItemClickHandler as getListItemClickHandler} from '@gravity-ui/uikit/unstable';
```

#### props:

| Name     | Description                            |      Type       | Default |
| :------- | :------------------------------------- | :-------------: | :-----: |
| list     | result of `useList` hook               | `UseListResult` |         |
| multiple | One or multiple elements selected list |    `boolean`    |         |

#### Result:

onClick callback `(payload: {id: listItemId}) => void`;

#### Usage example:

```tsx
const filterState = useListFilter({items: [...]});

const list = useList({items: filterState.items});

const onItemClick = getListItemClickHandler({list});

useListKeydown({
  containerRef,
  onItemClick,
  list,
});
```
