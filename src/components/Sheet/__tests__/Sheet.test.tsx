import {render, screen} from '../../../../test-utils/utils';
import {Sheet} from '../Sheet';
import {sheetBlock} from '../constants';

test('Renders content when visible', () => {
    const sheetContent = 'Sheet content';
    render(<Sheet visible>{sheetContent}</Sheet>);

    expect(screen.getByText(sheetContent)).toBeInTheDocument();
});

test('Do not renders content when invisible', () => {
    const sheetContent = 'Sheet content';
    render(<Sheet visible={false}>${sheetContent}</Sheet>);

    expect(screen.queryByText(sheetContent)).not.toBeInTheDocument();
});

test('Do not renders top bar when hideTopBar property is set', () => {
    const {container} = render(<Sheet visible hideTopBar></Sheet>);

    // Element is accessible only by selector
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector(sheetBlock('sheet-top'))).not.toBeInTheDocument();
});
