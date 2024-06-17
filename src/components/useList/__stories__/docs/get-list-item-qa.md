### getListItemQa

Function is used to generate `qa` attributes in list items;
Also use this function in tests to create a unique data attribute for accessing a specific list item.

#### Usage example:

```ts
import {unstable_getListItemQa as getListItemQa} from '@gravity-ui/uikit/unstable';

await locator.getByTestId(getListItemQa('some-list-qa', '0')); // select the first item in the list if auto-generated `id` are used
```
