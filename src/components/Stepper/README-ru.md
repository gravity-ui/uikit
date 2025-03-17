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
