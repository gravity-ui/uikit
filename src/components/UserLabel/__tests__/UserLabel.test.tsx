import React from 'react';

import userEvent from '@testing-library/user-event';

import {queryByAttribute, render, screen} from '../../../../test-utils/utils';
import {getAvatarDisplayText} from '../../Avatar';
import {UserLabel} from '../UserLabel';
import i18n from '../i18n';

const MOCKED_TEXT = 'text';
const MOCKED_TEXT_NODE = <div>{MOCKED_TEXT}</div>;

describe('UserLabel', () => {
    describe('text property', () => {
        test.each<string>([MOCKED_TEXT])(
            'should return text value as onClick argument',
            async (text) => {
                const onClick = jest.fn();
                render(<UserLabel onClick={onClick}>{text}</UserLabel>);
                const user = userEvent.setup();
                const displayText = getAvatarDisplayText(text);
                const personaNode = screen.getByText(displayText);
                await user.click(personaNode);
                expect(onClick).toHaveBeenCalled();
            },
        );
        test.each<string>([MOCKED_TEXT])(
            'should return text value as onClose argument',
            async (text) => {
                const onClose = jest.fn();
                const {container} = render(<UserLabel onClose={onClose}>{text}</UserLabel>);
                const user = userEvent.setup();
                const ariaLabelValue = i18n('label_remove-button');
                const closeButtonNode = queryByAttribute('aria-label', container, ariaLabelValue);

                if (!closeButtonNode) {
                    throw new Error('There is no close button in dom');
                }

                await user.click(closeButtonNode);
                expect(onClose).toHaveBeenCalled();
            },
        );
        test('should render text as string', () => {
            render(<UserLabel>{MOCKED_TEXT}</UserLabel>);
            screen.getByText(MOCKED_TEXT);
        });
        test('should render text as react node', () => {
            render(<UserLabel>{MOCKED_TEXT_NODE}</UserLabel>);
            screen.getByText(MOCKED_TEXT);
        });
    });
});
