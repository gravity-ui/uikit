<!--GITHUB_BLOCK-->

# Stepper

<!--/GITHUB_BLOCK-->

```tsx
import {Stepper} from '@gravity-ui/uikit';
```

`Stepper` - это компонент, который отображает прогресс при помощи последовательности пронумерованных шагов. Компонент обеспечивает возможность использования wizard-like процессов работы.

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

```jsx
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

Используйте `onUpdate` и `value` параметры вместе с кастомным состоянием для управления шагами

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

```jsx
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

```jsx
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

```jsx
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

```jsx
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
  <Stepper.Item icon={<Icon data={Rocket} />}>Step 2</Stepper.Item>
  <Stepper.Item icon={<Icon data={Cloud} />}>Step 3</Stepper.Item>
  <Stepper.Item icon={<Icon data={Hammer} />}>Step 4 with very long title</Stepper.Item>
</Stepper>
`}
>
    <UIKitExamples.StepperCustomIconExample />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Stepper>
  <Stepper.Item icon={<Icon data={Rocket} />}>Step 1</Stepper.Item>
  <Stepper.Item view="error" icon={<Icon data={CreditCard} />}>
    Step 2
  </Stepper.Item>
  <Stepper.Item view="success" icon={<Icon data={Cloud} />}>
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

```jsx
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

```jsx
<Stepper {...args} separator={<Separator />}>
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

| Name             | Description                                                                         |                  Type                  | Default |
| :--------------- | :---------------------------------------------------------------------------------- | :------------------------------------: | :-----: |
| children         | Дочерние элементы степера.                                                          | `React.ReactElement<StepperItemProps>` |         |
| size             | Задает размер степа.                                                                |           `"s"` `"m"` `"l"`            |  `"s"`  |
| value            | Текущий выбранный идентификатор степа.                                              |           `number` `string`            |         |
| onUpdate         | Функция для обновления текущего выбранного элемента.                                |               `Function`               |         |
| qa               | `data-qa` HTML атрибут, используется для тестирования.                              |                `string`                |         |
| separator        | Кастомная нода-разделитель степов.                                                  |           `React.ReactNode`            |         |
| className        | CSS имя класса Step контейнера.                                                     |                `string`                |         |
| style            | Задает инлайн-стили Step контейнера.                                                |            `CSSProperties`             |         |
| aria-label       | Определяет строковое значение, используемое в качестве метки для текущего элемента. |                `string`                |         |
| aria-labelledby  | Определяет элементы, используемые в качестве метки для текущего элемента.           |                `string`                |         |
| aria-describedby | Определяет элементы, описывающие объект.                                            |                `string`                |         |

### StepperItemProps

| Name      | Description                                                              |              Type              | Default  |
| :-------- | :----------------------------------------------------------------------- | :----------------------------: | :------: |
| id        | Идентификатора степа. Если не передан, берется значения индекса массива. |       `string` `number`        |          |
| view      | Внешний вид степа.                                                       | `"idle"` `"error"` `"success"` | `"idle"` |
| children  | Внутреннее содержимое степа.                                             |          `React.Node`          |          |
| disabled  | Устанавливает заблокированное состояние для степа.                       |           `boolean`            |          |
| icon      | Задает кастомную иконка степа                                            |         `SVGIconData`          |          |
| onClick   | Обработчик клика на степ                                                 |   `React.MouseEventHandler`    |          |
| className | CSS class name элемента                                                  |            `string`            |          |

### CSS API

| Name                              | Description                                    |
| :-------------------------------- | :--------------------------------------------- |
| `--g-stepper-gap`                 | Расстояние между степами и разделителем.       |
| `--g-stepper-item-text-max-width` | Максимальная ширина текстового контента степа. |
