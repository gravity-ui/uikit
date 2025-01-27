<!--GITHUB_BLOCK-->

# Popover

<!--/GITHUB_BLOCK-->

```tsx
import {Popover} from '@gravity-ui/uikit';
```

Компонент `Popover` позволяет добавить раздел с всплывающим содержимым.

### Стандартное использование

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover content="Tooltip">Open a tooltip</Popover>
`}
>
    <UIKit.Popover content="Tooltip">Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover content="Tooltip">Open a tooltip</Popover>
```

<!--/GITHUB_BLOCK-->

### С JSX-контентом

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover content={<Loader size="s" />}>Open a tooltip</Popover>
`}
>
    <UIKit.Popover content={<UIKit.Loader size="s" />}>Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover content={<Loader size="s" />}>Open a tooltip</Popover>
```

<!--/GITHUB_BLOCK-->

### С HTML-контентом

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover
  htmlContent={
    'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>'
  }
>
  Open a tooltip
</Popover>
`}
>
    <UIKit.Popover
      htmlContent={
        'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>'
      }
    >Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  htmlContent={
    'Tooltip\'s <b>html</b> content. Learn more <a href="https://example.com" target="_blank">here</a>'
  }
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

### Со ссылками

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover
  links={[
    {
      text: 'Link with a href',
      href: 'https://ya.ru',
    },
    {
      text: 'Link with an onClick handler',
      onClick: () => alert('The link is clicked'),
    },
  ]}
>
  Open a tooltip
</Popover>
`}
>
    <UIKit.Popover
      links={[{text: 'Link with a href', href: 'https://ya.ru',},{text: 'Link with an onClick handler', onClick: () => alert('The link is clicked'),},]}
    >Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  links={[
    {
      text: 'Link with a href',
      href: 'https://ya.ru',
    },
    {
      text: 'Link with an onClick handler',
      onClick: () => alert('The link is clicked'),
    },
  ]}
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

### С кнопкой действия

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover
  tooltipActionButton={{
    text: 'Action',
    onClick: () => console.log('Action button was clicked'),
  }}
>
  Open a tooltip
</Popover>
`}
>
    <UIKit.Popover
      tooltipActionButton={{
        text: 'Action',
        onClick: () => console.log('Action button was clicked'),
      }}
    >Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  tooltipActionButton={{
    text: 'Action',
    onClick: () => console.log('Action button was clicked'),
  }}
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

### С автоматическим закрытием, когда курсор находится вне области в течение `delayClosing`

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Popover delayClosing={500}>Open a tooltip</Popover>
`}
>
    <UIKit.Popover delayClosing={500}>Open a tooltip</UIKit.Popover>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Popover
  tooltipActionButton={{
    text: 'Action',
    onClick: () => console.log('Action button was clicked'),
  }}
>
  Open a tooltip
</Popover>
```

<!--/GITHUB_BLOCK-->

## Использование экземпляра

```tsx
import {Popover, PopoverInstanceProps} from '@gravity-ui/uikit';

const popoverRef = useRef<PopoverInstanceProps>();

const open = () => {
  popoverRef.current?.openTooltip();
};

const close = () => {
  popoverRef.current?.closeTooltip();
};

<>
  <Popover content="Tooltip" ref={popoverRef} />
  <button onClick={open}>Open a tooltip</button>
  <button onClick={close}>Close a tooltip</button>
