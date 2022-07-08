# RadioButton

## Example

```tsx
import React from 'react';
import {RadioButton, RadioButtonOption} from '@yandex-cloud/uikit';

function App({checked}) {
  const options: RadioButtonOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
  ];
  return <RadioButton name="group" value={options[0].value} options={options} />;
}
```

## Props

Inherits props: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface RadioButtonOption {
  /** Option value of RadioButton. */
  value: string;
  /** Option label of RadioButton. */
  content?: React.ReactNode;
  /** Disabled state of RadioButton. */
  disabled?: boolean;
}

interface RadioButtonProps extends DOMProps, QAProps {
  /** RadioButton name */
  name?: string;
  /** Value */
  value?: string;
  /** Default value for uncontrolled component */
  defaultValue?: string;
  /** Value change handler */
  onUpdate?: (value: string) => void;
  /** Change event handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * List of RadioButton to render
   */
  options: RadioButtonOption[];
  /**
   * RadioButton size
   * @default 'm'
   */
  size?: 's' | 'm' | 'l' | 'xl';
}
```
