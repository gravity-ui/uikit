import {render, screen} from '../../../../test-utils/utils';
import {Avatar} from '../Avatar';

describe('Avatar', () => {
    test('should render initials (latin)', async () => {
        render(<Avatar text="Charles Darwin" />);

        expect(screen.getByRole('img').textContent).toBe('CD');
    });

    test('should render initials (cyrillic)', async () => {
        render(<Avatar text="Чарльз Дарвин" />);

        expect(screen.getByRole('img').textContent).toBe('ЧД');
    });
});
