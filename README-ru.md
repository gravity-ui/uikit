# UIKit &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/uikit?logo=npm)](https://www.npmjs.com/package/@gravity-ui/uikit) [![npm downloads](https://img.shields.io/npm/dm/@gravity-ui/uikit?logo=npm)](https://www.npmjs.com/package/@gravity-ui/uikit) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit/.github/workflows/ci.yml?branch=main&label=CI&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/ci.yml?query=branch:main) [![storybook tests](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit/.github/workflows/test-storybook.yml?label=Storybook%20Tests&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/test-storybook.yml) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685?logo=storybook)](https://preview.gravity-ui.com/uikit/)

[English](README.md) | [Русский](README-ru.md)

Набор гибких, практичных и эффективных React-компонентов для создания насыщенных веб-приложений. Часть дизайн-системы [Gravity UI](https://gravity-ui.com).

<!--GITHUB_BLOCK-->

![Cover image](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/uikit_cover.png)

### ![Globe Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/globe_light.svg#gh-light-mode-only) ![Globe Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/globe_dark.svg#gh-dark-mode-only) [Сайт](https://gravity-ui.com) &nbsp;&nbsp; ![Documentation Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/book-open_light.svg#gh-light-mode-only) ![Documentation Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/book-open_dark.svg#gh-dark-mode-only) [Документация](https://gravity-ui.com/components/uikit/alert) &nbsp;&nbsp; ![Figma Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/figma_light.svg#gh-light-mode-only) ![Figma Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/figma_dark.svg#gh-dark-mode-only) [Figma](<https://www.figma.com/community/file/1271150067798118027/Gravity-UI-Design-System-(Beta)>) &nbsp;&nbsp; ![Themer Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/bucket-paint_light.svg#gh-light-mode-only) ![Themer Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/bucket-paint_dark.svg#gh-dark-mode-only) [Themer](https://gravity-ui.com/themer) &nbsp;&nbsp; ![Storybook Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/storybook_light.svg#gh-light-mode-only) ![Storybook Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/storybook_dark.svg#gh-dark-mode-only) [Storybook](https://preview.gravity-ui.com/uikit/) &nbsp;&nbsp; ![Community Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/telegram_light.svg#gh-light-mode-only) ![Community Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/telegram_dark.svg#gh-dark-mode-only) [Сообщество](https://t.me/gravity_ui)

<!--/GITHUB_BLOCK-->

## О библиотеке

UIKit — базовый пакет дизайн-системы [Gravity UI](https://gravity-ui.com): проверенный в бою набор из 70+ React-компонентов для продакшен веб-приложений. Он берёт на себя сложные части — темизацию, доступность, RTL-раскладку, серверный рендеринг и интернационализацию, — чтобы вы могли сосредоточиться на своём продукте.

Ключевые возможности:

- **70+ компонентов** — поля ввода, оверлеи, отображение данных, layout-примитивы, обратная связь и многое другое
- **Встроенная темизация** — светлая, тёмная и высококонтрастные темы, плюс интерактивный инструмент [Themer](https://gravity-ui.com/themer) для настройки токенов
- **Поддержка RTL** — полноценная раскладка справа налево

Полный каталог компонентов — в [Storybook](https://preview.gravity-ui.com/uikit/) и в [документации](https://gravity-ui.com/components/uikit/alert).

## Начало работы

### Требования

В проекте должен быть установлен React 16.14, 17, 18 или 19.

### Установка

```shell
npm install @gravity-ui/uikit
```

## Использование

Импортируйте компоненты напрямую из пакета:

```jsx
import {Button} from '@gravity-ui/uikit';

const SubmitButton = (
  <Button view="action" size="l">
    Отправить
  </Button>
);
```

### Стили

Подключите базовые стили и шрифты один раз в точке входа приложения:

```js
// index.js
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
```

Также доступен SCSS-файл с полезными [миксинами](styles/mixins.scss) для использования в ваших собственных стилях.

### Руководства

Подробнее:

- [Темизация](docs/theming-ru.md) — светлая, тёмная и высококонтрастные темы
- [Серверный рендеринг (SSR)](docs/server-side-rendering-ru.md) — генерация корневого CSS-класса на сервере
- [Интернационализация (I18N)](docs/i18n-ru.md) — язык встроенных текстов компонентов

## Разработка

```shell
git clone git@github.com:gravity-ui/uikit.git
cd uikit
npm ci
npm run start   # запускает Storybook на http://localhost:7007
```

Другие полезные команды:

```shell
npm test              # запуск юнит-тестов
npm run lint          # линтинг JS, SCSS и Markdown
npm run typecheck     # проверка типов TypeScript
npm run playwright    # визуальные регрессионные тесты
```

## Мейнтейнеры

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/amje">
        <img src="https://github.com/amje.png?size=100" width="100" alt="amje" /><br />
        <sub><b>@amje</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ValeraS">
        <img src="https://github.com/ValeraS.png?size=100" width="100" alt="ValeraS" /><br />
        <sub><b>@ValeraS</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/korvin89">
        <img src="https://github.com/korvin89.png?size=100" width="100" alt="korvin89" /><br />
        <sub><b>@korvin89</b></sub>
      </a>
    </td>
  </tr>
</table>

## Участие в разработке

Мы рады вашему вкладу! Пожалуйста, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) перед отправкой pull request. Подробные рекомендации по оформлению PR — в [contribute/pull-request.md](contribute/pull-request.md).

У нас уже [![contributors](https://img.shields.io/github/contributors/gravity-ui/uikit?label=contributors)](https://github.com/gravity-ui/uikit/graphs/contributors) контрибьюторов — присоединяйтесь!

Вопросы и обсуждения — в сообществе в [Telegram](https://t.me/gravity_ui).

## Лицензия

Распространяется под лицензией MIT. Подробности — в файле [LICENSE](LICENSE).

## История звёзд

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=gravity-ui/uikit&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=gravity-ui/uikit&type=Timeline" />
    <img alt="Star History Chart" width="600" src="https://api.star-history.com/svg?repos=gravity-ui/uikit&type=Timeline" />
  </picture>
</div>

---

Если UIKit оказался вам полезен, поставьте ⭐ на [GitHub](https://github.com/gravity-ui/uikit) — это помогает другим находить проект.
