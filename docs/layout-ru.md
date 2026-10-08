# Layout-компоненты и отступы

В этом руководстве описаны основы layout в UIKit: общая шкала **отступов**
(`--g-spacing-*`, используемая в токенах и props), адаптивная **сетка**
(`Container`/`Row`/`Col`) и построенные поверх них flexbox-примитивы `Flex`/`Box`. Собирайте из них
страницы вместо использования сырых `div` и inline-стилей.

[English](layout.md) | [Русский](layout-ru.md)

## Отступы

Отступы в UIKit — это **шкала**, а не произвольные значения в пикселях. Вы указываете шаг (`1`,
`2`, … `10`), а дизайн-система преобразует его в конкретный размер. Единая шкала сохраняет
ритм во всём приложении и позволяет масштабировать все отступы одной переменной.

### Шкала

Каждый шаг кратен базовой единице (`--g-spacing-base`, по умолчанию `4px`), то есть
`шаг × 4px`:

| Шаг   | CSS-переменная     | Размер |
| ----- | ------------------ | ------ |
| `0`   | `--g-spacing-0`    | 0      |
| `0.5` | `--g-spacing-half` | 2px    |
| `1`   | `--g-spacing-1`    | 4px    |
| `2`   | `--g-spacing-2`    | 8px    |
| `3`   | `--g-spacing-3`    | 12px   |
| `4`   | `--g-spacing-4`    | 16px   |
| `5`   | `--g-spacing-5`    | 20px   |
| `6`   | `--g-spacing-6`    | 24px   |
| `7`   | `--g-spacing-7`    | 28px   |
| `8`   | `--g-spacing-8`    | 32px   |
| `9`   | `--g-spacing-9`    | 36px   |
| `10`  | `--g-spacing-10`   | 40px   |

