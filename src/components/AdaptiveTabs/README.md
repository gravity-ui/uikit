## AdaptiveTabs

If there is not enough container width to fit all the tabs, the tabs that do not fit will be hidden and accessible via the select
with the caption `More'. If only one tab fits, the select is displayed instead of the tabs.

### TabItem PropTypes

| Property | Type                        | Required | Default | Description                                          |
| :------- | :-------------------------- | :------: | :------ | :--------------------------------------------------- |
| id       | `String`                    |  `true`  |         | Tab's ID                                             |
| title    | `String`, `React.ReactNode` |          |         | Tab's text                                           |
| disabled | `Boolean`                   |          |         | Indicates that the user cannot interact with the tab |

### AdaptiveTabs PropTypes

| Property                                | Type                                                                      | Required | Default | Description                                                        |
| :-------------------------------------- | :------------------------------------------------------------------------ | :------: | :------ | :----------------------------------------------------------------- |
| activeTab                               | `String`                                                                  |          |         | Active Tab ID                                                      |
| allowNotSelected                        | `Boolean`                                                                 |          |         | Allows you not to specify `activeTab`                              |
| items                                   | `TabItem[]`                                                               |  `true`  |         | Tabs Array                                                         |
| size                                    | `m` `l` `xl`                                                              |          | `m`     | Tabs Size                                                          |
| onSelectTab                             | `onSelectTab?(tabId: string): void`                                       |  `true`  |         | Select tab handler                                                 |
| wrapTo                                  | `wrapTo?(item: TabItemProps, node: React.ReactNode, index: number): void` |          |         | Allows to wrap TabItem into another component or render custom tab |
| className                               | `String`                                                                  |          |         | Class name for the tabs container                                  |
| [breakpointsConfig](#breakpointsConfig) | `Record<string, number>`                                                  |          |         | Breakpoints config which control the thersholds of tab size.       |
| moreControlProps                        | `{popupWidth?: 'fit' \| number; virtualizationThreshold?: number;}`       |          |         | Settings to control popup with hidden tabs list                    |

### breakpointsConfig

An example of a breakpoint configuration definition:

```js
breakpointsConfig = {
  400: 33,
  900: 25,
  1400: 20,
};
```

In this case, if the container width is over 1400 pixels, the maximum tab width will be `20%`, if the container width is between 901 and 1400 pixels - `25%`, etc.

The default configuration value can be viewed in defaultProps of the component [AdaptiveTabs.tsx](/src/components/AdaptiveTabs/AdaptiveTabs.tsx)

### Example

```js
const items = [
  {
    id: 'firstTab',
  },
  {
    id: 'secondTab',
    title: 'Second Tab',
  },
  {
    id: 'thirdTab',
    title: 'Third Tab',
  },
  {
    id: 'disabledTab',
    title: 'This tab is disabled',
    disabled: true,
  },
];

const [activeTab, setActiveTab] = useState('secondTab');

<Tabs items={items} activeTab={activeTab} onSelectTab={(tabId) => setActiveTab(tabId)} />;
```
