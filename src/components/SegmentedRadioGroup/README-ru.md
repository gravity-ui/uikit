<!--GITHUB_BLOCK-->

# SegmentedRadioGroup

<!--/GITHUB_BLOCK-->

```tsx
import {SegmentedRadioGroup} from '@gravity-ui/uikit';
```

Компонент `SegmentedRadioGroup` используется для создания группы кнопок с зависимой фиксацией (т.н. «радиокнопок»), где пользователи могут выбрать только один вариант из нескольких предложенных.

### Отключенное состояние

<!--SANDBOX
import {Flex, SegmentedRadioGroup} from '@gravity-ui/uikit';

export default function () {
    return (
        <SegmentedRadioGroup name="group1" defaultValue="Value 1" disabled>
            <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
            <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
            <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
        </SegmentedRadioGroup>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SegmentedRadioGroup name="group1" defaultValue="Value 1" disabled>
  <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
  <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
  <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
</SegmentedRadioGroup>
```

<!--/GITHUB_BLOCK-->

### Размер

Размер `SegmentedRadioGroup` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--SANDBOX
import {SegmentedRadioGroup} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex direction="column" alignItems="center" gap={2}>
            <SegmentedRadioGroup name="group1" defaultValue="Value 1" size="s">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
            <SegmentedRadioGroup name="group2" defaultValue="Value 1" size="m">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
            <SegmentedRadioGroup name="group3" defaultValue="Value 1" size="l">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
            <SegmentedRadioGroup name="group4" defaultValue="Value 1" size="xl">
                <SegmentedRadioGroup.Option value="Value 1">Value 1</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 2">Value 2</SegmentedRadioGroup.Option>
                <SegmentedRadioGroup.Option value="Value 3">Value 3</SegmentedRadioGroup.Option>
            </SegmentedRadioGroup>
        </Flex>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const options = [
    <SegmentedRadioGroup.Option key="Value 1" value="Value 1">Value 1</SegmentedRadioGroup.Option>,
    <SegmentedRadioGroup.Option key="Value 2" value="Value 2">Value 2</SegmentedRadioGroup.Option>,
    <SegmentedRadioGroup.Option key="Value 3" value="Value 3">Value 3</SegmentedRadioGroup.Option>,
];

<SegmentedRadioGroup name="group1" defaultValue="Value 1" size="s">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group2" defaultValue="Value 1" size="m">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group3" defaultValue="Value 1" size="l">{options}</SegmentedRadioGroup>
<SegmentedRadioGroup name="group4" defaultValue="Value 1" size="xl">{options}</SegmentedRadioGroup>
```

<!--/GITHUB_BLOCK-->

### Ширина

Ширину `SegmentedRadioGroup` можно настроить с помощью свойства `width`.

<!--SANDBOX
import {Box, Flex, SegmentedRadioGroup} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width={140} style={{border: '2px dashed gray'}}>
            <Flex direction="column" gap={2}>
                <SegmentedRadioGroup>
                    <SegmentedRadioGroup.Option value="1" content="none" />
                    <SegmentedRadioGroup.Option value="2" content="none********" />
                </SegmentedRadioGroup>
                <SegmentedRadioGroup width="auto">
                    <SegmentedRadioGroup.Option value="1" content="auto" />
                    <SegmentedRadioGroup.Option value="2" content="auto********" />
                </SegmentedRadioGroup>
                <SegmentedRadioGroup width="max">
                    <SegmentedRadioGroup.Option value="1" content="max" />
                    <SegmentedRadioGroup.Option value="2" content="max" />
                </SegmentedRadioGroup>
            </Flex>
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<div style={{width: 140, border: '2px dashed gray'}}>
  <div style={{marginBottom: 10}}>
    <SegmentedRadioGroup>
      <SegmentedRadioGroup.Option value="1" content="none" />
      <SegmentedRadioGroup.Option value="2" content="none********" />
    </SegmentedRadioGroup>
  </div>
  <div style={{marginBottom: 10}}>
    <SegmentedRadioGroup width="auto">
      <SegmentedRadioGroup.Option value="1" content="auto" />
      <SegmentedRadioGroup.Option value="2" content="auto********" />
    </SegmentedRadioGroup>
  </div>
  <div>
    <SegmentedRadioGroup width="max">
      <SegmentedRadioGroup.Option value="1" content="max" />
      <SegmentedRadioGroup.Option value="2" content="max" />
    </SegmentedRadioGroup>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя          | Описание                                                                                                                  |                Тип                 | По умолчанию |
| :----------- | :------------------------------------------------------------------------------------------------------------------------ | :--------------------------------: | :----------: |
| children     | Содержимое радиокнопки.                                                                                                   |            `ReactNode`             |              |
| disabled     | Включает или отключает состояние `disabled` у радиокнопки.                                                                |             `boolean`              |   `false`    |
| options      | Опции радиокнопки.                                                                                                        | `SegmentedRadioGroupOptionProps[]` |              |
| defaultValue | Задает начальное значение состояния компонента при его монтировании.                                                      |              `string`              |              |
| onUpdate     | Срабатывает при изменении состояния радиокнопки пользователем и передает новое значение как аргумент обратного вызова.    |     `(value: string) => void`      |              |
| onChange     | Срабатывает при изменении состояния радиокнопки пользователем и передает событие изменения как аргумент обратного вызова. |             `Function`             |              |
| onFocus      | Обработчик события, вызываемый, когда элемент ввода радио получает фокус.                                                 |             `Function`             |              |
| onBlur       | Обработчик события, вызываемый, когда элемент ввода радио теряет фокус.                                                   |             `Function`             |              |
| width        | Определяет ширину радиокнопки.                                                                                            |            `auto - max`            |              |
| size         | Определяет размер радиокнопки.                                                                                            |          `s` `m` `l` `xl`          |     `m`      |
| name         | HTML-атрибут `name` для элемента ввода.                                                                                   |              `string`              |              |
| qa           | HTML-атрибут `data-qa`, используется для тестирования.                                                                    |              `string`              |              |
| style        | HTML-атрибут `style`.                                                                                                     |       `React.CSSProperties`        |              |
| className    | HTML-атрибут `class`.                                                                                                     |              `string`              |              |

## SegmentedRadioGroup.Option

`SegmentedRadioGroup` также имеет вложенный компонент `Option`. Его можно использовать для создания вариантов радиокнопок внутри `SegmentedRadioGroup`.

<!--SANDBOX
import type {SegmentedRadioGroupOptionProps} from '@gravity-ui/uikit';
import {SegmentedRadioGroup} from '@gravity-ui/uikit';

const options: SegmentedRadioGroupOptionProps[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
];

export default function () {
    return (
        <SegmentedRadioGroup name="group1" defaultValue={options[0].value}>
            <SegmentedRadioGroup.Option content={options[0].content} value={options[0].value} />
            <SegmentedRadioGroup.Option content={options[1].content} value={options[1].value} />
            <SegmentedRadioGroup.Option content={options[2].content} value={options[2].value} />
        </SegmentedRadioGroup>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const options: SegmentedRadioGroupOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<SegmentedRadioGroup name="group1" defaultValue={options[0].value}>
  <SegmentedRadioGroup.Option content={options[0].content} value={options[0].value} />
  <SegmentedRadioGroup.Option content={options[1].content} value={options[1].value} />
  <SegmentedRadioGroup.Option content={options[2].content} value={options[2].value} />
</SegmentedRadioGroup>;
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя      | Описание                                             |     Тип     | Значение по умолчанию |
| :------- | :--------------------------------------------------- | :---------: | :-------------------: |
| children | Содержимое радио (как правило, лейбл).               | `ReactNode` |                       |
| content  | Содержимое радио (альтернатива `children`).          | `ReactNode` |                       |
| disabled | Включает или отключает состояние `disabled` у радио. |  `boolean`  |        `false`        |
| value    | Значение контрола.                                   |  `string`   |                       |
