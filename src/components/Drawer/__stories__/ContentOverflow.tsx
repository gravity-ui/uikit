import {faker} from '@faker-js/faker/locale/en';

import {Box} from '../../layout';
import {Drawer} from '../components/Drawer';

const mockText = faker.lorem.sentences(100);

export function ContentOverflowDrawerShowcase() {
    return (
        <Drawer open placement="right" contentOverflow="auto">
            <Box padding="spacing-4">{mockText}</Box>
        </Drawer>
    );
}
