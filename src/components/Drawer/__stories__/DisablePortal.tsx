import * as React from 'react';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';
import type {DrawerDirection} from '../hooks/useResizeHandlers';

import {PlaceholderText} from './mock';

import './DisablePortal.scss';

const b = cn('disable-portal');

export function DisablePortalShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [direction, setDirection] = React.useState<DrawerDirection>('right');
    const [disablePortal, setDisablePortal] = React.useState(true);
    const [placeholderCount, setPlaceholderCount] = React.useState(1);
    const containerRef = React.useRef<HTMLDivElement>(null);

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
            <div className={b('container')} ref={containerRef}>
                <p>Container area for drawer with disablePortal</p>
                <Drawer
                    className={b('drawer')}
                    disablePortal={disablePortal}
                    container={containerRef.current ?? undefined}
                    onOpenChange={setVisible}
                    direction={direction}
                    contentClassName={b('item', {vertical: ['top', 'bottom'].includes(direction)})}
                    open={visible}
                >
                    <div className={b('item-content')}>
                        {Array.from({length: placeholderCount}).map((_, i) => (
                            <div key={i}>
                                <PlaceholderText />
                            </div>
                        ))}
                        <Button
                            view="action"
                            onClick={() => setPlaceholderCount((prev) => prev + 1)}
                        >
                            Add text block
                        </Button>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
