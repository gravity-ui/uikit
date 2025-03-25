## Disclosure

`Disclosure` — компонент раскрытия, который показывает и скрывает вложенный контент.

### Свойства

| Имя             | Тип                           | Обязательное | Значение по умолчанию | Описание                                                         |
| :-------------- | :---------------------------- | :----------: | :-------------------- | :--------------------------------------------------------------- |
| size            | `m` `l` `xl`                  |              | `m`                   | Размер раскрытия.                                                |
| className       | `String`                      |              |                       | Имя CSS-класса корневого элемента.                               |
| disabled        | `Boolean`                     |              | `false`               | Отключенное состояние.                                           |
| defaultExpanded | `Boolean`                     |              | `false`               | Состояние раскрытия по умолчанию.                                |
| expanded        | `Boolean`                     |              |                       | Контролируемое состояние раскрытия.                              |
| arrowPosition   | `start` `end`                 |              | `left`                | Положение контрола.                                              |
| summary         | `React.ReactNode`             |              |                       | Краткое описание контента.                                       |
| keepMounted     | `Boolean`                     |              | `true`                | Сохранение контента в DOM.                                       |
| onUpdate        | `(expanded: boolean) => void` |              |                       | Обратный вызов, срабатывающий при изменении состояния раскрытия. |
| children        | `React.ReactNode`             |              |                       | Контент.                                                         |
| qa              | `String`                      |              |                       | Идентификатор для тестирования.                                  |

### Свойства Disclosure.Summary

| Имя      | Тип                                             | Обязательное | Значение по умолчанию | Описание                        |
| :------- | :---------------------------------------------- | :----------: | :-------------------- | :------------------------------ |
| children | `(props, defaultSummary) => React.ReactElement` |      Да      |                       | Функция рендеринга.             |
| qa       | `String`                                        |              | `disclosure-summary`  | Идентификатор для тестирования. |

### Свойства Disclosure.Details

| Имя      | Тип               | Обязательное | Значение по умолчанию | Описание                        |
| :------- | :---------------- | :----------: | :-------------------- | :------------------------------ |
| children | `React.ReactNode` |      Да      |                       | Контент                         |
| qa       | `String`          |              | `disclosure-details`  | Идентификатор для тестирования. |

### Примеры

Базовый пример:

```jsx
<Disclosure summary="summary">Content</Disclosure>
```

Пример с пользовательским кратким описанием:

```jsx
<Disclosure>
  <Disclosure.Summary>
    {(props) => (
      <Button {...props}>
        <Icon data={Check} size={14} />
        Custom summary
        <Icon data={Check} size={14} />
      </Button>
    )}
  </Disclosure.Summary>
  <div>Custom details</div>
  <div>More custom details</div>
</Disclosure>
```

```jsx
<Disclosure>
  <Disclosure.Summary>
    {(_props, defaultButton) => (
      <Flex gap={4}>
        {defaultButton}
        <Icon data={Check} size={14} />
      </Flex>
    )}
  </Disclosure.Summary>
  Details
</Disclosure>
```
