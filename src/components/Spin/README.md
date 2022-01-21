# Spin

## Пример использования

```tsx
import React from 'react';
import {Spin} from '@yandex-cloud/uikit';

function App() {
  return <Spin size="l" />;
}
```

## Свойства

Наследует свойства: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface SpinProps extends DOMProps, QAProps {
  /**
   * Размер.
   * @default 'm'
   */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}
```
