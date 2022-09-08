# Spin

## Example

```tsx
import React from 'react';
import {Spin} from '@gravity-ui/base';

function App() {
  return <Spin size="l" />;
}
```

## Props

Inherits props: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface SpinProps extends DOMProps, QAProps {
  /**
   * Size
   * @default 'm'
   */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}
```
