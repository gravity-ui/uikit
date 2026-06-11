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

## Кастомный компонент

Вы можете переопределить корневой элемент кликабельных элементов пагинации (навигационных и постраничных кнопок) через свойство `component`. Передайте `component="a"` и возвращайте `href` из `getItemProps`, чтобы использовать обычные ссылки. Для интеграции с роутером передайте компонент роутера, например `Link`, и возвращайте специфичные для него props, например `to`.

`getItemProps` вызывается для каждого кликабельного элемента (кнопок страниц и навигационных кнопок). Он **не** вызывается для многоточия, индикатора "page of", для простого (текущего) элемента страницы в мобильной разметке, а также для отключённых навигационных кнопок (они всегда остаются инертными нативными `<button disabled>` и не могут быть активированы, в том числе с клавиатуры). Pagination-управляемые свойства (`onClick`, `className`, `size`, `view`, `selected`, `disabled`, `qa`, `aria-current`, `extraProps`, `children`) имеют приоритет над значениями, возвращёнными из `getItemProps`.

### Обычные ссылки (`component="a"`)

```jsx
import {Pagination} from '@gravity-ui/uikit';
import type {PaginationProps, GetPaginationItemProps} from '@gravity-ui/uikit';

const total = 1000;
const page = 1;
const pageSize = 100;

const noop: PaginationProps['onUpdate'] = () => {};

const getItemProps: GetPaginationItemProps = (item) => {
  if (item.type === 'page') {
    return {href: `?page=${item.page}`};
  }

  const lastPage = Math.ceil(total / pageSize);

  switch (item.action) {
    case 'first':
      return {href: '?page=1'};
    case 'previous':
      return {href: `?page=${Math.max(1, page - 1)}`};
    case 'next':
      return {href: `?page=${Math.min(lastPage, page + 1)}`};
    default:
      return {};
  }
};

const pagination = (
  <Pagination
    page={page}
    pageSize={pageSize}
    total={total}
    onUpdate={noop}
    component="a"
    getItemProps={getItemProps}
  />
);
```

### Ссылки роутера (например, `react-router`)

```jsx
import {Pagination} from '@gravity-ui/uikit';
import type {PaginationProps, GetPaginationItemProps} from '@gravity-ui/uikit';
import {Link} from 'react-router-dom';

const total = 1000;
const page = 1;
const pageSize = 100;

const noop: PaginationProps['onUpdate'] = () => {};

const getItemProps: GetPaginationItemProps<{to: string}> = (item) => {
  if (item.type === 'page') {
    return {to: `?page=${item.page}`};
  }

  const lastPage = Math.ceil(total / pageSize);

  switch (item.action) {
    case 'first':
      return {to: '?page=1'};
    case 'previous':
      return {to: `?page=${Math.max(1, page - 1)}`};
    case 'next':
      return {to: `?page=${Math.min(lastPage, page + 1)}`};
    default:
      return {to: '?page=1'};
  }
};

const pagination = (
  <Pagination
    page={page}
    pageSize={pageSize}
    total={total}
    onUpdate={noop}
    component={Link}
    getItemProps={getItemProps}
  />
);
```

## Свойства

| Имя             | Описание                                                                                                                                                                    |           Тип            | Значение по умолчанию |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------: | :-------------------: |
| className       | HTML-атрибут `class`.                                                                                                                                                       |         `string`         |                       |
| compact         | Скрывает заголовки для кнопок `First`, `Previous` и `Next`. В мобильной версии всегда имеет значение `true`.                                                                |        `boolean`         |        `true`         |
| onUpdate        | Вызывается при изменении номера страницы или свойства `pageSize`.                                                                                                           |        `Function`        |                       |
| size            | Размер элементов пагинации. По умолчанию `l` для мобильных и `m` для десктопных версий.                                                                                     |         `string`         |                       |
| page            | Номер текущей страницы.                                                                                                                                                     |         `number`         |                       |
| pageSize        | Количество элементов данных на одной странице.                                                                                                                              |         `number`         |                       |
| pageSizeOptions | Позволяет указать опции для `sizeChanger`.                                                                                                                                  |        `number[]`        |                       |
| total           | Общее количество элементов данных.                                                                                                                                          |         `number`         |                       |
| showInput       | Отображает элемент ввода для перехода к конкретной странице                                                                                                                 |        `boolean`         |        `false`        |
| showPages       | Отображает нумерацию страниц.                                                                                                                                               |        `boolean`         |        `true`         |
| qa              | HTML-атрибут `data-qa`, используется для тестирования.                                                                                                                      |         `string`         |                       |
| view            | Устанавливает внешний вид кнопок и элементов управления. Влияет на внешний вид ввода пагинации в мобильной версии.                                                          |  `"outlined"` `"clear"`  |     `"outlined"`      |
| component       | Переопределяет корневой элемент кликабельных элементов пагинации (навигационных и постраничных кнопок). Используйте `"a"` для обычных ссылок или компонент роутера.         |  `PaginationComponent`   |                       |
| getItemProps    | Возвращает дополнительные props для каждого кликабельного элемента (например, `href` для `"a"` или `to` для `Link` из роутера). Применяется только когда задан `component`. | `GetPaginationItemProps` |                       |
