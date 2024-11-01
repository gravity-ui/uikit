<!--GITHUB_BLOCK-->

# Slider

<!--/GITHUB_BLOCK-->

```tsx
import {Slider} from '@gravity-ui/uikit';
```

`Slider` (слайдер) — это настраиваемый и отзывчивый React-компонент, который позволяет пользователям выбирать одно значение или диапазон значений из заданного набора данных.

## Варианты слайдера

### Одиночный слайдер

Представляет собой слайдер с одним ползунком для выбора одного значения. Используется по умолчанию.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider />
`}
>
    <UIKitExamples.SliderExample />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider />
```

<!--/GITHUB_BLOCK-->

### Слайдер диапазона

Представляет собой слайдер с двумя ползунками для выбора диапазона. Для его использования установите `defaultValue` (для неконтролируемого слайдера) или `value` (для контролируемого) в виде массива.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider defaultValue={[20, 40]} />
`}
>
    <UIKitExamples.SliderExample defaultValue={[20, 40]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider defaultValue={[20, 40]} />
```

<!--/GITHUB_BLOCK-->

## Состояния

### `Disabled`

Состояние `Slider`, при котором пользователь не может взаимодействовать с данным компонентом:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider disabled={true} />
`}
>
    <UIKitExamples.SliderExample disabled={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider disabled={true} />
```

<!--/GITHUB_BLOCK-->

### `Error`

Состояние `Slider`, которое указывает на некорректный ввод данных пользователем. Для изменения внешнего представления компонента `Slider` примените свойство `validationState`, задав ему значение `"invalid"`. Опционально можно задать текст сообщения об ошибке через свойство `errorMessage`. Он будет отображаться под слайдером.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider validationState={"invalid"} />
<Slider validationState={"invalid"} errorMessage="Error message" />
`}
>
    <UIKitExamples.SliderExample validationState={"invalid"} />
    <UIKitExamples.SliderExample validationState={"invalid"} errorMessage="Error message" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider validationState={"invalid"} />
<Slider validationState={"invalid"} errorMessage="Error message" />
```

<!--/GITHUB_BLOCK-->

## Размер

Размер `Slider` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider size="s" />
<Slider size="m" />
<Slider size="l" />
<Slider size="xl" />
`}
>
    <UIKitExamples.SliderExample size="s" />
    <UIKitExamples.SliderExample size="m" />
    <UIKitExamples.SliderExample size="l" />
    <UIKitExamples.SliderExample size="xl" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider size="s" />
<Slider size="m" />
<Slider size="l" />
<Slider size="xl" />
```

<!--/GITHUB_BLOCK-->

## Значение

### Минимальное и максимальное значения

Свойства `min` и `max` определяют пределы диапазона, который может обрабатывать `Slider`. Эти свойства необходимы для установки границ выбираемых значений.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider min={10} />
<Slider max={50} />
<Slider min={20} max={60} />
`}
>
    <UIKitExamples.SliderExample min={10} />
    <UIKitExamples.SliderExample max={50} />
    <UIKitExamples.SliderExample min={20} max={60} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider min={10} />
<Slider max={50} />
<Slider min={20} max={60} />
```

<!--/GITHUB_BLOCK-->

### `Step` (шаг)

Свойство `step` определяет шаги приращения и уменьшения в диапазоне минимального и максимального значений, т.е. на сколько изменяется значение при одном перемещении слайдера.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider step={10} />
`}
>
    <UIKitExamples.SliderExample step={10} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider step={10} />
```

<!--/GITHUB_BLOCK-->

### Метки

Свойство `marksCount` задает количество визуальных меток на слайдере, указывающих на разные значения в диапазоне от минимума до максимума. Данное свойство делает слайдер более удобным для пользователя и улучшает его визуальное оформление, особенно в тех случаях, когда необходимо обозначить конкретные интервалы. Значение по умолчанию для `marksCount` — 2 (минимальное и максимальное значения). При необходимости можно установить более высокое значение.

> Значение метки можно выбрать, даже если оно не соответствует шагу (`step`).

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marksCount={11} />
`}
>
    <UIKitExamples.SliderExample marksCount={11} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marksCount={11} />
```

<!--/GITHUB_BLOCK-->

### Доступные значения

