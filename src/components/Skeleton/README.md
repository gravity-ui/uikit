<!--GITHUB_BLOCK-->

# Skeleton

<!--/GITHUB_BLOCK-->

```tsx
import {Skeleton} from '@gravity-ui/uikit';
```

The Skeleton component displays a placeholder preview of your content before the data gets loaded. This preview is shown in order to reduce the loading time frustration.

## Properties

| Name      | Description                                |                 Type                  |  Default   |
| :-------- | :----------------------------------------- | :-----------------------------------: | :--------: |
| style     | Custom CSS properties for root element     |         `React.CSSProperties`         |            |
| className | Custom CSS class for the root element      |               `string`                |            |
| qa        | `data-qa` HTML attribute, used for testing |               `string`                |            |
| animation | Animation type to apply to the skeleton    | `'gradient'` \| `'pulse'` \| `'none'` | `gradient` |
