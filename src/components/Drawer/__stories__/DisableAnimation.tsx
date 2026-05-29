import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {Flex} from '../../layout';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';

import './DisableAnimation.scss';

const b = cn('disable-animation');
const mockText = faker.lorem.sentences(10);

export function DisableAnimationShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [disableAnimation, setDisableAnimation] = React.useState(true);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" onClick={() => setVisible((v) => !v)}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
                <Checkbox
                    content="Disable animation"
                    checked={disableAnimation}
                    onUpdate={setDisableAnimation}
                />
            </div>
            <div className={b('container')}>
                <Drawer
                    open={visible}
                    placement="right"
                    onOpenChange={setVisible}
                    disableAnimation={disableAnimation}
                >
                    <div className={b('item-content')}>
                        <Flex direction="column" gap={4}>
                            <div>{mockText}</div>
                        </Flex>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
