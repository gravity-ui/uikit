# unstable_ColorPicker

> The `unstable_ColorPicker` component is an experimental color selection component. The component is unstable,
> so it means breaking changes can occur during minor or patch releases. Be aware of that.

The `unstable_ColorPicker` component allows users to select colors using an interactive color picker interface with HEX/RGB input modes and optional alpha channel support.

The picker displays a color swatch that opens a popup with:

- Saturation and brightness selector
- Hue slider
- Alpha slider (when enabled)
- Color input fields (HEX or RGB modes)

## Basic usage

```jsx
import {unstable_ColorPicker as ColorPicker} from '@gravity-ui/uikit/unstable';

function BasicColorPicker() {
  const [color, setColor] = React.useState('#ff0000');

  return <ColorPicker value={color} onUpdate={(newColor) => setColor(newColor)} />;
}
```

## With alpha channel

The ColorPicker supports alpha transparency when `withAlpha` is enabled. This adds a transparency slider and switches to HEXA/RGBA color formats:

```jsx
import {unstable_ColorPicker as ColorPicker} from '@gravity-ui/uikit/unstable';

function ColorPickerWithAlpha() {
  const [color, setColor] = React.useState('#ff0000ff');

  return <ColorPicker value={color} onUpdate={(newColor) => setColor(newColor)} withAlpha={true} />;
}
```

## Compact mode

For space-constrained layouts, you can render only the color swatch without displaying the color value text:

```jsx
import {unstable_ColorPicker as ColorPicker} from '@gravity-ui/uikit/unstable';

function CompactColorPicker() {
  return (
    <ColorPicker
      defaultValue="#00ff00"
      compact={true}
      onUpdate={(newColor) => console.log('New color:', newColor)}
    />
  );
}
```

## Controlled and uncontrolled states

The ColorPicker supports both controlled and uncontrolled usage patterns:

```jsx
// Uncontrolled
<ColorPicker
  defaultValue="#ffbe5c"
  onUpdate={(color) => console.log('Color changed:', color)}
/>

// Controlled
<ColorPicker
  value={color}
  onUpdate={setColor}
/>
```

You can also control the open state of the picker popup:

```jsx
// Controlled open state
<ColorPicker value={color} open={isOpen} onOpenChange={setIsOpen} onUpdate={setColor} />
```

## Properties

| Name         | Description                                                              |           Type            |   Default   |
| :----------- | :----------------------------------------------------------------------- | :-----------------------: | :---------: |
| size         | The `unstable_ColorPicker` size                                          | `"s"` `"m"` `"l"` `"xl"`  |    `"m"`    |
| value        | Color value for controlled state (HEX or HEXA string)                    |         `string`          |             |
| defaultValue | Default color value for uncontrolled state                               |         `string`          | `"#000000"` |
| onUpdate     | Callback when user updates the color. Receives a HEX(A) string.          | `(value: string) => void` |             |
| open         | Controlled state for popup open/close                                    |         `boolean`         |             |
| defaultOpen  | Default state for popup open/close                                       |         `boolean`         |   `false`   |
| onOpenChange | Callback for popup open/close state change                               | `(open: boolean) => void` |             |
| withAlpha    | Enables alpha channel support for HEXA/RGBA mode and transparency slider |         `boolean`         |   `false`   |
| compact      | Renders only the picker button without displaying the color value text   |         `boolean`         |   `false`   |

## Color formats

The ColorPicker always returns color values in HEX format:

- When `withAlpha={false}`: Returns 6-digit HEX (e.g., `#ff0000`)
- When `withAlpha={true}`: Returns 8-digit HEXA (e.g., `#ff0000ff`)

Inside the picker popup, users can switch between HEX and RGB input modes to enter colors in their preferred format.
