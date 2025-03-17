<!--GITHUB_BLOCK-->

# Stepper

<!--/GITHUB_BLOCK-->

```tsx
import {Stepper} from '@gravity-ui/uikit';
```

`Stepper` convey progress through numbered steps. It provides a wizard-like workflow.Steppers display progress through a sequence of logical and numbered steps.

## Example

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Stepper>
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item>Step 2</Stepper.Item>
  <Stepper.Item>Step 3</Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>
`}
>
    <UIKit.Stepper>
        <UIKit.Stepper.Item>Step 1</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
  <Stepper value={0} onUpdate={(id) => alert(id)}>
    <Stepper.Item>Step 1</Stepper.Item>
    <Stepper.Item>Step 2</Stepper.Item>
    <Stepper.Item>Step 3</Stepper.Item>
    <Stepper.Item>Step 4 with very long title</Stepper.Item>
  </Stepper>
`}
>
    <UIKit.Stepper value={0} onUpdate={(id) => alert(id)}>
        <UIKit.Stepper.Item>Step 1</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Stepper>
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item view="error">Step 2</Stepper.Item>
  <Stepper.Item view="error">Step 3</Stepper.Item>
  <Stepper.Item view="success">Step 4</Stepper.Item>
</Stepper>
`}
>
    <UIKit.Stepper>
        <UIKit.Stepper.Item>Step 1</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="error">Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="error">Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="success">Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Stepper size="l">
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item>Step 2</Stepper.Item>
  <Stepper.Item>Step 3</Stepper.Item>
  <Stepper.Item>Step 4</Stepper.Item>
</Stepper>
`}
>
    <UIKit.Stepper size="l">
        <UIKit.Stepper.Item>Step 1</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Stepper>
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item disabled>Step 2</Stepper.Item>
  <Stepper.Item disabled>Step 3</Stepper.Item>
  <Stepper.Item disabled>Step 4 with very long title</Stepper.Item>
</Stepper>
`}
>
    <UIKit.Stepper>
        <UIKit.Stepper.Item>Step 1</UIKit.Stepper.Item>
        <UIKit.Stepper.Item disabled>Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item disabled>Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item disabled>Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Stepper>
  <Stepper.Item icon={<Icon data={Gear} />}>Step 1</Stepper.Item>
  <Stepper.Item view="error" icon={<Icon data={Gear} />}>Step 2</Stepper.Item>
  <Stepper.Item view="success" icon={<Icon data={Gear} />}>Step 3</Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>
`}
>
    <UIKit.Stepper>
        <UIKit.Stepper.Item icon={<UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />}>Step 1</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="error" icon={<UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />}>Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="success" icon={<UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd"></path></svg>
        )} size={18} />}>Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Stepper separator=">">
  <Stepper.Item>Step 1</Stepper.Item>
  <Stepper.Item view="error">Step 2</Stepper.Item>
  <Stepper.Item view="success">Step 3</Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>
`}
>
    <UIKit.Stepper separator=">">
        <UIKit.Stepper.Item>Step 1</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="error">Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="success">Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Stepper>
  <Tooltip content="fancy step with tooltip">
    <Stepper.Item>Step 1</Stepper.Item>
  </Tooltip>
  <Stepper.Item view="error">Step 2</Stepper.Item>
  <Stepper.Item view="success">Step 3</Stepper.Item>
  <Stepper.Item>Step 4 with very long title</Stepper.Item>
</Stepper>
`}
>
    <UIKit.Stepper>
        <UIKit.Tooltip content="fancy step with tooltip">
          <UIKit.Stepper.Item>Step 1</UIKit.Stepper.Item>
        </UIKit.Tooltip>
        <UIKit.Stepper.Item view="error">Step 2</UIKit.Stepper.Item>
        <UIKit.Stepper.Item view="success">Step 3</UIKit.Stepper.Item>
        <UIKit.Stepper.Item>Step 4 with very long title</UIKit.Stepper.Item>
    </UIKit.Stepper>
</ExampleBlock>

LANDING_BLOCK-->

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
