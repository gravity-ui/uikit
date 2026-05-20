<!--GITHUB_BLOCK-->

# Disclosure

<!--/GITHUB_BLOCK-->

```tsx
import {Disclosure} from '@gravity-ui/uikit';
```

`Disclosure` is a collapsible component that allows to display and hide its nested content.

<!--GITHUB_BLOCK-->

## Base example

```tsx
<Disclosure summary="Summary">Content</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Controlling expansion state

You can control the expansion state using the `expanded` and `onUpdate` properties.

Controlled component example:

<!--SANDBOX
import {Disclosure} from '@gravity-ui/uikit';

export default function () {
    return (
        <Disclosure summary="Summary" defaultExpanded>
            Content
        </Disclosure>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
function ControlledDisclosure() {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Disclosure summary="Summary" expanded={expanded} onUpdate={setExpanded}>
      Content
    </Disclosure>
  );
}
```

<!--/GITHUB_BLOCK-->

## Size

Use the `size` property to control the `Disclosure` size. The default size is `m`.

<!--SANDBOX
import {Disclosure, Flex} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex gap={4} alignItems="center">
            <Disclosure summary="Middle size" size="m">
                Content
            </Disclosure>
            <Disclosure summary="Large size" size="l">
                Content
            </Disclosure>
            <Disclosure summary="Extra large size" size="xl">
                Content
            </Disclosure>
        </Flex>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Middle size" size="m">
  Content
</Disclosure>
<Disclosure summary="Large size" size="l">
  Content
</Disclosure>
<Disclosure summary="Extra large size" size="xl">
  Content
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Arrow Position

`start`: Arrow is positioned at the start of the header (used by default).

`end`: Arrow is positioned at the end of the header.

<!--SANDBOX
import {Disclosure, Flex} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex gap={4} alignItems="center">
            <Disclosure summary="Summary with start arrow" arrowPosition="start">
                Content
            </Disclosure>
            <Disclosure summary="Summary with end arrow" arrowPosition="end">
                Content
            </Disclosure>
        </Flex>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Summary with start arrow" arrowPosition="start">
  Content
</Disclosure>
<Disclosure summary="Summary with end arrow" arrowPosition="end">
  Content
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Custom content

Use `Disclosure.Summary` component to create a custom header and `Disclosure.Details` to fulfill custom content.

<!--SANDBOX
import {Check} from '@gravity-ui/icons';
import {Button, Disclosure, Flex, Icon} from '@gravity-ui/uikit';

export default function () {
    return (
        <Flex gap={4} alignItems="center">
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
            <Disclosure summary="Summary">
                <Disclosure.Summary>
                    {(_props, defaultButton) => (
                        <Flex gap={4}>
                            {defaultButton}
                            <Icon data={Check} size={14} />
                        </Flex>
                    )}
                </Disclosure.Summary>
                <Disclosure.Details>Custom Details</Disclosure.Details>
            </Disclosure>
        </Flex>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
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

```tsx
<Disclosure>
  <Disclosure.Summary>
    {(_props, defaultButton) => (
      <Flex gap={4}>
        {defaultButton}
        <Icon data={Check} size={14} />
      </Flex>
    )}
  </Disclosure.Summary>
  <Disclosure.Details>Custom Details</Disclosure.Details>
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Disabled state

`Disclosure` can be disabled using the `disabled` property.

<!--SANDBOX
import {Disclosure} from '@gravity-ui/uikit';

export default function () {
    return (
        <Disclosure summary="Summary" disabled>
            Content
        </Disclosure>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Summary" disabled>
  Content
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Properties

### Disclosure

| Name             | Description                                                  | Type                                                  | Default   |
| :--------------- | :----------------------------------------------------------- | :---------------------------------------------------- | :-------- |
| size             | Component size                                               | `"m"` `"l"` `"xl"`                                    | `"m"`     |
| className        | CSS class name of the root element                           | `string`                                              |           |
| disabled         | Disabled state                                               | `boolean`                                             | `false`   |
| defaultExpanded  | Default opening state                                        | `boolean`                                             | `false`   |
| expanded         | Controlled opening state                                     | `boolean`                                             |           |
| arrowPosition    | Control position                                             | `"start"` `"end"`                                     | `"start"` |
| summary          | Content summary                                              | `React.ReactNode`                                     |           |
| keepMounted      | Keep content in DOM even when collapsed                      | `boolean`                                             | `true`    |
| onUpdate         | Callback is fired when the expand/collapse state is changed. | `(expanded: boolean) => void`                         |           |
| onSummaryKeyDown | Callback fires on keyboard events when summary is focused.   | `(e: React.KeyboardEvent<HTMLButtonElement>) => void` |           |
| children         | Content                                                      | `React.ReactNode`                                     |           |
| qa               | Test identifier                                              | `string`                                              |           |

### Disclosure.Summary

| Name     | Description     | Type                                            | Default              |
| :------- | :-------------- | :---------------------------------------------- | :------------------- |
| children | Render function | `(props, defaultSummary) => React.ReactElement` |                      |
| qa       | Test identifier | `string`                                        | `disclosure-summary` |

### Disclosure.Details

| Name     | Description     | Type              | Default              |
| :------- | :-------------- | :---------------- | :------------------- |
| children | Content         | `React.ReactNode` |                      |
| qa       | Test identifier | `string`          | `disclosure-details` |

## CSS API

| Name                                 | Description                                          |
| :----------------------------------- | :--------------------------------------------------- |
| `--g-disclosure-text-color`          | Text color for the content summary                   |
| `--g-disclosure-text-color-disabled` | Text color for the content summary in disabled state |
