<!--GITHUB_BLOCK-->

# Overlay

<!--/GITHUB_BLOCK-->

```tsx
import {Overlay} from '@gravity-ui/uikit';
```

Компонент `Overlay` рендерит наложение поверх родительского элемента с относительным позиционированием (свойство `position` в значении `relative`).
Его можно использовать, например, чтобы сохранить необходимую структуру во время загрузки данных.

```jsx
import {Box, Overlay, Loader} from '@gravity-ui/uikit';

<Box position="relative">
  <div>Some content to hide under overlay</div>
  <Overlay visible={loading}>
    <Loader />
  </Overlay>
</Box>;
```

## Внешний вид

### Фон

Доступны два типа фоновых цветов: `base` и `float`.

<!--GITHUB_BLOCK-->

```tsx
<Overlay background="base">
<Overlay background="float">
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя        | Описание                                      |        Тип         | Значение по умолчанию |
| :--------- | :-------------------------------------------- | :----------------: | :-------------------: |
| className  | Имя CSS-класса корневого элемента.            |      `string`      |                       |
| visible    | Состояние видимости оверлея.                  |     `boolean`      |        `false`        |
| background | Стиль фона оверлея.                           | `"base"` `"float"` |        `base`         |
| children   | Содержимое (как правило, компонент `Loader`). | `React.ReactNode`  |                       |
