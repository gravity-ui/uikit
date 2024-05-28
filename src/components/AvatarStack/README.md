<!--GITHUB_BLOCK-->

# AvatarStack

<!--/GITHUB_BLOCK-->

```ts
import {AvatarStack} from '@gravity-ui/uikit';
```

Stack of images with overlap over next image and optional control. This is usually users avatars.

## Usage

Component is not limit you to what components to render, basic usage is:

```tsx
<AvatarStack>
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login1`} />
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login2`} />
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login3`} />
</AvatarStack>
```

## Properties

| Name             | Description                                                                                                                                                        |                        Type                        | Default |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------: | :-----: |
| max              | How much avatars should be visible before more button. If avatars count is only 1 short from `max`, than more button would be replaced with avatar.                |                      `number`                      |    3    |
| overlapSize      | How much each item should overlap next one. `s` recommended for `Avatar`'s of sizes `xs`-`m`, `m` recomended for `l` size avatars and `l` overlap for `xl` avatars |                   `s`, `m`, `l`                    |   `s`   |
| size             | Size for control displaying extra avatars. Value same to `Avatar` size.                                                                                            |                    `AvatarSize`                    |         |
| className        | Class name of root DOM node                                                                                                                                        |                      `string`                      |         |
| children         | List of avatars, probably with some extra wrappers                                                                                                                 |                     `Object[]`                     |         |
| renderMoreButton | Custom render for control displaying extra avatars                                                                                                                 | `function(options: {count: number}): ReactElement` |         |

### AvatarStack.MoreButton

Component for overriding more button

```tsx
<AvatarStack
  renderMore={({count}) => (
    <Tooltip content={'More users'}>
      <AvatarStack.MoreButton count={count} />
    </Tooltip>
  )}
>
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login1`} />
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login2`} />
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login3`} />
</AvatarStack>
```
