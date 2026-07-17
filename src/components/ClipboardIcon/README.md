<!--GITHUB_BLOCK-->

# ClipboardIcon

<!--/GITHUB_BLOCK-->

`ClipboardIcon` is an animated copy icon that reflects the copy state (idle or success); it is meant to sit inside `CopyToClipboard` or `ClipboardButton` rather than be used on its own.

```tsx
import {ClipboardIcon} from '@gravity-ui/uikit';
```

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
