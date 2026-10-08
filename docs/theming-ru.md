# Темизация, цвета и брендинг

[English](theming.md) | [Русский](theming-ru.md)

Для темизации мы используем и рекомендуем CSS-переменные.

Всё управляется пользовательскими CSS-свойствами с префиксом `--g-*`. Вызывать runtime API для
стилей не нужно: вы задаёте переменные, а компоненты используют их значения.

```tsx
import {Provider, Button} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export const App = () => (
  <Provider theme="system">
    <Button view="action">Branded button</Button>
  </Provider>
);
```

## Как работает темизация

Все переменные находятся на корневом классе `.g-root`, который `ThemeProvider` по умолчанию
назначает элементу `<body>` без родительской темы; `scoped` создаёт локальный корень. Цветовые переменные дополнительно
задаются на классе конкретной темы `.g-root_theme_{themeName}`, поэтому переключение темы заменяет
один набор значений другим.

```
.g-root                      → structural tokens (spacing, typography metrics, border radius)
.g-root_theme_light          → color tokens for the light theme
.g-root_theme_dark           → color tokens for the dark theme
```

Для настройки переопределите значения этих CSS-переменных — для одной темы, нескольких тем или
глобально. Если приложение поддерживает несколько тем, задавайте переопределения цветов **для
каждой темы**.

## Темы

UIKit поставляет четыре встроенные темы:

| Тема       | Описание                                       |
| ---------- | ---------------------------------------------- |
| `light`    | Светлая тема по умолчанию                      |
| `dark`     | Тёмная тема по умолчанию                       |
| `light-hc` | Светлая высококонтрастная тема для доступности |
| `dark-hc`  | Тёмная высококонтрастная тема для доступности  |

Выберите тему приложения через `Provider`:

```tsx
<Provider theme="dark">{...}</Provider>
```

Значение по умолчанию — `"system"`: оно следует системному предпочтению цветовой схемы и
преобразуется в `light` или `dark`. Управлять тем, во что преобразуется `system`, можно через
`systemLightTheme` / `systemDarkTheme`. Читайте запрошенную и вычисленную тему через
`useTheme` / `useThemeValue`; переключайте её обновлением пропа `theme`.

## Провайдеры

`Provider` — общий провайдер приложения. Вложенные Provider всегда работают в режиме scoped,
даже при `scoped={false}`, и наследуют незаданные настройки темы, языка, layout и defaults компонентов.
Мобильные настройки используют собственные defaults. Для изменения одной функции можно использовать
отдельный провайдер. Все перечисленные компоненты и типы пропсов экспортируются из `@gravity-ui/uikit`.

### Provider

`ProviderProps` объединяет пропсы темы ниже, `lang` и `fallbackLang`, мобильные пропсы ниже,
`children` и следующие настройки:

| Проп           | Тип                                     | Поведение                                                    |
| -------------- | --------------------------------------- | ------------------------------------------------------------ |
| `layout`       | `Omit<LayoutProviderProps, 'children'>` | Конфигурация layout и media queries                          |
| `defaultProps` | `DefaultPropsMap`                       | Defaults компонентов; явно переданные пропсы имеют приоритет |

Он объединяет `LayoutProvider`, `DefaultPropsProvider`, `ThemeProvider`, `LangProvider` и
`MobileProvider` и подключает приватную общую группу задержки тултипов. Настройте её через
`defaultProps={{TooltipDelayGroup: {skipDelay: 500}}}`. Вложенные Provider и области темы используют ту же группу.

### ThemeProvider

`ThemeProviderProps` принимает `children` и следующие необязательные пропсы:

| Проп               | Тип         | Значение без родительской темы                          |
| ------------------ | ----------- | ------------------------------------------------------- |
| `theme`            | `Theme`     | `system`                                                |
| `systemLightTheme` | `RealTheme` | `light`                                                 |
| `systemDarkTheme`  | `RealTheme` | `dark`                                                  |
| `direction`        | `Direction` | `ltr`                                                   |
| `scoped`           | `boolean`   | `false`; внутри другой темы всегда `true`               |
| `rootClassName`    | `string`    | Пустая строка; добавляется к body или локальной обёртке |

