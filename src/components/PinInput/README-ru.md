<!--GITHUB_BLOCK-->

# PinInput

<!--/GITHUB_BLOCK-->

```tsx
import {PinInput} from '@gravity-ui/uikit';
```

`PinInput` — это группа элементов для быстрого ввода последовательности числовых или алфавитно-цифровых значений. Чаще всего используется для ввода одноразовых паролей (OTP) или кодов подтверждения, получаемых через SMS, электронную почту или приложения-аутентификаторы.

Каждый элемент ввода принимает один символ за раз. После успешного ввода значения фокус перемещается на следующий элемент ввода, пока все поля не будут заполнены.

## Тип

По умолчанию элементы ввода принимают только числовые значения. Чтобы разрешить ввод алфавитно-цифровых значений, установите свойство `type` в значение `"alphanumeric"`:

<!--SANDBOX
import {PinInput} from '@gravity-ui/uikit';

export default function () {
    return <PinInput type="alphanumeric" />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput type="alphanumeric" />
```

<!--/GITHUB_BLOCK-->

## Размер

Данный компонент бывает 4 размеров: `s`, `m`, `l` и `xl`. Размер по умолчанию — `m`.

<!--SANDBOX
import {PinInput} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <PinInput size="s" />
            <PinInput size="m" />
            <PinInput size="l" />
            <PinInput size="xl" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput size="s" />
<PinInput size="m" />
<PinInput size="l" />
<PinInput size="xl" />
```

<!--/GITHUB_BLOCK-->

## Состояние

Если вы не хотите, чтобы пользователь взаимодействовал с компонентом, задайте свойство `disabled`:

<!--SANDBOX
import {PinInput} from '@gravity-ui/uikit';

export default function () {
    return <PinInput disabled />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput disabled />
```

<!--/GITHUB_BLOCK-->

Чтобы отобразить недопустимое состояние компонента, задайте значение `"invalid"` в свойстве `validationState`. Опционально можно задать текст сообщения об ошибке через свойство `errorMessage`.

<!--SANDBOX
import {PinInput} from '@gravity-ui/uikit';

export default function () {
    return <PinInput validationState="invalid" errorMessage="Incorrect PIN" />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput validationState="invalid" errorMessage="Incorrect PIN" />
```

<!--/GITHUB_BLOCK-->

## Заглушка

По умолчанию заглушка в элементах ввода отсутствует. Можно добавить ее с помощью свойства `placeholder`:

<!--SANDBOX
import {PinInput} from '@gravity-ui/uikit';

export default function () {
    return <PinInput placeholder="😎" />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput placeholder="😎" />
```

<!--/GITHUB_BLOCK-->

## Маска

Если нужно маскировать введенные значения, используйте свойство `mask`, которое работает аналогично `<input type="password"/>`:

<!--SANDBOX
import {PinInput} from '@gravity-ui/uikit';

export default function () {
    return <PinInput mask />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<PinInput mask />
```

<!--/GITHUB_BLOCK-->

## OTP

Если вы хотите, чтобы браузер предлагал одноразовые коды из внешнего контекста (например, SMS), задайте свойство `otp`.

## API

- `focus(): void` — переключает фокус на текущий активный элемент ввода.

## API CSS

| Имя                        | Описание                                                                                    |
| :------------------------- | :------------------------------------------------------------------------------------------ |
| `--g-pin-input-item-width` | Задает ширину каждого элемента ввода, если для `responsive` не установлено значение `true`. |
| `--g-pin-input-item-gap`   | Задает интервал между элементами ввода.                                                     |

## Свойства

| Имя              | Описание                                                                                                                                            |                     Тип                      | Значение по умолчанию |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------: | :-------------------: |
| apiRef           | `Ref` к [API](#api).                                                                                                                                |              `React.RefObject`               |                       |
| aria-describedby | HTML-атрибут `aria-describedby`.                                                                                                                    |                   `string`                   |                       |
| aria-label       | HTML-атрибут `aria-label`.                                                                                                                          |                   `string`                   |                       |
| aria-labelledby  | HTML-атрибут `aria-labelledby`.                                                                                                                     |                   `string`                   |                       |
| autoFocus        | Включает или отключает фокусировку на первом элементе ввода при первоначальной отрисовке.                                                           |                  `boolean`                   |                       |
| className        | HTML-атрибут `class`.                                                                                                                               |                   `string`                   |                       |
| defaultValue     | Начальное значение для неконтролируемого компонента.                                                                                                |                  `string[]`                  |                       |
| disabled         | Включает или отключает состояние `disabled`.                                                                                                        |                  `boolean`                   |                       |
| errorMessage     | Текст ошибки, расположенный в нижнем левом углу рядом с контейнером заметки. Отображается только если `validationState` имеет значение `"invalid"`. |              `React.ReactNode`               |                       |
| id               | Префикс HTML-атрибута `id` для элементов ввода. Полученный идентификатор также будет содержать часть `"-${index}"`.                                 |                   `string`                   |                       |
| length           | Количество полей ввода.                                                                                                                             |                   `number`                   |          `4`          |
| mask             | Если установлено значение `true`, вводимые значения будут скрыты, как в поле пароля.                                                                |                  `boolean`                   |                       |
| name             | Префикс HTML-атрибута `name` для элемента ввода.                                                                                                    |                   `string`                   |                       |
| form             | Ассоциированная форма базового элемента ввода.                                                                                                      |                   `string`                   |                       |
| note             | Элемент, расположенный в нижнем левом углу рядом с контейнером ошибки.                                                                              |              `React.ReactNode`               |                       |
| onUpdate         | Обратный вызов, срабатывающий при изменении любого из элементов ввода.                                                                              |         `(value: string[]) => void`          |                       |
| onUpdateComplete | Обратный вызов, срабатывающий при изменении любого из элементов ввода и заполнении всех полей ввода.                                                |         `(value: string[]) => void`          |                       |
| otp              | При установке значения `true` добавляет атрибут `autocomplete="one-time-code"` к элементам ввода.                                                   |                  `boolean`                   |                       |
| placeholder      | Заглушка для элементов ввода.                                                                                                                       |                   `string`                   |                       |
| qa               | HTML-атрибут `data-qa`, используется для тестирования.                                                                                              |                   `string`                   |                       |
| responsive       | Ширина родительского контейнера равномерно распределяется между элементами ввода.                                                                   |                  `boolean`                   |                       |
| size             | Размер поля ввода.                                                                                                                                  |           `"s"` `"m"` `"l"` `"xl"`           |         `"m"`         |
| style            | HTML-атрибут `style`.                                                                                                                               |            `React.CSSProperties`             |                       |
| type             | Определяет допустимые типы значений для ввода.                                                                                                      |         `"numeric"` `"alphanumeric"`         |      `"numeric"`      |
| validationState  | Состояние валидации, которое определяет внешний вид компонента.                                                                                     |                 `"invalid"`                  |                       |
| value            | Текущее значение для контролируемого компонента.                                                                                                    |                  `string[]`                  |                       |
| `onFocus`        | Обратный вызов, срабатывающий, когда компонент получает фокус.                                                                                      | `(event: React.FocusEvent<Element>) => void` |                       |
| `onBlur`         | Обратный вызов, срабатывающий, когда компонент теряет фокус.                                                                                        | `(event: React.FocusEvent<Element>) => void` |                       |
