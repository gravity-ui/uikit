# Radio

## Example

```tsx
import React from 'react';
import {Radio} from '@yandex-cloud/uikit';

function App({checked}) {
  return (
    <Radio
      content="value 1"
      value="value 1"
      checked={checked}
      onUpdate={(checked) => console.log(checked)}
    />
  );
}
```

## Props

Inherit props: [`ControlProps`](../README.md#controlprops), [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface RadioProps extends ControlProps<boolean>, DOMProps, QAProps {
  /** Control value */
  value: string;
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
