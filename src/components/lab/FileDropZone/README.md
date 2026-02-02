<!--GITHUB_BLOCK-->

# FileDropZone

<!--/GITHUB_BLOCK-->

```tsx
import {FileDropZone} from '@gravity-ui/uikit';
```

### Basic Usage

```tsx
const accept = ['image/*'];
const handleUpdate = (files: File[]) => {
  // Do something with files
};

<FileDropZone accept={accept} onUpdate={handleUpdate} />;
```

### Custom Texts And Icons

```tsx
import {DatabaseFill, HeartCrack} from '@gravity-ui/icons';

const accept = ['image/*'];
const handleUpdate = (files: File[]) => {
  // Do something with files
};

<FileDropZone
  accept={accept}
  onUpdate={handleUpdate}
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
const handleUpdate = (files: File[]) => {
  // Do something with files
};

<FileDropZone
  accept={accept}
  onUpdate={handleUpdate}
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

## Properties

| Name         | Description                                                                                                 |             Type             |                  Default                   |
| :----------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------: | :----------------------------------------: |
| accept       | A list of MIME types for allowed files                                                                      |          `string[]`          |                                            |
| onUpdate     | A callback invoked when files are added. Won't be called if a type is not acceptable                        |  `(files: File[]) => void`   |                                            |
| title        | A title displayed under the icon                                                                            |           `string`           | "Drag the file(s) here or select it(them)" |
| description  | A description displayed under the title                                                                     |           `string`           |                                            |
| buttonText   | An upload button label                                                                                      |           `string`           |             "Select a file(s)"             |
| icon         | A custom icon component from `@gravity-ui/icons`. When null is passed, the icon is not rendered             | `@gravity-ui/icons/IconData` |                                            |
| errorIcon    | A custom error icon component from `@gravity-ui/icons`. When null is passed, the error icon is not rendered | `@gravity-ui/icons/IconData` |                                            |
| className    | A root element className                                                                                    |           `string`           |                                            |
| multiple     | A boolean value that determines whether multiple file uploads are allowed                                   |                              |                                            |
| disabled     | A boolean value that determines whether file uploading is disabled                                          |                              |                                            |
| errorMessage | An error message. If provided, error styles are also rendered                                               |           `string`           |                                            |
