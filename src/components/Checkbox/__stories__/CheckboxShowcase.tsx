import React from 'react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Checkbox} from '../Checkbox';

export function CheckboxShowcase() {
    return (
        <Showcase>
            <ShowcaseItem title="Size">
                <p>
                    <Checkbox size="m" checked={false} content="size m" />
                    <span style={{margin: '8px'}} />
                    <Checkbox size="m" checked={true} content="size m" />
                    <span style={{margin: '8px'}} />
                    <Checkbox size="m" indeterminate={true} content="size m" />
                </p>
                <p>
                    <Checkbox size="l" checked={false} content="size l" />
                    <span style={{margin: '8px'}} />
                    <Checkbox size="l" checked={true} content="size l" />
                    <span style={{margin: '8px'}} />
                    <Checkbox size="l" indeterminate={true} content="size l" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="Disabled">
                <p>
                    <Checkbox checked={false} disabled content="unchecked" />
                </p>
                <p>
                    <Checkbox indeterminate={true} disabled content="indeterminate" />
                </p>
                <p>
                    <Checkbox checked={true} disabled content="checked" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="Uncontrolled">
                <p>
                    <Checkbox defaultChecked={false} content="unchecked" />
                </p>
                <p>
                    <Checkbox defaultChecked={true} content="checked" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="Controlled">
                <p>
                    <Checkbox checked={false} content="unchecked" />
                </p>
                <p>
                    <Checkbox indeterminate={true} content="indeterminate" />
                </p>
                <p>
                    <Checkbox checked={true} content="checked" />
                </p>
            </ShowcaseItem>
        </Showcase>
    );
}
