<!--GITHUB_BLOCK-->

# Alert

<!--/GITHUB_BLOCK-->

```tsx
import {Alert} from '@gravity-ui/uikit';
```

### `Theme` (тема)

`normal` — основная тема (используется по умолчанию).

`info` — используется для любой стандартной информации.

`success` — используется для положительной информации.

`warning` — используется для информации, требующей внимания.

`danger` — используется для критических ошибок.

`utility` — используется для полезных советов.

`clear` — подходит для использования Alert как часть других компонентов (например, в качестве `content` в `Popover`)

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert theme="normal" title="Normal" message="Normal theme" />
<Alert theme="info" title="Info" message="Info theme" />
<Alert theme="success" title="Success" message="Success theme" />
<Alert theme="warning" title="Warning" message="Warning theme" />
<Alert theme="danger" title="Danger" message="Danger theme" />
<Alert theme="utility" title="Utility" message="Utility theme" />
<Alert theme="clear" title="Clear" message="Clear theme" />
`}>
    <UIKit.Alert theme="normal" title="Normal" message="Normal theme" />
    <UIKit.Alert theme="info" title="Info" message="Info theme" />
    <UIKit.Alert theme="success" title="Success" message="Success theme" />
    <UIKit.Alert theme="warning" title="Warning" message="Warning theme" />
    <UIKit.Alert theme="danger" title="Danger" message="Danger theme" />
    <UIKit.Alert theme="utility" title="Utility" message="Utility theme" />
    <UIKit.Alert theme="clear" title="Clear" message="Clear theme" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert theme="normal" title="Normal" message="Normal theme"/>
<Alert theme="info" title="Info" message="Info theme"/>
<Alert theme="success" title="Success" message="Success theme"/>
<Alert theme="warning" title="Warning" message="Warning theme"/>
<Alert theme="danger" title="Danger" message="Danger theme"/>
<Alert theme="utility" title="Utility" message="Utility theme"/>
<Alert theme="clear" title="Clear" message="Clear theme" />
```

<!--/GITHUB_BLOCK-->

### `View` (вид)

`filled` — используется для настройки цвета фона алерта (используется по умолчанию).

`outlined` — используется для настройки цвета границ алерта.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert title="Filled" message="Filled view" view="filled" />
<Alert title="Outlined" message="Outlined theme" view="outlined" />
`}
>
    <UIKit.Alert title="Filled" message="Filled view" view="filled" />
    <UIKit.Alert title="Outlined" message="Outlined theme" view="outlined" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Alert title="Filled" message="Filled view" view="filled" />
<Alert title="Outlined" message="Outlined theme" view="outlined" />
```

<!--/GITHUB_BLOCK-->

### `Layout` (расположение)

`vertical` — используется для привлечения внимания пользователей к контенту, если задано свойство `actions` с кнопками. Кнопки отображаются под текстом (используется по умолчанию).

`horizontal` — используется для привлечения внимания пользователей к контенту, если задано свойство `actions` с кнопками. Кнопки отображаются справа от текста.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>} />
<Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>} />
`}>
    <UIKit.Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} />
    <UIKit.Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert layout="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>}/>
<Alert layout="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>}/>
```

<!--/GITHUB_BLOCK-->

### `Corners` (углы)

`rounded` — включает скругленные углы окна алерта (используется по умолчанию).

`square` — включает прямые углы окна алерта.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert title="Rounded" message="Rounded corners" corners="rounded"  />
<Alert title="Square" message="Square corners" corners="square" />
`}
>
    <UIKit.Alert title="Rounded" message="Rounded corners" corners="rounded"  />
    <UIKit.Alert title="Square" message="Square corners" corners="square" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert title="Rounded" message="Rounded corners" corners="rounded"/>
<Alert title="Square" message="Square corners" corners="square"/>
```

<!--/GITHUB_BLOCK-->

## Заголовок алерта

