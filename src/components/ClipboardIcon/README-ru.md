<!--GITHUB_BLOCK-->

# ClipboardIcon

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardIcon} from '@gravity-ui/uikit';
```

Этот компонент в основном используется вместе с `CopyToClipboard` в качестве обертки.

### Статус

Иконка будет изменяться в зависимости от значения свойства `status`.

<!--SANDBOX
import {ClipboardIcon} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <ClipboardIcon size={24} />
            <ClipboardIcon size={24} status="success" />
            <ClipboardIcon size={24} status="error" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<CopyToClipboard text="Some text to copy" timeout={500}>
  {(status) => <ClipboardIcon size={24} status={status} />}
</CopyToClipboard>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя       | Описание                                           | Тип      | Значение по умолчанию |
| :-------- | :------------------------------------------------- | :------- | :-------------------- |
| className | HTML-атрибут `class`.                              | `string` |                       |
| size      | Определяет размер иконки.                          | `number` |                       |
| status    | Принимает значения `pending`, `success` и `error`. | `string` |                       |
