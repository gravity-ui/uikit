<!--GITHUB_BLOCK-->

# Pagination

<!--/GITHUB_BLOCK-->

```tsx
import {Pagination} from '@gravity-ui/uikit';
```

Компонент `Pagination` используется для рендеринга элементов постраничной навигации.

## Использование

Возможны 2 способа взаимодействия с пагинацией: как [с кнопками](#кнопки) и как [с произвольными компонентами](#произвольные-компоненты).

### Кнопки

При использовании этого способа пользователь будет взаимодействовать с компонентами пагинации, как с кнопками.
Для этого необходимо указать свойство `onUpdate` (свойство `buttonWrapper` должно быть `undefined`)

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({page, pageSize}));

const pagination = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```

### Произвольные компоненты

При использовании этого способа пользователь будет взаимодействовать кнопками пагинации, как с произвольными компонентами.

Для этого необходимо указать свойство `buttonWraper`. В этом случае `onUpdate` будет вызываться только при изменении компонентов input и select.

> Например, можно обернуть кнопки в тег `<a/>` и взаимодействовать с ними, как с ссылками. Это позволит открывать страницы (например, из контекстного меню) в новой владке, в новом окне и т.д.

#### Пример использования ссылок

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

#### Пример использования ссылок из react-router в парадигме SPA

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

## Свойства

| Имя             | Описание                                                                                                                                                     |    Тип     | Значение по умолчанию |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: | :-------------------: |
| className       | HTML-атрибут `class`.                                                                                                                                        |  `string`  |                       |
| compact         | Скрывает заголовки для кнопок `First`, `Previous` и `Next`. В мобильной версии всегда имеет значение `true`.                                                 | `boolean`  |        `true`         |
| buttonWrapper   | Компонент-обертка над кнопками пагинации                                                                                                                     | `Function` |                       |
| onUpdate        | Вызывается при изменении номера страницы или свойства `pageSize` (ели задан параметр `buttonWrapper`, то `onUpdate` вызывается только в `input` и `select`). | `Function` |                       |
| size            | Размер элементов пагинации. По умолчанию `l` для мобильных и `m` для десктопных версий.                                                                      |  `string`  |                       |
| page            | Номер текущей страницы.                                                                                                                                      |  `number`  |                       |
| pageSize        | Количество элементов данных на одной странице.                                                                                                               |  `number`  |                       |
| pageSizeOptions | Позволяет указать опции для `sizeChanger`.                                                                                                                   | `number[]` |                       |
| total           | Общее количество элементов данных.                                                                                                                           |  `number`  |                       |
| showInput       | Отображает элемент ввода для перехода к конкретной странице                                                                                                  | `boolean`  |        `false`        |
| showPages       | Отображает нумерацию страниц.                                                                                                                                | `boolean`  |        `true`         |
| qa              | HTML-атрибут `data-qa`, используется для тестирования.                                                                                                       |  `string`  |                       |
