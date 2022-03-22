# TextInput

## Пример использования

```tsx
import React from 'react';
import {TextInput} from '@yandex-cloud/uikit';

function App({checked}) {
  const [value, setValue] = React.useState('');

  return <TextInput value={value} onUpdate={setValue} />;
}
```

## Свойства

Наследует свойства: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
type TextInputView = 'normal' | 'clear';

type TextInputSize = 's' | 'm' | 'l' | 'xl';

type TextInputPin =
  | 'round-round'
  | 'brick-brick'
  | 'clear-clear'
  | 'round-brick'
  | 'brick-round'
  | 'round-clear'
  | 'clear-round'
  | 'brick-clear'
  | 'clear-brick';

interface TextInputProps extends DOMProps, QAProps {
  /**
   * Вид контрола.
   * @default 'normal'
   */
  view?: TextInputView;
  /**
   * Размер.
   * @default 'm'
   */
  size?: TextInputSize;
  /** Закругление краев. */
  pin?: TextInputPin;
  /** Тип input-контрола (HTML-атрибут type). */
  type?: string;
  /** Имя компонента (HTML-атрибут name). */
  name?: string;
  /** Значение. */
  value?: string;
  /** Начальное значение в неконтролируемом компоненте. */
  defaultValue?: string;
  /**
   * Неактивное состояние.
   * @default false
   */
  disabled?: boolean;
  /**
   * Многострочный контрол (textarea).
   * @default false
   */
  multiline?: boolean;
  /** Подсказка внутри контрола. */
  placeholder?: string;
  /** Кнопка очистки. */
  hasClear?: boolean;
  /** Автофокус контрола. */
  autoFocus?: boolean;
  /** HTML-атрибут autocomplete. */
  autoComplete?: boolean | 'on' | 'off' | string;
  /** Ошибка валидации. */
  error?: string | boolean;
  /** HTML-атрибут id. */
  id?: number;
  /** HTML-атрибут tabIndex. */
  tabIndex?: number;
  /**
   * Количество строк контрола textarea.
   * Если не указано, будет автовысота от контента.
   */
  rows?: number;
  /** Минимальное количество строк при автовысоте контрола textarea. */
  minRows?: number;
  /** Максимальное количество строк при автовысоте контрола textarea. */
  maxRows?: number;
  /** Обработчик изменения значения. */
  onUpdate?: (value: string) => void;
  /** Обработчик события change. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Обработчик события focus. */
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Обработчик события blur. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Обработчик события keydown. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Обработчик события keyup. */
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Обработчик события keypress. */
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Дополнительные свойства для контрола. */
  controlProps?:
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Ссылка на DOM-элемент контрола. */
  controlRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}
```
