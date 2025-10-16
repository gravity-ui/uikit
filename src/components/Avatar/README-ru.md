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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="l" />
`}
>
    <UIKit.Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

Дополнительно можно передать свойство `srcSet`, которое позволяет загружать изображения разных размеров.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" srcSet="https://loremflickr.com/57/43/cats?lock=2879400393572352 1x, https://loremflickr.com/131/98/cats?lock=4373954936438784 2x, https://loremflickr.com/164/123/cats?lock=3007328513163264 3x, https://loremflickr.com/225/169/cats?lock=8243879964835840 4x" size="l" />
`}
>
    <UIKit.Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" srcSet="https://loremflickr.com/57/43/cats?lock=2879400393572352 1x, https://loremflickr.com/131/98/cats?lock=4373954936438784 2x, https://loremflickr.com/164/123/cats?lock=3007328513163264 3x, https://loremflickr.com/225/169/cats?lock=8243879964835840 4x" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

У компонента `Avatar` есть свойство `fallbackImgUrl`, которое позволяет передать изображение, которое будет показано при ошибке загрузки изображения по ссылке `imgUrl` (ошибка CSP или отсутствие исходного изображения).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar imgUrl="random_link" fallbackImgUrl="https://loremflickr.com/640/480/cats?lock=3552647338524672" size="l" />
`}
>
    <UIKit.Avatar imgUrl="random_link" fallbackImgUrl="https://loremflickr.com/640/480/cats?lock=3552647338524672" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

### Иконка

Этот компонент можно применять для рендеринга аватаров с использованием иконок. Чтобы задать иконку, используйте свойство `icon` точно так же, как для компонента `Icon`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
import {GraduationCap} from '@gravity-ui/icons';

<Avatar icon={GraduationCap} size="l" />
`}
>
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" />
</ExampleBlock>

LANDING_BLOCK-->

### Текст

Этот компонент можно применять для рендеринга аватаров с использованием текста. Для этого используйте свойство `text`. Текст отображается в виде инициалов (первых букв двух слов) или первых двух букв одного слова.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" size="l" />
<Avatar text="Guardian" size="l" />
`}
>
    <UIKit.Avatar text="Charles Darwin" size="l" />
    <UIKit.Avatar text="Guardian" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

## Внешний вид

### Тема и вид

Компонент `Avatar` имеет предустановленные темы (`normal` и `brand`) и виды (`filled` и `outlined`).

По умолчанию тема — `normal`, а вид — `filled`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
import {GraduationCap} from '@gravity-ui/icons';

<Avatar icon={GraduationCap} size="l" theme="normal" view="filled" />
<Avatar icon={GraduationCap} size="l" theme="brand" view="filled" />
<Avatar icon={GraduationCap} size="l" theme="normal" view="outlined" />
<Avatar icon={GraduationCap} size="l" theme="brand" view="outlined" />
`}
>
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="normal" view="filled" />
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="brand" view="filled" />
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="normal" view="outlined" />
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="brand" view="outlined" />
</ExampleBlock>

LANDING_BLOCK-->

### Пользовательские цвета

Можно также задать собственные цвета через свойства `backgroundColor`, `borderColor` и `color` (последнее работает только для аватарок с иконками и текстом). Эти цвета обладают бóльшим приоритетом по сравнению с цветами, которые заданы в темах.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" size="l" backgroundColor="var(--g-color-base-danger-medium)" color="var(--g-color-text-primary)" />
<Avatar text="Charles Darwin" size="l" borderColor="var(--g-color-line-misc)" />
`}
>
    <UIKit.Avatar text="Charles Darwin" size="l" backgroundColor="var(--g-color-base-danger-medium)" color="var(--g-color-text-primary)" />
    <UIKit.Avatar text="Charles Darwin" size="l" borderColor="var(--g-color-line-misc)" />
</ExampleBlock>

LANDING_BLOCK-->

### Размер

Размер `Avatar` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`. Возможные значения: `xs`, `s`, `m`, `l` и `xl`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" theme="brand" size="xs" />
<Avatar text="Charles Darwin" theme="brand" size="s" />
<Avatar text="Charles Darwin" theme="brand" size="m" />
<Avatar text="Charles Darwin" theme="brand" size="l" />
<Avatar text="Charles Darwin" theme="brand" size="xl" />
`}
>
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="xs" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="s" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="m" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="l" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="xl" />
</ExampleBlock>

LANDING_BLOCK-->

### Форма

Форму `Avatar` можно настроить с помощью свойства `shape`. Форма по умолчанию — `circle`. Возможные значения: `circle` и `square`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" theme="brand" shape="circle" />
<Avatar text="Charles Darwin" theme="brand" shape="square" />
`}
>
    <UIKit.Avatar text="Charles Darwin" theme="brand" shape="circle" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" shape="square" />
</ExampleBlock>

LANDING_BLOCK-->

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
