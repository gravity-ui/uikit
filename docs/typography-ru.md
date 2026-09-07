# Типографика

Шкала типографики UIKit — фиксированный набор **вариантов текста**, для каждого из которых заданы
`font-size` и `line-height`. Выводите текст через компонент `Text` с prop `variant`, а **не** через
сырые теги `<h1>`/`<p>` или inline `font-size`. Так размеры остаются согласованными и учитывают тему
во всём приложении.

[English](typography.md) | [Русский](typography-ru.md)

```tsx
import {Text} from '@gravity-ui/uikit';

<Text variant="header-1">Page title</Text>; // not <h1>
<Text variant="body-2" color="secondary">
  Supporting copy
</Text>;
```

> Настройка: импортируйте `@gravity-ui/uikit/styles/fonts.css` **до** `styles.css` в точке входа
> приложения и оберните приложение в `ThemeProvider`. Подробнее — в руководстве по
> [темизации](theming-ru.md).

## Варианты текста

| Группа    | Варианты                                                            | Типичное применение                |
| --------- | ------------------------------------------------------------------- | ---------------------------------- |
| Display   | `display-1`, `display-2`, `display-3`, `display-4`                  | Заголовки hero- и marketing-блоков |
| Header    | `header-1`, `header-2`                                              | Заголовки страниц и разделов       |
| Subheader | `subheader-1`, `subheader-2`, `subheader-3`                         | Подразделы, заголовки карточек     |
| Body      | `body-1` (по умолчанию для корня), `body-2`, `body-3`, `body-short` | Основной текст, UI-копирайтинг     |
| Caption   | `caption-1`, `caption-2`                                            | Подсказки, подписи, метаданные     |
| Code      | `code-1`…`code-3`, `code-inline-1`…`code-inline-3`                  | Блоки и inline-фрагменты кода      |

Корневой узел использует вариант `body-1`.

## Семейства шрифтов

Доступны два семейства, настраиваемые переменными:

- `--g-font-family-sans` — sans-serif, основной UI-шрифт;
- `--g-font-family-monospace` — monospace, используется вариантами `code-*`.

## Токены размеров

Метрики каждого варианта доступны как CSS-переменные:

- `--g-text-{variant}-font-size`;
- `--g-text-{variant}-line-height`.

```css
/* e.g. --g-text-header-1-font-size, --g-text-body-2-line-height */
.custom-title {
  font-size: var(--g-text-header-1-font-size);
  line-height: var(--g-text-header-1-line-height);
}
```

Предпочитайте `<Text variant="…">` прямому использованию этих токенов. Обращайтесь к переменным,
только когда нужно стилизовать не-`Text` элемент в соответствии со шкалой.

## Насыщенность шрифта

`font-weight` задаётся для каждой **группы** вариантов (`body`, `header`, `subheader`, `display`,
`caption`, `code`) через `--g-text-{group}-font-weight`. Также есть независимая переменная
`--g-text-accent-font-weight`, не привязанная к конкретному варианту.

## Настройка

Переопределите семейство шрифта, насыщенность или метрики отдельных вариантов на корневом классе.
Как работают переменные `--g-*` и корневой класс, описано в руководстве по
[темизации](theming-ru.md):

```css
.g-root {
  --g-font-family-sans: 'Inter', sans-serif;

  --g-text-header-font-weight: 600;
  --g-text-subheader-font-weight: 600;
  --g-text-display-font-weight: 600;
  --g-text-accent-font-weight: 600;

  /* fine-tune a single variant's metrics */
  --g-text-body-1-font-size: 15px;
  --g-text-body-1-line-height: 20px;
}
```
