<!--GITHUB_BLOCK-->

# Toc

<!--/GITHUB_BLOCK-->

```tsx
import {Toc} from '@gravity-ui/uikit';
```

## Description

The `Toc` UI component is a component designed to represent table of contents of the page, displaying a set items with two levels of hierarchy.

## Usage

You can use `Toc` in two ways:

1. Items are links
2. Items are clickable buttons

To use the first method, pass the corresponding link to each item of the `Toc` via `href` property. You will still be able to use a click handler to control active element of the `Toc`.

If you don't do this, the component will work in the second way.

## Properties

| Name      | Description                                                          |    Type     | Default |
| :-------- | :------------------------------------------------------------------- | :---------: | :-----: |
| className | CSS class                                                            |  `string`   |         |
| items     | Elements of the table of contents                                    | `TocItem[]` |         |
| value     | Current active item                                                  |  `string`   |         |
| onUpdate  | Item click handler                                                   | `Function`  |         |
| qa        | The value to be passed to `data-qa` attribute of the `Toc` container |  `string`   |         |
