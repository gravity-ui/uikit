<!--GITHUB_BLOCK-->

# List (unstable)

<!--/GITHUB_BLOCK-->

```tsx
import {unstable_List as List} from '@gravity-ui/uikit/unstable';
```

Навигируемый список (`role="listbox"`): клавиатурная навигация (roving tabindex,
`↑`/`↓` с зацикливанием, `Home`/`End`, typeahead), активация по наведению,
секции из данных. Слои выделения, виртуализации и drag-and-drop подключаются
отдельно и появятся в следующих итерациях.

## Использование

Массив строк — ноль конфигурации:

```tsx
<List aria-label="Fruits" items={['Apple', 'Pear', 'Plum']} />
```

Объекты — один геттер контента (`id`/`disabled`/`children` читаются из
одноимённых полей, поведение настраивается геттерами `getItemId`,
`getItemDisabled`, `getItemChildren`, `getItemTextValue`):

```tsx
<List aria-label="Projects" items={projects} getItemContent={(p) => p.name} />
```

Узел с `children` рендерится как секция — заголовок + опции:

```tsx
const items = [
  {
    id: 'recent',
    label: 'Recent',
    children: [
      /* опции */
    ],
  },
  {
    id: 'all',
    label: 'All',
    children: [
      /* опции */
    ],
  },
];
<List aria-label="Groups" items={items} getItemContent={(i) => i.label} />;
```

«Применение» айтема (Enter или клик):

```tsx
<List
  aria-label="Actions"
  items={commands}
  getItemContent={(c) => c.title}
  onItemAction={(id, command) => runCommand(command)}
/>
```

## Кастомный рендер строки

Три ступени контента:

1. `getItemContent` — что показать (90% случаев);
2. `renderItem` + `List.ItemView` — свои слоты (`description`, `startContent`,
   `endContent`), стили и индикация состояний вьюхи сохраняются;
3. `renderItem` + свой маркап — полный контроль.

Все DOM/a11y-props строки приходят из ядра через `getItemProps()`;
`getItemViewProps()` отдаёт состояние строки в терминах пропсов вьюхи:

```tsx
<List
  aria-label="Users"
  items={users}
  getItemTextValue={(u) => u.name}
  renderItem={(ctx, {getItemProps, getItemViewProps}) => (
    <List.ItemView {...getItemProps()} {...getItemViewProps()} description={ctx.item.email}>
      {ctx.item.name}
    </List.ItemView>
  )}
/>
```

Переопределения, переданные в `getItemProps(overrides)`, компонуются с базовыми
props: `on*`-обработчики вызываются цепочкой (переданный — после базового),
`className` конкатенируется, `ref` форкается, `style` мёржится по ключам.

## Свойства

| Имя                 | Описание                                     |                   Тип                    | Значение по умолчанию  |
| :------------------ | :------------------------------------------- | :--------------------------------------: | :--------------------: |
| items               | Данные списка (строки или объекты)           |              `readonly T[]`              |                        |
| aria-label          | Имя списка для SR (или `aria-labelledby`)    |                 `string`                 |                        |
| getItemId           | Уникальный id айтема                         |          `(item: T) => string`           |     `(i) => i.id`      |
| getItemDisabled     | Недоступность айтема                         |          `(item: T) => boolean`          | `(i) => !!i.disabled`  |
| getItemChildren     | Дети секции                                  | `(item: T) => readonly T[] \| undefined` |  `(i) => i.children`   |
| getItemContent      | Контент строки                               |      `(item: T) => React.ReactNode`      |                        |
| getItemTextValue    | Текст для typeahead                          |          `(item: T) => string`           | `content`, если строка |
| activeItemId        | Активный (подсвеченный) айтем, controlled    |                 `string`                 |                        |
| defaultActiveItemId | Активный айтем, uncontrolled                 |                 `string`                 |                        |
| onActiveItemUpdate  | Колбэк смены активности                      |   `(id: string \| undefined) => void`    |                        |
| onItemAction        | «Применение» айтема: Enter или клик          |     `(id: string, item: T) => void`      |                        |
| activateOnHover     | Активация наведением                         |                `boolean`                 |         `true`         |
| renderItem          | Кастомный рендер строки                      |         `(ctx, helpers) => node`         |                        |
| id                  | База id строк + цель внешних `aria-controls` |                 `string`                 |        авто-id         |
| size                | Размер строк                                 |       `'s' \| 'm' \| 'l' \| 'xl'`        |         `'m'`          |
| className           | Класс корневого элемента                     |                 `string`                 |                        |
| style               | Стили корневого элемента                     |          `React.CSSProperties`           |                        |
| qa                  | Атрибут `data-qa` (тесты)                    |                 `string`                 |                        |
