import React from 'react';

import type {TocProps} from '../Toc';
import {Toc} from '../Toc';

const testItems: TocProps['items'] = [
    {
        value: 'vm',
        content: 'Virtual machine creation',
    },
    {
        value: 'info',
        content: 'Getting information about a group of virtual machines',
    },
    {
        value: 'disk',
        content: 'Disk',
        items: [
            {
                value: 'control',
                content: 'Disk controls',
            },
            {
                value: 'snapshots',
                content: 'Disk snapshots',
            },
        ],
    },
    {
        value: 'images',
        content: 'Images with preinstalled software',
    },
] as const;

export const TestToc = (props: Partial<TocProps>) => {
    const [active, setActive] = React.useState<string | undefined>(undefined);

    return (
        <Toc
            items={testItems}
            value={active}
            onUpdate={(value: string) => setActive(value)}
            {...props}
        />
    );
};
