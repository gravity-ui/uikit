import React from 'react';

import {ArrowsRotateRight} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../../Button';
import {Dialog as DialogComponent} from '../../Dialog';
import {Icon} from '../../Icon';
import {Loader} from '../../Loader';
import {Table as TableComponent} from '../../Table';
import {Box, Flex} from '../../layout';
import {block} from '../../utils/cn';
import {Overlay} from '../Overlay';
import type {OverlayProps} from '../Overlay';

import {columns, data} from './data';
import type {DataItem} from './data';

import './OverlayShowcase.scss';

const b = block('overlay-showcase');

type Story = StoryObj<typeof Overlay>;

export default {
    title: 'Components/Utils/Overlay',
    component: Overlay,
} as Meta;

export const Default: Story = {
    args: {
        visible: true,
    },
    render: (args) => {
        return (
            <div className={b()}>
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
            </div>
        );
    },
};

export const Background: Story = {
    args: {
        visible: true,
    },
    render: (args) => {
        return (
            <div className={b()}>
                <Box position="relative" className={b('content')}>
                    <div>I am an example</div>
                    <div>content</div>
                    <Overlay {...args} background="base" />
                </Box>
                <span style={{margin: '16px'}} />
                <Box position="relative" className={b('content')}>
                    <div>I am an example</div>
                    <div>content</div>
                    <Overlay {...args} background="float" />
                </Box>
            </div>
        );
    },
};

export const DialogTemplate: Story = {
    args: {
        visible: true,
    },
    render: (args) => {
        const dialogTitleId = 'app-dialog-title';
        return (
            <DialogComponent
                open
                onClose={() => {}}
                onEnterKeyDown={() => {
                    alert('onEnterKeyDown');
                }}
                aria-labelledby={dialogTitleId}
            >
                <DialogComponent.Header caption="Caption" id={dialogTitleId} />
                <DialogComponent.Body>
                    <Box position="relative" width={480} height={212}>
                        <Flex direction="column" gap={2}>
                            Some text to show in dialog body
                            <Button>Some interaction</Button>
                        </Flex>
                        <Overlay {...args}>
                            <Flex direction="column" centerContent>
                                <Loader size="m" />
                                <Box style={{textAlign: 'center'}} spacing={{mt: 3}}>
                                    Loading text about process with long description to show
                                    <br /> max content-width
                                </Box>
                            </Flex>
                        </Overlay>
                    </Box>
                </DialogComponent.Body>
                <DialogComponent.Footer
                    onClickButtonApply={() => alert('onApply')}
                    textButtonApply="Apply"
                />
            </DialogComponent>
        );
    },
};

const TableShowcase = (args: OverlayProps) => {
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
    render: TableShowcase,
};
