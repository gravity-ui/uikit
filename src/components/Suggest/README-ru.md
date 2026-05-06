# Suggest

<!--GITHUB_BLOCK-->

<!--/GITHUB_BLOCK-->

```tsx
import {Suggest} from '@gravity-ui/uikit';
```

Компонент `Suggest` — это текстовое поле ввода с выпадающим списком подсказок. Он предоставляет гибкий способ создания автозаполнения, поиска и typeahead-интерфейсов.

## Базовое использование

Проп `getOptions` — это функция, которая получает текущее значение поля ввода и возвращает список опций. Она может быть как синхронной, так и асинхронной (возвращающей `Promise`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
type Item = {value: string; content: string};

const items: Item[] = [
    {value: 'earth', content: 'Земля'},
    {value: 'mars', content: 'Марс'},
    {value: 'jupiter', content: 'Юпитер'},
];

const [value, setValue] = React.useState('');

const getOptions = (searchValue: string) =>
    items.filter((item) =>
        item.content.toLowerCase().includes(searchValue.toLowerCase()),
    );

<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    placeholder="Поиск планет..."
    renderOption={(item) => <div>{item.content}</div>}
/>;
`}
>
    <UIKit.Suggest
        value=""
        onUpdate={() => {}}
        placeholder="Поиск планет..."
        getOptions={() => [
            {value: 'earth', content: 'Земля'},
            {value: 'mars', content: 'Марс'},
            {value: 'jupiter', content: 'Юпитер'},
        ]}
        renderOption={(item) => <div>{item.content}</div>}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
type Item = {value: string; content: string};

const items: Item[] = [
  {value: 'earth', content: 'Земля'},
  {value: 'mars', content: 'Марс'},
  {value: 'jupiter', content: 'Юпитер'},
];

const [value, setValue] = React.useState('');

const getOptions = (searchValue: string) =>
  items.filter((item) => item.content.toLowerCase().includes(searchValue.toLowerCase()));

<Suggest<Item>
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  onOptionClick={(item) => setValue(item.content)}
  placeholder="Поиск планет..."
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

<!--/GITHUB_BLOCK-->

## Асинхронная загрузка данных

Проп `getOptions` также принимает асинхронную функцию. Компонент автоматически обрабатывает состояния загрузки и race condition.

```tsx
const getOptions = async (searchValue: string) => {
  const response = await fetch(`/api/search?q=${searchValue}`);
  return response.json();
};

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  onOptionClick={(item) => setValue(item.content)}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

## Debouncing

Добавьте debounce, чтобы уменьшить количество запросов к API во время набора текста:

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  debounce={500} // Подождать 500 мс после остановки набора
  onOptionClick={(item) => setValue(item.content)}
  renderOption={(item) => <div>{item.content}</div>}
/>
```

## Режимы ширины попапа

Управляйте шириной попапа с помощью пропа `popupWidth`:

- `"fit"` (по умолчанию): совпадает с шириной поля ввода
- `number`: фиксированная ширина в пикселях
- `undefined`: ширина по содержимому

```tsx
// Совпадает с шириной поля ввода (по умолчанию)
<Suggest popupWidth="fit" {...props} />

// Автоматическая ширина по содержимому
<Suggest {...props} />

// Фиксированная ширина в пикселях
<Suggest popupWidth={400} {...props} />
```

## Обработка ошибок

Настройте кастомный UI ошибки при сбое загрузки данных:

```tsx
const ErrorFallback = ({error}) => (
  <div>
    <h4>Ошибка загрузки данных</h4>
    <p>{error?.message}</p>
  </div>
);

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptionsThatMightFail}
  renderFetchOptionsError={ErrorFallback}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

## Пустое состояние

Настройте сообщение, когда поиск не возвращает ни одной опции:

