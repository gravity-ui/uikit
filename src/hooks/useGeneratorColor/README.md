<!--GITHUB_BLOCK-->

# useGeneratorColor

<!--/GITHUB_BLOCK-->

```tsx
import {useGeneratorColor} from '@gravity-ui/uikit';
```

The `useGeneratorColor` a hook that generates a unique (but consistent) background color based on some unique attribute (e.g., name, id, email). The background color remains unchanged with each update.

## Properties

| Name      |                         Description                          |   Type    |   Default   |
| :-------- | :----------------------------------------------------------: | :-------: | :---------: | ------ | --------- |
| mode      |              Value to control color saturation               | saturated | unsaturated | bright | saturated |
| token     |    Unique attribute of the entity (e.g., name, id, email)    |  string   |             |
| colorKeys |               If an array of colors is passed,               | string[]  |  undefined  |        |
|           |         an index is generated from the token passed,         |           |             |
|           | and the value from the color array at that index is returned |           |             |

## Result

`useGeneratorColor` returns an object with exactly two values:

1. color - unique color from a token.
2. oppositeColor - inverted color (black or white), ensuring higher text contrast compared to the current unique color, which is usually better for human perception.
