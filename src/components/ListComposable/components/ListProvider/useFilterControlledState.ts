import React from 'react';

export const useFilterControlledState = (externalFilterValue?: string) => {
    const [filter, setFilter] = React.useState(() => externalFilterValue ?? '');

    React.useEffect(() => {
        setFilter(externalFilterValue ?? '');
    }, [externalFilterValue]);

    return [filter, setFilter] as const;
};
