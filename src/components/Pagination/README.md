<!--GITHUB_BLOCK-->

# Pagination

<!--/GITHUB_BLOCK-->

```tsx
import {Pagination} from '@gravity-ui/uikit';
```

This component renders pagination.

## Usage

There are 2 ways of using pagination: as [buttons](#buttons) and as [custom controls](#custom-constrols) .

### Buttons

In this case user will iteract with pagination's controls as with buttons.

Set `onUpdate` prop to use pagination as buttons (`buttonWraper` must be `undefined`).

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const pagination = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```

### Custom components

In this case user will iteract with pagination's buttons as with custom controls.

Set `buttonWraper` prop to use pagination as custom contrlols. In this case `onUpdate` will fire only on input and select components.

> For example, you can wrap it in `<a/>` tag and use them as links. Pages will be available to open (from context menu for example) in new tab, new window, etc.

#### Links example

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const PAGE_PARAM = 'page_number';
const PAGE_SIZE_PARAM = 'page_size';

function pageHrefBuilder(page: number, pageSize: number) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(PAGE_PARAM, String(page));
    queryParams.set(PAGE_SIZE_PARAM, String(pageSize));
    return window.location.href.replace(window.location.search, `?${queryParams.toString()}`);
}

const [state, setState] = React.useState({page: 1, pageSize: 100});

const renderWrapper = ({page, pageSize, button}) => {
        return button.props.disabled ? (
            button
        ) : (
            <a href={pageHrefBuilder(page, pageSize)} key={button.key}>
                {button}
            </a>
        );
    },

const handleUpdate = (page, pageSize)=>{
        window.location.href = pageHrefBuilder(page, pageSize);
    }

const pagination = <Pagination
        page={1}
        pageSize={100}
        total={1000}
        buttonWrapper={renderWrapper}
        onUpdate={(page, pageSize)=>setState({page, pageSize})}
    >;
```

#### Links for react-router SPA way

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';
import {useNavigate, Link} from 'react-router-dom';

const PAGE_PARAM = 'page_number';
const PAGE_SIZE_PARAM = 'page_size';

function pageHrefBuilder(page: number, pageSize: number) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(PAGE_PARAM, String(page));
    queryParams.set(PAGE_SIZE_PARAM, String(pageSize));
    return window.location.href.replace(window.location.search, `?${queryParams.toString()}`);
}

const [state, setState] = React.useState({page: 1, pageSize: 100});
const navigate = useNavigate();

const renderWrapper = ({page, pageSize, button}) => {
        return button.props.disabled ? (
            button
        ) : (
            <Link to={pageHrefBuilder(page, pageSize)} key={button.key}>
                {button}
            </a>
        );
    },

const handleUpdate = (page, pageSize)=>{
        navigate(pageHrefBuilder(page, pageSize));
    }

const pagination = <Pagination
        page={1}
        pageSize={100}
        total={1000}
        buttonWrapper={renderWrapper}
        onUpdate={(page, pageSize)=>setState({page, pageSize})}
    >;
```

## Properties

| Name            | Description                                                                                                       |    Type    | Default |
| :-------------- | :---------------------------------------------------------------------------------------------------------------- | :--------: | :-----: |
| className       | `class` HTML attribute                                                                                            |  `string`  |         |
| compact         | Hides the title for the `First`, `Previous`, and `Next` buttons. Always set to `true` in mobile version.          | `boolean`  | `true`  |
| buttonWraper    | Custom wrapper for paginations's button components                                                                | `Function` |         |
| onUpdate        | Called when the page number or `pageSize` is changed(if `buttonWraper` is set, it fires only on input and select) | `Function` |         |
| size            | Size of the pagination items. By default, its value is `l` in mobile version and `m`, in desktop version          |  `string`  |         |
| page            | Current page number                                                                                               |  `number`  |         |
| pageSize        | Number of data items per page                                                                                     |  `number`  |         |
| pageSizeOptions | Allows you to specify the `sizeChanger` options                                                                   | `number[]` |         |
| total           | Total number of data items                                                                                        |  `number`  |         |
| showInput       | Shows input to navigate to pages directly                                                                         | `boolean`  | `false` |
| showPages       | Shows page numbering                                                                                              | `boolean`  | `true`  |
| qa              | `data-qa` HTML attribute, used for testing                                                                        |  `string`  |         |
