import React from 'react';

import userEvent from '@testing-library/user-event';

import {queryByAttribute, render, screen} from '../../../../test-utils/utils';
import {getAvatarDisplayText} from '../../Avatar';
import {Persona} from '../Persona';
import i18n from '../i18n';
import type {PersonaProps} from '../types';
import {extractTextValue} from '../utils';

const MOCKED_TEXT = 'text';
const MOCKED_TEXT_NODE_CONTENT_VALUE = 'Some view';
const MOCKED_TEXT_NODE: PersonaProps['text'] = {
    value: MOCKED_TEXT,
    content: <div>{MOCKED_TEXT_NODE_CONTENT_VALUE}</div>,
};

describe('Persona', () => {
    describe('text property', () => {
        test.each<PersonaProps['text']>([MOCKED_TEXT, MOCKED_TEXT_NODE])(
            'should return text value as onClick argument',
            async (text) => {
                const onClick = jest.fn();
                render(<Persona text={text} onClick={onClick} />);
                const user = userEvent.setup();
                const textValue = extractTextValue(text);
                const displayText = getAvatarDisplayText(textValue);
                const personaNode = screen.getByText(displayText);
                await user.click(personaNode);
                expect(onClick).toBeCalledWith(textValue);
            },
        );
        test.each<PersonaProps['text']>([MOCKED_TEXT, MOCKED_TEXT_NODE])(
            'should return text value as onClose argument',
            async (text) => {
                const onClose = jest.fn();
                const {container} = render(<Persona text={text} onClose={onClose} />);
                const user = userEvent.setup();
                const textValue = extractTextValue(text);
                const ariaLabelValue = i18n('label_remove-button', {persona: textValue});
                const closeButtonNode = queryByAttribute('aria-label', container, ariaLabelValue);

                if (!closeButtonNode) {
                    throw new Error('There is no close button in dom');
                }

                await user.click(closeButtonNode);
                expect(onClose).toBeCalledWith(textValue);
            },
        );
        test('should render text as string', () => {
            render(<Persona text={MOCKED_TEXT} />);
            screen.getByText(MOCKED_TEXT);
        });
        test('should render text as react node', () => {
            render(<Persona text={MOCKED_TEXT_NODE} />);
            screen.getByText(MOCKED_TEXT_NODE_CONTENT_VALUE);
        });
    });
});
