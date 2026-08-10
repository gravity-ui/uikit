import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {block} from '../../utils/cn';
import {Sheet} from '../Sheet';
import {sheetBlock} from '../constants';

const contentAreaBlock = block('sheet-content-area');
const swipeAreaBlock = block('sheet-swipe-area');

describe('Sheet', () => {
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
        expect(container.querySelector(`.${sheetBlock('sheet-top')}`)).not.toBeInTheDocument();
    });

    test('Applies className, contentClassName and swipeAreaClassName to the corresponding elements', () => {
        render(
            <Sheet
                visible
                className="custom-sheet"
                contentClassName="custom-content"
                swipeAreaClassName="custom-swipe-area"
            >
                Content
            </Sheet>,
        );

        expect(document.querySelector(`.${sheetBlock()}`)).toHaveClass('custom-sheet');
        expect(document.querySelector(`.${contentAreaBlock('content')}`)).toHaveClass(
            'custom-content',
        );
        expect(document.querySelector(`.${swipeAreaBlock()}`)).toHaveClass('custom-swipe-area');
    });
});

describe('Sheet allowHideOnContentScroll', () => {
    const SHEET_HEIGHT = 300;
    let getBoundingClientRectSpy: jest.SpyInstance;

    beforeEach(() => {
        // jsdom does not layout elements, so the sheet height is reported as 0.
        // Mock it to a positive value to reproduce the real closing logic.
        getBoundingClientRectSpy = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockReturnValue({height: SHEET_HEIGHT, width: 0, top: 0, left: 0} as DOMRect);
    });

    afterEach(() => {
        getBoundingClientRectSpy.mockRestore();
    });

    function swipeDownOnContent(content: Element, {from, to}: {from: number; to: number}) {
        fireEvent.touchStart(content, {touches: [{clientX: 0, clientY: from}]});
        fireEvent.touchMove(content, {touches: [{clientX: 0, clientY: to}]});
        fireEvent.touchEnd(content, {touches: [{clientX: 0, clientY: to}]});
    }

    test('closes the sheet on a swipe down when the content is scrolled to the top', () => {
        const onClose = jest.fn();
        const {container} = render(
            <Sheet visible disablePortal onClose={onClose}>
                Content
            </Sheet>,
        );

        // eslint-disable-next-line testing-library/no-container
        const scrollContainer = container.querySelector(`.${contentAreaBlock()}`) as HTMLElement;

        // scrollTop === 0 by default in jsdom
        swipeDownOnContent(scrollContainer, {from: 100, to: 100 + SHEET_HEIGHT + 50});

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('does not close the sheet on a swipe down when the content is scrolled', () => {
        const onClose = jest.fn();
        render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        const scrollContainer = document.querySelector(`.${contentAreaBlock()}`) as HTMLElement;

        Object.defineProperty(scrollContainer, 'scrollTop', {value: 100, configurable: true});

        swipeDownOnContent(scrollContainer, {from: 100, to: 100 + SHEET_HEIGHT + 50});

        expect(onClose).not.toHaveBeenCalled();
    });
});
