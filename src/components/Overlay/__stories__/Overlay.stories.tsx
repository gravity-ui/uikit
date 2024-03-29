import React from 'react';

import {ArrowsRotateRight} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Dialog as DialogComponent} from '../../Dialog';
import {Icon} from '../../Icon';
import {Loader} from '../../Loader';
import {Table as TableComponent} from '../../Table';
import {block} from '../../utils/cn';
import {Overlay} from '../Overlay';
import type {OverlayProps} from '../Overlay';

import {columns, data} from './utils';
import type {DataItem} from './utils';

import './Overlay.scss';

const b = block('overlay-showcase');

export default {
    title: 'Components/Overlays/Overlay',
    component: Overlay,
} as Meta;

const DefaultTemplate: StoryFn<OverlayProps> = (args) => {
    return (
        <div className={b()}>
            <div className={b('content')}>
                <div>Example of overlay</div>
                <div>with loader</div>
                <Overlay {...args}>
                    <Loader />
                </Overlay>
            </div>
            <div className={b('content')}>
                <div>Example of overlay</div>
                <div>with text</div>
                <Overlay {...args}>Loading...</Overlay>
            </div>
            <div className={b('content')}>
                <div>Example of overlay</div>
                <div>with icon</div>
                <Overlay {...args}>
                    <Icon data={ArrowsRotateRight} />
                </Overlay>
            </div>
            <div className={b('content')}>
                <div>Example of overlay</div>
                <div>without children</div>
                <Overlay {...args} />
            </div>
        </div>
    );
};
export const Default = DefaultTemplate.bind({});

Default.args = {
    visible: true,
};

const BackgroundTemplate: StoryFn<OverlayProps> = (args) => {
    return (
        <div className={b()}>
            <div className={b('content')}>
                <div>I am an example</div>
                <div>content</div>
                <Overlay {...args} view="base" />
            </div>
            <span style={{margin: '16px'}} />
            <div className={b('content')}>
                <div>I am an example</div>
                <div>content</div>
                <Overlay {...args} view="float" />
            </div>
        </div>
    );
};

export const Background = BackgroundTemplate.bind({});

Background.args = {
    visible: true,
};

const DialogTemplate: StoryFn<OverlayProps> = (args) => {
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
            <div className={b('content')}>
                <DialogComponent.Header caption="Caption" id={dialogTitleId} />
                <DialogComponent.Body>Dialog.Body</DialogComponent.Body>
                <DialogComponent.Footer
                    onClickButtonApply={() => alert('onApply')}
                    textButtonApply="Apply"
                />
                <Overlay {...args}>
                    <Loader size="m" />
                </Overlay>
            </div>
        </DialogComponent>
    );
};

export const Dialog = DialogTemplate.bind({});

Dialog.args = {
    visible: true,
};

const TableTemplate: StoryFn<OverlayProps> = (args) => {
    const [loading, setLoading] = React.useState(false);
    const [loadedData, setData] = React.useState<DataItem[]>([]);

    return (
        <div className={b()}>
            <div className={b('content')}>
                <TableComponent className={b('table')} columns={columns} data={loadedData} />
                <Overlay {...args} visible={loading}>
                    <Loader size="m" />
                </Overlay>
            </div>
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

export const Table = TableTemplate.bind({});
