<!--GITHUB_BLOCK-->

# Disclosure

<!--/GITHUB_BLOCK-->

```tsx
import {Disclosure} from '@gravity-ui/uikit';
```

The Disclosure component provides a way to show and hide content. It's a simple collapsible component that can be used to create expandable sections, FAQ items, or any other content that needs to be toggled between visible and hidden states.

## Size

Use the `size` property to control the `Disclosure` size. The default size is `m`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Disclosure size="m" summary="Medium Size">
    Content for medium disclosure
</Disclosure>
<Disclosure size="l" summary="Large Size">
    Content for large disclosure
</Disclosure>
<Disclosure size="xl" summary="Extra Large Size">
    Content for extra large disclosure
</Disclosure>
`}>
    <UIKit.Disclosure size="m" summary="Medium Size">
        Content for medium disclosure
    </UIKit.Disclosure>
    <UIKit.Disclosure size="l" summary="Large Size">
        Content for large disclosure
    </UIKit.Disclosure>
    <UIKit.Disclosure size="xl" summary="Extra Large Size">
        Content for extra large disclosure
    </UIKit.Disclosure>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure size="m" summary="Medium Size">
    Content for medium disclosure
</Disclosure>
<Disclosure size="l" summary="Large Size">
    Content for large disclosure
</Disclosure>
<Disclosure size="xl" summary="Extra Large Size">
    Content for extra large disclosure
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Arrow Position

`start`: Arrow is positioned at the start of the summary (used by default).

`end`: Arrow is positioned at the end of the summary.

`left`: Arrow is positioned on the left side.

`right`: Arrow is positioned on the right side.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Disclosure arrowPosition="start" summary="Arrow at Start">
    Content with arrow at the start
</Disclosure>
<Disclosure arrowPosition="end" summary="Arrow at End">
    Content with arrow at the end
</Disclosure>
<Disclosure arrowPosition="left" summary="Arrow on Left">
    Content with arrow on the left
</Disclosure>
<Disclosure arrowPosition="right" summary="Arrow on Right">
    Content with arrow on the right
</Disclosure>
`}>
    <UIKit.Disclosure arrowPosition="start" summary="Arrow at Start">
        Content with arrow at the start
    </UIKit.Disclosure>
    <UIKit.Disclosure arrowPosition="end" summary="Arrow at End">
        Content with arrow at the end
    </UIKit.Disclosure>
    <UIKit.Disclosure arrowPosition="left" summary="Arrow on Left">
        Content with arrow on the left
    </UIKit.Disclosure>
    <UIKit.Disclosure arrowPosition="right" summary="Arrow on Right">
        Content with arrow on the right
    </UIKit.Disclosure>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure arrowPosition="start" summary="Arrow at Start">
    Content with arrow at the start
</Disclosure>
<Disclosure arrowPosition="end" summary="Arrow at End">
    Content with arrow at the end
</Disclosure>
<Disclosure arrowPosition="left" summary="Arrow on Left">
    Content with arrow on the left
</Disclosure>
<Disclosure arrowPosition="right" summary="Arrow on Right">
    Content with arrow on the right
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Controlled State

You can control the disclosure state using the `expanded` and `onUpdate` properties.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
function ControlledDisclosure() {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Disclosure
            expanded={expanded}
            onUpdate={setExpanded}
            summary="Controlled Disclosure"
        >
            This disclosure is controlled by external state
        </Disclosure>
    );
}
`}>
    <UIKit.Disclosure defaultExpanded={false} summary="Controlled Disclosure">
        This disclosure is controlled by external state
    </UIKit.Disclosure>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
function ControlledDisclosure() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Disclosure expanded={expanded} onUpdate={setExpanded} summary="Controlled Disclosure">
      This disclosure is controlled by external state
    </Disclosure>
  );
}
```

<!--/GITHUB_BLOCK-->

## Default Expanded

Use the `defaultExpanded` property to set the initial expanded state.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Disclosure defaultExpanded summary="Expanded by Default">
    This disclosure is expanded by default
</Disclosure>
<Disclosure defaultExpanded={false} summary="Collapsed by Default">
    This disclosure is collapsed by default
