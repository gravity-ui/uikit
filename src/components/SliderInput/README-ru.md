<!--GITHUB_BLOCK-->

# SliderInput

<!--/GITHUB_BLOCK-->

```tsx
import {SliderInput} from '@gravity-ui/uikit';
```

`SliderInput` — числовой контрол, объединяющий текстовое поле и примыкающий к его нижней границе слайдер: пользователь может либо ввести точное значение, либо выбрать его перетаскиванием ручки слайдера.

Слайдер и значение формы используют каноническое значение. В поле временно может отображаться черновик вне сетки или недопустимый черновик; допустимое число публикуется сразу, а `Enter` или потеря фокуса приводят числовой черновик к ближайшему допустимому значению и восстанавливают недопустимый текст до канонического значения.

## Использование

По умолчанию `SliderInput` неуправляемый, начальное значение задаётся через `defaultValue`:

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput defaultValue={50} aria-label="Значение" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput defaultValue={50} aria-label="Значение" />
```

<!--/GITHUB_BLOCK-->

Для управляемого режима передайте `value` и обновляйте его в `onUpdate`:

```tsx
const [value, setValue] = React.useState(50);

<SliderInput value={value} onUpdate={setValue} aria-label="Значение" />;
```

В управляемом компоненте `value` остаётся источником истины. Если родитель не принимает запрошенное значение, компонент восстанавливает переданный `value` и не вызывает `onUpdateComplete`. Асинхронное принятие после завершения взаимодействия не вызывает завершение задним числом; отличающееся внешнее значение отменяет активное взаимодействие.

`onUpdate` вызывается для каждого допустимого числового значения во время взаимодействия: при движении слайдера и при вводе допустимого значения. `onUpdateComplete` вызывается один раз, когда принятое взаимодействие завершается изменившимся значением: при отпускании слайдера, по `Enter`, при потере фокуса полем или keyup после числового шага с клавиатуры. Он не вызывается для действия без изменения, возврата к начальному значению или blur после `Enter`.

## Домен значений

`min`, `max`, `step` и `marks` работают так же, как в [Slider](https://github.com/gravity-ui/uikit/tree/main/src/components/Slider):

- `step={null}` ограничивает допустимые значения только метками и краями диапазона;
- `marks` принимает либо количество равномерно распределённых меток, либо массив значений;
- значения вне домена (включая `value` и `defaultValue`) приводятся к ближайшему допустимому.

`markFormat` влияет только на представление. Пустая строка всё равно оставляет соответствующую метку доступной для выбора. Как и у используемой версии `Slider`, поддержка шага `1e-7` и меньше не входит в контракт `SliderInput`.

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput min={0} max={100} step={null} marks={[0, 25, 50, 75, 100]} defaultValue={50} aria-label="Значение" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput min={0} max={100} step={null} marks={[0, 25, 50, 75, 100]} defaultValue={50} />
```

<!--/GITHUB_BLOCK-->

## Работа с клавиатуры

Компонент содержит две позиции табуляции: текстовое поле и ручку слайдера. Если `min` равен `max`, в табуляции остаётся только текстовое поле.

Когда фокус находится в текстовом поле:

- `ArrowUp`/`ArrowDown` перемещают значение к соседнему допустимому. Если в поле набран черновик, являющийся числом, шаг делается от набранного числа;
- `Home`/`End` перемещают его к `min`/`max`;
- `Enter` коммитит текущий черновик, приводя его к ближайшему допустимому значению.

Ручка слайдера поддерживает обычное клавиатурное взаимодействие `Slider`.

## Размер

Размер `SliderInput` задаётся свойством `size`. Размер по умолчанию — `m`.

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput size="s" defaultValue={25} aria-label="Маленький" />
            <SliderInput size="m" defaultValue={50} aria-label="Средний" />
            <SliderInput size="l" defaultValue={75} aria-label="Большой" />
            <SliderInput size="xl" defaultValue={100} aria-label="Очень большой" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput size="s" />
<SliderInput size="m" />
<SliderInput size="l" />
<SliderInput size="xl" />
```

<!--/GITHUB_BLOCK-->

## Состояния

`disabled` запрещает любое взаимодействие, `validationState="invalid"` с необязательным `errorMessage` отображает состояние ошибки. Дополнительное описание можно передать через `note`.

Внешний `aria-describedby`, описания из `note` и `errorMessage` передаются и полю, и ручке слайдера; у оборачивающей группы описания нет. Используйте `controlProps` только для дополнительных атрибутов и обработчиков видимого текстового поля.

<!--SANDBOX
import {Box, SliderInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <Box width="100%" maxWidth={300}>
            <SliderInput defaultValue={50} disabled aria-label="Недоступен" />
            <SliderInput defaultValue={70} validationState="invalid" errorMessage="Недопустимое значение" aria-label="Ошибка" />
        </Box>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<SliderInput defaultValue={50} disabled />
<SliderInput defaultValue={70} validationState="invalid" errorMessage="Недопустимое значение" />
```

