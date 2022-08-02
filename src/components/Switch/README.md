# Switch

## Example

```tsx
import React from 'react';
import {Switch} from '@yandex-cloud/uikit';

function App() {
  const [checked, setChecked] = React.useState(false);

  return <Switch checked={checked} onUpdate={setChecked} content="switch" />;
}
```

## Props

Inherits props: [`ControlProps`](../types.ts#L13), [`DOMProps`](../types.ts#L3), [`QAProps`](../types.ts#L8).

```ts
interface SwitchProps extends ControlProps, DOMProps, QAProps {
  /** Size */
  size?: 'm' | 'l';
  /** Label content */
  content?: React.ReactNode;
  /** Label content */
  children?: React.ReactNode;
  /** HTML title */
  title?: string;
}
```
