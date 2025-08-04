# Color Generator with Customizable Options

## Overview

The color generator story now includes an interactive interface for customizing color generation parameters. Users can adjust lightness and saturation ranges for different intensity levels (light, medium, heavy) and switch between light and dark themes.

## Features

### Color Options Controls

- **Theme Selection**: Switch between Light and Dark themes
- **Intensity Settings**: Configure parameters for each intensity level:
  - **Lightness Range**: Use range sliders to adjust the minimum and maximum lightness values (0-100)
  - **Saturation Range**: Use range sliders to adjust the minimum and maximum saturation values (0-100)
- **Reset to Defaults**: Restore original color settings for the current theme

### Interactive Interface

- Toggle "Show Color Options" to display/hide the color configuration panel
- Real-time preview of color changes as you adjust parameters
- Responsive grid layout for easy parameter adjustment

## Components

### ColorOptionsControls

Main component for managing color generation parameters:

- Range sliders for lightness and saturation values with real-time tooltips
- Theme selector (Light/Dark)
- Reset functionality

### CustomColoredAvatar

Enhanced avatar component that uses custom color options:

- Accepts `colorOptions` prop for custom color generation
- Maintains all original functionality (popover, color info, etc.)

### useCustomColorGenerator

Custom hook that generates colors using provided parameters:

- Accepts `colorOptions` as a parameter
- Generates consistent colors based on seed and intensity
- Uses OKLCH color space for accurate color generation

## Usage

1. Open the useColorGenerator story in Storybook
2. Toggle "Show Color Options" to display the configuration panel
3. Select desired theme (Light or Dark)
4. Adjust lightness and saturation ranges for each intensity level
5. Observe real-time changes in the color grid
6. Use "Reset to Defaults" to restore original settings

## Technical Details

- Colors are generated using OKLCH color space for better perceptual uniformity
- All changes are applied in real-time without page refresh
- Color generation remains consistent for the same seed value
- Range sliders provide intuitive control with tooltips showing current values
- Parameters are validated to ensure min ≤ max for all ranges
