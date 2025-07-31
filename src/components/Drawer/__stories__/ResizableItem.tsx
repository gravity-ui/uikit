import * as React from 'react';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';
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
                    open={visible}
                    direction={direction}
                    resizable={resizable}
                    size={width}
                    onResize={setWidth}
                    minSize={300}
                    maxSize={800}
                    qa="drawer"
                    className={b('drawer')}
                    onVeilClick={() => setVisible(false)}
                    contentClassName={b('item', {
                        vertical: ['top', 'bottom'].includes(direction),
                    })}
                >
                    <div className={b('item-content')}>
                        <PlaceholderText />
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
