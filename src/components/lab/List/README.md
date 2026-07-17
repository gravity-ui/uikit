<!--GITHUB_BLOCK-->

# List (unstable)

<!--/GITHUB_BLOCK-->

```tsx
import {unstable_List as List} from '@gravity-ui/uikit/unstable';
```

Навигируемый список (`role="listbox"`): клавиатурная навигация (roving tabindex,
`↑`/`↓` с зацикливанием, `Home`/`End`, typeahead), активация по наведению,
секции из данных, опциональные слои выделения и виртуализации. Слой
drag-and-drop подключается отдельно и появится в следующих итерациях.

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

## Выделение

Слой выделения включает `selectionMode` — пока он не передан, выделения нет:
ни `aria-selected` на опциях, ни `aria-multiselectable` на контейнере, ни
`ctx.state.selected`, ни реакции на `Space` («не выбран» ≠ «не выбирается» для
скринридера).

```tsx
<List
  aria-label="Projects"
  items={projects}
  getItemContent={(p) => p.name}
  selectionMode="single"
  selectedIds={sel}
  onSelectedUpdate={setSel}
/>
```

`selectedIds`/`defaultSelectedIds`/`onSelectedUpdate` работают с массивом id
(controlled/uncontrolled — как и активность).

Жесты при включённом слое — клик, `Enter` и `Space` (в `Space` уходит поиск,
если typeahead-буфер не пуст):

- `single` — жест заменяет выделение; повторный жест по выбранной строке её
  не снимает (радио-семантика) и не дёргает `onSelectedUpdate`;
- `multiple` — жест переключает выделение строки.

Если передан `onItemAction`, он вызывается тем же жестом — после обновления
выделения. Заголовки секций и `disabled`-опции не выбираются.

Индикация выделения в дефолтном рендере — как в `Select`: `single` подсвечивает
строку, `multiple` показывает галочку (`selectionStyle` вьюхи — `'highlight'`
и `'check'` соответственно). Кастомный `renderItem` получает то же самое из
`getItemViewProps()`.

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

## Виртуализация

Слой виртуализации включается обёрткой `<ListVirtualizer>` — список рендерит
только видимое окно строк. Слой пока **не экспортируется из пакета** (обкатка
в лабе): наружу он уедет отдельным энтрипоинтом, чтобы
`@tanstack/react-virtual` не попадал в общий граф модулей.

```tsx
<ListVirtualizer estimateItemSize={(ctx) => (ctx.item.description ? 56 : 36)}>
  {/* корень List — скролл-контейнер: потребитель обязан ограничить высоту */}
  <List
    aria-label="Logs"
    style={{height: 480}}
    items={thousands}
    getItemContent={(r) => r.message}
    selectionMode="single"
    selectedIds={sel}
    onSelectedUpdate={setSel}
  />
</ListVirtualizer>
```

Скролл-контейнер — корневой элемент самого `List` (`overflow: auto` он получает
автоматически); ограничить его высоту (`height`/`max-height`) обязан
потребитель — иначе окно вырождается в полный список.

Слой не меняет контракт списка: кастомный `renderItem` работает без изменений,
слои выделения и виртуализации независимы. Активная строка (а без неё — строка
с tab-stop) всегда остаётся смонтированной, поэтому фокус и клавиатурная
навигация переживают выгрузку строк из окна; на опциях появляются
`aria-setsize`/`aria-posinset` с нумерацией по опциям (заголовки секций не
считаются). При клавиатурной навигации список доскролливает к активной строке
ровно недостающую высоту (`scrollIntoView` c `block: 'nearest'`); активация
наведением скролл не двигает.

Полная высота скролла видна сразу: пока строка не отрендерена, её высота — это
оценка, но оценка хвоста непрерывно корректируется коэффициентом
«замерено/оценено» по уже замеренным строкам. Сразу после первого кадра
скроллбар отражает высоту, близкую к истинной, и не «растёт» по мере прокрутки;
точность (и стабильность ползунка) тем выше, чем точнее `estimateItemSize`.

