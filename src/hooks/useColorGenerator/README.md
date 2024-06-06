<!--GITHUB_BLOCK-->

# useColorGenerator

<!--/GITHUB_BLOCK-->

```tsx
import {useColorGenerator} from '@gravity-ui/uikit';
```

The `useColorGenerator` hook generates a unique (but consistent) background color based on some unique attribute (e.g., name, id, email). The background color remains unchanged with each update.

## Properties

| Name      | Description                                            | Type                     | Default |     |     |
| :-------- | :----------------------------------------------------- | :----------------------- | :-----: | --- | --- |
| intensity | Value to control color saturation                      | `light` `medium` `heavy` | `light` |
| seed      | Unique attribute of the entity (e.g., name, id, email) | `string`                 |         |     |     |

## Result

`useColorGenerator` returns an object with exactly two values:

1. color - unique color from a token.
2. textColor - text color (dark or light), ensurring higher contrast on generated color.
