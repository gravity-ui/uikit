# Миграция на v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Обзор

На этой странице собраны несовместимые изменения `@gravity-ui/uikit` v8 и способ пройти каждое из них. Каждый раздел
описывает, что изменилось, как временно сохранить старое поведение и куда двигаться дальше.

Компоненты, которые больше не развиваются, переезжают в точку входа `@gravity-ui/uikit/legacy`. Там их API сохраняется,
но дата удаления `/legacy` не обещается: запланируйте уход с них.

## Table и TableColumnSetup

`Table`, его HOC (`withTableActions`, `withTableCopy`, `withTableSelection`, `withTableSettings`, `withTableSorting`) и
`TableColumnSetup` переехали из корневой точки входа в `@gravity-ui/uikit/legacy`. Их API, разметка и CSS-классы
(`g-table`, `g-table-column-setup`, …) не изменились. Новые возможности таблиц появляются в
[`@gravity-ui/table`](https://github.com/gravity-ui/table).

### Если мигрировать сейчас нельзя

Поменяйте импорт, остальной код остаётся прежним:

```diff
- import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit';
+ import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit/legacy';
```

То же касается типов (`TableProps`, `TableColumnConfig`, `TableSettingsData`, `TableColumnSetupProps`, …).

- **`@hello-pangea/dnd` теперь необязательная peer-зависимость.** На нём построен попап `withTableSettings` и
  `TableColumnSetup`: установите пакет рядом с `@gravity-ui/uikit`, если используете любой из них. `Table` и остальным
  HOC он не нужен.
- **`DefaultPropsProvider` больше не принимает ключ `TableColumnSetup`.** Legacy-компоненты не читают пропсы по
  умолчанию: передавайте их в `TableColumnSetup` явно.
- **Переводы.** Имена кейсетов (`Table`, `withTableSettings`, `TableColumnSetupInner`, `TableColumnSetup`) не
  изменились, переопределения через `addComponentKeysets` продолжают работать.

### Переход на `@gravity-ui/table`

У `@gravity-ui/table` есть
[пошаговое руководство с `Table` из uikit](https://github.com/gravity-ui/table/blob/main/docs/migration-from-uikit-table/migration-from-uikit-table-ru.md):
пропсы, каждый HOC и `TableColumnSetup` (раздел 4.1). Его раздел «Оставайтесь на старой таблице, если» — хороший критерий:
небольшая таблица без интерактива и требований к производительности может остаться на legacy-версии.

## useList, TreeList и TreeSelect удалены из `/unstable`

Экспериментальное семейство `useList` удалено из `@gravity-ui/uikit/unstable`, замены внутри пакета нет: оно
продолжается в [`@gravity-ui/normalized-list`](https://github.com/gravity-ui/normalized-list) под новыми именами, см. его
[руководство по миграции](https://github.com/gravity-ui/normalized-list/blob/main/MIGRATION.md). Берите версию
`@gravity-ui/normalized-list`, чей диапазон peer-зависимостей включает `@gravity-ui/uikit` v8.

| `@gravity-ui/uikit/unstable`                                                                                                                                                                                                             | `@gravity-ui/normalized-list`                                         |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `unstable_TreeSelect`, `unstable_TreeSelectProps`                                                                                                                                                                                        | `UIKitNormalizedSelect`, `UIKitNormalizedSelectProps` из `/uikit`     |
| `unstable_TreeList`, `unstable_TreeListProps`                                                                                                                                                                                            | `UIKitNormalizedList`, `UIKitNormalizedListProps` из `/uikit`         |
| `unstable_useList`, `unstable_UseListResult`                                                                                                                                                                                             | `useNormalizedList`, `UseNormalizedListResult`                        |
| `unstable_ListItemView`, `unstable_ListItemViewProps`                                                                                                                                                                                    | `UIKitListItemView` из `/uikit`, `ListItemViewProps`                  |
| `unstable_ListItemExpandIcon`, `unstable_ListItemExpandIconProps`                                                                                                                                                                        | `UIKitListItemExpandIcon`, `UIKitListItemExpandIconProps` из `/uikit` |
| `unstable_ListContainer`, `unstable_ListContainerProps`, `unstable_ListContainerView`, `unstable_ListContainerViewProps`                                                                                                                 | те же имена без префикса                                              |
| `unstable_ListItemType`, `unstable_ListTreeItemType`, `unstable_ListItemId`                                                                                                                                                              | те же имена без префикса                                              |
| `unstable_useListFilter`, `unstable_useListKeydown`, `unstable_getListItemClickHandler`, `unstable_getItemRenderState`, `unstable_scrollToListItem`, `unstable_getListItemQa`, `unstable_getListParsedState`, `unstable_computeItemSize` | те же имена без префикса                                              |

Что проверить после перехода (по руководству пакета):

- CSS-неймспейс — `g-nl-`: перепишите переопределения старых классов и переменных;
- у `UIKitNormalizedSelect` нет встроенного мобильного `Sheet`, рендерьте его через `renderPopup`;
- QA-константы селекта — `NormalizedSelectQa`.

Настройки колонок legacy `Table` продолжают работать: от удалённого семейства они больше не зависят.
