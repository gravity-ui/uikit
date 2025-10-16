## Disclosure

This is the disclosure component that shows and hides enclosed content.

### PropTypes

| Name             | Type                                                  | Required | Default | Description                                                 |
| :--------------- | :---------------------------------------------------- | :------: | :------ | :---------------------------------------------------------- |
| size             | `m` `l` `xl`                                          |          | `m`     | Disclosure size                                             |
| className        | `String`                                              |          |         | CSS class name of the root element                          |
| disabled         | `Boolean`                                             |          | `false` | Disabled state                                              |
| defaultExpanded  | `Boolean`                                             |          | `false` | Default opening state                                       |
| expanded         | `Boolean`                                             |          |         | Controlled opening state                                    |
| arrowPosition    | `start` `end`                                         |          | `left`  | Control position                                            |
| summary          | `React.ReactNode`                                     |          |         | Content summary                                             |
| keepMounted      | `Boolean`                                             |          | `true`  | Keep content in DOM                                         |
| onUpdate         | `(expanded: boolean) => void`                         |          |         | Callback is fired when the expand/collapse state is changed |
| onSummaryKeyDown | `(e: React.KeyboardEvent<HTMLButtonElement>) => void` |          |         | Callback fires on keyboard events when summary is focused   |
| children         | `React.ReactNode`                                     |          |         | Content                                                     |
| qa               | `String`                                              |          |         | Test identifier                                             |

### Disclosure.Summary PropTypes

| Name     | Type                                            | Required | Default              | Description     |
| :------- | :---------------------------------------------- | :------: | :------------------- | :-------------- |
| children | `(props, defaultSummary) => React.ReactElement` |   Yes    |                      | Render function |
| qa       | `String`                                        |          | `disclosure-summary` | Test identifier |

### Disclosure.Details PropTypes

| Name     | Type              | Required | Default              | Description     |
| :------- | :---------------- | :------: | :------------------- | :-------------- |
| children | `React.ReactNode` |   Yes    |                      | Content         |
| qa       | `String`          |          | `disclosure-details` | Test identifier |

### Examples

Basic example:

```jsx
<Disclosure summary="summary">Content</Disclosure>
```

Example with a custom summary:

```jsx
<Disclosure>
  <Disclosure.Summary>
    {(props) => (
      <Button {...props}>
        <Icon data={Check} size={14} />
        Custom summary
        <Icon data={Check} size={14} />
      </Button>
    )}
  </Disclosure.Summary>
  <div>Custom details</div>
  <div>More custom details</div>
</Disclosure>
```

```jsx
<Disclosure>
  <Disclosure.Summary>
    {(_props, defaultButton) => (
      <Flex gap={4}>
        {defaultButton}
        <Icon data={Check} size={14} />
      </Flex>
    )}
  </Disclosure.Summary>
  Details
</Disclosure>
```

## CSS API

| Name                                 | Description                                 |
| :----------------------------------- | :------------------------------------------ |
| `--g-disclosure-text-color`          | Text color for the summary trigger          |
| `--g-disclosure-text-color-disabled` | Text color for the disabled summary trigger |