Поскольку каждый шаг вычисляется из `--g-spacing-base`, изменение одной этой переменной
пропорционально масштабирует всю систему отступов (см. [Настройка](#настройка)).

### Способы применения отступов

Шкалу можно использовать тремя способами — выбирайте подходящий по контексту.

**1. Props компонентов** — расстояние **между** дочерними элементами `Flex`/`Box` через prop `gap`:

```tsx
import {Flex} from '@gravity-ui/uikit';

<Flex gap="spacing-5">
  <Button />
  <Button />
</Flex>; // 20px between children
```

**2. Пользовательские CSS-свойства** — те же шаги в переменных `--g-spacing-{step}` для ваших
стилей (например, `--g-spacing-half` для шага `0.5`):

```css
.example-class {
  margin-right: var(--g-spacing-5); /* 20px */
  padding: var(--g-spacing-2) var(--g-spacing-4);
}
```

**3. Утилита `spacing()`** — для разовых margin/padding на любом элементе без ручного написания
классов. Она возвращает строку со сгенерированным именем класса:

```tsx
import {spacing} from '@gravity-ui/uikit';

<>
  <Button className={spacing({mr: 5})}>button 1</Button>
  <Button className={spacing({mt: 2, px: 4})}>button 2</Button>
</>;
```

`sp` — короткий псевдоним: `import {sp} from '@gravity-ui/uikit'` → `sp({mr: 5})`.

Поддерживаемые ключи (каждый принимает шаг шкалы):

| Ключ                | Свойство                                |
| ------------------- | --------------------------------------- |
| `m`                 | `margin`                                |
| `mt` `mr` `mb` `ml` | `margin-top/right/bottom/left`          |
| `mx`                | горизонтальный margin (слева + справа)  |
| `my`                | вертикальный margin (сверху + снизу)    |
| `p`                 | `padding`                               |
| `pt` `pr` `pb` `pl` | `padding-top/right/bottom/left`         |
| `px`                | горизонтальный padding (слева + справа) |
| `py`                | вертикальный padding (сверху + снизу)   |

Вторым аргументом можно передать дополнительные имена классов:
`spacing({mr: 5}, myClassName)`.

> **Практическое правило:** `gap` — для расстояния между соседними элементами в `Flex`/`Box`;
> `spacing()`/`sp()` — для разовых отступов элемента; переменные `--g-spacing-*` — внутри ваших
> CSS-стилей. Всегда используйте шаги шкалы, а не жёстко заданные пиксели.

### Настройка

Переопределите базовую единицу, чтобы масштабировать всю систему. Это можно сделать через CSS на
уровне проекта:

```css
:root {
  --g-spacing-base: 5px; /* now step 5 = 25px, etc. */
}
```

Либо через layout-тему, которая синхронизирует JS-значения `Space` и CSS-переменные:

```tsx
import {Provider, LayoutTheme} from '@gravity-ui/uikit';

const config: LayoutTheme = {
    spaceBaseSize: 5,
};

export const App = () => {
    return (
        <Provider layout={{config}}>
            {...}
        </Provider>
    );
};
```

## Размеры экрана

Мы используем подход **mobile-first**: сначала адаптируйте приложение для мобильных устройств,
затем — для desktop. Breakpoints по умолчанию:

- `xs` — < 576px;
- `s` — ≥ 576px;
- `m` — ≥ 768px;
- `l` — ≥ 980px;
- `xl` — ≥ 1200px;
- `2xl` — ≥ 1400px;
- `3xl` — ≥ 1920px.

Чтобы переопределить breakpoint, используйте свойство `breakpoints` в layout-конфигурации:

```tsx
const APP_LAYOUT_THEME: LayoutTheme = {
    spaceBaseSize: 4,
    components: {
        container: {
            gutters: 'spacing-3',
            media: {
                l: {
                    gutters: 'spacing-5',
                },
            },
        },
    },
    breakpoints: {
        s: 320,
        l: 1080,
    },
};

<Provider layout={{config: APP_LAYOUT_THEME}}>
    {...}
</Provider>;
```

`LayoutProvider` позволяет настроить layout для поддерева. Незаданные настройки, включая активный
breakpoint при SSR и обновлениях, наследуются от родителя. Частичный `config` объединяется с
родительской темой без её изменения. Собственные breakpoints вычисляют локальный активный
breakpoint; `initialMediaQuery` переопределяет его начальное значение. Без родителя начальный
breakpoint — `xs`.

## Box

`Box` — базовый строительный блок для других компонентов. Он знает о шкале отступов, собственных
размерах и самых часто используемых CSS-свойствах.

Используйте его для декларативного описания элементов с фиксированными высотой и шириной. Он также
поддерживает распространённые свойства, например `overflow`. `Box` служит основой для таких
компонентов, как `Flex` и `Card`.

Он также подходит как база для контейнеров загрузки данных, например:

```tsx
import React, {Suspense} from 'react';
import {Flex, Loader} from '@gravity-ui/uikit';

// `Flex` extended from `Box` component and enriched flexbox model properties
<Flex justifyContent="center" alignItems="center" width="100%" height="100%">
  <Suspense fallback={<Loader size="m" />}>
    <LazyLoadedComponent />
  </Suspense>
</Flex>;
```

## Layout-сетка

Основные компоненты для описания 12-колоночной сетки приложения. Сетка поддерживает вложенность и
подходит, когда у приложения есть мобильная и desktop-версии.

```tsx
import {Row, Col} from '@gravity-ui/uikit';

<Row gap="spacing-5">
  <Col size="4">...</Col>
  <Col size="4">...</Col>
  <Col size="4">...</Col>
</Row>;
```

### Row

**Props**

- `gap` задаёт расстояние между колонками и строками;
- `columnGap` задаёт горизонтальное расстояние;
- `rowGap` задаёт вертикальное расстояние.

Все отступы поддерживают responsive-объекты, токены `spacing-*`, CSS-длины и числа в пикселях.
Например, `gap="spacing-2"` использует шкалу отступов, а `gap={2}` означает `2px`.
Используйте только `gap` или отдельные `rowGap` и `columnGap` для разных значений по осям.
Эти props напрямую соответствуют CSS-свойствам. Смешивание shorthand и longhand делает приоритет
зависимым от порядка объявлений и может вызвать конфликты при обновлении React.

`Row` использует CSS Grid с 12 одинаковыми треками. Также поддерживаются style props `Box`,
props выравнивания Grid, нативные props элемента, `as` и refs.

### Col

Определяет, сколько колонок 12-колоночной сетки занимает содержимое. Должен быть дочерним элементом
`Row`.

**Props**

- `size` — количество треков сетки; если не задано, колонка занимает все 12 треков в отдельной строке.

Для responsive-размеров используйте `size`. Отдельные props `s`, `m`, `l`, `xl` и `xxl` удалены;
например, вместо `s={12} m={6}` используйте `size={{xs: 12, m: 6}}`, если `s` раньше применялся
к самым узким экранам. См. [миграцию breakpoints](migration-to-v8-ru.md#layout-breakpoints-и-отступы-контейнера).

```tsx
import {Row, Col} from '@gravity-ui/uikit';

<Row
  /**
   * In this example we override default theme behavior.
   *
   * gap={{xs: 'spacing-1', xl: 'spacing-5'}}
   */
  gap="spacing-5"
>
  <Col
    // Will be:
    // 12 for "xs" and "s"
    // 6 for "m" and "l"
    // 4 for "xl" and "2xl"
    size={[12, {m: 6, xl: 4}]}
  />
</Row>;
```

`Row` использует нативные CSS gaps, а CSS Grid учитывает расстояния при расчёте размеров треков.
Колонки с суммой `size`, равной 12, помещаются в одну строку. Каждая колонка без `size` занимает
отдельную строку вместо распределения оставшегося места. Чтобы разместить колонки в одной строке,
задайте размеры явно; для динамического распределения места используйте `Flex`. `Col` поддерживает
style props `Box`, включая padding и фон, без автоматически добавленных отступов и отрицательных margin.

`justifyContent` выравнивает треки сетки, а не отдельные колонки в неполной строке. Для выравнивания
внутри ячейки используйте `justifyItems` или `justifySelf`. Flex props, например `flexGrow`,
не влияют на колонки внутри `Row`.

## Container

Центрирует содержимое страницы с помощью `Box` и обычного блочного потока. Responsive style props
позволяют менять padding, ширину и расстояние между строками.

**Props**

- `gutters` задаёт логические горизонтальные отступы; по умолчанию берётся из layout-темы.
  Поддерживает responsive-объекты, токены `spacing-*`, CSS-длины и числа в пикселях;
- `size` ограничивает ширину содержимого шириной breakpoint из layout-темы. Gutters и границы
  добавляются сверх этого ограничения. Например, `size="l"` использует `layout.breakpoints.l`;
- `maxWidth` принимает CSS-длину или число в пикселях, а не имя breakpoint. Явные `maxWidth`,
  `maxInlineSize` или `style.maxInlineSize` переопределяют ограничение `size`;
- `rowGap` задаёт `margin-block-start` между соседними непосредственными дочерними `Row`;
  по умолчанию берётся из layout-темы. Поддерживает responsive-объекты, токены spacing, CSS-длины
  и числа в пикселях;
- поддерживаются остальные style props `Box`. Props выравнивания и отступов flex-контейнера не поддерживаются.

Как и `Box` и `Flex`, `Container` не задаёт `box-sizing`. При стандартном `content-box`
`size="l"` допускает 980px содержимого плюс gutters и границы. Не задавайте ширину, чтобы контейнер
автоматически помещался в более узком родителе; `width="100%"` с gutters может вызвать переполнение.
CSS приложения может переопределить box sizing. Если `size` не задан, ширина не ограничивается breakpoint.

У первой строки нет добавленного отступа. Другие элементы прерывают соседство строк и не получают
добавленных отступов. Вложенные строки не затрагиваются; вложенные контейнеры определяют собственный
`rowGap` из props или layout-темы, а не наследуют значение внешнего контейнера.

```tsx
import {Container} from '@gravity-ui/uikit';

<Container size="l" gutters={{xs: 'spacing-3', l: 'spacing-5'}} rowGap="spacing-4">
  {children}
</Container>;
```

Используйте `gutters={0}`, чтобы отключить боковые отступы. Конфигурация темы также использует
`gutters` и `rowGap`. Все три компонента поддерживают `as`, нативные props и refs.
Стандартный style prop `paddingInline` также поддерживается и переопределяет значения темы.
Явно заданный `gutters` имеет приоритет над `paddingInline`.
Удалённые spacing props описаны в [руководстве по миграции](../src/components/layout/migration-guide.md).

## Flex

Представление CSS-модели `Flexbox` в JSX. Имеет встроенную поддержку отступов между дочерними
элементами. Все flex-свойства доступны как props. Для наиболее частых свойств поддерживается
объектная конфигурация, позволяющая менять поведение на разных размерах экрана.

### Примеры

_Расстояние между дочерними компонентами в строке_

```jsx
import {Flex, TextInput, Button} from '@gravity-ui/uikit';

<Flex gap="spacing-5">
  <TextInput />
  <Button />
</Flex>;
```

_Вложенный `Flex`_

```jsx
import {Flex, TextInput, Button, Table} from '@gravity-ui/uikit';

<Flex direction="column" gap="spacing-5">
  <Flex gap="spacing-5">
    <TextInput />
    <Button />
  </Flex>
  <Table />
</Flex>;
```

_Адаптивный пример_

```jsx
import {Flex, TextInput, Button} from '@gravity-ui/uikit';

<Flex
  // direction: column will be applied to l, xl, 2xl, 3xl screen sizes here
  direction={{l: 'column'}}
  gap={{xs: 'spacing-5', m: 'spacing-3'}}
>
  <TextInput />
  <Button />
</Flex>;
```

## Хуки

### useLayoutContext

Хук `useLayoutContext` предоставляет `LayoutTheme` и вспомогательные функции для работы с media
queries.

Он возвращает следующие методы и объекты:

- `theme` — объект `LayoutTheme`;
- `activeMediaQuery` — ключ текущего [размера экрана](#размеры-экрана).

```tsx
import {useLayoutContext} from '@gravity-ui/uikit';

const Component = () => {
  const {activeMediaQuery} = useLayoutContext();

  return (
    <>{activeMediaQuery === 'l' ? <Text>I render only on screen resolution "l"</Text> : null}</>
  );
};
```

- `isMediaActive` — возвращает `true`, если переданное значение равно текущему активному media или
  больше него. Нужен для реализации адаптивных элементов в подходе **mobile-first**.

```tsx
import {useLayoutContext} from '@gravity-ui/uikit';

// this example will be shown on xl, 2xl and 3xl screen sizes
const Component = () => {
  const {isMediaActive} = useLayoutContext();

  return (
    <>{isMediaActive('xl') ? <Text>I render on "xl", "2xl" and "3xl" screen sizes</Text> : null}</>
  );
};
```

- `getClosestMediaProps` — работает подобно `isMediaActive`, но принимает map со значениями для
  размеров экрана. Возвращает ближайшее доступное значение с учётом подхода **mobile-first**.

```tsx
import {useLayoutContext} from '@gravity-ui/uikit';

const mapOfPropsByScreen = {
  s: "i'm will be shown on 's' and 'n' screen size",
  l: "i'm will be shown on 'l' and 'xl' screen size",
  '2xl': "i'm will be shown on '2xl' and '3xl' screen size",
};

const Component = () => {
  const {getClosestMediaProps} = useLayoutContext();

  return <Text>{getClosestMediaProps(mapOfPropsByScreen)}</Text>;
};
```
