### ListContainerView

The default container for all custom lists. Contains all html attributes and styles for quick use in your projects.

#### Props:

| Name        | Description                                                                                                  |         Type          | Default |
| :---------- | :----------------------------------------------------------------------------------------------------------- | :-------------------: | :-----: |
| id          | Optional id attribute                                                                                        |       `string`        |         |
| style       | Inline styles if needed                                                                                      | `React.CSSProperties` |         |
| className   | Custom class name to mix with                                                                                |       `string`        |         |
| fixedHeight | Removes default `overflow: auto` from container and set fixed container height (`--g-list-height` = `300px`) |       `boolean`       |         |

#### Usage example:

```tsx
const containerRef = React.useRef<HTMLDivElement>(null);

<ListContainerView ref={containerRef} fixedHeight>
  <ListItemView content={{title: '123'}} id="1" />
  <ListItemView content={{title: '456'}} id="2" />
</ListContainerView>;
```
