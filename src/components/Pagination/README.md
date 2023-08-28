# Pagination

Component to render a pagination.

## PropTypes

| Name            | Type                                       | Required | Default | Description                                                                |
| :-------------- | :----------------------------------------- | :------: | :------ | :------------------------------------------------------------------------- |
| page            | `number`                                   |   `+`    |         | Current page number                                                        |
| pageSize        | `number`                                   |   `+`    |         | Number of data items per page.                                             |
| onUpdate        | `(page: number, pageSize: number) => void` |   `+`    |         | Called when the page number or pageSize is changed                         |
| total           | `number`                                   |          |         | Total number of data items                                                 |
| pageSizeOptions | `number[]`                                 |          |         | Specify the sizeChanger options                                            |
| compact         | `boolean`                                  |          | `true`  | Hide first, previous, next buttons title. Always `true` in mobile version. |
| showInput       | `boolean`                                  |          | `false` | Show input to navigate to pages directly                                   |
| showPages       | `boolean`                                  |          | `true`  | Show pages numeration                                                      |

## Examples

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const persona = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```
