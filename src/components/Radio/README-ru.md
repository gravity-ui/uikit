<!--GITHUB_BLOCK-->

# Radio

<!--/GITHUB_BLOCK-->

```tsx
import {Radio} from '@gravity-ui/uikit';
```

Компонент `Radio` позволяет пользователям выбрать один вариант из списка.

## Состояния

`Radio` поддерживает следующие состояния:

- Checked — радио выбрано.
- Disabled — радио недоступно для выбора.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Radio value="option 1" content="Unchecked" size="l" checked={false}/>
<Radio value="option 2" content="Checked" size="l" checked/>
<Radio value="option 3" content="Disabled" size="l" disabled/>
`}
>
    <UIKit.Radio value="option 1" content="Unchecked" size="l" checked={false}/>
    <UIKit.Radio value="option 2" content="Checked" size="l" checked/>
    <UIKit.Radio value="option 3" content="Disabled" size="l" disabled/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Radio value="option 1" content="Unchecked" size="l" checked={false}/>
<Radio value="option 2" content="Checked" size="l" checked/>
<Radio value="option 3" content="Disabled" size="l" disabled/>
```

<!--/GITHUB_BLOCK-->

## Размер

Размер `Radio` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Radio value="option 1" content="M Size" size="m"/>
<Radio value="option 2" content="L Size" size="l"/>
<Radio value="option 3" content="XL Size" size="xl"/>
`}
>
    <UIKit.Radio value="option 1" content="M Size" size="m"/>
    <UIKit.Radio value="option 2" content="L Size" size="l"/>
    <UIKit.Radio value="option 3" content="XL Size" size="xl"/>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Radio value="option 1" content="M Size" size="m"/>
<Radio value="option 2" content="L Size" size="l"/>
<Radio value="option 3" content="XL Size" size="xl"/>
```

<!--/GITHUB_BLOCK-->

## Лейбл

Лейбл для `Radio` можно задать через свойство `content` или передать его как дочерний элемент.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<div>
  <Radio content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Radio size="l">
      <span>Content as children</span>
    </Radio>
  </div>
</div>
`}
>
<div>
  <UIKit.Radio content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <UIKit.Radio size="l">
      <span>Content as children</span>
    </UIKit.Radio>
  </div>
</div>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<div>
  <Radio content="Content" size="l" />
  <div
    style={{
      marginTop: 10,
    }}
  >
    <Radio size="l">
      <span>Content as children</span>
    </Radio>
  </div>
</div>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя            | Описание                                                                                                             |                      Тип                      | Значение по умолчанию |
| :------------- | :------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-------------------: |
| children       | Содержимое радио (как правило, лейбл).                                                                               |                  `ReactNode`                  |                       |
| content        | Содержимое радио (альтернатива `children`).                                                                          |                  `ReactNode`                  |                       |
| disabled       | Включает или отключает состояние `disabled` у радио.                                                                 |                   `boolean`                   |        `false`        |
| checked        | Включает или отключает состояние `checked` у радио.                                                                  |                   `boolean`                   |        `false`        |
| defaultChecked | Задает начальное состояние `checked` при монтировании компонента.                                                    |                   `boolean`                   |        `false`        |
| onUpdate       | Срабатывает при изменении состояния радио пользователем и передает значение `checked` как аргумент обратного вызова. |         `(checked: boolean) => void`          |                       |
| onChange       | Срабатывает при изменении состояния радио пользователем и передает событие изменения как аргумент обратного вызова.  |                  `Function`                   |                       |
| onFocus        | Обработчик события, вызываемый, когда элемент ввода радио получает фокус.                                            |                  `Function`                   |                       |
| onBlur         | Обработчик события, вызываемый, когда элемент ввода радио теряет фокус.                                              |                  `Function`                   |                       |
| size           | Определяет размер радио.                                                                                             |                    `m` `l`                    |          `m`          |
| id             | HTML-атрибут `id`.                                                                                                   |                   `string`                    |                       |
| qa             | HTML-атрибут `data-qa`, используется для тестирования.                                                               |                   `string`                    |                       |
| style          | HTML-атрибут `style`.                                                                                                |             `React.CSSProperties`             |                       |
| className      | HTML-атрибут `class`.                                                                                                |                   `string`                    |                       |
| title          | HTML-атрибут `title`.                                                                                                |                   `string`                    |                       |
| name           | HTML-атрибут `name` для элемента ввода.                                                                              |                   `string`                    |                       |
| value          | Значение контрола.                                                                                                   |                   `string`                    |                       |
| indeterminate  | Включает или отключает состояние неопределенности радио.                                                             |                   `boolean`                   |        `false`        |
| controlProps   | Дополнительные свойства базового элемента ввода.                                                                     | `React.InputHTMLAttributes<HTMLInputElement>` |                       |
| controlRef     | Ссылка на базовый элемент ввода.                                                                                     |         `React.Ref<HTMLInputElement>`         |                       |
