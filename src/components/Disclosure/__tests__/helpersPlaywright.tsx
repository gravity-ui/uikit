import * as React from 'react';

import {Disclosure} from '../Disclosure';

export function DisclosureAnimationTest() {
    const [large, setLarge] = React.useState(false);

    return (
        <div data-qa="animation-test">
            <Disclosure summary="Toggle" keepMounted={false}>
                <button type="button" onClick={() => setLarge(true)}>
                    Resize
                </button>
                <div style={{height: large ? 120 : 24}}>Content</div>
            </Disclosure>
        </div>
    );
}
