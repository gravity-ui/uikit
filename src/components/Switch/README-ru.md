<!--GITHUB_BLOCK-->

# Switch

<!--/GITHUB_BLOCK-->

```tsx
import {Switch} from '@gravity-ui/uikit';
```

Компонент `Switch` (переключатель) используется для переключения между двумя состояниями: как правило, между **On** и **Off** или **Enabled** и **Disabled**.

## Состояния

`Switch` может иметь разные состояния:

- Checked — когда переключатель **включен**.
- Disabled — когда переключатель недоступен.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Switch size="l" checked={false}>Unchecked</Switch>
<Switch size="l" checked>Checked</Switch>
<Switch size="l" disabled>Disabled</Switch>
`}
>
    <UIKit.Switch size="l" checked={false}>Unchecked</UIKit.Switch>
    <UIKit.Switch size="l" checked>Checked</UIKit.Switch>
    <UIKit.Switch size="l" disabled>Disabled</UIKit.Switch>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Switch size="l" checked={false}>Unchecked</Switch>
<Switch size="l" checked>Checked</Switch>
<Switch size="l" disabled>Disabled</Switch>
```

<!--/GITHUB_BLOCK-->

## Размер

Размер `Switch` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Switch size="s">S Size</Switch>
<Switch size="m">M Size</Switch>
<Switch size="l">L Size</Switch>
`}
>
    <UIKit.Switch size="s">S Size</UIKit.Switch>
    <UIKit.Switch size="m">M Size</UIKit.Switch>
    <UIKit.Switch size="l">L Size</UIKit.Switch>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Switch size="s">S Size</Switch>
<Switch size="m">M Size</Switch>
<Switch size="l">L Size</Switch>
```

<!--/GITHUB_BLOCK-->

## Лейбл

Лейбл для `Switch` можно задать через свойство `content` или передать его как дочерний элемент.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<div>
  <Switch content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Switch size="l">
      <span>Content as children</span>
    </Switch>
  </div>
</div>
`}
>
<div>
  <UIKit.Switch content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <UIKit.Switch size="l">
      <span>Content as children</span>
    </UIKit.Switch>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div>
  <Switch content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Switch size="l">
      <span>Content as children</span>
    </Switch>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя            | Описание                                                                                                                     |                      Тип                      | Значение по умолчанию |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-------------------: |
| children       | Содержимое переключателя (как правило, лейбл).                                                                               |                  `ReactNode`                  |                       |
| content        | Содержимое переключателя (альтернатива `children`).                                                                          |                  `ReactNode`                  |                       |
| disabled       | Включает или отключает состояние `disabled` у переключателя.                                                                 |                   `boolean`                   |        `false`        |
| loading        | Включает или отключает состояние загрузки у переключателя.                                                                   |                   `boolean`                   |        `false`        |
| checked        | Включает или отключает состояние `checked` у переключателя.                                                                  |                   `boolean`                   |        `false`        |
| defaultChecked | Задает начальное состояние `checked` при монтировании компонента.                                                            |                   `boolean`                   |        `false`        |
| onUpdate       | Срабатывает при изменении состояния переключателя пользователем и передает значение `checked` как аргумент обратного вызова. |         `(checked: boolean) => void`          |                       |
| onChange       | Срабатывает при изменении состояния переключателя пользователем и передает событие изменения как аргумент обратного вызова.  |                  `Function`                   |                       |
| onFocus        | Обработчик события, вызываемый, когда элемент ввода переключателя получает фокус.                                            |                  `Function`                   |                       |
| onBlur         | Обработчик события, вызываемый, когда элемент ввода переключателя теряет фокус.                                              |                  `Function`                   |                       |
| size           | Определяет размер переключателя.                                                                                             |                  `s` `m` `l`                  |          `m`          |
| id             | HTML-атрибут `id`.                                                                                                           |                   `string`                    |                       |
| qa             | HTML-атрибут `data-qa`, используется для тестирования.                                                                       |                   `string`                    |                       |
| style          | HTML-атрибут `style`.                                                                                                        |             `React.CSSProperties`             |                       |
| className      | HTML-атрибут `class`.                                                                                                        |                   `string`                    |                       |
| title          | HTML-атрибут `title`.                                                                                                        |                   `string`                    |                       |
| name           | HTML-атрибут `name` для элемента ввода.                                                                                      |                   `string`                    |                       |
| value          | HTML-атрибут `value` для элемента ввода.                                                                                     |                   `string`                    |                       |
| indeterminate  | Включает или отключает состояние неопределенности переключателя.                                                             |                   `boolean`                   |        `false`        |
| controlProps   | Дополнительные свойства базового элемента ввода.                                                                             | `React.InputHTMLAttributes<HTMLInputElement>` |                       |
| controlRef     | Ссылка на базовый элемент ввода.                                                                                             |         `React.Ref<HTMLInputElement>`         |                       |