```tsx
const EmptyFallback = ({value}) => (
  <div>
    <p>Ничего не найдено для "{value}"</p>
  </div>
);

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderEmptyOptions={EmptyFallback}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

### Дефолтные fallback'и

Если не передать `renderEmptyOptions` или `renderFetchOptionsError`, компонент покажет небольшой встроенный плейсхолдер с локализованным заголовком и описанием (а для ошибки — ещё кнопку повторной загрузки). **Иконка по умолчанию не отображается** — плейсхолдер остаётся минималистичным и нейтральным по бренду, а вы сами контролируете визуальный стиль.

### Добавление маленькой иконки в дефолтный fallback

Если хочется быстро получить вид с маленькой иконкой и без написания render-prop, передайте любой `IconData` из `@gravity-ui/icons` (или совместимый) через свойства `emptyIcon` / `errorIcon`:

```tsx
import {CircleExclamation, Magnifier} from '@gravity-ui/icons';
import {Suggest} from '@gravity-ui/uikit';

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  emptyIcon={Magnifier}
  errorIcon={CircleExclamation}
  renderOption={(item) => <div>{item.content}</div>}
/>;
```

Если `emptyIcon` / `errorIcon` не переданы (поведение по умолчанию), строка с иконкой не рендерится вообще.

### Подключение богатых иллюстраций

Если вам нужен более заметный визуал из `@gravity-ui/illustrations` (например, `NotFound` / `InternalError` 400×400 SVG), установите пакет отдельно в вашем приложении и передайте его через render-prop API:

```bash
npm install @gravity-ui/illustrations
```

Также один раз импортируйте цветовые токены иллюстраций в корне приложения:

```ts
import '@gravity-ui/illustrations/styles/styles.scss';
```

Дальше используйте render-props:

```tsx
import {InternalError, NotFound} from '@gravity-ui/illustrations';
import {Icon, PlaceholderContainer, Suggest} from '@gravity-ui/uikit';

<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderOption={(item) => <div>{item.content}</div>}
  renderEmptyOptions={({value}) => (
    <PlaceholderContainer
      title="Ничего не найдено"
      description={`Нет совпадений для «${value}»`}
      direction="row"
      size="s"
      align="center"
      image={<Icon data={NotFound} size={100} />}
    />
  )}
  renderFetchOptionsError={({error}) => (
    <PlaceholderContainer
      title="Произошла ошибка"
      description={error?.message || 'Не удалось загрузить данные. Пожалуйста, попробуйте ещё раз'}
      direction="row"
      size="s"
      align="center"
      image={<Icon data={InternalError} size={100} />}
    />
  )}
/>;
```

> `@gravity-ui/illustrations` **не** является зависимостью `@gravity-ui/uikit` (ни в `dependencies`, ни в `devDependencies`). uikit вообще не поставляет иллюстраций — благодаря этому пакет остаётся компактным, а потребители полностью контролируют визуальный стиль. Устанавливайте `@gravity-ui/illustrations` в своём приложении только если вам нужен более насыщенный вид.

## Кастомное содержимое попапа

Используйте `renderPopup` для добавления кастомного контента до и после списка:

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderOption={(item) => <div>{item.content}</div>}
  renderPopup={({list, loading, error}) => (
    <div>
      <div style={{padding: 8, borderBottom: '1px solid #ddd'}}>
        {loading ? 'Загрузка...' : 'Результаты'}
      </div>
      {list}
      <div style={{padding: 8, borderTop: '1px solid #ddd'}}>Используйте ↑↓ для навигации</div>
    </div>
  )}
/>
```

## Флаги поведения

### Показывать опции при пустом вводе

По умолчанию попап скрыт, когда поле ввода пустое. Используйте `showOptionsOnEmptyValue`, чтобы отображать опции даже при пустом значении.

> **Примечание:** этот флаг управляет только **видимостью**. Чтобы реально показать опции при монтировании или при пустом поле, нужно также **предзагрузить** их. Самый распространённый подход — комбинировать с `getOptionsOnMount`, чтобы загрузить опции при монтировании компонента:

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions} // Будет вызвана с пустой строкой при монтировании
  showOptionsOnEmptyValue // Разрешить попапу появляться при пустом вводе
  getOptionsOnMount // Предзагрузить опции при монтировании компонента
  renderOption={(item) => <div>{item.content}</div>}
