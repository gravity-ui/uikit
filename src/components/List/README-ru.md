<!--GITHUB_BLOCK-->

# List

<!--/GITHUB_BLOCK-->

```tsx
import {List} from '@gravity-ui/uikit';
```

### ItemsHeight

Определяет высоту списка элементов (или функцию, возвращающую значение высоты для списка). Данное свойство может быть полезным, когда высота списка задается динамически, например,`(items: []) => number`.

### Items

Передает массив элементов для списка:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} />
`}>
    <UIKit.List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<List items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']} itemsHeight={160} />
```

<!--/GITHUB_BLOCK-->

Элемент может быть представлен скалярным или произвольным значением (при этом он всегда должен быть `truthy`).
В случае произвольного значения обязательно указывайте функции фильтрации и рендеринга.
Рендеринг по умолчанию передает элемент только как текст.

Специальное поле `item.disabled` делает элемент неактивным.

Настройка рендеринга и высоты открывает множество возможностей для экспериментов.
Например, код ниже позволяет эмулировать группы:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={[{title: 'one', group: true,disabled: true}, {title: 'two'},
    {
      title: 'three',
      group: true,
      disabled: true,
    },
    {
      title: 'four',
    },
  ]} onItemClick={(value) => console.log(value)}
  renderItem={(item) => {
    if (item.group) {
      return (
        <div className={'group'}>
          <div className={'select-text'}>{item.title}</div>
        </div>
      );
    }
    return (
      <div className={'select'}>
        <div className={'select-text'}>{item.title}</div>
      </div>
    );
  }}
  itemHeight={(item) => (item.group ? 24 : 36)}
  itemsHeight={160}
  filterItem={(filter) => (item) => item.title.includes(filter)}
/>
`}>
    <UIKit.List items={[
    {
      title: 'one',
      group: true,
      disabled: true,
    },
    {
      title: 'two',
    },
    {
      title: 'three',
      group: true,
      disabled: true,
    },
    {
      title: 'four',
    },
  ]} onItemClick={(value) => console.log(value)}
  renderItem={(item) => {
    if (item.group) {
      return (
        <div className={'group'}>
          <div className={'select-text'}>{item.title}</div>
        </div>
      );
    }
    return (
      <div className={'select'}>
        <div className={'select-text'}>{item.title}</div>
      </div>
    );
  }}
  itemHeight={(item) => (item.group ? 24 : 36)}
  itemsHeight={160}
  filterItem={(filter) => (item) => item.title.includes(filter)}
/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<List
  items={[
    {
      title: 'one',
      group: true,
      disabled: true,
    },
    {
      title: 'two',
    },
    {
      title: 'three',
      group: true,
      disabled: true,
    },
    {
      title: 'four',
    },
  ]}
  onItemClick={(value) => console.log(value)}
  renderItem={(item) => {
    if (item.group) {
      return (
        <div className={'group'}>
          <div className={'select-text'}>{item.title}</div>
        </div>
      );
    }
    return (
      <div className={'select'}>
        <div className={'select-text'}>{item.title}</div>
      </div>
    );
  }}
  itemHeight={(item) => (item.group ? 24 : 36)}
  itemsHeight={160}
  filterItem={(filter) => (item) => item.title.includes(filter)}
/>
```

<!--/GITHUB_BLOCK-->

### `Filterable`

Свойство `filterable` отключает возможность ввода для поиска элемента, если его значение — `false`. Значение по умолчанию — `true`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} filterable={false} />
`}>
    <UIKit.List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} filterable={false} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<List
  items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
  itemsHeight={160}
  filterable={false}
/>
```

<!--/GITHUB_BLOCK-->

### Sortable

Свойство `sortable` позволяет менять местами элементы списка, если его значение — `true`. Значение по умолчанию — `false`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} sortable={true} />
`}>
    <UIKit.List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} sortable={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<List
  items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
  itemsHeight={160}
  sortable={true}
/>
```

<!--/GITHUB_BLOCK-->

### Виртуализация

Чтобы виртуализация работала, нужно выполнить одно из двух условий:

1. Задать свойство `itemsHeight`. В этом случае высота списка будет фиксированной и равной указанному значению.
2. Задать родительскому контейнеру списка стиль `display: flex`. В этом случае список будет подстраиваться под ширину контейнера.

### Внешнее управление

