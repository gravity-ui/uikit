<!--GITHUB_BLOCK-->

# Ellipsis

<!--/GITHUB_BLOCK-->

```tsx
import {Ellipsis} from '@gravity-ui/uikit';
```

Компонент `Ellipsis` обрезает однострочный текст, который не помещается в контейнер, заменяя скрытую часть символом многоточия (`…`). В отличие от обычного CSS-свойства `text-overflow: ellipsis`, он позволяет выбрать место обрезки текста — в начале (`start`), середине (`center`) или конце (`end`) — и сохраняет полный текст доступным для программ чтения с экрана (через `aria-label`) и для копирования.

## Позиция

Свойство `position` управляет местом обрезки текста. Значение по умолчанию — `end`. Возможные значения: `start`, `center` и `end`.

Позиции `start` и `end` реализованы средствами CSS, а `center` измеряет текст и пересобирает его, чтобы оставить видимыми оба края.

<!--SANDBOX
import {Ellipsis} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200, display: 'grid', gap: 8}}>
            <Ellipsis position="start">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</Ellipsis>
            <Ellipsis position="center">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</Ellipsis>
            <Ellipsis position="end">a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz</Ellipsis>
        </div>
    );
}
SANDBOX-->

## Отступы

Свойства `offsetStart` и `offsetEnd` задают фиксированное количество символов (или разделённых частей, см. ниже) в начале и конце текста, которые не обрезаются. Это удобно для сохранения значимых краёв, например расширения файла.

<!--SANDBOX
import {Ellipsis} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 200}}>
            <Ellipsis position="center" offsetEnd={7}>
                a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz
            </Ellipsis>
        </div>
    );
}
SANDBOX-->

## Разделитель

По умолчанию `offsetStart` и `offsetEnd` считают символы. Укажите `separator` (строку или массив строк), чтобы считать части, разделённые этими символами, — тогда текст будет обрезаться только по границам разделителя. Это полезно для путей, имён пакетов или идентификаторов с точками.

<!--SANDBOX
import {Ellipsis} from '@gravity-ui/uikit';

export default function () {
    return (
        <div style={{width: 240}}>
            <Ellipsis position="center" separator="/" offsetStart={1} offsetEnd={1}>
                path/to/some/deeply/nested/folder/file-name.tsx
            </Ellipsis>
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
