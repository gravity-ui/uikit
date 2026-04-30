<!--GITHUB_BLOCK-->

# Skeleton

<!--/GITHUB_BLOCK-->

```tsx
import {Skeleton} from '@gravity-ui/uikit';
```

The `Skeleton` component family displays placeholder previews of your content before data gets loaded, reducing loading-time frustration. The family includes a base `Skeleton` primitive and several pre-shaped variants that mirror real UI components.

## Components

| Component           | Description                                         |
| :------------------ | :-------------------------------------------------- |
| `Skeleton`          | Base rectangular skeleton block                     |
| `SkeletonAvatar`    | Circular or square avatar placeholder               |
| `SkeletonButton`    | Button-shaped placeholder with configurable width   |
| `SkeletonLabel`     | Label/badge-shaped placeholder                      |
| `SkeletonText`      | Single-line or multi-line text placeholder          |
| `SkeletonUser`      | User card placeholder (avatar + name + description) |
| `SkeletonUserLabel` | User label placeholder with configurable width      |

## Usage

```tsx
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonLabel,
  SkeletonText,
  SkeletonUser,
  SkeletonUserLabel,
} from '@gravity-ui/uikit';

// Basic skeleton block
<Skeleton style={{height: 30, width: 200}} />

// Avatar placeholder
<SkeletonAvatar size="m" shape="circle" />

// Multi-line text placeholder
<SkeletonText variant="body-1" lines={3} lastLineWidth="60%" />

// User card placeholder
<SkeletonUser size="m" />
```

## `Skeleton`

The base primitive. Use it for any custom-shaped placeholder by controlling size via `style` or `className`.

### Properties

| Name      | Description                                |                 Type                  |   Default    |
| :-------- | :----------------------------------------- | :-----------------------------------: | :----------: |
| animation | Animation type to apply to the skeleton    | `'gradient'` \| `'pulse'` \| `'none'` | `'gradient'` |
| className | Custom CSS class for the root element      |               `string`                |              |
| style     | Custom CSS properties for the root element |         `React.CSSProperties`         |              |
| qa        | `data-qa` HTML attribute, used for testing |               `string`                |              |

---

## `SkeletonAvatar`

A skeleton shaped like an [`Avatar`](../Avatar) component. Supports the same sizes and shapes.

```tsx
import {SkeletonAvatar} from '@gravity-ui/uikit';

<SkeletonAvatar size="m" shape="circle" />;
```

### Properties

| Name      | Description                           |                               Type                                |   Default    |
| :-------- | :------------------------------------ | :---------------------------------------------------------------: | :----------: |
| animation | Animation type                        |               `'gradient'` \| `'pulse'` \| `'none'`               | `'gradient'` |
| className | Custom CSS class for the root element |                             `string`                              |              |
| shape     | Avatar shape                          |                     `'circle'` \| `'square'`                      |  `'circle'`  |
| size      | Avatar size                           | `'3xs'` \| `'2xs'` \| `'xs'` \| `'s'` \| `'m'` \| `'l'` \| `'xl'` |    `'m'`     |

---

## `SkeletonButton`

A skeleton shaped like a [`Button`](../Button) component.

```tsx
import {SkeletonButton} from '@gravity-ui/uikit';

<SkeletonButton size="m" width={120} />;
```

### Properties

| Name      | Description                           |                                                                                                                                     Type                                                                                                                                     |     Default     |
| :-------- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------: |
| animation | Animation type                        |                                                                                                                    `'gradient'` \| `'pulse'` \| `'none'`                                                                                                                     |  `'gradient'`   |
| className | Custom CSS class for the root element |                                                                                                                                   `string`                                                                                                                                   |                 |
| pin       | Button pin (border radius style)      | `'round-round'` \| `'brick-brick'` \| `'clear-clear'` \| `'circle-circle'` \| `'round-brick'` \| `'brick-round'` \| `'round-clear'` \| `'clear-round'` \| `'brick-clear'` \| `'clear-brick'` \| `'circle-brick'` \| `'brick-circle'` \| `'circle-clear'` \| `'clear-circle'` | `'round-round'` |
| size      | Button size                           |                                                                                                                 `'xs'` \| `'s'` \| `'m'` \| `'l'` \| `'xl'`                                                                                                                  |      `'m'`      |
| width     | Width of the skeleton                 |                                                                                                                             `number` \| `string`                                                                                                                             |      `100`      |

