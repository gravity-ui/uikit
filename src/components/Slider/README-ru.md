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

Представляет собой слайдер с двумя ползунками для выбора диапазона. Для его использования необходимо задать `defaultValue` (для неконтролируемого компонента) или `value` (для контролируемого компонента) в виде массива.

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

### `Disabled` (отключен)

Состояние `Slider`, при котором пользователь не может взаимодействовать с компонентом.

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

### `Error` (ошибка)

Состояние `Slider`, которое указывает на некорректный ввод данных пользователем. Для изменения внешнего представления `Slider` примените свойство `validationState`, задав ему значение `"invalid"`. Дополнительно через свойство `errorMessage` можно добавить текст сообщения, который будет отображаться под компонентом.

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

Для изменения размера `Slider` используйте свойство `size`. Размер по умолчанию — `m`.

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

Свойство `step` компонента `Slider` задает величину шага между минимальным и максимальным значениями. Оно контролирует изменение значения при перемещении ползунка.

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

Свойство `marks` задает количество визуальных меток компонента `Slider`, указывающих на разные значения в диапазоне от минимума до максимума. Данное свойство делает слайдер более удобным для пользователя и улучшает его визуальное оформление, особенно в тех случаях, когда необходимо обозначить конкретные интервалы. Значение по умолчанию — 2 (`min` и `max`). Его можно использовать двумя способами:

- Для задания количества визуальных меток на слайдере:
<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={11} />
`}
>
    <UIKitExamples.SliderExample marks={11} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={11} />
```

<!--/GITHUB_BLOCK-->

- Для указания массива значений меток на слайдере:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={[0, 50, 100]} />
`}
>
    <UIKitExamples.SliderExample marks={[0, 50, 100]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={[0, 50, 100]} />
```

<!--/GITHUB_BLOCK-->

Если в свойстве `marks` указать `0` или пустой массив (`[]`), то все метки компонента `Slider` будут скрыты.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={0} />
`}
>
    <UIKitExamples.SliderExample marks={0} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={0} />
```

<!--/GITHUB_BLOCK-->

> Значение метки можно выбрать, даже если оно не соответствует шагу (`step`).

Формат отображения значений меток можно изменить с помощью свойства `marksFormat`.

#### Определение доступных значений

Установка свойства `step` в `null` позволяет задать конкретные значения, которые будут доступны на слайдере, вместо непрерывного диапазона. Это особенно полезно в случаях, когда выбор возможен только из заранее определенных дискретных значений. При такой настройке свойства `min`, `max` и `marks` позволяют задать массив чисел, представляющих собой те значения, которые пользователи могут выбрать при работе с компонентом `Slider`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider marks={[10, 20, 50, 55, 65, 80]} step={null}/>
`}
>
    <UIKitExamples.SliderExample marks={[10, 20, 50, 55, 65, 80]} step={null}/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider marks={[10, 20, 50, 55, 65, 80]} step={null} />
```

<!--/GITHUB_BLOCK-->

## Тултип

Свойство `tooltipDisplay` в компоненте `Slider` управляет поведением отображения тултипа с текущим значением при взаимодействии пользователя со слайдером. Значение `auto` позволяет отображать тултип только при наведении курсора на ползунок компонента `Slider` или получении компонентом фокуса.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Slider tooltipDisplay="on" />
`}
>
    <UIKitExamples.SliderExample tooltipDisplay="on" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Slider tooltipDisplay="on" />
```

<!--/GITHUB_BLOCK-->

Формат отображения значения тултипа можно изменить с помощью свойства `tooltipFormat`. Если не указать `tooltipformat`, то для отображения значения в тултипе будет использовано свойство `marksFormat`.

## Свойства

