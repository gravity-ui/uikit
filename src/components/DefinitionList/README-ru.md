<!--GITHUB_BLOCK-->

# DefinitionList

<!--/GITHUB_BLOCK-->

```tsx
import {DefinitionList} from '@gravity-ui/uikit';
```

Компонент для отображения списка определений с термином и определением, разделенными точками.

## Примеры

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<DefinitionList nameMaxWidth={100} contentMaxWidth={100}>
    <DefinitionList.Item name="Node value with copy" copyText="value">
        <strong>value with copy</strong>
    </DefinitionList.Item>
    <DefinitionList.Item name="Empty value with copy" copyText="nothing to copy" />
</DefinitionList>
`}
>
<UIKit.DefinitionList nameMaxWidth={100} contentMaxWidth={100}>
    <UIKit.DefinitionListItem name="Node value with copy" copyText="value">
        <strong>value with copy</strong>
    </UIKit.DefinitionListItem>
    <UIKit.DefinitionListItem name="Empty value with copy" copyText="nothing to copy" />
</UIKit.DefinitionList>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<DefinitionList nameMaxWidth={100} contentMaxWidth={100}>
  <DefinitionList.Item name="Node value with copy" copyText="value">
    <strong>value with copy</strong>
  </DefinitionList.Item>
  <DefinitionList.Item name="Empty value with copy" copyText="nothing to copy" />
</DefinitionList>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя                | Описание                                                                                                        |              Тип               | Значение по умолчанию |
| :----------------- | :-------------------------------------------------------------------------------------------------------------- | :----------------------------: | :-------------------: |
| [children](#items) | Элементы списка                                                                                                 |       `React.ReactNode`        |                       |
| responsive         | Если установлено в `true`, список займет 100% ширины родительского элемента                                     |           `boolean`            |                       |
| direction          | Если установлено в `vertical`, содержимое будет расположено под названием, и список займет 100% ширины родителя | `'horizontal'` \| `'vertical'` |    `'horizontal'`     |
| nameMaxWidth       | Максимальная ширина термина                                                                                     |            `number`            |                       |
| contentMaxWidth    | Максимальная ширина определения                                                                                 |            `number`            |                       |
| className          | Имя класса для списка определений                                                                               |            `string`            |                       |

### Items

Дочерние элементы DefinitionList должны быть компонентами типа `DefinitionList.Item` со следующими свойствами:

| Имя      | Описание                                                  |            Тип            | Значение по умолчанию |
| -------- | --------------------------------------------------------- | :-----------------------: | :-------------------: |
| name     | Термин                                                    |        `ReactNode`        |                       |
| children | Определение                                               |        `ReactNode`        |                       |
| copyText | Если установлено, будет показана иконка для копирования   |         `string`          |                       |
| note     | Если установлено, рядом с термином будет показан HelpMark | `string \| HelpMarkProps` |                       |

## CSS API

| Имя                            | Описание                           |
| :----------------------------- | :--------------------------------- |
| `--g-definition-list-item-gap` | Расстояние между элементами списка |
