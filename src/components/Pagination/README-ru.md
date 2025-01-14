<!--GITHUB_BLOCK-->

# Pagination

<!--/GITHUB_BLOCK-->

```tsx
import {Pagination} from '@gravity-ui/uikit';
```

Компонент `Pagination` используется для рендеринга элементов постраничной навигации.

## Использование

Возможны 2 способа использвания пагинации: как [ссылки](#ссылки) и как [кнопки](#кнопки).

### Ссылки

При использовании этого способа пользователь будет взаимодействовать с компонентами пагинации (кроме поля ввода), как со ссылками. Появляется возможность откртывать страницы (например, из контекстного меню) в новой квладке, в новом окне и т.д.
Для этого необходимо указать свойство `pageHrefBuilder`.

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const PAGE_PARAM = 'page_number';
const PAGE_SIZE_PARAM = 'page_size';

const pageHrefBuilder: PaginationProps['pageHrefBuilder'] = (page, pageSize) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set(PAGE_PARAM, String(page));
        queryParams.set(PAGE_SIZE_PARAM, String(pageSize));
        return window.location.href.replace(window.location.search, `?${queryParams.toString()}`);
    },

const pagination = <Pagination page={1} pageSize={100} total={1000} pageHrefBuilder={pageHrefBuilder} />;
```

### Кнопки

При использовании этого способа пользователь будет взаимодействовать с компонентами пагинации (кроме поля ввода), как с кнопками.
Для этого необходимо указать свойство `onUpdate` (свойство `pageHrefBuilder` должно быть `undefined`)

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const pagination = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```

## Свойства

| Имя             | Описание                                                                                                                       |    Тип     | Значение по умолчанию |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------- | :--------: | :-------------------: |
| className       | HTML-атрибут `class`.                                                                                                          |  `string`  |                       |
| compact         | Скрывает заголовки для кнопок `First`, `Previous` и `Next`. В мобильной версии всегда имеет значение `true`.                   | `boolean`  |        `true`         |
| pageHrefBuilder | Функция для генерации ссылок пагинации                                                                                         | `Function` |                       |
| onUpdate        | Вызывается при изменении номера страницы или свойства `pageSize` (вызывается только если не задан параметр `pageHrefBuilder`). | `Function` |                       |
| size            | Размер элементов пагинации. По умолчанию `l` для мобильных и `m` для десктопных версий.                                        |  `string`  |                       |
| page            | Номер текущей страницы.                                                                                                        |  `number`  |                       |
| pageSize        | Количество элементов данных на одной странице.                                                                                 |  `number`  |                       |
| pageSizeOptions | Позволяет указать опции для `sizeChanger`.                                                                                     | `number[]` |                       |
| total           | Общее количество элементов данных.                                                                                             |  `number`  |                       |
| showInput       | Отображает элемент ввода для перехода к конкретной странице                                                                    | `boolean`  |        `false`        |
| showPages       | Отображает нумерацию страниц.                                                                                                  | `boolean`  |        `true`         |
| qa              | HTML-атрибут `data-qa`, используется для тестирования.                                                                         |  `string`  |                       |
