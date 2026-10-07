# Миграция на v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Обзор

На этой странице собраны несовместимые изменения `@gravity-ui/uikit` v8 и способ пройти каждое из них. Каждый раздел
описывает, что изменилось, как временно сохранить старое поведение и куда двигаться дальше.

Компоненты, которые больше не развиваются, переезжают в точку входа `@gravity-ui/uikit/legacy`. В v8 это `DropdownMenu`,
`List`, `Menu`, `Table` и `TableColumnSetup`. У компонентов, оставшихся в `/legacy`, API сохраняется, но дата удаления
этой точки входа не обещается: запланируйте уход с них.

## Быстрый чеклист

1. Обновите React и React DOM до 18 или 19, см. [Минимальная версия React 18](#минимальная-версия-react-18).
2. Установите необязательные peer-зависимости тех точек входа, из которых импортируете, см. [Зависимости](#зависимости).
3. Найдите импорты и пропсы, которые переехали или удалены, и пройдите по соответствующим разделам ниже:

   ```bash
   grep -rnE "@gravity-ui/uikit/(unstable|legacy)" src
   grep -rlE "from ['\"]@gravity-ui/uikit['\"]" src | xargs grep -HnwE "List|ListItem|ListQa|Menu|DropdownMenu|Table|TableColumnSetup|withTable[A-Za-z]+"
   grep -rnE "virtualizationThreshold|renderSelectedOption\b|SelectItem|xxs|xxl|extraProps|onKeyPress|iconSize|anchorRef|onEscapeKeyDown|onOutsideClick|onEnterKeyDown|disableHeightTransition|arrowPosition|layersCount" src
   grep -rnE "(normal|outlined|flat)-contrast|--g-color-base-light" src
   ```

4. Сверьте свой CSS и тесты с разделом [Остальное](#остальное).

## ThemeProvider разделён на отдельные провайдеры

Прежний `ThemeProvider` разделён на провайдеры отдельных функций, а их композиция называется
`Provider`. Он сохраняет прежние пропсы и
принимает все пропсы MobileProvider напрямую. Полный тип `ThemeProviderProps` замените на `ProviderProps`.
При переносе мобильных настроек уберите дополнительную обёртку:

```diff
- import {ThemeProvider, MobileProvider, Platform} from '@gravity-ui/uikit';
+ import {Provider, Platform} from '@gravity-ui/uikit';

- <ThemeProvider theme="light" lang="ru" layout={{fixBreakpoints: true}}>
-   <MobileProvider mobile platform={Platform.IOS} __experimentalMobileModals>
-     <App />
-   </MobileProvider>
- </ThemeProvider>
+ <Provider theme="light" lang="ru" layout={{fixBreakpoints: true}}
+   mobile platform={Platform.IOS}>
+   <App />
+ </Provider>
```

`__experimentalMobileModals` удалён из `Provider`, `MobileProvider` и мобильного контекста.
Уберите этот проп: `Modal` и `Dialog` теперь используют мобильный рендеринг при включённом `mobile`.

Вложенные Provider всегда работают в режиме scoped, даже при `scoped={false}`. Они наследуют
незаданные настройки темы, языка, layout и defaults компонентов, а тему и направление применяют
к локальной обёртке. Мобильные настройки и хуки роутера не наследуются: каждый Provider использует
defaults MobileProvider, если пропсы не переданы явно, а `mobile` управляет `.g-root_mobile` на body.
Для переопределения отдельных функций используйте соответствующие провайдеры:

| Прежний проп ThemeProvider                                  | Провайдер поддерева                                         |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| `theme`, `direction`, `systemLightTheme`, `systemDarkTheme` | `ThemeProvider`                                             |
| `lang`, `fallbackLang`                                      | `LangProvider`                                              |
| `layout`                                                    | `LayoutProvider` (передайте пропсы прежнего объекта layout) |
| `defaultProps`                                              | `DefaultPropsProvider`                                      |

Новый ThemeProvider и его ThemeProviderProps отвечают только за тему и направление. `lang`,
`fallbackLang`, `layout` и `defaultProps` из них удалены. Без родительской темы ThemeProvider задаёт
классы и направление для body; `scoped` создаёт локальный корень. Внутри Provider или другого
ThemeProvider он всегда scoped, даже при `scoped={false}`:

```tsx
<Provider theme="light">
  <ThemeProvider theme="dark">
    <LangProvider lang="ru">
      <Toolbar />
    </LangProvider>
  </ThemeProvider>
</Provider>
```

Области темы больше не пересоздают провайдеры языка, layout, defaults компонентов и мобильного режима.
В частности, сохраняются родительский режим breakpoints и мобильные настройки/хуки роутера.
Порталы сохраняют локальную тему и направление.

Самостоятельные MobileProvider и DefaultPropsProvider сохраняют свой API.
Новый публичный LayoutProvider наследует все настройки layout родителя; без родителя
сохраняется `fixBreakpoints=false` по умолчанию.

Полный API и defaults описаны в руководстве [Темизация](theming-ru.md#провайдеры).

## Минимальная версия React 18

Для UIKit v8 нужны React и React DOM версии 18 или 19. Перед установкой v8 обновите оба пакета (и `@types/react`, если
используете его). React 16 и 17 больше не поддерживаются.

## Зависимости

`@hello-pangea/dnd`, `react-window`, `react-virtualized-auto-sizer` и `@tanstack/react-virtual` — необязательные
peer-зависимости: вместе с пакетом они больше не устанавливаются. Корневой точке входа не нужна ни одна из них;
установите те, что нужны точкам входа, из которых импортируете:

| Точка входа                          | Что установить                                                      |
| :----------------------------------- | :------------------------------------------------------------------ |
| `@gravity-ui/uikit/virtualizer`      | `@tanstack/react-virtual`                                           |
| `@gravity-ui/uikit/hello-pangea-dnd` | `@hello-pangea/dnd`                                                 |
| `@gravity-ui/uikit/legacy`           | `@hello-pangea/dnd`, `react-window`, `react-virtualized-auto-sizer` |

## Новые точки входа

Две точки входа держат свои зависимости вне корневой:

| Точка входа                          | Что там                                                                                                                             |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `@gravity-ui/uikit/virtualizer`      | [`Virtualizer` и `ListVirtualizer`](../src/components/Virtualizer/README.md): рендерится только видимое окно длинного списка        |
| `@gravity-ui/uikit/hello-pangea-dnd` | [`ListHelloPangeaDnd` и его части](../src/components/HelloPangeaDnd/README.md): перестановка строк `List` через `@hello-pangea/dnd` |

## List

`List` из корневой точки входа — новый компонент: выбор, виртуализация и перетаскивание — необязательные слои,
встроенного фильтра нет. `List` из v7 вместе с `ListItem`, `ListQa` и остальными экспортами — в
`@gravity-ui/uikit/legacy` (CSS-блок `g-list-legacy`), которой нужны [три необязательные peer-зависимости](#зависимости):

```diff
- import {List} from '@gravity-ui/uikit';
+ import {List} from '@gravity-ui/uikit/legacy';
```

Как перейти на новый `List` — в [гайде по миграции List](migration-from-legacy-list.md) (на английском): пропсы,
различия в поведении, test id и CSS, а также [как остаться на старом List](migration-from-legacy-list.md#staying-on-the-legacy-list).

## Select

`Select` рисует опции новым `List`. Подробности — в [гайде Select](migration-select-v8.md) (на английском).

### Опции рисует новый List

- `virtualizationThreshold` удалён: оберните `Select` в `ListVirtualizer` из `@gravity-ui/uikit/virtualizer`. Без
  обёртки рендерятся все опции.
- Без `ListVirtualizer` попап шириной с самую широкую опцию; оберните `Select` или задайте `popupWidth="fit"`.
- Поле `text` у опции (`SelectOptionProps`) удалено: текст опции берётся из `getOptionText`.
- `renderFilter` больше не получает `value` и `onKeyDown`: оба — в `inputProps`.
- `renderOption` всегда получает `isItemActive`, а `itemHeight` несёт новые высоты строк.
- Значения опций должны быть уникальными, включая группы.
- DOM `id` строки строится по значению опции, заголовок группы больше не `role="option"`, нескольких
  классов `g-select-list__*` и `.g-list__item` больше нет.
- `label` называет триггер, а не склеивается с его значением.
- Поиск по первым буквам ищет по префиксу.

### Позиция попапа Select

Попап `Select` позиционируется от контрола, а не от всего компонента: если под контролом показан текст ошибки
(`errorPlacement="outside"`, по умолчанию), попап открывается сразу под контролом и, пока открыт, закрывает текст
ошибки. Ширина попапа не изменилась. Вернуть прежнее положение нельзя.

Контрол обёрнут в новую обёртку `g-select__anchor` между корнем и контролом (`g-select-control`). Обновите селекторы,
которые рассчитывают на то, что контрол — прямой потомок корня, например `.g-select > .g-select-control`.

### `renderSelectedOption` у Select

`renderSelectedOption(option, index)` удалён. `renderSelectedOptions(options)` вызывается один раз со всем выбором,
поэтому сводку вроде «All ticket types» можно отрисовать без `renderControl`. Чтобы сохранить прежний вид, примените
старую функцию к каждой опции — разделители между опциями, как и раньше, на ней; см.
[гайд Select](migration-select-v8.md):

```diff
- <Select renderSelectedOption={renderOne} />
+ <Select renderSelectedOptions={(options) => options.map(renderOne)} />
```

### Имена опций Select

Типы опций и компоненты для них названы по `Select.Option`, как в `SegmentedRadioGroup`. Алиасов для старых имён нет:

| Было                        | Стало                         |
| :-------------------------- | :---------------------------- |
| тип `SelectOption`          | тип `SelectOptionProps`       |
| тип `SelectOptionGroup`     | тип `SelectOptionGroupProps`  |
| компонент `SelectItem`      | компонент `SelectOption`      |
| компонент `SelectItemGroup` | компонент `SelectOptionGroup` |

```diff
- import {SelectItem, type SelectOption} from '@gravity-ui/uikit';
+ import {SelectOption, type SelectOptionProps} from '@gravity-ui/uikit';
```

Старые `SelectOption` и `SelectOptionGroup` в роли типа теперь дают ошибку «'SelectOption' refers to a value, but is
being used as a type here» — замените их на `SelectOptionProps` и `SelectOptionGroupProps`.

## Высота строк List, Select и Menu

Строки `ListItemView`, а с ним `List`, `Select` и `Menu`, выровнены по высоте контролов того же размера: 24, 28, 36 и
44px. Строки размеров `l` и `xl` — 36 и 44px вместо 32 и 36, строки мобильного `Select` — 44px вместо 32.
Заголовок секции `List` и заголовок группы `Select` высотой со строку своего размера. В попап или список
фиксированной высоты помещается меньше строк. Чтобы сохранить свою высоту, задайте `--g-list-item-view-min-height`
на классе списка: `className` у `List` и `Menu`, `popupClassName` и `sheetClassName` у `Select`; отступы
`List` и `Select` и заголовки следуют за ней. Высоты, которыми считает `Select`, — оценка виртуализатора и `itemHeight` — задаются
через `getOptionHeight` и `getOptionGroupHeight`.

## Table и TableColumnSetup

`Table`, его HOC (`withTableActions`, `withTableCopy`, `withTableSelection`, `withTableSettings`, `withTableSorting`) и
`TableColumnSetup` переехали из корневой точки входа в `@gravity-ui/uikit/legacy`. Их API и разметка
не изменились, CSS-блоки таблицы (`g-table`, `g-table-column-setup`, …) сохранили имена. Меню действий строки теперь
использует `g-menu-legacy` вместо `g-menu`; классы внутри попапа настроек колонок тоже изменились, см. ниже. Новые
возможности таблиц появляются в
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
- **Переводы.** Имена кейсетов (`Table`, `withTableSettings`, `TableColumnSetupInner`, `TableColumnSetup`) не
  изменились, переопределения через `addComponentKeysets` продолжают работать.

### Переход на `@gravity-ui/table`

У `@gravity-ui/table` есть
[пошаговое руководство с `Table` из uikit](https://github.com/gravity-ui/table/blob/main/docs/migration-from-uikit-table/migration-from-uikit-table-ru.md):
пропсы, каждый HOC и `TableColumnSetup` (раздел 4.1). Его раздел «Оставайтесь на старой таблице, если» — хороший критерий:
небольшая таблица без интерактива и требований к производительности может остаться на legacy-версии.

## Удалено из `/unstable`

В v8 `@gravity-ui/uikit/unstable` пуст; точка входа остаётся для будущих экспериментов. Всё
переехало:

| Удалено                                                                                                                 | Теперь                                                                                                                       |
| :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `unstable_List`, `unstable_moveItem`, `unstable_useListFocusOwner` и типы `unstable_List*`                              | те же имена без префикса из `@gravity-ui/uikit`, см. [гайд List](migration-from-legacy-list.md#from-gravity-uiuikitunstable) |
| `unstable_ListVirtualizer`, `unstable_ListVirtualizerProps`                                                             | `ListVirtualizer`, `ListVirtualizerProps` из `@gravity-ui/uikit/virtualizer`                                                 |
| `unstable_useListHelloPangeaDnd`, `unstable_UseListHelloPangeaDndOptions`, `unstable_UseListHelloPangeaDndResult`       | `useListHelloPangeaDnd`, `UseListHelloPangeaDndProps`, `UseListHelloPangeaDndResult` из `@gravity-ui/uikit/hello-pangea-dnd` |
| `unstable_ColorPicker`, `unstable_ColorPickerProps`                                                                     | `ColorPicker`, `ColorPickerProps` из `@gravity-ui/uikit`                                                                     |
| `unstable_FileDropZone`, `DropZoneFileRejection`, `FileDropZoneProps`                                                   | `FileDropZone` и те же типы из `@gravity-ui/uikit`                                                                           |
| `unstable_useDropZone`, `UseDropZoneEventHandler`, `UseDropZoneParams`, `UseDropZoneDroppableProps`, `UseDropZoneState` | `useDropZone` и те же типы из `@gravity-ui/uikit`                                                                            |
| `unstable_Menu` и остальные имена `unstable_Menu*`                                                                      | см. [Menu и DropdownMenu](#menu-и-dropdownmenu)                                                                              |
| семейство `unstable_useList`, `unstable_TreeList`, `unstable_TreeSelect`                                                | см. [useList, TreeList и TreeSelect удалены из `/unstable`](#uselist-treelist-и-treeselect-удалены-из-unstable)              |

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
`g-menu-divider` вместо прежних `g-lab-menu*`. Классы legacy-компонентов переименованы: `g-menu` → `g-menu-legacy`,
`g-dropdown-menu` → `g-dropdown-menu-legacy`. Обновите свои селекторы, включая селекторы меню переполнения вкладок.
В `DefaultPropsProvider` для старого меню используйте ключ `MenuLegacy`; ключ `DropdownMenu` не изменился.

Как и для других импортов из `/legacy`, установите необязательные peer-зависимости: `@hello-pangea/dnd`,
`react-window` и `react-virtualized-auto-sizer`.
Legacy-компоненты `Menu`, `MenuItem`, `MenuGroup` и `DropdownMenu` помечены `@deprecated` в типах.

### Меню переполнения ActionsPanel

`ActionsPanel` теперь использует стабильный `Menu` для элементов переполнения и подменю. Переименуйте
`ActionsPanelItem.dropdown` в `menu`. Поле `menu.item` принимает `MenuItemProps` вместо `DropdownMenuItem`:
переименуйте `text` в `children`, а `action` в `onClick`.
Вложенные массивы `items` замените компонентом `Menu`, переданным непосредственно в массив `children`:

```tsx
menu: {
    item: {
        children: [
            'More',
            <Menu key="submenu" size="s">
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
            </Menu>,
        ],
    },
}
```

Для явно типизированных пунктов используйте новый тип `MenuItemProps`. Замените `iconStart` на `icon`, `iconEnd` на
`arrow` и передавайте стандартные пропсы элемента напрямую вместо `extraProps`. Скрытые пункты исключайте при
формировании массива `actions`. Для собственных CSS и тестов замените
селекторы `.g-dropdown-menu__*` и `li > div[role="menuitem"]` на селекторы новой разметки с `g-menu-item` и
кнопкой/ссылкой. При прокрутке родительского элемента меню переполнения больше не закрывается автоматически.

## Breadcrumbs, Popover и Tabs удалены из `/legacy`

Старые компоненты `Breadcrumbs`, `Popover` и `Tabs`, их типы и связанные экспорты больше не доступны из
`@gravity-ui/uikit/legacy`. Замените их актуальными компонентами из `@gravity-ui/uikit`:

| Удалённый компонент | Замена                                                                           | Руководство по миграции                                              |
| :------------------ | :------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `Breadcrumbs`       | [`Breadcrumbs`](../src/components/Breadcrumbs/README-ru.md)                      | [Пропсы, элементы и рендеринг](migration-from-legacy-breadcrumbs.md) |
| `Popover`           | [`Popover`](../src/components/Popover/README.md)                                 | [Содержимое и поведение](migration-from-legacy-popover.md)           |
| `Tabs`              | [`TabList`, `Tab`, `TabProvider` и `TabPanel`](../src/components/tabs/README.md) | [Элементы и выбор вкладки](migration-from-legacy-tabs.md)            |

В v8 для этих компонентов нет временной точки импорта. Замены уже доступны из корневой точки входа в v7, поэтому
мигрировать можно до обновления. Остальные legacy-компоненты остаются доступными.

**Переводы:** кейсет старого `Breadcrumbs` удалён. Актуальный компонент теперь использует кейсет `Breadcrumbs` вместо
`lab/Breadcrumbs`, поэтому существующие переопределения `Breadcrumbs.label_more` продолжат работать. Переименуйте
переопределения `lab/Breadcrumbs` в `Breadcrumbs`; актуальный кейсет также содержит `breadcrumbs`.

## Цветовые токены themer v2

UIKit теперь генерирует тему через `@gravity-ui/uikit-themer` 2.0 вместо 1.8.1. Перегенерируйте пользовательские
темы через v2 и обновите ссылки на удалённые токены в CSS.

Значения непрозрачности ниже относятся к стандартным темам `light` и `dark`. Темы UIKit `light-hc` и `dark-hc`
используют собственные значения из `styles/themes/theme-data/hc.ts`.

### Удалённые токены

| Удалённый токен                        | Замена                                                                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `--g-color-base-light`                 | `--g-color-base-contrast-light`                                                                                                      |
| `--g-color-base-light-hover`           | `--g-color-base-contrast-light-hover`                                                                                                |
| `--g-color-base-light-simple-hover`    | `--g-color-base-contrast-light-simple-hover`                                                                                         |
| `--g-color-base-light-disabled`        | `--g-color-base-contrast-light-simple-hover` для прежнего полупрозрачного фона; отдельного токена `base-contrast-light-disabled` нет |
| `--g-color-base-light-accent-disabled` | `--g-color-base-contrast-light-accent-disabled`; непрозрачность меняется с 30% на 7%                                                 |

`--g-color-line-light` и существующие токены текста сохранены. `--g-color-line-contrast-light` — новый токен
светлой линии с непрозрачностью 25%; у `line-light` остаётся непрозрачность 50%.

### Добавленные семантические токены

Четыре палитры одинаково ведут себя для фонов и линий: `contrast` тёмная в светлых темах и светлая в тёмных;
`contrast-inverted` — наоборот; `contrast-light` и `contrast-dark` остаются соответственно светлой и тёмной
в обеих темах.

```text
--g-color-base-contrast
--g-color-base-contrast-hover
--g-color-base-contrast-simple-hover
--g-color-base-contrast-accent-disabled

--g-color-base-contrast-inverted
--g-color-base-contrast-inverted-hover
--g-color-base-contrast-inverted-simple-hover
--g-color-base-contrast-inverted-accent-disabled

--g-color-base-contrast-light
--g-color-base-contrast-light-hover
--g-color-base-contrast-light-simple-hover
--g-color-base-contrast-light-accent-disabled

--g-color-base-contrast-dark
--g-color-base-contrast-dark-hover
--g-color-base-contrast-dark-simple-hover
--g-color-base-contrast-dark-accent-disabled

--g-color-line-contrast
--g-color-line-contrast-inverted
--g-color-line-contrast-light
--g-color-line-contrast-dark
```

### Дополнения приватной палитры

Шкалы непрозрачных чёрного и белого теперь генерируются в обеих темах: `--g-color-private-black-<step>-solid` и
`--g-color-private-white-<step>-solid`, с шагами `20`, `50`, `70` и от `100` до `950` с интервалом
`50` (крайние значения `1000-solid` сохранены). В светлой теме добавлена шкала непрозрачного белого, в тёмной —
непрозрачного чёрного; шаг `70-solid` доступен в обеих темах. Это токены реализации:
в CSS приложения используйте семантические токены, как описано в [Темизации](theming-ru.md#слои-цветовых-токенов).

## Контрастные виды Button

`normal-contrast`, `outlined-contrast` и `flat-contrast` удалены. Замените `normal-contrast` на
`contrast-light`: эта кнопка остаётся светлой в обеих темах.

```diff
- <Button view="normal-contrast">Действие</Button>
+ <Button view="contrast-light">Действие</Button>
```

`outlined-contrast` и `flat-contrast` можно построить самостоятельно через `view="outlined"` или `view="flat"` и
[CSS API Button](../src/components/Button/README-ru.md#api-css). Используйте семантические токены, которые генерирует
`@gravity-ui/uikit-themer` v2. Например, светлый текст, прозрачный фон и светлый ховер на тёмной поверхности:

```css
.button-light {
  --g-button-text-color: var(--g-color-text-light-primary);
  --g-button-text-color-hover: var(--g-color-text-light-primary);
  --g-button-background-color: transparent;
  --g-button-background-color-hover: var(--g-color-base-contrast-light-simple-hover);
  --g-button-border-color: var(--g-color-line-contrast-light);
  --g-button-focus-outline-color: var(--g-color-line-contrast-light);
}
```

```tsx
<Button view="outlined" className="button-light">Outlined</Button>
<Button view="flat" className="button-light">Flat</Button>
```

Пример задаёт обычный вид и ховер. При необходимости настройте disabled и selected через тот же CSS API.
Для других контрастных палитр используйте семейства токенов `base-contrast*` и `line-contrast*`.

## `extraProps` у Button и Link

`Button` и `Link` больше не принимают `extraProps`. Передавайте стандартные пропсы элемента напрямую компоненту,
в том числе если `Button` рендерит ссылку или пользовательский компонент.
То же касается пропсов на основе `ButtonProps`, например `MenuTriggerProps`, `AlertActionProps`,
`ActionsPanelItem.button.props` и пропсов кнопок `Dialog.Footer`.

Раньше `type`, `disabled`, `className`, `onClickCapture` и `rel` внутри `extraProps` могли перезаписываться компонентом.
После переноса на корень они могут изменить поведение: например, кнопка станет `submit` или отключится. Перенос
`target="_blank"` на корень также добавляет `rel="noopener noreferrer"`, если `rel` не задан, поэтому заголовок Referer
не отправляется.

```diff
- <Button extraProps={{title: 'Сохранить', onClick: handleSave}}>Сохранить</Button>
+ <Button title="Сохранить" onClick={handleSave}>Сохранить</Button>
- <Link href="/help" extraProps={{target: '_blank'}}>Помощь</Link>
+ <Link href="/help" target="_blank">Помощь</Link>
```

## Сторона иконки Button.Icon и положение стрелки Disclosure

Пропы `side` у `Button.Icon` и `arrowPosition` у `Disclosure` больше не принимают физические значения `left` и `right`.
Используйте логические значения `start` и `end`. Они зависят от направления текста: `start` находится слева при LTR и справа при RTL.

```diff
- <Button.Icon side="left">...</Button.Icon>
+ <Button.Icon side="start">...</Button.Icon>
- <Button.Icon side="right">...</Button.Icon>
+ <Button.Icon side="end">...</Button.Icon>
- <Disclosure arrowPosition="left" />
+ <Disclosure arrowPosition="start" />
- <Disclosure arrowPosition="right" />
+ <Disclosure arrowPosition="end" />
```

## `configure` и `getConfig`

Каждый вызов `configure` теперь создаёт новый объект конфигурации. Ранее сохранённый результат `getConfig()` больше не
отражает последующие изменения. Чтобы получить актуальную конфигурацию после вызова `configure`, вызовите `getConfig()`
ещё раз:

```ts
configure({lang: 'ru'});
const {lang} = getConfig(); // 'ru'
```

## Геометрия Dialog

У `Dialog` уменьшились отступы заголовка и содержимого. У заголовка отступы сверху и снизу составляют 12 и 8 px,
у содержимого — по 4 px, у футера — 24 и 28 px. Высота типичного диалога уменьшилась со 190 до 176 px. Кнопка
закрытия находится в 12 px от верхнего края и 16 px от конца строки на десктопе; на мобильном экране — в 12 px от
обоих краёв. Если заголовка или футера нет, между содержимым и соответствующим краем остаётся 20 или 24 px.
Проверьте собственное содержимое и CSS-переопределения с новыми отступами.

У корневого элемента больше нет класса `g-dialog_has-close`. Обновите зависящие от него селекторы; при необходимости
наличие кнопки закрытия можно проверить селектором `.g-dialog:has(.g-dialog-btn-close)`.

## Устаревшие API Modal и Dialog

У `Modal` и `Dialog` удалены пропсы `onClose`, `onEscapeKeyDown`, `onOutsideClick` и `onEnterKeyDown`. Для закрытия используйте `onOpenChange(open, event?, reason?)`. Вместо старого типа `ModalCloseReason` доступен публичный тип `OpenChangeReason` из `@gravity-ui/uikit`.

| Прежний колбэк и причина                    | Новый вызов `onOpenChange`        |
| :------------------------------------------ | :-------------------------------- |
| `onClose(event, 'escapeKeyDown')`           | `(false, event, 'escape-key')`    |
| `onClose(event, 'outsideClick')`            | `(false, event, 'outside-press')` |
| `Dialog.onClose(event, 'closeButtonClick')` | `(false, event, 'click')`         |

Скрытая кнопка закрытия для скринридера вызывает `onOpenChange(false, event)` с `reason === undefined`. Закрывайте окно при `open === false`; проверяйте `reason` только для действий, зависящих от причины.

```diff
- <Modal open={open} onClose={() => setOpen(false)}>
+ <Modal open={open} onOpenChange={setOpen}>
```

У `Dialog` удалён проп `size`. Для прежней фиксированной ширины передайте `maxWidth` с тем же значением и `fullWidth`:

```diff
- <Dialog size="m" open={open} onClose={handleClose}>
+ <Dialog maxWidth="m" fullWidth open={open} onOpenChange={setOpen}>
```

В диалоге подтверждения без полей замените `onEnterKeyDown` на `initialFocus="apply"`. В диалоге с полями используйте отправку формы. Кнопка применения в `Dialog.Footer` уже имеет `type="submit"`; свяжите её с формой внутри `Dialog.Body` через `propsButtonApply.form`, чтобы сохранить прокрутку содержимого. Обработчик действия должен быть только в `onSubmit`, а не одновременно в `onClickButtonApply`:

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Body>
    <form
      id="dialog-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleApply();
      }}
    >
      <TextInput />
    </form>
  </Dialog.Body>
  <Dialog.Footer textButtonApply="Apply" propsButtonApply={{form: 'dialog-form'}} />
</Dialog>
```

## Размер иконки HelpMark

Проп `HelpMark` `iconSize` переименован в `size`. Замените имя пропа во всех использованиях `HelpMark`, в том числе
в значениях по умолчанию `DefaultPropsProvider` и объектах `note` компонента `DefinitionList`:

```diff
- <HelpMark iconSize="l" />
+ <HelpMark size="l" />
```

Значения (`s`, `m`, `l`, `xl`) и значение по умолчанию (`m`) не изменились.

## Событие `layerschange` у `LayerManager`

В событии `layerschange` больше нет устаревшего поля `meta.layersCount`. Чтобы получить число слоёв, используйте
`meta.layers.length`. Функция `getLayersCount()` остаётся доступной.

## Устаревшее API Popup

`Popup` больше не принимает `anchorRef`, `onClose`, `onEscapeKeyDown` и `onOutsideClick`. Передавайте DOM-элемент якоря через `anchorElement`, а закрытие обрабатывайте через `onOpenChange(open, event?, reason?)`. Типы `PopupAnchorRef` и `PopupCloseReason` тоже удалены; вместо них используйте `PopupAnchorElement` и публичный тип `OpenChangeReason`.

Обновите эти пропсы также в `DropdownMenu.popupProps` из `/legacy` и в ключе `Popup` у `DefaultPropsProvider`.

| Прежний колбэк или причина        | Замена через `onOpenChange`             |
| :-------------------------------- | :-------------------------------------- |
| `onClose(event, 'escapeKeyDown')` | `(false, event, 'escape-key')`          |
| `onClose(event, 'outsideClick')`  | `(false, event, 'outside-press')`       |
| `onEscapeKeyDown(event)`          | Проверяйте `reason === 'escape-key'`    |
| `onOutsideClick(event)`           | Проверяйте `reason === 'outside-press'` |

`onOpenChange` может сообщать и другие причины закрытия. Закрывайте попап при `open === false`; проверяйте `reason` только для действий, зависящих от причины. Храните якорь в состоянии, чтобы `Popup` получил его после монтирования DOM-узла:

```diff
- const anchorRef = React.useRef<HTMLButtonElement>(null);
+ const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
- <Button ref={anchorRef}>Открыть</Button>
- <Popup anchorRef={anchorRef} open={open} onClose={() => setOpen(false)} />
+ <Button ref={setAnchorElement}>Открыть</Button>
+ <Popup anchorElement={anchorElement} open={open} onOpenChange={setOpen} />
```

## Названия размеров с несколькими `x`

В названиях размеров с двумя или более `x` теперь используется цифра и одна `x`:

| Раньше | Теперь |
| :----- | :----- |
| `xxs`  | `2xs`  |
| `xxl`  | `2xl`  |
| `xxxl` | `3xl`  |

Замените `Label size="xxs"` на `size="2xs"`. Соответствующий CSS-модификатор изменился с
`.g-label_size_xxs` на `.g-label_size_2xs`: обновите пользовательские селекторы, которые его используют.

В layout переименуйте ключи `xxl` и `xxxl` в `LayoutTheme.breakpoints` и адаптивных пропсах.
Если используется устаревший проп `Col xxl`, перенесите его в объект `size` с ключом `{'2xl': значение}`.
На этих ширинах `useLayoutContext().activeMediaQuery` теперь возвращает `2xl` или `3xl`, а
`isMediaActive` принимает новые имена. Ширины брейкпоинтов остались прежними: 1400 и 1920 px.
Названия размеров с одной `x`, например `xs` и `xl`, не изменились.

## Проп `error` у TextInput, PasswordInput, TextArea и Select

`TextInput`, `PasswordInput`, `TextArea` и `Select` больше не принимают устаревший проп `error`. Для состояния ошибки используйте
`validationState="invalid"`, а для текста ошибки — `errorMessage`:

```diff
- <TextInput error="Обязательное поле" />
+ <TextInput validationState="invalid" errorMessage="Обязательное поле" />
- <TextArea error />
+ <TextArea validationState="invalid" />
- <Select error={hasError} />
+ <Select validationState={hasError ? 'invalid' : undefined} />
- <TextInput error={errorText} />
+ <TextInput validationState={errorText ? 'invalid' : undefined} errorMessage={errorText} />
```

Замена одинакова для всех четырёх компонентов. Если `error` был единственным признаком ошибки, ложные значения (`false`,
`''` и `undefined`) не включали состояние ошибки.

## Проп `onKeyPress` у TextInput, PasswordInput, TextArea и NumberInput

Эти компоненты больше не принимают устаревший проп `onKeyPress` на верхнем уровне. Используйте `onKeyDown`:

```diff
- <TextInput onKeyPress={handleKeyPress} />
+ <TextInput onKeyDown={handleKeyDown} />
```

В отличие от `onKeyPress`, `onKeyDown` вызывается для клавиш без символа и при вводе через IME, а его `event.charCode`
равен `0`. Проверяйте `event.key` и при необходимости `event.nativeEvent.isComposing`. Чтобы временно сохранить прежнее
поведение, передайте компоненту `controlProps={{onKeyPress: handleKeyPress}}`.

## Опция `theme` у `useColorGenerator`

`useColorGenerator` больше не принимает устаревшую опцию `theme`. Удалите её из вызова: хук автоматически использует
текущую тему из `ThemeProvider`:

```diff
- useColorGenerator({seed, theme: 'dark'})
+ useColorGenerator({seed})
```

## Проп `open` у Sheet

У `Sheet` удалены пропсы `visible` и `onClose`. Состояние открытия — необязательный `open`, и режим управления следует
за ним, как у `Menu`: с `open` шторка управляемая и закрывается, когда родитель устанавливает `open` в
`false`; без него шторка закрывается сама, а `onOpenChange` только сообщает об изменении. `defaultOpen` открывает
неуправляемую шторку при монтировании. Передача `onOpenChange` больше не переключает режим, поэтому его можно добавлять
ради аналитики.

| Было                                   | Стало                                                                                             |
| :------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `visible={visible}` с `onOpenChange`   | `open={open}` с `onOpenChange`                                                                    |
| `visible={visible}` без `onOpenChange` | `open={open}` с `onOpenChange={setOpen}` или `defaultOpen`                                        |
| `onClose`                              | `onOpenChange` — реакция на закрытие, `onTransitionOutComplete` — очистка после анимации закрытия |

```diff
- <Sheet visible={visible} onClose={() => setVisible(false)}>
+ <Sheet open={open} onOpenChange={setOpen}>
```

В v7 `visible` обязателен, в v8 его нет: TypeScript сообщит об оставшемся пропе, а чистый JavaScript его игнорирует, и
шторка остаётся закрытой. Неуправляемую шторку снаружи не переоткрыть; если она должна открываться снова, управляйте ею
через `open`. Причины `onOpenChange` и колбэки анимации не изменились.

## Остальное

| Что                                                                                    | Изменение                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Select` ([#2660](https://github.com/gravity-ui/uikit/pull/2660))                      | Попап отстоит от контрола на 4px вместо 1px — тот же отступ, что у `Popup`.                                                                                                                                                                                                                                                                                                                                                                                                 |
| Темы ([#2745](https://github.com/gravity-ui/uikit/pull/2745))                          | Переменные темы генерируются из `@gravity-ui/uikit-themer`. SCSS-модуль `@gravity-ui/uikit/styles/themes` и его миксины `g-theme-*` удалены: собирайте свою тему, как в [Темизации](theming-ru.md#создание-пользовательской-темы). Удалённые и добавленные токены перечислены в разделе [Цветовые токены themer v2](#цветовые-токены-themer-v2). Цвета немного сдвинулись, а значения записаны как `rgb(r g b / a)` — обновите эталонные скриншоты и снапшоты с литералами. |
| `Avatar` ([#2376](https://github.com/gravity-ui/uikit/pull/2376))                      | Проп `alt` удалён; изображение декоративное (`alt=""`).                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Типографика ([#2616](https://github.com/gravity-ui/uikit/pull/2616))                   | Акцентные тексты берут насыщенность из `--g-text-{group}-accent-font-weight`; `--g-text-accent-font-weight` устарела, и её переопределение больше не действует на `Breadcrumbs` и `Menu`.                                                                                                                                                                                                                                                                                   |
| `Progress` ([#2151](https://github.com/gravity-ui/uikit/pull/2151))                    | Компонент больше не центрирует себя (`margin: 0 auto` удалён).                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Lang`, `Platform` ([#2715](https://github.com/gravity-ui/uikit/pull/2715))            | Перечисления TypeScript заменены объектами `as const` и объединениями типов; `Lang.Ru` работает.                                                                                                                                                                                                                                                                                                                                                                            |
| `Dialog.Footer` ([#2657](https://github.com/gravity-ui/uikit/pull/2657))               | На десктопе кнопки больше не растягиваются и не имеют `min-width: 128px`; передайте `width` в `propsButtonApply` и `propsButtonCancel`. На мобильных они по-прежнему растянуты.                                                                                                                                                                                                                                                                                             |
| Зависимости ([#2858](https://github.com/gravity-ui/uikit/pull/2858))                   | `lodash` заменён на `es-toolkit` и больше не ставится вместе с пакетом: добавьте его в свои зависимости, если импортируете.                                                                                                                                                                                                                                                                                                                                                 |
| `Checkbox`, `Radio`, `Switch` ([#2342](https://github.com/gravity-ui/uikit/pull/2342)) | Размер `l` использует вариант шрифта `body-1`; обёртка `g-control-label__control-container` удалена.                                                                                                                                                                                                                                                                                                                                                                        |
| Стили hover ([#2832](https://github.com/gravity-ui/uikit/pull/2832))                   | Стили `:hover` применяются только на устройствах с наведением (`@media (hover: hover)`).                                                                                                                                                                                                                                                                                                                                                                                    |
| Миксин `button-reset` ([#2862](https://github.com/gravity-ui/uikit/pull/2862))         | Сбрасывает ещё `margin`, `appearance`, `user-select`, `touch-action` и подсветку тапа и больше не задаёт `outline: none`: элементы с ним показывают браузерное кольцо фокуса.                                                                                                                                                                                                                                                                                               |
| `Modal`, `Dialog` ([#2860](https://github.com/gravity-ui/uikit/pull/2860))             | Высота больше не анимируется при смене содержимого; `disableHeightTransition` удалён.                                                                                                                                                                                                                                                                                                                                                                                       |
| Тип `Keysets` ([#2854](https://github.com/gravity-ui/uikit/pull/2854))                 | Включает кейсет `HelloPangeaDnd`, а с [#2896](https://github.com/gravity-ui/uikit/pull/2896) и `FileDropZone`: для `addLanguageKeysets<Keysets>` нужны их ключи.                                                                                                                                                                                                                                                                                                            |
| `Select` на мобиле ([#2897](https://github.com/gravity-ui/uikit/pull/2897))            | `onClose` и `onOpenChange(false)` вызываются в начале закрытия шторки, как на десктопе, а не после анимации. Управляемый `Select` закрывает шторку, только когда его `open` становится `false`. Управляемый `filter` больше не сбрасывается в пустую строку при закрытии.                                                                                                                                                                                                   |
