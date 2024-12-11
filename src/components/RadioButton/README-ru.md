<!--GITHUB_BLOCK-->

# RadioButton

<!--/GITHUB_BLOCK-->

```tsx
import {RadioButton} from '@gravity-ui/uikit';
```

Компонент `RadioButton` используется для создания группы кнопок с зависимой фиксацией (т.н. «радиокнопок»), где пользователи могут выбрать только один вариант из нескольких предложенных.

### Отключенное состояние

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value} options={options} disabled/>
`}
>
  <UIKit.RadioButton name="group1" defaultValue="Value 1" options={
    [
      {value: 'Value 1', content: 'Value 1'},
      {value: 'Value 2', content: 'Value 2'},
      {value: 'Value 3', content: 'Value 3'},
    ]
  } disabled/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value} options={options} disabled />;
```

<!--/GITHUB_BLOCK-->

### Размер

Размер `RadioButton` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 's'},
  {value: 'Value 2', content: 'm'},
  {value: 'Value 3', content: 'l'},
  {value: 'Value 4', content: 'xl'},
];
<RadioButton name="group1" defaultValue={options[0].value} options={options} size="s"/>
<RadioButton name="group2" defaultValue={options[1].value} options={options} size="m"/>
<RadioButton name="group3" defaultValue={options[2].value} options={options} size="l"/>
<RadioButton name="group4" defaultValue={options[3].value} options={options} size="xl"/>
`}
>
  <div style={{display: 'grid', justifyItems: 'center', gap: 10}}>
    <UIKit.RadioButton name="group1" defaultValue="Value 1" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="s"/>
    <UIKit.RadioButton name="group2" defaultValue="Value 2" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="m"/>
    <UIKit.RadioButton name="group3" defaultValue="Value 3" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="l"/>
    <UIKit.RadioButton name="group4" defaultValue="Value 4" options={
      [
        {value: 'Value 1', content: 's'},
        {value: 'Value 2', content: 'm'},
        {value: 'Value 3', content: 'l'},
        {value: 'Value 4', content: 'xl'},
      ]
    } size="xl"/>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
  const options: RadioButtonOption[] = [
    {value: 'Value 1', content: 's'},
    {value: 'Value 2', content: 'm'},
    {value: 'Value 3', content: 'l'},
    {value: 'Value 4', content: 'xl'},
  ];
  <RadioButton name="group1" defaultValue={options[0].value} options={options} size="s"/>
  <RadioButton name="group2" defaultValue={options[1].value} options={options} size="m"/>
  <RadioButton name="group3" defaultValue={options[2].value} options={options} size="l"/>
  <RadioButton name="group4" defaultValue={options[3].value} options={options} size="xl"/>
```

<!--/GITHUB_BLOCK-->

### Ширина

Ширину `RadioButton` можно настроить с помощью свойства `width`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<div style={{width: 140, border: '2px dashed gray'}}>
  <div style={{marginBottom: 10}}>
    <RadioButton>
      <RadioButton.Option value="1" content="none" />
      <RadioButton.Option value="2" content="none********" />
    </RadioButton>
  </div>
  <div style={{marginBottom: 10}}>
    <RadioButton width="auto">
      <RadioButton.Option value="1" content="auto" />
      <RadioButton.Option value="2" content="auto********" />
    </RadioButton>
  </div>
  <div>
    <RadioButton width="max">
      <RadioButton.Option value="1" content="max" />
      <RadioButton.Option value="2" content="max" />
    </RadioButton>
  </div>
