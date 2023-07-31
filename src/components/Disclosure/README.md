## Disclosure

Disclosure component that shows and hides enclosed content.

### PropTypes

| Property        | Type                          | Required | Default | Description                                              |
| :-------------- | :---------------------------- | :------: | :------ | :------------------------------------------------------- | ---------------- | --------------- |
| size            | `'m'                          |   'l'    | 'xl'`   |                                                          | `m`              | Disclosure size |
| className       | `String`                      |          |         | CSS class name of root element                           |
| disabled        | `Boolean`                     |          | `false` | Disabled state                                           |
| defaultExpanded | `Boolean`                     |          | `false` | Default opening state                                    |
| expanded        | `Boolean`                     |          |         | Controlled opening state                                 |
| arrowPosition   | `'left'                       | 'right'` |         | `left`                                                   | Control position |
| summary         | `String`                      |          |         | Content summary                                          |
| keepMounted     | `Boolean`                     |          |         | Keep content in DOM                                      |
| onUpdate        | `(expanded: boolean) => void` |          |         | Callback fired when the expand/collapse state is changed |
| children        | `React.ReactNode`             |          |         | Content                                                  |

### Examples

Base:

```jsx
<Disclosure>Content</Disclosure>
```

With custom summary:

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
