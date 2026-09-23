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
