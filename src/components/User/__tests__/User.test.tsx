import {render, screen} from '../../../../test-utils/utils';
import {User} from '../User';

describe('User', () => {
    test('render avatar', () => {
        render(
            <User avatar={<div>Avatar</div>} name="Charles Darwin" description="charles@mail.ai" />,
        );

        const avatar = screen.getByText('Avatar');

        expect(avatar).toBeVisible();
    });

    test('render name', () => {
        render(
            <User avatar={<div>Avatar</div>} name="Charles Darwin" description="charles@mail.ai" />,
        );

        const name = screen.getByText('Charles Darwin');

        expect(name).toBeVisible();
    });

    test('render description', () => {
        render(
            <User avatar={<div>Avatar</div>} name="Charles Darwin" description="charles@mail.ai" />,
        );

        const description = screen.getByText('charles@mail.ai');

        expect(description).toBeVisible();
    });
});
