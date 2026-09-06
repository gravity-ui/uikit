<!--GITHUB_BLOCK-->

# ActionTooltip

<!--/GITHUB_BLOCK-->

`ActionTooltip` — это простая текстовая подсказка, использующая в качестве якоря дочерний элемент. Для правильной работы элемент-якорь должен поддерживать события мыши и события получения или потери фокуса.

## Использование

```tsx
import {ActionTooltip} from '@gravity-ui/uikit';

<ActionTooltip title="Content">
  <div tabIndex={0}>Anchor</div>
</ActionTooltip>;
```

## Группа задержки

Ряд кнопок с действиями — основной случай для
[`TooltipDelayGroup`](../Tooltip/README-ru.md#группа-задержки): первый тултип группы ждет свой `openDelay`,
соседние открываются мгновенно, пока группа теплая.

```tsx
import {ActionTooltip, TooltipDelayGroup} from '@gravity-ui/uikit';

<TooltipDelayGroup>
  <ActionTooltip title="Полужирный" hotkey="mod+b">
    <Button view="flat">{/* ... */}</Button>
  </ActionTooltip>
  <ActionTooltip title="Курсив" hotkey="mod+i">
    <Button view="flat">{/* ... */}</Button>
  </ActionTooltip>
</TooltipDelayGroup>;
```

## Свойства

| Имя              | Описание                                                                                   |                       Тип                        | Значение по умолчанию |
| :--------------- | ------------------------------------------------------------------------------------------ | :----------------------------------------------: | :-------------------: |
| children         | Элемент-якорь для `Tooltip`. Должен принимать `ref` для передачи DOM-элемента.             |               `React.ReactElement`               |                       |
| closeDelay       | Время задержки в миллисекундах перед скрытием `Tooltip` после увода курсора с элемента.    |                     `number`                     |          `0`          |
| openDelay        | Время задержки в миллисекундах перед показом `Tooltip` после наведения курсора на элемент. |                     `number`                     |         `250`         |
| placement        | Положение `Tooltip` относительно якоря.                                                    | [`PopupPlacement`](../Popup/README.md#placement) |                       |
| qa               | HTML-атрибут `data-qa`, используется для тестирования.                                     |                     `string`                     |                       |
| title            | Текст заголовка для тултипа.                                                               |                     `string`                     |                       |
| description      | Текст описания в тултипе.                                                                  |                     `string`                     |                       |
| hotkey           | Горячие клавиши, назначенные на действие в интерфейсе.                                     |                     `string`                     |                       |
| id               | Используется для реализации логики доступности.                                            |                     `string`                     |                       |
| disablePortal    | Отключает использование `Portal` для дочерних элементов.                                   |                    `boolean`                     |                       |
| contentClassName | HTML-атрибут `class` для узла с содержимым.                                                |                     `string`                     |                       |
| disabled         | Блокирует открытие всплывающего окна.                                                      |                    `boolean`                     |        `false`        |
