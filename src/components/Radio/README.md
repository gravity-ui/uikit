<!--GITHUB_BLOCK-->

# Radio

<!--/GITHUB_BLOCK-->

```tsx
import {Radio} from '@gravity-ui/uikit';
```

The `Radio` component allows the users to select a single option from a list of choices.

## States

`Radio` can have the following states:

- Checked: Radio is selected.
- Disabled: Radio is unavailable for selection.

<!--SANDBOX
import {Box, Radio} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Radio value="option 1" content="Unchecked" size="l" checked={false} />
            <Radio value="option 2" content="Checked" size="l" checked />
            <Radio value="option 3" content="Disabled" size="l" disabled />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Radio value="option 1" content="Unchecked" size="l" checked={false}/>
<Radio value="option 2" content="Checked" size="l" checked/>
<Radio value="option 3" content="Disabled" size="l" disabled/>
```

<!--/GITHUB_BLOCK-->

## Size

To manage the `Radio` size, use the `size` property. The default size is `m`.

<!--SANDBOX
import {Radio} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Radio value="option 1" content="M Size" size="m" />
            <Radio value="option 2" content="L Size" size="l" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Radio value="option 1" content="M Size" size="m"/>
<Radio value="option 2" content="L Size" size="l"/>
```

<!--/GITHUB_BLOCK-->

## Label

You can assign a label to a `Radio` using the `content` property or provide it as a child property.

<!--SANDBOX
import {Radio} from '@gravity-ui/uikit';

export default function () {
    return (
        <div>
            <Radio content="Content" size="l" />
            <Box spacing={{mt: 2}}>
                <Radio size="l">
                    <span>Content as children</span>
                </Radio>
            </Box>
        </div>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<div>
  <Radio content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Radio size="l">
      <span>Content as children</span>
    </Radio>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name           | Description                                                                                              |                     Type                      | Default |
| :------------- | :------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-----: |
| children       | The content of the radio (usually, a label).                                                             |                  `ReactNode`                  |         |
| content        | The content of the radio (alternative to children).                                                      |                  `ReactNode`                  |         |
| disabled       | Toggles the `disabled` state of the radio.                                                               |                   `boolean`                   | `false` |
| checked        | Toggles the `checked` state of the radio.                                                                |                   `boolean`                   | `false` |
| defaultChecked | Sets the initial checked state when the component is mounted                                             |                   `boolean`                   | `false` |
| onUpdate       | Fires when the radio state is changed by the user and provides the checked value as a callback argument. |         `(checked: boolean) => void`          |         |
| onChange       | Fires when the radio state is changed by the user and provides the change event as a callback argument.  |                  `Function`                   |         |
| onFocus        | Event handler to use when the radio input element receives focus.                                        |                  `Function`                   |         |
| onBlur         | Event handler to use when the radio input element loses focus.                                           |                  `Function`                   |         |
| size           | Sets the size of the radio.                                                                              |                    `m` `l`                    |   `m`   |
| id             | `id` HTML attribute                                                                                      |                   `string`                    |         |
| qa             | `data-qa` HTML attribute, used for testing.                                                              |                   `string`                    |         |
| style          | `style` HTML attribute                                                                                   |             `React.CSSProperties`             |         |
| className      | `class` HTML attribute                                                                                   |                   `string`                    |         |
| title          | `title` HTML attribute                                                                                   |                   `string`                    |         |
| name           | `name` HTML attribute for the input element                                                              |                   `string`                    |         |
| value          | Control value                                                                                            |                   `string`                    |         |
| indeterminate  | Toggles the indeterminate state of the radio.                                                            |                   `boolean`                   | `false` |
| controlProps   | Additional propeties for the underlying input element                                                    | `React.InputHTMLAttributes<HTMLInputElement>` |         |
| controlRef     | Ref to the underlying input element                                                                      |         `React.Ref<HTMLInputElement>`         |         |
