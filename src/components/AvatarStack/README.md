<!--GITHUB_BLOCK-->

# AvatarStack

<!--/GITHUB_BLOCK-->

```ts
import {AvatarStack} from '@gravity-ui/uikit';
```

This component is used for a stack of images with overlap over one another and, optionally, a control. It usually refers to user avatars.

## Usage

Basically, `AvatarStack` does not have any limitations in terms of what components to render. See an example of its common usage below:

```tsx
<AvatarStack>
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login1`} />
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login2`} />
  <Avatar imgUrl={`https://i.pravatar.cc/150?u=login3`} />
</AvatarStack>
```

## Properties

| Name        | Description                                                                                                                                                      |                        Type                        | Default |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------: | :-----: |
| max         | Determines how many avatars are visible before the `More` button. If avatar count is only 1 short from `max`, the `More` button will be replaced with an avatar. |                      `number`                      |    3    |
| overlapSize | Determines how much each item should overlap the next one. You may want to use `s` for `xs` to `m`-sized `Avatar`s , `m` for `l`-sized, and `l`, for `xl`-sized. |                   `s`, `m`, `l`                    |   `s`   |
| size        | Size for the control displaying extra avatars. Its value is the same as the `Avatar` size.                                                                       |                    `AvatarSize`                    |         |
| className   | Class name of the root DOM node                                                                                                                                  |                      `string`                      |         |
| children    | List of avatars that may also have extra wrappers                                                                                                                |                     `Object[]`                     |         |
| renderMore  | Custom render for the control displaying extra avatars                                                                                                           | `function(options: {count: number}): ReactElement` |         |

### AvatarStack.MoreButton

Component for overriding the `More` button

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
