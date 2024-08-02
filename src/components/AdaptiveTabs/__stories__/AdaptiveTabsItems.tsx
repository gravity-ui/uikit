import React from 'react';

import {SquarePlus, SquareXmark} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {AdaptiveTabsProps} from '../AdaptiveTabs';

const buttonAddLabel = 'Add';
const buttonRemoveLabel = 'Remove';

const RenderTitleWithWrap = (props: {title: string | React.ReactNode}) => {
    const {title} = props;
    return (
        <div>
            <Button size="xs" view="flat" extraProps={{'aria-label': buttonAddLabel}}>
                <Icon data={SquarePlus} size="xs" />
            </Button>

            <span
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 'calc(100px - 20px - 20px)', // minus icons width
                    display: 'inline-block',
                    verticalAlign: 'top',
                }}
                title={typeof title === 'string' ? title : undefined}
            >
                {title}
            </span>
            <Button size="xs" extraProps={{'aria-label': buttonRemoveLabel}}>
                <Icon data={SquareXmark} size="xs" />
            </Button>
        </div>
    );
};

export const adaptiveTabsItems: AdaptiveTabsProps<{}>['items'] = [
    {
        id: 'first',
        title: <RenderTitleWithWrap title="First Tab" />,
    },
    {
        id: 'active',
        title: <RenderTitleWithWrap title="Active Tab" />,
    },
    {
        id: 'disabled',
        title: <RenderTitleWithWrap title="Disabled With Long Text Tab" />,
        disabled: true,
    },
    {
        id: 'fourth',
        title: <RenderTitleWithWrap title="Fourth Long Text To Show Tab" />,
    },
    {
        id: 'fifth',
        title: <RenderTitleWithWrap title="One More Long Text Tab To Show" />,
    },
];
