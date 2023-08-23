<!--GITHUB_BLOCK-->

# ImageStack

<!--/GITHUB_BLOCK-->

```ts
import {ImageStack} from '@gravity-ui/uikit';
```

Stack of images with overlap over next image and optional control. This is usually users avatars.

## Usage

Component is not limit you to what components to render, basic usage is:

<!--GITHUB_BLOCK-->

```tsx
<ImageStack
  items={[
    {
      login: 'login1',
    },
    {
      login: 'login2',
    },
    {
      login: 'login2',
    },
  ]}
  renderItem={(item) => <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=${item.login}`} />}
  renderMore={(items) => <ImageStack.MoreButton count={items.length} />}
/>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name         | Description                                                                                                                                                                                              |                    Type                     | Default |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------: | :-----: |
| displayCount | How much items should be visible                                                                                                                                                                         |                  `number`                   |    2    |
| overlapSize  | How much each item should overlap next one. `s` recommended for `UserAvatars` of sizes `xs`-`m`, `m` recomended for `l` size avatars and `l` overlap for `xl` avatars                                    |                `s`, `m`, `l`                |   `s`   |
| className    | Class name of root DOM node                                                                                                                                                                              |                  `string`                   |         |
| items        | Array of items to render                                                                                                                                                                                 |                 `Object[]`                  |         |
| renderItem   | Render function for rendering `items`. First argument is item from `items` prop, and second argument is options with `itemClassName`, that should be applied for visible children, for correct alignment | `(items, options: {itemClassName: string})` |         |
| renderMore   | Render function for rendering button                                                                                                                                                                     | `(items, options: {itemClassName: string})` |         |
