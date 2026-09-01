# Темизация, цвета и брендинг

[English](theming.md) | [Русский](theming-ru.md)

Для темизации мы используем и рекомендуем CSS-переменные.

Всё управляется пользовательскими CSS-свойствами с префиксом `--g-*`. Вызывать runtime API для
стилей не нужно: вы задаёте переменные, а компоненты используют их значения.

```tsx
import {ThemeProvider, Button} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export const App = () => (
  <ThemeProvider theme="system">
    <Button view="action">Branded button</Button>
  </ThemeProvider>
);
```

## Как работает темизация

Все переменные находятся на корневом классе `.g-root`, который `ThemeProvider` по умолчанию
назначает элементу `<body>`; цель можно изменить prop `scoped`. Цветовые переменные дополнительно
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

Выберите тему через `ThemeProvider`:

```tsx
<ThemeProvider theme="dark">{...}</ThemeProvider>
```

Значение по умолчанию — `"system"`: оно следует системному предпочтению цветовой схемы и
преобразуется в `light` или `dark`. Управлять тем, во что преобразуется `system`, можно через
`systemLightTheme` / `systemDarkTheme`. Для чтения и переключения темы во время выполнения
используйте хуки `useTheme` / `useThemeValue`.


## Значения свойств компонентов по умолчанию

Используйте `ThemeProvider.defaultProps`, чтобы задать общие значения свойств компонентов UIKit:

```tsx
import type {ComponentDefaultPropsMap} from '@gravity-ui/uikit';
import {Button, ThemeProvider} from '@gravity-ui/uikit';

const defaultProps = {
  Button: {size: 'l', view: 'outlined'},
} satisfies ComponentDefaultPropsMap;

<ThemeProvider defaultProps={defaultProps}>
  <Button>Большая контурная кнопка</Button>
</ThemeProvider>;
```

`DefaultPropsProvider` позволяет переопределить значения для части дерева без создания ещё одной
области темы:

```tsx
import type {ComponentDefaultPropsMap} from '@gravity-ui/uikit';
import {Button, DefaultPropsProvider} from '@gravity-ui/uikit';

const actionButtonDefaults = {
  Button: {view: 'action'},
} satisfies ComponentDefaultPropsMap;

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

Определите тему с нуля или расширьте встроенную тему SCSS-миксинами:

```scss
@use '@gravity-ui/uikit/styles/themes';

// Start from the light theme, then override
.g-root_theme_custom {
  @include themes.g-theme-light;

  // your overrides
  --g-color-base-brand: rgb(117, 155, 255);
}
```

Доступные миксины: `themes.g-theme-light`, `themes.g-theme-dark`, `themes.g-theme-light-hc`,
`themes.g-theme-dark-hc`. Затем передайте имя темы в provider:

```tsx
<ThemeProvider theme="custom">{...}</ThemeProvider>
```

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
  npm install @gravity-ui/uikit-themer
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

- **SCSS-миксины** — расширьте встроенную тему, как показано выше, и добавьте переопределения.

Какой бы способ вы ни выбрали, импортируйте сгенерированный файл темы **после `styles.css`**, чтобы
он победил в каскаде. `ThemeProvider` автоматически активирует его классом темы. Храните определение
бренда в одном файле темы и не заменяйте `--g-*` по всему проекту через search-and-replace.

### Локальные темы

Чтобы применить другую тему только к части интерфейса, например сделать тёмный toolbar в светлом
приложении, вложите provider с prop `scoped`. Он локально задаёт класс темы и обновляет React-контекст
для потомков, не меняя глобальный корень:

```tsx
<ThemeProvider scoped theme="dark">
  <Toolbar />
</ThemeProvider>
```

Для области только на CSS, без обновления контекста, примените класс из
`getRootClassName({theme: 'dark'})`.
