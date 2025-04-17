<!--GITHUB_BLOCK-->

# Breadcrumbs

<!--/GITHUB_BLOCK-->

```tsx
import {Breadcrumbs} from '@gravity-ui/uikit';
```

`Breadcrumbs` (хлебные крошки) — это навигационный элемент, показывающий текущее расположение страницы в иерархии веб-сайта. Он содержит ссылки, позволяющие пользователю вернуться на более высокие уровни иерархии, что упрощает навигацию по многоуровневым сайтам. Хлебные крошки незаменимы для крупных веб-сайтов и приложений с иерархической структурой страниц.

## Пример

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
    <Breadcrumbs.Item>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item>City</Breadcrumbs.Item>
    <Breadcrumbs.Item>District</Breadcrumbs.Item>
    <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item>Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Country</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Street</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item>Region</Breadcrumbs.Item>
  <Breadcrumbs.Item>Country</Breadcrumbs.Item>
  <Breadcrumbs.Item>City</Breadcrumbs.Item>
  <Breadcrumbs.Item>District</Breadcrumbs.Item>
  <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsExample />

<!--/GITHUB_BLOCK-->

### События

Используйте свойство `onAction` как обратный вызов для обработки событий клика по элементам.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs onAction={(id) => alert(id)}>
    <Breadcrumbs.Item key={1}>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item key={2}>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item key={3}>City</Breadcrumbs.Item>
    <Breadcrumbs.Item key={4}>District</Breadcrumbs.Item>
    <Breadcrumbs.Item key={5}>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs onAction={(id) => alert(id)}>
        <UIKit.Breadcrumbs.Item key={1}>Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={2}>Country</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={3}>City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={4}>District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={5}>Street</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const [currentId, setCurrentId] = React.useState();
const items = [
    {id: 1, label: 'Region'},
    {id: 2, label: 'Country'},
    {id: 3, label: 'City'},
    {id: 4, label: 'District'},
    {id: 5, label: 'Street'},
]
<div>
    <Breadcrumbs onAction={setCurrentId}>
        {items.map((i) => <Breadcrumbs.Item key={i.id}>{i.label}</Breadcrumbs.Item>)}
    </Breadcrumbs>
    <p>You clicked item ID: {currentId}</p>
</div>
```

<!-- Storybook example -->

<BreadcrumbsEvents />

<!--/GITHUB_BLOCK-->

### Ссылки

В компоненте `Breadcrumbs` клик по элементу обычно вызывает `onAction`. Однако вы также можете использовать его в качестве ссылки на другую страницу или сайт. Для этого добавьте свойство `href` в компонент `<Breadcrumbs.Item>`:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item href="/">Home</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="/components">Components</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsLinks />

<!--/GITHUB_BLOCK-->

### Корневой контекст

Для лучшего понимания пользователем общей структуры некоторые приложения всегда отображают начальную точку (корневой элемент) хлебных крошек, даже если другие элементы скрыты из-за ограничений пространства.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Box overflow="hidden" width={200}>
    <Breadcrumbs showRoot>
        <Breadcrumbs.Item key="home">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item key="trendy">Trendy</Breadcrumbs.Item>
        <Breadcrumbs.Item key="2020 assets">March 2020 Assets</Breadcrumbs.Item>
        <Breadcrumbs.Item key="winter">Winter</Breadcrumbs.Item>
        <Breadcrumbs.Item key="holiday">Holiday</Breadcrumbs.Item>
    </Breadcrumbs>
</Box>
`}
>
<UIKit.Box overflow="hidden" width={200}>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item key="home">Home</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="trendy">Trendy</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="2020 assets">March 2020 Assets</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="winter">Winter</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="holiday">Holiday</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</UIKit.Box>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Box overflow="hidden" width={200}>
  <Breadcrumbs showRoot>
    <Breadcrumbs.Item key="home">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item key="trendy">Trendy</Breadcrumbs.Item>
    <Breadcrumbs.Item key="2020 assets">March 2020 Assets</Breadcrumbs.Item>
    <Breadcrumbs.Item key="winter">Winter</Breadcrumbs.Item>
    <Breadcrumbs.Item key="holiday">Holiday</Breadcrumbs.Item>
  </Breadcrumbs>
