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

| Имя             | Описание                                                                                                     |    Тип     | Значение по умолчанию |
| :-------------- | :----------------------------------------------------------------------------------------------------------- | :--------: | :-------------------: |
| className       | HTML-атрибут `class`.                                                                                        |  `string`  |                       |
| compact         | Скрывает заголовки для кнопок `First`, `Previous` и `Next`. В мобильной версии всегда имеет значение `true`. | `boolean`  |        `true`         |
| onUpdate        | Вызывается при изменении номера страницы или свойства `pageSize`.                                            | `Function` |                       |
| size            | Размер элементов пагинации. По умолчанию `l` для мобильных и `m` для десктопных версий.                      |  `string`  |                       |
| page            | Номер текущей страницы.                                                                                      |  `number`  |                       |
| pageSize        | Количество элементов данных на одной странице.                                                               |  `number`  |                       |
| pageSizeOptions | Позволяет указать опции для `sizeChanger`.                                                                   | `number[]` |                       |
| total           | Общее количество элементов данных.                                                                           |  `number`  |                       |
| showInput       | Отображает элемент ввода для перехода к конкретной странице                                                  | `boolean`  |        `false`        |
| showPages       | Отображает нумерацию страниц.                                                                                | `boolean`  |        `true`         |
| qa              | HTML-атрибут `data-qa`, используется для тестирования.                                                       |  `string`  |                       |
