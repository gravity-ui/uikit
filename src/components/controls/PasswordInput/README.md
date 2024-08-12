## Password Input

```tsx
import {PasswordInput} from '@gravity-ui/uikit';
```

Password Input display component

### PropTypes

Same as [TextInput component](https://github.com/gravity-ui/uikit/blob/main/src/components/controls/TextInput/README.md), with some exceptions:

- `value` is required property;
- `onUpdate` is required property;
- `type` is omitted;

| Property         | Type      | Required | Default | Description                                                                  |
| :--------------- | :-------- | :------- | :------ | :--------------------------------------------------------------------------- |
| showCopyButton   | `boolean` |          |         | Show copy button                                                             |
| showRevealButton | `boolean` |          |         | Show reveal button                                                           |
| hasCopyTooltip   | `boolean` |          | `true`  | Disable the tooltip for the copy button. The tooltip will not be displayed   |
| hasRevealTooltip | `boolean` |          | `true`  | Disable the tooltip for the reveal button. The tooltip will not be displayed |

#### Usage example

```jsx harmony
function MyComponent() {
  const [value, setValue] = React.useState('');

  return (
    <PasswordInput
      showCopyButton={true}
      showRevealButton={true}
      onUpdate={setValue}
      value={value}
    />
  );
}
```
