[readme](#readme)

## Dialog

`Dialog` — компонент, используемый для диалоговых окон.

### Свойства

| Имя                   | Тип                                                                                            | Обязательное | Значение по умолчанию | Описание                                                                                                                |
| :-------------------- | :--------------------------------------------------------------------------------------------- | :----------: | :-------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| open                  | `Boolean`                                                                                      |      ✓       |                       | Текущее состояние диалога.                                                                                              |
| onEscapeKeyDown       | `(event: KeyboardEvent) => void`                                                               |              |                       | Обработчик события нажатия на клавишу Esc.                                                                              |
| onEnterKeyDown        | `(event: KeyboardEvent) => void`                                                               |              |                       | Обработчик события нажатия на клавишу Enter.                                                                            |
| onOutsideClick        | `(event: MouseEvent) => void`                                                                  |              |                       | Обработчик события клика вне диалога.                                                                                   |
| onClose               | `(event: MouseEvent or KeyboardEvent, reason: LayerCloseReason or "closeButtonClick") => void` |      ✓       |                       | Обработчик события закрытия диалога.                                                                                    |
| className             | `String`                                                                                       |              |                       | `ClassName` обертки содержимого диалога.                                                                                |
| modalClassName        | `String`                                                                                       |              |                       | `ClassName` модального окна, в которое вложен диалог.                                                                   |
| size                  | `s` `m` `l`                                                                                    |              |                       | Размер диалога.                                                                                                         |
| disableBodyScrollLock | `Boolean`                                                                                      |              | `False`               | Включает или отключает блокировку прокрутки основного содержимого страницы.                                             |
| disableEscapeKeyDown  | `Boolean`                                                                                      |              | `False`               | Включает или отключает возможность использования клавиши Esc.                                                           |
| disableOutsideClick   | `Boolean`                                                                                      |              | `False`               | Включает или отключает блокировку кликов вне элемента.                                                                  |
| disableFocusTrap      | `Boolean`                                                                                      |              |                       | Если установлено значение `true`, фокус можно перемещать за пределы модального окна.                                    |
| disableAutoFocus      | `Boolean`                                                                                      |              |                       | Если установлено значение `true`, при открытии модального окна фокус не будет автоматически перемещаться на него.       |
| onTransitionEnter     | `() => void`                                                                                   |              |                       | Обработчик события, вызываемый, когда начинается анимация открытия диалога.                                             |
| onTransitionEntered   | `() => void`                                                                                   |              |                       | Обработчик события, вызываемый по завершении анимации открытия диалога.                                                 |
| onTransitionExit      | `() => void`                                                                                   |              |                       | Обработчик события, вызываемый, когда начинается анимация закрытия диалога.                                             |
| onTransitionExited    | `() => void`                                                                                   |              |                       | Обработчик события, вызываемый по завершении анимации закрытия диалога.                                                 |
| restoreFocusRef       | `React.RefObject`                                                                              |              |                       | Элемент, получающий фокус при закрытии диалога.                                                                         |
| keepMounted           | `Boolean`                                                                                      |              | `False`               | Определяет, остается ли диалог смонтированным при закрытии.                                                             |
| hasCloseButton        | `Boolean`                                                                                      |              | `True`                | Включает или отключает иконку крестика в правом верхнем углу диалога.                                                   |
| aria-labelledby       | `String`                                                                                       |              |                       | Идентификатор заголовка для <Dialog/>. Установите его с помощью свойства `id` элемента `<Dialog.Header/>`.              |
| aria-label            | `String`                                                                                       |              |                       | Лейбл диалога для обеспечения доступности (a11y). Укажите `aria-labelledby`, если заголовок диалога виден пользователю. |
| container             | `HTMLElement`                                                                                  |              |                       | Элемент-контейнер для диалогового окна.                                                                                 |
| qa                    | `String`                                                                                       |              |                       | Значение атрибута `data-qa` модального окна, в которое вложен диалог.                                                   |
| contentOverflow       | `visible` `auto`                                                                               |              | `visible`             | Определяет, имеет ли `Dialog` внутреннюю полосу прокрутки или увеличивается в размерах вместе с содержимым.             |

### Примеры

```js
const [open, setOpen] = useState(false);
const dialogTitleId = 'app-confirmation-dialog-title';

<Dialog
  onClose={() => setOpen(false)}
  open={open}
  onEnterKeyDown={() => {
    alert('onEnterKeyDown');
  }}
  aria-labelledby={dialogTitleId}
>
  <Dialog.Header caption="Caption" id={dialogTitleId} />
  <Dialog.Body>Dialog.Body</Dialog.Body>
  <Dialog.Footer
    onClickButtonCancel={() => setOpen(false)}
    onClickButtonApply={() => alert('onApply')}
    textButtonApply="Apply"
    textButtonCancel="Cancel"
  />
</Dialog>;
```
