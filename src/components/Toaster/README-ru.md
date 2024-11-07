<!--GITHUB_BLOCK-->

# Toaster

<!--/GITHUB_BLOCK-->

`Toaster` — компонент для настраиваемых уведомлений.

## Использование `Toaster` с контекстом

```jsx
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <ToasterProvider>
    <App />
    <ToasterComponent className="optional additional classes" />
  </ToasterProvider>,
);
```

Так можно отображать тосты с помощью хука `useToaster` в компонентах вашего приложения:

```jsx
import {useToaster} from '@gravity-ui/uikit';
import {useEffect} from 'react';

export function FoobarComponent() {
  const {add} = useToaster();

  useEffect(() => {
    add({
      title: 'Toaster is here',
    });
  }, []);

  return null;
}
```

Хук возвращает методы `add`, `update`, `remove` и `removeAll` (подробнее см. ниже).

## Использование `Toaster` в качестве HOC

Для классовых компонентов можно использовать HOC `withToaster`, который добавит свойство `toaster` в компонент.

```jsx
import {Component} from 'react';
import {withToaster} from '@gravity-ui/uikit';

class FoobarComponent extends Component {
  render() {
    this.props.toaster.add({});
  }
}

const FoobarWithToaster = withToaster()(FoobarComponent);
```

## Использование `Toaster` в качестве синглтона

`Toaster` реализован как синглтон, поэтому при его инициализации в разных частях приложения будет возвращаться один и тот же экземпляр.
При инициализации можно передать `className`, значение которого будет назначено элементу `dom`, оборачивающему все тосты.

### React до v18

```js
import {Toaster} from '@gravity-ui/uikit';
const toaster = new Toaster();
```

или

```js
import {toaster} from '@gravity-ui/uikit/toaster-singleton';
```

### React v18

```js
import ReactDOMClient from 'react-dom/client';
import {Toaster} from '@gravity-ui/uikit';
Toaster.injectReactDOMClient(ReactDOMClient);
const toaster = new Toaster();
```

или

```js
import {toaster} from '@gravity-ui/uikit/toaster-singleton-react-18';
```

## Аргументы конструктора

| Параметр  | Тип       | Значение по умолчанию | Описание                                                                     |
| :-------- | :-------- | :-------------------- | :--------------------------------------------------------------------------- |
| className | `string`  | `undefined`           | Пользовательское имя класса, которое будет добавлено в контейнер компонента. |
| mobile    | `boolean` | `false`               | Конфигурация, управляющая мобильным и десктопным представлениями.            |

## Методы

| Название метода               | Параметры          | Описание                                                                                                                           |
| :---------------------------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| add(toastOptions)             | `Object`           | Создает новое уведомление.                                                                                                         |
| remove(name)                  | `string`           | Вручную удаляет существующее уведомление.                                                                                          |
| update(name, overrideOptions) | `string`, `Object` | Изменяет содержимое уже отображенного уведомления. В `overrideOptions` поля `title`, `type`, `content` и `actions` необязательные. |
| has(name)                     | `string`           | Проверяет наличие тоста с заданным именем в списке отображаемых тостов.                                                            |

## Дополнительно о методе `add`

Он принимает аргумент `toastOptions` с данными текущего уведомления:

| Параметр   | Тип                                     | Обязательное | Значение по умолчанию | Описание                                                                                                                                                                                                                                                |
| :--------- | :-------------------------------------- | :----------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name       | `string`                                | Да           |                       | Уникальное имя уведомления. Уведомления с одинаковыми именами объединяются в одно.                                                                                                                                                                      |
| title      | `string`                                |              |                       | Заголовок уведомления.                                                                                                                                                                                                                                  |
| className  | `string`                                |              |                       | CSS-класс.                                                                                                                                                                                                                                              |
| autoHiding | `number` или `false`                    |              | 5000                  | Время задержки в миллисекундах перед скрытием уведомления. Для отключения автоматического скрытия тоста установите значение `false`.                                                                                                                    |
| content    | `node`                                  |              | `undefined`           | Содержимое уведомления. Оно может включать [все, что можно отобразить: числа, строки, элементы или массив](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes).                                                                        |
| theme      | `string`                                |              | `"normal"`            | Тема уведомления. Возможные значения: `"normal"`, `"info"`, `"success"`, `"warning"`, `danger`, `"utility"`. Если для `theme` установить любое значение, кроме `"normal"`, в заголовок уведомления добавится иконка. _По умолчанию иконка отсутствует_. |
| isClosable | `boolean`                               |              | `true`                | Конфигурация, управляющая отображением иконки X, которая позволяет пользователю закрыть уведомление.                                                                                                                                                    |
| actions    | `ToastAction[]`                         |              | `undefined`           | Массив [действий](./types.ts#L9), отображаемых после `content`.                                                                                                                                                                                         |
| renderIcon | `(toastProps: ToastProps) => ReactNode` |              | `undefined`           | Используется для кастомизации иконки тоста. По умолчанию используется поведение на основе типа.                                                                                                                                                         |

Каждое действие (`action`) — это объект со следующими параметрами:

| Параметр         | Тип                                       | Обязательное | Значение по умолчанию | Описание                                                             |
| :--------------- | :---------------------------------------- | :----------- | :-------------------- | :------------------------------------------------------------------- |
| label            | `string`                                  | Да           |                       | Описание действия.                                                   |
| onClick          | `() => void`                              | Да           |                       | Обработчик клика по действию.                                        |
| view             | [`ButtonView`](../Button/README.md#props) |              | `outlined`            | Внешний вид действия, соответствует `view` для `<Button/>`.          |
| removeAfterClick | `boolean`                                 |              | `true`                | Включает или отключает закрытие уведомления после клика по действию. |

## API CSS

| Имя                        | Описание                   |
| :------------------------- | :------------------------- |
| `--g-toaster-width`        | Ширина контейнера.         |
| `--g-toaster-item-padding` | Отступы элемента.          |
| `--g-toaster-item-gap`     | Интервал между элементами. |
