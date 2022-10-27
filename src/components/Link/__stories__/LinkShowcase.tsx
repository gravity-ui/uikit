import React from 'react';

import {Link} from '../Link';
import {Showcase} from '../../../demo/Showcase';
import {ShowcaseGrid} from '../../../demo/ShowcaseGrid/ShowcaseGrid';

export function LinkShowcase() {
    return (
        <Showcase title="Link">
            <ShowcaseGrid
                rowKey="href"
                component={Link}
                propsCombinations={{
                    view: [
                        {
                            name: 'View normal',
                            value: 'normal',
                        },
                        {
                            name: 'View primary',
                            value: 'primary',
                        },
                        {
                            name: 'View secondary',
                            value: 'secondary',
                        },
                        {
                            name: 'View normal-visitable',
                            value: 'normal-visitable',
                        },
                    ],
                    href: [
                        {
                            name: 'With href',
                            value: '#',
                        },
                        {
                            name: 'Without href',
                            value: undefined,
                        },
                    ],
                    target: [
                        {
                            name: 'blank',
                            value: '_blank',
                        },
                        {
                            name: 'top',
                            value: '_top',
                        },
                    ],
                }}
                staticProps={{
                    children: 'Link',
                }}
            />
        </Showcase>
    );
}
