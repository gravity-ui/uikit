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
  <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=login1`} />
  <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=login2`} />
  <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=login3`} />
</AvatarStack>
```

## Properties

| Name        | Description                                                                                                                                                           |     Type      | Default |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------: | :-----: |
| overlapSize | How much each item should overlap next one. `s` recommended for `UserAvatars` of sizes `xs`-`m`, `m` recomended for `l` size avatars and `l` overlap for `xl` avatars | `s`, `m`, `l` |   `s`   |
| className   | Class name of root DOM node                                                                                                                                           |   `string`    |         |
| children    | List of avatars, probably with some extra wrappers                                                                                                                    |  `Object[]`   |         |

### AvatarStack.MoreButton

Component for overriding more button

```tsx
<AvatarStack>
  <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=login1`} />
  <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=login2`} />
  <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=login3`} />
  <AvatarStack.MoreButton
    render={({button}) => <Tooltip content={'More users'}>{button}</Tooltip>}
  />
</AvatarStack>
```
