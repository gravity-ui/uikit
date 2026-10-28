<!--GITHUB_BLOCK-->

# FileDropZone

<!--/GITHUB_BLOCK-->

`FileDropZone` — область для выбора файлов перетаскиванием или через системный диалог.

```tsx
import {FileDropZone, type DropZoneFileRejection} from '@gravity-ui/uikit';
```

### Базовое использование

```tsx
const accept = ['image/*'];
const handleUpdate = (acceptedItems: File[], rejectedItems: DropZoneFileRejection[]) => {
  // Работа с принятыми и отклоненными файлами.
};

<FileDropZone accept={accept} onUpdate={handleUpdate} />;
```

### Кастомные тексты и иконки

```tsx
import {DatabaseFill, HeartCrack} from '@gravity-ui/icons';

const accept = ['image/*'];
const handleUpdateAccepted = (files: File[]) => {
  // Работа с файлами.
};

<FileDropZone
  accept={accept}
  onUpdateAccepted={handleUpdateAccepted}
  title="Lorem ipsum dolor sit amet"
  description="Duis consequat commodo eros sit"
  buttonText="Upload"
  icon={DatabaseFill}
  errorIcon={HeartCrack}
/>;
```

### Кастомный лейаут

Паттерн Compound Component позволяет рендерить произвольный лейаут. Все пропсы передаются только родительскому компоненту и шарятся через React-контекст, а компоненты-части могут получать только `className`.

```tsx
const accept = ['image/*'];
const handleUpdateAccepted = (files: File[]) => {
  // Работа с файлами.
};

<FileDropZone
  accept={accept}
  onUpdateAccepted={handleUpdateAccepted}
  title="Lorem ipsum dolor sit amet"
  description="Duis consequat commodo eros sit"
  buttonText="Upload"
  icon={DatabaseFill}
  errorIcon={HeartCrack}
>
  <div
    style={{
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '32px',
      }}
    >
      <FileDropZone.Icon className={iconClassName} />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <FileDropZone.Title className={titleClassName} />
        <FileDropZone.Description className={descriptionClassName} />
      </div>
    </div>
    <div style={{marginLeft: '16px'}}>
      <FileDropZone.Button className={buttonClassName} />
    </div>
  </div>
</FileDropZone>;
```

### Допустимые типы файлов

`accept` использует формат HTML-атрибута `accept`. Файл принимается, если подходит хотя бы под один элемент списка:

- точный MIME-тип, например `image/png`;
- wildcard верхнего уровня, например `image/*`;
- расширение файла, например `.csv` или `.md`; сравнивается с именем файла без учета регистра.

Правила одинаковы для перетаскиваемых файлов и файлов, выбранных в диалоге.

Пока файл только перетаскивается над зоной, его имя еще неизвестно, поэтому элементы-расширения не помечают перетаскивание как невалидное. Окончательная проверка выполняется при drop.

MIME-элементы сравниваются с `File.type`, который определяет операционная система. Для неизвестных расширений он может быть пустым (`File.type === ''`) или отличаться от ожидаемого: например, Chrome на Windows с установленным Excel сообщает тип `.csv` как `application/vnd.ms-excel`, а `.zip` — как `application/x-zip-compressed`. Диалог выбора файлов фильтрует по расширениям, поэтому может показать такой файл, но после выбора он будет отклонен с причиной `invalid-type`. Чтобы надежно принимать такие файлы, указывайте расширение рядом с MIME-типом, например `['text/csv', '.csv']` или `['image/*', '.heic']`.

Пустые элементы и элементы из одних пробелов игнорируются. Список без других элементов принимает любые типы файлов — так же, как HTML-атрибут `accept`.

## Properties

| Name             | Description                                                                                                                                                                       |                                   Type                                    |                                                          Default                                                          |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| accept           | Допустимые типы файлов: MIME-типы, wildcard верхнего уровня и расширения файлов. Пустой список принимает любые типы файлов. См. [Допустимые типы файлов](#допустимые-типы-файлов) |                                `string[]`                                 |                                                           `[]`                                                            |
| onUpdate         | Коллбэк, вызываемый при добавлении файлов. Получает принятые и отклоненные файлы в одном вызове                                                                                   | `(acceptedItems: File[], rejectedItems: DropZoneFileRejection[]) => void` |                                                                                                                           |
| onUpdateAccepted | Коллбэк, вызываемый при добавлении принятых файлов                                                                                                                                |                         `(items: File[]) => void`                         |                                                                                                                           |
| onUpdateRejected | Коллбэк для отклоненных файлов: перетаскиваемых или выбранных файлов с типом, не подходящим под `accept`, и файлов после первого в режиме загрузки одного файла                   |                `(items: DropZoneFileRejection[]) => void`                 |                                                                                                                           |
| title            | Заголовок, отображаемый под иконкой                                                                                                                                               |                                 `string`                                  | `"Перетащите файл сюда или выберите его"` (`multiple=false`); `"Перетащите файлы сюда или выберите их"` (`multiple=true`) |
| description      | Описание, отображаемое под заголовком                                                                                                                                             |                                 `string`                                  |                                                                                                                           |
| buttonText       | Подпись кнопки загрузки                                                                                                                                                           |                                 `string`                                  |                         `"Выбрать файл"` (`multiple=false`); `"Выбрать файлы"` (`multiple=true`)                          |
| icon             | Пользовательский компонент иконки из `@gravity-ui/icons`. Если передан `null`, иконка не отображается.                                                                            |                       `@gravity-ui/icons/IconData`                        |                                                                                                                           |
| errorIcon        | Пользовательский компонент иконки ошибки из `@gravity-ui/icons`. Если передан `null`, иконка ошибки не отображается.                                                              |                       `@gravity-ui/icons/IconData`                        |                                                                                                                           |
| className        | Класс корневого элемента                                                                                                                                                          |                                 `string`                                  |                                                                                                                           |
| multiple         | Булево значение, определяющее, можно ли загружать несколько файлов. Если `false`, принимается только один файл                                                                    |                                 `boolean`                                 |                                                          `false`                                                          |
| disabled         | Булево значение, определяющее, отключена ли загрузка файлов                                                                                                                       |                                 `boolean`                                 |                                                                                                                           |
| errorMessage     | Сообщение об ошибке. Если указано, также применяются стили ошибки.                                                                                                                |                                 `string`                                  |                                                                                                                           |
| validationState  | Состояние валидации. Если установлено `"invalid"`, применяются стили ошибки                                                                                                       |                                `"invalid"`                                |                                                                                                                           |
| children         | Пользовательская разметка. Составные компоненты `FileDropZone.Icon`, `Title`, `Description` и `Button` можно использовать только внутри `FileDropZone`                            |                             `React.ReactNode`                             |                                                                                                                           |