/>
```

Без `getOptionsOnMount` опции будут загружены только после того, как пользователь начнёт вводить текст — это значит, что попап с пустым значением появится **только после** того, как пользователь очистит поле после первого запроса.

### Загрузить опции при монтировании

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={fetchOptions}
  getOptionsOnMount // Загрузить опции сразу при монтировании компонента
  renderOption={(item) => <div>{item.content}</div>}
/>
```

### Произвольное значение ввода

Разрешите пользователям отправлять произвольные значения (не только из списка):

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  applicableInputValue
  onInputEnterKeyDown={(value) => {
    console.log('Пользователь отправил:', value);
  }}
  renderOption={(item) => <div>{item.content}</div>}
/>
```

## Клавиатурная навигация

Компонент обеспечивает полную поддержку клавиатуры:

| Windows / Linux                | macOS              | Действие                                                                          |
| ------------------------------ | ------------------ | --------------------------------------------------------------------------------- |
| `↓` (Стрелка вниз)             | `↓`                | Перейти к следующей опции (или снова открыть попап, см. примечание¹)              |
| `↑` (Стрелка вверх)            | `↑`                | Перейти к предыдущей опции (или снова открыть попап, см. примечание¹)             |
| `Page Down`                    | `Fn + ↓`           | Сместить активную опцию на одну страницу вниз                                     |
| `Page Up`                      | `Fn + ↑`           | Сместить активную опцию на одну страницу вверх                                    |
| `Home`                         | `Fn + ←`           | Переместить текстовый курсор в начало поля ввода                                  |
| `End`                          | `Fn + →`           | Переместить текстовый курсор в конец поля ввода                                   |
| `Shift + Home` / `Shift + End` | `Shift + Fn + ←/→` | То же, что `Home`/`End`, но расширяет выделение текста от текущей позиции курсора |
| `Enter`                        | `Enter`            | Выбрать активную опцию и закрыть попап                                            |
| `Escape`                       | `Escape`           | Закрыть попап (фокус остаётся на поле ввода)                                      |
| `Tab`                          | `Tab`              | Кастомная обработка через `onTabKeyDown`                                          |

> **Примечание¹ — Повторное открытие стрелками:** после закрытия попапа клавишей `Escape` поле ввода сохраняет фокус. Нажатие `↓` или `↑` снова откроет попап при тех же условиях (непустое `value` либо включённый `showOptionsOnEmptyValue`).

## Доступность

- `role="combobox"` на поле ввода
- `aria-expanded` указывает состояние попапа
- `aria-controls` связывает поле ввода с попапом
- `aria-autocomplete` описывает поведение
- `aria-activedescendant` указывает на активную опцию
- `role="listbox"` на списке
- Полная поддержка клавиатурной навигации

## Свойства

### Настройка опций

| Название                    | Тип                                                                    | По умолчанию | Описание                                                                   |
| :-------------------------- | :--------------------------------------------------------------------- | :----------- | :------------------------------------------------------------------------- |
| `getOptions`                | `(value: string) => ListItemData<T>[] \| Promise<ListItemData<T>[]>`   |              | **Обязательный.** Функция для получения опций (синхронно или асинхронно)   |
| `onOptionClick`             | `(item: T, index?: number, fromKeyboard?: boolean) => boolean \| void` |              | Callback при клике на опцию. Вернуть `true`, чтобы оставить попап открытым |
| `renderOption`              | `(item: ListItemData<T>) => ReactNode`                                 |              | Кастомный рендерер опции                                                   |
| `virtualized`               | `boolean`                                                              | `false`      | Включить виртуализацию для длинных списков                                 |
| `itemHeight`                | `number \| ((item: ListItemData<T>) => number)`                        |              | Высота опции (требуется для виртуализации)                                 |
| `getOptionHeight`           | `(option: ListItemData<T>, index: number) => number`                   |              | Получить высоту конкретной опции                                           |
| `getInitialActiveItemIndex` | `(options: ListItemData<T>[]) => number`                               |              | Определить, какая опция активна после загрузки                             |

### Свойства TextInput

| Название          | Тип                         | По умолчанию | Описание                                       |
| :---------------- | :-------------------------- | :----------- | :--------------------------------------------- |
| `value`           | `string`                    | `''`         | Значение поля ввода (контролируемое)           |
| `defaultValue`    | `string`                    |              | Начальное значение (неконтролируемое)          |
| `onUpdate`        | `(value: string) => void`   |              | Callback при изменении значения                |
| `placeholder`     | `string`                    |              | Placeholder поля ввода                         |
| `size`            | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'`        | Размер поля ввода                              |
| `pin`             | `TextInputPin`              |              | Стиль углов поля ввода                         |
| `disabled`        | `boolean`                   | `false`      | Отключить поле ввода                           |
| `readOnly`        | `boolean`                   | `false`      | Сделать поле ввода доступным только для чтения |
| `autoComplete`    | `boolean \| string`         | `false`      | Атрибут autocomplete                           |
| `autoFocus`       | `boolean`                   | `false`      | Автофокус при монтировании                     |
| `hasClear`        | `boolean`                   | `false`      | Показать кнопку очистки                        |
| `error`           | `string \| boolean`         |              | Состояние ошибки                               |
| `errorMessage`    | `ReactNode`                 |              | Содержимое сообщения об ошибке                 |
| `errorPlacement`  | `'inside' \| 'outside'`     |              | Размещение сообщения об ошибке                 |
| `validationState` | `'invalid'`                 |              | Состояние валидации                            |
| `className`       | `string`                    |              | CSS класс                                      |
| `inputClassName`  | `string`                    |              | CSS класс для элемента input                   |
| `id`              | `string`                    |              | ID компонента (генерируется автоматически)     |
| `name`            | `string`                    |              | Атрибут name для формы                         |
| `controlProps`    | `InputHTMLAttributes`       |              | Дополнительные свойства input                  |
| `controlRef`      | `Ref<HTMLInputElement>`     |              | Ref на нижележащий `<input>`                   |
| `startContent`    | `ReactNode`                 |              | Контент перед полем ввода                      |
| `endContent`      | `ReactNode`                 |              | Контент после поля ввода                       |

