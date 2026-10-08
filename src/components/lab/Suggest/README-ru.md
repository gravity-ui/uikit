<!--GITHUB_BLOCK-->

# unstable_Suggest

<!--/GITHUB_BLOCK-->

> `Suggest` — экспериментальный компонент (`lab`); API может меняться в минорных релизах, пока не стабилизируется.

```tsx
import {unstable_Suggest as Suggest} from '@gravity-ui/uikit/unstable';
```

`Suggest` — это текстовое поле ввода с выпадающим списком вариантов. Компонент берёт на себя навигацию с клавиатуры, ARIA-атрибуты и позиционирование попапа. Загрузка данных, дебаунс и пагинация реализуются снаружи.

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
  onOptionClick={(option) => {
    setValue(option.value);
    return false; // закрыть попап после выбора
  }}
  inputProps={{placeholder: 'Поиск…'}}
/>;
```

По умолчанию отображается `content` опции, а если он не задан — `children`. Для изменения содержимого передайте `renderOption`.

<!--/GITHUB_BLOCK-->

## Асинхронная загрузка

Используйте локальный флаг `loading` вместе с `options`. Пока `loading === true`, компонент автоматически показывает спиннер:

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState('');
const [options, setOptions] = React.useState([]);
const [loading, setLoading] = React.useState(false);

const handleUpdate = async (query: string) => {
  setValue(query);
  setLoading(true);
  try {
    const results = await fetchPlanets(query);
    setOptions(results);
  } finally {
    setLoading(false);
  }
};

<Suggest
  value={value}
  onUpdate={handleUpdate}
  options={options}
  loading={loading}
  onOptionClick={(option) => {
    setValue(option.value);
    return false;
  }}
  inputProps={{placeholder: 'Поиск…'}}
/>;
```

<!--/GITHUB_BLOCK-->

## Кастомизация TextInput

Все пропсы `TextInput` (size, pin, hasClear, startContent, error, disabled и т.д.) передаются через объект `inputProps`:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  options={items}
  inputProps={{
    size: 'xl',
    hasClear: true,
    placeholder: 'Поиск…',
    error: hasError ? 'Некорректный ввод' : undefined,
    startContent: <Icon data={SearchIcon} />,
  }}
/>
```

<!--/GITHUB_BLOCK-->

## Показывать опции при пустом вводе

По умолчанию попап открывается, когда в поле есть значение. Чтобы показывать опции
и при пустом вводе (показ всех вариантов при фокусе или удержание попапа открытым в
мультиселекте после очистки поля), управляйте состоянием открытия самостоятельно:

<!--GITHUB_BLOCK-->

```tsx
const [open, setOpen] = React.useState(false);

<Suggest
  value={value}
  onUpdate={(nextValue) => {
    setValue(nextValue);
    setOpen(true);
  }}
  open={open}
  onOpenChange={setOpen}
  options={allItems}
  inputProps={{
    onFocus: () => setOpen(true),
    placeholder: 'Нажмите, чтобы увидеть все варианты…',
  }}
/>;
```

<!--/GITHUB_BLOCK-->

## Кастомное содержимое попапа

Используйте `renderPopup`, чтобы обернуть список, добавить заголовок/подвал или отобразить пустое состояние:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  options={filteredItems}
  renderPopup={({list}) => (
    <div>
      <div style={{padding: 8, fontWeight: 600}}>Результаты</div>
      {filteredItems.length === 0 ? (
        <div style={{padding: 8, color: 'gray'}}>Ничего не найдено по запросу «{value}»</div>
      ) : (
        list
      )}
    </div>
  )}
/>
```

<!--/GITHUB_BLOCK-->

## Виртуализация

Оберните `Suggest` в `ListVirtualizer`, как обычный `List` или `Select`:

```tsx
import {unstable_Suggest as Suggest} from '@gravity-ui/uikit/unstable';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

<ListVirtualizer>
  <Suggest options={options} value={value} onUpdate={setValue} listHeight={300} />
</ListVirtualizer>;
```

Для этой точки входа установите опциональную peer-зависимость `@tanstack/react-virtual`.
Без обёртки Suggest рендерит все опции и не требует зависимости для виртуализации.

`listHeight` ограничивает высоту списка при использовании `ListVirtualizer` (также действует предел `40vh`).
Без виртуализации максимальная высота списка — `40vh`.
Строки используют дизайн List и размер из `inputProps.size`. Виртуализатор автоматически
измеряет строки переменной высоты. Если передан `getOptionHeight`, он задаёт высоту строки и её
оценку для виртуализации; иначе оценка берётся из `ListVirtualizer.estimateItemSize` или размера List.

`onLoadMore` вызывается, когда последняя опция становится видимой, в том числе если весь список
сразу помещается в области просмотра. Загрузкой и проверкой конца данных управляет вызывающий код.

## Управление с клавиатуры

При открытии попапа ни одна опция не подсвечивается автоматически.

