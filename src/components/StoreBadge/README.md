## StoreBadge

Компонент для отображения бейджика магазина приложений: AppStore и Google Play.

### PropTypes

| Property  | Type            | Required | Default | Description                              |
| :-------- | :-------------- | :------- | :------ | :--------------------------------------- |
| platform  | `BadgePlatform` | true     |         | Идентификатор платформы                  |
| lang      | `Lang`          | true     |         | Язык локализации                         |
| url       | `String`        |          |         | Адрес ссылки                             |
| className | `String`        |          |         | Класс элемента                           |
| onClick   | `Function`      |          |         | Функция обработки нажатия на элемент     |
| alt       | `String`        |          |         | Текст подсказки при наведении на элемент |
