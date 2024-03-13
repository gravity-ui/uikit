<!--GITHUB_BLOCK-->

# usePromiseDialog

<!--/GITHUB_BLOCK-->

```tsx
import {usePromiseDialog} from '@gravity-ui/uikit';
```

### Provider

Before usage, you should wrap your components with `PromiseDialogProvider`

```tsx
import {PromiseDialogProvider} from '@gravity-ui/uikit';

<PromiseDialogProvider>{children}</PromiseDialogProvider>;
```

`usePromiseDialog` is a utility hook, which allows you to open a dialog without adding a Dialog component to your code and controlling it's state

## Returns

Returns an object with `openDialog` property. `openDialog` is a generic function, which accepts a dialog content renderer and the dialog props. The content renderer provides an object
`{ onSuccess, asyncOnSuccess, onCancel, key }`.

- You should call `onSuccess` with the result of calling the dialog (in this case the promise result will be `{ success: true, value }`);
- `asyncOnSuccess` with the promise which resolves the result (the promise dialog result will be `{ success: true, value }`, but the dialog won't resolve and close in case of an error occurred in the promise, passed with the arguments)
- `onCancel` if you want to cancel the action (in this case the promise result will be `{ success: false }`).
- `key` is the unique dialog key. You should use it as the React key for your dialog.

```ts
function openDialog<ResultRype extends unknown>(
  renderContent: ({
    onSuccess,
    asyncOnSuccess,
    onCancel,
    key,
  }: {
    onSuccess: (value: ResultType) => void;
    asyncOnSuccess: (getValue: Promise<ResultRype>, onError: (error: unknown) => void) => void;
    onCancel: () => void;
    key: number;
  }) => React.ReactNode | React.ReactNode[],
  dialogProps?: Partial<DialogProps>,
): Promise<{
  success: boolean;
  value?: ResultType;
}>;
```

## Examples

#### Base

```tsx
import {Dialog, usePromiseDialog} from '@gravity-ui/uikit';

const {openDialog} = usePromiseDialog();

const handleOpenNoteEditor = useCallback(async () => {
  const result = await openDialog<string>(({onSuccess, onCancel, key}) => (
    <Dialog open onClose={onCancel} size="s" key={key}>
      <NoteEditor onSave={onSuccess} onCancel={onCancel} />
    </Dialog>
  ));

  if (result.success) {
    const note = result.value;
    alert(`Your note is ${note}`);
  } else {
    alert('You cancelled creating the note');
  }
}, [openDialog]);
```

#### Don't close dialog on error

```tsx
import {Dialog, usePromiseDialog} from '@gravity-ui/uikit';

const {openDialog} = usePromiseDialog();

const handleOpenNoteEditor = useCallback(async () => {
    const handleSave = (note: string) => {
        return new Promise<string>((resolve, reject) => {
            if (note) {
                resolve(note);
            } else {
                alert('Enter the note');
                reject();
            }
        });
    };

  const result = await openDialog<string>(
      ({asyncOnSuccess, onCancel, key}) => <Dialog open onClose={onCancel} size="s" key={key}>
          <NoteEditor onSave{(note: string) => asyncOnSuccess(handleSave(note), console.error)} onCancel={onCancel} />
      </Dialog>
  );

  if (result.success) {
    const note = result.value;
    alert(`Your note is ${note}`);
  } else {
    alert('You cancelled creating the note');
  }
}, [openDialog]);
```
