<!--GITHUB_BLOCK-->

# Text

<!--/GITHUB_BLOCK-->

```tsx
import {Text} from '@gravity-ui/uikit';
```

## Вариант шрифта (`variant`)

Шрифты по умолчанию, которые могут быть переопределены в рамках проекта. Список всех доступных шрифтов можно найти [здесь](https://preview.gravity-ui.com/uikit/?path=/story/typography--variants).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text variant="body-1">some text</Text>
<Text variant="caption-2">some text</Text>
<Text variant="display-3">some text</Text>
`}>
    <UIKit.Text variant="body-1">some text</UIKit.Text>
    <UIKit.Text variant="caption-2">some text</UIKit.Text>
    <UIKit.Text variant="display-3">some text</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text variant="body-1">some text</Text>
<Text variant="caption-2">some text</Text>
<Text variant="display-3">some text</Text>
```

<!--/GITHUB_BLOCK-->

### Многоточие

Это свойство позволяет скрывать переполняющий текст:

`false` — используется по умолчанию;

`true` — скрытый переполняющий текст будет заменен на многоточие (`…`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text ellipsis={false}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
<Text ellipsis={true}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
`}>
    <UIKit.Text ellipsis={false}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
    <UIKit.Text ellipsis={true}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text ellipsis={false}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab
    rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente
    exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
<Text ellipsis={true}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab
    rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente
    exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
```

<!--/GITHUB_BLOCK-->

### Пробел

Соответствует CSS-свойству `white-space`. Может принимать значения `nowrap` или `break-spaces`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"nowrap"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"break-spaces"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
`}>
    <UIKit.Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</UIKit.Text>
    <UIKit.Text whiteSpace={"nowrap"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</UIKit.Text>
    <UIKit.Text whiteSpace={"break-spaces"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"nowrap"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
<Text whiteSpace={"break-spaces"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
```

<!--/GITHUB_BLOCK-->

### Перенос слов

Соответствует CSS-свойству `word-break`. Единственное значение — `break-all`. | `break-word`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
<Text wordBreak="break-all">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
`}>
    <UIKit.Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
    <UIKit.Text wordBreak="break-all">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic
    delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam
    quibusdam libero ipsa veritatis quisquam!</Text>
<Text wordBreak="break-all">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus
    est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente
    exercitationem aperiam quibusdam libero ipsa veritatis quisquam!</Text>
```

<!--/GITHUB_BLOCK-->

### Цвет

Задает цвет текста. Доступные цвета:
`primary`, `complementary`, `secondary`, `hint`, `info`, `info-heavy`, `positive`, `positive-heavy`, `warning`, `warning-heavy`, `danger`, `danger-heavy`, `utility`, `utility-heavy`, `misc`, `misc-heavy`, `brand`, `link`, `link-hover`, `link-visited`, `link-visited-hover`, `dark-primary`, `dark-complementary`, `dark-secondary`, `light-primary`, `light-complementary`, `light-secondary`, `light-hint`, `inverted-primary`, `inverted-complementary`, `inverted-secondary` и `inverted-hint`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Text color="info">some text</Text>
<Text color="positive">some text</Text>
<Text color="warning">some text</Text>
`}>
    <UIKit.Text color="info">some text</UIKit.Text>
    <UIKit.Text color="positive">some text</UIKit.Text>
    <UIKit.Text color="warning">some text</UIKit.Text>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text color="info">some text</Text>
<Text color="positive">some text</Text>
<Text color="warning">some text</Text>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя           | Описание                                                                 |                    Тип                     | Значение по умолчанию |
| :------------ | :----------------------------------------------------------------------- | :----------------------------------------: | :-------------------: |
| children      | Текстовое содержимое.                                                    |             `React.ReactNode`              |                       |
| className     | HTML-атрибут `class`.                                                    |                  `string`                  |                       |
| id            | HTML-атрибут `id`.                                                       |                  `string`                  |                       |
| as            | Позволяет переопределить HTML-тег по умолчанию.                          |          `React.ElementType<any>`          |                       |
| style         | HTML-атрибут `style`.                                                    |           `React.CSSProperties`            |                       |
| variant       | Шрифт текста.                                                            |                  `string`                  |      `"body-1"`       |
| ellipsis      | Скрытый переполняющий текст будет заменен на многоточие.                 |                 `boolean`                  |                       |
| ellipsisLines | Количество полных строк текста, после которых содержимое будет обрезано. |                  `number`                  |                       |
| whiteSpace    | CSS-свойство `white-space`.                                              |        `"nowrap"` `"break-spaces"`         |                       |
| wordBreak     | CSS-свойство `word-break`.                                               |        `"break-all"` `"break-word"`        |                       |
| color         | Цвет текста.                                                             | `string` (см. значения в разделе **Цвет**) |                       |
| qa            | HTML-атрибут `data-qa`, используется для тестирования.                   |                  `string`                  |                       |
