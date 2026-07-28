# Серверный рендеринг (SSR)

[English](server-side-rendering.md) | [Русский](server-side-rendering-ru.md)

Чтобы избежать «мигания» темы при первой загрузке страницы, сгенерируйте корневой CSS-класс на этапе SSR:

```js
import {getRootClassName} from '@gravity-ui/uikit/server';

const theme = 'dark';
const rootClassName = getRootClassName({theme});

const html = `
<html>
  <body>
    <div id="root" class="${rootClassName}"></div>
  </body>
</html>
`;
```
