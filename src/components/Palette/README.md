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
    // disable a single item
    {content: '😎', value: 'ID-cool', disabled: true},
    {content: '🥴', value: 'ID-woozy'},
];
// or disable all of them
<UIKit.Palette options={options} disabled={true} />
`}
>
    <UIKit.Palette
        options={[
            // disable a single item
            {content: '😎', value: 'ID-cool', disabled: true},
            {content: '🥴', value: 'ID-woozy'},
        ]}
        disabled={true}
    />
</ExampleBlock>;

LANDING_BLOCK-->
