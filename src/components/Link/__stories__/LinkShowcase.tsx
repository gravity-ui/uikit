import React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseGrid} from '../../../demo/ShowcaseGrid/ShowcaseGrid';
import {Link} from '../Link';

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
                    visitable: [
                        {
                            name: 'Not visitable',
                            value: false,
                        },
                        {
                            name: 'Visitable',
                            value: true,
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