</Box>
```

<!-- Storybook example -->

<BreadcrumbsRootContext />

<!--/GITHUB_BLOCK-->

### Разделитель

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs separator=">">
    <Breadcrumbs.Item>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item>City</Breadcrumbs.Item>
    <Breadcrumbs.Item>District</Breadcrumbs.Item>
    <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs separator=">">
        <UIKit.Breadcrumbs.Item>Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Country</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Street</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs separator="›">
  {breadcrumbs}
</Breadcrumbs>
<Breadcrumbs separator="—">
  {breadcrumbs}
</Breadcrumbs>
<Breadcrumbs separator={<ChevronRight />}>
  {breadcrumbs}
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsSeparator />

<!--/GITHUB_BLOCK-->

### Хлебные крошки с иконками

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <House /> uikit
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Flame /> components
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Rocket style={{minWidth: 16}} />
      <Text ellipsis variant="inherit">
        Breadcrumbs
      </Text>
    </Flex>
  </Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKitExamples.BreadcrumbsCustomIconExample />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <House /> uikit
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Flame /> components
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Rocket style={{minWidth: 16}} />
      <Text ellipsis variant="inherit">
        Breadcrumbs
      </Text>
    </Flex>
  </Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsWithIcons />

<!--/GITHUB_BLOCK-->

### Интеграция с роутерами

<!--GITHUB_BLOCK-->

#### React Router

```jsx
import {useLinkClickHandler, useHref} from 'react-router';
import {Breadcrumbs, BreadcrumbsItem} from '@gravity-ui/uikit';

function RouterLink({to, ...rest}) {
  const href = useHref(to);
  const onClick = useLinkClickHandler(to);
  return <BreadcrumbsItem {...rest} href={href} onClick={onClick} />;
}

function Navigation() {
  return (
    <Breadcrumbs itemComponent={RouterLink}>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/components">Components</RouterLink>
      <RouterLink to="/components/breadcrumbs">Breadcrumbs</RouterLink>
    </Breadcrumbs>
  );
}
```

#### Next.js

```jsx
import Link from 'next/link';
import {Breadcrumbs, BreadcrumbsItem} from '@gravity-ui/uikit';

function RouterLink({href, ...rest}) {
  return (
    <Link href={href} passHref legacyBehavior>
      <BreadcrumbsItem {...rest} />;
    </Link>
  );
}

function Navigation() {
  return (
    <Breadcrumbs itemComponent={RouterLink}>
      <RouterLink href="/">Home</RouterLink>
      <RouterLink href="/components">Components</RouterLink>
      <RouterLink href="/components/breadcrumbs">Breadcrumbs</RouterLink>
    </Breadcrumbs>
  );
}
```

#### Tanstack Router

```jsx
import {createLink} from '@tanstack/react-router';
import {Breadcrumbs, BreadcrumbsItem} from '@gravity-ui/uikit';

const RouterLink = createLink(BreadcrumbsItem);

function Navigation() {
  return (
    <Breadcrumbs itemComponent={RouterLink}>
      <RouterLink href="/">Home</RouterLink>
      <RouterLink href="/components">Components</RouterLink>
      <RouterLink href="/components/breadcrumbs">Breadcrumbs</RouterLink>
    </Breadcrumbs>
  );
}
```

<!-- Storybook example -->

<BreadcrumbsClientNavigation />

<!--/GITHUB_BLOCK-->

### Области навигации

Когда хлебные крошки используются в качестве основного навигационного элемента на странице, их можно поместить в [область навигации](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html). Такие области помогают пользователям вспомогательных технологий быстро находить основные разделы страницы. Для создания области навигации поместите хлебные крошки внутрь элемента `<nav>` с атрибутом `aria-label`:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<nav aria-label="Breadcrumbs">
  <Breadcrumbs>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
  </Breadcrumbs>
</nav>
`}
>
    <nav aria-label="Breadcrumbs">
        <UIKit.Breadcrumbs>
            <UIKit.Breadcrumbs.Item href="/">Home</UIKit.Breadcrumbs.Item>
            <UIKit.Breadcrumbs.Item href="/components">Components</UIKit.Breadcrumbs.Item>
            <UIKit.Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</UIKit.Breadcrumbs.Item>
        </UIKit.Breadcrumbs>
    </nav>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<nav aria-label="Breadcrumbs">
  <Breadcrumbs>
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
  </Breadcrumbs>
