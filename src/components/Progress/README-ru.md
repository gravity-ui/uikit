<!--GITHUB_BLOCK-->

# Progress

<!--/GITHUB_BLOCK-->

```tsx
import {Progress} from '@gravity-ui/uikit';
```

Компонент `Progress` отображает текущий ход выполнения операции. Может быть разбит на секции.

## Тема

С помощью свойства `theme` можно настроить цвет всего прогресса или его составной части:

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress text="default" value={50} />
<Progress text="warning" theme="warning" value={50} />
<Progress text="info" theme="info" value={50} />
<Progress text="success" theme="success" value={50} />
<Progress text="danger" theme="danger" value={50} />
<Progress text="misc" theme="misc" value={50} />
`}
>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="default" value={50} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="success" theme="success" value={50} />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="warning" theme="warning" value={50} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="danger" theme="danger" value={50} />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="info" theme="info "value={50} />
    <div style={{height: '15px'}} />
    <UIKit.Progress text="misc" theme="misc" value={50} />
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress text="default" value={50} />
<Progress text="warning" theme="warning" value={50} />
<Progress text="info" theme="info" value={50} />
<Progress text="success" theme="success" value={50} />
<Progress text="danger" theme="danger" value={50} />
<Progress text="misc" theme="misc" value={50} />
```

<!--/GITHUB_BLOCK-->

## Состояния

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress text="Loading" theme="misc" value={60} loading={true} />
`}
>
  <div style={{width: '30%'}}>
    <UIKit.Progress text="Loading" theme="misc" value={60} loading={true} />
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress text="Loading" theme="misc" value={60} loading={true} />
```

<!--/GITHUB_BLOCK-->

## Размер

Размер `Progress` можно настроить с помощью свойства `size`. Возможные значения: `"xs"`, `"s"` и `"m"`. Свойство `text` поддерживает только размер `"m"`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress theme="success" value={60} size="xs" />
<Progress theme="warning" value={70} size="s" />
<Progress theme="danger" value={80} size="m" />
`}
>
  <div style={{width: '30%'}}><UIKit.Progress theme="success" value={60} size="xs" /></div>
  <div style={{width: '30%'}}><UIKit.Progress theme="warning" value={70} size="s" /></div>
  <div style={{width: '30%'}}><UIKit.Progress theme="danger" value={80} size="m" /></div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress theme="success" value={60} size="xs" />
<Progress theme="warning" value={70} size="s" />
<Progress theme="danger" value={80} size="m" />
```

<!--/GITHUB_BLOCK-->

## Брейкпоинты

Для установки брейкпоинтов в компоненте `Progress` используется свойство `colorStops`.

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress
  value={10}
  colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
/>
<Progress
  value={40}
  colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
/>
<Progress
  value={60}
  colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
/>
`}
>
  <div style={{width: '30%'}}>
    <UIKit.Progress
      value={10}
      colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
    />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress
      value={40}
      colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
    />
  </div>
  <div style={{width: '30%'}}>
    <UIKit.Progress
      value={60}
      colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]}
    />
  </div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress value={10} colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]} />
<Progress value={40} colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]} />
<Progress value={60} colorStops={[{theme: 'danger', stop: 20}, {theme: 'warning', stop: 50}, {theme: 'success', stop: 100}]} />
```

<!--/GITHUB_BLOCK-->

## Стек

<!--LANDING_BLOCK

<ExampleBlock
  code={`
<Progress
  stack={[
    {theme: 'default', content: 'First', value: 25},
    {theme: 'success', content: 'Second', value: 25},
    {theme: 'warning', content: 'Third', value: 25},
    {theme: 'danger', content: 'Fourth', value: 25},
  ]}
/>
<Progress text="Progress with custom colors"
  stack={[
    {color: '#6e5d8c', value: 33.333333333333336},
    {color: '#5b785b', value: 33.333333333333336},
    {color: '#956069', value: 33.333333333333336},
  ]}
/>
`}
>
<div style={{width: '30%'}}>
  <UIKit.Progress
    stack={[
      {theme: 'default', content: 'First', value: 25},
      {theme: 'success', content: 'Second', value: 25},
      {theme: 'warning', content: 'Third', value: 25},
      {theme: 'danger', content: 'Fourth', value: 25},
    ]}
  />
