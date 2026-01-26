import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SegmentedRadioGroup} from '../../SegmentedRadioGroup';
import {Flex} from '../../layout';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';
import type {DrawerPlacement} from '../hooks/useResizeHandlers';

import './HideVeil.scss';

const b = cn('hide-veil');
const mockText = faker.lorem.sentences(10);

export function HideVeilShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [hideVeil, setHideVeil] = React.useState(true);
    const [placement, setPlacement] = React.useState<DrawerPlacement>('right');

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
                <Checkbox content="Hide veil" checked={hideVeil} onUpdate={setHideVeil} />
            </div>
            <div className={b('container')}>
                <Drawer
                    open={visible}
                    placement={placement}
                    onOpenChange={setVisible}
                    hideVeil={hideVeil}
                    className={b('drawer')}
                >
                    <div className={b('item-content')}>
                        <Flex direction="column" gap={4}>
                            <div>{mockText}</div>
                            <Button view="action" onClick={() => setVisible(false)}>
                                Hide drawer
                            </Button>
                        </Flex>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
