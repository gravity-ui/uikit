# ActionsPanel

Use an `ActionsPanel` to render multiple buttons in a row.
When there is not enough space, buttons that don't fit will be added to an overflow menu.

## Usage

```tsx
import React from 'react';
import {ActionsPanel, ActionsPanelProps, Icon} from '@gravity-ui/uikit';
import {ChevronDown} from '@gravity-ui/icons';

const actions: ActionsPanelProps['actions'] = [
  {
    id: 'id1',
    button: {
      props: {
        children: 'Action 1',
        onClick: () => console.log('click button action 1'),
      },
    },
    dropdown: {
      item: {
        action: () => console.log('click dropdown action 1'),
        text: 'Action 1',
      },
    },
  },
  {
    id: 'id2',
    button: {
      props: {
        children: ['Sub-menu', <Icon key="icon" data={ChevronDown} />],
        onClick: () => console.log('click button action 2'),
        view: 'outlined-contrast',
      },
    },
    dropdown: {
      item: {
        text: 'Sub-menu',
        items: [
          {
            action: () => console.log('click sub-action 1'),
            text: 'Sub-action 1',
          },
          {
            action: () => console.log('click sub-action 2'),
            text: 'Sub-action 2',
            theme: 'danger',
          },
        ],
      },
    },
  },
];

const panel = <ActionsPanel actions={actions} />;
```

## Properties

| Name          | Description                                               |          Type           | Default |
| :------------ | :-------------------------------------------------------- | :---------------------: | :-----: |
| actions       | Array of actions `ActionItem[]`                           |     `ActionItem[]`      |         |
| onClose       | Optional close button click handler                       |      `() => void`       |         |
| renderNote    | Optional render-prop for displaying the content of a note | `() => React.ReactNode` |         |
| className     | Optional HTML `class` attribute                           |        `string`         |         |
| noteClassName | Optional HTML `class` attribute                           |        `string`         |         |
| maxRowActions | Maximum number of actions in a row                        |        `number`         |   `4`   |

### ActionItem:

```ts
type ActionItem = {
  /** Unique action id */
  id: string;
  /** If true, then always inside the dropdown */
  collapsed?: boolean;
  /** Settings for dropdown action in overflow menu */
  dropdown: {
    item: DropdownMenuItem;
    group?: string;
  };
  /** Settings for button action */
  button: {
    props: ButtonProps;
  };
};
```
