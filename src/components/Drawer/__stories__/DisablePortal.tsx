import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';
import type {DrawerPlacement} from '../hooks/useResizeHandlers';

import './DisablePortal.scss';

const b = cn('disable-portal');
const mockText = faker.lorem.sentences(10);

export function DisablePortalShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [placement, setPlacement] = React.useState<DrawerPlacement>('right');
    const [disablePortal, setDisablePortal] = React.useState(true);
    const [placeholderCount, setPlaceholderCount] = React.useState(1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isVertical = ['top', 'bottom'].includes(placement);

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
                <Checkbox
                    content="Disable portal"
                    checked={disablePortal}
                    onUpdate={(v) => setDisablePortal(v)}
                />
            </div>
            <div className={b('container', {disablePortal})} ref={containerRef}>
                <p>Container area for drawer with disablePortal</p>
                <Drawer
                    className={b('drawer')}
                    disablePortal={disablePortal}
                    container={containerRef.current ?? undefined}
                    onOpenChange={setVisible}
                    placement={placement}
                    size={isVertical ? 300 : undefined}
                    contentClassName={b('item', {vertical: isVertical})}
                    open={visible}
                >
                    <div className={b('item-content')}>
                        {Array.from({length: placeholderCount}).map((_, i) => (
                            <div key={i}>{mockText}</div>
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
