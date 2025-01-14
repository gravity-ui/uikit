<!--GITHUB_BLOCK-->

# Palette

<!--/GITHUB_BLOCK-->

```tsx
import {Palette} from '@gravity-ui/uikit';
```

Компонент `Palette` (палитра) отображает сетку с иконками, эмодзи, реакциями и символами, которые можно выбирать или снимать с них выбор.

### Отключенное состояние

Можно отключить опции с помощью свойства `disabled`. Если нужно отключить только некоторые опции, измените значение свойства `disabled` у нужных опций (`PaletteOption[]`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
// disable the first item
<Palette options={[{ ...options[0], disabled: true }, options[1]]} disabled={true} />
// or disable all of them
<Palette options={options} disabled={true} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool', disabled: true},
            {content: '🥴', value: 'ID-woozy'},
        ]}
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        disabled={true}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
  // disable a single item
  {content: '😎', value: 'ID-cool', disabled: true},
  {content: '🥴', value: 'ID-woozy'},
];
// or disable all of them
<Palette options={options} disabled={true} />;
```

<!--/GITHUB_BLOCK-->

### Размер

Размер `Palette` можно настроить с помощью свойства `size`. Размер по умолчанию — `s`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} size={"xs"} />
<Palette options={options} size={"s"} />
<Palette options={options} size={"m"} />
<Palette options={options} size={"l"} />
<Palette options={options} size={"xl"} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="xs"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="s"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="m"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="l"
    />
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        size="xl"
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} size={"xs"} />
<Palette options={options} size={"s"} />
<Palette options={options} size={"m"} />
<Palette options={options} size={"l"} />
<Palette options={options} size={"xl"} />
```

<!--/GITHUB_BLOCK-->

### Столбцы

Количество столбцов в сетке можно изменить через свойство `columns` (по умолчанию — `6`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} columns={1} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        columns={1}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
  {content: '😎', value: 'ID-cool'},
  {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} columns={1} />;
```

<!--/GITHUB_BLOCK-->

### `Multiple` (несколько опций)

По умолчанию можно выбирать и снимать выбор с нескольких опций. Если нужно разрешить выбор только одной опции, отключите свойство `multiple`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: PaletteOption[] = [
    {content: '😎', value: 'ID-cool'},
    {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} multiple={false} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool'},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        multiple={false}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: PaletteOption[] = [
  {content: '😎', value: 'ID-cool'},
  {content: '🥴', value: 'ID-woozy'},
];
<Palette options={options} columns={1} />;
```

<!--/GITHUB_BLOCK-->

### Свойства

`PaletteProps`:

| Имя             | Описание                                                                                 |                          Тип                           | Значение по умолчанию |
| :-------------- | :--------------------------------------------------------------------------------------- | :----------------------------------------------------: | :-------------------: |
| aria-label      | HTML-атрибут `aria-label`.                                                               |                        `string`                        |                       |
| aria-labelledby | Идентификатор видимого элемента заголовка в `Palette`.                                   |                        `string`                        |                       |
| className       | HTML-атрибут `class`.                                                                    |                        `string`                        |                       |
| columns         | Количество элементов в одной строке.                                                     |                        `number`                        |          `6`          |
| defaultValue    | Задает начальное значение состояния компонента при его монтировании.                     |                       `string[]`                       |                       |
| disabled        | Отключает опции.                                                                         |                       `boolean`                        |        `false`        |
| multiple        | Включает возможность выбора нескольких опций.                                            |                       `boolean`                        |        `true`         |
| onBlur          | Обработчик события `onBlur`.                                                             | `(event: React.FocusEvent<HTMLButtonElement>) => void` |                       |
| onFocus         | Обработчик события `onFocus`.                                                            | `(event: React.FocusEvent<HTMLButtonElement>) => void` |                       |
| onUpdate        | Срабатывает при изменении состояния пользователем. Передает новое значение как аргумент. |              `(value: string[]) => void`               |                       |
| optionClassName | HTML-атрибут `value` для кнопки палитры.                                                 |                        `string`                        |                       |
| options         | Список опций (элементов палитры).                                                        |                   `PaletteOption[]`                    |         `[]`          |
| qa              | HTML-атрибут `data-qa`, используется для тестирования.                                   |                        `string`                        |                       |
| rowClassName    | HTML-атрибут `class` для строки палитры.                                                 |                        `string`                        |                       |
| size            | Определяет размер элементов.                                                             |                 `xs` `s` `m` `l` `xl`                  |          `m`          |
| style           | HTML-атрибут `style`.                                                                    |                 `React.CSSProperties`                  |                       |
| value           | Текущее значение для контролируемого использования компонента.                           |                       `string[]`                       |                       |

`PaletteOption`:

| Имя      | Описание              |     Тип     | Значение по умолчанию |
| :------- | :-------------------- | :---------: | :-------------------: |
| content  | HTML-атрибут `class`. | `ReactNode` |                       |
| disabled | Отключает кнопку.     |  `boolean`  |        `false`        |
| title    | HTML-атрибут `title`. |  `string`   |                       |
| value    | Значение контрола.    |  `string`   |                       |
