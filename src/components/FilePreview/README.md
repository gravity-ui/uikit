<!--GITHUB_BLOCK-->

## FilePreview

<!--/GITHUB_BLOCK-->

```tsx
import {FilePreview} from '@gravity-ui/uikit';
```

A component for displaying the file.

<!--GITHUB_BLOCK-->

<ExampleBlock
code={`  <FilePreview
    file={{name: fileType, type: fileType} as File}
    imageSrc="assets/files/first"
    actions={[
      {
        icon: linkIcon,
        title: 'open on drive',
        onClick: onFileOpen,
      },
      {
        icon: xmarkIcon,
        title: 'delete a file',
        onClick: onFileDelete,
      },
    ]}
  />`}

>

    <UIKit.FilePreview
      file={{name: fileType, type: fileType} as File}
      imageSrc="assets/files/first"
      actions={[
        {
          icon: linkIcon,
          title: 'open on drive',
          onClick: onFileOpen,
        },
        {
          icon: xmarkIcon,
          title: 'delete a file',
          onClick: onFileDelete,
        },
      ]}
    />

</ExampleBlock>

<!--GITHUB_BLOCK-->

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<UIKit.DropdownMenu
  items={[
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
`}>
    <UIKit.DropdownMenu
      items={[
        {
          action: () => console.log('Rename'),
          text: 'Rename',
        },
        {
          action: () => console.log('Delete'),
          text: 'Delete',
          theme: 'danger',
        },
      ]}
    />
</ExampleBlock>

LANDING_BLOCK-->

### Properties

| Property            | Type                       | Required | Default | Description                                                                                                      |
| :------------------ | :------------------------- | :------: | :------ | :--------------------------------------------------------------------------------------------------------------- |
| file                | `File`                     |   yes    |         | The File interface provides information about files and allows JavaScript in a web page to access their content. |
| imageSrc            | `string`                   |          |         | source for image preview                                                                                         |
| description         | `string`                   |          |         | Description displayed under the file name                                                                        |
| className           | `string`                   |          |         | Class name for the file container                                                                                |
| onClick             | `function`                 |          |         | Click handler for the file container                                                                             |
| [actions](#actions) | `FilePreviewActionProps[]` |          | `[]`    | Click handler for the file container                                                                             |

#### Actions

For a file, you can prescribe actions that will be visible when you hover over it.

| Property   | Type                                                                                 | Required | Default | Description                    |
| ---------- | ------------------------------------------------------------------------------------ | -------- | ------- | ------------------------------ |
| id         | `String`                                                                             |          |         | Action id                      |
| icon       | `String`                                                                             | ✓        |         | Action icon                    |
| title      | `String`                                                                             | ✓        |         | Action hint on hover           |
| onClick    | `function`                                                                           |          |         | Action click handler           |
| href       | `String`                                                                             |          |         | Action button href             |
| extraProps | `ButtonHTMLAttributes<HTMLButtonElement> \| AnchorHTMLAttributes<HTMLAnchorElement>` |          |         | Additional action button props |
