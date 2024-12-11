<!--GITHUB_BLOCK-->

# Portal

<!--/GITHUB_BLOCK-->

```tsx
import {Portal} from '@gravity-ui/uikit';
```

`Portal` — утилитный компонент, который представляет собой простую обертку для [`createPortal`](https://react.dev/reference/react-dom/createPortal) в React и позволяет рендерить дочерние элементы в DOM-узле за пределами родительского компонента.

## Контейнер

По умолчанию `Portal` рендерит дочерние элементы в `document.body`. Это можно поменять в свойстве `container`.
Кроме того, можно задать контейнер для всех порталов в поддереве React с помощью компонента `PortalProvder`.

```tsx
import {Portal, PortalProvider} from '@gravity-ui/uikit'

const myRoot = document.getElementById('my-root');

<Portal>This is rendered inside document.body</Portal>
<Portal container={myRoot}>This is rendered inside #my-root node</Portal>
<PortalProvider container={myRoot}>
    <Portal>This is also rendered inside #my-root</Portal>
</PortalProvider>
```

## Свойства

| Имя           | Описание                                                                                          |        Тип        | Значение по умолчанию |
| :------------ | :------------------------------------------------------------------------------------------------ | :---------------: | :-------------------: |
| children      | Любое содержимое React.                                                                           | `React.ReactNode` |                       |
| container     | DOM-элемент, в который монтируются дочерние элементы.                                             |   `HTMLElement`   |    `document.body`    |
| disablePortal | Если установлено значение `true`, дочерние элементы будут рендериться в стандартной иерархии DOM. |     `boolean`     |                       |