| Имя                                         | Описание                                                                                                                                                                                                                                       |                         Тип                          | Значение по умолчанию |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------: | :-------------------: |
| apiRef                                      | Ссылка на свойства `focus` and `blur` компонента `Slider`.                                                                                                                                                                                     |                `RefObject<SliderRef>`                |                       |
| autoFocus                                   | Атрибут `autofocus` для контрола.                                                                                                                                                                                                              |                      `boolean`                       |                       |
| [availableValues](#define-available-values) | Устаревшее свойство; вместо него используйте `marks` и `step === null`. Задает массив доступных значений для слайдера.                                                                                                                         |                      `number[]`                      |                       |
| className                                   | Имя класса обертки контрола.                                                                                                                                                                                                                   |                       `string`                       |                       |
| debounceDelay                               | Устаревшее свойство; используйте внешний дебаунсинг. Определяет задержку (в миллисекундах) перед вызовом функции обработки.                                                                                                                    |                       `number`                       |          `0`          |
| [defaultValue](#slider-variants)            | Значение по умолчанию для контрола, используемое при неконтролируемом состоянии компонента.                                                                                                                                                    |             `number` `[number, number]`              |          `0`          |
| [disabled](#disabled)                       | Указывает на то, что пользователь не может взаимодействовать с контролом.                                                                                                                                                                      |                      `boolean`                       |        `false`        |
| [errorMessage](#error)                      | Отображаемый текст ошибки.                                                                                                                                                                                                                     |                       `string`                       |                       |
| [hasTooltip](#tooltip)                      | Устаревшее свойство; вместо него используйте `tooltipDisplay`. Включает или отключает отображение тултипа с текущим значением компонента.                                                                                                      |                      `boolean`                       |        `false`        |
| [marks](#marks)                             | Текстовые метки под слайдером. В данном свойстве можно задать количество меток или массив значений, для которых они должны отображаться. При указании `0` или `[]` метки не отображаются.                                                      |                 `number` `number[]`                  |          `2`          |
| [marksCount](#marks)                        | Устаревшее свойство; вместо него используйте `marks`. Количество меток под слайдером. Делит весь диапазон на равные части. Минимальное значение — `2`. Игнорируется, если задано `availablevalues` (устаревшее свойство).                      |                       `number`                       |          `2`          |
| [marksFormat](#marks)                       | Определяет форматирование отображаемого значения метки.                                                                                                                                                                                        |             `(value: number) => string`              |                       |
| [max](#min-and-max-value)                   | Максимальное значение компонента.                                                                                                                                                                                                              |                       `number`                       |         `100`         |
| [min](#min-and-max-value)                   | Минимальное значение компонента.                                                                                                                                                                                                               |                       `number`                       |          `0`          |
| onBlur                                      | Срабатывает, когда контрол теряет фокус. Передает событие фокуса в качестве аргумента обратного вызова.                                                                                                                                        | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |                       |
| onUpdate                                    | Срабатывает, когда пользователь изменяет значение слайдера. Передает событие изменения в качестве аргумента обратного вызова.                                                                                                                  |   `((value: number \| [number, number]) => void)`    |                       |
| onUpdateComplete                            | Активируется при срабатывании события `ontouchend` (завершение касания) или `onmouseup` (отпускание кнопки мыши). Передает событие изменения в качестве аргумента обратного вызова.                                                            |   `((value: number \| [number, number]) => void)`    |                       |
| onFocus                                     | Срабатывает, когда контрол получает фокус. Передает событие фокуса в качестве аргумента обратного вызова.                                                                                                                                      | `((e: FocusEvent<HTMLDivElement, Element>) => void)` |                       |
| [size](#size)                               | Размер контрола.                                                                                                                                                                                                                               |               `"s"` `"m"` `"l"` `"xl"`               |         `"m"`         |
| [step](#step)                               | Величина, на которую изменяется значение слайдера при каждом перемещении ползунка. Если установить значение `null`, в качестве шагов будет использоваться свойство `marks`. Игнорируется, если задано `availablevalues` (устаревшее свойство). |                   `number` `null`                    |          `1`          |
| tabIndex                                    | Атрибут `tabIndex` для контрола.                                                                                                                                                                                                               |             `number` `[number, number]`              |                       |
| [tooltipDisplay](#tooltip)                  | Управляет поведением отображения тултипа.                                                                                                                                                                                                      |                  `off` `on` `auto`                   |         `off`         |
| [tooltipFormat](#tooltip)                   | Определяет форматирование отображаемого значения тултипа. Если значение не задано, используется `marksFormat`.                                                                                                                                 |             `(value: number) => string`              |                       |
| [validationState](#error)                   | Состояние валидации.                                                                                                                                                                                                                           |                     `"invalid"`                      |                       |
| [value](#slider-variants)                   | Значение контрола.                                                                                                                                                                                                                             |             `number` `[number, number]`              |                       |