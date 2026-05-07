<!--GITHUB_BLOCK-->

# ClipboardIcon

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardIcon} from '@gravity-ui/uikit';
```

This component is mainly used along with `CopyToClipboard` as a wrap component.

### Status

Depending on the `status` property, the icon will be changing accordingly:

<!--SANDBOX
import {ClipboardIcon} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <ClipboardIcon size={24} />
            <ClipboardIcon size={24} status="success" />
            <ClipboardIcon size={24} status="error" />
        </>
    );
}
SANDBOX-->

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
