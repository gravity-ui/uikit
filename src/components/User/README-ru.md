<!--GITHUB_BLOCK-->

# User

<!--/GITHUB_BLOCK-->

```tsx
import {User} from '@gravity-ui/uikit';
```

`User` (пользователь) — это общий компонент для отображения аватара пользователя с информационным блоком. Он рендерит аватар через компонент [Avatar](../Avatar/README.md), но также может принимать пользовательский узел React в качестве аватара.

## Имя и описание

Для отображения информационного блока компонент `User` использует свойства `name` и `description`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
`}
>
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

## Размер

Размер `User` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`. Возможные значения: `xs`, `s`, `m`, `l` и `xl`.

Это свойство также применимо к внутреннему компоненту `Avatar`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xs" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="s" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="m" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xl" />
`}
>
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xs" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="s" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="m" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xl" />
</ExampleBlock>

LANDING_BLOCK-->

## Свойства

| Имя             | Описание                                               |                                   Тип                                   | Значение по умолчанию |
| :-------------- | :----------------------------------------------------- | :---------------------------------------------------------------------: | :-------------------: |
| avatar          | Аватар пользователя.                                   | [Свойство аватара](../Avatar/README.md#properties) `React.ReactElement` |                       |
| name            | Имя пользователя.                                      |                            `React.ReactNode`                            |                       |
| description     | Описание пользователя.                                 |                            `React.ReactNode`                            |                       |
| size            | Размер секции пользователя.                            |                     `'xs'` `'s'` `'m'` `'l'` `'xl'`                     |          `m`          |
| aria-label      | Атрибут `aria-labelledby` для секции пользователя.     |                                `string`                                 |                       |
| aria-labelledby | Атрибут `aria-labelledby` для секции пользователя.     |                                `string`                                 |                       |
| className       | Пользовательский CSS-класс корневого элемента.         |                                `string`                                 |                       |
| style           | HTML-атрибут `style`.                                  |                          `React.CSSProperties`                          |                       |
| qa              | HTML-атрибут `data-qa`, используется для тестирования. |                                `string`                                 |                       |
