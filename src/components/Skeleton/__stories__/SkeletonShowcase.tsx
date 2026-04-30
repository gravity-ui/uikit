import * as React from 'react';

import {Button} from '../../Button';
import {Card} from '../../Card';
import {Text} from '../../Text';
import {User} from '../../User';
import {Flex} from '../../layout';
import {cn} from '../../utils/cn';
import {SkeletonButton} from '../SkeletonButton';
import {SkeletonText} from '../SkeletonText';
import {SkeletonUser} from '../SkeletonUser';

import './SkeletonShowcase.scss';

const b = cn('skeleton-showcase');

const persons = [
    {name: 'Joey', description: 'Lead Developer', avatar: {text: 'JO', theme: 'brand'} as const},
    {name: 'Monica', description: 'Product Owner', avatar: {text: 'MO', theme: 'normal'} as const},
    {name: 'David', description: 'Head of Design', avatar: {text: 'DA', theme: 'brand'} as const},
];

export function SkeletonShowcase() {
    const [listVisible, setListVisible] = React.useState(false);

    return (
        <Flex direction="column" gap={4} className={b()}>
            <Flex alignItems="center" gap={4} className={b('header')}>
                <Button view="action" onClick={() => setListVisible(!listVisible)}>
                    Toggle list
                </Button>
            </Flex>
            {persons.map((person, index) => (
                <Card key={index} type="container" view="outlined" className={b('card')}>
                    <Flex direction="column" gap={3}>
                        {listVisible ? (
                            <User
                                size="m"
                                name={person.name}
                                description={person.description}
                                avatar={person.avatar}
                            />
                        ) : (
                            <SkeletonUser size="m" />
                        )}
                        <Flex direction="column" gap={1}>
                            {listVisible ? (
                                <Text variant="body-1">
                                    The quick brown fox jumps over the lazy dog. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit.
                                </Text>
                            ) : (
                                <SkeletonText variant="body-1" lines={3} lastLineWidth="60%" />
                            )}
                        </Flex>
                        <Flex gap={2}>
                            {listVisible ? (
                                <React.Fragment>
                                    <Button view="action" size="m">
                                        Accept
                                    </Button>
                                    <Button view="normal" size="m">
                                        Decline
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <SkeletonButton size="m" width={80} />
                                    <SkeletonButton size="m" width={80} />
                                </React.Fragment>
                            )}
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
}
