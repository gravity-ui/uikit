<!--GITHUB_BLOCK-->

# ArrowToggle

<!--/GITHUB_BLOCK-->

`ArrowToggle` is a component that displaying chevron icon. It can rotate in 4 directions. It could be used for displaying dropdown lists or cut components, etc.

## Appearance

There is 4 directions of component: `top`, `right`, `bottom`, `left`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<ArrowToggle direction="right" />
`}>
    <UIKit.ArrowToggle direction="right" />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<ArrowToggle direction="right" />
```

<!--/GITHUB_BLOCK-->

## Size

<!--LANDING_BLOCK

<ExampleBlock
code={`
<ArrowToggle size={20} />
`}>
    <UIKit.ArrowToggle size={20} />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<ArrowToggle size={20} />
```

<!--/GITHUB_BLOCK-->

## Interactive

There is an example of usage ArrowToggle component with toggling icon.

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
