<!--GITHUB_BLOCK-->

## Password Input

<!--/GITHUB_BLOCK-->

```tsx
import {PasswordInput} from '@gravity-ui/uikit';
```

`TextInput` for typing passwords and other sensitive information. It can be rendered with copy and reveal buttons for more convinient usage.

### Copy button

This button allows users to easily copy the input value to their clipboard. You can hide this button with `hideCopyButton` boolean prop.

<!--LANDING_BLOCK
<ExampleBlock
    code={` <PasswordInput hideCopyButton={true} /> `}
>
  <UIKit.PasswordInput hideCopyButton={true}  />
</ExampleBlock>
LANDING_BLOCK-->

### Reveal button

The `hideRevealButton` prop allows users to toggle the visibility of the password.

<!--LANDING_BLOCK
<ExampleBlock
    code={` <PasswordInput hideRevealButton={true} /> `}
>
  <UIKit.PasswordInput hideRevealButton={true}  />
</ExampleBlock>
LANDING_BLOCK-->

### Properties

`TextInput` [properties](https://github.com/gravity-ui/uikit/blob/main/src/components/controls/TextInput/README.md#properties), with some exceptions and additions:

- `type` is omitted;

| Name                | Description                                                                |    Type    | Default |
| :------------------ | :------------------------------------------------------------------------- | :--------: | :-----: |
| hideCopyButton      | Show copy button                                                           | `boolean`  | `false` |
| hideRevealButton    | Show reveal button                                                         | `boolean`  | `false` |
| showCopyTooltip     | Determines whether to display the tooltip for the copy button              | `boolean`  | `false` |
| showRevealTooltip   | Determines whether to display the tooltip for the reveal button            | `boolean`  | `false` |
| revealValue         | Determines the visibility state of the password input field                | `boolean`  | `false` |
| onRevealValueUpdate | A callback function that is invoked whenever the revealValue state changes | `function` |         |

<!--GITHUB_BLOCK-->

#### Usage example

```tsx
function MyComponent() {
  const [value, setValue] = React.useState('');

  return <PasswordInput onUpdate={setValue} value={value} />;
}
```

<!--GITHUB_BLOCK-->
