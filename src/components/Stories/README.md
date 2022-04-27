## Stories

Component for displaying stories. It looks like a carousel in a modal with given places to display text and media.

### PropTypes

| Property            | Type            | Required | Default | Description                                      |
| :------------------ | :-------------- | :------- | :------ | :----------------------------------------------- |
| open                | `Boolean`       | ✓        |         | Visibility flag                                  |
| items               | `StoriesItem[]` | ✓        |         | List of stories to display                       |
| initialStoryIndex   | `Number`        |          | 0       | Index of the first story to be displayed         |
| onClose             | `Function`      |          |         | Action on close                                  |
| onPreviousClick     | `Function`      |          |         | Action when switching to previous story          |
| onNextClick         | `Function`      |          |         | Action when switching to next story              |
| disableOutsideClick | `Boolean`       |          | true    | If `true`, do not close stories on click outside |

### StoriesItem object

| Field       | Type               | Required | Default | Description                      |
| ----------- | ------------------ | -------- | ------- | -------------------------------- |
| title       | `String`           |          |         | Title                            |
| description | `String`           |          |         | Main text                        |
| url         | `String`           |          |         | Link to display more information |
| media       | `StoriesItemMedia` |          |         | Media content                    |

### StoriesItemMedia object

| Field     | Type     | Required | Default | Description                       |
| --------- | -------- | -------- | ------- | --------------------------------- |
| type      | `String` |          | image   | Content type (`image` or `video`) |
| url       | `String` | ✓        |         | File link                         |
| posterUrl | `String` |          |         | Poster URL (only used for video)  |

#### Usage example

```jsx harmony
<Stories
  open
  stories={[
    {
      title: 'Story title',
      description: 'Story text',
      media: {
        url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-2.png',
      },
    },
  ]}
/>
```