</div>
`}
>
<div style={{width: 140, border: '2px dashed gray'}}>
 <div style={{marginBottom: 10}}>
    <UIKit.RadioButton>
      <UIKit.RadioButton.Option value="1" content="none" />
      <UIKit.RadioButton.Option value="2" content="none********" />
    </UIKit.RadioButton>
  </div>
  <div style={{marginBottom: 10}}>
    <UIKit.RadioButton width="auto">
      <UIKit.RadioButton.Option value="1" content="auto" />
      <UIKit.RadioButton.Option value="2" content="auto********" />
    </UIKit.RadioButton>
  </div>
  <div>
    <UIKit.RadioButton width="max">
      <UIKit.RadioButton.Option value="1" content="max" />
      <UIKit.RadioButton.Option value="2" content="max" />
    </UIKit.RadioButton>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div style={{width: 140, border: '2px dashed gray'}}>
  <div style={{marginBottom: 10}}>
    <RadioButton>
      <RadioButton.Option value="1" content="none" />
      <RadioButton.Option value="2" content="none********" />
    </RadioButton>
  </div>
  <div style={{marginBottom: 10}}>
    <RadioButton width="auto">
      <RadioButton.Option value="1" content="auto" />
      <RadioButton.Option value="2" content="auto********" />
    </RadioButton>
  </div>
  <div>
    <RadioButton width="max">
      <RadioButton.Option value="1" content="max" />
      <RadioButton.Option value="2" content="max" />
    </RadioButton>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя          | Описание                                                                                                                  |            Тип            | По умолчанию |
| :----------- | :------------------------------------------------------------------------------------------------------------------------ | :-----------------------: | :----------: |
| children     | Содержимое радиокнопки.                                                                                                   |        `ReactNode`        |              |
| disabled     | Включает или отключает состояние `disabled` у радиокнопки.                                                                |         `boolean`         |   `false`    |
| options      | Опции радиокнопки.                                                                                                        |   `RadioButtonOption[]`   |              |
| defaultValue | Задает начальное значение состояния компонента при его монтировании.                                                      |         `string`          |              |
| onUpdate     | Срабатывает при изменении состояния радиокнопки пользователем и передает новое значение как аргумент обратного вызова.    | `(value: string) => void` |              |
| onChange     | Срабатывает при изменении состояния радиокнопки пользователем и передает событие изменения как аргумент обратного вызова. |        `Function`         |              |
| onFocus      | Обработчик события, вызываемый, когда элемент ввода радио получает фокус.                                                 |        `Function`         |              |
| onBlur       | Обработчик события, вызываемый, когда элемент ввода радио теряет фокус.                                                   |        `Function`         |              |
| width        | Определяет ширину радиокнопки.                                                                                            |       `auto - max`        |              |
| size         | Определяет размер радиокнопки.                                                                                            |     `s` `m` `l` `xl`      |     `m`      |
| name         | HTML-атрибут `name` для элемента ввода.                                                                                   |         `string`          |              |
| qa           | HTML-атрибут `data-qa`, используется для тестирования.                                                                    |         `string`          |              |
| style        | HTML-атрибут `style`.                                                                                                     |   `React.CSSProperties`   |              |
| className    | HTML-атрибут `class`.                                                                                                     |         `string`          |              |

## RadioButton.Option

`RadioButton` также имеет вложенный компонент `Option`. Его можно использовать для создания вариантов радиокнопок внутри `RadioButton`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value}>
  <RadioButton.Option content={options[0].content} value={options[0].value} />
  <RadioButton.Option content={options[1].content} value={options[1].value} />
  <RadioButton.Option content={options[2].content} value={options[2].value} />
</RadioGroup>
`}
>
<UIKit.RadioButton name="group1" defaultValue="Value 1">
  <UIKit.RadioButton.Option content="Value 1" value="Value 1" />
  <UIKit.RadioButton.Option content="Value 2" value="Value 2" />
  <UIKit.RadioButton.Option content="Value 3" value="Value 3" />
</UIKit.RadioButton>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const options: RadioButtonOption[] = [
  {value: 'Value 1', content: 'Value 1'},
  {value: 'Value 2', content: 'Value 2'},
  {value: 'Value 3', content: 'Value 3'},
];
<RadioButton name="group1" defaultValue={options[0].value}>
  <RadioButton.Option content={options[0].content} value={options[0].value} />
  <RadioButton.Option content={options[1].content} value={options[1].value} />
  <RadioButton.Option content={options[2].content} value={options[2].value} />
</RadioButton>;
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя      | Описание                                             |     Тип     | Значение по умолчанию |
| :------- | :--------------------------------------------------- | :---------: | :-------------------: |
| children | Содержимое радио (как правило, лейбл).               | `ReactNode` |                       |
| content  | Содержимое радио (альтернатива `children`).          | `ReactNode` |                       |
| disabled | Включает или отключает состояние `disabled` у радио. |  `boolean`  |        `false`        |
| value    | Значение контрола.                                   |  `string`   |                       |