`title` — заголовок алерта. Имеет более низкий приоритет, чем у параметра `Alert.Title`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert title={<Alert.Title className={'some-class'} text="some text"></Alert.Title>} />
`}
>
    <UIKit.Alert title={<UIKit.Alert.Title className={'some-class'} text="some text"></UIKit.Alert.Title>} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert title={<Alert.Title className={'some-class'} text="some text"></Alert.Title>} />
```

<!--/GITHUB_BLOCK-->

## Сообщение алерта

`message` — сообщение алерта. Оно должно быть достаточно информативным, чтобы полностью объяснить суть алерта.

## `onClose`

`onClose` — функция обратного вызова, которая срабатывает, когда пользователь нажимает на кнопку закрытия алерта. Если это свойство задано, кнопка закрытия видима.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert onClose={() => alert('Close button pressed')} title="Alert has close" message="Alert has close" />
`}
>
    <UIKit.Alert onClose={() => alert('Close button pressed')} title="Alert has close" message="Alert has close" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert
  onClose={() => alert('Close button pressed')}
  title="Alert has close"
  message="Alert has close"
/>
```

<!--/GITHUB_BLOCK-->

### `Align` (выравнивание)

Управляет вертикальным выравниванием содержимого внутри компонента `Alert`:

`baseline` — выравнивание по умолчанию.

`center` — содержимое вертикально центрируется внутри компонента `Alert`. Может быть полезно, если элементы управления занимают больше пространства, чем текст, или если иконка должна располагаться посередине содержимого.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Alert align="baseline" theme="info" title="Baseline" message="Baseline align" actions={<Alert.Action>button</Alert.Action>} />
<Alert align="center" theme="info" title="Center" message="Center align" actions={<Alert.Action>button</Alert.Action>} align="center"/>
`}>
    <UIKit.Alert align="baseline" theme="info" title="Baseline" message="Baseline align" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} />
    <UIKit.Alert align="center" theme="info" title="Center" message="Center align" actions={<UIKit.Alert.Action>button</UIKit.Alert.Action>} align="center"/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Alert align="vertical" title="Vertical" message="Vertical direction" actions={<Alert.Action>button</Alert.Action>}/>
<Alert align="horizontal" title="Horizontal" message="Horizontal direction" actions={<Alert.Action>button</Alert.Action>}/>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя       | Описание                                                                                                   |                                     Тип                                      | Значение по умолчанию |
| :-------- | :--------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------: | :-------------------: |
| theme     | Внешний вид алерта.                                                                                        | `"normal"` `"info"` `"success"` `"warning"` `"danger"` `"utility"` `"clear"` |      `"normal"`       |
| view      | Включает или отключает цвет фона окна алерта.                                                              |                           `"filled"` `"outlined"`                            |      `"filled"`       |
| layout    | Используется для привлечения внимания пользователей к контенту, если задано свойство `actions` с кнопками. |                         `"vertical"` `"horizontal"`                          |     `"vertical"`      |
| corners   | Управляет оформлением углов (прямые или скругленные) для окна алерта.                                      |                            `"rounded"` `"square"`                            |      `"rounded"`      |
| title     | Заголовок алерта                                                                                           |                                   `string`                                   |                       |
| message   | Сообщение алерта                                                                                           |                                   `string`                                   |                       |
| onClose   | Функция обратного вызова, которая срабатывает, когда пользователь нажимает на кнопку закрытия алерта.      |                                  `Function`                                  |                       |
| actions   | Массив кнопок или пользовательских компонентов.                                                            |                      `React.ReactNode` `"AlertAction"`                       |                       |
| align     | Управляет вертикальным выравниванием содержимого внутри компонента `Alert`.                                |                           `"center"` `"baseline"`                            |     `"baseline"`      |
| style     | HTML-атрибут `style`.                                                                                      |                            `React.CSSProperties`                             |                       |
| className | Имя CSS-класса алерта.                                                                                     |                                   `string`                                   |                       |
| icon      | Переопределяет иконку по умолчанию.                                                                        |                              `React.ReactNode`                               |                       |
| qa        | HTML-атрибут `data-qa`, используется для тестирования.                                                     |                                   `string`                                   |                       |
