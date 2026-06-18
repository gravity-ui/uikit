<!--GITHUB_BLOCK-->

# Suggest

<!--/GITHUB_BLOCK-->

```tsx
import {Suggest} from '@gravity-ui/uikit';
```

`Suggest` — это текстовое поле ввода с выпадающим списком вариантов. Компонент берёт на себя навигацию с клавиатуры, ARIA-атрибуты и позиционирование попапа. Загрузка данных, дебаунс и пагинация реализуются снаружи.

## Базовое использование

Передайте `items` (синхронный массив) и обновляйте его в `onUpdate`:

<!--GITHUB_BLOCK-->

```tsx
type Planet = {value: string; content: string};

const ALL_PLANETS: Planet[] = [
  {value: 'earth', content: 'Земля'},
  {value: 'europa', content: 'Европа'},
  {value: 'jupiter', content: 'Юпитер'},
];

const [value, setValue] = React.useState('');
const items = React.useMemo(
  () => ALL_PLANETS.filter((p) => p.content.toLowerCase().includes(value.toLowerCase())),
  [value],
);

<Suggest<Planet>
  value={value}
  onUpdate={setValue}
  items={items}
  onItemClick={(item) => {
    setValue(item.content);
    return false; // закрыть попап после выбора
  }}
  renderItem={(item) => <div>{item.content}</div>}
  inputProps={{placeholder: 'Поиск…'}}
/>;
```

<!--/GITHUB_BLOCK-->

## Асинхронная загрузка

Используйте локальный флаг `loading` вместе с `items`. Пока `loading === true`, компонент автоматически показывает спиннер:

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState('');
const [items, setItems] = React.useState<Planet[]>([]);
const [loading, setLoading] = React.useState(false);

const handleUpdate = async (query: string) => {
  setValue(query);
  setLoading(true);
  try {
    const results = await fetchPlanets(query);
    setItems(results);
  } finally {
    setLoading(false);
  }
};

<Suggest<Planet>
  value={value}
  onUpdate={handleUpdate}
  items={items}
  loading={loading}
  onItemClick={(item) => {
    setValue(item.content);
    return false;
  }}
  renderItem={(item) => <div>{item.content}</div>}
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
  items={items}
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

Используйте `showOptionsOnEmptyValue`, чтобы попап оставался открытым даже при пустом вводе — удобно для показа всех доступных вариантов при фокусе или для мультиселекта (попап остаётся открытым после очистки поля):

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  items={allItems}
  showOptionsOnEmptyValue
  inputProps={{placeholder: 'Нажмите, чтобы увидеть все варианты…'}}
/>
```

<!--/GITHUB_BLOCK-->

## Кастомное содержимое попапа

Используйте `renderPopup`, чтобы обернуть список, добавить заголовок/подвал или отобразить пустое состояние:

<!--GITHUB_BLOCK-->

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  items={filteredItems}
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

## Управление с клавиатуры

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

| Название                    | Тип                                                  | По умолчанию | Описание                                                                         |
| :-------------------------- | :--------------------------------------------------- | :----------- | :------------------------------------------------------------------------------- |
| `items`                     | `ListItemData<T>[]`                                  |              | Варианты для отображения в попапе                                                |
| `onItemClick`               | `(item: T, index?: number) => boolean \| void`       |              | Вызывается при выборе опции. Верните `true`, чтобы оставить попап открытым       |
| `renderItem`                | `(item: ListItemData<T>) => ReactNode`               |              | Кастомный рендерер опции                                                         |
| `virtualized`               | `boolean`                                            | `false`      | Включить виртуализацию для длинных списков                                       |
| `listHeight`                | `number`                                             | `300`        | Высота (px) области прокрутки списка при включённой виртуализации                |
| `getOptionHeight`           | `(option: ListItemData<T>, index: number) => number` |              | Высота строки (для переменных высот)                                             |
| `getInitialActiveItemIndex` | `(items: ListItemData<T>[]) => number`               |              | Возвращает индекс опции, которая должна быть активна при первом появлении списка |
| `onLoadMore`                | `() => void`                                         |              | Вызывается при прокрутке до конца списка (пагинация)                             |

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

| Название                  | Тип                                                                 | По умолчанию        | Описание                                              |
| :------------------------ | :------------------------------------------------------------------ | :------------------ | :---------------------------------------------------- | ------------------------------------------------------- |
| `loading`                 | `boolean`                                                           | `false`             | Показать индикатор загрузки в попапе                  |
| `showOptionsOnEmptyValue` | `boolean`                                                           | `false`             | Открывать попап даже при пустом значении              |
| `open`                    | `boolean`                                                           |                     | Управлять открытием попапа снаружи                    |
| `defaultOpen`             | `boolean`                                                           |                     | Начальное состояние открытия (неконтролируемый режим) |
| `onOpenChange`            | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` |                     | Вызывается при изменении состояния попапа             |
| `onActiveIndexChange`     | `(index: number                                                     | undefined) => void` |                                                       | Вызывается при изменении подсвеченной клавиатурой опции |

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
