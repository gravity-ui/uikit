# Миграция на v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Обзор

На этой странице собраны несовместимые изменения `@gravity-ui/uikit` v8 и способ пройти каждое из них. Каждый раздел
описывает, что изменилось, как временно сохранить старое поведение и куда двигаться дальше.

Компоненты, которые больше не развиваются, переезжают в точку входа `@gravity-ui/uikit/legacy`. У компонентов,
оставшихся в `/legacy`, API сохраняется, но дата удаления этой точки входа не обещается: запланируйте уход с них.

## Menu и DropdownMenu

`Menu` и `DropdownMenu` из корневой точки входа переехали в `@gravity-ui/uikit/legacy`. Чтобы сохранить прежнее
поведение, поменяйте только импорты (включая `MenuProps`, `MenuItemProps`, `MenuGroupProps`, `DropdownMenuProps`,
`DropdownMenuItem` и другие связанные типы):

```diff
- import {Menu, DropdownMenu} from '@gravity-ui/uikit';
+ import {Menu, DropdownMenu} from '@gravity-ui/uikit/legacy';
```

Семейство `unstable_Menu` стало стабильным и доступно из корневой точки входа. Уберите префикс `unstable_` у
компонентов и типов:

```diff
- import {unstable_Menu as Menu, unstable_MenuItem as MenuItem} from '@gravity-ui/uikit/unstable';
+ import {Menu, MenuItem} from '@gravity-ui/uikit';
```

То же относится к `MenuTrigger`, `MenuDivider`, `MenuSize`, `MenuProps`, всем типам `MenuItem*` и
`MenuTriggerProps`. Из `/unstable` эти имена больше не экспортируются.

У нового `Menu` другой API: передавайте элементы как дочерние `MenuItem`, а триггер — через `trigger` (или используйте
`inline`). Старые пропсы `Menu.Item`, `Menu.Group` и массив `DropdownMenu.items` доступны в `/legacy`. Примеры есть в
[README нового Menu](../src/components/Menu/README.md). Новое меню использует CSS-классы `g-menu`, `g-menu-item` и
`g-menu-divider`. Классы legacy-компонентов переименованы: `g-menu` → `g-menu-legacy`, `g-dropdown-menu` →
`g-dropdown-menu-legacy`. В `DefaultPropsProvider` для старого меню используйте ключ `MenuLegacy`; ключ `DropdownMenu`
не изменился.

Как и для других импортов из `/legacy`, установите необязательные peer-зависимости: `@hello-pangea/dnd`,
`react-window` и `react-virtualized-auto-sizer`.
Legacy-компоненты `Menu`, `MenuItem`, `MenuGroup` и `DropdownMenu` помечены `@deprecated` в типах.

## Breadcrumbs, Popover и Tabs удалены из `/legacy`

Старые компоненты `Breadcrumbs`, `Popover` и `Tabs`, их типы и связанные экспорты больше не доступны из
`@gravity-ui/uikit/legacy`. Замените их актуальными компонентами из `@gravity-ui/uikit`:

| Удалённый компонент | Замена                                                        | Что учесть при миграции                                                                                                                                                       |
| :------------------ | :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Breadcrumbs`       | [`Breadcrumbs`](../src/components/Breadcrumbs/README-ru.md)   | Обновите структуру элементов и пропсы рендеринга под актуальный API.                                                                                                          |
| `Popover`           | [`Popover`](../src/components/Popover/README.md)              | Новый компонент управляет триггером и попапом; оформление содержимого задаётся отдельно. См. [руководство по миграции Popover](../src/components/Popover/migration-guide.md). |
| `Tabs`              | `TabList`, `Tab` и при необходимости `TabProvider`/`TabPanel` | Замените `items` и `Tabs.Item` на дочерние `Tab`. См. [руководство по миграции Tabs](../src/components/tabs/migration-guide.md).                                              |

Удалите импорты этих компонентов и их типов из `/legacy`. Остальные legacy-компоненты остаются доступными.

## Геометрия Dialog

У `Dialog` уменьшились отступы заголовка и содержимого. У заголовка отступы сверху и снизу составляют 12 и 8 px,
у содержимого — по 4 px, у футера — 24 и 28 px. Высота типичного диалога уменьшилась со 190 до 176 px. Кнопка
закрытия находится в 12 px от верхнего края и 16 px от конца строки на десктопе; на мобильном экране — в 12 px от
обоих краёв. Если заголовка или футера нет, между содержимым и соответствующим краем остаётся 20 или 24 px.
Проверьте собственное содержимое и CSS-переопределения с новыми отступами.

У корневого элемента больше нет класса `g-dialog_has-close`. Обновите зависящие от него селекторы; при необходимости
наличие кнопки закрытия можно проверить селектором `.g-dialog:has(.g-dialog-btn-close)`.

## Table и TableColumnSetup

`Table`, его HOC (`withTableActions`, `withTableCopy`, `withTableSelection`, `withTableSettings`, `withTableSorting`) и
`TableColumnSetup` переехали из корневой точки входа в `@gravity-ui/uikit/legacy`. Их API и разметка
не изменились, CSS-блоки таблицы (`g-table`, `g-table-column-setup`, …) сохранили имена; поменялись только классы
внутри попапа настроек колонок, см. ниже. Новые возможности таблиц появляются в
[`@gravity-ui/table`](https://github.com/gravity-ui/table).

### Если мигрировать сейчас нельзя

Поменяйте импорт, остальной код остаётся прежним:

```diff
- import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit';
+ import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit/legacy';
```

То же касается типов (`TableProps`, `TableColumnConfig`, `TableSettingsData`, `TableColumnSetupProps`, …).

- **`@gravity-ui/uikit/legacy` нужны три необязательные peer-зависимости.** `@hello-pangea/dnd` (на нём построен попап
  настроек колонок), `react-window` и `react-virtualized-auto-sizer` (legacy `List`) больше не ставятся вместе с пакетом,
  а legacy-точка входа загружает их все, что бы из неё ни импортировалось: установите все три рядом с `@gravity-ui/uikit`.
- **Классы внутри попапа настроек колонок.** `g-tree-select` → `g-tree-select-legacy`, `g-tree-list` →
  `g-tree-list-legacy`, `g-list-container-view` → `g-list-container-view-legacy`, `g-list-item-view` →
  `g-list-item-view-legacy`; модификаторы размера (`g-tree-select__popup_size_*`, `_size_*` и `_radius_*` у строк)
  удалены. Попап выглядит так же; перепишите переопределения, нацеленные на эти классы.
- **`@deprecated`.** `Table`, его HOC и `TableColumnSetup` помечены `@deprecated` в типах: линтеры с правилом
  `no-deprecated` начнут сообщать об их использовании.
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
