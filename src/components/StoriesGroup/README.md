## StoriesGroup

Component for displaying group of stories. It looks like a carousel in a modal with given places to display text and media.

### PropTypes

| Property            | Type                                      | Required | Default | Description                                      |
| :------------------ | :---------------------------------------- | :------- | :------ | :----------------------------------------------- |
| open                | `Boolean`                                 | ✓        |         | Visibility flag                                  |
| groups              | `StoriesGroupItem[]`                      | ✓        |         | List of groups of stories to display             |
| initialStoryIndex   | `[groupIndex: Number, itemIndex: Number]` |          | [0, 0]  | Index of the first story to be displayed         |
| onClose             | `Function`                                |          |         | Action on close                                  |
| onItemSelect        | `Function`                                |          |         | Action when switching to story                   |
| disableOutsideClick | `Boolean`                                 |          | true    | If `true`, do not close stories on click outside |

### StoriesGroupItem object

| Field          | Type                                                                                                               | Required | Default | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------ |
| items          | `[StoriesItem](https://github.com/gravity-ui/uikit/tree/main/src/components/Stories#storiesitem-object)[]`         |          |         | Array of items as in `Stories` component                                                   |
| thumbnailMedia | `[StoriesItemMedia](https://github.com/gravity-ui/uikit/tree/main/src/components/Stories#storiesitemmedia-object)` |          |         | Media content for preview, otherwise first StoriesItem.media from StoriesItem will be used |

#### Usage example

```jsx harmony
<StoriesGroup
  open
  groups={[
    {
      items: [
        {
          title: 'New navigation',
          description:
            'At the top of the panel is the service navigation for each service. ' +
            'Below are common navigation elements: a component for switching between accounts ' +
            'and organizations, settings, help center, search, notifications, favorites.',
          url: 'https://yandex.eu',
          media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-2.png',
          },
        },
        {
          title: 'New navigation (2)',
          description: 'A little more about the new navigation',
          media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            type: 'video',
          },
        },
      ],
    },
    {
      items: [
        {
          title: 'New navigation (3)',
          description: 'Switch to the new navigation right now',
          media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-4.png',
          },
        },
      ],
    },
  ]}
/>
```
