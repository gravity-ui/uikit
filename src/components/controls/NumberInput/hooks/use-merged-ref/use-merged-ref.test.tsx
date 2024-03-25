import React from 'react';

import {render} from '../../../../../../test-utils/utils';

import {useMergedRef} from './use-merged-ref';

function TestComponent({refs}: {refs: React.ForwardedRef<HTMLButtonElement>[]}) {
    const ref = React.useRef<HTMLButtonElement>(null);
    return <button ref={useMergedRef(...refs, ref)} type="button" />;
}

describe('NumberInput/hooks/use-merged-ref', () => {
    it('assigns refs to all given arguments', () => {
        const objectRef = React.createRef<HTMLButtonElement | null>();
        let fnRefValue: HTMLButtonElement | null = null;
        const fnRef = (node: HTMLButtonElement | null) => {
            fnRefValue = node;
        };

        render(<TestComponent refs={[objectRef, fnRef]} />);
        expect(fnRefValue! instanceof HTMLButtonElement).toBe(true);
        expect(objectRef.current instanceof HTMLButtonElement).toBe(true);
    });
});
