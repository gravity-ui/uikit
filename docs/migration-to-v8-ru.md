# Миграция на v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Обзор

На этой странице собраны несовместимые изменения `@gravity-ui/uikit` v8 и способ пройти каждое из них. Каждый раздел
описывает, что изменилось, как временно сохранить старое поведение и куда двигаться дальше.

Компоненты, которые больше не развиваются, переезжают в точку входа `@gravity-ui/uikit/legacy`. У компонентов,
оставшихся в `/legacy`, API сохраняется, но дата удаления этой точки входа не обещается: запланируйте уход с них.

## Минимальная версия React 18

Для UIKit v8 нужны React и React DOM версии 18 или 19. Перед установкой v8 обновите оба пакета (и `@types/react`, если
используете его). React 16 и 17 больше не поддерживаются.

## `configure` и `getConfig`

Каждый вызов `configure` теперь создаёт новый объект конфигурации. Ранее сохранённый результат `getConfig()` больше не
отражает последующие изменения. Чтобы получить актуальную конфигурацию после вызова `configure`, вызовите `getConfig()`
ещё раз:

```ts
configure({lang: 'ru'});
const {lang} = getConfig(); // 'ru'
```

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

| Удалённый компонент | Замена                                                                           | Руководство по миграции                                                          |
| :------------------ | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `Breadcrumbs`       | [`Breadcrumbs`](../src/components/Breadcrumbs/README-ru.md)                      | [Пропсы, элементы и рендеринг](../src/components/Breadcrumbs/migration-guide.md) |
| `Popover`           | [`Popover`](../src/components/Popover/README.md)                                 | [Содержимое и поведение](../src/components/Popover/migration-guide.md)           |
| `Tabs`              | [`TabList`, `Tab`, `TabProvider` и `TabPanel`](../src/components/tabs/README.md) | [Элементы и выбор вкладки](../src/components/tabs/migration-guide.md)            |

В v8 для этих компонентов нет временной точки импорта. Замены уже доступны из корневой точки входа в v7, поэтому
мигрировать можно до обновления. Остальные legacy-компоненты остаются доступными.

**Переводы:** кейсет старого `Breadcrumbs` удалён. Актуальный компонент теперь использует кейсет `Breadcrumbs` вместо
`lab/Breadcrumbs`, поэтому существующие переопределения `Breadcrumbs.label_more` продолжат работать. Переименуйте
переопределения `lab/Breadcrumbs` в `Breadcrumbs`; актуальный кейсет также содержит `breadcrumbs`.

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

## Геометрия Dialog

У `Dialog` уменьшились отступы заголовка и содержимого. У заголовка отступы сверху и снизу составляют 12 и 8 px,
у содержимого — по 4 px, у футера — 24 и 28 px. Высота типичного диалога уменьшилась со 190 до 176 px. Кнопка
закрытия находится в 12 px от верхнего края и 16 px от конца строки на десктопе; на мобильном экране — в 12 px от
обоих краёв. Если заголовка или футера нет, между содержимым и соответствующим краем остаётся 20 или 24 px.
Проверьте собственное содержимое и CSS-переопределения с новыми отступами.

У корневого элемента больше нет класса `g-dialog_has-close`. Обновите зависящие от него селекторы; при необходимости
наличие кнопки закрытия можно проверить селектором `.g-dialog:has(.g-dialog-btn-close)`.

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

## Позиция попапа Select

Попап `Select` позиционируется от контрола, а не от всего компонента: если под контролом показан текст ошибки
(`errorPlacement="outside"`, по умолчанию), попап открывается сразу под контролом и, пока открыт, закрывает текст
ошибки. Ширина попапа не изменилась. Вернуть прежнее положение нельзя.

Контрол обёрнут в новую обёртку `g-select__anchor` между корнем и контролом (`g-select-control`). Обновите селекторы,
которые рассчитывают на то, что контрол — прямой потомок корня, например `.g-select > .g-select-control`.

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
- **`DefaultPropsProvider` больше не принимает ключ `TableColumnSetup`.** Сам `TableColumnSetup` не читает пропсы
  по умолчанию из провайдера: передавайте их компоненту явно.
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

## Опция `theme` у `useColorGenerator`

`useColorGenerator` больше не принимает устаревшую опцию `theme`. Удалите её из вызова: хук автоматически использует
текущую тему из `ThemeProvider`:

```diff
- useColorGenerator({seed, theme: 'dark'})
+ useColorGenerator({seed})
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
