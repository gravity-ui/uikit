<!--GITHUB_BLOCK-->

# unstable_Suggest

<!--/GITHUB_BLOCK-->

```tsx
import {
  unstable_Suggest as Suggest,
  type unstable_SuggestOptionProps as SuggestOptionProps,
} from '@gravity-ui/uikit/unstable';
```

`Suggest` реализует паттерн [Editable Combobox with List Autocomplete](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/).

## Базовое использование

Опция повторяет форму как в `Select` — `value`, `content` (рендерится по умолчанию), опциональный `disabled` и опциональный дженерик-пейлоад `data`. Передайте `options` (синхронный массив) и обновляйте его в `onUpdate`:

<!--GITHUB_BLOCK-->

```tsx
const ALL_PLANETS = [
  {value: 'earth', content: 'Земля'},
  {value: 'europa', content: 'Европа'},
  {value: 'jupiter', content: 'Юпитер'},
];

const [value, setValue] = React.useState('');
const options = React.useMemo(
  () => ALL_PLANETS.filter((o) => o.value.toLowerCase().includes(value.toLowerCase())),
  [value],
);

<Suggest
  value={value}
  onUpdate={setValue}
  options={options}
  onOptionAction={(_value, option) => {
    setValue(option.value);
  }}
  placeholder="Поиск…"
/>;
```

По умолчанию отображается `content` опции, а если он не задан — `children`. Для изменения содержимого передайте `renderOption`.

<!--/GITHUB_BLOCK-->

## Асинхронная загрузка

При `loading === true` к существующим опциям добавляется строка загрузки.

Для пагинации показывайте её, пока выполняется запрос или доступны следующие страницы: `loading={isFetching || hasNextPage}`.

`onLoadMore` вызывается, когда строка загрузки становится видимой в непустом списке, с виртуализацией и без неё. Первый запрос запускайте в приложении: при пустом списке `onLoadMore` не вызывается. В примере `options`, `isFetching`, `hasNextPage` и `loadNextPage` предоставляются приложением; обработчик защищает от параллельных запросов.

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState('');

<Suggest
  value={value}
  onUpdate={setValue}
  options={options}
  loading={isFetching || hasNextPage}
  onLoadMore={() => {
    if (!isFetching && hasNextPage) {
      loadNextPage();
    }
  }}
  onOptionAction={(_value, option) => {
    setValue(option.value);
  }}
  placeholder="Поиск…"
/>;
```

<!--/GITHUB_BLOCK-->

## Кастомизация TextInput

Все пропсы `TextInput` (size, pin, hasClear, startContent, validationState, errorMessage, disabled и т.д.) передаются напрямую в `Suggest`:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  options={items}
  size="xl"
  hasClear
  placeholder="Поиск…"
  validationState={hasError ? 'invalid' : undefined}
  errorMessage={hasError ? 'Некорректный ввод' : undefined}
  startContent={<Icon data={SearchIcon} />}
/>
```

<!--/GITHUB_BLOCK-->

## Показывать опции при пустом вводе

Сам по себе фокус не открывает попап, даже если поле уже заполнено.
Попап открывается при вводе непустого значения, клике по полю или нажатии ArrowDown/ArrowUp.
Чтобы открывать попап при фокусе или оставлять его открытым после очистки поля,
управляйте состоянием открытия самостоятельно:

<!--GITHUB_BLOCK-->

```tsx
const [open, setOpen] = React.useState(false);

<Suggest
  value={value}
  onUpdate={setValue}
  open={open}
  onOpenChange={(nextOpen, _event, reason) => {
    if (!nextOpen && reason === 'input-change') {
      return;
    }
    setOpen(nextOpen);
  }}
  options={allItems}
  onFocus={() => setOpen(true)}
  placeholder="Нажмите, чтобы увидеть все варианты…"
/>;
```

<!--/GITHUB_BLOCK-->

## Кастомное содержимое попапа

Используйте `renderPopup({renderList})`, чтобы обернуть стандартное содержимое или добавить заголовок/подвал. Для пустого состояния используйте `renderEmptyOptions({filter})`, где `filter` — текущее значение инпута. `renderList()` отображает список, начальную загрузку или пользовательское пустое состояние. Если `renderPopup` возвращает `null`, попап скрыт.
Обёртки списка должны быть flex-контейнерами с `flex-direction: column` и `min-height: 0`,
чтобы список мог сжиматься до доступной высоты попапа. Для сохранения высоты заголовка
и подвала задайте им `flex-shrink: 0`:

