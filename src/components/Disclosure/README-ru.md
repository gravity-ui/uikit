<!--GITHUB_BLOCK-->

# Disclosure

<!--/GITHUB_BLOCK-->

```tsx
import {Disclosure} from '@gravity-ui/uikit';
```

`Disclosure` — компонент раскрытия, который показывает и скрывает вложенный контент.

<!--GITHUB_BLOCK-->

## Базовый пример

```tsx
<Disclosure summary="Summary">Content</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Управление состоянием раскрытия

Вы можете управлять состоянием раскрытия компонента, используя свойства `expanded` и `onUpdate`.

Пример управления состоянием:

<!--SANDBOX
import {Disclosure} from '@gravity-ui/uikit';

export default function () {
    return (
        <Disclosure summary="Summary" defaultExpanded>
            Content
        </Disclosure>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
function ControlledDisclosure() {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Disclosure summary="Summary" expanded={expanded} onUpdate={setExpanded}>
      Content
    </Disclosure>
  );
}
```

<!--/GITHUB_BLOCK-->

## Размер

Используйте свойство `size` для управления размером `Disclosure`. Размер по умолчанию — `m`.

<!--SANDBOX
import {Disclosure, Flex} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex gap={4} alignItems="center">
            <Disclosure summary="Middle size" size="m">
                Content
            </Disclosure>
            <Disclosure summary="Large size" size="l">
                Content
            </Disclosure>
            <Disclosure summary="Extra large size" size="xl">
                Content
            </Disclosure>
        </Flex>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Middle size" size="m">
  Content
</Disclosure>
<Disclosure summary="Large size" size="l">
  Content
</Disclosure>
<Disclosure summary="Extra large size" size="xl">
  Content
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Позиция стрелки

`start`: Стрелка расположена в начале заголовка (используется по умолчанию).

`end`: Стрелка расположена в конце заголовка.

<!--SANDBOX
import {Disclosure, Flex} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex gap={4} alignItems="center">
            <Disclosure summary="Summary with start arrow" arrowPosition="start">
                Content
            </Disclosure>
            <Disclosure summary="Summary with end arrow" arrowPosition="end">
                Content
            </Disclosure>
        </Flex>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Summary with start arrow" arrowPosition="start">
  Content
</Disclosure>
<Disclosure summary="Summary with end arrow" arrowPosition="end">
  Content
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Пользовательский контент

Используйте компонент `Disclosure.Summary` для создания пользовательского заголовка и компонент `Disclosure.Details` для заполнения пользовательского контента.

<!--SANDBOX
import {Check} from '@gravity-ui/icons';
import {Button, Disclosure, Flex, Icon} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex gap={4} alignItems="center">
            <Disclosure>
                <Disclosure.Summary>
                    {(props) => (
                        <Button {...props}>
                            <Icon data={Check} size={14} />
                            Custom summary
                            <Icon data={Check} size={14} />
                        </Button>
                    )}
                </Disclosure.Summary>
                <div>Custom details</div>
                <div>More custom details</div>
            </Disclosure>
            <Disclosure summary="Summary">
                <Disclosure.Summary>
                    {(_props, defaultButton) => (
                        <Flex gap={4}>
                            {defaultButton}
                            <Icon data={Check} size={14} />
                        </Flex>
                    )}
                </Disclosure.Summary>
                <Disclosure.Details>Custom Details</Disclosure.Details>
            </Disclosure>
        </Flex>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure>
  <Disclosure.Summary>
    {(props) => (
      <Button {...props}>
        <Icon data={Check} size={14} />
        Custom summary
        <Icon data={Check} size={14} />
      </Button>
    )}
  </Disclosure.Summary>
  <div>Custom details</div>
  <div>More custom details</div>
</Disclosure>
```

```tsx
<Disclosure>
  <Disclosure.Summary>
    {(_props, defaultButton) => (
      <Flex gap={4}>
        {defaultButton}
        <Icon data={Check} size={14} />
      </Flex>
    )}
  </Disclosure.Summary>
  <Disclosure.Details>Custom Details</Disclosure.Details>
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Отключенное состояние

`Disclosure` может быть отключен с помощью свойства `disabled`.

<!--SANDBOX
import {Disclosure} from '@gravity-ui/uikit';

export default function () {
    return (
        <Disclosure summary="Summary" disabled>
            Content
        </Disclosure>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Summary" disabled>
  Content
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Свойства

### Disclosure

| Имя              | Описание                                                        | Тип                                                   | Значение по умолчанию |
| :--------------- | :-------------------------------------------------------------- | :---------------------------------------------------- | :-------------------- |
| size             | Размер компонента                                               | `"m"` `"l"` `"xl"`                                    | `"m"`                 |
| className        | Имя CSS-класса корневого элемента                               | `string`                                              |                       |
| disabled         | Отключенное состояние                                           | `boolean`                                             | `false`               |
| defaultExpanded  | Состояние раскрытия по умолчанию                                | `boolean`                                             | `false`               |
| expanded         | Контролируемое состояние раскрытия                              | `boolean`                                             |                       |
| arrowPosition    | Положение контрола                                              | `"start"` `"end"`                                     | `"start"`             |
| summary          | Краткое описание контента                                       | `React.ReactNode`                                     |                       |
| keepMounted      | Сохранение контента в DOM при скрытии                           | `boolean`                                             | `true`                |
| onUpdate         | Обратный вызов, срабатывающий при изменении состояния раскрытия | `(expanded: boolean) => void`                         |                       |
| onSummaryKeyDown | Обратный вызов, срабатывающий при фокусе заголовка              | `(e: React.KeyboardEvent<HTMLButtonElement>) => void` |                       |
| children         | Контент                                                         | `React.ReactNode`                                     |                       |
| qa               | Идентификатор для тестирования                                  | `string`                                              |                       |

### Disclosure.Summary

| Имя      | Описание                       | Тип                                             | Значение по умолчанию |
| :------- | :----------------------------- | :---------------------------------------------- | :-------------------- |
| children | Функция рендеринга             | `(props, defaultSummary) => React.ReactElement` |                       |
| qa       | Идентификатор для тестирования | `string`                                        | `disclosure-summary`  |

### Disclosure.Details

| Имя      | Описание                       | Тип               | Значение по умолчанию |
| :------- | :----------------------------- | :---------------- | :-------------------- |
| children | Контент                        | `React.ReactNode` |                       |
| qa       | Идентификатор для тестирования | `string`          | `disclosure-details`  |

## CSS API

| Имя                                  | Описание                                                           |
| :----------------------------------- | :----------------------------------------------------------------- |
| `--g-disclosure-text-color`          | Цвет текста краткого описания контента                             |
| `--g-disclosure-text-color-disabled` | Цвет текста краткого описания контента в заблокированном состоянии |
