import {isInaccessible, render, screen} from '../../../../test-utils/utils';
import {Progress} from '../Progress';
import type {ProgressProps} from '../types';

describe('Progress', () => {
    test.each<[string, ProgressProps]>([
        ['value', {value: 50}],
        ['stack', {stack: [{value: 50, content: 'Completed'}]}],
    ])('exposes the text only once with %s', (_variant, props) => {
        const text = '50 (50%)';
        const {rerender} = render(<Progress {...props} text={text} />);

        const expectSingleAccessibleText = () => {
            const labels = screen.getAllByText(text);

            expect(labels).toHaveLength(2);
            expect(labels.filter((label) => !isInaccessible(label))).toHaveLength(1);
        };

        expectSingleAccessibleText();

        rerender(<Progress {...props} text={<span>{text}</span>} />);

        expectSingleAccessibleText();

        if ('stack' in props) {
            expect(isInaccessible(screen.getByText('Completed'))).toBe(false);
        }
    });
});
