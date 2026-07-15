# Темизация

[English](theming.md) | [Русский](theming-ru.md)

Оберните приложение в `ThemeProvider`, чтобы включить темизацию. Поддерживаемые темы: `light`, `dark`, `light-hc`, `dark-hc`.

```jsx
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from '@gravity-ui/uikit';

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme="light">
    <App />
  </ThemeProvider>,
);
```
