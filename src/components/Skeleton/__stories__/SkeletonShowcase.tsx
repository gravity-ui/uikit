import * as React from 'react';

import {Button} from '../../Button';
import {cn} from '../../utils/cn';
import {Skeleton} from '../Skeleton';

import './SkeletonShowcase.scss';

const b = cn('skeleton-showcase');

function PersonCard({info, info2}: {info: string; info2: string}) {
    return (
        <div className={b('card')}>
            <div className={b('avatar')} />
            <div className={b('info')}>
                <div>{info}</div>
                <div className={b('meta')}>{info2}</div>
            </div>
        </div>
    );
}

function PersonSkeleton() {
    return (
        <div className={b('card')}>
            <div className={b('avatar', {loader: true})}>
                <Skeleton className={b('loader-avatar')} />
                <Skeleton className={b('loader-person-name')} />
            </div>
            <div className={b('info', {loader: true})}>
                <Skeleton className={b('loader-info')} />
                <Skeleton className={b('loader-info', {meta: true})} />
            </div>
        </div>
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
        <div className={b()}>
            {listVisible ? (
                persons.map((props, index) => <PersonCard {...props} key={index} />)
            ) : (
                <React.Fragment>
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                </React.Fragment>
            )}

            <Button view="action" onClick={() => setListVisible(!listVisible)}>
                Toggle list
            </Button>
        </div>
    );
}

export function SkeletonShowcase() {
    return (
        <React.Fragment>
            <h1>Skeleton</h1>
            <h2>List</h2>
            <SkeletonListShowcase />
            <h2>Styled with inline prop</h2>
            <Skeleton style={{height: 100, width: 200}} />
            <h2>Animation Types</h2>
            <div style={{display: 'flex', gap: '20px'}}>
                <div>
                    <div style={{marginBottom: '8px'}}>Gradient (default)</div>
                    <Skeleton style={{height: 100, width: 200}} animation="gradient" />
                </div>
                <div>
                    <div style={{marginBottom: '8px'}}>Pulse</div>
                    <Skeleton style={{height: 100, width: 200}} animation="pulse" />
                </div>
                <div>
                    <div style={{marginBottom: '8px'}}>None</div>
                    <Skeleton style={{height: 100, width: 200}} animation="none" />
                </div>
            </div>
        </React.Fragment>
    );
}