<!--GITHUB_BLOCK-->

```tsx
import {Flex, Text} from '@gravity-ui/uikit';

<Suggest
  value={value}
  onUpdate={setValue}
  options={filteredItems}
  renderEmptyOptions={({filter}) => (
    <div style={{padding: 'var(--g-spacing-2)', color: 'var(--g-color-text-secondary)'}}>
      Ничего не найдено по запросу «{filter}»
    </div>
  )}
  renderPopup={({renderList}) => (
    <Flex direction="column" style={{minHeight: 0}}>
      <Flex padding="spacing-2" style={{flexShrink: 0}}>
        <Text variant="subheader-2">Результаты</Text>
      </Flex>
      {renderList()}
    </Flex>
  )}
/>;
```

<!--/GITHUB_BLOCK-->

## Виртуализация

Оберните `Suggest` в `ListVirtualizer`, как обычный `List` или `Select`:

```tsx
import {unstable_Suggest as Suggest} from '@gravity-ui/uikit/unstable';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

<ListVirtualizer>
  <Suggest options={options} value={value} onUpdate={setValue} />
</ListVirtualizer>;
```

Для этой точки входа установите опциональную peer-зависимость `@tanstack/react-virtual`.
Без обёртки Suggest рендерит все опции и не требует зависимости для виртуализации.

Максимальная высота попапа — `40vh`. Чтобы изменить её, задайте `max-height` через
`popupClassName`. Это работает с виртуализацией и без неё. Внутри попапа прокручивается только список.
Строки используют дизайн List и размер из `size`. Виртуализатор автоматически
измеряет строки переменной высоты. Если передан `getOptionHeight`, он задаёт высоту строки и её
оценку для виртуализации; иначе оценка определяется размером List. `ListVirtualizer.estimateItemSize`
игнорируется с предупреждением в режиме разработки. Высота строки загрузки определяется размером инпута.

## Управление с клавиатуры

