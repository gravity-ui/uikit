<!--GITHUB_BLOCK-->

# Sheet

<!--/GITHUB_BLOCK-->

```tsx
import {Sheet} from '@gravity-ui/uikit';
```

Компонент `Sheet` (шторка) предназначен для использования в мобильных интерфейсах в качестве информационного или интерактивного элемента. Благодаря поддержке внутренней прокрутки и динамического изменения размеров в него можно помещать контент любого объема.

На мобильных устройствах `Sheet` можно перемещать, потянув за его основную часть или область свайпа. Для закрытия нужно провести вниз или коснуться области вне `Sheet`.

## Использование

```tsx
import React from 'react';
import {Button, Sheet} from '@gravity-ui/uikit';

const SheetExample = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Open Sheet</Button>
      <Sheet visible={visible} onClose={() => setVisible(false)} title="Content Sheet">
        Content
      </Sheet>
    </React.Fragment>
  );
};
```

## Свойства

| Имя                         | Описание                                                                                                                               |      Тип      | Значение по умолчанию |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :-----------: | :-------------------: |
| allowHideOnContentScroll    | Включает возможность закрытия при свайпе вниз, если контент не прокручивается или прокручен до верха (`content Node.scrollTop === 0`). |   `boolean`   |        `true`         |
| alwaysFullHeight            | Высота `Sheet` всегда будет максимальной                                                                                               |   `boolean`   |      `undefined`      |
| className                   | HTML-атрибут `class`.                                                                                                                  |   `string`    |      `undefined`      |
| container                   | DOM-элемент, в который монтируется компонент через `Portal`.                                                                           | `HTMLElement` |    `document.body`    |
| contentClassName            | HTML-атрибут `class` для контента шторки.                                                                                              |   `string`    |      `undefined`      |
| disablePortal               | Отключает использование `Portal`                                                                                                       |   `boolean`   |        `false`        |
| hideTopBar                  | Скрывает верхнюю панель с элементом для изменения размера.                                                                             |   `boolean`   |                       |
| id                          | Идентификатор `Sheet`, используемый как хеш в URL. Необходимо задать разные значения `id`, если на странице несколько `Sheet`.         |   `string`    |        `modal`        |
| maxContentHeightCoefficient | Коэффициент, определающий максимальную высоту шторки относительно высоты окна (диапазон 0-1)                                           |   `number`    |         `0.9`         |
| onClose                     | Обработчик события закрытия.                                                                                                           |  `function`   |      `undefined`      |
| swipeAreaClassName          | HTML-атрибут `class` для области свайпа.                                                                                               |   `string`    |      `undefined`      |
| title                       | Заголовок окна `Sheet`.                                                                                                                |   `string`    |      `undefined`      |
| visible                     | Управляет видимостью `Sheet`.                                                                                                          |   `boolean`   |        `false`        |

## API CSS

| Имя                          | Описание         |
| :--------------------------- | :--------------- |
| `--g-sheet-content-padding`  | Отступы контента |
| `--g-sheet-background-color` | Цвет фона        |
