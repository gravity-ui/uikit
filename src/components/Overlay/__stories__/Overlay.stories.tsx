import * as React from 'react';

import {ArrowsRotateRight} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Loader} from '../../Loader';
import {Table as TableComponent} from '../../Table';
import {Box} from '../../layout';
import {block} from '../../utils/cn';
import {Overlay} from '../Overlay';
import type {OverlayProps} from '../Overlay';

import {columns, data} from './data';
import type {DataItem} from './data';

import './Overlay.stories.scss';

const b = block('overlay-stories');

type Story = StoryObj<typeof Overlay>;

export default {
    title: 'Components/Feedback/Overlay',
    component: Overlay,
} as Meta;

export const Default: Story = {
    args: {
        visible: true,
    },
    render: (args) => {
        return (
            <Showcase>
                <Box position="relative" className={b('content')}>
                    <div>Example of overlay</div>
                    <div>with loader</div>
                    <Overlay {...args}>
                        <Loader size="m" />
                    </Overlay>
                </Box>
                <Box position="relative" className={b('content')}>
                    <div>Example of overlay</div>
                    <div>with text</div>
                    <Overlay {...args}>Loading...</Overlay>
                </Box>
                <Box position="relative" className={b('content')}>
                    <div>Example of overlay</div>
                    <div>with icon</div>
                    <Overlay {...args}>
                        <Icon data={ArrowsRotateRight} />
                    </Overlay>
                </Box>
                <Box position="relative" className={b('content')}>
                    <div>Example of overlay</div>
                    <div>without children</div>
                    <Overlay {...args} />
                </Box>
            </Showcase>
        );
    },
};

export const Background: Story = {
    args: {
        visible: true,
    },
    render: (args) => {
        return (
            <Showcase>
                <ShowcaseItem title="base">
                    <Box position="relative" className={b('content')}>
                        <div>I am an example</div>
                        <div>content</div>
                        <Overlay {...args} background="base" />
                    </Box>
                </ShowcaseItem>
                <ShowcaseItem title="float">
                    <Box position="relative" className={b('content')}>
                        <div>I am an example</div>
                        <div>content</div>
                        <Overlay {...args} background="float" />
                    </Box>
                </ShowcaseItem>
            </Showcase>
        );
    },
};

const TableView = (args: OverlayProps) => {
    const [loading, setLoading] = React.useState(false);
    const [loadedData, setData] = React.useState<DataItem[]>([]);

    return (
        <div className={b()}>
            <Box position="relative" className={b('content')}>
                <TableComponent className={b('table')} columns={columns} data={loadedData} />
                <Overlay {...args} visible={loading}>
                    <Loader size="m" />
                </Overlay>
            </Box>
            <Button
                className={b('button')}
                disabled={loading}
                onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setData(data);
                    }, 1000);
                }}
            >
                Load data
            </Button>
            <Button className={b('button')} disabled={loading} onClick={() => setData([])}>
                Clear data
            </Button>
        </div>
    );
};

export const Table: Story = {
    args: {},
    render: TableView,
};
