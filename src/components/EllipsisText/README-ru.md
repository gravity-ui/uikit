<!--GITHUB_BLOCK-->

# EllipsisText

<!--/GITHUB_BLOCK-->

```tsx
import {EllipsisText} from '@gravity-ui/uikit';
```

Компонент `EllipsisText` обрезает однострочный текст, который не помещается в контейнер, заменяя скрытую часть символом многоточия (`…`). В отличие от обычного CSS-свойства `text-overflow: ellipsis`, он позволяет выбрать место обрезки текста — в начале (`start`), середине (`center`) или конце (`end`) — и сохраняет полный текст доступным для программ чтения с экрана (через визуально скрытый текст) и для копирования.

Как и для CSS-многоточия, для обрезки текста нужна определённая ширина на одном из уровней раскладки.

## Позиция

Свойство `position` управляет местом обрезки текста. Значение по умолчанию — `end`. Возможные значения: `start`, `center` и `end`.

Позиции `start` и `end` реализованы средствами CSS, а `center` измеряет текст и пересобирает его, чтобы оставить видимыми оба края.

<!--SANDBOX
import {EllipsisText} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200, display: 'grid', gap: 8}}>
            <EllipsisText position="start">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</EllipsisText>
            <EllipsisText position="center">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</EllipsisText>
            <EllipsisText position="end">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</EllipsisText>
        </div>
    );
}
SANDBOX-->

## Отступы

Свойства `offsetStart` и `offsetEnd` задают фиксированное количество символов (или разделённых частей, см. ниже) в начале и конце текста, которые не обрезаются. Это удобно для сохранения значимых краёв, например расширения файла.

<!--SANDBOX
import {EllipsisText} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200, display: 'grid'}}>
            <EllipsisText position="center" offsetEnd={7}>
                a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz
            </EllipsisText>
        </div>
    );
}
SANDBOX-->

## Разделитель

По умолчанию отступы считают видимые символы (графемы), сохраняя эмодзи и комбинируемые знаки целиком. В средах без `Intl.Segmenter` используются кодовые точки Unicode, что также сохраняет суррогатные пары. С `separator` они считают части, как при `split(separator)`; массив задаёт альтернативные разделители. Первые `offsetStart` и последние `offsetEnd` частей сохраняются с исходными разделителями между ними. Остальной текст может обрезаться внутри части.

Если совпадений нет, строка считается одной частью. Отступы, охватывающие все части, сохраняют всю строку без дублирования. Поддерживаются многосимвольные разделители; поиск идёт слева направо с выбором самого длинного совпадения. Пустые разделители игнорируются; если их не осталось, отступы считаются в символах.

<!--SANDBOX
import {EllipsisText} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 240, display: 'grid'}}>
            <EllipsisText position="center" separator="/" offsetStart={1} offsetEnd={1}>
                path/to/some/deeply/nested/folder/file-name.tsx
            </EllipsisText>
        </div>
    );
}
SANDBOX-->

## Свойства

| Имя         | Описание                                                                           |             Тип              | Значение по умолчанию |
| :---------- | :--------------------------------------------------------------------------------- | :--------------------------: | :-------------------: |
| children    | Обрезаемый текст.                                                                  |           `string`           |                       |
| position    | Место обрезки текста.                                                              | `'start'` `'center'` `'end'` |        `'end'`        |
| offsetStart | Количество начальных символов (или частей `separator`), которые не обрезаются.     |           `number`           |          `0`          |
| offsetEnd   | Количество конечных символов (или частей `separator`), которые не обрезаются.      |           `number`           |          `0`          |
| separator   | Разделитель(и) для подсчёта `offsetStart`/`offsetEnd` по частям, а не по символам. |     `string` `string[]`      |         `''`          |
| className   | Пользовательский CSS-класс корневого элемента.                                     |           `string`           |                       |
| style       | HTML-атрибут `style`.                                                              |    `React.CSSProperties`     |                       |
| qa          | HTML-атрибут `data-qa`, используется для тестирования.                             |           `string`           |                       |
