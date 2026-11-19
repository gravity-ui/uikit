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
| className            | CSS-класс корня TextInput или обёртки кастомного контрола                                         | `string`                                                                                                                   |                       |
| controlRef           | Ref нативного input; игнорируется при `renderControl`                                             | `TextInputProps["controlRef"]`                                                                                             |                       |
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
| qa                   | `data-qa` корня TextInput; игнорируется при `renderControl`                                       | `string`                                                                                                                   |                       |
| ref                  | Ref корня TextInput или фокусируемого элемента при `renderControl`                                | `React.Ref<HTMLElement>`                                                                                                   |                       |
| renderControl        | Рендер контрола; см. [Кастомный контрол](#кастомный-контрол)                                      | `(props: SuggestRenderControlProps) => ReactElement`                                                                       |                       |
| renderEmptyOptions   | Пользовательское пустое состояние, когда нет загрузки                                             | `(props: {filter: string}) => ReactElement \| null`                                                                        |                       |
| renderOption         | Рендерер содержимого опции (по умолчанию `content`, а если он не задан — `children`)              | `(option: SuggestOptionProps<T>, options: {itemHeight: number; isItemActive: boolean; selected: boolean}) => ReactElement` |                       |
| renderPopup          | Заменить или обернуть стандартный список внутри попапа                                            | `(props: {renderList: () => ReactElement \| null}) => ReactElement \| null`                                                |                       |
| size                 | Размер инпута и строк списка                                                                      | `'s' \| 'm' \| 'l' \| 'xl'`                                                                                                | `'m'`                 |
| style                | Инлайн-стили корня TextInput или обёртки кастомного контрола                                      | `CSSProperties`                                                                                                            |                       |
| value                | Значение поля (контролируемый режим)                                                              | `string`                                                                                                                   |                       |

Без `renderControl` Suggest принимает все [пропсы TextInput](../../controls/TextInput/README.md) напрямую, а также `aria-label`, `aria-labelledby`, `aria-describedby` и `aria-details`. `ref` указывает на корень TextInput, `controlRef` — на нативный input.

Suggest управляет атрибутами `role`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete` и `aria-busy`; переопределять их через `controlProps` нельзя.

После выбора опции неконтролируемый попап закрывается. При контролируемом `open` Suggest запрашивает закрытие через `onOpenChange(false, event, 'option-action')`; родитель может проигнорировать запрос и оставить попап открытым. Возвращаемое значение `onOptionAction` не управляет попапом.

`SuggestOpenChangeReason` дополняет `OpenChangeReason` из Floating UI причинами `input-change` (ввод или очистка поля) и `option-action` (выбор опции).

`onActiveOptionUpdate` передаёт запросы List при взаимодействии с клавиатурой или указателем, а также получает `null`, когда `resetActiveOption` сбрасывает активную опцию. Перестановка или удаление опций и закрытие попапа не вызывают дополнительных уведомлений. При каждом открытии активной опции нет. Текст для List берётся из строкового или числового `content`/`children`, иначе используется `value` опции.

## Доступность

Инпут получает `aria-busy` только при загрузке без доступных опций. При пагинации статус сообщает количество доступных вариантов вместо загрузки. Визуально скрытая область статуса в режиме polite сообщает о загрузке, количестве вариантов или отсутствии результатов, когда запрошено открытие. `aria-expanded` и `aria-controls` соответствуют смонтированному List: попап только со спиннером или пользовательским пустым состоянием не обозначается как раскрытый список.

Suggest сообщает об отсутствии результатов, в том числе при пользовательском содержимом в `renderEmptyOptions` или `renderPopup`. Пользовательское пустое состояние отвечает за визуальное отображение и не требует собственной live region.

## Кастомный контрол

`renderControl` заменяет TextInput на TextArea, нативный элемент или другой фокусируемый текстовый редактор. Suggest создаёт обёртку, которая принимает `className` и `style`, служит якорем попапа и отслеживает уход фокуса из контрола. Callback получает `SuggestRenderControlProps`:

| Проп                | Назначение                                                                                       |
| :------------------ | :----------------------------------------------------------------------------------------------- |
| `controlProps`      | DOM-атрибуты (`id`, `role`, ARIA) и обработчики `onClick`/`onKeyDown` для фокусируемого элемента |
| `disabled`          | Отключён ли контрол                                                                              |
| `onUpdate`          | Вызывайте с новым текстом                                                                        |
| `open`              | Запрошенное состояние открытия; для отображения попапу также нужно содержимое                    |
| `ref`               | Подключите к фокусируемому элементу; при необходимости приведите к типу этого элемента           |
| `resetActiveOption` | Сбросить активную опцию и её ARIA-ссылку, не закрывая попап                                      |
| `value`             | Текущий текст                                                                                    |

> **Обязательное подключение:** Передайте `ref`, `value`, `onUpdate` и DOM-атрибуты из `controlProps`. Передайте `disabled` своему контролу. Вызывайте `controlProps.onClick` для открытия по клику и `controlProps.onKeyDown` для встроенной клавиатурной навигации.

В UIKit `TextInput` и `TextArea` принимают `id` и `onKeyDown` как пропсы верхнего уровня; передавайте их туда, а не только внутрь `controlProps`.

Обработчик клавиатуры открывает попап стрелками, управляет навигацией по списку и выбирает активную опцию по Enter. Чтобы оставить клавишу для редактирования, не передавайте её этому обработчику. В собственных хоткеях игнорируйте ввод через IME (`event.nativeEvent.isComposing` или `event.keyCode === 229`). Закрытие попапа по-прежнему запрашивается через `onOpenChange`.

При `renderControl` специфичные пропсы TextInput игнорируются: `view`, `pin`, `label`, `placeholder`, `hasClear`, пропсы валидации, `note`, `startContent`, `endContent`, `type`, `qa`, нативные атрибуты (`name`, `autoComplete`, `autoFocus`, `readOnly`, `tabIndex`, `controlProps`, `controlRef`) и обработчики (`onChange`, `onKeyDown`, `onKeyUp`, `onFocus`, `onBlur`). Задавайте их непосредственно на кастомном контроле. `size` продолжает управлять размером строк списка. Для подписи контрола и списка используйте ARIA-пропсы верхнего уровня Suggest.

Многострочный TextArea сохраняет семантику текстового поля: исключите `role` и `aria-expanded` из переданных `controlProps`, сохранив связь со списком и активной опцией.

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  aria-label="Reply"
  value={value}
  onUpdate={setValue}
  options={options}
  onOptionAction={(_id, option) => setValue(String(option.content))}
  renderControl={({ref, value, onUpdate, disabled, controlProps, resetActiveOption}) => {
    const {id, onClick, onKeyDown, ...attributes} = controlProps;
    return (
      <TextArea
        controlRef={ref as React.Ref<HTMLTextAreaElement>}
        id={id}
        value={value}
        onUpdate={(text) => {
          resetActiveOption();
          onUpdate(text);
        }}
        disabled={disabled}
        minRows={3}
        controlProps={{
          ...attributes,
          role: undefined,
          'aria-expanded': undefined,
          onCompositionStart: resetActiveOption,
          onClick: (event) => {
            resetActiveOption();
            onClick?.(event);
          },
        }}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing || event.keyCode === 229) return;
          if (event.altKey && ['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
            onKeyDown?.(event);
            if (event.key === 'Enter') event.preventDefault();
          } else if (
            ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(
              event.key,
            )
          ) {
            resetActiveOption();
          }
        }}
      />
    );
  }}
/>
```

<!--/GITHUB_BLOCK-->

Suggest отображает переданные `options` без фильтрации. Через `onUpdate` передавайте локально отфильтрованные опции или результаты асинхронной загрузки. В `onOptionAction` потребитель решает, заменить весь текст или вставить фрагмент в позицию курсора, включая обработку выделения и курсора.

Вызывайте `resetActiveOption()` при возврате к редактированию: перемещении курсора, изменении текста, начале композиции или клике в поле. Он сбрасывает активную опцию и `aria-activedescendant`, оставляя попап открытым. Если активной опции нет, вызов ничего не меняет. Следующая переданная стрелка снова начинает навигацию по списку.

Длинный текст опций можно переносить через `renderOption`. При виртуализации передайте `getOptionHeight`, соответствующий реальной высоте строк.
