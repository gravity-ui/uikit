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

## Значения свойств компонентов по умолчанию

Используйте `ThemeProvider.defaultProps`, чтобы задать общие значения свойств компонентов UIKit:

```tsx
import type {ComponentDefaultPropsMap} from '@gravity-ui/uikit';
import {Button, ThemeProvider} from '@gravity-ui/uikit';

const defaultProps = {
  Button: {size: 'l', view: 'outlined'},
} satisfies ComponentDefaultPropsMap;

<ThemeProvider defaultProps={defaultProps}>
  <Button>Большая контурная кнопка</Button>
</ThemeProvider>;
```

`DefaultPropsProvider` позволяет переопределить значения для части дерева без создания ещё одной
области темы:

```tsx
import type {ComponentDefaultPropsMap} from '@gravity-ui/uikit';
import {Button, DefaultPropsProvider} from '@gravity-ui/uikit';

const actionButtonDefaults = {
  Button: {view: 'action'},
} satisfies ComponentDefaultPropsMap;

<DefaultPropsProvider defaultProps={actionButtonDefaults}>
  <Button>Акцентная кнопка</Button>
</DefaultPropsProvider>;
```

Явно переданные компоненту свойства имеют наивысший приоритет. Свойство со значением `undefined`
не переопределяет значение по умолчанию. Вложенный провайдер наследует настройки других
компонентов, но целиком заменяет настройки совпавшего компонента. Например, внутреннее значение
`Button: {view: 'action'}` заменит и `view`, и `size` из внешнего значения
`Button: {view: 'outlined', size: 'l'}`. Сброс всех унаследованных значений для части дерева пока
не поддерживается.

Ссылка на объект `defaultProps` должна оставаться стабильной: объявите его вне render или
используйте `React.useMemo`. Inline-объект создаёт новое значение контекста при каждом render
родителя и обновляет все компоненты, использующие значения по умолчанию.
