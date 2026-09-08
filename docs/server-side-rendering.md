# Server-Side Rendering

[English](server-side-rendering.md) | [Русский](server-side-rendering-ru.md)

To prevent a theme flash on the initial page load, generate the root CSS class during SSR:

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
