<!--GITHUB_BLOCK-->

# Stepper

<!--/GITHUB_BLOCK-->

```tsx
import {Stepper} from '@gravity-ui/uikit';
```

`Stepper` convey progress through numbered steps. It provides a wizard-like workflow.Steppers display progress through a sequence of logical and numbered steps.

## Example

<!--SANDBOX
import {Stepper} from '@gravity-ui/uikit';

export default function () {
    return (
        <Stepper>
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item>Step 2</Stepper.Item>
            <Stepper.Item>Step 3</Stepper.Item>
            <Stepper.Item>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Stepper>
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item>Step 2</Stepper.Item>
  <Stepper.Item>Step 3</Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>
```

<!-- Storybook example -->

<StepperDefault />

<!--/GITHUB_BLOCK-->

### Interactive items

Use `onUpdate` and `value` props with custom state to manipulate steps

<!--SANDBOX
import {useState} from 'react';
import {Stepper} from '@gravity-ui/uikit';

export default function () {
    const [value, setValue] = useState(0);

    return (
        <Stepper value={value} onUpdate={setValue}>
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item>Step 2</Stepper.Item>
            <Stepper.Item>Step 3</Stepper.Item>
            <Stepper.Item>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const [value, setValue] = React.useState();

return (
  <Stepper value={value} onUpdate={setValue}>
    <Stepper.Item>Step 1</Stepper.Item>
    <Stepper.Item>Step 2</Stepper.Item>
    <Stepper.Item>Step 3</Stepper.Item>
    <Stepper.Item>Step 4 with very long title</Stepper.Item>
  </Stepper>
);
```

<!-- Storybook example -->

<StepperInteractiveShowcase />

<!--/GITHUB_BLOCK-->

### Different views

<!--SANDBOX
import {Stepper} from '@gravity-ui/uikit';

export default function () {
    return (
        <Stepper>
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item view="error">Step 2</Stepper.Item>
            <Stepper.Item view="error">Step 3</Stepper.Item>
            <Stepper.Item view="success">Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Stepper>
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item view="error">Step 2</Stepper.Item>
  <Stepper.Item view="error">Step 3</Stepper.Item>
  <Stepper.Item view="success">Step 4</Stepper.Item>
</Stepper>
```

<!-- Storybook example -->

<StepperView/>

<!--/GITHUB_BLOCK-->

### Different sizes

<!--SANDBOX
import {Stepper} from '@gravity-ui/uikit';

export default function () {
    return (
        <Stepper size="l">
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item>Step 2</Stepper.Item>
            <Stepper.Item>Step 3</Stepper.Item>
            <Stepper.Item>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Flex direction="column" gap={4}>
  <Stepper {...args} size="s">
    <Stepper.Item>Step 1</Stepper.Item>
    <Stepper.Item>Step 2</Stepper.Item>
    <Stepper.Item>Step 3</Stepper.Item>
  </Stepper>

  <Stepper {...args} size="m">
    <Stepper.Item>Step 1</Stepper.Item>
    <Stepper.Item>Step 2</Stepper.Item>
    <Stepper.Item>Step 3</Stepper.Item>
  </Stepper>

  <Stepper {...args} size="l">
    <Stepper.Item>Step 1</Stepper.Item>
    <Stepper.Item>Step 2</Stepper.Item>
    <Stepper.Item>Step 3</Stepper.Item>
  </Stepper>
</Flex>
```

<!-- Storybook example -->

<StepperSize/>

<!--/GITHUB_BLOCK-->

### Disabled steps

<!--SANDBOX
import {Stepper} from '@gravity-ui/uikit';

export default function () {
    return (
        <Stepper>
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item disabled>Step 2</Stepper.Item>
            <Stepper.Item disabled>Step 3</Stepper.Item>
            <Stepper.Item disabled>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Stepper>
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item disabled>Step 2</Stepper.Item>
  <Stepper.Item disabled>Step 3</Stepper.Item>
  <Stepper.Item disabled>Step 4 with very long title</Stepper.Item>
</Stepper>
```

<!-- Storybook example -->

<StepperDisabled/>

<!--/GITHUB_BLOCK-->

### Custom icons

<!--SANDBOX
import {Cloud, Gear, Hammer, Rocket} from '@gravity-ui/icons';
import {Icon, Stepper} from '@gravity-ui/uikit';

export default function () {
    return (
        <Stepper>
            <Stepper.Item icon={<Icon data={Gear} />}>Step 1</Stepper.Item>
            <Stepper.Item icon={<Icon data={Rocket} />}>Step 2</Stepper.Item>
            <Stepper.Item icon={<Icon data={Cloud} />}>Step 3</Stepper.Item>
            <Stepper.Item icon={<Icon data={Hammer} />}>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Stepper>
  <Stepper.Item icon={<Icon data={Gear} />}>Step 1</Stepper.Item>
  <Stepper.Item view="error" icon={<Icon data={Gear} />}>
    Step 2
  </Stepper.Item>
  <Stepper.Item view="success" icon={<Icon data={Gear} />}>
    Step 3
  </Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>
```

<!-- Storybook example -->

<StepperCustomIcons/>

<!--/GITHUB_BLOCK-->

### Custom step separator

<!--SANDBOX
import {Stepper, Text} from '@gravity-ui/uikit';

const Separator = () => {
    return <Text color="secondary">{'->'}</Text>;
};

export default function () {
    return (
        <Stepper separator={<Separator />}>
            <Stepper.Item>Step 1</Stepper.Item>
            <Stepper.Item view="error">Step 2</Stepper.Item>
            <Stepper.Item view="success">Step 3</Stepper.Item>
            <Stepper.Item>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
const Separator = () => {
  return <Text color="secondary">{'->'}</Text>;
};

<Stepper {...args} separator={<Separator />}>
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item view="error">Step 2</Stepper.Item>
  <Stepper.Item view="success">Step 3</Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>;
```

<!-- Storybook example -->

<StepperCustomSeparator/>

<!--/GITHUB_BLOCK-->

### Step with floating element

<!--SANDBOX
import {Stepper, Tooltip} from '@gravity-ui/uikit';

export default function () {
    return (
        <Stepper>
            <Tooltip content="fancy step with tooltip">
                <Stepper.Item>Step 1</Stepper.Item>
            </Tooltip>
            <Stepper.Item view="error">Step 2</Stepper.Item>
            <Stepper.Item view="success">Step 3</Stepper.Item>
            <Stepper.Item>Step 4 with very long title</Stepper.Item>
        </Stepper>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Stepper {...args}>
  <Tooltip content="fancy step with tooltip">
    <Stepper.Item>Step 1</Stepper.Item>
  </Tooltip>
  <Stepper.Item view="error">Step 2</Stepper.Item>
  <Stepper.Item view="success">Step 3</Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>
```

<!-- Storybook example -->

<StepperWithFloatingElements/>

<!--/GITHUB_BLOCK-->

## Properties

| Name             | Description                                               |                  Type                  | Default |
| :--------------- | :-------------------------------------------------------- | :------------------------------------: | :-----: |
| children         | Stepper items.                                            | `React.ReactElement<StepperItemProps>` |         |
| size             | Set the `Step` size.                                      |           `"s"` `"m"` `"l"`            |  `"s"`  |
| value            | Current selected `Step` id.                               |           `number` `string`            |         |
| onUpdate         | function for change current `Step`.                       |               `Function`               |         |
| qa               | `data-qa` HTML attribute, used for testing.               |                `string`                |         |
| separator        | Custom separator node.                                    |           `React.ReactNode`            |         |
| className        | CSS class name for the Steps container.                   |                `string`                |         |
| style            | Sets the inline style for the Steps container.            |            `CSSProperties`             |         |
| aria-label       | Defines a string value that labels the current element.   |                `string`                |         |
| aria-labelledby  | Identifies the element(s) that label the current element. |                `string`                |         |
| aria-describedby | Identifies the element(s) that describe the object.       |                `string`                |         |

### StepperItemProps

| Name      | Description                                       |              Type              | Default  |
| :-------- | :------------------------------------------------ | :----------------------------: | :------: |
| id        | Set `Step` id. Index of array element as default. |       `string` `number`        |          |
| view      | Set `Step` view.                                  | `"idle"` `"error"` `"success"` | `"idle"` |
| children  | `Step` content.                                   |          `React.Node`          |          |
| disabled  | Determines whether `Step` is disable.             |           `boolean`            |          |
| icon      | Custom icon node.                                 |         `SVGIconData`          |          |
| onClick   | Step click handler.                               |   `React.MouseEventHandler`    |          |
| className | CSS class name for the element.                   |            `string`            |          |

### CSS API

| Name                              | Description                           |
| :-------------------------------- | :------------------------------------ |
| `--g-stepper-gap`                 | Gap between step items and separator. |
| `--g-stepper-item-text-max-width` | Step item text max-width.             |
