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

## Custom component

You can override the root element of clickable pagination items (navigation and page buttons) using the `navigationComponent` prop. Pass `navigationComponent="a"` and return `href` from `getItemProps` to use regular links. For router integrations, pass a router-aware component such as `Link` and return router-specific props, for example `to`.

`getItemProps` is called for each clickable item (page buttons and navigation buttons). It is **not** called for ellipsis, the "page of" indicator, the simple (current) page item in the mobile layout, or disabled navigation buttons (those always stay an inert native `<button disabled>` so they cannot be activated, including via keyboard). Pagination-managed props (`onClick`, `className`, `size`, `view`, `selected`, `disabled`, `qa`, `aria-current`, `extraProps`, `children`) take precedence over values returned by `getItemProps`.

### Regular links (`navigationComponent="a"`)

```jsx
import {Pagination} from '@gravity-ui/uikit';
import type {PaginationProps, GetPaginationItemProps} from '@gravity-ui/uikit';

const total = 1000;
const page = 1;
const pageSize = 100;

const noop: PaginationProps['onUpdate'] = () => {};

const getItemProps: GetPaginationItemProps = ({page}) => ({href: `?page=${page}`});

const pagination = (
  <Pagination
    page={page}
    pageSize={pageSize}
    total={total}
    onUpdate={noop}
    navigationComponent="a"
    getItemProps={getItemProps}
  />
);
```

### Router links (e.g. `react-router`)

```jsx
import {Pagination} from '@gravity-ui/uikit';
import type {PaginationProps, GetPaginationItemProps} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

const total = 1000;
const page = 1;
const pageSize = 100;

const noop: PaginationProps['onUpdate'] = () => {};

const getItemProps: GetPaginationItemProps<{to: string}> = ({page}) => ({
  to: `?page=${page}`,
});

const pagination = (
  <Pagination
    page={page}
    pageSize={pageSize}
    total={total}
    onUpdate={noop}
    navigationComponent={Link}
    getItemProps={getItemProps}
  />
);
```

## Properties

| Name                | Description                                                                                                                                      |           Type           |   Default    |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------: | :----------: |
| className           | `class` HTML attribute                                                                                                                           |         `string`         |              |
| compact             | Hides the title for the `First`, `Previous`, and `Next` buttons. Always set to `true` in mobile version.                                         |        `boolean`         |    `true`    |
| onUpdate            | Called when the page number or `pageSize` is changed                                                                                             |        `Function`        |              |
| size                | Size of the pagination items. By default, its value is `l` in mobile version and `m`, in desktop version                                         |         `string`         |              |
| page                | Current page number                                                                                                                              |         `number`         |              |
| pageSize            | Number of data items per page                                                                                                                    |         `number`         |              |
| pageSizeOptions     | Allows you to specify the `sizeChanger` options                                                                                                  |        `number[]`        |              |
| total               | Total number of data items                                                                                                                       |         `number`         |              |
| showInput           | Shows input to navigate to pages directly                                                                                                        |        `boolean`         |   `false`    |
| showPages           | Shows page numbering                                                                                                                             |        `boolean`         |    `true`    |
| qa                  | `data-qa` HTML attribute, used for testing                                                                                                       |         `string`         |              |
| view                | Sets buttons' and controls' appearance. Affects pagination input's view in mobile.                                                               |  `"outlined"` `"clear"`  | `"outlined"` |
| navigationComponent | Overrides the root element for clickable pagination items (navigation and page buttons). Use `"a"` for regular links or a router-aware component |  `PaginationComponent`   |              |
| getItemProps        | Returns extra props per clickable item (e.g. `href` for `"a"` or `to` for a router `Link`). Only applied when `navigationComponent` is set       | `GetPaginationItemProps` |              |