Свойство `availableValues` используется для определения конкретных значений, которые может обрабатывать слайдер, в отличие от непрерывного диапазона. Это особенно полезно в случаях, когда выбор возможен только из заранее определенных дискретных значений. `availableValues` позволяет задать массив чисел, представляющих собой те значения, которые пользователи могут выбрать при работе с компонентом `Slider`.

> Свойство `availableValues` переопределяет `min`, `max`, `marksCount` и `step` (если они применяются одновременно); в этом случае слайдер будет использовать значения из указанного массива, а не непрерывный диапазон.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider availableValues={[10, 20, 50, 55, 65, 80]} />
`}
>
    <UIKitExamples.SliderExample availableValues={[10, 20, 50, 55, 65, 80]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider availableValues={[10, 20, 50, 55, 65, 80]} />
```

<!--/GITHUB_BLOCK-->

## Tooltip

Свойство `hasTooltip` является булевым атрибутом, который позволяет включать и отключать отображение всплывающей подсказки с текущим значением при перемещении слайдера пользователем.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider hasTooltip={true} />
`}
>
    <UIKitExamples.SliderExample hasTooltip={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider hasTooltip={true} />
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя                                  | Описание                                                                                                                                                               |                         Тип                          | Значение по умолчанию |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------: | :-------------------: |
| apiRef                               | Ссылка на свойства компонента `Slider`, отвечающие за получение и потерю фокуса.                                                                                       |                `RefObject<SliderRef>`                |                       |
| autoFocus                            | Атрибут `autofocus` для контрола.                                                                                                                                      |                      `boolean`                       |                       |
| [availableValues](#available-values) | Задает массив доступных значений для слайдера.                                                                                                                         |                      `number[]`                      |                       |
| className                            | Имя класса обертки контрола.                                                                                                                                           |                       `string`                       |                       |
| debounceDelay                        | Определяет задержку (в миллисекундах) перед вызовом функции обработки.                                                                                                 |                       `number`                       |          `0`          |
| [defaultValue](#slider-variants)     | Значение по умолчанию для контрола, используемое при неконтролируемом состоянии компонента.                                                                            |             `number` `[number, number]`              |          `0`          |
| [disabled](#disabled)                | Указывает на то, что пользователь не может взаимодействовать с контролом.                                                                                              |                      `boolean`                       |        `false`        |
| [errorMessage](#error)               | Отображаемое сообщение об ошибке.                                                                                                                                      |                       `string`                       |                       |
| [hasTooltip](#tooltip)               | Включает или отключает отображение всплывающей подсказки с текущим значением.                                                                                          |                      `boolean`                       |        `false`        |
| [marksCount](#marks)                 | Количество текстовых меток под слайдером, которые делят диапазон на равные части. Возможные значения: 2 и более. Свойство игнорируется, если задано `availablevalues`. |                       `number`                       |          `2`          |
| [max](#min-and-max-value)            | Максимальное значение компонента.                                                                                                                                      |                       `number`                       |         `100`         |
| [min](#min-and-max-value)            | Минимальное значение компонента.                                                                                                                                       |                       `number`                       |          `0`          |
| onBlur                               | Срабатывает, когда контрол теряет фокус. Передает событие фокуса в качестве аргумента обратного вызова.                                                                | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |                       |
| onUpdate                             | Срабатывает, когда пользователь изменяет значение слайдера. Передает событие изменения в качестве аргумента обратного вызова.                                          |   `((value: number \| [number, number]) => void)`    |                       |
| onUpdateComplete                     | Активируется при срабатывании `ontouchend` или `onmouseup`. Передает событие изменения в качестве аргумента обратного вызова.                                          |   `((value: number \| [number, number]) => void)`    |                       |
| onFocus                              | Срабатывает, когда контрол получает фокус. Передает событие фокуса в качестве аргумента обратного вызова.                                                              | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |                       |
| [size](#size)                        | Размер контрола.                                                                                                                                                       |               `"s"` `"m"` `"l"` `"xl"`               |         `"m"`         |
| [step](#step)                        | Шаги приращения и уменьшения при перемещении слайдера. Свойство игнорируется, если задано `availablevalues`.                                                           |                       `number`                       |          `1`          |
| tabIndex                             | Атрибут `tabIndex` для контрола.                                                                                                                                       |             `number` `[number, number]`              |                       |
| [validationState](#error)            | Состояние валидации.                                                                                                                                                   |                     `"invalid"`                      |                       |
| [value](#slider-variants)            | Значение контрола.                                                                                                                                                     |             `number` `[number, number]`              |                       |
