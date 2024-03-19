<!--GITHUB_BLOCK-->

# Palette

<!--/GITHUB_BLOCK-->

```tsx
import {Palette} from '@gravity-ui/uikit';
```

The `Palette` component is used display a grid of icons/emojis/reactions/symbols which you can select or unselect.

### Disabled state

You can disable every option with the `disabled` property. If you want to disable only a portion of options, you can change the `disabled` property of some of the `options` (`PaletteOption[]`).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const options: UIKit.PaletteOption[] = [
    {content: 'A', value: 'ID-cool', disabled: true},
    {content: 'B', value: 'ID-woozy'},
];
<UIKit.Palette options={options} disabled={true} />
`}
>
    <UIKit.Palette
        options={[
            {content: 'A', value: 'ID-cool', disabled: true},
            {content: 'B', value: 'ID-woozy'},
        ]}
        disabled={true}
    />
</ExampleBlock>

<ExampleBlock
    code={`
const options: UIKit.PaletteOption[] = [
    {content: '😎', value: 'ID-cool', disabled: true},
    {content: '🥴', value: 'ID-woozy'},
];
<UIKit.Palette options={options} disabled={true} />
`}
>
    <UIKit.Palette
        options={[
            {content: '😎', value: 'ID-cool', disabled: true},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        disabled={true}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!-- <ExampleBlock
    code={\`
<Alert title="Filled" message="Filled view" view="filled" />
<Alert title="Outlined" message="Outlined theme" view="outlined" />
\`}
>
    <UIKit.Alert title="Filled" message="Filled view" view="filled" />
    <UIKit.Alert title="Outlined" message="Outlined theme" view="outlined" />
</ExampleBlock> -->
