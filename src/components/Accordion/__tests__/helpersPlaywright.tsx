import {composeStories} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {Text} from '../../Text';
import {Accordion} from '../Accordion';
import * as DefaultAccordionStories from '../__stories__/Accordion.stories';

export const AccordionStories = composeStories(DefaultAccordionStories);

export const AccordionShowcase = () => (
    <Showcase>
        <Accordion size="m" view="solid" defaultValue="item1">
            <Accordion.Item summary="First Item" value="item1">
                <Text>Content of the first accordion item with some text to show the layout.</Text>
            </Accordion.Item>
            <Accordion.Item summary="Second Item" value="item2">
                <Text>Content of the second accordion item.</Text>
            </Accordion.Item>
            <Accordion.Item summary="Third Item (Disabled)" value="item3" disabled>
                <Text>Content of the third accordion item that is disabled.</Text>
            </Accordion.Item>
        </Accordion>
    </Showcase>
);
