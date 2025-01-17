import userEvent from '@testing-library/user-event';

import {queryByAttribute, render, screen} from '../../../../test-utils/utils';
import {getAvatarDisplayText} from '../../Avatar';
import {UserLabel} from '../UserLabel';
import {DEFAULT_USER_LABEL_SIZE} from '../constants';
import i18n from '../i18n';

const MOCKED_TEXT = 'text';
const MOCKED_TEXT_NODE = <div>{MOCKED_TEXT}</div>;

describe('UserLabel', () => {
    describe('text property', () => {
        test.each<string>([MOCKED_TEXT])(
            'should return text value as onClick argument',
            async (text) => {
                const onClick = jest.fn();
                render(<UserLabel text={text} onClick={onClick} />);
                const user = userEvent.setup();
                const displayText = getAvatarDisplayText(text, DEFAULT_USER_LABEL_SIZE);
                const personaNode = screen.getByText(displayText);
                await user.click(personaNode);
                expect(onClick).toHaveBeenCalled();
            },
        );
        test.each<string>([MOCKED_TEXT])(
            'should return text value as onClose argument',
            async (text) => {
                const onCloseClick = jest.fn();
                const {container} = render(<UserLabel text={text} onCloseClick={onCloseClick} />);
                const user = userEvent.setup();
                const ariaLabelValue = i18n('label_remove-button');
                const closeButtonNode = queryByAttribute('aria-label', container, ariaLabelValue);

                if (!closeButtonNode) {
                    throw new Error('There is no close button in dom');
                }

                await user.click(closeButtonNode);
                expect(onCloseClick).toHaveBeenCalled();
            },
        );
        test('should render text as string', () => {
            render(<UserLabel text={MOCKED_TEXT} />);
            screen.getByText(MOCKED_TEXT);
        });
        test('should render text as react node', () => {
            render(<UserLabel text={MOCKED_TEXT_NODE} />);
            screen.getByText(MOCKED_TEXT);
        });
    });
});
