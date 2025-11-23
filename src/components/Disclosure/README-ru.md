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

<!--LANDING_BLOCK

<ExampleBlock
code={`
function ControlledDisclosure() {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Disclosure summary="Summary" expanded={expanded} onUpdate={setExpanded}>
      Content
    </Disclosure>
  );
}
`}>
    <UIKit.Disclosure summary="Summary" defaultExpanded>
      Content
    </UIKit.Disclosure>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
code={`
<Disclosure summary="Middle size" size="m">
  Content
</Disclosure>
<Disclosure summary="Large size" size="l">
  Content
</Disclosure>
<Disclosure summary="Extra large size" size="xl">
  Content
</Disclosure>
`}
>
  <UIKit.Flex gap={4} alignItems="center">
    <UIKit.Disclosure summary="Middle size" size="m">
      Content
    </UIKit.Disclosure>
    <UIKit.Disclosure summary="Large size" size="l">
      Content
    </UIKit.Disclosure>
    <UIKit.Disclosure summary="Extra large size" size="xl">
      Content
    </UIKit.Disclosure>
  </UIKit.Flex>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
code={`
<Disclosure summary="Summary with start arrow" arrowPosition="start">
  Content
</Disclosure>
<Disclosure summary="Summary with end arrow" arrowPosition="end">
  Content
</Disclosure>
`}
>
  <UIKit.Flex gap={4} alignItems="center">
    <UIKit.Disclosure summary="Summary with start arrow" arrowPosition="start">
      Content
    </UIKit.Disclosure>
    <UIKit.Disclosure summary="Summary with end arrow" arrowPosition="end">
      Content
    </UIKit.Disclosure>
  </UIKit.Flex>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
code={`
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
  <Disclosure.Details>
    Custom Details
  </Disclosure.Details>
</Disclosure>
`}>
  <UIKit.Flex gap={4} alignItems="center">
    <UIKit.Disclosure>
      <UIKit.Disclosure.Summary>
        {(props) => (
          <UIKit.Button {...props}>
            <UIKit.Icon
              data={() => (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081" clip-rule="evenodd"/></svg>
              )}
              size={14}
            />
              Custom summary
            <UIKit.Icon
              data={() => (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081" clip-rule="evenodd"/></svg>
              )}
              size={14}
            />
           </UIKit.Button>
        )}
      </UIKit.Disclosure.Summary>
      <div>Custom details</div>
      <div>More custom details</div>
    </UIKit.Disclosure>
    <UIKit.Disclosure summary="Summary">
      <UIKit.Disclosure.Summary>
        {(_props, defaultButton) => (
          <UIKit.Flex gap={4}>
            {defaultButton}
            <UIKit.Icon
              data={() => (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081" clip-rule="evenodd"/></svg>
              )}
              size={14}
            />
          </UIKit.Flex>
        )}
      </UIKit.Disclosure.Summary>
      <UIKit.Disclosure.Details>
        Custom Details
      </UIKit.Disclosure.Details>
    </UIKit.Disclosure>
  </UIKit.Flex>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
code={`
<Disclosure summary="Summary" disabled>
  Content
</Disclosure>
`}
>
    <UIKit.Disclosure summary="Summary" disabled>
      Content
    </UIKit.Disclosure>
</ExampleBlock>

LANDING_BLOCK-->

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
