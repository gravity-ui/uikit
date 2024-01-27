<!--GITHUB_BLOCK-->

# useSyncWithLS

<!--/GITHUB_BLOCK-->

```tsx
import {useSyncWithLS} from '@gravity-ui/uikit';
```

The `useSyncWithLS` hook executes callback when value changed in Local Storage

## Properties

| Name           | Description                                                  |      Type      |   Default   |
| :------------- | :----------------------------------------------------------- | :------------: | :---------: |
| callback       | Callback function called when key in local storage triggered | `VoidFunction` |             |
| dataSourceName | Name for data source of keys                                 |    `string`    | 'sync-tabs' |
| uniqueKey      | Key in local storage for handle                              |    `string`    |             |
