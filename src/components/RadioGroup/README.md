# RadioGroup

## Examples

```tsx
import React from 'react';
import {RadioGroup} from '@yandex-cloud/uikit';

function App({checked}) {
  const options: RadioGroupOption[] = [
    {value: 'Value 1', content: 'Value 1'},
    {value: 'Value 2', content: 'Value 2'},
    {value: 'Value 3', content: 'Value 3'},
  ];
  return <RadioGroup name="group" value={options[0].value} options={options} />;
}
```

## Props

Inherits props: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface RadioGroupOption {
  /** Value of the button. */
  value: string;
  /** Text. */
  content?: React.ReactNode;
  /** Disalbed state. */
  disabled?: boolean;
}

interface RadioGroupProps extends DOMProps, QAProps {
  /** Name of the radio group. */
  name?: string;
  /** Value. */
  value?: string;
  /** Initial value when component is uncontrolled. */
  defaultValue?: string;
  /** Value update handler. */
  onUpdate?: (value: string) => void;
  /** DOM change event handler. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Disabled sstate.
   * @default false
   */
  disabled?: boolean;
  /**
   * Options for radio group.
   * If not set, component will get them from Radio children.
   */
  options?: RadioGroupOption[];
  /**
   * Size of radio buttons.
   * @default 'm'
   */
  size?: 'm' | 'l';
}
```
