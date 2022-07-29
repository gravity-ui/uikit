# Button

## Usage examples

### Plain button

```tsx
import React from 'react';
import {Button} from '@yandex-cloud/uikit';

const button = <Button>Action</Button>;
```

### Link

```tsx
import React from 'react';
import {Button} from '@yandex-cloud/uikit';

const button = <Button href="/cart">Cart</Button>;
```

### With icon

```tsx
import React from 'react';
import {Button, Icon} from '@yandex-cloud/uikit';

import gearIcon from 'assets/icons/gear.svg';

// Icon on the left
const button1 = (
  <Button>
    <Icon data={gearIcon} size={16} />
    Do good
  </Button>
);

// Icon on the right
const button2 = (
  <Button>
    Do more good
    <Icon data={gearIcon} size={16} />
  </Button>
);

// Only icon
const button3 = (
  <Button extraProps={{'aria-label': 'Do even better'}}>
    <Icon data={gearIcon} size={16} />
  </Button>
);

// Wrap component as button icon explicitly
const button4 = (
  <Button>
    <Button.Icon>
      <Icon data={gearIcon} size={16} />
    </Button.Icon>
    Custom Icon component
  </Button>
);
```

## Props

Inherits props from: [`DOMProps`](../README.md#domprops), [`QAProps`](../README.md#qaprops).

```ts
type ButtonView =
  | 'normal'
  | 'action'
  | 'outlined'
  | 'outlined-info'
  | 'outlined-danger'
  | 'raised'
  | 'flat'
  | 'flat-info'
  | 'flat-danger'
  | 'flat-secondary'
  | 'normal-contrast'
  | 'outlined-contrast'
  | 'flat-contrast';

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
   * Button appearance
   * @default 'normal'
   */
  view?: ButtonView;
  /**
   * Button size
   * @default 'm'
   */
  size?: ButtonSize;
  /**
   * Corners radius
   */
  pin?: ButtonPin;
  /** Selection state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Pending state */
  loading?: boolean;
  /** Button width */
  width?: 'auto' | 'max';
  /** Tooltip */
  title?: string;
  /** HTML `id` attribute */
  id?: string;
  /** HTML `tabindex` attribute */
  tabIndex?: number;
  /** Button content. You can mix button text with `<Icon/>` component */
  children?: React.ReactNode;
  /**
   * HTML button `type` attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /** HTML `href` attribute */
  href: string;
  /** HTML `target` attribute. */
  target?: string;
  /** HTML `rel` attribute */
  rel?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** mouseenter event handler */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** mouseleave event handler */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Additional control props */
  extraProps?:
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>;
  /** Prop to override element type */
  component?: React.ElementType;
}
```