</div>
<div style={{width: '30%'}}>
  <UIKit.Progress text="Progress with custom colors"
    stack={[
      {color: '#6e5d8c', value: 33.333333333333336},
      {color: '#5b785b', value: 33.333333333333336},
      {color: '#956069', value: 33.333333333333336},
    ]}
  />
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Progress stack={[
  {theme: 'default', content: 'First', value: 25},
  {theme: 'success', content: 'Second', value: 25},
  {theme: 'warning', content: 'Third', value: 25},
  {theme: 'danger', content: 'Fourth', value: 25},
]} />
<Progress text="Progress with custom colors" stack={[
  {color: '#6e5d8c', value: 33.333333333333336},
  {color: '#5b785b', value: 33.333333333333336},
  {color: '#956069', value: 33.333333333333336},
]} />
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя             | Описание                                                                                                                                       |                   Тип                    | Значение по умолчанию |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------: | :-------------------: |
| className       | HTML-атрибут `class`.                                                                                                                          |                 `string`                 |                       |
| colorStops      | Задает брейкпоинты с темами.                                                                                                                   | ` Array<{theme: string; stop: number;}>` |                       |
| colorStopsValue | Устанавливает значение для выбора текущей точки остановки цвета или альтернативное значение для `colorStops`. Диапазон значений — от 0 до 100. |                 `number`                 |                       |
| loading         | Включает или отключает состояние `loading`.                                                                                                    |                `boolean`                 |        `false`        |
| size            | Задает размер прогресс-бара. Отображение текста доступно только при размере `"m"`.                                                             |                 `string`                 |         `"m"`         |
| stack           | Конфигурация составного прогресс-бара. Необязательное свойство, если указано `value`.                                                          |             ` Array<Stack>`              |                       |
| stackClassName  | HTML-атрибут `name` для стека.                                                                                                                 |                 `string`                 |                       |
| text            | Текст внутри прогресс-бара.                                                                                                                    |                 `string`                 |                       |
| theme           | Задает цвет прогресса.                                                                                                                         |                 `string`                 |      `"default"`      |
| value           | Текущее значение прогресса. Диапазон значений — от 0 до 100. Свойство `stack` является необязательным и используется как `maxValue`.           |                 `number`                 |                       |

### `Stack`

| Имя       | Описание                                                                                                                             |     Тип     | Значение по умолчанию |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------- | :---------: | :-------------------: |
| className | HTML-атрибут `class` для элемента стека.                                                                                             |  `string`   |                       |
| color     | Задает цвет фона в HTML-атрибуте `style`.                                                                                            |  `string`   |                       |
| content   | Содержимое элемента стека.                                                                                                           | `ReactNode` |                       |
| title     | HTML-атрибут `title`.                                                                                                                |  `string`   |                       |
| theme     | Задает цвет элемента стека.                                                                                                          |  `string`   |      `"default"`      |
| value     | Текущее значение прогресса. Диапазон значений — от 0 до 100. Свойство `stack` является необязательным и используется как `maxValue`. |  `number`   |                       |
| qa        | HTML-атрибут `data-qa`, используется для тестирования.                                                                               |  `string`   |                       |

## API CSS

| Имя                                    | Описание                                      |
| :------------------------------------- | :-------------------------------------------- |
| `--g-progress-empty-text-color`        | Цвет текста для пустого `Progress`.           |
| `--g-progress-filled-text-color`       | Цвет текста для заполненной части `Progress`. |
| `--g-progress-empty-background-color`  | Цвет фона для пустого `Progress`.             |
| `--g-progress-filled-background-color` | Цвет текста для заполненной части `Progress`. |
