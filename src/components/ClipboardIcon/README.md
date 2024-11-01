<!--GITHUB_BLOCK-->

# ClipboardIcon

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardIcon} from '@gravity-ui/uikit';
```

This component is mainly used along with `CopyToClipboard` as a wrap component.

### Status

Depending on the `status` property, the icon will be changing accordingly:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<UIKit.ClipboardIcon size={24} />
<UIKit.ClipboardIcon size={24} status="success"} />
<UIKit.ClipboardIcon size={24} status="error" />
`}>
    <UIKit.ClipboardIcon size={24} />
    <UIKit.ClipboardIcon size={24} status="success" />
    <UIKit.ClipboardIcon size={24} status="error" />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<CopyToClipboard text="Some text to copy" timeout={500}>
  {(status) => <ClipboardIcon size={24} status={status} />}
</CopyToClipboard>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name      | Description                                                 | Type     | Default |
| :-------- | :---------------------------------------------------------- | :------- | :------ |
| className | `class` HTML attribute                                      | `string` |         |
| size      | Determines the icon size                                    | `number` |         |
| status    | The available values are `pending`, `success`, and `error`. | `string` |         |
