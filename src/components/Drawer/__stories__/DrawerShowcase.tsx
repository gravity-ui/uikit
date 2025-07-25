import * as React from 'react';

import {Button} from '../../Button';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {cn} from '../../utils/cn';
import type {DrawerItemProps} from '../Drawer';
import {Drawer, DrawerItem} from '../Drawer';

import './DrawerShowcase.scss';

const b = cn('drawer-showcase');

export function DrawerShowcase() {
    const [visible1, setVisible1] = React.useState<boolean>(true);
    const [visible2, setVisible2] = React.useState<boolean>(false);

    const [direction1, setDirection1] = React.useState<string>('left');
    const [direction2, setDirection2] = React.useState<string>('left');

    const [keepMountedGlobal, setKeepMountedGlobal] = React.useState<boolean>(true);
    const [keepMounted1, setKeepMounted1] = React.useState<boolean>(true);

    const hideAll = React.useCallback(() => {
        setVisible1(false);
        setVisible2(false);
    }, []);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" size="l" onClick={() => setVisible1(!visible1)}>
                    {visible1 ? 'Hide 1' : 'Show 1'}
                </Button>
                &nbsp;&nbsp;
                <Button view="action" size="l" onClick={() => setVisible2(!visible2)}>
                    {visible2 ? 'Hide 2' : 'Show 2'}
                </Button>
                &nbsp;&nbsp; Direction: &nbsp;
                <SegmentedRadioGroup value={direction1} onUpdate={setDirection1}>
                    <SegmentedRadioGroup.Option value="left">Left</SegmentedRadioGroup.Option>
                    <SegmentedRadioGroup.Option value="right">Right</SegmentedRadioGroup.Option>
                    <SegmentedRadioGroup.Option value="top">Top</SegmentedRadioGroup.Option>
                    <SegmentedRadioGroup.Option value="bottom">Bottom</SegmentedRadioGroup.Option>
                </SegmentedRadioGroup>
                &nbsp;&nbsp; Direction2: &nbsp;
                <SegmentedRadioGroup value={direction2} onUpdate={setDirection2}>
                    <SegmentedRadioGroup.Option value="left">Left</SegmentedRadioGroup.Option>
                    <SegmentedRadioGroup.Option value="right">Right</SegmentedRadioGroup.Option>
                    <SegmentedRadioGroup.Option value="top">Top</SegmentedRadioGroup.Option>
                    <SegmentedRadioGroup.Option value="bottom">Bottom</SegmentedRadioGroup.Option>
                </SegmentedRadioGroup>
                <br /> Keep Mounted Drawer: &nbsp;
                <Button
                    view="action"
                    size="l"
                    onClick={() => setKeepMountedGlobal(!keepMountedGlobal)}
                >
                    {keepMountedGlobal ? 'On' : 'Off'}
                </Button>
                &nbsp;&nbsp; Keep Mounted 1: &nbsp;
                <Button
                    disabled={!keepMountedGlobal}
                    view="action"
                    size="l"
                    onClick={() => setKeepMounted1(!keepMounted1)}
                >
                    {keepMounted1 ? 'On' : 'Off'}
                </Button>
            </div>
            <Drawer
                className={b('drawer')}
                onVeilClick={hideAll}
                onEscape={hideAll}
                keepMounted={keepMountedGlobal}
            >
                <DrawerItem
                    keepMounted={keepMounted1}
                    visible={visible1}
                    id="item-1"
                    className={b('item-1', {vertical: ['top', 'bottom'].includes(direction1)})}
                    direction={direction1 as DrawerItemProps['direction']}
                />
                <DrawerItem
                    visible={visible2}
                    id="item-2"
                    className={b('item-2', {vertical: ['top', 'bottom'].includes(direction2)})}
                    content=""
                    direction={direction2 as DrawerItemProps['direction']}
                />
            </Drawer>
        </div>
    );
}
