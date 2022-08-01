# Checkbox

## Example

```tsx
import React from 'react';
import {Checkbox} from '@yandex-cloud/uikit';

function App() {
  const [checked, setChecked] = React.useState(false);

  return <Checkbox checked={checked} onUpdate={setChecked} content="checkbox" />;
}
```

## Props

Inherits props: [`ControlProps`](../README.md#controlprops), [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface CheckboxProps extends ControlProps, DOMProps, QAProps {
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
