<!--GITHUB_BLOCK-->

# Avatar

<!--/GITHUB_BLOCK-->

```tsx
import {Avatar} from '@gravity-ui/uikit';
```

Данный компонент предназначен для рендеринга аватаров. Он поддерживает три основных типа аватаров: изображение, иконку и текст (инициалы). Все эти типы имеют специальные свойства для настройки их поведения и внешнего вида.

## Типы

### Изображение

Компонент `Avatar` можно применять для рендеринга аватаров с использованием изображений. Для добавления изображения используйте свойство `imgUrl`.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return <Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="l" />;
}
SANDBOX-->

Дополнительно можно передать свойство `srcSet`, которое позволяет загружать изображения разных размеров.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <Avatar
            imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352"
            srcSet="https://loremflickr.com/57/43/cats?lock=2879400393572352 1x, https://loremflickr.com/131/98/cats?lock=4373954936438784 2x, https://loremflickr.com/164/123/cats?lock=3007328513163264 3x, https://loremflickr.com/225/169/cats?lock=8243879964835840 4x"
            size="l"
        />
    );
}
SANDBOX-->

У компонента `Avatar` есть свойство `fallbackImgUrl`, которое позволяет передать изображение, которое будет показано при ошибке загрузки изображения по ссылке `imgUrl` (ошибка CSP или отсутствие исходного изображения).

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <Avatar
            imgUrl="random_link"
            fallbackImgUrl="https://loremflickr.com/640/480/cats?lock=3552647338524672"
            size="l"
        />
    );
}
SANDBOX-->

### Иконка

Этот компонент можно применять для рендеринга аватаров с использованием иконок. Чтобы задать иконку, используйте свойство `icon` точно так же, как для компонента `Icon`.

<!--SANDBOX
import {GraduationCap} from '@gravity-ui/icons';
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return <Avatar icon={GraduationCap} size="l" />;
}
SANDBOX-->

### Текст

Этот компонент можно применять для рендеринга аватаров с использованием текста. Для этого используйте свойство `text`. Текст отображается в виде инициалов (первых букв двух слов) или первых двух букв одного слова.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar text="Charles Darwin" size="l" />
            <Avatar text="Guardian" size="l" />
        </>
    );
}
SANDBOX-->

## Внешний вид

### Тема и вид

Компонент `Avatar` имеет предустановленные темы (`normal` и `brand`) и виды (`filled` и `outlined`).

По умолчанию тема — `normal`, а вид — `filled`.

<!--SANDBOX
import {GraduationCap} from '@gravity-ui/icons';
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar icon={GraduationCap} size="l" theme="normal" view="filled" />
            <Avatar icon={GraduationCap} size="l" theme="brand" view="filled" />
            <Avatar icon={GraduationCap} size="l" theme="normal" view="outlined" />
            <Avatar icon={GraduationCap} size="l" theme="brand" view="outlined" />
        </>
    );
}
SANDBOX-->

### Пользовательские цвета

Можно также задать собственные цвета через свойства `backgroundColor`, `borderColor` и `color` (последнее работает только для аватарок с иконками и текстом). Эти цвета обладают бóльшим приоритетом по сравнению с цветами, которые заданы в темах.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar
                text="Charles Darwin"
                size="l"
                backgroundColor="var(--g-color-base-danger-medium)"
                color="var(--g-color-text-primary)"
            />
            <Avatar text="Charles Darwin" size="l" borderColor="var(--g-color-line-misc)" />
        </>
    );
}
SANDBOX-->

### Размер

Размер `Avatar` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`. Возможные значения: `xs`, `s`, `m`, `l` и `xl`.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar text="Charles Darwin" theme="brand" size="xs" />
            <Avatar text="Charles Darwin" theme="brand" size="s" />
            <Avatar text="Charles Darwin" theme="brand" size="m" />
            <Avatar text="Charles Darwin" theme="brand" size="l" />
            <Avatar text="Charles Darwin" theme="brand" size="xl" />
        </>
    );
}
SANDBOX-->

### Форма

Форму `Avatar` можно настроить с помощью свойства `shape`. Форма по умолчанию — `circle`. Возможные значения: `circle` и `square`.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar text="Charles Darwin" theme="brand" shape="circle" />
            <Avatar text="Charles Darwin" theme="brand" shape="square" />
        </>
    );
}
SANDBOX-->

## Свойства

### Общие

| Имя             | Описание                                               |               Тип               | Значение по умолчанию |
| :-------------- | :----------------------------------------------------- | :-----------------------------: | :-------------------: |
| size            | Размер аватара.                                        | `'xs'` `'s'` `'m'` `'l'` `'xl'` |          `m`          |
| theme           | Тема аватара.                                          |      `'normal'` `'brand'`       |       `normal`        |
| view            | Варианты заполнения и обводки аватара.                 |     `'filled'` `'outlined'`     |       `filled`        |
| shape           | Форма аватара.                                         |      `'circle'` `'square'`      |       `circle`        |
| backgroundColor | Пользовательский цвет фона.                            |            `string`             |                       |
| borderColor     | Пользовательский цвет границы.                         |            `string`             |                       |
| title           | HTML-атрибут `title`.                                  |            `string`             |                       |
| aria-label      | Атрибут `aria-label` для секции аватара.               |            `string`             |                       |
| aria-labelledby | Атрибут `aria-labelledby` для секции аватара.          |            `string`             |                       |
| className       | Пользовательский CSS-класс корневого элемента.         |            `string`             |                       |
| style           | HTML-атрибут `style`.                                  |      `React.CSSProperties`      |                       |
| qa              | HTML-атрибут `data-qa`, используется для тестирования. |            `string`             |                       |

### Свойства изображений

| Имя             | Описание                                             |        Тип         | Значение по умолчанию |
| :-------------- | :--------------------------------------------------- | :----------------: | :-------------------: |
| imgUrl          | HTML-атрибут `src` для `img`.                        |      `string`      |                       |
| fallbackImgUrl  | Резервное изображение, отображаемое в случае ошибки. |      `string`      |                       |
| sizes           | HTML-атрибут `sizes` для `img`.                      |      `string`      |                       |
| srcSet          | HTML-атрибут `srcSet` для `img`.                     |      `string`      |                       |
| alt             | HTML-атрибут `alt` для `img`.                        |      `string`      |      props.title      |
| loading         | HTML-атрибут `loading` для `img`.                    | `'eager'` `'lazy'` |                       |
| withImageBorder | Добавляет обводку по умолчанию для изображения       |     `boolean`      |                       |

### Свойства иконки

| Имя   | Описание                      |    Тип     | Значение по умолчанию |
| :---- | :---------------------------- | :--------: | :-------------------: |
| icon  | Источник SVG-иконки.          | `IconData` |                       |
| color | Пользовательский цвет иконки. |  `string`  |                       |

### Свойства текста

| Имя   | Описание                        |   Тип    | Значение по умолчанию |
| :---- | :------------------------------ | :------: | :-------------------: |
| text  | Текст, отображаемый на аватаре. | `string` |                       |
| color | Пользовательский цвет текста.   | `string` |                       |

## API CSS

| Имя                           | Описание                  |
| :---------------------------- | :------------------------ |
| `--g-avatar-size`             | Размер (ширина и высота). |
| `--g-avatar-background-color` | Цвет фона.                |
| `--g-avatar-border-color`     | Цвет границы.             |
| `--g-avatar-color`            | Цвет иконки и текста.     |
| `--g-avatar-font-size`        | Размер шрифта текста.     |
| `--g-avatar-line-height`      | Высота строки текста.     |
