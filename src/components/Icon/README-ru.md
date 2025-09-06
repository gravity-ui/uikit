<!--GITHUB_BLOCK-->

# Icon

<!--/GITHUB_BLOCK-->

```tsx
import {Icon} from '@gravity-ui/uikit';
```

Компонент `Icon` (иконка) представляет собой обертку для SVG-иконок. SVG-файлы можно загружать разными способами — например, через компоненты React или с использованием различных загрузчиков Webpack: [`SVGR`](https://react-svgr.com/docs/webpack/), [`svg-react-loader`](https://github.com/jhamlet/svg-react-loader), [`svg-inline-loader`](https://github.com/webpack-contrib/svg-inline-loader) или [`svg-sprite-loader`](https://github.com/JetBrains/svg-sprite-loader).
Компонент `Icon` действует как прокси для доступа к иконкам в базе кода.

### Компонент React

```tsx
// CheckIcon.jsx
export function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081Z" />
    </svg>
  );
}

// ---
import {CheckIcon} from './CheckIcon';

<Icon data={CheckIcon} size={16} />;
```

### Загрузчик Webpack

```tsx
// webpack.config.js
{
    test: /\.svg$/,
    use: ['<loader-name>'],
}

// check.svg
<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16">
    <path d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081Z" />
</svg>

// ---
import CheckIcon from './check.svg';

<Icon data={CheckIcon} size={16} />;
```

## Свойства

| Имя       | Описание                                       |        Тип        | Значение по умолчанию |
| :-------- | :--------------------------------------------- | :---------------: | :-------------------: |
| data      | Источник SVG-иконки.                           |    `IconData`     |                       |
| width     | Атрибут `width` для SVG.                       | `number` `string` |                       |
| height    | Атрибут `height` для SVG.                      | `number` `string` |                       |
| size      | Атрибуты `width` и `height` для SVG.           | `number` `string` |                       |
| fill      | Атрибут `fill` для SVG.                        |     `string`      |   `"currentColor"`    |
| stroke    | Атрибут `stroke` для SVG.                      |     `string`      |       `"none"`        |
| className | Пользовательский CSS-класс корневого элемента. |     `string`      |                       |
| style     | Пользовательские стили для корневого элемента. |  `CSSProperties`  |                       |
