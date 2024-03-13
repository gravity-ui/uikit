<!--GITHUB_BLOCK-->

# Confirm

<!--/GITHUB_BLOCK-->

```tsx
import {Confirm} from '@gravity-ui/uikit';
```

`Confirm` is a utility component, which renders confirmation dialogs

## Properties

| Name               | Description                                                    |     Type      | Required |
| :----------------- | :------------------------------------------------------------- | :-----------: | :------: |
| title              | The confirm dialog title                                       |   `string`    |   Yes    |
| cancelButtonText   | The cancel button text                                         |   `string`    |   Yes    |
| confirmButtonText  | The ok button text                                             |   `string`    |   Yes    |
| message            | The confirmation message (used if the content is not provided) |   `string`    |          |
| content            | The confirmation custom content                                |  `ReactNode`  |          |
| confirmButtonProps | The ok button props                                            | `ButtonProps` |          |
| cancelButtonProps  | The cancel buttonProps                                         | `ButtonProps` |          |

And other Dialog props

## Usage

```tsx
import {Confirm} from '@gravity-ui/uikit';

const [open, setOpen] = React.useState(false);

return (
  <React.Fragment>
    <Button view="normal" onClick={() => setOpen(true)}>
      Show confirm
    </Button>
    <Confirm
      {...args}
      title="Do you want to confirm?"
      onConfirm={() => {
        alert('Confirmed');
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
      cancelButtonText="No"
      confirmButtonText="Yes"
      open={open}
      aria-labelledby="app-confirmation-dialog-title"
    />
  </React.Fragment>
);
```