Читайте запрошенную тему через `useTheme`, вычисленную — через `useThemeValue`, системные соответствия —
через `useThemeSettings`, направление — через `useDirection`. Для переключения обновляйте проп `theme`.
Локальные переопределения описаны в [Локальных темах](#локальные-темы).

### LangProvider

`LangProviderProps` принимает `children`, `lang` и `fallbackLang`. Доступны встроенные `en` и `ru`
и пользовательские языки, зарегистрированные через i18n API. Вложенный провайдер наследует незаданные
опции. Если без родительского языкового контекста задана одна опция, вторая получает значение `en`.
Без обеих опций провайдер передаёт родительский контекст; если его нет, `useLang` читает глобальные
настройки `configure`.

```tsx
<LangProvider lang="ru" fallbackLang="en">
  <LocalizedContent />
</LangProvider>
```

### LayoutProvider

`LayoutProviderProps` принимает `children`, `config` (частичный `LayoutTheme`) и `initialMediaQuery`
(имя breakpoint для начального/SSR-рендера). Вложенный провайдер наследует тему и активный breakpoint,
включая начальный breakpoint родителя при SSR. `config` объединяется с родительской темой, не изменяя
её. Явно переданные настройки переопределяют унаследованные; собственные breakpoints вычисляют
локальный активный breakpoint. Без родительского провайдера начальный breakpoint — `xs`.
DOM-обёртку не добавляет. См. [Layout](layout-ru.md).

```tsx
<LayoutProvider config={layoutConfig}>
  <ResponsiveContent />
</LayoutProvider>
```

### MobileProvider и мобильные настройки

Существующий публичный `MobileProvider` сохраняется. `Provider` принимает все его настройки
напрямую с теми же значениями по умолчанию:

| Проп          | Тип                                      | Значение по умолчанию          |
| ------------- | ---------------------------------------- | ------------------------------ |
| `mobile`      | `boolean`                                | `false`                        |
| `platform`    | `Platform` (`browser`, `ios`, `android`) | `Platform.BROWSER`             |
| `useHistory`  | `MobileProviderProps['useHistory']`      | История с пустыми действиями   |
| `useLocation` | `MobileProviderProps['useLocation']`     | Пустые pathname, search и hash |

`useHistory` поддерживает history v4/v5: `back` преобразуется в `goBack`, если `goBack` отсутствует.
`mobile` переключает `.g-root_mobile` на body через `MobileProvider` и читается через `useMobile`;
платформу читает `usePlatform`. Каждый Provider использует собственные мобильные defaults, включая
вложенные Provider и Provider с явным `scoped`. Мобильные настройки и хуки роутера не наследуются;
передавайте их явно, если они нужны. Режим scoped относится к теме и направлению; мобильный класс
по-прежнему управляется на body.
`Modal` и `Dialog` используют мобильный рендеринг при включённом `mobile`.

```tsx
import {Platform, Provider} from '@gravity-ui/uikit';

<Provider mobile platform={Platform.IOS}>
  <App />
</Provider>;
```

Используйте MobileProvider для отдельного мобильного контекста; его работа с классом body не меняется.
Смена локальной темы сохраняет текущий мобильный контекст.

## Значения свойств компонентов по умолчанию

Используйте `Provider.defaultProps`, чтобы задать общие значения свойств компонентов UIKit:

```tsx
import type {DefaultPropsMap} from '@gravity-ui/uikit';
import {Button, Provider} from '@gravity-ui/uikit';

const defaultProps = {
  Button: {size: 'l', view: 'outlined'},
} satisfies DefaultPropsMap;

<Provider defaultProps={defaultProps}>
  <Button>Большая контурная кнопка</Button>
</Provider>;
```

`DefaultPropsProvider` позволяет переопределить значения для части дерева без создания ещё одной
области темы:

```tsx
import type {DefaultPropsMap} from '@gravity-ui/uikit';
import {Button, DefaultPropsProvider} from '@gravity-ui/uikit';

const actionButtonDefaults = {
  Button: {view: 'action'},
} satisfies DefaultPropsMap;

<DefaultPropsProvider defaultProps={actionButtonDefaults}>
  <Button>Акцентная кнопка</Button>
</DefaultPropsProvider>;
```

Явно переданные компоненту свойства имеют наивысший приоритет. Свойство со значением `undefined`
не переопределяет значение по умолчанию. Вложенный провайдер наследует настройки других
компонентов, но целиком заменяет настройки совпавшего компонента. Например, внутреннее значение
`Button: {view: 'action'}` заменит и `view`, и `size` из внешнего значения
`Button: {view: 'outlined', size: 'l'}`. Сброс всех унаследованных значений для части дерева пока
не поддерживается.

Ссылка на объект `defaultProps` должна оставаться стабильной: объявите его вне render или
используйте `React.useMemo`. Inline-объект создаёт новое значение контекста при каждом render
родителя и обновляет все компоненты, использующие значения по умолчанию.

### Defaults для компонентов из других библиотек

Библиотеки на основе UIKit могут использовать тот же провайдер для своих компонентов. Библиотеке
следует держать `@gravity-ui/uikit` в `peerDependencies`, расширить `DefaultPropsMap` в публичных
декларациях типов и применять defaults через `useDefaultProps`:

```tsx
import {useDefaultProps} from '@gravity-ui/uikit';

import type {DatePickerProps} from './DatePicker';

declare module '@gravity-ui/uikit' {
  interface DefaultPropsMap {
    '@gravity-ui/date-components/DatePicker'?: Partial<DatePickerProps>;
  }
}

export function DatePicker(rawProps: DatePickerProps) {
  const props = useDefaultProps('@gravity-ui/date-components/DatePicker', rawProps);
  // ...
}
```

Используйте имена компонентов с пакетом, чтобы избежать коллизий с другими библиотеками. После
импорта типов библиотеки потребитель может настроить её компоненты вместе с компонентами UIKit:

```tsx
const defaultProps = {
  Button: {size: 'l'},
  '@gravity-ui/date-components/DatePicker': {size: 'l'},
} satisfies DefaultPropsMap;
```

## Слои цветовых токенов

Цвета организованы в **два слоя**. Компоненты и прикладной код должны обращаться только к
**семантическому** слою.

### Приватные токены

`--g-color-private-*` — исходная палитра: реальные RGB-значения, сгруппированные по оттенкам и
числовой шкале. Она нужна как основа семантического слоя. **Не используйте эти токены напрямую в
прикладном коде**: это внутренняя деталь реализации, которая может измениться.

Семейства оттенков: `black`, `white`, `blue`, `green`, `yellow`, `orange`, `red`, `purple`,
`cool-grey`.

У каждого шага есть два варианта:

- `--g-color-private-black-50` — полупрозрачный (`rgba(0, 0, 0, 0.05)`), смешивается с фоном;
- `--g-color-private-black-50-solid` — непрозрачный (`rgb(242, 242, 242)`), заранее сведённый
  эквивалент.

Используйте варианты `-solid`, когда полупрозрачный цвет может пропустить нижележащий элемент,
например при наложениях или тенях.

### Семантические токены

`--g-color-{group}-{role}` описывают _назначение_, а не конкретный оттенок. Использовать нужно
именно этот слой.

| Группа                                            | Назначение                          | Примеры                                                                  |
| ------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| `--g-color-base-*`                                | Фоны и заливки                      | `base-background`, `base-brand`, `base-generic`, `base-danger-medium`    |
| `--g-color-text-*`                                | Цвета текста                        | `text-primary`, `text-secondary`, `text-hint`, `text-brand`, `text-link` |
| `--g-color-line-*`                                | Границы, разделители, подчёркивания | `line-generic`, `line-brand`, `line-focus`, `line-danger`                |
| `--g-color-sfx-*`                                 | Эффекты: тени, вуали, градиенты     | `sfx-shadow`, `sfx-veil`, `sfx-fade`                                     |
| `--g-color-infographics-*` / `--g-color-scroll-*` | Графики и полосы прокрутки          | `infographics-axis`, `scroll-handle`                                     |

**Соглашения о значении внутри группы:**

- **Статусы** — `info` (синий), `positive` (зелёный), `warning` (жёлтый), `danger` (красный),
  `utility` (фиолетовый), `misc` (холодный серый), а также `brand`, `generic` и `neutral`.
- **Интенсивность** — `light` → `medium` → `heavy`: от лёгких фоновых заливок к плотным
  поверхностям. На заливках `heavy` должен размещаться контрастный текст (`*-contrast`).
- **Взаимодействие** — суффикс `-hover` обозначает hover-вариант базового токена, например
  `base-brand` / `base-brand-hover`.
- **Иерархия текста** — `text-primary` > `text-secondary` > `text-hint` по убыванию акцента.

```css
/* status background + matching text */
.alert-danger {
  background: var(--g-color-base-danger-light);
  color: var(--g-color-text-danger);
}
```

## Брендинг

Брендинг — подмножество темизации: переопределите небольшой подобранный набор переменных, чтобы
UIKit соответствовал вашему продукту. Обычно достаточно акцентного цвета, шрифтов и радиусов.

### Акцентный / брендовый цвет

Акцентный цвет формирует узнаваемость приложения: action-кнопки, активные контролы, ссылки и
выделение. Переопределите следующую группу для каждой темы:

| Переменная                          | Где используется                                         |
| ----------------------------------- | -------------------------------------------------------- |
| `--g-color-base-brand`              | Брендовый фон: action-кнопка, активные контролы          |
| `--g-color-base-brand-hover`        | Фон при наведении                                        |
| `--g-color-base-selection`          | Светлый оттенок бренда для выбранных строк List/Table    |
| `--g-color-base-selection-hover`    | Наведение на выбранную строку                            |
| `--g-color-line-brand`              | Брендовые линии, например подчёркивание активной вкладки |
| `--g-color-text-brand`              | Брендовый текст                                          |
| `--g-color-text-brand-heavy`        | Брендовый текст на фоне                                  |
| `--g-color-text-brand-contrast`     | Текст **поверх** брендового фона                         |
| `--g-color-text-link`               | Ссылки                                                   |
| `--g-color-text-link-hover`         | Ссылки при наведении                                     |
| `--g-color-text-link-visited`       | Посещённые ссылки                                        |
| `--g-color-text-link-visited-hover` | Посещённые ссылки при наведении                          |

```css
.g-root {
  --g-color-base-brand: rgb(117, 155, 255);
  --g-color-base-brand-hover: rgb(99, 143, 255);
  --g-color-base-selection: rgba(82, 130, 255, 0.05);
  --g-color-base-selection-hover: rgba(82, 130, 255, 0.1);
  --g-color-line-brand: rgb(117, 155, 255);
  --g-color-text-brand: rgb(117, 155, 255);
  --g-color-text-brand-contrast: rgb(255, 255, 255);
  --g-color-text-link: rgb(117, 155, 255);
  --g-color-text-link-hover: rgb(82, 130, 255);
}
```

> Задавайте переменные на классе темы, например `.g-root_theme_light`, если брендовый цвет должен
> различаться для светлой и тёмной темы. Используйте `.g-root` для общих значений.

### Типографика

Настройте шрифты, насыщенность и метрики вариантов через переменные `--g-font-family-*` и
`--g-text-*` на корневом классе. Полный справочник по вариантам, токенам размеров и настройке — в
[**руководстве по типографике**](typography-ru.md).

```css
.g-root {
  --g-font-family-sans: 'Inter', sans-serif;
  --g-text-header-font-weight: 600;
}
```

### Форма (радиус границы)

Контролы используют общую шкалу радиусов `--g-border-radius-{size}`, где size — `xs`, `s`, `m`,
`l` или `xl`. Используйте токен, а не жёстко заданное значение в `px`.

```css
/* your own component, in Gravity style */
.my-card {
  border-radius: var(--g-border-radius-m);
}
```

У отдельных компонентов есть собственные переменные радиуса, согласованные с той же шкалой. Это
позволяет настроить один компонент, не меняя всю шкалу: `--g-button-border-radius`,
`--g-card-border-radius`, `--g-modal-border-radius`, `--g-popup-border-radius`,
`--g-text-input-border-radius`, `--g-list-container-border-radius`, `--g-focus-border-radius`.

```css
.g-root {
  --g-border-radius-m: 8px; /* whole scale step */
  --g-button-border-radius: var(--g-border-radius-l); /* just buttons */
}
```

## Использование цветов в коде

В CSS используйте семантические токены напрямую. В JS/TSX предпочитайте prop `color` компонента
`Text` и props `view`/`theme` компонентов, а не inline-цвета.

```css
.card {
  background: var(--g-color-base-generic);
  color: var(--g-color-text-primary);
  border: 1px solid var(--g-color-line-generic);
  border-radius: var(--g-border-radius-l);
}
```

```tsx
import {Text} from '@gravity-ui/uikit';

<Text color="secondary">Muted caption</Text>;
```

Поскольку эти токены учитывают тему, одна и та же разметка корректно отображается во всех темах и
учитывает переопределения бренда. Условная логика по теме в компонентах не нужна.

## Создание пользовательской темы

Тема — это набор значений `--g-*` на классе `.g-root_theme_{name}`. Чтобы добавить тему, сгенерируйте полный набор
токенов (см. ниже) и задайте его на классе своей темы:

```css
/* my-theme.css — импортируется после styles.css */
.g-root_theme_custom {
  --g-color-base-brand: rgb(117, 155, 255);
  /* …полный набор токенов… */
}
```

Затем передайте имя темы в provider:

```tsx
<Provider theme="custom">{...}</Provider>
```

Если нужно только перекрасить одну из встроенных тем, новую тему не объявляйте: переопределите брендовые токены на
классе встроенной темы (`.g-root_theme_light` / `.g-root_theme_dark`), как показано в разделе [Брендинг](#брендинг)
выше.

> **Генерируйте полный набор токенов, а не пишите его вручную.** Используйте
> [веб-инструмент Themer](https://gravity-ui.com/themer) или
> [`@gravity-ui/uikit-themer`](https://github.com/gravity-ui/uikit-themer) (см. ниже): если переопределить только
> несколько токенов, выделение, фокус, ссылки и цвета `*-contrast` останутся с исходным акцентом.

### Ребрендинг: делайте его полностью

> **Не переопределяйте только 2–4 токена.** Если задать только `--g-color-base-brand`, выделение,
> фокус, ссылки и цвета `*-contrast` останутся с исходным акцентом, и интерфейс станет
> несогласованным. Переопределите **полный набор брендовых токенов** из
> [таблицы акцентных цветов](#акцентный--брендовый-цвет) и задайте значения **для каждой
> поддерживаемой темы**. Для тёмной темы обычно нужен более яркий брендовый цвет.

Практические способы получить полный согласованный набор токенов:

- **[Веб-инструмент Themer](https://gravity-ui.com/themer)** — выберите брендовые цвета в браузере
  и экспортируйте готовую тему в CSS или JSON.
- **[`@gravity-ui/uikit-themer`](https://github.com/gravity-ui/uikit-themer)** — тот же генератор в
  виде библиотеки для программного создания тем или подключения к сборке.

  ```shell
  npm install @gravity-ui/uikit-themer@^2
  ```

  ```ts
  import {generateCSS, updateBaseColor, DEFAULT_THEME} from '@gravity-ui/uikit-themer';

  // Change a base color; private/dependent tokens are recalculated for you.
  const theme = updateBaseColor({
    theme: DEFAULT_THEME,
    colorToken: 'brand',
    value: {light: '#007AFF', dark: '#007AFF'},
  });

  // Emit CSS with .g-root_theme_light / .g-root_theme_dark blocks.
  const css = generateCSS({theme, ignoreDefaultValues: true});
  ```

  Библиотека также экспортирует `generateJSON` / `parseCSS` / `parseJSON` и конвертеры CSS↔JSON.
  Всегда используйте `updateBaseColor`, а не редактируйте токены вручную: тогда приватная палитра
  пересчитается, и тема останется внутренне согласованной.

Какой бы способ вы ни выбрали, импортируйте сгенерированный файл темы **после `styles.css`**, чтобы
он победил в каскаде. `ThemeProvider` автоматически активирует его классом темы. Храните определение
бренда в одном файле темы и не заменяйте `--g-*` по всему проекту через search-and-replace.

### Локальные темы

Вложите `ThemeProvider` в `Provider`, чтобы задать другую тему для отдельной области. Он автоматически
создаёт локальный `div` с `.g-root`, классом темы и `dir` и обновляет React-контекст потомков.
Вложенный ThemeProvider никогда не меняет глобальный корень, даже при `scoped={false}`.

```tsx
import {Provider, ThemeProvider} from '@gravity-ui/uikit';

<Provider theme="light">
  <Page />
  <ThemeProvider theme="dark">
    <Toolbar />
  </ThemeProvider>
</Provider>;
```

Незаданные тема, направление и соответствия системной темы наследуются от ближайшего родителя.
Области можно вкладывать друг в друга. Порталы, включая попапы и диалоги, сохраняют локальную тему
и направление при рендеринге в `document.body` или пользовательский контейнер. Область темы
не сбрасывает язык, layout, defaults компонентов, мобильные настройки и группу задержки тултипов.

Без родительской темы `ThemeProvider` по умолчанию задаёт тему и направление для `body`;
передайте `scoped`, чтобы создать локальный корень. Самостоятельный ThemeProvider настраивает только
темизацию: остальные провайдеры и группа задержки тултипов в него не входят.

Для области только с CSS (без обновления контекста) используйте класс из `getRootClassName({theme: 'dark'})`.
