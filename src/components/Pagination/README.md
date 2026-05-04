<!--GITHUB_BLOCK-->

# Pagination

<!--/GITHUB_BLOCK-->

```tsx
import {Pagination} from '@gravity-ui/uikit';
```

This component renders pagination.

## Usage

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const pagination = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```

## Properties

| Name            | Description                                                                                                            |          Type          |   Default    |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------- | :--------------------: | :----------: |
| className       | `class` HTML attribute                                                                                                 |        `string`        |              |
| compact         | Hides the title for the `First`, `Previous`, and `Next` buttons. Always set to `true` in mobile version.               |       `boolean`        |    `true`    |
| onUpdate        | Called when the page number or `pageSize` is changed                                                                   |       `Function`       |              |
| size            | Size of the pagination items. By default, its value is `l` in mobile version and `m`, in desktop version               |        `string`        |              |
| page            | Current page number                                                                                                    |        `number`        |              |
| pageSize        | Number of data items per page                                                                                          |        `number`        |              |
| pageSizeOptions | Allows you to specify the `sizeChanger` options                                                                        |       `number[]`       |              |
| total           | Total number of data items                                                                                             |        `number`        |              |
| showInput       | Shows input to navigate to pages directly                                                                              |       `boolean`        |   `false`    |
| showPages       | Shows page numbering                                                                                                   |       `boolean`        |    `true`    |
| qa              | `data-qa` HTML attribute, used for testing                                                                             |        `string`        |              |
| view            | Sets buttons' and controls' appearance. Affects pagination input's view in mobile.                                     | `"outlined"` `"clear"` | `"outlined"` |
| component       | Overrides the root element for clickable pagination items (navigation and page buttons). Useful for router-aware links |  `React.ElementType`   |              |
| getItemProps    | Returns extra props per clickable item (e.g. `to` for a router `Link`). Only applied when `component` is set           |       `Function`       |              |

## Custom component

You can override the root element of clickable pagination items (navigation and page buttons) using the `component` prop. Combined with `getItemProps`, this lets you render real anchors with proper `href`/`to` so middle-click "Open in new tab", right-click, focus, and prefetch all work.

```jsx
import {Pagination} from '@gravity-ui/uikit';
import type {PaginationProps, GetPaginationItemProps} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const getItemProps: GetPaginationItemProps = (item) => {
  if (item.type === 'page') {
    return {to: `?page=${item.page}`};
  }
  switch (item.action) {
    case 'first':
      return {to: '?page=1'};
    case 'previous':
      return {to: `?page=${Math.max(1, state.page - 1)}`};
    case 'next':
      return {to: `?page=${state.page + 1}`};
    default:
      return {};
  }
};

const pagination = (
  <Pagination
    page={state.page}
    pageSize={state.pageSize}
    total={1000}
    onUpdate={handleUpdate}
    component={Link}
    getItemProps={getItemProps}
  />
);
```

`getItemProps` is called for each clickable item (page buttons and navigation buttons). It is **not** called for ellipsis, the "page of" indicator, or the simple (current) page item in the mobile layout. Pagination-managed props (`onClick`, `className`, `size`, `view`, `selected`, `disabled`, `qa`) take precedence over values returned by `getItemProps`.
