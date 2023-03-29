## HotkeysList

List for hotkeys documentation

### PropTypes

| Property | Type    | Required | Default | Description            |
| :------- | :------ | :------: | :------ | :--------------------- |
| hotkeys  | `Array` |   yes    |         | List of hotkey groups. |

And all the `List` PropTypes, but not `items` (you can find them [here](https://github.com/gravity-ui/uikit/blob/main/src/components/List/README.md))

```jsx harmony
<List
  hotkeys={[
    {
      title: 'General',
      items: [
        {
          title: 'Copy',
          value: 'ctrl+c',
        },
        {
          title: 'Paste',
          value: 'ctrl+v',
        },
      ],
    },
    {
      title: 'Issue',
      items: [
        {
          title: 'Go to comments',
          value: 'shift+c',
        },
        {
          title: 'Got to history',
          value: 'shift+h',
        },
        {
          title: 'Edit description',
          value: 'alt+d',
        },
      ],
    },
  ]}
/>
```

You can filter hotkeys by yourself or use [List](https://github.com/gravity-ui/uikit/blob/main/src/components/List/README.md) filter properties