### Настройка попапа

| Название             | Тип                   | По умолчанию | Описание                                                                                                                               |
| :------------------- | :-------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `popupClassName`     | `string`              |              | CSS класс для попапа                                                                                                                   |
| `popupPlacement`     | `PopupPlacement`      |              | Размещение попапа                                                                                                                      |
| `popupQa`            | `string`              |              | QA атрибут для попапа                                                                                                                  |
| `popupWidth`         | `'fit' \| number`     | `'fit'`      | Режим ширины попапа                                                                                                                    |
| `popupOffset`        | `[number, number]`    |              | Смещение попапа [x, y]                                                                                                                 |
| `popupDisablePortal` | `boolean`             | `false`      | Отключить портал попапа                                                                                                                |
| `syncPopupOnResize`  | `boolean`             | `false`      | Пересчитывать ширину попапа при ресайзе `window`, чтобы она оставалась синхронизированной с полем ввода                                |
| `renderStyle`        | `'popup' \| 'inline'` | `'popup'`    | Режим рендеринга опций. `'inline'` рендерит опции под полем ввода (без портала) и сохраняет их видимыми независимо от состояния фокуса |
| `open`               | `boolean`             |              | Контролируемое состояние попапа                                                                                                        |
| `defaultOpen`        | `boolean`             |              | Начальное состояние (неконтролируемое)                                                                                                 |

### Управление поведением

| Название                  | Тип          | По умолчанию | Описание                                                     |
| :------------------------ | :----------- | :----------- | :----------------------------------------------------------- |
| `debounce`                | `number`     | `0`          | Задержка debounce (мс) для вызовов `getOptions`              |
| `loading`                 | `boolean`    |              | Переопределить состояние загрузки (для контролируемых опций) |
| `showOptionsOnEmptyValue` | `boolean`    | `false`      | Показывать опции при пустом поле ввода                       |
| `getOptionsOnMount`       | `boolean`    | `false`      | Загрузить опции при монтировании                             |
| `applicableInputValue`    | `boolean`    | `false`      | Разрешить произвольные значения ввода (не только из списка)  |
| `showNoOptionsMessage`    | `boolean`    | `true`       | Показывать сообщение «нет опций», когда список пуст          |
| `onLoadMore`              | `() => void` |              | Callback для подгрузки опций (бесконечный скролл)            |

