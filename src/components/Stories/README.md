## Stories

Component for displaying stories.

### PropTypes

| Property        | Type       | Required | Default | Description                              |
| :-------------- | :--------- | :------- | :------ | :--------------------------------------- |
| open            | `Boolean`  | ✓        |         | Visibility flag                          |
| stories         | `Story[]`  | ✓        |         | List of stories to display               |
| startStoryIndex | `Number`   |          | 0       | Index of the first story to be displayed |
| onClose         | `Function` |          |         | Action on close                          |
| onPreviousClick | `Function` |          |         | Action when switching to previous story  |
| onNextClick     | `Function` |          |         | Action when switching to next story      |

### Story object

| Field       | Type         | Required | Default | Description                      |
| ----------- | ------------ | -------- | ------- | -------------------------------- |
| title       | `String`     |          |         | Title                            |
| description | `String`     |          |         | Main text                        |
| url         | `String`     |          |         | Link to display more information |
| media       | `StoryMedia` |          |         | Media content                    |

### StoryMedia object

| Field | Type     | Required | Default | Description                       |
| ----- | -------- | -------- | ------- | --------------------------------- |
| type  | `String` |          | image   | Content type (`image` or `video`) |
| url   | `String` | ✓        |         | File link                         |

#### Usage example

```jsx harmony
<Stories
  open
  stories={[
    {
      title: 'Story title',
      description: 'Story text',
      media: {
        url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-1.png',
      },
    },
  ]}
/>
```
