<!--GITHUB_BLOCK-->

# Pagination

<!--/GITHUB_BLOCK-->

```tsx
import {Pagination} from '@gravity-ui/uikit';
```

Component to render a pagination.

## Usage

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const pagination = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```

## Properties

| Name            | Description                                                               |    Type    | Default |
| :-------------- | :------------------------------------------------------------------------ | :--------: | :-----: |
| className       | HTML `class` attribute                                                    |  `string`  |         |
| compact         | Hide first, previous, next buttons title. Always `true` in mobile version | `boolean`  | `true`  |
| onUpdate        | Called when the page number or pageSize is changed                        | `Function` |         |
| page            | Current page number                                                       |  `number`  |         |
| pageSize        | Number of data items per page                                             |  `number`  |         |
| pageSizeOptions | Specify the sizeChanger options                                           | `number[]` |         |
| total           | Total number of data items                                                |  `number`  |         |
| showInput       | Show input to navigate to pages directly                                  | `boolean`  | `false` |
| showPages       | Show pages numeration                                                     | `boolean`  | `true`  |