### Обработчики событий

| Название              | Тип                                                                   | Описание                                                            |
| :-------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `onBlur`              | `() => void`                                                          | Callback при потере фокуса полем ввода                              |
| `onOpenChange`        | `(isOpen: boolean) => void`                                           | Callback при изменении состояния попапа                             |
| `onInputKeyDown`      | `(value: string, event: KeyboardEvent) => void`                       | Callback нажатия клавиши (когда нет активной опции)                 |
| `onInputEnterKeyDown` | `(value: string, event: KeyboardEvent) => void`                       | Callback для Enter при `applicableInputValue=true`                  |
| `onTabKeyDown`        | `(value, event, extra: {items, activeIndex}) => boolean \| undefined` | Callback для Tab. Возвращаемое значение управляет состоянием попапа |

### Fallback-контент

| Название                  | Тип                                                 | Описание                                                                                                                                        |
| :------------------------ | :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `emptyIcon`               | `IconData`                                          | Опциональная маленькая иконка (из `@gravity-ui/icons` или совместимая) в дефолтном плейсхолдере пустого состояния. Не передавайте, чтобы скрыть |
| `errorIcon`               | `IconData`                                          | Опциональная маленькая иконка (из `@gravity-ui/icons` или совместимая) в дефолтном плейсхолдере ошибки. Не передавайте, чтобы скрыть            |
| `renderEmptyOptions`      | `(props: {value, loading}) => ReactElement \| null` | Кастомный компонент для пустого состояния                                                                                                       |
| `renderFetchOptionsError` | `(props: {value, error}) => ReactElement \| null`   | Кастомный компонент для состояния ошибки                                                                                                        |
| `renderPopup`             | `({list, loading, error}) => ReactNode`             | Кастомный рендерер содержимого попапа                                                                                                           |

### Кастомный лейаут

| Название   | Тип                                                                             | Описание                                                                                   |
| :--------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| `children` | `(input: ReactNode, options: ListItemData<T>[], loading: boolean) => ReactNode` | Render-prop для полностью кастомных лейаутов (заменяет рендеринг по умолчанию через попап) |

#### Inline-режим рендеринга

Полезно, когда вы хотите, чтобы опции расширяли поток документа вместо того, чтобы плавать поверх остального контента (например, внутри карточки, сайдбара или пошаговой формы).

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderStyle="inline"
  renderOption={(item) => <div>{item.content}</div>}
/>
```

#### Лейаут через render-prop (`children`)

Для более сложных лейаутов (например, поле ввода и панель опций бок о бок) используйте render-prop в `children`. Вы получаете готовый элемент input, текущий список опций и флаг загрузки, и возвращаете любой нужный JSX.

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  renderOption={(item) => <div>{item.content}</div>}
>
  {(input, options, loading) => (
    <div className="my-layout">
      <div className="my-layout__input">{input}</div>
      <div className="my-layout__results">
        {loading ? <Spinner /> : options.map((opt) => <Card key={opt.value} item={opt} />)}
      </div>
    </div>
  )}
</Suggest>
```

#### Пересинхронизация ширины попапа при ресайзе (`syncPopupOnResize`)

По умолчанию попап измеряет ширину поля ввода один раз при открытии. Если ваш лейаут может изменять размер без перемонтирования input (например, адаптивный сайдбар), включите `syncPopupOnResize`, чтобы ширина попапа оставалась согласованной с полем ввода.

```tsx
<Suggest
  value={value}
  onUpdate={setValue}
  getOptions={getOptions}
  syncPopupOnResize
  renderOption={(item) => <div>{item.content}</div>}
/>
```
