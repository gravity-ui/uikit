<!--GITHUB_BLOCK-->

# Hotkey

<!--/GITHUB_BLOCK-->

```tsx
import {Hotkey} from '@gravity-ui/uikit';
```

Компонент `Hotkey` (горячая клавиша) позволяет отображать сочетания клавиш как для Mac, так и для PC.

### Значение

Сочетания клавиш задаются в формате `<key>+<key>`, т. е. несколько клавиш, разделенных знаком плюса, например, `shift+tab`.

Последовательности сочетаний клавиш могут быть разделены пробелом: `<shortcut> <shortcut>`, например, `ctrl+a ctrl+c ctrl+v`.

В качестве заменителя `cmd` на Mac и `ctrl` на других платформах можно использовать `mod`. Например, `mod+v` отображается как ⌘+A на Mac и как Ctrl+A на PC.

### `View` (вид)

`light` — используется для отображения на светлом фоне (по умолчанию).

`dark` — используется для отображения на темном фоне.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Hotkey view="light" value="mod+a mod+c mod+v" />
<Hotkey view="dark" value="mod+a mod+c mod+v" />
`}
>
    <UIKit.Hotkey view="light" value="mod+a mod+c mod+v" />
    <UIKit.Hotkey view="dark" value="mod+a mod+c mod+v" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Hotkey view="light" value="mod+a mod+c mod+v" />
<Hotkey view="dark" value="mod+a mod+c mod+v" />
```

<!--/GITHUB_BLOCK-->

### `Platform` (платформа)

`pc` — используется для отображения горячих клавиш для клавиатуры стандартного PC.

`mac` — используется для отображения горячих клавиш для клавиатуры Macintosh.

По умолчанию система автоматически определяет платформу.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Hotkey value="mod+a mod+c mod+v" />
<Hotkey platform="pc" value="mod+a mod+c mod+v" />
<Hotkey platform="mac" value="mod+a mod+c mod+v" />
`}
>
    <UIKit.Hotkey value="mod+a mod+c mod+v" />
    <UIKit.Hotkey platform="pc" value="mod+a mod+c mod+v" />
    <UIKit.Hotkey platform="mac" value="mod+a mod+c mod+v" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```
<Hotkey value="mod+a mod+c mod+v" />
<Hotkey platform="pc" value="mod+a mod+c mod+v" />
<Hotkey platform="mac" value="mod+a mod+c mod+v" />
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя       | Описание                                                                |          Тип          |    Значение по умолчанию    |
| :-------- | :---------------------------------------------------------------------- | :-------------------: | :-------------------------: |
| view      | Задает цветовую схему.                                                  |  `"light"` `"dark"`   |          `"light"`          |
| platform  | Определяет платформу (PC или Macintosh) для отображения горячих клавиш. |    `"pc"` `"mac"`     | Определяется автоматически. |
| title     | Значение горячих клавиш.                                                |       `string`        |                             |
| style     | HTML-атрибут `style`.                                                   | `React.CSSProperties` |                             |
| className | Имя класса алерта.                                                      |       `string`        |                             |
