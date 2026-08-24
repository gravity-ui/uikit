import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';

import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {Flex} from '../../layout';
import {cn} from '../../utils/cn';
import {Drawer} from '../components/Drawer';

import './DisableTransition.scss';

const b = cn('disable-transition');
const mockText = faker.lorem.sentences(10);

export function DisableTransitionShowcase() {
    const [visible, setVisible] = React.useState(true);
    const [disableTransition, setDisableTransition] = React.useState(true);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Button view="action" onClick={() => setVisible((v) => !v)}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
                <Checkbox
                    content="Disable animation"
                    checked={disableTransition}
                    onUpdate={setDisableTransition}
                />
            </div>
            <div className={b('container')}>
                <Drawer
                    open={visible}
                    placement="right"
                    onOpenChange={setVisible}
                    disableTransition={disableTransition}
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
