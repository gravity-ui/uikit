# Radio

## Пример использования

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

## Свойства

Наследует свойства: [`ControlProps`](../README.md#controlprops), [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface RadioProps extends ControlProps<boolean>, DOMProps, QAProps {
  /** Значение радиокнопки. */
  value: string;
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
