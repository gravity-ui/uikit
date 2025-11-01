<!--GITHUB_BLOCK-->

## FilePreview

<!--/GITHUB_BLOCK-->

```tsx
import {FilePreview} from '@gravity-ui/uikit';
```

A component for displaying the file.

<!--GITHUB_BLOCK-->

```tsx
<FilePreview
  file={{name: 'my-file.docs', type: 'text/docs'} as File}
  onClick={() => action('onClick')}
  actions={[
    {
      icon: <Link width={14} height={14} />,
      title: 'Link',
      onClick: () => action('onLink'),
    },
    {
      icon: <Xmark width={14} height={14} />,
      title: 'Close',
      onClick: () => action('onClose'),
    },
  ]}
/>
```

<!-- Storybook example -->

<FilePreviewExample />

<!--/GITHUB_BLOCK-->

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<UIKit.FilePreview
  file={{name: 'my-file.docs', type: 'text/docs'} as File}
  onClick={() => action('onClick')}
  actions={[
    {
      icon: <Link width={14} height={14} />,
      title: 'Link',
      onClick: () => action('onLink'),
    },
    {
      icon: <Xmark width={14} height={14} />,
      title: 'Close',
      onClick: () => action('onClose'),
    },
  ]}
/>
`}>
  <UIKit.FilePreview
    file={{name: 'my-file.docs', type: 'text/docs'} as File}
    onClick={() => action('onClick')}
    actions={[
      {
        icon: <Link width={14} height={14} />,
        title: 'Link',
        onClick: () => action('onLink'),
      },
      {
        icon: <Xmark width={14} height={14} />,
        title: 'Close',
        onClick: () => action('onClose'),
      },
    ]}
  />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

### Properties

| Name                | Description                                                                                                      | Type                  | Required | Default   |
| :------------------ | :--------------------------------------------------------------------------------------------------------------- | :-------------------- | :------: | :-------- |
| file                | The File interface provides information about files and allows JavaScript in a web page to access their content. | `File`                |    ✓     |           |
| imageSrc            | source for image preview                                                                                         | `string`              |          |           |
| description         | Description displayed under the file name                                                                        | `string`              |          |           |
| selected            | Enable or disable selected styles                                                                                | `boolean`             |          | `false`   |
| className           | Class name for the file container                                                                                | `string`              |          |           |
| onClick             | Click handler for the file container                                                                             | `function`            |          |           |
| [actions](#actions) | An array of interactive actions                                                                                  | `FilePreviewAction[]` |          | `[]`      |
| view                | The file preview view mode (the text is not visible for the `compact` view)                                      | `default`, `compact`  |          | `default` |

#### Actions

For a file, you can prescribe actions that will be visible when you hover over it.

| Name              | Description                     | Type                                                                                                                                                       | Required | Default |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | ------- |
| id                | Action id                       | `String`                                                                                                                                                   |          |         |
| icon              | Action icon                     | `React.ReactNode`                                                                                                                                          |    ✓     |         |
| title             | Action hint on hover            | `String`                                                                                                                                                   |    ✓     |         |
| onClick           | Action click handler            | `React.MouseEventHandler<HTMLElement>` for default view and `(event: React.MouseEvent<HTMLElement, MouseEvent> or KeyboardEvent) => void` for compact view |          |         |
| href              | Action button href              | `String`                                                                                                                                                   |          |         |
| disabled          | Action disabled                 | `boolean`                                                                                                                                                  |          |         |
| extraProps        | Additional action button props  | `ButtonButtonProps or ButtonLinkProps` (works only for the default desktop view)                                                                           |          |         |
| tooltipExtraProps | Additional action tooltip props | `Omit<ActionTooltipProps, 'title' or 'children'>` (works only for the default desktop view)                                                                |          |         |
