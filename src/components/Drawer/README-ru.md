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

## Направление (`placement`)

Чтобы управлять направлением `Drawer`, вы можете передать свойство `placement` в компонент. Возможные значения: `left`, `right`, `top`, и `bottom`.

```tsx
<Drawer onOpenChange={setVisible} open={isVisible} placement="left">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} placement="right">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} placement="top">
  <p>Content of the drawer</p>
</Drawer>
<Drawer onOpenChange={setVisible} open={isVisible} placement="bottom">
  <p>Content of the drawer</p>
</Drawer>
```

## Изменяемый размер (`resizable`)

Компонент `Drawer` может быть изменяемым размером, передав свойство `resizable`.

```tsx
<Drawer onOpenChange={setVisible} open={isVisible} resizable>
  <p>Content of the drawer</p>
</Drawer>
```

Дополнительно, вы можете использовать свойство `size`, чтобы управлять размером `Drawer` и передать обработчик `onResize`, чтобы сохранить измененное значение.

```tsx
const [size, setSize] = useState(500);

<Drawer
  onOpenChange={setVisible}
  open={isVisible}
  resizable
  size={size}
  onResize={setSize}
>
  <p>Content of the drawer</p>
</Drawer>

## Свойства

| Имя                     | Описание                                                                                                     |                Тип                 | Значение по умолчанию |
| :---------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------: | :-------------------: |
| className               | Атрибут `class` для корневого элемента                                                                       |              `string`              |                       |
| qa                      | Атрибут для тестирования (`data-qa`)                                                                         |              `string`              |                       |
| style                   | Атрибут `style` для корневого элемента                                                                       |       `React.CSSProperties`        |                       |
| aria-label              | Атрибут `aria-label` для описания компонента Drawer                                                          |              `string`              |                       |
| aria-labelledby         | ID элемента с видимым заголовком для Drawer                                                                  |              `string`              |                       |
| aria-describedby        | Атрибут`aria-describedby` для описания компонента `Drawer`                                                   |              `string`              |                       |
| aria-details            | Атрибут `aria-details` для описания компонента `Drawer`                                                      |              `string`              |                       |
| returnFocus             | Element to be focused on closing                                                                             | `boolean` `React.Ref<HTMLElement>` |        `true`         |
| initialFocus            | Начальный элемент для установки фокуса. Положительное число является индексом кликабельного элемента         | `number` `React.Ref<HTMLElement>`  |                       |
| placement               | Сторона, откуда выезжает Drawer                                                                              |              `string`              |        `left`         |
| contentClassName        | Атрибут `class` для элемента с контентом                                                                     |              `string`              |                       |
| children                | React-контент                                                                                                |         `React.ReactNode`          |                       |
| container               | DOM-элемент, в который монтируется компонент через `Portal`                                                  |           `HTMLElement`            |    `document.body`    |
| disableBodyScrollLock   | Отключает блокировку скролла страницы при открытии                                                           |             `boolean`              |        `false`        |
| disableEscapeKeyDown    | Отключает закрытие по клавише `Esc`                                                                          |             `boolean`              |        `false`        |
| disableOutsideClick     | Отключает закрытие при клике снаружи                                                                         |             `boolean`              |        `false`        |
| disablePortal           | Отключает использование `Portal`                                                                             |             `boolean`              |        `false`        |
| keepMounted             | Не удаляет компонент из DOM при скрытии                                                                      |             `boolean`              |        `false`        |
| resizable               | Включает возможность изменения размера через курсор                                                          |             `boolean`              |        `false`        |
| open                    | Управляет видимостью компонента                                                                              |             `boolean`              |        `false`        |
| hideVeil                | Скрывает шторку компонента                                                                                   |             `boolean`              |        `false`        |
| onOpenChange            | Обработчик изменения состояния видимости                                                                     |             `Function`             |                       |
| onTransitionIn          | Обработчик начала анимации открытия                                                                          |             `Function`             |                       |
| onTransitionOut         | Обработчик начала анимации закрытия                                                                          |             `Function`             |                       |
| onTransitionInComplete  | Обработчик завершения анимации открытия                                                                      |             `Function`             |                       |
| onTransitionOutComplete | Обработчик завершения анимации закрытия                                                                      |             `Function`             |                       |
| onResizeEnd             | Обработчик завершения изменения размера                                                                      |             `Function`             |                       |
| onResize                | Обработчик изменения размера                                                                                 |             `Function`             |                       |
| onResizeStart           | Обработчик начала изменения размера                                                                          |             `Function`             |                       |
| maxSize                 | Максимальная ширина или высота контента в пикселях                                                           |              `number`              |                       |
| minSize                 | Минимальная ширина или высота контента в пикселях                                                            |              `number`              |                       |
| size                    | Ширина или высота контента в пикселях. Когда передано значение `auto`, Drawer подстроится под размер контента |         `number \| 'auto'`          |                       |
```
