<!--GITHUB_BLOCK-->

# ArrowToggle

<!--/GITHUB_BLOCK-->

`ArrowToggle` — это компонент для отображения иконки в виде стрелки, которая может вращаться в четырех направлениях. Подходит для отображения выпадающих списков, компонентов в свёрнутом состоянии и других элементов.

## Внешний вид

`ArrowToggle` поддерживает четыре направления: `top` (вверх), `right` (вправо), `bottom` (вниз) и `left` (влево).

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

## Размер

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

## Использование в качестве интерактивного элемента

Пример использования `ArrowToggle` с иконкой-переключателем:

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

## Свойства

| Имя       | Описание                                               |   Тип    | Значение по умолчанию |
| :-------- | :----------------------------------------------------- | :------: | :-------------------: |
| className | HTML-атрибут `class`.                                  | `string` |                       |
| direction | Задает направление `arrowToggle`.                      | `string` |      `"bottom"`       |
| size      | Размер `arrowToggle` (в пикселях).                     | `number` |         `16`          |
| qa        | HTML-атрибут `data-qa`, используется для тестирования. | `string` |                       |
