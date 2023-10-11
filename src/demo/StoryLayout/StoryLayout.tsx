import React from 'react';

import {cn} from '../../components/utils/cn';

import './StoryLayout.scss';

export interface StoryLayoutProps extends React.PropsWithChildren {}

const b = cn('story-layout');

export function StoryLayout({children}: StoryLayoutProps) {
    return (
        <div className={b()}>
            {React.Children.map(children, (elem, i) => (
                <div key={i} className={b('item')}>
                    {elem}
                </div>
            ))}
        </div>
    );
}
