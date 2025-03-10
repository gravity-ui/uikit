<!--GITHUB_BLOCK-->

# Toaster

<!--/GITHUB_BLOCK-->

`Toaster` — компонент для настраиваемых уведомлений.

## Использование Toaster

Чтобы показывать тосты в вашем приложении, необходимо обернуть приложение в `ToasterProvider`.

```jsx
import {Toaster, ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

const toaster = new Toaster();

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <ToasterProvider toaster={toaster}>
    <App />
    <ToasterComponent className="optional additional classes" />
  </ToasterProvider>,
);
```

`toaster` является экземпляром класса, который хранит состояние всех ваших тостов и используется "под капотом" в хуке `useToaster` и HOC `withToaster`.

Вы также можете использовать `toaster` напрямую в различных частях вашего приложения (вне React):

```js
toaster.add({
  title: 'Toaster is here',
});
```

Необходимо использовать один и тот же экземпляр `Toaster` в React и за его пределами, чтобы все тосты отображались в одном контейнере на экране. Вы можете реализовать эту логику самостоятельно или импортировать готовый экземпляр из модуля `toaster-singleton`.

```js
import {toaster} from '@gravity-ui/uikit/toaster-singleton';
```

## Использование `useToaster`

Вы можете показывать тосты с помощью хука `useToaster` в компонентах вашего приложения:

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

Хук возвращает методы `add`, `update`, `remove` и `removeAll` (подробнее о них ниже).

## Использование `Toaster` как HOC

Для классовых компонентов можно использовать HOC `withToaster`, который добавит свойство `toaster` в ваш компонент.

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
