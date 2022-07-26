## ChangelogDialog

Component for displaying the changelog. It looks like a list of versions in a modal. It can display regular versions and versions associated with stories.

### PropTypes

| Property              | Type              | Required | Default     | Description                                                     |
| :-------------------- | :---------------- | :------- | :---------- | :-------------------------------------------------------------- |
| open                  | `Boolean`         | ✓        |             | Visibility flag                                                 |
| title                 | `String`          |          | `Changelog` | Dialog title                                                    |
| docsLink              | `String`          |          |             | Link to documentation with full changelog                       |
| items                 | `ChangelogItem[]` | ✓        |             | List of versions to display                                     |
| disableBodyScrollLock | `Boolean`         |          | true        | If `true`, window scrolling is disabled when the dialog is open |
| disableOutsideClick   | `Boolean`         |          |             | If `true`, do not close dialog on click outside                 |
| onClose               | `Function`        |          |             | Action on close                                                 |
| onStoryClick          | `OnStoryClick`    |          |             | Action on click to "View story"                                 |

### ChangelogItem object

| Field       | Type        | Required | Default | Description                 |
| ----------- | ----------- | -------- | ------- | --------------------------- |
| date        | `String`    | ✓        |         | Version release date        |
| isNew       | `Boolean`   |          |         | If `true`, show "New" label |
| version     | `String`    | ✓        |         | Version number              |
| title       | `String`    |          |         | Version title               |
| image       | `ImageData` |          |         | Version image info          |
| description | `String`    | ✓        |         | Version description         |
| storyId     | `String`    |          |         | Version related story       |

### ImageData object

| Field | Type     | Required | Default | Description                           |
| ----- | -------- | -------- | ------- | ------------------------------------- |
| src   | `String` | ✓        |         | Image link                            |
| ratio | `Number` | ✓        |         | Image aspect ratio = [height / width] |

### OnStoryClick function

`(storyId: string) => void`

#### Usage example

```jsx harmony
<ChangelogDialog
  open
  items={[
    {
      date: '03 Jul 2022',
      isNew: true,
      version: '2.0.0',
      title: 'New navigation',
      image: {
        src: 'https://jing.yandex-team.ru/files/msitnikov1/pic1%402x.png',
        ratio: 240 / 516,
      },
      description:
        'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
      storyId: 'someStoryId1',
    },
    {
      date: '15 Jun 2022',
      version: '1.3.1',
      title: 'Some fixes',
      description:
        'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
    },
  ]}
/>
```
