The `useSelectOptions` hook that helps to manage options data before passing into `Select` component. It could be handy in case of options management outside the component.

## Properties

| Name         | Description                                                              |                  Type                   | Default |
| :----------- | :----------------------------------------------------------------------- | :-------------------------------------: | :-----: |
| options      | [Select options](https://gravity-ui.com/components/uikit/select#options) | `(SelectOption \| SelectOptionGroup)[]` |         |
| filter       | Value to filter options. Used with `filterable: true` only               |          `string \| undefined`          |         |
| filterable   | Indicates that `filter` and `filterOption` properties can be used        |         `boolean \| undefined`          |         |
| filterOption | Used to compare option with filter                                       |         `function \| undefined`         |         |

## Result

`useSelectOptions` returns prepared `Select` options.
