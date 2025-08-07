<!--GITHUB_BLOCK-->

# Drawer

<!--/GITHUB_BLOCK-->

```tsx
import {Drawer} from '@gravity-ui/uikit';
```

`Drawer` - компонент, который позволяет отображать содержимое в виде боковой панели. Он может быть использован для отображения навигации, инструментов или дополнительного контента. Компонент реализован с помощью React и включает CSS-переходы для плавных анимаций.

## Использование

Ниже приводится простой пример использования компонента `Drawer`:

```tsx
import React from 'react';
import {Drawer} from '@gravity-ui/uikit';

const App = () => {
  const [isVisible, setVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Drawer</button>
      <Drawer onOpenChange={setVisible} open={isVisible}>
        <p>Content of the drawer</p>
      </Drawer>
    </div>
  );
};

export default App;
```

## Свойства

| Имя                   | Описание                                                                           |          Тип          | Значение по умолчанию |
| :-------------------- | :--------------------------------------------------------------------------------- | :-------------------: | :-------------------: |
| veilClassName         | Дополнительные классы для стилизации элемента затемнения (оверлея)                 |       `string`        |                       |
| className             | Атрибут `class` для корневого элемента                                             |       `string`        |                       |
| qa                    | Атрибут для тестирования (`data-qa`)                                               |       `string`        |                       |
| style                 | Атрибут `style` для корневого элемента                                             | `React.CSSProperties` |                       |
| aria-label            | Атрибут `aria-label` для описания компонента Drawer                                |       `string`        |                       |
| aria-labelledby       | ID элемента с видимым заголовком для Drawer                                        |       `string`        |                       |
| direction             | Направление, откуда выезжает Drawer                                                |       `string`        |        `left`         |
| contentClassName      | Атрибут `class` для элемента с контентом                                           |       `string`        |                       |
| restoreFocusRef       | Элемент, на который вернётся фокус после закрытия                                  |   `React.RefObject`   |                       |
| children              | React-контент                                                                      |   `React.ReactNode`   |                       |
| container             | DOM-элемент, в который монтируется компонент через `Portal`                        |     `HTMLElement`     |    `document.body`    |
| hideVeil              | Скрывает шторку с фоном                                                            |       `boolean`       |                       |
| autoFocus             | Устанавливает фокус на первый интерактивный элемент при открытии                   |       `boolean`       |        `true`         |
| focusTrap             | Включает захват фокуса внутри компонента                                           |       `boolean`       |        `true`         |
| disableBodyScrollLock | Отключает блокировку скролла страницы при открытии                                 |       `boolean`       |        `false`        |
| disableEscapeKeyDown  | Отключает закрытие по клавише `Esc`                                                |       `boolean`       |        `false`        |
| disableOutsideClick   | Отключает закрытие при клике снаружи                                               |       `boolean`       |        `false`        |
| disablePortal         | Отключает использование `Portal`                                                   |       `boolean`       |        `false`        |
| keepMounted           | Не удаляет компонент из DOM при скрытии                                            |       `boolean`       |        `false`        |
| resizable             | Включает возможность изменения размера через курсор                                |       `boolean`       |        `false`        |
| open                  | Управляет видимостью компонента                                                    |       `boolean`       |        `false`        |
| showInitialAnimation  | Включает анимацию при первом открытии, если Drawer рендерится в открытом состоянии |       `boolean`       |        `false`        |
| onOpenChange          | Обработчик, вызываемый при изменении состояния видимости                           |      `Function`       |                       |
| onTransitionEnter     | Обработчик начала анимации открытия                                                |      `Function`       |                       |
| onTransitionExit      | Обработчик начала анимации закрытия                                                |      `Function`       |                       |
| onTransitionEntered   | Обработчик завершения анимации открытия                                            |      `Function`       |                       |
| onTransitionExited    | Обработчик завершения анимации закрытия                                            |      `Function`       |                       |
| onResizeEnd           | Колбэк, вызываемый по окончании изменения размера                                  |      `Function`       |                       |
| onResize              | Колбэк, вызываемый во время изменения размера                                      |      `Function`       |                       |
| onResizeStart         | Колбэк, вызываемый в начале изменения размера                                      |      `Function`       |                       |
| maxSize               | Максимальная ширина контента в пикселях                                            |       `number`        |                       |
| minSize               | Минимальная ширина контента в пикселях                                             |       `number`        |                       |
| size                  | Ширина контента в пикселях                                                         |       `number`        |                       |

## CSS API

| Имя                                          | Описание                                      |          Значение по умолчанию          |
| :------------------------------------------- | :-------------------------------------------- | :-------------------------------------: |
| Контент                                      |                                               |                                         |
| `--g-drawer-item-position`                   | Позиция контента внутри Drawer на странице    |                 `fixed`                 |
| `--g-drawer-item-shadow`                     | box-shadow у контента, когда шторка скрыта    | `0 1px 5px 0 var(--g-color-sfx-shadow)` |
| `--g-drawer-item-left-offset`                | Отступ слева у контента                       |                   `0`                   |
| `--g-drawer-item-top-offset`                 | Отступ сверху у контента                      |                   `0`                   |
| Шторка                                       |                                               |                                         |
| `--g-drawer-veil-background-color`           | Цвет фона шторки                              |          `--g-color-sfx-veil`           |
| Ресайзер                                     |                                               |                                         |
| `--g-drawer-item-resizer-width`              | Ширина ресайзера                              |                   8px                   |
| `--g-drawer-item-resizer-color`              | Цвет ресайзера                                |        `--g-color-base-generic`         |
| `--g-drawer-item-resizer-handle-color`       | Цвет контрола ресайзера                       |        `--g-color-line-generic`         |
| `--g-drawer-item-resizer-handle-color-hover` | Цвет контрола ресайзера при наведении курсора |     `--g-color-line-generic-hover`      |
| `--g-drawer-item-resizer-z-index`            | z-index ресайзера                             |                   100                   |
| `--g-drawer-veil-z-index`                    | z-index шторки                                |                `"auto"`                 |
| `--g-drawer-item-z-index`                    | z-index контента                              |                   110                   |
