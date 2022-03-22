# Checkbox

## Пример использования

```tsx
import React from 'react';
import {Checkbox} from '@yandex-cloud/uikit';

function App() {
  const [checked, setChecked] = React.useState(false);

  return <Checkbox checked={checked} onUpdate={setChecked} content="checkbox" />;
}
```

## Свойства

Наследует свойства: [`ControlProps`](../README.md#controlprops), [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface CheckboxProps extends ControlProps, DOMProps, QAProps {
  /** Размер. */
  size?: 'm' | 'l';
  /** Содержимое подписи. */
  content?: React.ReactNode;
  /** Содержимое подписи. */
  children?: React.ReactNode;
  /** HTML-атрибут title. */
  title?: string;
}
```
