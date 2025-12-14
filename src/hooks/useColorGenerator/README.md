<!--GITHUB_BLOCK-->

# useColorGenerator

<!--/GITHUB_BLOCK-->

```tsx
import {useColorGenerator} from '@gravity-ui/uikit';
```

The `useColorGenerator` hook generates a unique (but consistent) background color based on some unique attribute (e.g., name, id, email). The background color remains unchanged with each update. The hook automatically adapts to the current theme (light/dark).

## Properties

| Name | Description                                                          |   Type   | Default |
| :--- | :------------------------------------------------------------------- | :------: | :-----: |
| seed | Unique attribute of the entity (e.g., name, id, email) **Required.** | `string` |         |

## Result

`useColorGenerator` returns an object with color details:

| Name      | Description                                                             |   Type   |
| :-------- | :---------------------------------------------------------------------- | :------: |
| hash      | Hash value generated from seed                                          | `number` |
| oklch     | OKLCH color values (lightness, chroma, hue)                             | `object` |
| rgb       | RGB color values (red, green, blue)                                     | `object` |
| textColor | Text color (dark or light), ensuring higher contrast on generated color | `string` |
