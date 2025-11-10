<!--GITHUB_BLOCK-->

# FileDropZone

<!--/GITHUB_BLOCK-->

```tsx
import {FileDropZone} from '@gravity-ui/uikit';
```

### Базовое использование

```tsx
const accept = ['image/*'];
const handleAdd = (files: File[]) => {
  // Do something with files
};

<FileDropZone accept={accept} onAdd={handleAdd} />;
```

### Кастомные тексты и иконки

```tsx
import {DatabaseFill, HeartCrack} from '@gravity-ui/icons';

const accept = ['image/*'];
const handleAdd = (files: File[]) => {
  // Do something with files
};

<FileDropZone
  accept={accept}
  onAdd={handleAdd}
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
const handleAdd = (files: File[]) => {
  // Do something with files
};

<FileDropZone
  accept={accept}
  onAdd={handleAdd}
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

## Properties

| Name         | Description                                                                                                          |             Type             |                  Default                   |
| :----------- | :------------------------------------------------------------------------------------------------------------------- | :--------------------------: | :----------------------------------------: |
| accept       | Список допустимых MIME-типов                                                                                         |          `string[]`          |                                            |
| onAdd        | Коллбэк, вызываемый при добавлении файлов. Не вызывается, если тип файла недопустим.                                 |  `(files: File[]) => void`   |                                            |
| title        | Заголовок, отображаемый под иконкой                                                                                  |           `string`           | "Drag the file(s) here or select it(them)" |
| description  | Описание, отображаемое под заголовком                                                                                |           `string`           |                                            |
| buttonText   | Подпись кнопки загрузки                                                                                              |           `string`           |             "Select a file(s)"             |
| icon         | Пользовательский компонент иконки из `@gravity-ui/icons`. Если передан `null`, иконка не отображается.               | `@gravity-ui/icons/IconData` |                                            |
| errorIcon    | Пользовательский компонент иконки ошибки из `@gravity-ui/icons`. Если передан `null`, иконка ошибки не отображается. | `@gravity-ui/icons/IconData` |                                            |
| className    | Класс корневого элемента                                                                                             |           `string`           |                                            |
| multiple     | Булево значение, которое определяет, разрешена ли множественная загрузка файлов                                      |                              |                                            |
| disabled     | Булево значение, определяющее, отключена ли загрузка файлов                                                          |                              |                                            |
| errorMessage | Сообщение об ошибке. Если указано, также применяются стили ошибки.                                                   |           `string`           |                                            |
