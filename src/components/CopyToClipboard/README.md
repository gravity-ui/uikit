<!--GITHUB_BLOCK-->

# CopyToClipboard

<!--/GITHUB_BLOCK-->

```tsx
import {CopyToClipboard} from '@gravity-ui/uikit';
```

CopyToClipboard is a wrapper component that copies given text to clipboard and can update its content depends on returned status.

### Children (render function)

The render function passed as children props and can update its content depends on status that is returned as first argument in render function.
There are 3 available statuses: pending, success, error

`pending` - the initial status returned in render function in neutral case

`success` - the result status returned in render function in success case

`error` - the result status returned in render function in error case

Option `timeout` set the time in ms to restore initial (`pending`) status after one of the result statuses (`success` or `error`).

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

| Name       | Description                                                             |    Type    | Default |
| :--------- | :---------------------------------------------------------------------- | :--------: | :-----: |
| children   | Render function `(status: CopyToClipboardStatus) => React.ReactElement` | `Function` |         |
| onCopy     | `copy` event handler                                                    | `Function` |         |
| text       | Text to copy                                                            |  `string`  |         |
| timeout    | Time in ms to restore initial state                                     |  `number`  |         |
| nativeCopy | Use native clipboard methods instead of `copy-to-clipboard` lib         |  `number`  |         |
