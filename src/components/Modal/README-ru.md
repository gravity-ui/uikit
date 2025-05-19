<!--GITHUB_BLOCK-->

# Modal

<!--/GITHUB_BLOCK-->

```tsx
import {Modal} from '@gravity-ui/uikit';
```

Компонент `Modal` (модальное окно) используется для создания всплывающих окон, которые перекрывают основной контент страницы.
При открытии модального окна прокрутка страницы отключается, а фокус автоматически переводится на его содержимое. Дочерние компоненты `Modal` рендерятся внутри компонента [`Portal`](../Portal).
С `Modal` можно создавать диалоги, алерты, подтверждения и другие элементы.

## Использование

```tsx
import {useState} from 'react';
import {Button, Modal} from '@gravity-ui/uikit';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal open={open} onClose={() => setOpen(false)}>
    Content
</Modal>
```

## Свойства

| Имя                   | Описание                                                                                                   |        Тип        | Значение по умолчанию |
| :-------------------- | :--------------------------------------------------------------------------------------------------------- | :---------------: | :-------------------: |
| autoFocus             | В открытом состоянии фокус будет установлен на первый интерактивный элемент в содержимом.                  |     `boolean`     |        `true`         |
| children              | Любое содержимое React.                                                                                    | `React.ReactNode` |                       |
| className             | HTML-атрибут `class` для корневого узла.                                                                   |     `string`      |                       |
| container             | DOM-элемент, в который монтируется компонент через `Portal`.                                               |   `HTMLElement`   |    `document.body`    |
| contentClassName      | Атрибут `class` в HTML для узла с содержимым.                                                              |     `string`      |                       |
| disableBodyScrollLock | Отключает блокировку прокрутки, пока модальное окно открыто.                                               |     `boolean`     |        `false`        |
| disableEscapeKeyDown  | Отключает закрытие при нажатии на клавишу `Esc`.                                                           |     `boolean`     |        `false`        |
| disableOutsideClick   | Отключает закрытие элемента по клику вне его области.                                                      |     `boolean`     |        `false`        |
| disablePortal         | Отключает использование `Portal`                                                                           |     `boolean`     |        `false`        |
| focusTrap             | Включает фиксацию фокуса внутри элемента.                                                                  |     `boolean`     |        `true`         |
| keepMounted           | Компонент `Modal` не будет удален из DOM при скрытии.                                                      |     `boolean`     |        `false`        |
| onClose               | Обработчик события закрытия `Modal`.                                                                       |    `Function`     |                       |
| onEnterKeyDown        | Обработчик события нажатия на клавишу `Enter`.                                                             |    `Function`     |                       |
| onEscapeKeyDown       | Обработчик события нажатия на клавишу `Esc`.                                                               |    `Function`     |                       |
| onTransitionEnter     | Обработчик начала анимации открытия.                                                                       |    `Function`     |                       |
| onTransitionExit      | Обработчик начала анимации закрытия.                                                                       |    `Function`     |                       |
| onTransitionEntered   | Обработчик завершения анимации открытия.                                                                   |    `Function`     |                       |
| onTransitionExited    | Обработчик завершения анимации закрытия.                                                                   |    `Function`     |                       |
| onOutsideClick        | Обработчик события клика вне элемента.                                                                     |    `Function`     |                       |
| open                  | Управляет видимостью `Modal`.                                                                              |     `boolean`     |        `false`        |
| qa                    | Атрибут для тестирования (`data-qa`).                                                                      |     `string`      |                       |
| restoreFocusRef       | Элемент, на который вернется фокус.                                                                        | `React.RefObject` |                       |
| style                 | HTML-атрибут `style` для корневого узла.                                                                   |     `string`      |                       |
| aria-label            | HTML-атрибут `aria-label` для описания `Modal`.                                                            |     `string`      |                       |
| aria-labelledby       | Идентификатор видимого элемента заголовка в `Modal`.                                                       |     `string`      |                       |
| contentOverflow       | Определяет, имеет ли `Modal` внутреннюю полосу прокрутки или увеличивается в размерах вместе с содержимым. | `visible` `auto`  |       `visible`       |

## API CSS

| Имя                       | Описание                                               |
| :------------------------ | :----------------------------------------------------- |
| `--g-modal-margin`        | Отступ вокруг содержимого `Modal`.                     |
| `--g-modal-border-radius` | Радиус скругления углов элемента с содержимым `Modal`. |
