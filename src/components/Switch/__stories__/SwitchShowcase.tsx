import React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Switch} from '../Switch';

export const SwitchShowcase = () => {
    return (
        <Showcase>
            <ShowcaseItem title="default">
                <p>
                    <Switch />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="sizes">
                <p>
                    m: <Switch size="m" className="row" />
                    <span style={{margin: '8px'}} />
                    l: <Switch size="l" className="row" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="disabled">
                <p>
                    <Switch defaultChecked disabled content="Disabled checked" />
                    <span style={{margin: '8px'}} />
                    <Switch disabled content="Disabled" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="with label">
                <p>
                    <Switch content="Label s" className="row" />
                    <span style={{margin: '8px'}} />
                    <Switch content="Label l" size="l" className="row" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="controlled">
                <p>
                    <Switch content="Controlled checked" checked className="row" />
                    <span style={{margin: '8px'}} />
                    <Switch
                        content="Controlled unchecked"
                        checked={false}
                        size="l"
                        className="row"
                    />
                </p>
            </ShowcaseItem>
        </Showcase>
    );
};
