<!--GITHUB_BLOCK-->

# User

<!--/GITHUB_BLOCK-->

```tsx
import {User} from '@gravity-ui/uikit';
```

`User` (пользователь) — это общий компонент для отображения аватара пользователя с информационным блоком. Он рендерит аватар через компонент [Avatar](../Avatar/README.md), но также может принимать пользовательский узел React в качестве аватара.

## Имя и описание

Для отображения информационного блока компонент `User` использует свойства `name` и `description`.

<!--SANDBOX
import {User} from '@gravity-ui/uikit';

export default function () {
    return (
        <User
            avatar={{text: 'Charles Darwin', theme: 'brand'}}
            name="Charles Darwin"
            description="charles@mail.ai"
            size="l"
        />
    );
}
SANDBOX-->

## Размер

Размер `User` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`. Возможные значения: `xs`, `s`, `m`, `l` и `xl`.

Это свойство также применимо к внутреннему компоненту `Avatar`.

<!--SANDBOX
import {User} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <User
                avatar={{text: 'Charles Darwin', theme: 'brand'}}
                name="Charles Darwin"
                description="charles@mail.ai"
                size="xs"
            />
            <User
                avatar={{text: 'Charles Darwin', theme: 'brand'}}
                name="Charles Darwin"
                description="charles@mail.ai"
                size="s"
            />
            <User
                avatar={{text: 'Charles Darwin', theme: 'brand'}}
                name="Charles Darwin"
                description="charles@mail.ai"
                size="m"
            />
            <User
                avatar={{text: 'Charles Darwin', theme: 'brand'}}
                name="Charles Darwin"
                description="charles@mail.ai"
                size="l"
            />
            <User
                avatar={{text: 'Charles Darwin', theme: 'brand'}}
                name="Charles Darwin"
                description="charles@mail.ai"
                size="xl"
            />
        </>
    );
}
SANDBOX-->

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
