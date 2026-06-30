<!--GITHUB_BLOCK-->

# RadioGroup

<!--/GITHUB_BLOCK-->

```tsx
import {RadioGroup} from '@gravity-ui/uikit';
```

Компонент `RadioGroup` (радиогруппа) используется для создания группы, где пользователи могут выбрать только один вариант из нескольких предложенных.

### Отключенное состояние

<!--SANDBOX
import type {RadioGroupOption} from '@gravity-ui/uikit';
import {RadioGroup} from '@gravity-ui/uikit';

const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

export default function () {
    return (
        <RadioGroup name="group2" defaultValue={options[0].value} options={options} disabled />
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group2" defaultValue={options[0].value} options={options} disabled />;
```

<!--/GITHUB_BLOCK-->

### Размер

Размер `RadioGroup` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--SANDBOX
import type {RadioGroupOption} from '@gravity-ui/uikit';
import {RadioGroup} from '@gravity-ui/uikit';

const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

export default function () {
    return (
        <>
            <RadioGroup name="group1" defaultValue={options[0].value} options={options} size="m" />
            <RadioGroup name="group2" defaultValue={options[0].value} options={options} size="l" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
  const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
  ];
  <RadioGroup name="group1" defaultValue={options[0].value} options={options} size="m"/>
  <RadioGroup name="group2" defaultValue={options[0].value} options={options} size="l"/>
```

<!--/GITHUB_BLOCK-->

### Направление

Направление расположения `RadioGroup` можно настроить с помощью свойства `direction`. Направление по умолчанию — `horizontal`.

<!--SANDBOX
import type {RadioGroupOption} from '@gravity-ui/uikit';
import {RadioGroup} from '@gravity-ui/uikit';

const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

export default function () {
    return (
        <>
            <RadioGroup
                name="group1"
                defaultValue={options[0].value}
                options={options}
                direction="horizontal"
            />
            <RadioGroup
                name="group2"
                defaultValue={options[0].value}
                options={options}
                direction="vertical"
            />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
  const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
  ];
  <RadioGroup name="group1" defaultValue={options[0].value} options={options} direction="horizontal"/>
  <RadioGroup name="group2" defaultValue={options[0].value} options={options} direction="vertical"/>
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя             | Описание                                                                                                            |            Тип            | Значение по умолчанию |
| :-------------- | :------------------------------------------------------------------------------------------------------------------ | :-----------------------: | :-------------------: |
| children        | Содержимое радиогруппы.                                                                                             |        `ReactNode`        |                       |
| disabled        | Включает или отключает состояние `disabled` у радиогруппы.                                                          |         `boolean`         |        `false`        |
| options         | Варианты для радиогруппы.                                                                                           |   `RadioGroupOption[]`    |                       |
| optionClassName | HTML-атрибут `class` для дочерних элементов радиогруппы.                                                            |         `string`          |                       |
| direction       | Определяет направление расположения радиогруппы.                                                                    |  `horizontal - vertical`  |    `"horizontal"`     |
| defaultValue    | Задает начальное значение состояния компонента при его монтировании.                                                |         `string`          |                       |
| onUpdate        | Срабатывает при изменении состояния радио пользователем и передает новое значение как аргумент обратного вызова.    | `(value: string) => void` |                       |
| onChange        | Срабатывает при изменении состояния радио пользователем и передает событие изменения как аргумент обратного вызова. |        `Function`         |                       |
| size            | Определяет размер радиогруппы.                                                                                      |          `m` `l`          |          `m`          |
| qa              | HTML-атрибут `data-qa`, используется для тестирования.                                                              |         `string`          |                       |
| style           | HTML-атрибут `style`.                                                                                               |   `React.CSSProperties`   |                       |
| className       | HTML-атрибут `class`.                                                                                               |         `string`          |                       |

## RadioGroup.Option

`RadioGroup` также имеет вложенный компонент `Option`, который является эквивалентом `Radio` и может быть использован для создания вариантов радио в рамках `RadioGroup`.

<!--SANDBOX
import type {RadioGroupOption} from '@gravity-ui/uikit';
import {RadioGroup} from '@gravity-ui/uikit';

const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

export default function () {
    return (
        <RadioGroup name="group1" defaultValue={options[0].value}>
            <RadioGroup.Option content={options[0].content} value={options[0].value} />
            <RadioGroup.Option content={options[1].content} value={options[1].value} />
            <RadioGroup.Option content={options[2].content} value={options[2].value} />
        </RadioGroup>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const options: RadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioGroup name="group1" defaultValue={options[0].value}>
  <RadioGroup.Option content={options[0].content} value={options[0].value} />
  <RadioGroup.Option content={options[1].content} value={options[1].value} />
  <RadioGroup.Option content={options[2].content} value={options[2].value} />
</RadioGroup>;
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя      | Описание                                             |     Тип     | Значение по умолчанию |
| :------- | :--------------------------------------------------- | :---------: | :-------------------: |
| children | Содержимое радио (как правило, лейбл).               | `ReactNode` |                       |
| content  | Содержимое радио (альтернатива `children`).          | `ReactNode` |                       |
| disabled | Включает или отключает состояние `disabled` у радио. |  `boolean`  |        `false`        |
| value    | Значение контрола.                                   |  `string`   |                       |
