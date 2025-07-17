import * as React from 'react';

import {Button} from '../../Button';
import {cn} from '../../utils/cn';
import {Drawer, DrawerItem} from '../Drawer';

import {PlaceholderText} from './mock';

import './UsePortal.scss';

const b = cn('use-portal');

export function UsePortalShowcase() {
    const [visible, setVisible] = React.useState(false);
    const [placeholderCount, setPlaceholderCount] = React.useState(1);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" onClick={() => setVisible((v) => !v)}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
            </div>
            <div className={b('container')}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quos!</p>
                <Drawer
                    className={b('drawer')}
                    disablePortal={false}
                    onVeilClick={() => setVisible(false)}
                >
                    <DrawerItem id="item" className={b('item')} direction="right" visible={visible}>
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
                    </DrawerItem>
                </Drawer>
            </div>
        </div>
    );
}
