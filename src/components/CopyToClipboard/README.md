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

`pending` - the initial status that returned in render function in neutral state

`success` - the status that returned in render function in error state

`error` - the status that returned in render function in success state

Option `timeout` set the time in ms to restore `pending` (initial) status after `success` or `error` statuses.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<CopyToClipboard timeout={500} text="Some text to copy" timeout={1000}>
    {(state) => <Button view="normal" size="l">{state}</Button>}
</CopyToClipboard>
`}>
    <UIKit.CopyToClipboard text="Some text to copy" timeout={1000}>
        {(state) => <UIKit.Button view="normal" size="l">state</UIKit.Button>}
    </UIKit.CopyToClipboard>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const buttonText = {
  pending: 'Click Me',
  success: 'Copied!',
  error: "Couldn't copy...",
};

<CopyToClipboard text="Some text to copy" timeout={1000}>
  {(state) => <button>{buttonText[state]}</button>}
</CopyToClipboard>;
```

<!--/GITHUB_BLOCK-->

## Properties

| Property | Description                                                             | Type       | Default |
| :------- | :---------------------------------------------------------------------- | :--------- | :------ |
| children | Render function `(status: CopyToClipboardStatus) => React.ReactElement` | `Function` |         |
| onCopy   | `copy` event handler                                                    | `Function` |         |
| text     | Text to copy                                                            | `string`   |         |
| timeout  | Time in ms to restore initial state                                     | `number`   |         |
