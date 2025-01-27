<!--GITHUB_BLOCK-->

# Link

<!--/GITHUB_BLOCK-->

```tsx
import {Link} from '@gravity-ui/uikit';
```

`Link` (ссылка) — это часть текста, при нажатии на которую пользователь переходит на другую часть текущей страницы, на другую страницу в рамках сервиса или на страницу внешнего сайта.

Главное отличие `Link` от [Button](../Button) заключается в функции навигации. Чаще всего `Link` ведет на другую страницу или открывает новую вкладку браузера.

## Внешний вид

Существует три типа ссылок: `normal` (стандартный коричневый), `primary` (черный) и `secondary` (серый). Внешний вид ссылки можно изменять с помощью свойства `view`. Также можно включить отображение того, что на ссылку уже нажимали, используя свойство `visitable`.

### Тип `normal`

Это наиболее привычный и общепринятый шаблон компонента `link`. Применяется для визуального выделения элемента внутри текста или таблицы, а также для навигации. Можно использовать его для перехода как на внутренние страницы, так и на внешние источники, включая документацию. Кроме того, этот тип используется для страниц с ошибками и нулевых состояний.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link view="normal" href="#">Link</Link>
`}>
    <UIKit.Link view="normal" href="#">Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link view="normal" href="#">
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

### Тип `primary`

Этот тип используется, когда очевидно, что элемент является кликабельным, но использование коричневого компонента `Link` будет перегружать интерфейс и мешать выделению ключевых моментов на странице.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link view="primary" href="#">Link</Link>
`}>
    <UIKit.Link view="primary" href="#">Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link view="primary" href="#">
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

### Тип `secondary`

Как и `primary`, этот тип `Link` используется, когда пользователю очевидно, что элемент кликабелен, но навигация по нему не является обязательной и затрагивает лишь небольшое количество сценариев. Его основная цель — не отвлекать пользователя от ключевых моментов на странице. Тип `secondary` чаще всего используется в хлебных крошках или при отображении вторичных атрибутов.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link view="secondary" href="#">Link</Link>
`}>
    <UIKit.Link view="secondary" href="#">Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link view="secondary" href="#">
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

### `Visitable`

Это свойство используется, чтобы показать, что на `Link` уже нажимали.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link href="https://gravity-ui.com/" visitable>Link</Link>
`}>
    <UIKit.Link href="https://gravity-ui.com/" visitable>Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link href="https://gravity-ui.com/" visitable>
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

## `href`

Свойство `href` является обязательным.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link href="#">Link with href</Link>
`}>
    <UIKit.Link href="#">Link with href</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link href="#">Link with href</Link>
```

<!--/GITHUB_BLOCK-->

## Использование

`Link` можно использовать и как независимый текстовый элемент, и как часть текста.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Text>
    <Link href="#">what roles are active in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link href="#">folder</Link> or <Link href="#">cloud</Link>
</Text>
`}>
    <UIKit.Text>
        <UIKit.Link href="#">what roles are active in the service</UIKit.Link>
    </UIKit.Text>
    <UIKit.Text>
        Currently, this role can only be assigned to a <UIKit.Link href="#">folder</UIKit.Link> or <UIKit.Link href="#">cloud</UIKit.Link>
    </UIKit.Text>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text>
    <Link href="#">What roles are available in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link href="#">folder</Link> or <Link href="#">cloud</Link>
</Text>
```

<!--/GITHUB_BLOCK-->

## Свойства

`Link` принимает все допустимые свойства элемента `a`, и следующие свойства:

| Имя       | Описание                                              |                 Тип                  | Значение по умолчанию |
| :-------- | :---------------------------------------------------- | :----------------------------------: | :-------------------: |
| children  | Содержимое ссылки                                     |          `React.ReactNode`           |                       |
| href      | HTML-атрибут `href`                                   |               `string`               |                       |
| qa        | HTML-атрибут `data-qa`, используется для тестирования |               `string`               |                       |
| underline | Отображает подчеркивание у ссылки                     |              `boolean`               |        `false`        |
| view      | Внешний вид ссылки                                    | `"normal"` `"primary"` `"secondary"` |      `"normal"`       |
| visitable | Отображает CSS-состояние `:visitable`                 |              `boolean`               |        `false`        |
