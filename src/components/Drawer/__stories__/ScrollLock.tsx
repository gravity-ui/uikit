import * as React from 'react';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {cn} from '../../utils/cn';
import {Drawer, DrawerItem} from '../Drawer';

import {PlaceholderText} from './mock';

import './ScrollLock.scss';

const b = cn('scroll-lock');

export function ScrollLockShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [scrollLock, setScrollLock] = React.useState(true);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" onClick={() => setVisible((v) => !v)}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
                <Checkbox content="Scroll lock" checked={scrollLock} onUpdate={setScrollLock} />
            </div>
            <div className={b('container')}>
                {Array.from({length: 50}, (_, index) => (
                    <p key={index}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quos!
                    </p>
                ))}
                <Drawer
                    className={b('drawer')}
                    hideVeil={true}
                    disablePortal={false}
                    scrollLock={scrollLock}
                    onVeilClick={() => setVisible(false)}
                >
                    <DrawerItem id="item" className={b('item')} direction="right" visible={visible}>
                        <div className={b('item-content')}>
                            <PlaceholderText />
                        </div>
                    </DrawerItem>
                </Drawer>
            </div>
        </div>
    );
}