</>;
```

### Свойства экземпляра

| Имя          | Описание                       |    Тип     | Значение по умолчанию |
| ------------ | ------------------------------ | :--------: | :-------------------: |
| openTooltip  | Открывает тултип `() => void`. | `Function` |                       |
| closeTooltip | Закрывает тултип `() => void`. | `Function` |                       |

## Свойства

| Имя                     | Описание                                                                                                                                                                                                                                                                                                                       |                       Тип                        | Значение по умолчанию |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------: | :-------------------: |
| anchorRef               | Элемент-якорь, который также может быть `VirtualElement`.                                                                                                                                                                                                                                                                      |  [`PopupAnchorRef`](../Popup/README.md#anchor)   |                       |
| autoclosable            | Включает или отключает автоматическое закрытие тултипа при выходе курсора за его пределы.                                                                                                                                                                                                                                      |                    `boolean`                     |        `true`         |
| autoFocus               | Если установлено значение `true`, фокус будет перемещен на первый элемент при открытии компонента `Popover`.                                                                                                                                                                                                                   |                    `boolean`                     |                       |
| behavior                | Поведение тултипа при его открытии или закрытии с использованием `openOnHover`: `"immediate"` — без каких-либо задержек, `"delayed"` — с задержкой 300 мс при открытии и закрытии, `"delayedClosing"` — с задержкой 300 мс только при закрытии. Это свойство не будет работать, если заданы `delayOpening` или `delayClosing`. |   `"immediate"` `"delayed"` `"delayedClosing"`   |      `"delayed"`      |
| children                | Контент, который служит триггером для отображаемого над ним тултипа. Может принимать значения функции `(triggerProps: `[`TriggerProps`](#triggerprops))` => React.ReactNode` или `ReactNode`.                                                                                                                                  |           `React.ReactNode` `Function`           |                       |
| className               | CSS-класс контрола.                                                                                                                                                                                                                                                                                                            |                     `string`                     |                       |
| content                 | Содержимое тултипа.                                                                                                                                                                                                                                                                                                            |                `React.ReactNode`                 |                       |
| contentClassName        | CSS-класс для `content`.                                                                                                                                                                                                                                                                                                       |                     `string`                     |                       |
| delayClosing            | Пользовательская задержка закрытия, если задано свойство `autoclosable`.                                                                                                                                                                                                                                                       |                     `number`                     |                       |
| delayOpening            | Пользовательская задержка открытия, если задано свойство `openOnHover`.                                                                                                                                                                                                                                                        |                     `number`                     |                       |
| disabled                | Отключает возможность изменения состояния открытия.                                                                                                                                                                                                                                                                            |                    `boolean`                     |        `false`        |
| disablePortal           | Отключает рендеринг компонента `Popover` в портале.                                                                                                                                                                                                                                                                            |                    `boolean`                     |        `false`        |
| focusTrap               | Не допускает выхода фокуса за пределы `Popover`, пока он открыт.                                                                                                                                                                                                                                                               |                    `boolean`                     |                       |
| forceLinksAppearance    | Принудительно применяет стили к ссылкам.                                                                                                                                                                                                                                                                                       |                    `boolean`                     |        `false`        |
| hasArrow                | Включает или отключает стрелку тултипа.                                                                                                                                                                                                                                                                                        |                    `boolean`                     |        `true`         |
| hasClose                | Включает или отключает кнопку закрытия тултипа.                                                                                                                                                                                                                                                                                |                    `boolean`                     |        `false`        |
| htmlContent             | HTML-содержимое тултипа, которое будет отрисовано с помощью `dangerouslySetInnerHTML`.                                                                                                                                                                                                                                         |                     `string`                     |                       |
| initialOpen             | Включает или отключает автоматическое открытие тултипа при загрузке.                                                                                                                                                                                                                                                           |                    `boolean`                     |        `false`        |
| links                   | Ссылки под содержимым.                                                                                                                                                                                                                                                                                                         |         `[`[`LinkProps`](#linksprops)`]`         |                       |
| offset                  | Смещение контрола.                                                                                                                                                                                                                                                                                                             |          `{top: number, left: number}`           |                       |
| onClick                 | Обратный вызов при клике по элементу-якорю — `(event: React.MouseEvent) => boolean \| Promise`. Если функция возвращает `true`, тултип откроется; в противном случае — нет.                                                                                                                                                    |                    `Function`                    |                       |
| onCloseClick            | Обработчик клика по кнопке закрытия — `(event: React.MouseEvent) => void`.                                                                                                                                                                                                                                                     |                    `Function`                    |                       |
| onOpenChange            | Обработчик изменения состояния открытия — `(open: boolean) => void`. Может использоваться для задержки рендеринга содержимого тултипа.                                                                                                                                                                                         |                    `Function`                    |                       |
| openOnHover             | Включает или отключает открытие тултипа по ховеру.                                                                                                                                                                                                                                                                             |                    `boolean`                     |        `true`         |
| placement               | Размещение `Floating UI`.                                                                                                                                                                                                                                                                                                      | [`PopupPlacement`](../Popup/README.md#placement) | `["right", "bottom"]` |
| qa                      | HTML-атрибут `data-qa`, используется для тестирования.                                                                                                                                                                                                                                                                         |                     `string`                     |                       |
| restoreFocusRef         | Элемент, на который возвращается фокус при закрытии `Popover`.                                                                                                                                                                                                                                                                 |                `React.RefObject`                 |                       |
| size                    | Размер тултипа.                                                                                                                                                                                                                                                                                                                |                   `"s"` `"l"`                    |         `"s"`         |
| strategy                | [Стратегия](https://floating-ui.com/docs/computePosition#strategy) позиционирования `Floating UI`.                                                                                                                                                                                                                             |              `"absolute"` `"fixed"`              |     `"absolute"`      |
| title                   | Заголовок тултипа.                                                                                                                                                                                                                                                                                                             |                     `string`                     |                       |
| theme                   | Тема тултипа.                                                                                                                                                                                                                                                                                                                  |      `"info"` `"special"` `"announcement"`       |       `"info"`        |
| tooltipActionButton     | Свойства кнопки действия. Кнопка не будет отрисована, если не задать это свойство.                                                                                                                                                                                                                                             |   [`PopoverButtonProps`](#popoverbuttonprops)    |                       |
| tooltipCancelButton     | Свойства кнопки отмены. Кнопка не будет отрисована, если не задать это свойство.                                                                                                                                                                                                                                               |   [`PopoverButtonProps`](#popoverbuttonprops)    |                       |
| tooltipClassName        | CSS-класс тултипа.                                                                                                                                                                                                                                                                                                             |                     `string`                     |                       |
| tooltipContentClassName | CSS-класс содержимого тултипа.                                                                                                                                                                                                                                                                                                 |                     `string`                     |                       |
| tooltipOffset           | Смещение тултипа относительно контрола.                                                                                                                                                                                                                                                                                        |                `[number, number]`                |                       |
| tooltipId               | HTML-атрибут `id` для компонента `Popover`.                                                                                                                                                                                                                                                                                    |                     `string`                     |                       |

### TriggerProps

| Имя       | Описание                       |             Тип              | Значение по умолчанию |
| --------- | ------------------------------ | :--------------------------: | :-------------------: |
| onClick   | Обработчик события клика.      |  `React.MouseEventHandler`   |                       |
| onKeyDown | Обработчик события клавиатуры. | `React.KeyboardEventHandler` |                       |

### LinkProps

| Имя     | Описание                                                                           |         Тип          | Значение по умолчанию |
| ------- | ---------------------------------------------------------------------------------- | :------------------: | :-------------------: |
| text    | Текст ссылки.                                                                      |       `string`       |                       |
| href    | Атрибут ссылки `href`.                                                             |       `string`       |                       |
| target  | Определяет, где откроется ссылка.                                                  | `"_self"` `"_blank"` |                       |
| onClick | Обработчик события клика — `(event: React.MouseEvent<HTMLAnchorElement>) => void`. |      `Function`      |                       |

### PopoverButtonProps

| Имя     | Описание                                                        |    Тип     | Значение по умолчанию |
| ------- | --------------------------------------------------------------- | :--------: | :-------------------: |
| text    | Текст на кнопке.                                                |  `string`  |                       |
| onClick | Обработчик события клика — `(event: React.MouseEvent) => void`. | `Function` |                       |

| Имя                     | Описание                      |
| :---------------------- | :---------------------------- |
| `--g-popover-padding`   | Отступы контента.             |
| `--g-popover-max-width` | Максимальная ширина контента. |
