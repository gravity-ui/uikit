# React Hook: useInfinityFetch

A custom React hook that facilitates infinite scrolling by fetching data in a paginated manner.

## Usage

```javascript
const MyComponent = () => {
  const {responses, onFetchInitial, onFetchInfinity, isLoadingInitial, isLoadingInfinity} =
    useInfinityFetch({
      fetcher: (pagination) => {
        const {nextPageNumber} = pagination;

        return fetch(`https://api.example.com/data?page=${nextPageNumber}`)
          .then(() => {data: [], pageNumber: 0, pageSize: 100, total: 150});
      },
      getPagination: (lastResp) => {
        const {data, pageNumber, pageSize, total} = lastPage;

        if (pageSize * pageNumber+1 >= total) return null;

        return {nextPageNumber: pageNumber + 1};
      },
    });

  // Use the hook values and functions in your component
};
```

### Parameters

The `useInfinityFetch` hook expects two functions:

- `fetcher`: This function is responsible for fetching the data based on the provided pagination. It takes an optional `pagination` parameter witch is a return value of `getPagination` function and return the `Promise`.

- `getPagination` (optional): This function extracts the pagination information from the last fetched response. It takes the `lastResp` parameter, which is the last received response. It should return the pagination object for the next page or `null` if there is no more data to fetch.

> **Note:** Make sure to implement `getPagination` functions according to your data source and pagination requirements.

### Return Values

The `useInfinityFetch` hook returns an object with the following properties:

- `responses` (Array): An array of fetched responses.
- `onFetchInitial` (Function): A function to fetch the initial data.
- `onFetchInfinity` (Function | undefined): A function to fetch more data for infinite scrolling. Returns `undefined` when no more data is available.
- `isLoadingInitial` (boolean): Indicates whether the initial data is currently being fetched.
- `isLoadingInfinity` (boolean): Indicates whether more data for infinite scrolling is currently being fetched.
