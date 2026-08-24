import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';
import type {DrawerPlacement} from '../hooks/useResizeHandlers';

import './Resizable.scss';

const b = cn('resizable-showcase');
const mockText = faker.lorem.sentences(10);

export function ResizableDrawerShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [resizable, setResizable] = React.useState(true);
    const [placement, setPlacement] = React.useState<DrawerPlacement>('right');
    const [size, setSize] = React.useState(500);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" onClick={() => setVisible((v) => !v)}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
                <SegmentedRadioGroup
                    value={placement}
                    options={[
                        {value: 'left', content: 'Left'},
                        {value: 'right', content: 'Right'},
                        {value: 'top', content: 'Top'},
                        {value: 'bottom', content: 'Bottom'},
                    ]}
                    onUpdate={setPlacement}
                />
                <Checkbox content="Resizable" checked={resizable} onUpdate={setResizable} />
            </div>
            <div className={b('container')}>
                <Drawer
                    open={visible}
                    placement={placement}
                    onOpenChange={setVisible}
                    resizable={resizable}
                    className={b('drawer', {placement, resizable})}
                    size={resizable ? size : undefined}
                    onResize={setSize}
                >
                    <div className={b('item-content')}>{mockText}</div>
                </Drawer>
            </div>
        </div>
    );
}
