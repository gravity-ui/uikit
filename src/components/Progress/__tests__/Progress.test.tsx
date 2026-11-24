import {isInaccessible, render, screen} from '../../../../test-utils/utils';
import {Progress} from '../Progress';
import type {ProgressProps} from '../types';

describe('Progress', () => {
    test.each<[string, ProgressProps]>([
        ['value', {value: 50}],
        ['stack', {stack: [{value: 50}]}],
    ])('exposes the text only once with %s', (_variant, props) => {
        const text = '50 (50%)';
        render(<Progress {...props} text={text} />);

        const labels = screen.getAllByText(text);
        expect(labels).toHaveLength(2);
        expect(labels.filter((label) => !isInaccessible(label))).toHaveLength(1);
    });

    test('keeps stack content accessible alongside progress text', () => {
        render(<Progress stack={[{value: 50, content: 'Completed'}]} text="50%" />);

        expect(isInaccessible(screen.getByText('Completed'))).toBe(false);
    });
});
