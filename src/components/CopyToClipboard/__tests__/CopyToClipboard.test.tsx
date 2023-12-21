import React from 'react';

import {render} from '../../../../test-utils/utils';
import {CopyToClipboard} from '../CopyToClipboard';
import type {CopyToClipboardContent} from '../types';

describe('CopyToClipboard', () => {
    test('content must be a valid react element', () => {
        const onCopy = jest.fn();
        expect(() =>
            render(
                <CopyToClipboard text="Text to copy" onCopy={onCopy}>
                    {(() => 123) as any as CopyToClipboardContent}
                </CopyToClipboard>,
            ),
        ).toThrow('Content must be a valid react element');
    });
});