</Disclosure>
`}>
    <UIKit.Disclosure defaultExpanded summary="Expanded by Default">
        This disclosure is expanded by default
    </UIKit.Disclosure>
    <UIKit.Disclosure defaultExpanded={false} summary="Collapsed by Default">
        This disclosure is collapsed by default
    </UIKit.Disclosure>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure defaultExpanded summary="Expanded by Default">
    This disclosure is expanded by default
</Disclosure>
<Disclosure defaultExpanded={false} summary="Collapsed by Default">
    This disclosure is collapsed by default
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Custom Summary

Use the `Disclosure.Summary` component to create a custom summary.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Disclosure>
    <Disclosure.Summary>
        {(props) => (
            <Button {...props} view="flat" width="max">
                <Icon data={Settings} size={16} />
                Custom Summary Button
            </Button>
        )}
    </Disclosure.Summary>
    Content with custom summary component
</Disclosure>
`}>
    <UIKit.Disclosure>
        <UIKit.Disclosure.Summary>
            {(props) => (
                <UIKit.Button {...props} view="flat" width="max">
                    Custom Summary Button
                </UIKit.Button>
            )}
        </UIKit.Disclosure.Summary>
        Content with custom summary component
    </UIKit.Disclosure>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure>
  <Disclosure.Summary>
    {(props) => (
      <Button {...props} view="flat" width="max">
        <Icon data={Settings} size={16} />
        Custom Summary Button
      </Button>
    )}
  </Disclosure.Summary>
  Content with custom summary component
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Disabled State

The disclosure can be disabled using the `disabled` property.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Disclosure summary="Active Disclosure">
    This disclosure is active and can be toggled
</Disclosure>
<Disclosure summary="Disabled Disclosure" disabled>
    This disclosure is disabled and cannot be toggled
</Disclosure>
`}>
    <UIKit.Disclosure summary="Active Disclosure">
        This disclosure is active and can be toggled
    </UIKit.Disclosure>
    <UIKit.Disclosure summary="Disabled Disclosure" disabled>
        This disclosure is disabled and cannot be toggled
    </UIKit.Disclosure>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Active Disclosure">
    This disclosure is active and can be toggled
</Disclosure>
<Disclosure summary="Disabled Disclosure" disabled>
    This disclosure is disabled and cannot be toggled
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Keep Mounted

Use the `keepMounted` property to control whether the content stays in the DOM when collapsed.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Disclosure summary="Keep Mounted (default)" keepMounted>
    This content stays in DOM when collapsed
</Disclosure>
<Disclosure summary="Remove from DOM" keepMounted={false}>
    This content is removed from DOM when collapsed
</Disclosure>
`}>
    <UIKit.Disclosure summary="Keep Mounted (default)" keepMounted>
        This content stays in DOM when collapsed
    </UIKit.Disclosure>
    <UIKit.Disclosure summary="Remove from DOM" keepMounted={false}>
        This content is removed from DOM when collapsed
    </UIKit.Disclosure>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Disclosure summary="Keep Mounted (default)" keepMounted>
    This content stays in DOM when collapsed
</Disclosure>
<Disclosure summary="Remove from DOM" keepMounted={false}>
    This content is removed from DOM when collapsed
</Disclosure>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name            | Description                                               |                         Type                          |  Default  |
| :-------------- | :-------------------------------------------------------- | :---------------------------------------------------: | :-------: |
| size            | Disclosure size                                           |                  `"m"` `"l"` `"xl"`                   |   `"m"`   |
| disabled        | Disabled state                                            |                       `boolean`                       |  `false`  |
| defaultExpanded | Default expanded state                                    |                       `boolean`                       |  `false`  |
| expanded        | Controlled expanded state                                 |                       `boolean`                       |           |
| arrowPosition   | Arrow position                                            |         `"left"` `"right"` `"start"` `"end"`          | `"start"` |
| summary         | Summary content                                           |                   `React.ReactNode`                   |           |
| keepMounted     | Keep content in DOM when collapsed                        |                       `boolean`                       |  `true`   |
| onUpdate        | Callback fired when the expand/collapse state is changed  |             `(expanded: boolean) => void`             |           |
| onKeyDown       | Callback fires on keyboard events when summary is focused | `(e: React.KeyboardEvent<HTMLButtonElement>) => void` |           |
| className       | CSS class name                                            |                       `string`                        |           |
| qa              | HTML `data-qa` attribute, used for testing                |                       `string`                        |           |
