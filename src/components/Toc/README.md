<!--GITHUB_BLOCK-->

# Toc

<!--/GITHUB_BLOCK-->

```tsx
import {Toc} from '@gravity-ui/uikit';
```

The `Toc` component is designed to display a table of contents of the page, namely showing a set items with two levels of hierarchy.

## Usage

You can use `Toc` in two ways:

1. With items as links.
2. With items as clickable buttons.

To use the first option, provide the appropriate link to each `Toc` item through the `href` property. You will still be able to use a click handler to control the active `Toc` element.

If you skip this, the component will use the other option.

## Properties

| Name      | Description                                                            |    Type     | Default |
| :-------- | :--------------------------------------------------------------------- | :---------: | :-----: |
| className | CSS class                                                              |  `string`   |         |
| items     | TOC elements                                                           | `TocItem[]` |         |
| value     | Current active item                                                    |  `string`   |         |
| onUpdate  | Item click handler                                                     | `Function`  |         |
| qa        | The value to provide to the `data-qa` attribute of the `Toc` container |  `string`   |         |

#### TocItem

| Name    | Description                                                                              |        Type         | Default |
| :------ | :--------------------------------------------------------------------------------------- | :-----------------: | :-----: |
| value   | Item value                                                                               |      `string`       |         |
| content | Item content to display                                                                  | `React.ReactNode[]` |         |
| href    | The `href` property of the `<a>` element, to which an item will be converted if provided |      `string`       |         |
| items   | Child items                                                                              |     `TocItem[]`     |         |
