import * as React from 'react';

import {Button} from '../../Button';
import {Card} from '../../Card';
import {User} from '../../User';
import {Flex} from '../../layout';
import {Skeleton} from '../Skeleton';

function PersonCard({info, info2}: {info: string; info2: string}) {
    return (
        <Card style={{padding: '12px'}}>
            <User avatar={{text: info}} name={info} description={info2} size="m" />
        </Card>
    );
}

function PersonSkeleton() {
    return (
        <Card style={{padding: '12px'}}>
            <User
                avatar={<Skeleton variant="circle" height={32} />}
                name={<Skeleton variant="text" size="s" width={80} />}
                description={<Skeleton variant="text" size="s" width={120} />}
            />
        </Card>
    );
}

const persons = [
    {info: 'Joey', info2: 'Lead Developer'},
    {info: 'Monica', info2: 'Product Owner'},
    {info: 'David', info2: 'Head of Design'},
];

function SkeletonListShowcase() {
    const [listVisible, setListVisible] = React.useState(false);
    return (
        <Flex direction="column" gap={3}>
            <Flex direction="column" gap={2}>
                {listVisible ? (
                    persons.map((props, index) => <PersonCard {...props} key={index} />)
                ) : (
                    <React.Fragment>
                        <PersonSkeleton />
                        <PersonSkeleton />
                        <PersonSkeleton />
                    </React.Fragment>
                )}
            </Flex>
            <Button view="action" onClick={() => setListVisible(!listVisible)}>
                Toggle list
            </Button>
        </Flex>
    );
}

export function SkeletonShowcase() {
    return (
        <React.Fragment>
            <h1>Skeleton</h1>
            <h2>List</h2>
            <SkeletonListShowcase />
            <h2>Styled with inline prop</h2>
            <Skeleton height={100} width={200} />
            <h2>Animation Types</h2>
            <div style={{display: 'flex', gap: '20px'}}>
                <div>
                    <div style={{marginBottom: '8px'}}>Gradient (default)</div>
                    <Skeleton height={100} width={200} animation="gradient" />
                </div>
                <div>
                    <div style={{marginBottom: '8px'}}>Pulse</div>
                    <Skeleton height={100} width={200} animation="pulse" />
                </div>
                <div>
                    <div style={{marginBottom: '8px'}}>None</div>
                    <Skeleton height={100} width={200} animation="none" />
                </div>
            </div>
        </React.Fragment>
    );
}
