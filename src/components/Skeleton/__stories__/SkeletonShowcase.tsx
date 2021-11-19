import React from 'react';
import block from 'bem-cn-lite';
import {Skeleton} from '../Skeleton';
import {Button} from '../../Button';

import './SkeletonShowcase.scss';

const b = block('skeleton-showcase');

function PersonCard({info, info2}: {name: string; info: string; info2: string}) {
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
    {name: 'Hugh Jass', info: 'Yendax Cdoul', info2: 'Lead Developer'},
    {name: 'Do Cker', info: 'Yandex', info2: 'Container'},
    {name: 'Al Coholic', info: 'Somewhere', info2: 'DevOps'},
];

export function SkeletonShowcase() {
    const [listVisible, setListVisible] = React.useState(false);
    return (
        <div className={b()}>
            {listVisible ? (
                persons.map((props) => <PersonCard {...props} key={props.name} />)
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
