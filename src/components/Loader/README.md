## Loader

Component for rendering loading state (flashing bars)

## Examples

```tsx
import React from 'react';
import {Loader} from '@yandex-cloud/uikit';

const loader = <Loader size="l" />;
```

## Typings

```ts
type LoaderSize = 's' | 'm' | 'l';

interface LoaderProps {
  /**
   * Loader size
   * @default 'm'
   */
  size?: LoaderSize;
  /**
   * Custom CSS class
   */
  className?: string;
}
```
