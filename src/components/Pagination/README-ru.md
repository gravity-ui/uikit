<!--GITHUB_BLOCK-->

# Pagination

<!--/GITHUB_BLOCK-->

```tsx
import {Pagination} from '@gravity-ui/uikit';
```

Компонент `Pagination` используется для рендеринга элементов постраничной навигации.

## Использование

```jsx
import {Pagination, PaginationProps} from '@gravity-ui/uikit';

const [state, setState] = React.useState({page: 1, pageSize: 100});

const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
  setState((prevState) => ({...prevState, page, pageSize}));

const pagination = <Pagination page={1} pageSize={100} total={1000} onUpdate={handleUpdate} />;
```

## Свойства

| Имя             | Описание                                                                                                                                               |          Тип           | Значение по умолчанию |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------: | :-------------------: |
| className       | HTML-атрибут `class`.                                                                                                                                  |        `string`        |                       |
| compact         | Скрывает заголовки для кнопок `First`, `Previous` и `Next`. В мобильной версии всегда имеет значение `true`.                                           |       `boolean`        |        `true`         |
| onUpdate        | Вызывается при изменении номера страницы или свойства `pageSize`.                                                                                      |       `Function`       |                       |
| size            | Размер элементов пагинации. По умолчанию `l` для мобильных и `m` для десктопных версий.                                                                |        `string`        |                       |
| page            | Номер текущей страницы.                                                                                                                                |        `number`        |                       |
| pageSize        | Количество элементов данных на одной странице.                                                                                                         |        `number`        |                       |
| pageSizeOptions | Позволяет указать опции для `sizeChanger`.                                                                                                             |       `number[]`       |                       |
| total           | Общее количество элементов данных.                                                                                                                     |        `number`        |                       |
| showInput       | Отображает элемент ввода для перехода к конкретной странице                                                                                            |       `boolean`        |        `false`        |
| showPages       | Отображает нумерацию страниц.                                                                                                                          |       `boolean`        |        `true`         |
| qa              | HTML-атрибут `data-qa`, используется для тестирования.                                                                                                 |        `string`        |                       |
| view            | Устанавливает внешний вид кнопок и элементов управления. Влияет на внешний вид ввода пагинации в мобильной версии.                                     | `"outlined"` `"clear"` |     `"outlined"`      |
| component       | Переопределяет корневой элемент кликабельных элементов пагинации (навигационных и постраничных кнопок). Полезно для интеграции с компонентами роутера. |  `React.ElementType`   |                       |
| getItemProps    | Возвращает дополнительные props для каждого кликабельного элемента (например, `to` для `Link` из роутера). Применяется только когда задан `component`. |       `Function`       |                       |

## Кастомный компонент

Вы можете переопределить корневой элемент кликабельных элементов пагинации (навигационных и постраничных кнопок) через свойство `component`. В сочетании с `getItemProps` это позволяет рендерить настоящие ссылки с корректным `href`/`to`, так что middle-click "Открыть в новой вкладке", контекстное меню, фокус и prefetch работают штатно.

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

`getItemProps` вызывается для каждого кликабельного элемента (кнопок страниц и навигационных кнопок). Он **не** вызывается для эллипсиса, индикатора "page of" и для простого (текущего) элемента страницы в мобильной разметке. Pagination-управляемые свойства (`onClick`, `className`, `size`, `view`, `selected`, `disabled`, `qa`) имеют приоритет над значениями, возвращёнными из `getItemProps`.
