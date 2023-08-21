<!--GITHUB_BLOCK-->

# ImageStack

<!--/GITHUB_BLOCK-->

```ts
import {ImageStack} from '@gravity-ui/uikit';
```

Stack of images with overlap over next image and optional control. This is usually avatars with some controls.

## Usage

Component is not limit you to what components to render, basic usage is:

<!--GITHUB_BLOCK-->

```tsx
<ImageStack
  items={[
    {
      pk: 'login1',
      login: 'login1',
    },
    {
      pk: 'login2',
      login: 'login2',
    },
    {
      pk: 'login2',
      login: 'login2',
    },
  ]}
  renderItem={(item) => <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=${item.login}`} />}
  renderMore={(items) => <ImageStack.MoreButton count={items.length} />}
/>
```

<!--/GITHUB_BLOCK-->

<!--LANDING_BLOCK

<ExampleBlock code={`<ImageStack
  items={[
    {
      pk: 'login1',
      login: 'login1',
    },
    {
      pk: 'login2',
      login: 'login2',
    },
    {
      pk: 'login2',
      login: 'login2',
    },
  ]}
  renderItem={(item) => <UserAvatar imgUrl={\`https://i.pravatar.cc/150?u=${item.login}\`} />}
  renderMore={(items) => <ImageStack.MoreButton count={items.length} />}
/>`}>
    <UIKit.ImageStack
      items={[
        {
          pk: 'login1',
          login: 'login1',
        },
        {
          pk: 'login2',
          login: 'login2',
        },
        {
          pk: 'login2',
          login: 'login2',
        },
      ]}
      renderItem={(item) => <UserAvatar imgUrl={`https://i.pravatar.cc/150?u=${item.login}`} />}
      renderMore={(items) => <ImageStack.MoreButton count={items.length} />}
    />
</ExampleBlock>

LANDING_BLOCK-->