Свойства `ListVirtualizer`:

| Имя              | Описание                                                                           |             Тип             | Значение по умолчанию |
| :--------------- | :--------------------------------------------------------------------------------- | :-------------------------: | :-------------------: |
| children         | `<List>` внутри (контекст листа проходит сквозь обёртку)                           |         `ReactNode`         |                       |
| estimateItemSize | Оценка высоты строки до рендера — константа или функция от контекста строки        | `number \| (ctx) => number` |    по `size` листа    |
| measure          | Мерить фактические высоты строк после маунта (строки переменной высоты из коробки) |          `boolean`          |        `true`         |
| overscan         | Буфер строк за видимым окном                                                       |          `number`           |          `5`          |

Функция-оценка получает контекст строки (`ctx.item`, `ctx.kind` — заголовки
секций приходят с `kind: 'section'`), поэтому переменная высота оценивается
по данным потребителя; разброс фактических высот закрывает `measure`.

### `measure`: когда выключать

По умолчанию (`measure: true`) слой вешает `ResizeObserver` на строки в окне и
заменяет оценку фактической высотой. Поэтому строки переменной высоты (перенос
текста, `description`, секция ≠ опция) работают из коробки, а неточная оценка
остаётся косметикой: факт доедет и подтянет позиции и скроллбар.

`measure={false}` убирает `ResizeObserver` и чтения layout, а главное — каскад
«новый замер → пересчёт измерений → ре-рендер», заметный на списке в десятки
тысяч строк при первом проходе сверху вниз (дальше размеры закешированы, и
разница почти исчезает — на списках в сотни строк выигрыш незаметен).

Выключать имеет смысл, только когда высота строки **детерминирована и точно
равна оценке**: однострочный контент без переносов, без слотов, меняющих
высоту, — и при этом `estimateItemSize` задан **явно**. Дефолтная оценка (по
`size` листа) для этого не годится: она списана с `min-height` вьюхи, то есть
это нижняя граница высоты, а не факт.

Цена ошибки: самолечения нет. Неверная оценка при выключенном `measure` — это
навсегда неверная геометрия (строки наезжают друг на друга или расходятся
щелями, скроллбар врёт, доскролл к активной строке промахивается), причём
молча. «Одинаковую» высоту ломают перенос текста при сужении контейнера,
переопределение `--g-list-item-view-min-height`, поздняя загрузка шрифта и
увеличенный системный размер шрифта. Если есть сомнение, одинаковые ли
строки, — значит, не одинаковые.

**SSR:** на сервере виртуализатор не знает размеров вьюпорта и отдаёт пустое
окно — в HTML не попадает ни одной строки, содержимое появляется после гидрации
(возможен флик).

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
| onItemAction        | «Применение»: клик/Enter (+Space со слоем)   |     `(id: string, item: T) => void`      |                        |
| selectionMode       | Включает слой выделения                      |         `'single' \| 'multiple'`         |                        |
| selectedIds         | Выделенные айтемы, controlled                |           `readonly string[]`            |                        |
| defaultSelectedIds  | Выделенные айтемы, uncontrolled              |           `readonly string[]`            |                        |
| onSelectedUpdate    | Колбэк смены выделения                       |        `(ids: string[]) => void`         |                        |
| activateOnHover     | Активация наведением                         |                `boolean`                 |         `true`         |
| renderItem          | Кастомный рендер строки                      |         `(ctx, helpers) => node`         |                        |
| id                  | База id строк + цель внешних `aria-controls` |                 `string`                 |        авто-id         |
| size                | Размер строк                                 |       `'s' \| 'm' \| 'l' \| 'xl'`        |         `'m'`          |
| className           | Класс корневого элемента                     |                 `string`                 |                        |
| style               | Стили корневого элемента                     |          `React.CSSProperties`           |                        |
| qa                  | Атрибут `data-qa` (тесты)                    |                 `string`                 |                        |
