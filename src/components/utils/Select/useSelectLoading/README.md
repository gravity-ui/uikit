# React Hook: useSelectLoading

This React hook provides a way to asynchronously fetch data for a Select component from @gravity-ui/uikit.

## Usage

```javascript
import {useSelectLoading} from './path/to/useSelectLoading';

const ExampleSelect = () => {
  const [data, setData] = useState([]);
  const {options, renderOption} = useSelectLoading({
    options: data, // options for the Select component
    renderOption: (option) => option.content,
    onFetch: () =>
      // function to fetch data asynchronously
      fetch('https://example.com/data').then((resp) => setData([...data, ...resp.data])),
  });

  return <Select options={options} renderOption={renderOption} />;
};
```

### Parameters

- `options` (optional): an array of options to be displayed in the Select component.
- `renderOption` (optional): a function to render options for the Select component. If not provided, the options will be rendered using their `content` property.
- `onFetch` (optional): a function to fetch data asynchronously. If the prop is provided, a loading option will be added to the options list and displayed as the last element. The hook will expect it to return a promise that will resolve when the data is available. This promise will prevent subsequent calls until it resolves.
- `loading` (optional): the boolean flag to display loading indicator permanently (use with `filterOption` conjunction if `filterable` flag was enabled).

> **Note:** If `onFetch` prop is not provided, the loading indicator will not appear. If the `onFetch` prop does not return a promise, it is possible for redundant calls to occur.

### Return Value

- `options`: an array of options to be displayed in the Select component. May include an additional loading option, which is depends on the presence of the `onFetch` prop..
- `renderOption`: a function to render options for the Select component. Wraps the `renderOption` prop to render the loading component.
