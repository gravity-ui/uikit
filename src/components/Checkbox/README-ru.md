<!--GITHUB_BLOCK-->

# Checkbox

<!--/GITHUB_BLOCK-->

```tsx
import {Checkbox} from '@gravity-ui/uikit';
```

Компонент `Checkbox` позволяет пользователю выбрать или отменить выбор определенного значения.

## Состояния

`Checkbox` может иметь разные состояния:

- `Checked` — чекбокс отмечен галочкой.
- `Disabled` — чекбокс недоступен.
- `Indeterminate` — чекбокс находится в промежуточном состоянии между отмеченным и неотмеченным.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Checkbox size="l" checked={false}>Unchecked</Checkbox>
<Checkbox size="l" checked>Checked</Checkbox>
<Checkbox size="l" disabled>Disabled</Checkbox>
<Checkbox size="l" indeterminate>Indeterminate</Checkbox>
`}
>
    <UIKit.Checkbox size="l" checked={false}>Unchecked</UIKit.Checkbox>
    <UIKit.Checkbox size="l" checked>Checked</UIKit.Checkbox>
    <UIKit.Checkbox size="l" disabled>Disabled</UIKit.Checkbox>
    <UIKit.Checkbox size="l" indeterminate>Indeterminate</UIKit.Checkbox>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Checkbox size="l" checked={false}>Unchecked</Checkbox>
<Checkbox size="l" checked>Checked</Checkbox>
<Checkbox size="l" disabled>Disabled</Checkbox>
<Checkbox size="l" indeterminate>Indeterminate</Checkbox>
```

<!--/GITHUB_BLOCK-->

## Размер

Размер `Checkbox` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Checkbox size="m">M Size</Checkbox>
<Checkbox size="l">L Size</Checkbox>
<Checkbox size="xl">XL Size</Checkbox>
`}
>
    <UIKit.Checkbox size="m">M Size</UIKit.Checkbox>
    <UIKit.Checkbox size="l">L Size</UIKit.Checkbox>
    <UIKit.Checkbox size="xl">XL Size</UIKit.Checkbox>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Checkbox size="m">M Size</Checkbox>
<Checkbox size="l">L Size</Checkbox>
<Checkbox size="xl">XL Size</Checkbox>
```

<!--/GITHUB_BLOCK-->

## Лейбл

Лейбл для `Checkbox` можно задать через свойство `content` или передать его как дочерний элемент.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
 <div>
  <Checkbox content="Content" size="l" />
  <div
      style={{
          marginTop: 10,
      }}
  >
      <Checkbox size="l">
          <span>Content as children</span>
      </Checkbox>
  </div>
</div>
`}
>
 <div>
  <UIKit.Checkbox content="Content" size="l" />
  <div
      style={{
          marginTop: 10,
      }}
  >
      <UIKit.Checkbox size="l">
          <span>Content as children</span>
      </UIKit.Checkbox>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div>
  <Checkbox content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Checkbox size="l">
      <span>Content as children</span>
    </Checkbox>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя            | Описание                                                                                                                |                      Тип                      | Значение по умолчанию |
| :------------- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-------------------: |
| children       | Содержимое чекбокса (как правило, лейбл).                                                                               |                  `ReactNode`                  |                       |
| content        | Содержимое чекбокса (альтернатива `children`).                                                                          |                  `ReactNode`                  |                       |
| disabled       | Включает или отключает состояние `disabled` у чекбокса.                                                                 |                   `boolean`                   |        `false`        |
| checked        | Включает или отключает состояние `checked` у чекбокса.                                                                  |                   `boolean`                   |        `false`        |
| defaultChecked | Задает начальное состояние `checked` при монтировании компонента.                                                       |                   `boolean`                   |        `false`        |
| onUpdate       | Срабатывает при изменении состояния чекбокса пользователем и передает значение `checked` как аргумент обратного вызова. |         `(checked: boolean) => void`          |                       |
| onChange       | Срабатывает при изменении состояния чекбокса пользователем и передает событие изменения как аргумент обратного вызова.  |                  `Function`                   |                       |
| onFocus        | Обработчик события, вызываемый, когда элемент ввода чекбокса получает фокус.                                            |                  `Function`                   |                       |
| onBlur         | Обработчик события, вызываемый, когда элемент ввода чекбокса теряет фокус.                                              |                  `Function`                   |                       |
| size           | Определяет размер чекбокса.                                                                                             |                    `m` `l`                    |          `m`          |
| id             | HTML-атрибут `id`.                                                                                                      |                   `string`                    |                       |
| qa             | HTML-атрибут `data-qa`, используется для тестирования.                                                                  |                   `string`                    |                       |
| style          | HTML-атрибут `style`.                                                                                                   |             `React.CSSProperties`             |                       |
| className      | HTML-атрибут `class`.                                                                                                   |                   `string`                    |                       |
| title          | HTML-атрибут `title`.                                                                                                   |                   `string`                    |                       |
| name           | HTML-атрибут `name` для элемента ввода.                                                                                 |                   `string`                    |                       |
| value          | HTML-атрибут `value` для элемента ввода.                                                                                |                   `string`                    |                       |
| indeterminate  | Включает или отключает состояние `indeterminate` у чекбокса.                                                            |                   `boolean`                   |        `false`        |
| controlProps   | Дополнительные свойства базового элемента ввода.                                                                        | `React.InputHTMLAttributes<HTMLInputElement>` |                       |
| controlRef     | Ссылка на базовый элемент ввода.                                                                                        |         `React.Ref<HTMLInputElement>`         |                       |
