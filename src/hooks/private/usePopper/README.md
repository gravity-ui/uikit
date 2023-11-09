# usePopper

The `usePopper` hook wrap usePopper props and add few another helpful props

## Properties

| Name        | Description                                     |                  Type                   | Default |
| :---------- | :---------------------------------------------- | :-------------------------------------: | :-----: |
| anchorRef   | Ref-link for anchor element                     |            `React.RefObject`            |         |
| placement   | Popper placement                                | `popper.Placement - popper.Placement[]` |         |
| offset      | Offset modifier                                 |           `[number, number]`            |         |
| modifiers   | Popper modifiers                                |              `Modifier[]`               |         |
| strategy    | Popper position strategy                        |      `popper.PositioningStrategy`       |         |
| altBoundary | Flag for check the reference's boundary context |                `boolean`                |         |

## Result

- attributes
- styles
- setPopperRef
- setArrowRef
