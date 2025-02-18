<!--GITHUB_BLOCK-->

# CopyToClipboard

<!--/GITHUB_BLOCK-->

```tsx
import {CopyToClipboard} from '@gravity-ui/uikit';
```

`CopyToClipboard` — это оберточный компонент, который копирует текст в буфер обмена и может изменять свое содержимое в зависимости от возвращенного статуса.

### Children (функция рендеринга)

Данная функция рендеринга передается в виде свойства `children`. Она может изменять свое содержимое в зависимости от статуса, возвращаемого в качестве первого аргумента.
Доступны три статуса — `pending`, `success` и `error`:

`pending` — исходный статус, возвращаемый функцией рендеринга в нейтральном состоянии;

`success` — статус результата, возвращаемый функцией рендеринга в случае успешного выполнения;

`error` — статус результата, возвращаемый функцией рендеринга в случае ошибки.

Параметр `timeout` устанавливает время в миллисекундах для возврата к исходному статусу (`pending`) после получения любого из статусов результата (`success` или `error`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const buttonText = {
  pending: 'Click Me',
  success: 'Copied!',
  error: "Couldn't copy...",
};

<CopyToClipboard text="Some text to copy" timeout={500}>
    {(status) => <Button view="normal" size="l">buttonText[status]</Button>
</CopyToClipboard>
`}>
    <UIKit.CopyToClipboard
        text="Some text to copy"
        timeout={500}
        children={(status) => {
            const buttonText = {
              pending: 'Click Me',
              success: 'Copied!',
              error: "Couldn't copy...",
            };

            return <UIKit.Button view="normal" size="l">{buttonText[status]}</UIKit.Button>;
        }}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const buttonText = {
  pending: 'Click Me',
  success: 'Copied!',
  error: "Couldn't copy...",
};

<CopyToClipboard text="Some text to copy" timeout={500}>
  {(status) => <button>{buttonText[status]}</button>}
</CopyToClipboard>;
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя      | Описание                                                                    |           Тип            | Значение по умолчанию |
| :------- | :-------------------------------------------------------------------------- | :----------------------: | :-------------------: |
| children | Функция рендеринга `(status: CopyToClipboardStatus) => React.ReactElement`. |        `Function`        |                       |
| onCopy   | Обработчик события `copy`.                                                  |        `Function`        |                       |
| text     | Копируемый текст (может быть строкой или функцией, возвращающей строку).    | `string \| () => string` |                       |
| timeout  | Время в миллисекундах для возврата к исходному статусу.                     |         `number`         |                       |
