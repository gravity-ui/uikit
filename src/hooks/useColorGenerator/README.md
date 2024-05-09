<!--GITHUB_BLOCK-->

# useColorGenerator

<!--/GITHUB_BLOCK-->

```tsx
import {useColorGenerator} from '@gravity-ui/uikit';
```

The `useColorGenerator` a hook that generates a unique (but consistent) background color based on some unique attribute (e.g., name, id, email). The background color remains unchanged with each update.

## Properties

| Name      | Description                                                                                                                                | Type                               |   Default   |     |     |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :---------: | --- | --- |
| mode      | Value to control color saturation                                                                                                          | `saturated` `unsaturated` `bright` | `saturated` |
| token     | Unique attribute of the entity (e.g., name, id, email)                                                                                     | `string`                           |             |     |     |
| colorKeys | If an array of colors is passed, an index is generated from the token passed, and the value from the color array at that index is returned | `string[]`                         |             |     |     |

## Result

`useColorGenerator` returns an object with exactly two values:

1. color - unique color from a token.
2. textColor - text color (dark or light), ensurring higher contrast on generated color.