| Windows / Linux      | macOS                | Действие                                                   |
| :------------------- | :------------------- | :--------------------------------------------------------- |
| `↓` Arrow Down       | `↓`                  | Открыть попап (если закрыт) или перейти к следующей опции  |
| `↑` Arrow Up         | `↑`                  | Открыть попап (если закрыт) или перейти к предыдущей опции |
| `Page Down`          | `Fn + ↓`             | Переместиться вниз на одну страницу                        |
| `Page Up`            | `Fn + ↑`             | Переместиться вверх на одну страницу                       |
| `Home`               | `Fn + ←`             | Переместить курсор в начало поля ввода                     |
| `End`                | `Fn + →`             | Переместить курсор в конец поля ввода                      |
| `Shift + Home / End` | `Shift + Fn + ← / →` | Расширить выделение до начала / конца                      |
| `Enter`              | `Enter`              | Выбрать активную опцию и закрыть попап                     |
| `Escape`             | `Escape`             | Закрыть попап (фокус остаётся на поле ввода)               |

## Свойства

### Основные

| Название       | Тип                       | По умолчанию | Описание                                    |
| :------------- | :------------------------ | :----------- | :------------------------------------------ |
| `value`        | `string`                  |              | Значение поля (контролируемый режим)        |
| `defaultValue` | `string`                  |              | Начальное значение (неконтролируемый режим) |
| `onUpdate`     | `(value: string) => void` |              | Вызывается при каждом нажатии клавиши       |

### Опции

| Название          | Тип                                                                       | По умолчанию | Описание                                                                                          |
| :---------------- | :------------------------------------------------------------------------ | :----------- | :------------------------------------------------------------------------------------------------ |
| `options`         | `SuggestOption<T>[]`                                                      |              | Варианты (`value`, `content`, `disabled`, `data?`). У каждой опции должен быть уникальный `value` |
| `onOptionClick`   | `(option: SuggestOption<T>, index?: number) => boolean \| void`           |              | Вызывается при выборе опции. Верните `true`, чтобы оставить попап открытым                        |
| `renderOption`    | `(option: SuggestOption<T>, active: boolean, index: number) => ReactNode` |              | Рендерер содержимого опции (по умолчанию `content`, а если он не задан — `children`)              |
| `listHeight`      | `number`                                                                  | `300`        | Максимальная высота виртуализированного списка (px)                                               |
| `getOptionHeight` | `(option: SuggestOption<T>, index: number) => number`                     |              | Высота строки (для переменных высот)                                                              |
| `onLoadMore`      | `() => void`                                                              |              | Вызывается, когда последняя опция становится видимой (пагинация)                                  |

### Кастомизация Input

| Название     | Тип              | По умолчанию | Описание                                                   |
| :----------- | :--------------- | :----------- | :--------------------------------------------------------- |
| `inputProps` | `TextInputProps` |              | Все пропсы `TextInput`, передаваемые напрямую в поле ввода |

### Конфигурация попапа

| Название     | Тип                         | По умолчанию | Описание                                                                                      |
| :----------- | :-------------------------- | :----------- | :-------------------------------------------------------------------------------------------- |
| `popupWidth` | `'fit' \| 'auto' \| number` | `'fit'`      | Ширина попапа: как у поля, авто или фиксированная (px)                                        |
| `popupProps` | `PopupProps`                |              | Все пропсы `Popup` (placement, className, qa, offset, disablePortal и т.д.), spread в `Popup` |

### Поведение

| Название              | Тип                                                                 | По умолчанию | Описание                                                                                            |
| :-------------------- | :------------------------------------------------------------------ | :----------- | :-------------------------------------------------------------------------------------------------- |
| `loading`             | `boolean`                                                           | `false`      | Показать индикатор загрузки в попапе                                                                |
| `open`                | `boolean`                                                           |              | Управлять открытием попапа снаружи                                                                  |
| `defaultOpen`         | `boolean`                                                           |              | Начальное состояние открытия (неконтролируемый режим)                                               |
| `onOpenChange`        | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` |              | Вызывается при изменении состояния попапа                                                           |
| `onActiveIndexChange` | `(index: number \| undefined) => void`                              |              | Вызывается при изменении подсветки с индексом опции в `options` или `undefined`, если подсветки нет |

### Рендеринг

| Название      | Тип                                       | По умолчанию | Описание                                               |
| :------------ | :---------------------------------------- | :----------- | :----------------------------------------------------- |
| `renderPopup` | `(props: {list: ReactNode}) => ReactNode` |              | Заменить или обернуть стандартный список внутри попапа |

### Обёртка компонента

| Название    | Тип             | По умолчанию | Описание                                                   |
| :---------- | :-------------- | :----------- | :--------------------------------------------------------- |
| `className` | `string`        |              | CSS-класс для обёртки                                      |
| `style`     | `CSSProperties` |              | Инлайн-стили для обёртки                                   |
| `id`        | `string`        |              | ID компонента (генерируется автоматически, если не указан) |
| `qa`        | `string`        |              | Атрибут `data-qa` для обёртки поля ввода                   |
