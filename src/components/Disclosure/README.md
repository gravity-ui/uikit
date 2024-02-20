<!--GITHUB_BLOCK-->

## Disclosure &middot; [![storybook](https://img.shields.io/badge/Storybook-Disclosure-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-utils-disclosure--default)

<!--/GITHUB_BLOCK-->

Disclosure component that shows and hides enclosed content.

### PropTypes

| Name            | Type                          | Required | Default | Description                                              |
| :-------------- | :---------------------------- | :------: | :------ | :------------------------------------------------------- |
| size            | `m` `l` `xl`                  |          | `m`     | Disclosure size                                          |
| className       | `String`                      |          |         | CSS class name of root element                           |
| disabled        | `Boolean`                     |          | `false` | Disabled state                                           |
| defaultExpanded | `Boolean`                     |          | `false` | Default opening state                                    |
| expanded        | `Boolean`                     |          |         | Controlled opening state                                 |
| arrowPosition   | `start` `end`                 |          | `left`  | Control position                                         |
| summary         | `React.ReactNode`             |          |         | Content summary                                          |
| keepMounted     | `Boolean`                     |          | `true`  | Keep content in DOM                                      |
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
