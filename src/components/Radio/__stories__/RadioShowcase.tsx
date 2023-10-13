import React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Radio} from '../Radio';

export function RadioShowcase() {
    return (
        <Showcase>
            <ShowcaseItem title="Size">
                <p>
                    <Radio size="m" content="size m" value="value 1" />
                    <span style={{margin: '8px'}} />
                    <Radio size="m" content="size m" value="value 2" />
                </p>
                <p>
                    <Radio size="l" content="size l" value="value 1" />
                    <span style={{margin: '8px'}} />
                    <Radio size="l" content="size l" value="value 2" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="Disabled">
                <p>
                    <Radio
                        size="m"
                        content="Unchecked"
                        defaultChecked={false}
                        value="value 1"
                        disabled
                    />
                </p>
                <p>
                    <Radio
                        size="m"
                        content="Checked"
                        defaultChecked={true}
                        value="value 2"
                        disabled
                    />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="Uncontrolled">
                <p>
                    <Radio size="m" content="checked" defaultChecked={true} value="value 1" />
                </p>
                <p>
                    <Radio size="m" content="unchecked" value="value 2" />
                </p>
            </ShowcaseItem>

            <ShowcaseItem title="Controlled">
                <p>
                    <Radio size="m" content="checked" checked={true} value="value 1" />
                </p>
                <p>
                    <Radio size="m" content="unchecked" checked={false} value="value 2" />
                </p>
            </ShowcaseItem>
        </Showcase>
    );
}