Навигация по списку соответствует [управлению с клавиатуры в List](https://preview.gravity-ui.com/uikit/?path=/docs/components-data-display-list--docs#keyboard). Suggest добавляет следующие действия с попапом:

| Клавиша   | Действие                                   |
| :-------- | :----------------------------------------- |
| `↑` / `↓` | Открыть попап, если он закрыт              |
| `Enter`   | Применить активную опцию и закрыть попап   |
| `Escape`  | Закрыть попап, сохранив фокус в поле ввода |

При открытии попапа ни одна опция не подсвечивается автоматически.

## Свойства

| Имя                  | Описание                                                                                          | Тип                                                                                                                        | Значение по умолчанию |
| :------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| className            | CSS-класс корня TextInput                                                                         | `string`                                                                                                                   |                       |
| controlRef           | Ссылка на нативный элемент ввода (см. TextInput)                                                  | `TextInputProps["controlRef"]`                                                                                             |                       |
| defaultOpen          | Начальное состояние открытия (неконтролируемый режим)                                             | `boolean`                                                                                                                  |                       |
| defaultValue         | Начальное значение (неконтролируемый режим)                                                       | `string`                                                                                                                   |                       |
| disablePortal        | Рендерить попап без портала                                                                       | `boolean`                                                                                                                  | `false`               |
| getOptionHeight      | Высота строки (для переменных высот)                                                              | `(option: SuggestOptionProps<T>, index: number) => number`                                                                 |                       |
| id                   | ID нативного input (генерируется автоматически, если не указан)                                   | `string`                                                                                                                   |                       |
| loading              | Показать индикатор загрузки                                                                       | `boolean`                                                                                                                  | `false`               |
| onActiveOptionUpdate | Передаёт запросы List на изменение активной опции: её `value` или `null`                          | `(value: string \| null) => void`                                                                                          |                       |
| onLoadMore           | Вызывается при появлении строки загрузки в видимой области непустого списка (пагинация)           | `() => void`                                                                                                               |                       |
| onOpenChange         | Вызывается при изменении состояния попапа                                                         | `(open: boolean, event?: Event, reason?: SuggestOpenChangeReason) => void`                                                 |                       |
| onOptionAction       | Вызывается при выборе опции мышью или клавиатурой                                                 | `(value: string, option: SuggestOptionProps<T>, event: ListItemActionEvent) => void`                                       |                       |
| onUpdate             | Вызывается при изменении значения поля                                                            | `(value: string) => void`                                                                                                  |                       |
| open                 | Управлять открытием попапа снаружи                                                                | `boolean`                                                                                                                  |                       |
| options              | Варианты (`value`, `content`, `disabled`, `data?`). У каждой опции должен быть уникальный `value` | `SuggestOptionProps<T>[]`                                                                                                  |                       |
| popupClassName       | CSS-класс попапа                                                                                  | `string`                                                                                                                   |                       |
| popupPlacement       | Положение попапа относительно инпута                                                              | `PopupPlacement`                                                                                                           | `'bottom-start'`      |
| popupWidth           | Ширина попапа                                                                                     | `'fit' \| number`                                                                                                          |                       |
| qa                   | `data-qa` корня поля (TextInput или кастомного контрола)                                          | `string`                                                                                                                   |                       |
| ref                  | Ссылка на корень поля (TextInput или кастомного контрола)                                         | `React.Ref<HTMLSpanElement>`                                                                                               |                       |
| renderEmptyOptions   | Пользовательское пустое состояние, когда нет загрузки                                             | `(props: {filter: string}) => ReactElement \| null`                                                                        |                       |
| renderInput          | Кастомное поле ввода; см. раздел «Кастомное поле ввода»                                           | `(props) => ReactElement`                                                                                                  |                       |
| renderOption         | Рендерер содержимого опции (по умолчанию `content`, а если он не задан — `children`)              | `(option: SuggestOptionProps<T>, options: {itemHeight: number; isItemActive: boolean; selected: boolean}) => ReactElement` |                       |
| renderPopup          | Заменить или обернуть стандартный список внутри попапа                                            | `(props: {renderList: () => ReactElement \| null}) => ReactElement \| null`                                                |                       |
| size                 | Размер инпута и строк списка                                                                      | `'s' \| 'm' \| 'l' \| 'xl'`                                                                                                | `'m'`                 |
| style                | Инлайн-стили корня TextInput                                                                      | `CSSProperties`                                                                                                            |                       |
| value                | Значение поля (контролируемый режим)                                                              | `string`                                                                                                                   |                       |

Без `renderInput` Suggest принимает все [пропсы TextInput](../../controls/TextInput/README.md) напрямую, а также `aria-label`, `aria-labelledby`, `aria-describedby` и `aria-details`. `ref` указывает на корень TextInput, `controlRef` — на нативный input.

Suggest управляет атрибутами `role`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete` и `aria-busy`; переопределять их через `controlProps` нельзя.

После выбора опции неконтролируемый попап закрывается. При контролируемом `open` Suggest запрашивает закрытие через `onOpenChange(false, event, 'option-action')`; родитель может проигнорировать запрос и оставить попап открытым. Возвращаемое значение `onOptionAction` не управляет попапом.

`SuggestOpenChangeReason` дополняет `OpenChangeReason` из Floating UI причинами `input-change` (ввод или очистка поля) и `option-action` (выбор опции).

`onActiveOptionUpdate` передаёт запросы List при взаимодействии с клавиатурой или указателем. Перестановка или удаление опций и закрытие попапа не вызывают дополнительных уведомлений. При каждом открытии активной опции нет. Текст для List берётся из строкового или числового `content`/`children`, иначе используется `value` опции.

## Доступность

Инпут получает `aria-busy` только при загрузке без доступных опций. При пагинации статус сообщает количество доступных вариантов вместо загрузки. Визуально скрытая область статуса в режиме polite сообщает о загрузке, количестве вариантов или отсутствии результатов, когда запрошено открытие. `aria-expanded` и `aria-controls` соответствуют смонтированному List: попап только со спиннером или пользовательским пустым состоянием не обозначается как раскрытый список.

Suggest сообщает об отсутствии результатов, в том числе при пользовательском содержимом в `renderEmptyOptions` или `renderPopup`. Пользовательское пустое состояние отвечает за визуальное отображение и не требует собственной live region.

## Кастомное поле ввода

Передайте `renderInput`, чтобы заменить TextInput, например на TextArea. Callback получает `SuggestRenderInputProps`, включая `open`, `id`, `value`, `onUpdate`, `onFocus`, `onBlur`, `controlRef`, `ref`, `controlProps` и необязательные для подключения обработчики взаимодействия `onKeyDown` и `onClick`.

> **Обязательное подключение:** Передайте `ref`, `controlRef`, `id`, `value`, `onUpdate`, `onFocus`, `onBlur` и ARIA-атрибуты из `controlProps` соответствующим элементам кастомного контрола. Для встроенного управления списком с клавиатуры вызывайте переданный `onKeyDown` для клавиш, которые должен обрабатывать Suggest. Без этого вызова встроенная клавиатурная навигация работать не будет.

Передайте `controlRef` нативному input/textarea, а `ref` — корневому элементу контрола. Попап привязывается к родителю нативного поля; для другого якоря передайте `anchorRef` нужному элементу. Подключите `id`, `value`, `onUpdate`, обработчики фокуса и ARIA-атрибуты из `controlProps`. Общие пропсы контрола (`disabled`, `readOnly`, `placeholder`, `name`, `autoComplete`, `autoFocus`, `tabIndex`, `size`, `view`, `pin`, `hasClear`, пропсы валидации, `note`, `className`, `style` и `qa`) передаются автоматически. Перед spread пропсов в TextInput или TextArea из UIKit отделите `open` и `anchorRef`: используйте `open` в логике взаимодействия, а `anchorRef` подключайте только при необходимости задать другой якорь попапа. Затем при необходимости переопределите отдельные пропсы или обработчики, как в истории **CustomInput**. Для нативного input/textarea или другого компонента явно сопоставьте переданные пропсы с его API; не передавайте весь аргумент callback через spread в DOM-элемент. `onFocus` и `onBlur` у Suggest вызываются через переданные обработчики фокуса; тип элемента события — `HTMLInputElement | HTMLTextAreaElement`. Остальные нативные обработчики (`onChange`, `onKeyDown`, `onKeyUp`) и `controlRef` у Suggest относятся к стандартному TextInput; подключайте их непосредственно к кастомному контролу. TypeScript запрещает эти пропсы стандартного поля при переданном `renderInput`, включая `controlProps`; ARIA-пропсы подписи задавайте на Suggest, а нативные атрибуты — внутри рендера. Специфичные для TextInput пропсы, например `type`, `label`, `startContent` и `endContent`, не передаются. Callback передаёт управляемые ARIA-атрибуты в своём `controlProps`.

Вызывайте переданные `onKeyDown` и `onClick`, только когда взаимодействие должен обработать Suggest. Чтобы сохранить движение курсора или перенос строки, не вызывайте `onKeyDown` для соответствующих клавиш; `preventDefault()` для этого не нужен. Управляемые `open` и `onOpenChange` позволяют задать собственные хоткеи открытия или игнорировать автоматические запросы `input-change`. Закрытие попапа по-прежнему запрашивается через `onOpenChange`.

Для многострочного TextArea сохраните семантику текстового поля: используйте `role={undefined}` и исключите `aria-expanded` из его `controlProps`, сохранив связь со списком и активной опцией. Пример **CustomInput** в Storybook показывает подключение, собственные хоткеи и вставку в позицию курсора. Заменой выделения и восстановлением курсора управляет потребитель через `onOptionAction`.

Длинный текст опций можно переносить через `renderOption`. Пример использует список без виртуализации; при виртуализации передайте `getOptionHeight`, соответствующий реальной высоте строк.

`open` в аргументах рендера — запрошенное состояние открытия; для отображения попапу также нужно содержимое. В обработчиках хоткеев игнорируйте события с `event.nativeEvent.isComposing` или `event.keyCode === 229`, чтобы подтверждение ввода через IME не открывало попап и не выбирало вариант.

В примере курсор восстанавливается при изменении значения или состояния открытия, поэтому замена выделения тем же текстом опирается на закрытие попапа после выбора. Поведение скринридера при переходе от навигации по списку к редактированию текста ещё требует ручной проверки: пока попап открыт, ссылка на активный вариант сохраняется.
