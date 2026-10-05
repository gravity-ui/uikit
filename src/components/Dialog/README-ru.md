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

<Dialog onOpenChange={setOpen} open={open} aria-labelledby={dialogTitleId}>
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

| Имя                   | Описание                                                                                                                | Тип                                                                 | Значение по умолчанию |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ | :-------------------- |
| open                  | Текущее состояние диалога.                                                                                              | `boolean`                                                           |                       |
| onOpenChange          | Обработчик изменения состояния диалога.                                                                                 | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` |                       |
| initialFocus          | Элемент, получающий фокус при открытии, включая кнопки футера `cancel` и `apply`.                                       | `ModalProps['initialFocus'] \| 'cancel' \| 'apply'`                 |                       |
| returnFocus           | Управляет возвратом фокуса после закрытия.                                                                              | `ModalProps['returnFocus']`                                         |                       |
| className             | `className` обертки содержимого диалога.                                                                                | `string`                                                            |                       |
| modalClassName        | `className` модального окна, в которое вложен диалог.                                                                   | `string`                                                            |                       |
| maxWidth              | Максимальная ширина диалога                                                                                             | `'s'` `'m'` `'l'`                                                   |                       |
| fullWidth             | Если `true` диалог тянется до `maxWidth`                                                                                | `boolean`                                                           | `false`               |
| disableTransition     | Отключает анимации открытия и закрытия при `true`.                                                                      | `boolean`                                                           | `false`               |
| disableBodyScrollLock | Включает или отключает блокировку прокрутки основного содержимого страницы.                                             | `boolean`                                                           | `false`               |
| disableEscapeKeyDown  | Включает или отключает возможность использования клавиши Esc.                                                           | `boolean`                                                           | `false`               |
| disableOutsideClick   | Включает или отключает блокировку кликов вне элемента.                                                                  | `boolean`                                                           | `false`               |
| keepMounted           | Определяет, остается ли диалог смонтированным при закрытии.                                                             | `boolean`                                                           | `false`               |
| hasCloseButton        | Включает или отключает иконку крестика в правом верхнем углу диалога.                                                   | `boolean`                                                           | `true`                |
| aria-labelledby       | Идентификатор заголовка для `<Dialog/>`. Установите его с помощью свойства `id` элемента `<Dialog.Header/>`.            | `string`                                                            |                       |
| aria-label            | Лейбл диалога для обеспечения доступности (a11y). Укажите `aria-labelledby`, если заголовок диалога виден пользователю. | `string`                                                            |                       |
| container             | Элемент-контейнер для диалогового окна.                                                                                 | `HTMLElement`                                                       |                       |
| qa                    | Значение атрибута `data-qa` модального окна, в которое вложен диалог.                                                   | `string`                                                            |                       |
| contentOverflow       | Определяет, имеет ли `Dialog` внутреннюю полосу прокрутки или увеличивается в размерах вместе с содержимым.             | `'visible'` `'auto'`                                                | `'visible'`           |

`onOpenChange` передаёт причину `escape-key` для Escape, `outside-press` для клика вне диалога, `click` для кнопки закрытия и `undefined` для скрытой кнопки закрытия скринридера. Закрывайте диалог при `open === false` независимо от причины.
