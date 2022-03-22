# RadioGroup

## Пример использования

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

## Свойства

Наследует свойства: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
interface RadioGroupOption {
  /** Значение радиокнопки. */
  value: string;
  /** Подпись к радиокнопке. */
  content?: React.ReactNode;
  /** Признак неактивного состояния радиокнопки. */
  disabled?: boolean;
}

interface RadioGroupProps extends DOMProps, QAProps {
  /** Имя радиогруппы. */
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
   * Опции, формирующие радиокнопки в группе.
   * Если не заданы, компонент сформирует опции
   * исходя из дочерних компонентов Radio.
   */
  options?: RadioGroupOption[];
  /**
   * Размер радиокнопок.
   * @default 'm'
   */
  size?: 'm' | 'l';
}
```
