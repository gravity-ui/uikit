<!--GITHUB_BLOCK-->

# Sheet

<!--/GITHUB_BLOCK-->

```tsx
import {Sheet} from '@gravity-ui/uikit';
```

Компонент `Sheet` (шторка) предназначен для использования в мобильных интерфейсах в качестве информационного или интерактивного элемента. Благодаря поддержке внутренней прокрутки и динамического изменения размеров в него можно помещать контент любого объема.

На мобильных устройствах `Sheet` можно перемещать, потянув за его основную часть или область свайпа. Для закрытия нужно провести вниз, коснуться области вне `Sheet` или нажать `Escape`.

## Использование

```tsx
import React from 'react';
import {Button, Sheet} from '@gravity-ui/uikit';

const SheetExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>
      <Sheet open={open} onOpenChange={setOpen} title="Content Sheet">
        Content
      </Sheet>
    </React.Fragment>
  );
};
```

## Свойства

| Имя                         | Описание                                                                                                                                                                                                                                                                                                                                                                           |      Тип      | Значение по умолчанию |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------: | :-------------------: |
| allowHideOnContentScroll    | Включает возможность закрытия при свайпе вниз, если контент не прокручивается или прокручен до верха (`content Node.scrollTop === 0`).                                                                                                                                                                                                                                             |   `boolean`   |        `true`         |
| alwaysFullHeight            | Высота `Sheet` всегда будет максимальной                                                                                                                                                                                                                                                                                                                                           |   `boolean`   |      `undefined`      |
| className                   | HTML-атрибут `class`.                                                                                                                                                                                                                                                                                                                                                              |   `string`    |      `undefined`      |
| container                   | DOM-элемент, в который монтируется компонент через `Portal`.                                                                                                                                                                                                                                                                                                                       | `HTMLElement` |    `document.body`    |
| contentClassName            | HTML-атрибут `class` для контента шторки.                                                                                                                                                                                                                                                                                                                                          |   `string`    |      `undefined`      |
| defaultOpen                 | Открывает шторку при монтировании, если `open` не передан. Чтобы открыть закрытую шторку снова, управляйте ею через `open`.                                                                                                                                                                                                                                                        |   `boolean`   |        `false`        |
| disableEscapeKeyDown        | Отключает закрытие шторки по нажатию Escape.                                                                                                                                                                                                                                                                                                                                       |   `boolean`   |        `false`        |
| disableOutsideClick         | Отключает закрытие шторки по клику на подложку.                                                                                                                                                                                                                                                                                                                                    |   `boolean`   |        `false`        |
| disablePortal               | Отключает использование `Portal`                                                                                                                                                                                                                                                                                                                                                   |   `boolean`   |        `false`        |
| hideTopBar                  | Скрывает верхнюю панель с элементом для изменения размера.                                                                                                                                                                                                                                                                                                                         |   `boolean`   |                       |
| id                          | Идентификатор `Sheet`, используемый как хеш в URL. Необходимо задать разные значения `id`, если на странице несколько `Sheet`.                                                                                                                                                                                                                                                     |   `string`    |        `sheet`        |
| maxContentHeightCoefficient | Коэффициент, определающий максимальную высоту шторки относительно высоты окна (диапазон 0-1)                                                                                                                                                                                                                                                                                       |   `number`    |         `0.9`         |
| onOpenChange                | Обработчик `(open: boolean, event?: Event, reason?: SheetOpenChangeReason) => void`, как в [`Popup.onOpenChange`](../Popup/README-ru.md#properties).<br>При закрытии запрашивается `open=false` с причиной `escape-key`, `outside-press`, `swipe` или `navigation`. Управляемая шторка закрывается, когда родитель устанавливает `open` в `false`; неуправляемая закрывается сама. |  `function`   |      `undefined`      |
| onTransitionIn              | Вызывается в начале анимации открытия.                                                                                                                                                                                                                                                                                                                                             | `() => void`  |      `undefined`      |
| onTransitionInComplete      | Вызывается после завершения анимации открытия.                                                                                                                                                                                                                                                                                                                                     | `() => void`  |      `undefined`      |
| onTransitionOut             | Вызывается в начале анимации закрытия.                                                                                                                                                                                                                                                                                                                                             | `() => void`  |      `undefined`      |
| onTransitionOutComplete     | Вызывается после завершения закрытия, включая мгновенное закрытие свайпом на всю высоту шторки.                                                                                                                                                                                                                                                                                    | `() => void`  |      `undefined`      |
| open                        | Управляемое состояние открытия. Без него шторка закрывается сама, а `onOpenChange` только сообщает об изменении.                                                                                                                                                                                                                                                                   |   `boolean`   |      `undefined`      |
| swipeAreaClassName          | HTML-атрибут `class` для области свайпа.                                                                                                                                                                                                                                                                                                                                           |   `string`    |      `undefined`      |
| title                       | Заголовок окна `Sheet`.                                                                                                                                                                                                                                                                                                                                                            |   `string`    |      `undefined`      |

Касание, начатое на ручке перетаскивания — элементе с `draggable="true"` или ручке `@hello-pangea/dnd`, — остаётся перетаскиванию и не свайпает шторку.

## API CSS

| Имя                          | Описание                                                                                                                                                                                 |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--g-sheet-content-padding`  | Отступы контента. Значение по умолчанию автоматически включает `env(safe-area-inset-bottom)` снизу и `max(10px, env(safe-area-inset-left/right))` по бокам для поддержки безопасных зон. |
| `--g-sheet-background-color` | Цвет фона                                                                                                                                                                                |
