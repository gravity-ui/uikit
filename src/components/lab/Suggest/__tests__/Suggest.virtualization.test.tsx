import userEvent from '@testing-library/user-event';

import {setupIntersectionObserverMock} from '../../../../../test-utils/setupIntersectionObserverMock';
import {render, screen} from '../../../../../test-utils/utils';
import {ListVirtualizer} from '../../../../virtualizer';
import {mockLayout, scrollTo} from '../../../List/__tests__/helpers';
import {Suggest} from '../Suggest';

const OPTIONS = Array.from({length: 200}, (_, index) => ({
    value: String(index),
    content: `Option ${index}`,
}));

mockLayout({viewport: 280, row: 28});
beforeEach(() => setupIntersectionObserverMock());

describe('Suggest: external virtualization', () => {
    test('renders all options without a virtualizer', () => {
        render(<Suggest open options={OPTIONS} listHeight={280} />);
        expect(screen.getByRole('listbox')).toHaveStyle({maxHeight: '40vh'});
        expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length);
    });

    test('renders a window through the popup portal and updates it on scroll', () => {
        render(
            <ListVirtualizer>
                <Suggest open options={OPTIONS} listHeight={280} />
            </ListVirtualizer>,
        );
        expect(screen.getByRole('listbox')).toHaveStyle({maxHeight: 'min(280px, 40vh)'});
        expect(screen.getAllByRole('option').length).toBeLessThan(OPTIONS.length / 2);
        expect(screen.getByRole('option', {name: 'Option 0'})).toBeInTheDocument();
        expect(screen.queryByRole('option', {name: 'Option 150'})).not.toBeInTheDocument();
        scrollTo(screen.getByRole('listbox'), 28 * 150);
        expect(screen.getByRole('option', {name: 'Option 150'})).toBeInTheDocument();
    });

    test('keeps the active descendant mounted when the virtual window scrolls away', async () => {
        const user = userEvent.setup();
        const onOptionClick = jest.fn();
        render(
            <ListVirtualizer>
                <Suggest open options={OPTIONS} onOptionClick={onOptionClick} />
            </ListVirtualizer>,
        );
        const input = screen.getByRole('combobox');
        await user.click(input);
        await user.keyboard('[ArrowDown]');
        const active = screen.getByRole('option', {name: 'Option 0'});
        scrollTo(screen.getByRole('listbox'), 28 * 150);
        expect(active).toBeInTheDocument();
        expect(input).toHaveAttribute('aria-activedescendant', active.id);
        await user.keyboard('[Enter]');
        expect(onOptionClick).toHaveBeenCalledWith(OPTIONS[0], 0);
    });
});
