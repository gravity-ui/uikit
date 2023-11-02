# useConditionallyControlledState

React hook used to create a conditionally controlled state, such state can either be controlled or uncontrolled

## Properties

| Name         | Description                                                      |                                 Type                                  |                        Default                        |
| :----------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------: | :---------------------------------------------------: |
| property     | State value                                                      |                              `StateType`                              |                                                       |
| setProperty  | State setter or callback, which should be called on state change | `Dispatch<SetStateAction<StateType>> or ((value: StateType) => void)` |                                                       |
| initialState | Initial state or state initializer                               |                   `StateType` or `() => StateType`                    |                                                       |
| isControlled | Returns if state should be controlled                            |                            `() => boolean`                            | `property !== undefined && setProperty !== undefined` |

## Result

| Name  | Type                                               | Description            |
| :---- | :------------------------------------------------- | :--------------------- |
| state | `[StateType, Dispatch<SetStateAction<StateType>>]` | State and state setter |

### Examples

```tsx
type ExampleProps = {
    visible?: boolean;
    onVisibleChange?: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
}

function Example({
    visible: providedVisible,
    onVisibleChange
}: ExampleProps) {
  const [visible, setVisible] = useConditionallyControlledState(
      providedVisible,
      onVisibleChange,
      false,
      // controlled only if both properties provided (by default it's so)
      providedVisible !== undefined && onVisibleChange !== undefined
  );

  if (visible) {
      return <span>I'm visible</span>
  }

  return <span style={{ visibility: 'hidden' }}>I'm hidden</span>
}

// This component is controlled
const [visible, setVisible] = useState(false);
<Example visible={visible} onVisibleChange={setVisible} />

// This component is uncontrolled
<Example />

// This component is uncontrolled, but it will be visible on init
<Example visible={true} />

// This component is uncontrolled, but it will call onVisibleChange when visibility changes
<Example onVisibleChange={(visible: boolean) => console.log('visibility changed', visible)}  />
```
