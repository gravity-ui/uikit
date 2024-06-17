### getListParsedState;

Used under the hood of `useList().structure` property. Use it if you need to extract initial list state form declaration:

#### Usage example:

```tsx
import {unstable_getListParsedState as getListParsedState} from '@gravity-ui/uikit/unstable';

// custom controlled state from computed initial state
const [expandedById, setExpanded] = React.useState(
  () => getListParsedState(items).initialState.expandedById,
);
```
