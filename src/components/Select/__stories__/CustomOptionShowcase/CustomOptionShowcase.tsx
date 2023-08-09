import React from 'react';

import {Select} from '../../Select';
import type {SelectProps} from '../../types';

import {useSelectRenderOption} from './useSelectRenderOption';

const shortVirtualized = Array.from({length: 100}, (_, i) => `V${i}`).map((value) => ({
    value,
    content: value,
}));

export const CustomOptionShowcase = (args: any) => {
    const [value, setValue] = React.useState<SelectProps['value']>([]);
    const {renderOption} = useSelectRenderOption({
        ...args,
        options: shortVirtualized,
        multiple: true,
        onUpdate: setValue,
    });

    return (
        <div>
            <Select
                options={shortVirtualized}
                renderOption={renderOption}
                value={value}
                onUpdate={setValue}
                multiple
            ></Select>
        </div>
    );
};
