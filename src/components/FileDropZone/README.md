<!--GITHUB_BLOCK-->

# FileDropZone

<!--/GITHUB_BLOCK-->

`FileDropZone` is an area for selecting files by drag and drop or with the system file dialog.

```tsx
import {FileDropZone, type DropZoneFileRejection} from '@gravity-ui/uikit';
```

### Basic Usage

```tsx
const accept = ['image/*'];
const handleUpdate = (acceptedItems: File[], rejectedItems: DropZoneFileRejection[]) => {
  // Do something with accepted and rejected files.
};

<FileDropZone accept={accept} onUpdate={handleUpdate} />;
```

### Custom Texts And Icons

```tsx
import {DatabaseFill, HeartCrack} from '@gravity-ui/icons';

const accept = ['image/*'];
const handleUpdateAccepted = (files: File[]) => {
  // Do something with files.
};

<FileDropZone
  accept={accept}
  onUpdateAccepted={handleUpdateAccepted}
  title="Lorem ipsum dolor sit amet"
  description="Duis consequat commodo eros sit"
  buttonText="Upload"
  icon={DatabaseFill}
  errorIcon={HeartCrack}
/>;
```

### Custom Layout

The Compound Component pattern allows rendering of an arbitrary layout. All props are passed only to the parent and shared via React context, while the subcomponents can only receive a `className`.

```tsx
const accept = ['image/*'];
const handleUpdateAccepted = (files: File[]) => {
  // Do something with files.
};

<FileDropZone
  accept={accept}
  onUpdateAccepted={handleUpdateAccepted}
  title="Lorem ipsum dolor sit amet"
  description="Duis consequat commodo eros sit"
  buttonText="Upload"
  icon={DatabaseFill}
  errorIcon={HeartCrack}
>
  <div
    style={{
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '32px',
      }}
    >
      <FileDropZone.Icon className={iconClassName} />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <FileDropZone.Title className={titleClassName} />
        <FileDropZone.Description className={descriptionClassName} />
      </div>
    </div>
    <div style={{marginLeft: '16px'}}>
      <FileDropZone.Button className={buttonClassName} />
    </div>
  </div>
</FileDropZone>;
```

### Accepted File Types

`accept` uses the format of the HTML `accept` attribute. A file is accepted when it matches at least one entry:

- an exact MIME type, e.g. `image/png`;
- a top-level wildcard, e.g. `image/*`;
- a file extension, e.g. `.csv` or `.md`, matched case-insensitively against the file name.

The same rules apply to dropped files and to files selected in the dialog.

While a file is only being dragged over the zone, its name is not available yet, so extension entries do not mark the drag as invalid. The final check runs on drop.

MIME entries are checked against `File.type`, which is provided by the operating system. It may be empty for unknown extensions (`File.type === ''`) or differ from what you expect: for example, Chrome on Windows reports `.csv` as `application/vnd.ms-excel` when Excel is installed and `.zip` as `application/x-zip-compressed`. The file dialog filters by extensions, so it can show such a file, but it is rejected with `invalid-type` after selection. To accept such files reliably, list the extension next to the MIME type, e.g. `['text/csv', '.csv']` or `['image/*', '.heic']`.

Empty and whitespace-only entries are ignored. A list without other entries accepts all file types, as the HTML `accept` attribute does.

## Properties

| Name             | Description                                                                                                                                                    |                                   Type                                    |                                                     Default                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: |
| accept           | Allowed file types: MIME types, top-level wildcards and file extensions. An empty list accepts all file types. See [Accepted file types](#accepted-file-types) |                                `string[]`                                 |                                                       `[]`                                                       |
| onUpdate         | A callback invoked when files are added. Receives accepted and rejected files in a single call                                                                 | `(acceptedItems: File[], rejectedItems: DropZoneFileRejection[]) => void` |                                                                                                                  |
| onUpdateAccepted | A callback invoked when accepted files are added                                                                                                               |                         `(items: File[]) => void`                         |                                                                                                                  |
| onUpdateRejected | A callback invoked with rejected files: dropped or selected files with a type that does not match `accept` and files beyond the first one in single-file mode  |                `(items: DropZoneFileRejection[]) => void`                 |                                                                                                                  |
| title            | A title displayed under the icon                                                                                                                               |                                 `string`                                  | `"Drag the file here or select it"` (`multiple=false`); `"Drag the files here or select them"` (`multiple=true`) |
| description      | A description displayed under the title                                                                                                                        |                                 `string`                                  |                                                                                                                  |
| buttonText       | An upload button label                                                                                                                                         |                                 `string`                                  |                     `"Select a file"` (`multiple=false`); `"Select files"` (`multiple=true`)                     |
| icon             | A custom icon component from `@gravity-ui/icons`. When null is passed, the icon is not rendered                                                                |                       `@gravity-ui/icons/IconData`                        |                                                                                                                  |
| errorIcon        | A custom error icon component from `@gravity-ui/icons`. When null is passed, the error icon is not rendered                                                    |                       `@gravity-ui/icons/IconData`                        |                                                                                                                  |
| className        | A root element className                                                                                                                                       |                                 `string`                                  |                                                                                                                  |
| multiple         | A boolean value that determines whether multiple files can be uploaded. When `false`, only one file is accepted                                                |                                 `boolean`                                 |                                                     `false`                                                      |
| disabled         | A boolean value that determines whether file uploading is disabled                                                                                             |                                 `boolean`                                 |                                                                                                                  |
| errorMessage     | An error message. If provided, error styles are also rendered                                                                                                  |                                 `string`                                  |                                                                                                                  |
| validationState  | Validation state. If set to `"invalid"`, error styles are rendered                                                                                             |                                `"invalid"`                                |                                                                                                                  |
| children         | Custom layout content. The compound subcomponents `FileDropZone.Icon`, `Title`, `Description`, and `Button` can be used only inside `FileDropZone`             |                             `React.ReactNode`                             |                                                                                                                  |
