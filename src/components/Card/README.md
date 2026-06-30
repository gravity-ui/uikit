<!--GITHUB_BLOCK-->

# Card

<!--/GITHUB_BLOCK-->

```tsx
import {Card} from '@gravity-ui/uikit';
```

## Description

`Card` is a reusable React component that basically is a card-like container with customizable styles and features. It is used to display information or content in a visually appealing and well-organized manner.

## Appearance

`Card` can be displayed with multiple style combinations:

- `theme`: `normal`, `info`, `success`, `warning`, `danger`, or `utility`.
- `type`: `selection`, `action`, or `container`.
- `view`:`outlined` or `clear`, or `outlined`, `filled`, or `raised` (depending on the `type` parameter).

## Theme

This parameter is used to specify the card's theme style. It determines the card's color scheme and appearance.

By specifying different theme values, you can customize the `Card` visual appearance to match your purpose and the style you need.

- `normal`: Normal/default theme of the card.
- `info`: Theme for displaying neutral information.
- `success`: Theme for displaying positive or affirmative content.
- `warning`: Theme for displaying warnings.
- `danger`: Theme for displaying the content related to critical issues or errors.
- `utility`: Theme for displaying useful tips.

<!--SANDBOX
import {Card} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const cardStyle: CSSProperties = {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '10px',
};

export default function () {
    return (
        <div style={gridStyle}>
            <Card style={cardStyle} theme="normal" size="l">
                Normal
            </Card>
            <Card style={cardStyle} theme="info" size="l">
                Info
            </Card>
            <Card style={cardStyle} theme="success" size="l">
                Success
            </Card>
            <Card style={cardStyle} theme="warning" size="l">
                Warning
            </Card>
            <Card style={cardStyle} theme="danger" size="l">
                Danger
            </Card>
            <Card style={cardStyle} theme="utility" size="l">
                Utility
            </Card>
        </div>
    );
}
SANDBOX-->

## Type

This parameter is used to define the type of the `Card` component. It allows you to customize the appearance and behavior of the card.

- `container`: Card that acts as a container for other elements. It provides a structured layout for content.
- `action`: Card with an interactive element, such as a button, that triggers an action when clicked.
- `selection`: Card that can be selected or clicked to perform a specific action.

<!--SANDBOX
import {Card} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const cardStyle: CSSProperties = {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '10px',
};

export default function () {
    return (
        <div style={gridStyle}>
            <Card style={cardStyle} view="outlined" type="container" size="l">
                Container
            </Card>
            <Card
                style={cardStyle}
                view="outlined"
                type="action"
                onClick={() => alert(':wave: hey')}
                size="l"
            >
                action with onClick
            </Card>
            <Card style={cardStyle} view="outlined" type="selection" size="l">
                Selection
            </Card>
        </div>
    );
}
SANDBOX-->

## View

This parameter is used to specify the `Card` view or layout style. It allows you to customize the appearance and arrangement of the card content.

- `clear`: No style.
- `outlined`: Applies a thin border to highlight the card content.
- `filled`: Fills in the card content.
- `raised`: Applies a shadow to slightly lift the container.

<!--SANDBOX
import {Card} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const cardStyle: CSSProperties = {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '10px',
};

export default function () {
    return (
        <div style={gridStyle}>
            <Card style={cardStyle} view="clear" type="container" size="l">
                Clear
            </Card>
            <Card style={cardStyle} view="outlined" type="container" size="l">
                Outlined
            </Card>
            <Card style={cardStyle} view="filled" type="container" size="l">
                Filled
            </Card>
            <Card style={cardStyle} view="raised" type="container" size="l">
                Raised
            </Card>
        </div>
    );
}
SANDBOX-->

## Properties

| Name      | Description                                                                                       |    Type     |    Default    |
| :-------- | :------------------------------------------------------------------------------------------------ | :---------: | :-----------: |
| children  | Card content                                                                                      | `ReactNode` |               |
| type      | The `Card` type determines which properties are available.                                        |  `string`   | `"container"` |
| view      | This property is only available for the `"container"` and `"selection"` `type`s.                  |  `string`   | `"outlined"`  |
| theme     | Card's base color. This property is only available for the `"container"` `type`.                  |  `string`   |  `"normal"`   |
| size      | The `Card` size determines which properties are available.                                        |  `string`   |     `"m"`     |
| className | CSS class                                                                                         |  `string`   |               |
| onClick   | Card click handler. This property is only available for the `"selection"` and `"action"` `type`s. | `Function`  |               |
| selected  | Selected card. This property is only available for the `"selection"` `type`.                      |  `Boolean`  |               |
| disabled  | Disabled card. This property is only available for the `"selection"` and `"action"` `type`s.      |  `Boolean`  |               |
| qa        | `data-qa` HTML attribute, used for testing                                                        |  `string`   |               |

## CSS API

| Name                        | Description      |
| :-------------------------- | :--------------- |
| `--g-card-background-color` | Background color |
| `--g-card-border-width`     | Border width     |
| `--g-card-border-color`     | Border color     |
| `--g-card-border-radius`    | Border radius    |
| `--g-card-box-shadow`       | Shadow           |
