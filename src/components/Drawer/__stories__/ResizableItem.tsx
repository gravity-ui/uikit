import * as React from 'react';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {cn} from '../../utils/cn';
import {Drawer, DrawerItem} from '../Drawer';
import type {DrawerDirection} from '../utils';

import {PlaceholderText} from './mock';

import './ResizableItem.scss';

const b = cn('resizable-item');

export function ResizableItemShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [direction, setDirection] = React.useState<DrawerDirection>('right');
    const [resizable, setResizable] = React.useState(true);
    const [width, setWidth] = React.useState(400);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" onClick={() => setVisible((v) => !v)}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
                <SegmentedRadioGroup
                    value={direction}
                    options={[
                        {value: 'left', content: 'Left'},
                        {value: 'right', content: 'Right'},
                        {value: 'top', content: 'Top'},
                        {value: 'bottom', content: 'Bottom'},
                    ]}
                    onUpdate={setDirection}
                />
                <Checkbox content="Resizable" checked={resizable} onUpdate={setResizable} />
            </div>
            <div className={b('container')}>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, quidem.</p>
                <Drawer
                    qa="drawer"
                    className={b('drawer')}
                    disablePortal
                    onVeilClick={() => setVisible(false)}
                >
                    <DrawerItem
                        id="item"
                        qa="drawer-item"
                        direction={direction}
                        className={b('item', {
                            vertical: ['top', 'bottom'].includes(direction),
                        })}
                        visible={visible}
                        resizable={resizable}
                        width={width}
                        onResize={setWidth}
                        minResizeWidth={300}
                        maxResizeWidth={800}
                    >
                        <div className={b('item-content')}>
                            <PlaceholderText />
                        </div>
                    </DrawerItem>
                </Drawer>
            </div>
        </div>
    );
}
