<!--GITHUB_BLOCK-->

# ClipboardIcon &middot; [![storybook](https://img.shields.io/badge/Storybook-ClipboardIcon-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-utils-clipboardicon--default)

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardIcon} from '@gravity-ui/uikit';
```

This component is mainly used together with `CopyToClipboard` as wrap component.

### Status

Depends on `status` property icon is changed.

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

| Name      | Description                                     | Type     | Default |
| :-------- | :---------------------------------------------- | :------- | :------ |
| className | HTML `class` attribute                          | `string` |         |
| size      | Sets icon size                                  | `number` |         |
| status    | Available values: `pending`, `success`, `error` | `string` |         |
