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

<Flex gap={5}>
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
import {ThemeProvider, LayoutTheme} from '@gravity-ui/uikit';

const config: LayoutTheme = {
    spaceBaseSize: 5,
};

export const App = () => {
    return (
        <ThemeProvider layout={{config, fixBreakpoints: true}}>
            {...}
        </ThemeProvider>
    );
};
```

## Размеры экрана

Мы используем подход **mobile-first**: сначала адаптируйте приложение для мобильных устройств,
затем — для desktop. Breakpoints по умолчанию:

- `xs` — < 576px;
- `s` — ≥ 576px;
- `m` — ≥ 768px;
- `l` — ≥ 1080px;
- `xl` — ≥ 1200px;
- `xxl` — ≥ 1400px;
- `xxxl` — ≥ 1920px.

Чтобы переопределить breakpoint, используйте свойство `breakpoints` в layout-конфигурации:

```tsx
const APP_LAYOUT_THEME: LayoutTheme = {
    spaceBaseSize: 4,
    components: {
        container: {
            gutters: 3,
            media: {
                l: {
                    gutters: 5,
                },
            },
        },
    },
    breakpoints: {
        s: 320,
        l: 980,
    },
};

<ThemeProvider layout={{config: APP_LAYOUT_THEME}}>
    {...}
</ThemeProvider>;
```

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
<Flex centerContent width="100%" height="100%">
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

<Row space="5">
  <Col size="4">...</Col>
  <Col size="4">...</Col>
  <Col size="4">...</Col>
</Row>;
```

### Row

**Props**

- `space` — горизонтальное расстояние между дочерними `Col`;
- `spaceRow` — вертикальное расстояние между дочерними `Col`; по умолчанию принимает значение из
  prop `space`.

### Col

Определяет, сколько колонок 12-колоночной сетки занимает содержимое. Должен быть дочерним элементом
`Row`.

**Props**

- `size` — ширина в количестве колонок; если не задана, колонка занимает всё свободное место в
  строке.

```tsx
import {Row, Col} from '@gravity-ui/uikit';

<Row
  /**
   * In this example we override default theme behavior.
   *
   * space={{s: '1', xl:'5'}}
   */
  space="5"
>
  <Col
    // Will be:
    // 12 for "xs" and "s"
    // 6 for "m" and "l"
    // 4 for "xl" and "xxl"
    size={[12, {m: 6, xl: 4}]}
  />
</Row>;
```

> Внутри система сетки использует отрицательные margin. Поэтому не задавайте `background-color`
> напрямую компоненту `Col`; в таких случаях используйте компонент-обёртку.

## Container

Центрирует содержимое. Почти всегда на странице должен быть один `Container`. Он управляет
максимальной шириной для текущего размера экрана.

**Props**

- `gutters` — внутренние отступы слева и справа, нужные, когда ширина содержимого равна ширине
  экрана;
- `maxWidth` — ограничивает ширину для конкретного размера экрана;
- `spaceRow` — задаёт расстояние между дочерними `Row`.

## Flex

Представление CSS-модели `Flexbox` в JSX. Имеет встроенную поддержку отступов между дочерними
элементами. Все flex-свойства доступны как props. Для наиболее частых свойств поддерживается
объектная конфигурация, позволяющая менять поведение на разных размерах экрана.

#### Примеры

_Расстояние между дочерними компонентами в строке_

```jsx
import {Flex, TextInput, Button} from '@gravity-ui/uikit';

<Flex space="5">
  <TextInput />
  <Button />
</Flex>;
```

_Вложенный `Flex`_

```jsx
import {Flex, TextInput, Button, Table} from '@gravity-ui/uikit';

<Flex direction="column" space="5">
  <Flex space="5">
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
  // direction: column will be applied to l, xl, xxl, xxxl screen sizes here
  direction={{l: 'column'}}
  space={{s: '5', m: '3'}}
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

// this example will be shown on xl, xxl and xxxl screen sizes
const Component = () => {
  const {isMediaActive} = useLayoutContext();

  return (
    <>{isMediaActive('xl') ? <Text>I render on "xl", "xxl" and "xxxl" screen sizes</Text> : null}</>
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
  xxl: "i'm will be shown on 'xxl' and 'xxxl' screen size",
};

const Component = () => {
  const {getClosestMediaProps} = useLayoutContext();

  return <Text>{getClosestMediaProps(mapOfPropsByScreen)}</Text>;
};
```
