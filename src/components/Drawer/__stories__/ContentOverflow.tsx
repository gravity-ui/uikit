import {faker} from '@faker-js/faker/locale/en';

import {spacing} from '../../layout/spacing/spacing';
import {Drawer} from '../components/Drawer';

const mockText = faker.lorem.sentences(100);

export function ContentOverflowDrawerShowcase() {
    return (
        <Drawer open placement="right" contentOverflow="auto">
            <div className={spacing({p: 4})}>{mockText}</div>
        </Drawer>
    );
}
