# RadioButton

## Пример использования

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

## Свойства

Наследует свойства: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface RadioButtonOption {
  /** Значение опции в RadioButton. */
  value: string;
  /** Подпись опции в RadioButton. */
  content?: React.ReactNode;
  /** Признак неактивного состояния опции в RadioButton. */
  disabled?: boolean;
}

interface RadioButtonProps extends DOMProps, QAProps {
  /** Имя RadioButton. */
  name?: string;
  /** Значение. */
  value?: string;
  /** Начальное значение в неконтролируемом компоненте. */
  defaultValue?: string;
  /** Обработчик изменения значения. */
  onUpdate?: (value: string) => void;
  /** Обработчик события change. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Признак неактивного состояния.
   * @default false
   */
  disabled?: boolean;
  /**
   * Опции, из которых формируется RadioButton.
   */
  options: RadioButtonOption[];
  /**
   * Размер RadioButton.
   * @default 'm'
   */
  size?: 's' | 'm' | 'l' | 'xl';
}
```
