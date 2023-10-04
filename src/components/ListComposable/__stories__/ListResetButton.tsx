import React from 'react';

import {Button} from '../../Button/Button';
import {useListContext} from '../components/ListContext/ListContext';

interface ListResetButtonProps {}

export const ListResetButton = (_props: ListResetButtonProps) => {
    const {setSelected, size, onFilterChange, formatInternalItems} = useListContext();

    const handleClick = () => {
        setSelected(() => ({}));
        onFilterChange('');
        formatInternalItems((initialData) => initialData);
    };

    return (
        <Button width="max" onClick={handleClick} size={size}>
            Reset
        </Button>
    );
};
