<!--GITHUB_BLOCK-->

# Pagination

<!--/GITHUB_BLOCK-->

```tsx
import {Pagination} from '@gravity-ui/uikit';
```

This component renders pagination.

## Usage

There are 2 ways of using pagination: as [links](#links) and as [buttons](#buttons).

### Links

In this case user will iteract with pagination's controls(input component is an exception) as with links. Pages are available to open (from context menu for example) in new tab, new window, etc.

Set `pageHrefBuilder` prop to use pagination as links.

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const pageHrefBuilder: PaginationProps['pageHrefBuilder'] = (page, pageSize) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set(PAGE_PARAM, String(page));
        queryParams.set(PAGE_SIZE_PARAM, String(pageSize));
        return window.location.href.replace(window.location.search, `?${queryParams.toString()}`);
    },

const pagination = <Pagination page={1} pageSize={100} total={1000} pageHrefBuilder={pageHrefBuilder} />;
```

### Buttons

In this case user will iteract with pagination's controls as with buttons.

Set `onUpdate` prop to use pagination as links (`pageHrefBuilder` must be `undefined`).

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const pagination = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```

## Properties

| Name            | Description                                                                                              |    Type    | Default |
| :-------------- | :------------------------------------------------------------------------------------------------------- | :--------: | :-----: |
| className       | `class` HTML attribute                                                                                   |  `string`  |         |
| compact         | Hides the title for the `First`, `Previous`, and `Next` buttons. Always set to `true` in mobile version. | `boolean`  | `true`  |
| pageHrefBuilder | Function to create links for pagination controls                                                         | `Function` |         |
| onUpdate        | Called when the page number or `pageSize` is changed(only if `pageHrefBuilder` not set)                  | `Function` |         |
| size            | Size of the pagination items. By default, its value is `l` in mobile version and `m`, in desktop version |  `string`  |         |
| page            | Current page number                                                                                      |  `number`  |         |
| pageSize        | Number of data items per page                                                                            |  `number`  |         |
| pageSizeOptions | Allows you to specify the `sizeChanger` options                                                          | `number[]` |         |
| total           | Total number of data items                                                                               |  `number`  |         |
| showInput       | Shows input to navigate to pages directly                                                                | `boolean`  | `false` |
| showPages       | Shows page numbering                                                                                     | `boolean`  | `true`  |
| qa              | `data-qa` HTML attribute, used for testing                                                               |  `string`  |         |
