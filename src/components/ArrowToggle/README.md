<!--GITHUB_BLOCK-->

# ArrowToggle

<!--/GITHUB_BLOCK-->

```ts
import {ArrowToggle} from '@gravity-ui/uikit';
```

ArrowToggle is a component consists of chevron icon. It supports direction toggling.

## Appearance

There is 4 directions of component: `top`, `right`, `bottom`, `left`.

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

## Interactive

There is an example of usage ArrowToggle component with toggling icon

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

| Name          | Description                 |   Type   | Default  |
| :------------ | :-------------------------- | :------: | :------: |
| **className** | HTML `class` attribute      | `string` |          |
| **direction** | Sets arrowToggle directions | `string` | `bottom` |
| **size**      | Size arrowToggle in px      | `number` |   `16`   |