---

## `SkeletonLabel`

A skeleton shaped like a [`Label`](../Label) component.

```tsx
import {SkeletonLabel} from '@gravity-ui/uikit';

<SkeletonLabel size="xs" width={80} />;
```

### Properties

| Name      | Description                           |                 Type                  |   Default    |
| :-------- | :------------------------------------ | :-----------------------------------: | :----------: |
| animation | Animation type                        | `'gradient'` \| `'pulse'` \| `'none'` | `'gradient'` |
| className | Custom CSS class for the root element |               `string`                |              |
| size      | Label size                            |  `'xxs'` \| `'xs'` \| `'s'` \| `'m'`  |    `'xs'`    |
| width     | Width of the skeleton                 |         `number` \| `string`          |     `80`     |

---

## `SkeletonText`

A skeleton shaped like a text block. Supports single-line and multi-line modes.

```tsx
import {SkeletonText} from '@gravity-ui/uikit';

// Single line
<SkeletonText variant="body-1" width="200px" />

// Multiple lines
<SkeletonText variant="body-1" lines={3} lastLineWidth="60%" />
```

### Properties

| Name          | Description                                                                  |                 Type                  |   Default    |
| :------------ | :--------------------------------------------------------------------------- | :-----------------------------------: | :----------: |
| animation     | Animation type                                                               | `'gradient'` \| `'pulse'` \| `'none'` | `'gradient'` |
| className     | Custom CSS class for the root element                                        |               `string`                |              |
| lastLineWidth | Width of the last line when `lines > 1`. Falls back to `width` when not set. |         `number` \| `string`          |              |
| lines         | Number of text lines to render                                               |               `number`                |     `1`      |
| variant       | Text variant (controls line height)                                          |               `string`                |  `'body-1'`  |
| width         | Width of each line                                                           |         `number` \| `string`          |   `'100%'`   |

---

## `SkeletonUser`

A skeleton shaped like a [`User`](../User) component (avatar + name + optional description).

```tsx
import {SkeletonUser} from '@gravity-ui/uikit';

<SkeletonUser size="m" />;
```

### Properties

| Name      | Description                           |                               Type                                |   Default    |
| :-------- | :------------------------------------ | :---------------------------------------------------------------: | :----------: |
| animation | Animation type                        |               `'gradient'` \| `'pulse'` \| `'none'`               | `'gradient'` |
| className | Custom CSS class for the root element |                             `string`                              |              |
| size      | User size                             | `'3xs'` \| `'2xs'` \| `'xs'` \| `'s'` \| `'m'` \| `'l'` \| `'xl'` |    `'m'`     |

---

## `SkeletonUserLabel`

A skeleton shaped like a [`UserLabel`](../UserLabel) component.

```tsx
import {SkeletonUserLabel} from '@gravity-ui/uikit';

<SkeletonUserLabel size="s" width={120} />;
```

### Properties

| Name      | Description                           |                               Type                                |   Default    |
| :-------- | :------------------------------------ | :---------------------------------------------------------------: | :----------: |
| animation | Animation type                        |               `'gradient'` \| `'pulse'` \| `'none'`               | `'gradient'` |
| className | Custom CSS class for the root element |                             `string`                              |              |
| size      | UserLabel size                        | `'3xs'` \| `'2xs'` \| `'xs'` \| `'s'` \| `'m'` \| `'l'` \| `'xl'` |    `'s'`     |
| width     | Width of the skeleton                 |                       `number` \| `string`                        |    `120`     |
