<!--GITHUB_BLOCK-->

# useAsyncActionHandler

<!--/GITHUB_BLOCK-->

```tsx
import {useAsyncActionHandler} from '@gravity-ui/uikit';
```

The `useAsyncActionHandler` hook wraps an asynchronous action handler to add a loading state to it.
Starts the loading process before executing the passed action and terminates the process after executing the action.
Returns the loading state and the wrapped action

## Properties

| Name   | Description    |                    Type                     | Default |
| :----- | :------------- | :-----------------------------------------: | :-----: |
| action | action handler | `(...args: unknown[]) => Promise<unknown>;` |         |

## Result

The array of loading state and action handler

[boolean, typeof action]

Usage:

```tsx
const action = useCallback(() => Promise.resolve(), []);

const [isLoading, handleAction] = useAsyncActionHandler(action);
```

### Examples

Button with automatic loading during click handler execution

```tsx
type ProgressButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<unknown>;
} & Exclude<ButtonProps, 'onClick'>;

export const ProgressButton = (props: ProgressButtonProps) => {
  const {onClick, loading: providedIsLoading} = props;

  const [isLoading, handleClick] = useAsyncActionHandler(onClick);

  return <Button {...props} onClick={handleClick} loading={isLoading || providedIsLoading} />;
};

export const LoadableList = () => {
  const [items, setItems] = useState([]);

  const handleLoadItems = useCallback(async () => {
    try {
      const loadItems = () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              Array.from(
                {length: 10},
                (_item, index) => `Item ${Math.random() * 100 * (index + 1)}`,
              ),
            );
          }, 1000);
        });

      setItems(await loadItems());
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <ProgressButton onClick={handleLoadItems}>Load items</ProgressButton>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
```
