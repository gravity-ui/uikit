<!--GITHUB_BLOCK-->

# ArrowToggle

<!--/GITHUB_BLOCK-->

`ArrowToggle` is a component for displaying the chevron icon. It can rotate in four directions and can be used to display drop-down lists, cut components, etc.

## Appearance

`ArrowToggle` has four possible directions: `top`, `right`, `bottom`, and `left`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<ArrowToggle direction="top" /> top
<ArrowToggle direction="right" /> right
<ArrowToggle direction="bottom" /> bottom
<ArrowToggle direction="left" /> left
`}>
    <UIKit.ArrowToggle direction="top" /> top
    <UIKit.ArrowToggle direction="right" /> right
    <UIKit.ArrowToggle direction="bottom" /> bottom
    <UIKit.ArrowToggle direction="left" /> left
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<ArrowToggle direction="top" /> top
<ArrowToggle direction="right" /> right
<ArrowToggle direction="bottom" /> bottom
<ArrowToggle direction="left" /> left
```

<!--/GITHUB_BLOCK-->

## Size

<!--LANDING_BLOCK

<ExampleBlock
code={`
<ArrowToggle size={10} /> 10
<ArrowToggle size={20} /> 20
<ArrowToggle size={30} /> 30
<ArrowToggle size={40} /> 40
<ArrowToggle size={50} /> 50
<ArrowToggle size={100} /> 100
`}>
    <UIKit.ArrowToggle size={10} /> 10
    <UIKit.ArrowToggle size={20} /> 20
    <UIKit.ArrowToggle size={30} /> 30
    <UIKit.ArrowToggle size={40} /> 40
    <UIKit.ArrowToggle size={50} /> 50
    <UIKit.ArrowToggle size={100} /> 100
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<ArrowToggle size={10} /> 10
<ArrowToggle size={20} /> 20
<ArrowToggle size={30} /> 30
<ArrowToggle size={40} /> 40
<ArrowToggle size={50} /> 50
<ArrowToggle size={100} /> 100
```

<!--/GITHUB_BLOCK-->

## Use as an interactive element

Here is an example of using ArrowToggle with a toggling icon:

<!--LANDING_BLOCK

<ExampleBlock
code={`
const [directionIndex, setDirectionIndex] = React.useState(0);
const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;
const direction = directions[directionIndex % directions.length];

return (
    <Button onClick={() => setDirectionIndex(directionIndex + 1)} view="flat">
        <ArrowToggle {...args} direction={direction} /> <h3>{direction}</h3>
    </Button>
);
`}>
    <UIKitExamples.ArrowToggleExample/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const [directionIndex, setDirectionIndex] = React.useState(0);
const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;
const direction = directions[directionIndex % directions.length];

return (
  <Button onClick={() => setDirectionIndex(directionIndex + 1)} view="flat">
    <ArrowToggle {...args} direction={direction} /> <h3>{direction}</h3>
  </Button>
);
```

<!--/GITHUB_BLOCK-->

## Properties

| Name      | Description                                |   Type   |  Default   |
| :-------- | :----------------------------------------- | :------: | :--------: |
| className | `class` HTML attribute                     | `string` |            |
| direction | Used to set the `arrowToggle` direction    | `string` | `"bottom"` |
| size      | `arrowToggle` size (in pixels)             | `number` |    `16`    |
| qa        | `data-qa` HTML attribute, used for testing | `string` |            |
