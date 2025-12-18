<!--GITHUB_BLOCK-->

# Dialog

<!--/GITHUB_BLOCK-->

```tsx
import {Dialog} from '@gravity-ui/uikit';
```

`Dialog` — компонент, используемый для диалоговых окон.

## Использование

```tsx
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

## Свойства

| Имя                   | Описание                                                                                                                | Тип                                                                                            | Значение по умолчанию |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :-------------------- |
| open                  | Текущее состояние диалога.                                                                                              | `Boolean`                                                                                      |                       |
| onEscapeKeyDown       | Обработчик события нажатия на клавишу Esc.                                                                              | `(event: KeyboardEvent) => void`                                                               |                       |
| onEnterKeyDown        | Обработчик события нажатия на клавишу Enter.                                                                            | `(event: KeyboardEvent) => void`                                                               |                       |
| onOutsideClick        | Обработчик события клика вне диалога.                                                                                   | `(event: MouseEvent) => void`                                                                  |                       |
| onClose               | Обработчик события закрытия диалога.                                                                                    | `(event: MouseEvent or KeyboardEvent, reason: LayerCloseReason or "closeButtonClick") => void` |                       |
| className             | `className` обертки содержимого диалога.                                                                                | `String`                                                                                       |                       |
| modalClassName        | `className` модального окна, в которое вложен диалог.                                                                   | `String`                                                                                       |                       |
| size                  | Размер диалога.                                                                                                         | `s` `m` `l`                                                                                    |                       |
| disableBodyScrollLock | Включает или отключает блокировку прокрутки основного содержимого страницы.                                             | `Boolean`                                                                                      | `False`               |
| disableEscapeKeyDown  | Включает или отключает возможность использования клавиши Esc.                                                           | `Boolean`                                                                                      | `False`               |
| disableOutsideClick   | Включает или отключает блокировку кликов вне элемента.                                                                  | `Boolean`                                                                                      | `False`               |
| keepMounted           | Определяет, остается ли диалог смонтированным при закрытии.                                                             | `Boolean`                                                                                      | `False`               |
| hasCloseButton        | Включает или отключает иконку крестика в правом верхнем углу диалога.                                                   | `Boolean`                                                                                      | `True`                |
| aria-labelledby       | Идентификатор заголовка для `<Dialog/>`. Установите его с помощью свойства `id` элемента `<Dialog.Header/>`.            | `String`                                                                                       |                       |
| aria-label            | Лейбл диалога для обеспечения доступности (a11y). Укажите `aria-labelledby`, если заголовок диалога виден пользователю. | `String`                                                                                       |                       |
| container             | Элемент-контейнер для диалогового окна.                                                                                 | `HTMLElement`                                                                                  |                       |
| qa                    | Значение атрибута `data-qa` модального окна, в которое вложен диалог.                                                   | `String`                                                                                       |                       |
| contentOverflow       | Определяет, имеет ли `Dialog` внутреннюю полосу прокрутки или увеличивается в размерах вместе с содержимым.             | `visible` `auto`                                                                               | `visible`             |
