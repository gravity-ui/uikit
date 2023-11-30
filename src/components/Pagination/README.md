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

| Name            | Description                                                                                              |    Type    | Default |
| :-------------- | :------------------------------------------------------------------------------------------------------- | :--------: | :-----: |
| className       | HTML `class` attribute                                                                                   |  `string`  |         |
| compact         | Hides the title for the `First`, `Previous`, and `Next` buttons. Always set to `true` in mobile version. | `boolean`  | `true`  |
| onUpdate        | Called when the page number or `pageSize` is changed                                                     | `Function` |         |
| page            | Current page number                                                                                      |  `number`  |         |
| pageSize        | Number of data items per page                                                                            |  `number`  |         |
| pageSizeOptions | Allows you to specify the `sizeChanger` options                                                          | `number[]` |         |
| total           | Total number of data items                                                                               |  `number`  |         |
| showInput       | Shows input to navigate to pages directly                                                                | `boolean`  | `false` |
| showPages       | Shows pages numbering                                                                                    | `boolean`  | `true`  |
| qa              | HTML `data-qa` attribute, used in tests                                                                  |  `string`  |         |