<!--/GITHUB_BLOCK-->

## Использование в формах

Для использования внутри формы передайте `name`. Скрытый input — единственное поле с именем; он отправляет последнее каноническое значение, даже если `requestSubmit()` вызван до blur. Нажатие `Enter` коммитит черновик до нативной отправки формы. Отключённый компонент не попадает в данные формы, а компонент с `min === max` всё равно отправляет фиксированное значение.

При нативном сбросе снимок закоммиченного значения на момент монтирования нормализуется в текущем домене и восстанавливается. Если он отличается от текущего значения, вызывается `onUpdate`, но не `onUpdateComplete`. Отмена сброса через `event.preventDefault()` не поддерживается общим хуком сброса.

```tsx
<form>
  <SliderInput name="amount" defaultValue={35} aria-label="Сумма" />
</form>
```

## Свойства

| Имя              | Описание                                                                                                                 |              Тип              | Значение по умолчанию |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------: | :-------------------: |
| autoComplete     | HTML-атрибут `autocomplete`                                                                                              |      `boolean` `string`       |                       |
| autoFocus        | HTML-атрибут `autofocus`                                                                                                 |           `boolean`           |                       |
| className        | Имя класса обёртки контрола                                                                                              |           `string`            |                       |
| aria-describedby | ID элементов, описывающих и поле, и ручку слайдера                                                                       |           `string`            |                       |
| aria-label       | Доступное имя, передаваемое и полю, и ручке слайдера                                                                     |           `string`            |                       |
| aria-labelledby  | ID элементов, задающих имя и полю, и ручке слайдера                                                                      |           `string`            |                       |
| controlProps     | Дополнительные HTML-атрибуты и обработчики видимого поля                                                                 |   `SliderInputControlProps`   |                       |
| controlRef       | React-реф видимого элемента input                                                                                        | `React.Ref<HTMLInputElement>` |                       |
| defaultValue     | Значение по умолчанию для неуправляемого режима                                                                          |           `number`            |         `min`         |
| disabled         | Признак недоступности контрола для действий пользователя                                                                 |           `boolean`           |        `false`        |
| endContent       | Пользовательский узел после поля ввода                                                                                   |       `React.ReactNode`       |                       |
| errorMessage     | Содержимое ошибки под контролом при `validationState="invalid"`                                                          |       `React.ReactNode`       |                       |
| form             | Связанный элемент формы                                                                                                  |           `string`            |                       |
| id               | HTML-атрибут `id`                                                                                                        |           `string`            |                       |
| label            | Подпись слева от поля ввода                                                                                              |           `string`            |                       |
| marks            | Метки под слайдером: количество меток или массив значений. `0` или пустой массив скрывает все метки                      |      `number` `number[]`      |          `2`          |
| markFormat       | Форматтер отображаемого значения метки                                                                                   |  `(value: number) => string`  |                       |
| max              | Максимальное значение компонента                                                                                         |           `number`            |         `100`         |
| min              | Минимальное значение компонента                                                                                          |           `number`            |          `0`          |
| name             | Имя поля формы, отправляется одно каноническое значение                                                                  |           `string`            |                       |
| note             | Необязательный элемент под контролом                                                                                     |       `React.ReactNode`       |                       |
| onBlur           | Вызывается, когда фокус покидает контрол целиком (и поле, и слайдер)                                                     |   `(e: FocusEvent) => void`   |                       |
| onFocus          | Вызывается, когда фокус попадает в контрол                                                                               |   `(e: FocusEvent) => void`   |                       |
| onUpdate         | Вызывается при изменении закоммиченного значения пользователем                                                           |   `(value: number) => void`   |                       |
| onUpdateComplete | Вызывается при завершении взаимодействия с изменившимся значением: отпускание слайдера, `Enter`, blur, шаги с клавиатуры |   `(value: number) => void`   |                       |
| placeholder      | Текст-подсказка при пустом значении                                                                                      |           `string`            |                       |
| qa               | HTML-атрибут `data-qa`, используется в тестировании                                                                      |           `string`            |                       |
| ref              | React-реф оборачивающего элемента                                                                                        |  `React.Ref<HTMLDivElement>`  |                       |
| size             | Размер контрола                                                                                                          |   `"s"` `"m"` `"l"` `"xl"`    |         `"m"`         |
| startContent     | Пользовательский узел перед полем ввода                                                                                  |       `React.ReactNode`       |                       |
| step             | Шаг изменения значения. Значение `null` делает шагами метки `marks`                                                      |        `number` `null`        |          `1`          |
| style            | Стили обёртки контрола                                                                                                   |     `React.CSSProperties`     |                       |
| tabIndex         | HTML-атрибут `tabIndex`, применяется и к полю, и к ручке слайдера                                                        |           `number`            |                       |
| validationState  | Состояние валидации                                                                                                      |          `"invalid"`          |                       |
| value            | Значение контрола, делает компонент управляемым                                                                          |           `number`            |                       |
