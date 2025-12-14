import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';

import './HideVeil.scss';

const b = cn('hide-veil');
const mockText = faker.lorem.sentences(10);

export function HideVeilShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [hideVeil, setHideVeil] = React.useState(true);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" onClick={() => setVisible((v) => !v)}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
                <Checkbox content="Hide veil" checked={hideVeil} onUpdate={setHideVeil} />
            </div>
            <div className={b('container')}>
                <Drawer
                    open={visible}
                    placement="right"
                    className={b('drawer', {'hide-veil': hideVeil})}
                    onOpenChange={setVisible}
                    contentClassName={b('item')}
                >
                    <div className={b('item-content')}>{mockText}</div>
                </Drawer>
            </div>
        </div>
    );
}
