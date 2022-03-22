# Button

## Пример использования

### Обычная кнопка

```tsx
import React from 'react';
import {Button} from '@yandex-cloud/uikit';

const button = <Button>Кнопка</Button>;
```

### Кнопка-ссылка

```tsx
import React from 'react';
import {Button} from '@yandex-cloud/uikit';

const button = <Button href="/cart">Кнопка</Button>;
```

### Кнопка с иконкой

```tsx
import React from 'react';
import {Button, Icon} from '@yandex-cloud/uikit';

import gearIcon from 'assets/icons/gear.svg';

// Иконка слева
const button1 = (
  <Button>
    <Icon data={gearIcon} size={16} />
    Кнопка
  </Button>
);

// Иконка справа
const button2 = (
  <Button>
    Кнопка
    <Icon data={gearIcon} size={16} />
  </Button>
);

// Только иконка
const button3 = (
  <Button>
    <Icon data={gearIcon} size={16} />
  </Button>
);
```

## Свойства

Наследует свойства: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
type ButtonView =
  | 'normal'
  | 'action'
  | 'outlined'
  | 'outlined-info'
  | 'outlined-danger'
  | 'raised'
  | 'clear'
  | 'clear-info'
  | 'clear-danger'
  | 'clear-muted'
  | 'normal-contrast'
  | 'outlined-contrast'
  | 'clear-contrast';

type ButtonSize = 's' | 'm' | 'l' | 'xl';

type ButtonPin =
  | 'round-round'
  | 'brick-brick'
  | 'clear-clear'
  | 'circle-circle'
  | 'round-brick'
  | 'brick-round'
  | 'round-clear'
  | 'clear-round'
  | 'brick-clear'
  | 'clear-brick'
  | 'circle-brick'
  | 'brick-circle'
  | 'circle-clear'
  | 'clear-circle';

interface ButtonProps extends DOMProps, QAProps {
  /**
   * Вид кнопки.
   * @default 'normal'
   */
  view?: ButtonView;
  /**
   * Размер кнопки.
   * @default 'm'
   */
  size?: ButtonSize;
  /**
   * Закругление краев.
   */
  pin?: ButtonPin;
  /** Выбранное состояние. */
  selected?: boolean;
  /** Неактивное состояние. */
  disabled?: boolean;
  /** Состояние загрузки. */
  loading?: boolean;
  /** Ширина кнопки. */
  width?: 'auto' | 'max';
  /** Всплывающая подсказка. */
  title?: string;
  /** HTML-атрибут id. */
  id?: number;
  /** HTML-атрибут tabIndex. */
  tabIndex?: number;
  /** Содержимое. Можно комбинировать текст с Icon, слева, справа, или только Icon. */
  children?: React.ReactNode;
  /**
   * Тип кнопки.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /** HTML-атрибут href для ссылки. */
  href: string;
  /** HTML-атрибут target для ссылки. */
  target?: string;
  /** HTML-атрибут rel для ссылки. */
  rel?: string;
  /** Обработчик события click. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Обработчик события mouseenter. */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Обработчик события mouseleave. */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Обработчик события focus. */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Обработчик события blur. */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Дополнительные свойства для контрола. */
  extraProps?:
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>;
  /** Базовый компонент кнопки. */
  component?: React.ElementType;
}
```
