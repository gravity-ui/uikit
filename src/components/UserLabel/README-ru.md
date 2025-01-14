# UserLabel

Компонент `UserLabel` служит для отображения пользователей и любой связанной с ними информации.

### Тип

Используется для управления внешним видом аватара. Выберите `"person"` для персонализированной сущности или `"email"` для адреса электронной почты. Если аватар не нужен, выберите `"empty"`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<UserLabel type="person">Charles Darwin</UserLabel>
<UserLabel type="email">email@example.com</UserLabel>
<UserLabel type="empty">Alan Turing</UserLabel>
`}
>
    <UIKit.UserLabel type="person">Charles Darwin</UIKit.UserLabel>
    <UIKit.UserLabel type="email">email@example.com</UIKit.UserLabel>
    <UIKit.UserLabel type="empty">Alan Turing</UIKit.UserLabel>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<UserLabel type="person">Charles Darwin (person)</UserLabel>
<UserLabel type="email">email@example.com (email)</UserLabel>
<UserLabel type="empty">Alan Turing (other)</UserLabel>
```

<!--/GITHUB_BLOCK-->

### Аватар

`UserLabel` можно использовать с пользовательским аватаром, но только при `type: 'person'`. Можно передать изображение, свойство компонента [Avatar](../Avatar/README.md) или пользовательский узел React.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
import {GraduationCap} from '@gravity-ui/icons';

<UserLabel type="person" avatar="<url>">Charles Darwin</UserLabel>
<UserLabel type="person" avatar={{icon: GraduationCap}}>Charles Darwin</UserLabel>
`}
>
    <UIKit.UserLabel type="person" avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg/193px-Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg">Charles Darwin</UIKit.UserLabel>
    <UIKit.UserLabel type="person" avatar={{icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'}}>Charles Darwin</UIKit.UserLabel>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {GraduationCap} from '@gravity-ui/icons';

<UserLabel type="person" avatar="<url>">Charles Darwin</UserLabel>
<UserLabel type="person" avatar={{icon: GraduationCap}}>Charles Darwin</UserLabel>
```

<!--/GITHUB_BLOCK-->

### Интерактивность

`UserLabel` также поддерживает интерактивные функции, такие как кликабельность и возможность закрытия.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<UserLabel onClick={() => alert('onClick triggered')}>Charles Darwin</UserLabel>
<UserLabel onCloseClick={() => alert('onCloseClick triggered')}>Charles Darwin</UserLabel>
`}
>
    <UIKit.UserLabel onClick={() => alert('onClick triggered')}>Charles Darwin</UIKit.UserLabel>
    <UIKit.UserLabel onCloseClick={() => alert('onCloseClick triggered')}>Charles Darwin</UIKit.UserLabel>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<UserLabel onClick={() => alert('onClick triggered')}>Charles Darwin</UserLabel>
<UserLabel onCloseClick={() => alert('onCloseClick triggered')}>Charles Darwin</UserLabel>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя          | Описание                                                  |                                        Тип                                         | Значение по умолчанию |
| :----------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------: | :-------------------: |
| type         | Внешний вид аватара.                                      |                           `'person'` `'email'` `'empty'`                           |      `'person'`       |
| avatar       | Аватар пользователя.                                      | [Свойства аватара](../Avatar/README.md#properties) `string` и `React.ReactElement` |                       |
| children     | Текст, который будет отображен.                           |                                 `React.ReactNode`                                  |                       |
| view         | Внешний вид компонента `UserLabel`.                       |                               `'outlined'` `'clear'`                               |     `'outlined'`      |
| onClick      | Обработчик события `click` для компонента.                |                                     `Function`                                     |                       |
| onCloseClick | Обработчик события `click` для кнопки с иконкой крестика. |                                     `Function`                                     |                       |
| className    | Пользовательский CSS-класс корневого элемента.            |                                      `string`                                      |                       |
| style        | HTML-атрибут `style`.                                     |                               `React.CSSProperties`                                |                       |
| qa           | HTML-атрибут `data-qa`, используется для тестирования.    |                                      `string`                                      |                       |
| size         | Размер аватара.                                           |                          `'xs'` `'s'` `'m'` `'l'` `'xl'`                           |         `'s'`         |

## API CSS

| Имя                          | Описание              |
| :--------------------------- | :-------------------- |
| `--g-user-label-font-size`   | Размер шрифта текста. |
| `--g-user-label-line-height` | Высота строки текста. |
