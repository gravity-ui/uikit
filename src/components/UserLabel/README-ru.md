# UserLabel

Компонент `UserLabel` служит для отображения пользователей и любой связанной с ними информации.

### Тип

Используется для управления внешним видом аватара. Выберите `"person"` для персонализированной сущности или `"email"` для адреса электронной почты. Если аватар не нужен, выберите `"empty"`.

<!--SANDBOX
import {UserLabel} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <UserLabel type="person">Charles Darwin</UserLabel>
            <UserLabel type="email">email@example.com</UserLabel>
            <UserLabel type="empty">Alan Turing</UserLabel>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<UserLabel type="person">Charles Darwin (person)</UserLabel>
<UserLabel type="email">email@example.com (email)</UserLabel>
<UserLabel type="empty">Alan Turing (other)</UserLabel>
```

<!--/GITHUB_BLOCK-->

### Аватар

`UserLabel` можно использовать с пользовательским аватаром, но только при `type: 'person'`. Можно передать изображение, свойство компонента [Avatar](../Avatar/README.md) или пользовательский узел React.

<!--SANDBOX
import {GraduationCap} from '@gravity-ui/icons';
import {UserLabel} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <UserLabel
                type="person"
                avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg/193px-Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg"
            >
                Charles Darwin
            </UserLabel>
            <UserLabel type="person" avatar={{icon: GraduationCap}}>
                Charles Darwin
            </UserLabel>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import {GraduationCap} from '@gravity-ui/icons';

<UserLabel type="person" avatar="<url>">Charles Darwin</UserLabel>
<UserLabel type="person" avatar={{icon: GraduationCap}}>Charles Darwin</UserLabel>
```

<!--/GITHUB_BLOCK-->

### Интерактивность

`UserLabel` также поддерживает интерактивные функции, такие как кликабельность и возможность закрытия.

<!--SANDBOX
import {UserLabel} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <UserLabel onClick={() => alert('onClick triggered')}>Charles Darwin</UserLabel>
            <UserLabel onCloseClick={() => alert('onCloseClick triggered')}>Charles Darwin</UserLabel>
        </>
    );
}
SANDBOX-->

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
