import React from 'react';

import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TEST_CONTENT_TEXT, TEST_TITLE} from '@uikit/__fixtures__/consts';

import {PromoSheet} from '../PromoSheet';

describe('PromoSheet', () => {
    test('Renders base content', () => {
        const actionText = 'Action text';
        const closeText = 'Close text';

        render(
            <PromoSheet
                title={TEST_TITLE}
                message={TEST_CONTENT_TEXT}
                actionText={actionText}
                closeText={closeText}
            />,
        );

        expect(screen.getByRole('heading')).toHaveTextContent(TEST_TITLE);
        expect(screen.getByText(TEST_CONTENT_TEXT)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: closeText})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: actionText})).toBeInTheDocument();

        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    test('Has image when imageSrc property is set', () => {
        const originalWindowImage = window.Image;
        let onLoad = () => {};

        window.Image = class FakeImage {
            naturalWidth = 0;
            naturalHeight = 0;

            set onload(fn: () => void) {
                onLoad = fn;
            }
        } as unknown as typeof Image;

        render(<PromoSheet title="" message="" actionText="" closeText="" imageSrc="image.png" />);

        window.Image = originalWindowImage;
        act(() => {
            onLoad();
        });

        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    test('Call onActionClick and onClose by action button', async () => {
        const handleActionClick = jest.fn();
        const handleClose = jest.fn();

        render(
            <PromoSheet
                title=""
                message=""
                actionText="Action"
                closeText=""
                onActionClick={handleActionClick}
                onClose={handleClose}
            />,
        );

        const actionButton = screen.getByRole('button', {name: 'Action'});
        const user = userEvent.setup();

        await act(() => user.click(actionButton));

        expect(handleActionClick).toBeCalled();
    });
});
