# ColorPicker Component

A versatile color picker component that supports multiple color formats including HEX, RGB, and RGBA.

## Features

- **Multiple Color Formats**: Support for HEX, RGB, and RGBA color formats
- **Alpha Channel Support**: Optional transparency control
- **Format Switching**: Easily switch between different color formats
- **Input Validation**: Validates and sanitizes color inputs
- **Extensible**: Built with extensibility in mind for adding more color formats
- **Modular Structure**: Well-organized component structure for easy maintenance and extension

## Component Structure

The ColorPicker component is organized into several sub-components:

- **ColorPicker**: The main component that orchestrates all the sub-components
- **ColorDisplay**: Displays the current color with optional alpha channel
- **ColorInput**: Handles color input in different formats (HEX, RGB, RGBA)
- **AlphaInput**: Controls the alpha channel value
- **Picker**: Renders the appropriate color picker based on the selected mode

## Usage

```tsx
import {ColorPicker} from 'path/to/ColorPicker';

function MyComponent() {
  const [color, setColor] = React.useState('#5282ff');

  return <ColorPicker color={color} onChange={setColor} withAlpha={true} mode="HEX" />;
}
```

## Props

| Prop        | Type                    | Default   | Description                          |
| ----------- | ----------------------- | --------- | ------------------------------------ |
| `color`     | string                  | '#5282ff' | The current color value              |
| `onChange`  | (color: string) => void | -         | Callback function when color changes |
| `className` | string                  | -         | Additional CSS class name            |
| `withAlpha` | boolean                 | true      | Whether to enable alpha channel      |
| `mode`      | 'HEX' \| 'RGB'          | 'HEX'     | The color format mode                |

## Color Format Support

The component supports the following color formats:

- **HEX**: Hexadecimal color format (e.g., '#5282ff' or '#5282ff80' with alpha)
- **RGB**: RGB color format (e.g., 'rgb(82, 130, 255)')
- **RGBA**: RGBA color format with alpha channel (e.g., 'rgba(82, 130, 255, 0.5)')

## Implementation Details

The component uses the following libraries:

- [react-colorful](https://github.com/omgovich/react-colorful) for the color picker UI
- Custom utility functions for color format conversion and validation

## Extending the Component

To add support for additional color formats:

1. Add the new format to the `ColorPickerMode` enum in `types.ts`
2. Implement conversion functions in the `utils.ts` file
3. Update the `Picker` component to handle the new format
4. Add format-specific validation and parsing logic

## Example: Adding HSL Support

```tsx
// 1. Add to ColorPickerMode enum in types.ts
enum ColorPickerMode {
  HEX = 'HEX',
  RGB = 'RGB',
  HSL = 'HSL', // New format
}

// 2. Add conversion functions to utils.ts
export const hexToHsl = (hex: HexColor): HslColor => {
  // Implementation
};

export const hslToHex = (hsl: HslColor): HexColor => {
  // Implementation
};

// 3. Update the Picker component to handle HSL
// 4. Add format-specific validation
```