Иногда может потребоваться управлять действиями элементов с клавиатуры, сохраняя фокус на внешнем элементе.
В этом случае можно использовать передачу события `onKeyDown` в список.
Аналогичным образом можно передать `onFocus` и `onBlur`, если нужно воспроизвести поведение при потере активного элемента.

### `Filter`

Свойство `filter` позволяет задать значение фильтра, используемое для внешней сортировки.

### PropTypes

| Имя               | Описание                                                                                                                                                                                                          | Тип               | Значение по умолчанию |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- | :-------------------- |
| [items](#items)   | Список элементов                                                                                                                                                                                                  | `Array`           | []                    |
| itemHeight        | Высота элемента в `px` или функция, возвращающая значение высоты для элемента: `(item: any) => number`.                                                                                                           | `Number/Function` | 28                    |
| itemsHeight       | Высота списка элементов или функция, возвращающая значение высоты для списка. Данное свойство может быть полезным, когда высота списка задается динамически: `(items: []) => number`.                             | `Number/Function` |                       |
| renderItem        | Функция рендеринга, получающая на вход элемент и возвращающая узел React: `(item: any, isItemActive: bool, itemIndex: number) => React.ReactNode`.                                                                | `Function`        |                       |
| filterItem        | Функция фильтрации, которая принимает введенную строку в инпут поиска/фильтрации и возвращает функцию, принимающую на вход элемент и возвращающую булевое значение: `(filter: string) => (item: any) => boolean`. | `Function`        |                       |
| filterable        | Флаг, активирующий поле фильтра.                                                                                                                                                                                  | `Boolean`         | true                  |
| filterPlaceholder | Заглушка для поля фильтра.                                                                                                                                                                                        | `String`          |                       |
| filter            | Значение фильтра (при использовании внешней сортировки).                                                                                                                                                          | `String`          |                       |
| filterClassName   | Класс для стилизации ввода фильтра.                                                                                                                                                                               | `String`          |                       |
| onChangeFilter    | Обработчик изменения фильтра (при использовании внешней сортировки): `(filter: string) => void`.                                                                                                                  | `Function`        |                       |
| onFilterEnd       | Функция, вызываемая после завершения внутренней фильтрации: `({items}: {items: T[]}) => void`.                                                                                                                    | `Function`        |                       |
| emptyPlaceholder  | Заглушка для пустого списка.                                                                                                                                                                                      | `React.ReactNode` |                       |
| sortable          | Флаг, включающий сортировку списка.                                                                                                                                                                               | `Boolean`         |                       |
| sortHandleAlign   | Выравнивание индикатора сортировки (слева или справа).                                                                                                                                                            | `left` `right`    |                       |
| onSortEnd         | Обработчик события сортировки — `({oldIndex: number, newIndex: number}) => void`.                                                                                                                                 | `Function`        |                       |
| virtualized       | Флаг, включающий виртуализацию. При выключенном флаге будут отрисованы все элементы сразу.                                                                                                                        | `Boolean`         | true                  |
| onItemClick       | Обработчик клика по элементу — `(item: any, index: number, fromKeyboard?: bool) => void`.                                                                                                                         | `Function`        |                       |
| deactivateOnLeave | При выставленном флаге выбор элемента сбрасывается при уходе курсора с элемента или потере фокуса списком. При снятом — последний выбранный элемент будет оставаться выбранным.                                   | `Boolean`         | true                  |
| activeItemIndex   | При заданном значении элемент с этим индексом рендерится как активный.                                                                                                                                            | `Number`          |                       |
| selectedItemIndex | При заданном значении элемент с этим индексом рендерится как выбранный (цвет фона из `--g-color-base-selection`).                                                                                                 | `Number/Array`    |                       |
| itemClassName     | Пользовательское имя класса, которое будет добавлено в контейнер элемента.                                                                                                                                        | `String`          |                       |
| itemsClassName    | Пользовательское имя класса, которое будет добавлено в список элементов.                                                                                                                                          | `String`          |                       |
| role              | HTML-атрибут `role`.                                                                                                                                                                                              | `String`          | list                  |
| id                | HTML-атрибут `id`.                                                                                                                                                                                                | `string`          |                       |
| onChangeActive    | Вызывается при изменении индекса варианта в списке, который выделен клавиатурным фокусом: `(index?: number) => void`.                                                                                             | `Function`        |                       |
