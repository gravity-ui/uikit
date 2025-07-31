import * as React from 'react';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';
import type {DrawerDirection} from '../utils';

import {PlaceholderText} from './mock';

import './DisablePortal.scss';

const b = cn('disable-portal');

export function DisablePortalShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [direction, setDirection] = React.useState<DrawerDirection>('right');
    const [disablePortal, setDisablePortal] = React.useState(true);

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
                <Checkbox
                    content="Disable portal"
                    checked={disablePortal}
                    onUpdate={(v) => setDisablePortal(v)}
                />
            </div>
            <div className={b('container')}>
                <p>Container area for drawer with disablePortal</p>
                <Drawer
                    className={b('drawer')}
                    usePortal={!disablePortal}
                    onVeilClick={() => setVisible(false)}
                    direction={direction}
                    contentClassName={b('item', {vertical: ['top', 'bottom'].includes(direction)})}
                    open={visible}
                >
                    <div className={b('item-content')}>
                        <PlaceholderText />
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