</nav>
```

<!-- Storybook example -->

<BreadcrumbsLinks />

<!--/GITHUB_BLOCK-->

### Неактивные элементы

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
    <Breadcrumbs.Item href="#Region">Region</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#Country" disabled>
        Country
    </Breadcrumbs.Item>
    <Breadcrumbs.Item href="#City">City</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#District">District</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#Street" disabled>
        Street
    </Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item href="#Region">Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#Country" disabled>
            Country
        </UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#City">City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#District">District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#Street" disabled>
            Street
        </UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item href="#Region">Region</Breadcrumbs.Item>
  <Breadcrumbs.Item href="#Country" disabled>
    Country
  </Breadcrumbs.Item>
  <Breadcrumbs.Item href="#City">City</Breadcrumbs.Item>
  <Breadcrumbs.Item href="#District">District</Breadcrumbs.Item>
  <Breadcrumbs.Item href="#Street" disabled>
    Street
  </Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsDisabledItems />

<!--/GITHUB_BLOCK-->

### Пользовательский контент после последней крошки

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs endContent={<div style={{paddingInlineStart: 4}}><Button>Push</Button></div>}>
    <Breadcrumbs.Item>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item>City</Breadcrumbs.Item>
    <Breadcrumbs.Item>District</Breadcrumbs.Item>
    <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs endContent={<div style={{paddingInlineStart: 4}}><UIKit.Button>Push</UIKit.Button></div>}>
        <UIKit.Breadcrumbs.Item>Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Country</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Street</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs
  endContent={
    <Flex gap={1} spacing={{pl: 1}}>
      <Button>Test1</Button>
      <Button>Test2</Button>
    </Flex>
  }
>
  <Breadcrumbs.Item>Region</Breadcrumbs.Item>
  <Breadcrumbs.Item>Country</Breadcrumbs.Item>
  <Breadcrumbs.Item>City</Breadcrumbs.Item>
  <Breadcrumbs.Item>District</Breadcrumbs.Item>
  <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsEndContent />

<!--/GITHUB_BLOCK-->

## Свойства

| Имя              | Описание                                                                                                         | Тип                                        | Значение по умолчанию |
| :--------------- | :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------- | :-------------------- |
| children         | Элементы хлебных крошек.                                                                                         | `React.ReactElement<BreadcrumbsItemProps>` |                       |
| disabled         | Определяет, отключен ли компонент `Breadcrumbs`.                                                                 | `boolean`                                  |                       |
| showRoot         | Включает или отключает постоянное отображение корневого элемента при свернутом состоянии его дочерних элементов. | `boolean`                                  |                       |
| popupPlacement   | Расположение всплывающего окна для свернутых элементов.                                                          | `PopupPlacement`                           |                       |
| popupStyle       | Стиль всплывающего окна для свернутых элементов.                                                                 | `"staircase"`                              |                       |
| qa               | HTML-атрибут `data-qa`, используется для тестирования.                                                           | `string`                                   |                       |
| separator        | Пользовательский разделитель элементов.                                                                          | `React.ReactNode`                          | "/"                   |
| action           | Обработчик события `click`.                                                                                      | `(id: Key) => void`                        |                       |
| id               | Уникальный идентификатор элемента.                                                                               | `string`                                   |                       |
| className        | Имя CSS-класса элемента.                                                                                         | `string`                                   |                       |
| style            | Задает инлайн-стиль для элемента.                                                                                | `CSSProperties`                            |                       |
| aria-label       | Определяет строковое значение, используемое в качестве метки для текущего элемента.                              | `string`                                   |                       |
| aria-labelledby  | Определяет элементы, используемые в качестве метки для текущего элемента.                                        | `string`                                   |                       |
| aria-describedby | Определяет элементы, описывающие объект.                                                                         | `string`                                   |                       |
| endContent       | Пользовательский контент после последней крошки.                                                                 | `React.ReactNode`                          |                       |

### BreadcrumbsItemProps

| Имя        | Описание                                                           | Тип                               | Значение по умолчанию |
| :--------- | :----------------------------------------------------------------- | :-------------------------------- | :-------------------- |
| children   | Содержимое хлебных крошек.                                         | `string`                          |                       |
| title      | Строковое представление содержимого элемента.                      | `string`                          |                       |
| aria-label | Метка доступности элемента.                                        | `string`                          |                       |
| href       | URL-адрес гиперссылки.                                             | `string`                          |                       |
| target     | Целевое окно для ссылки.                                           | `React.HTMLAttributeAnchorTarget` |                       |
| rel        | Определяет отношение между связанным ресурсом и текущей страницей. | `string`                          |                       |
| disabled   | Определяет можно ли взаимодействовать с элементом.                 | `boolean`                         |                       |
