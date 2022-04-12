## Stories

Компонент для отображения stories.

### PropTypes

| Property        | Type       | Required | Default | Description                                   |
| :-------------- | :--------- | :------- | :------ | :-------------------------------------------- |
| open            | `Boolean`  | ✓        |         | Признак видимости                             |
| stories         | `Story[]`  | ✓        |         | Список stories для отображения                |
| startStoryIndex | `Number`   |          | 0       | Индекс первой отображаемой story              |
| onClose         | `Function` |          |         | Действие при закрытии                         |
| onPreviousClick | `Function` |          |         | Действие при переключении на предыдущую story |
| onNextClick     | `Function` |          |         | Действие при переключении на следующую story  |

### Объект Story

| Field       | Type         | Required | Default | Description        |
| ----------- | ------------ | -------- | ------- | ------------------ |
| title       | `String`     |          |         | Заголовок          |
| description | `String`     |          |         | Основной текст     |
| url         | `String`     |          |         | Ссылка "Подробнее" |
| media       | `StoryMedia` |          |         | Медиа-контент      |

### Объект StoryMedia

| Field | Type     | Required | Default | Description                        |
| ----- | -------- | -------- | ------- | ---------------------------------- |
| type  | `String` |          | image   | Тип контента (`image` или `video`) |
| url   | `String` | ✓        |         | Ссылка на файл                     |
