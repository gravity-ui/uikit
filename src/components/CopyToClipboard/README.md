<!--GITHUB_BLOCK-->

# CopyToClipboard

<!--/GITHUB_BLOCK-->

```tsx
import {CopyToClipboard} from '@gravity-ui/uikit';
```

CopyToClipboard is a wrapper component that copies text to clipboard and can update its content depending on the returned status.

### Children (render function)

This is a render function provided as children properties. It can update its content depending on the status that is returned as the first argument in the render function.
There are three available statuses: pending, success, and error.

`pending`: Initial status returned in the render function in the neutral case.

`success`: Result status returned in the render function in case of success.

`error`: Result status returned in the render function in case of error.

The `timeout` option sets the time in ms to restore the initial (`pending`) status after one of the result statuses (`success` or `error`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const buttonText = {
  pending: 'Click Me',
  success: 'Copied!',
  error: "Couldn't copy...",
};

<CopyToClipboard text="Some text to copy" timeout={500}>
    {(status) => <Button view="normal" size="l">buttonText[status]</Button>
</CopyToClipboard>
`}>
    <UIKit.CopyToClipboard
        text="Some text to copy"
        timeout={500}
        children={(status) => {
            const buttonText = {
              pending: 'Click Me',
              success: 'Copied!',
              error: "Couldn't copy...",
            };

            return <UIKit.Button view="normal" size="l">{buttonText[status]}</UIKit.Button>;
        }}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const buttonText = {
  pending: 'Click Me',
  success: 'Copied!',
  error: "Couldn't copy...",
};

<CopyToClipboard text="Some text to copy" timeout={500}>
  {(status) => <button>{buttonText[status]}</button>}
</CopyToClipboard>;
```

<!--/GITHUB_BLOCK-->

## Properties

| Name     | Description                                                             |           Type           | Default |
| :------- | :---------------------------------------------------------------------- | :----------------------: | :-----: |
| children | `(status: CopyToClipboardStatus) => React.ReactElement` render function |        `Function`        |         |
| onCopy   | `copy` event handler                                                    |        `Function`        |         |
| text     | Text to copy (can be a string or a function that returns a string)      | `string \| () => string` |         |
| timeout  | Time in ms to restore the initial status                                |         `number`         |         |
